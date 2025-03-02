"use client";

import React, { useRef } from "react";
import * as THREE from "three";
import { Canvas, useFrame, extend, useThree } from "@react-three/fiber";
import { CaliforniaThreeJSColors } from "../../types/gradient.types";

// Props for the root ThreeJS scene component
export interface ThreeJSSceneProps {
  colors: CaliforniaThreeJSColors;
  reducedMotion: boolean;
}

// Fragment shader code for subtle smokey effect
const fragmentShader = `
  precision mediump float;
  #define GLSLIFY 1

  uniform float u_time;
  uniform vec2 u_resolution;
  varying vec2 v_uv;

  // Simplex noise functions from https://gist.github.com/patriciogonzalezvivo/670c22f3966e662d2f83
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

  void main() {
    vec2 uv = v_uv;
    vec2 aspect = vec2(u_resolution.x/u_resolution.y, 1.0);
    uv = (uv - 0.5) * aspect + 0.5;
    
    // Define our color palette for the smokey effect
    vec3 darkNavy = vec3(0.05, 0.06, 0.12);     // Very dark navy
    vec3 midnightBlue = vec3(0.08, 0.1, 0.18);  // Midnight blue
    vec3 charcoalGray = vec3(0.15, 0.15, 0.17); // Charcoal gray
    vec3 black = vec3(0.03, 0.03, 0.05);        // Near black
    
    // Create multiple layers of noise for the smokey effect
    float scale1 = 2.0;
    float scale2 = 4.0;
    float scale3 = 8.0;
    
    float slowTime = u_time * 0.03; // Slow down the animation for subtlety
    
    // Generate noise at different scales and speeds
    float noise1 = snoise(uv * scale1 + vec2(slowTime * 0.5, slowTime * 0.2)) * 0.5 + 0.5;
    float noise2 = snoise(uv * scale2 + vec2(-slowTime * 0.3, slowTime * 0.1)) * 0.3 + 0.5;
    float noise3 = snoise(uv * scale3 + vec2(slowTime * 0.2, -slowTime * 0.3)) * 0.2 + 0.5;
    
    // Combine the noise layers
    float finalNoise = (noise1 + noise2 + noise3) / 3.0;
    
    // Use the noise to mix between the colors
    vec3 color;
    if (finalNoise < 0.3) {
      // Dark regions
      color = mix(black, darkNavy, smoothstep(0.0, 0.3, finalNoise));
    } else if (finalNoise < 0.6) {
      // Mid regions
      color = mix(darkNavy, midnightBlue, smoothstep(0.3, 0.6, finalNoise));
    } else {
      // Light regions (still dark)
      color = mix(midnightBlue, charcoalGray, smoothstep(0.6, 1.0, finalNoise));
    }
    
    // Add depth with a subtle vignette effect
    float vignette = 1.0 - smoothstep(0.5, 1.5, length((uv - 0.5) * 2.0));
    color = mix(black, color, vignette * 0.8 + 0.2);
    
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
class FullScreenShaderMaterial extends THREE.ShaderMaterial {
  constructor(parameters = {}) {
    super(parameters);
  }
}

// Add the custom shader material to R3F
extend({ FullScreenShaderMaterial });

// Full-screen quad component
const FullScreenQuad = ({ reducedMotion }: { reducedMotion: boolean }) => {
  const { viewport } = useThree();
  const materialRef = useRef<THREE.ShaderMaterial>(null!);

  useFrame((state) => {
    if (materialRef.current) {
      // Update time uniform
      materialRef.current.uniforms.u_time.value = reducedMotion
        ? 0
        : state.clock.getElapsedTime();

      // Update resolution uniform
      materialRef.current.uniforms.u_resolution.value.x =
        viewport.width * viewport.factor;
      materialRef.current.uniforms.u_resolution.value.y =
        viewport.height * viewport.factor;
    }
  });

  return (
    // @ts-expect-error - extending materials in r3f causes TS issues
    <fullScreenShaderMaterial
      ref={materialRef}
      vertexShader={vertexShader}
      fragmentShader={fragmentShader}
      uniforms={{
        u_time: { value: 0.0 },
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

// Render a full-screen quad directly
const FullScreenRenderer = (props: { reducedMotion: boolean }) => {
  const meshRef = useRef<THREE.Mesh>(null!);

  return (
    <mesh ref={meshRef} frustumCulled={false}>
      <planeGeometry args={[2, 2]} />
      <FullScreenQuad {...props} />
    </mesh>
  );
};

// The Three.js scene component that will be dynamically imported
const ThreeJSScene: React.FC<ThreeJSSceneProps> = ({ reducedMotion }) => {
  return (
    <Canvas
      orthographic
      camera={{ position: [0, 0, 1], zoom: 1, near: 0.01, far: 100 }}
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
      }}
      gl={{ antialias: true, alpha: false }}
    >
      <FullScreenRenderer reducedMotion={reducedMotion} />
    </Canvas>
  );
};

export default ThreeJSScene;
