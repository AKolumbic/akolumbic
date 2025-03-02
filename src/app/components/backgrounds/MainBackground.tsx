"use client";

import React, { useRef, useEffect } from "react";
import * as THREE from "three";
import { Canvas, useFrame, extend, useThree } from "@react-three/fiber";
import { BackgroundProps } from "./types";

// Fragment shader code for smokey effect with aerodynamic mouse interaction
const fragmentShader = `
  precision mediump float;
  #define GLSLIFY 1

  uniform float u_time;
  uniform vec2 u_mouse;
  uniform vec2 u_resolution;
  varying vec2 v_uv;

  // Simplex noise functions
  vec3 permute(vec3 x) { return mod(((x*34.0)+1.0)*x, 289.0); }

  float snoise(vec2 v) {
    const vec4 C = vec4(0.211324865405187, 0.366025403784439,
           -0.577350269189626, 0.024390243902439);
    vec2 i  = floor(v + dot(v, C.yy));
    vec2 x0 = v -   i + dot(i, C.xx);
    vec2 i1;
    i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
    vec4 x12 = x0.xyxy + C.xxzz;
    x12.xy -= i1;
    i = mod(i, 289.0);
    vec3 p = permute( permute( i.y + vec3(0.0, i1.y, 1.0 ))
      + i.x + vec3(0.0, i1.x, 1.0 ));
    vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy),
      dot(x12.zw,x12.zw)), 0.0);
    m = m*m;
    m = m*m;
    vec3 x = 2.0 * fract(p * C.www) - 1.0;
    vec3 h = abs(x) - 0.5;
    vec3 ox = floor(x + 0.5);
    vec3 a0 = x - ox;
    m *= 1.79284291400159 - 0.85373472095314 * ( a0*a0 + h*h );
    vec3 g;
    g.x  = a0.x  * x0.x  + h.x  * x0.y;
    g.yz = a0.yz * x12.xz + h.yz * x12.yw;
    return 130.0 * dot(m, g);
  }

  // Further enhanced FBM function for 15% more smoke density
  float fbm(vec2 p) {
    float value = 0.0;
    float amplitude = 0.65; // Further increased for denser smoke
    float frequency = 1.15; // Higher base frequency for more detail
    float lacunarity = 2.25; // Increased frequency multiplier
    float gain = 0.48; // Higher gain to enhance detail persistence across scales
    
    for(int i = 0; i < 9; i++) { // Increased to 9 octaves for maximum detail
      value += amplitude * snoise(p * frequency);
      amplitude *= gain;
      frequency *= lacunarity;
    }
    
    // Normalize the value a bit to keep overall range similar but denser
    return value * 0.95;
  }

  void main() {
    vec2 uv = v_uv;
    vec2 aspect = vec2(u_resolution.x/u_resolution.y, 1.0);
    uv = (uv - 0.5) * aspect + 0.5;
    
    // Define our color palette - deep blue, navy, midnight blue, charcoal
    vec3 darkNavy = vec3(0.04, 0.06, 0.14);    // Very dark navy
    vec3 midnightBlue = vec3(0.07, 0.11, 0.22); // Midnight blue
    vec3 charcoalGray = vec3(0.16, 0.16, 0.19); // Charcoal gray
    vec3 black = vec3(0.02, 0.02, 0.04);       // Near black
    
    // Base animation speed (increased by 5%)
    float time = u_time * 0.0525; // Slightly faster
    
    // Vector from UV to mouse position (correct direction for pushing away)
    vec2 mousePos = u_mouse;
    vec2 toMouse = mousePos - uv;
    float distToMouse = length(toMouse);
    
    // Create a more noticeable pushing force (15% more intense)
    float pushRadius = 0.17; // Slightly larger radius of influence (+15%)
    float pushStrength = 0.0345; // Increased strength by 15%
    
    // Calculate push vector - away from the mouse
    vec2 pushDir = normalize(-toMouse); // Reversed direction to push away
    
    // Enhanced falloff curve for more pronounced effect near cursor
    float baseFactor = smoothstep(pushRadius, 0.0, distToMouse);
    // Sharper curve with slightly more influence in the mid-range
    float pushFactor = pow(baseFactor, 1.8); 
    
    // Calculate the enhanced displacement with 15% more effect
    vec2 displacement = pushDir * pushFactor * pushStrength;
    
    // Apply displacement to all noise layers for consistent motion
    vec2 baseMotion1 = vec2(time * 0.3, time * 0.2);
    vec2 baseMotion2 = vec2(-time * 0.2, time * 0.3);
    
    // Get significantly denser smoke pattern with more complex interaction and enhanced mouse influence
    float f1 = fbm(uv * 3.4 + baseMotion1 + displacement * 0.35);
    float f2 = fbm(uv * 2.4 + baseMotion2 + f1 * 0.45 + displacement * 0.58);
    float f3 = fbm(uv * 4.8 + f1 * 0.28 + vec2(time) * 0.15 + displacement * 0.8);
    
    // Add another layer with higher frequency for finer smokey detail
    float f4 = fbm(uv * 6.5 + f2 * 0.18 + vec2(-time * 0.2, time * 0.08));
    
    // Add a fifth layer for microscale smoke particles
    float f5 = fbm(uv * 8.5 + f3 * 0.12 + vec2(time * 0.15, -time * 0.1));
    
    // Calculate distance from center for edge concentration
    float distFromCenter = length((uv - 0.5) * 2.0);
    
    // Create an edge density multiplier (higher at edges, lower in center)
    float edgeDensity = smoothstep(0.0, 1.8, distFromCenter);
    
    // Add extra smoke around edges (further enhanced for density)
    float edgeSmoke = fbm(uv * 3.0 + vec2(time * 0.22, -time * 0.16)) * edgeDensity * 0.65;
    
    // Combine all noise layers with additional micro-detail layer
    float finalNoise = f2 * 0.50 + f3 * 0.25 + f4 * 0.15 + f5 * 0.10 + edgeSmoke;
    
    // Further increase edge-to-center contrast for denser appearance
    finalNoise = mix(finalNoise * 0.85, finalNoise * 1.25, edgeDensity);
    
    // Use the noise to mix between the colors with smoother transitions
    vec3 color;
    if (finalNoise < 0.35) {
      // Dark regions
      color = mix(black, darkNavy, smoothstep(0.0, 0.35, finalNoise));
    } else if (finalNoise < 0.65) {
      // Mid regions
      color = mix(darkNavy, midnightBlue, smoothstep(0.35, 0.65, finalNoise));
    } else {
      // Light regions (still dark)
      color = mix(midnightBlue, charcoalGray, smoothstep(0.65, 1.0, finalNoise));
    }
    
    // Modified vignette with 15% stronger effect
    float vignette = 1.0 - smoothstep(0.5, 1.75, distFromCenter);
    color = mix(color, black, (1.0 - vignette) * 0.69);
    
    gl_FragColor = vec4(color, 1.0);
  }
`;

