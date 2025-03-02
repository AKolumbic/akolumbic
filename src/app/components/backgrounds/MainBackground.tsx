"use client";

import React, { useRef, useEffect, useState } from "react";
import * as THREE from "three";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
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

  float fbm(vec2 p) {
    float value = 0.0;
    float amplitude = 0.65;
    float frequency = 1.15;
    float lacunarity = 2.25;
    float gain = 0.48;
    
    for(int i = 0; i < 9; i++) {
      value += amplitude * snoise(p * frequency);
      amplitude *= gain;
      frequency *= lacunarity;
    }
    
    return value * 0.95;
  }

  float star(vec2 position, float brightness) {
    vec2 p = fract(position * vec2(123.34, 234.56));
    p += dot(p, p + 34.23);
    float hash = fract(p.x * p.y);
    
    if (hash > 0.995) {
      float dist = length(fract(position) - 0.5);
      float star = 1.0 - smoothstep(0.0, 0.06 * hash, dist);
      return star * brightness * hash;
    }
    return 0.0;
  }
  
  vec3 starField(vec2 uv, vec2 mousePos, float time) {
    vec3 stars = vec3(0.0);
    vec2 starUV1 = uv * 1.0;
    vec2 starUV2 = uv * 1.1 + vec2(0.2);
    vec2 starUV3 = uv * 0.9 - vec2(0.3);
    
    for (int i = 0; i < 3; i++) {
      float scale = 25.0 + float(i) * 25.0;
      float seed = 10.0 * float(i + 1);
      vec2 useUV;
      
      if (i == 0) useUV = starUV1;
      else if (i == 1) useUV = starUV2;
      else useUV = starUV3;
      
      float twinkleSpeed = 0.3 + float(i) * 0.2;
      float twinklePhase = seed + time * twinkleSpeed;
      float twinkle = sin(twinklePhase) * 0.8 + 0.5;
      
      float randOffset = fract(sin(seed * 234.45) * 436.78);
      float extraTwinkle = sin(time * 1.5 + randOffset * 10.0) * 0.5 + 0.5;
      twinkle = mix(twinkle, extraTwinkle, randOffset);
      
      for (float x = -2.0; x <= 2.0; x += 1.0) {
        for (float y = -2.0; y <= 2.0; y += 1.0) {
          vec2 offset = vec2(x, y);
          vec2 pos = (useUV + offset) * scale + seed;
          float s = star(pos, 0.7 + 0.3 * float(i));
          
          float colorVar = fract(sin(dot(floor(pos), vec2(12.9898, 78.233))) * 43758.5453);
          vec3 starColor = vec3(0.8 + 0.2 * colorVar, 0.9 + 0.1 * colorVar, 1.0);
          
          stars += s * starColor * (0.3 + 0.7 * twinkle);
        }
      }
    }
    
    float mouseDistance = distance(uv, mousePos);
    float mouseBrightness = smoothstep(0.15, 0.0, mouseDistance);
    stars *= 1.0 + mouseBrightness * 5.0;
    
    return stars * 0.5;
  }

  void main() {
    vec2 uv = v_uv;
    vec2 aspect = vec2(u_resolution.x/u_resolution.y, 1.0);
    vec2 aspectCorrectedUV = (uv - 0.5) * aspect + 0.5;
    
    // Define color palette
    vec3 darkNavy = vec3(0.04, 0.06, 0.14);
    vec3 midnightBlue = vec3(0.07, 0.11, 0.22);
    vec3 charcoalGray = vec3(0.16, 0.16, 0.19);
    vec3 black = vec3(0.02, 0.02, 0.04);
    
    float time = u_time * 0.0525;
    vec2 mousePos = u_mouse;
    
    vec2 baseMotion1 = vec2(time * 0.3, time * 0.2);
    vec2 baseMotion2 = vec2(-time * 0.2, time * 0.3);
    
    float f1 = fbm(aspectCorrectedUV * 3.4 + baseMotion1);
    float f2 = fbm(aspectCorrectedUV * 2.4 + baseMotion2 + f1 * 0.45);
    float f3 = fbm(aspectCorrectedUV * 4.8 + f1 * 0.28 + vec2(time) * 0.15);
    float f4 = fbm(aspectCorrectedUV * 6.5 + f2 * 0.18 + vec2(-time * 0.2, time * 0.08));
    float f5 = fbm(aspectCorrectedUV * 8.5 + f3 * 0.12 + vec2(time * 0.15, -time * 0.1));
    
    float distFromCenter = length((aspectCorrectedUV - 0.5) * 2.0);
    float edgeDensity = smoothstep(0.0, 1.8, distFromCenter);
    float edgeSmoke = fbm(aspectCorrectedUV * 3.0 + vec2(time * 0.22, -time * 0.16)) * edgeDensity * 0.65;
    
    float finalNoise = f2 * 0.50 + f3 * 0.25 + f4 * 0.15 + f5 * 0.10 + edgeSmoke;
    finalNoise = mix(finalNoise * 0.85, finalNoise * 1.25, edgeDensity);
    
    vec3 stars = vec3(0.0);
    stars += starField(uv, mousePos, u_time);
    
    for (int i = 1; i <= 5; i++) {
      float trailFactor = 1.0 - float(i) / 5.0;
      float xOffset = -0.03 * float(i);
      vec2 trailPos = mousePos + vec2(xOffset, 0.0);
      vec3 trailStars = starField(uv, trailPos, u_time);
      stars = max(stars, trailStars * trailFactor * 0.8);
    }
    
    vec3 smokeColor;
    if (finalNoise < 0.35) {
      smokeColor = mix(black, darkNavy, smoothstep(0.0, 0.35, finalNoise));
    } else if (finalNoise < 0.65) {
      smokeColor = mix(darkNavy, midnightBlue, smoothstep(0.35, 0.65, finalNoise));
    } else {
      smokeColor = mix(midnightBlue, charcoalGray, smoothstep(0.65, 1.0, finalNoise));
    }
    
    vec3 color = stars;
    float smokeOpacity = smoothstep(0.05, 0.7, finalNoise);
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

// Helper function to detect WebGL support
const detectWebGLSupport = (): boolean | null => {
  try {
    const canvas = document.createElement("canvas");
    return !!(
      window.WebGLRenderingContext &&
      (canvas.getContext("webgl") || canvas.getContext("experimental-webgl"))
    );
  } catch (e) {
    console.warn("WebGL not supported:", e);
    return false;
  }
};

// Types for the shader material
interface ShaderMaterialProps {
  uniforms: {
    u_time: { value: number };
    u_mouse: { value: THREE.Vector2 };
    u_resolution: { value: THREE.Vector2 };
  };
  vertexShader: string;
  fragmentShader: string;
  depthTest: boolean;
  depthWrite: boolean;
  needsUpdate?: boolean;
}

// Simplified smoke effect component to avoid React issues in production
function SimpleSmokeEffect({
  reducedMotion = false,
}: {
  reducedMotion: boolean;
}) {
  const materialRef = useRef<THREE.ShaderMaterial & ShaderMaterialProps>(null);
  const mousePosition = useRef<THREE.Vector2>(new THREE.Vector2(0.5, 0.5));
  const timeRef = useRef<number>(0);
  const { size } = useThree();

  // Setup shader material
  useEffect(() => {
    const material = materialRef.current;
    if (!material) return;

    const handleMouseMove = (event: MouseEvent) => {
      mousePosition.current.x = event.clientX / window.innerWidth;
      mousePosition.current.y = 1.0 - event.clientY / window.innerHeight;
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // Update shader uniforms
  useFrame((_, delta) => {
    const material = materialRef.current;
    if (!material) return;

    if (!reducedMotion) {
      timeRef.current += delta;
    }

    material.uniforms.u_time.value = reducedMotion ? 0 : timeRef.current;
    material.uniforms.u_mouse.value.lerp(mousePosition.current, 0.1);
    material.uniforms.u_resolution.value.set(size.width, size.height);
  });

  return (
    <mesh>
      <planeGeometry args={[2, 2]} />
      <shaderMaterial
        ref={materialRef}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={{
          u_time: { value: 0 },
          u_mouse: { value: new THREE.Vector2(0.5, 0.5) },
          u_resolution: { value: new THREE.Vector2(1, 1) },
        }}
        depthTest={false}
        depthWrite={false}
      />
    </mesh>
  );
}

const MainBackground: React.FC<BackgroundProps> = ({
  reducedMotion = false,
}) => {
  const [webGLSupported, setWebGLSupported] = useState<boolean | null>(null);
  const [renderError, setRenderError] = useState<boolean>(false);

  // Check WebGL support
  useEffect(() => {
    setWebGLSupported(detectWebGLSupport());
  }, []);

  // Static fallback for no WebGL or errors
  if (webGLSupported === false || renderError) {
    console.warn("WebGL not supported or render error, showing fallback");
    return (
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          background: "linear-gradient(to bottom, #020206, #0D1B2A, #1B263B)",
        }}
      />
    );
  }

  // Loading state
  if (webGLSupported === null) {
    return (
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          background: "#020206",
        }}
      />
    );
  }

  // Try rendering with React-Three-Fiber with error boundaries
  try {
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
          gl={{
            powerPreference: "high-performance",
            antialias: false,
            stencil: false,
            depth: false,
            failIfMajorPerformanceCaveat: false,
          }}
          camera={{ position: [0, 0, 1], fov: 60 }}
          dpr={[1, 1.5]}
          style={{ width: "100%", height: "100%" }}
          onError={(error) => {
            console.error("Canvas render error:", error);
            setRenderError(true);
          }}
        >
          <SimpleSmokeEffect reducedMotion={reducedMotion} />
        </Canvas>
      </div>
    );
  } catch (error) {
    console.error("Error rendering MainBackground:", error);
    return (
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          background: "linear-gradient(to bottom, #020206, #0D1B2A, #1B263B)",
        }}
      />
    );
  }
};

// Add display name for React DevTools and error reporting
MainBackground.displayName = "MainBackground";

export default MainBackground;
