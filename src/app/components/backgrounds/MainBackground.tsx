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

  // Generate a single star at a specific position
  float star(vec2 position, float brightness) {
    // Hash function for pseudo-random values
    vec2 p = fract(position * vec2(123.34, 234.56));
    p += dot(p, p + 34.23);
    float hash = fract(p.x * p.y);
    
    // Only create stars at specific hash thresholds (makes them sparse)
    if (hash > 0.995) { // Slightly more stars (from 0.997)
      // Shape of the star - significantly larger point
      float dist = length(fract(position) - 0.5);
      float star = 1.0 - smoothstep(0.0, 0.06 * hash, dist); // Increased from 0.0315 to 0.06 (about 2x larger)
      
      // Star brightness based on another hash factor
      return star * brightness * hash;
    }
    return 0.0;
  }
  
  // Generate a sparse, distant starfield
  vec3 starField(vec2 uv, vec2 mousePos, float time) {
    // Very dark background with sparse stars
    vec3 stars = vec3(0.0);
    
    // Each layer of stars should have a unique position and twinkling
    vec2 starUV1 = uv * 1.0;
    vec2 starUV2 = uv * 1.1 + vec2(0.2);
    vec2 starUV3 = uv * 0.9 - vec2(0.3);
    
    // Create multiple layers of stars at different scales
    for (int i = 0; i < 3; i++) {
      // Each layer has different scale and seed
      float scale = 25.0 + float(i) * 25.0; // Adjusted scale to spread stars more evenly
      float seed = 10.0 * float(i + 1);
      vec2 useUV;
      
      // Select different base positions for different layers
      if (i == 0) useUV = starUV1;
      else if (i == 1) useUV = starUV2;
      else useUV = starUV3;
      
      // Create more pronounced twinkling effect 
      float twinkleSpeed = 0.3 + float(i) * 0.2; // Different speeds for different layers
      float twinklePhase = seed + time * twinkleSpeed;
      float twinkle = sin(twinklePhase) * 0.8 + 0.5; // Increased amplitude from 0.5 to 0.8
      
      // More random twinkling for some stars
      float randOffset = fract(sin(seed * 234.45) * 436.78);
      float extraTwinkle = sin(time * 1.5 + randOffset * 10.0) * 0.5 + 0.5;
      twinkle = mix(twinkle, extraTwinkle, randOffset);
      
      // Generate stars across entire screen by using repeating pattern
      for (float x = -2.0; x <= 2.0; x += 1.0) {
        for (float y = -2.0; y <= 2.0; y += 1.0) {
          vec2 offset = vec2(x, y);
          vec2 pos = (useUV + offset) * scale + seed;
          float s = star(pos, 0.7 + 0.3 * float(i)); // Increased brightness
          
          // Star color with slight random variation
          float colorVar = fract(sin(dot(floor(pos), vec2(12.9898, 78.233))) * 43758.5453);
          vec3 starColor = vec3(0.8 + 0.2 * colorVar, 0.9 + 0.1 * colorVar, 1.0);
          
          // Add more pronounced twinkling
          stars += s * starColor * (0.3 + 0.7 * twinkle);
        }
      }
    }
    
    // Calculate mouse influence for star brightening effect - smaller radius
    float mouseDistance = distance(uv, mousePos);
    float mouseBrightness = smoothstep(0.15, 0.0, mouseDistance); // Reduced from 0.3 to 0.15 (smaller radius)
    
    // Increase star brightness near mouse
    stars *= 1.0 + mouseBrightness * 5.0;
    
    return stars * 0.5;
  }

  void main() {
    vec2 uv = v_uv;
    vec2 aspect = vec2(u_resolution.x/u_resolution.y, 1.0);
    vec2 aspectCorrectedUV = (uv - 0.5) * aspect + 0.5;
    
    // Define our color palette - deep blue, navy, midnight blue, charcoal
    vec3 darkNavy = vec3(0.04, 0.06, 0.14);    // Very dark navy
    vec3 midnightBlue = vec3(0.07, 0.11, 0.22); // Midnight blue
    vec3 charcoalGray = vec3(0.16, 0.16, 0.19); // Charcoal gray
    vec3 black = vec3(0.02, 0.02, 0.04);       // Near black
    
    // Base animation speed (increased by 5%)
    float time = u_time * 0.0525; // Slightly faster
    
    // Mouse position (used for star brightening instead of smoke displacement)
    vec2 mousePos = u_mouse;
    
    // Apply standard motion to smoke layers without mouse displacement
    vec2 baseMotion1 = vec2(time * 0.3, time * 0.2);
    vec2 baseMotion2 = vec2(-time * 0.2, time * 0.3);
    
    // Get smoke pattern with standard motion (no mouse influence on smoke)
    float f1 = fbm(aspectCorrectedUV * 3.4 + baseMotion1);
    float f2 = fbm(aspectCorrectedUV * 2.4 + baseMotion2 + f1 * 0.45);
    float f3 = fbm(aspectCorrectedUV * 4.8 + f1 * 0.28 + vec2(time) * 0.15);
    
    // Add another layer with higher frequency for finer smokey detail
    float f4 = fbm(aspectCorrectedUV * 6.5 + f2 * 0.18 + vec2(-time * 0.2, time * 0.08));
    
    // Add a fifth layer for microscale smoke particles
    float f5 = fbm(aspectCorrectedUV * 8.5 + f3 * 0.12 + vec2(time * 0.15, -time * 0.1));
    
    // Calculate distance from center for edge concentration
    float distFromCenter = length((aspectCorrectedUV - 0.5) * 2.0);
    
    // Create an edge density multiplier (higher at edges, lower in center)
    float edgeDensity = smoothstep(0.0, 1.8, distFromCenter);
    
    // Add extra smoke around edges (further enhanced for density)
    float edgeSmoke = fbm(aspectCorrectedUV * 3.0 + vec2(time * 0.22, -time * 0.16)) * edgeDensity * 0.65;
    
    // Combine all noise layers with additional micro-detail layer
    float finalNoise = f2 * 0.50 + f3 * 0.25 + f4 * 0.15 + f5 * 0.10 + edgeSmoke;
    
    // Further increase edge-to-center contrast for denser appearance
    finalNoise = mix(finalNoise * 0.85, finalNoise * 1.25, edgeDensity);
    
    // Generate distant starfield with mouse trail effect
    vec3 stars = vec3(0.0);
    
    // Create the main star brightness effect at the current mouse position
    stars += starField(uv, mousePos, u_time);
    
    // Create trail effect with fading brightness
    for (int i = 1; i <= 5; i++) {
      float trailFactor = 1.0 - float(i) / 5.0; // Fades from 0.8 to 0.0
      
      // Movement speed-based offset (assuming mouse moved from right to left or left to right)
      float xOffset = -0.03 * float(i); // Negative X = trail to the left
      
      // Create a trail position offset from current mouse position
      vec2 trailPos = mousePos + vec2(xOffset, 0.0);
      
      // Add stars at the trail position with reduced brightness
      vec3 trailStars = starField(uv, trailPos, u_time);
      stars = max(stars, trailStars * trailFactor * 0.8);
    }
    
    // Create smoke color based on noise
    vec3 smokeColor;
    if (finalNoise < 0.35) {
      // Dark regions
      smokeColor = mix(black, darkNavy, smoothstep(0.0, 0.35, finalNoise));
    } else if (finalNoise < 0.65) {
      // Mid regions
      smokeColor = mix(darkNavy, midnightBlue, smoothstep(0.35, 0.65, finalNoise));
    } else {
      // Light regions (still dark)
      smokeColor = mix(midnightBlue, charcoalGray, smoothstep(0.65, 1.0, finalNoise));
    }
    
    // Start with stars as the background
    vec3 color = stars;
    
    // Determine smoke opacity - denser smoke = more opaque
    float smokeOpacity = smoothstep(0.05, 0.7, finalNoise);
    
    // Layer smoke on top of stars
    color = mix(color, smokeColor, smokeOpacity);
    
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
  const prevMousePosition = useRef<THREE.Vector2>(new THREE.Vector2(0.5, 0.5));
  const mouseVelocity = useRef<THREE.Vector2>(new THREE.Vector2(0.0, 0.0));

  // Set up mouse tracking with velocity calculation
  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      // Store previous position
      prevMousePosition.current.copy(mousePosition.current);

      // Update current position
      mousePosition.current.x = event.clientX / window.innerWidth;
      mousePosition.current.y = 1.0 - event.clientY / window.innerHeight;

      // Calculate velocity (direction and speed of mouse movement)
      mouseVelocity.current.x =
        mousePosition.current.x - prevMousePosition.current.x;
      mouseVelocity.current.y =
        mousePosition.current.y - prevMousePosition.current.y;
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

      // Slowly decay mouse velocity when not moving
      mouseVelocity.current.multiplyScalar(0.95);
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