// Vertex shader code
const vertexShader = `
  varying vec2 v_uv;
  
  void main() {
    v_uv = uv;
    gl_Position = vec4(position, 1.0);
  }
`;

// Create a custom shader material class
class SmokeShaderMaterial extends THREE.ShaderMaterial {
  constructor(parameters = {}) {
    super(parameters);
  }
}

// Add the custom shader material to R3F
extend({ SmokeShaderMaterial });

// Full-screen quad component
const SmokeEffect = ({ reducedMotion }: { reducedMotion: boolean }) => {
  const { viewport } = useThree();
  const materialRef = useRef<THREE.ShaderMaterial>(null!);
  const mousePosition = useRef<THREE.Vector2>(new THREE.Vector2(0.5, 0.5));

  // Set up mouse tracking
  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      mousePosition.current.x = event.clientX / window.innerWidth;
      mousePosition.current.y = 1.0 - event.clientY / window.innerHeight;
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  useFrame((state) => {
    if (materialRef.current) {
      // Update time uniform
      materialRef.current.uniforms.u_time.value = reducedMotion
        ? 0
        : state.clock.getElapsedTime();

      // Update mouse position uniform
      materialRef.current.uniforms.u_mouse.value = mousePosition.current;

      // Update resolution uniform
      materialRef.current.uniforms.u_resolution.value.x =
        viewport.width * viewport.factor;
      materialRef.current.uniforms.u_resolution.value.y =
        viewport.height * viewport.factor;
    }
  });

  return (
    // @ts-expect-error - extending materials in r3f causes TS issues
    <smokeShaderMaterial
      ref={materialRef}
      vertexShader={vertexShader}
      fragmentShader={fragmentShader}
      uniforms={{
        u_time: { value: 0.0 },
        u_mouse: { value: new THREE.Vector2(0.5, 0.5) },
        u_resolution: {
          value: new THREE.Vector2(viewport.width, viewport.height),
        },
      }}
      transparent={false}
      depthTest={false}
      depthWrite={false}
    />
  );
};

const MainBackground: React.FC<BackgroundProps> = ({ reducedMotion }) => {
  return (
    <div
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
      }}
    >
      <Canvas
        orthographic
        camera={{ position: [0, 0, 1], zoom: 1, near: 0.01, far: 100 }}
        style={{ width: "100%", height: "100%" }}
        gl={{ antialias: true, alpha: false }}
      >
        <mesh frustumCulled={false}>
          <planeGeometry args={[2, 2]} />
          <SmokeEffect reducedMotion={reducedMotion} />
        </mesh>
      </Canvas>
    </div>
  );
};

export default MainBackground;
