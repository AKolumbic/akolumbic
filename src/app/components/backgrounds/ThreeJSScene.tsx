"use client";

import React, { useRef, useEffect } from "react";
import * as THREE from "three";
import { Canvas, useFrame, extend, useThree } from "@react-three/fiber";
import { CaliforniaThreeJSColors } from "../../types/gradient.types";

// Props for the root ThreeJS scene component
export interface ThreeJSSceneProps {
  colors: CaliforniaThreeJSColors;
  reducedMotion: boolean;
}

// Fragment shader code
const fragmentShader = `
  precision mediump float;
  #define GLSLIFY 1

  uniform float u_time;
  uniform vec2 u_mouse;
  uniform vec2 u_resolution;
  varying vec2 v_uv;

  vec2 rotate2D(vec2 p, float angle) {
      float s = sin(angle), c = cos(angle);
      return mat2(c, -s, s, c) * p;
  }

  float gridPattern(vec2 p) {
      vec2 grid = abs(fract(p - 0.5) - 0.5) / fwidth(p);
      return min(grid.x, grid.y);
  }

  float isoGrid(vec2 p) {
      p = rotate2D(p, 3.14159 / 4.0);
      vec2 grid1 = p;
      vec2 grid2 = rotate2D(p, 3.14159 / 3.0);
      return min(gridPattern(grid1 * 8.0), gridPattern(grid2 * 8.0));
  }

  void main() {
      vec2 uv = v_uv;
      vec2 aspect = vec2(u_resolution.x/u_resolution.y, 1.0);
      uv = (uv - 0.5) * aspect + 0.5;
      
      vec2 mouseInfluence = u_mouse - uv;
      float mouseDist = length(mouseInfluence);
      float distortionAmount = smoothstep(0.3, 0.0, mouseDist) * 0.2;
      
      vec2 distortedUV = uv + normalize(mouseInfluence) * distortionAmount;
      
      float grid = isoGrid(distortedUV + u_time * 0.1);
      
      vec3 color1 = vec3(0.2, 0.4, 0.8);
      vec3 color2 = vec3(0.9, 0.3, 0.5);
      vec3 bgColor = vec3(0.1, 0.1, 0.2);
      
      float gridLines = smoothstep(0.8, 0.2, grid);
      vec3 finalColor = mix(bgColor, mix(color1, color2, sin(u_time) * 0.5 + 0.5), gridLines);
      
      gl_FragColor = vec4(finalColor, 1.0);
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
  const mousePosition = useRef<THREE.Vector2>(new THREE.Vector2(0.5, 0.5));
  const materialRef = useRef<THREE.ShaderMaterial>(null!);

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
    <fullScreenShaderMaterial
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
      transparent={true}
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
      gl={{ antialias: true, alpha: true }}
    >
      <FullScreenRenderer reducedMotion={reducedMotion} />
    </Canvas>
  );
};

export default ThreeJSScene;
