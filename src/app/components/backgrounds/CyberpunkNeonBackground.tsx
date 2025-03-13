"use client";

import React, { useRef, useEffect, useState } from "react";
import { BackgroundProps } from "./types";
import { useReducedMotion } from "framer-motion";

// Cyberpunk Neon Background Component
const CyberpunkNeonBackground: React.FC<
  BackgroundProps & {
    className?: string;
    style?: React.CSSProperties;
    children?: React.ReactNode;
  }
> = ({ className, style, children }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const reducedMotion = useReducedMotion();
  const [mousePosition, setMousePosition] = useState({ x: 0.5, y: 0.5 });
  const animationRef = useRef<number>(0);
  const shaderProgramRef = useRef<WebGLProgram | null>(null);
  const startTimeRef = useRef<number>(Date.now());

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      if (canvasRef.current) {
        const { width, height } = canvasRef.current.getBoundingClientRect();
        canvasRef.current.width = width;
        canvasRef.current.height = height;
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Track mouse position for interactive effects
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (canvasRef.current) {
        const { width, height } = canvasRef.current.getBoundingClientRect();
        const x = e.clientX / width;
        const y = 1.0 - e.clientY / height; // Invert Y for WebGL
        setMousePosition({ x, y });
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // Initialize WebGL and create shaders
  useEffect(() => {
    if (!canvasRef.current) return;

    const canvas = canvasRef.current;
    const gl = canvas.getContext("webgl", {
      premultipliedAlpha: false,
      alpha: true,
    });

    if (!gl) {
      console.error("WebGL not supported");
      return;
    }

    // Clear with deep indigo background
    gl.clearColor(0.04, 0.04, 0.14, 1.0);

    // Vertex shader - basic passthrough for coordinates
    const vsSource = `
      attribute vec4 aVertexPosition;
      attribute vec2 aTextureCoord;
      
      varying highp vec2 vTextureCoord;
      
      void main(void) {
        gl_Position = aVertexPosition;
        vTextureCoord = aTextureCoord;
      }
    `;

    // Fragment shader - creates the cyberpunk effect
    const fsSource = `
      precision highp float;
      varying highp vec2 vTextureCoord;
      
      uniform vec2 u_resolution;
      uniform vec2 u_mouse;
      uniform float u_time;
      uniform bool u_reduced_motion;
      
      // Colors
      const vec3 neonPink = vec3(1.0, 0.0, 0.56);   // #FF0090
      const vec3 deepIndigo = vec3(0.04, 0.04, 0.14); // #0A0A23
      const vec3 electricCyan = vec3(0.0, 1.0, 1.0);  // #00FFFF
      const vec3 neonPurple = vec3(0.6, 0.0, 1.0);    // #9900FF
      
      // Hash function for pseudo-random values
      float hash(vec2 p) {
        p = fract(p * vec2(123.34, 456.21));
        p += dot(p, p + 45.32);
        return fract(p.x * p.y);
      }
      
      // Smooth noise
      float noise(vec2 p) {
        vec2 i = floor(p);
        vec2 f = fract(p);
        f = f * f * (3.0 - 2.0 * f);
        
        float a = hash(i);
        float b = hash(i + vec2(1.0, 0.0));
        float c = hash(i + vec2(0.0, 1.0));
        float d = hash(i + vec2(1.0, 1.0));
        
        return mix(
          mix(a, b, f.x),
          mix(c, d, f.x),
          f.y
        );
      }
      
      // Create neon glow effect
      float neonGlow(vec2 uv, vec2 pos, float radius, float intensity) {
        float dist = length(uv - pos);
        return pow(radius / dist, intensity);
      }
      
      // Draw a neon line with glow
      float neonLine(vec2 uv, vec2 start, vec2 end, float width, float glow) {
        vec2 dir = end - start;
        float len = length(dir);
        dir = normalize(dir);
        
        vec2 perpendicular = vec2(-dir.y, dir.x);
        vec2 point = uv - start;
        
        float projection = clamp(dot(point, dir), 0.0, len);
        float dist = length(point - dir * projection);
        
        return smoothstep(width + glow, width, dist) * 
              smoothstep(0.0, 0.1, projection) * 
              smoothstep(0.0, 0.1, len - projection);
      }
      
      // Create a grid of lines
      float grid(vec2 uv, float size, float lineWidth) {
        vec2 grid = fract(uv * size);
        
        float horizontalLine = smoothstep(lineWidth, 0.0, abs(grid.y - 0.5));
        float verticalLine = smoothstep(lineWidth, 0.0, abs(grid.x - 0.5));
        
        return max(horizontalLine, verticalLine);
      }
      
      // Flickering effect
      float flicker(float time, float speed, float intensity) {
        return 1.0 - intensity * (0.5 + 0.5 * sin(time * speed));
      }
      
      void main() {
        vec2 uv = vTextureCoord;
        vec2 center = vec2(0.5, 0.5);
        
        // Adjust UV based on mouse position (subtle movement)
        uv += (u_mouse - center) * 0.05;
        
        // Base color (deep indigo)
        vec3 color = deepIndigo;
        
        // Time calculation (use 0 for reduced motion)
        float time = u_reduced_motion ? 0.0 : u_time;
        
        // Create a grid
        float gridPattern = grid(uv, 20.0, 0.02) * 0.15;
        color += gridPattern * electricCyan;
        
        // Create animated horizontal scan lines
        float scanLine = smoothstep(0.04, 0.0, abs(fract(uv.y * 100.0 - time * 0.1) - 0.5)) * 0.1;
        color += scanLine * electricCyan;
        
        // Neon City Skyline
        // Define several buildings with neon outlines
        for (int i = 0; i < 5; i++) {
          float fi = float(i) / 5.0;
          float xPos = fract(fi * 1.2 + 0.05);
          float height = 0.1 + hash(vec2(fi, 0.42)) * 0.2;
          float width = 0.05 + hash(vec2(fi, 0.91)) * 0.05;
          
          // Building position
          vec2 buildingPos = vec2(xPos, 0.0);
          vec2 buildingSize = vec2(width, height);
          
          // Building shape
          vec2 buildingUV = uv - buildingPos;
          if (buildingUV.x > 0.0 && buildingUV.x < buildingSize.x && 
              buildingUV.y > 0.0 && buildingUV.y < buildingSize.y) {
            
            // Windows
            vec2 windowUV = fract(buildingUV * vec2(10.0, 15.0));
            float window = step(0.8, windowUV.x) * step(0.8, windowUV.y);
            
            // Random window lights with flickering
            float windowLight = window * step(0.6, hash(floor(buildingUV * vec2(10.0, 15.0))));
            float flick = flicker(time + hash(floor(buildingUV * vec2(10.0, 15.0))), 
                                  2.0 + hash(vec2(fi, 0.1)) * 5.0, 0.3);
            
            // Add window lights to the building
            color += windowLight * flick * mix(neonPink, electricCyan, hash(vec2(fi, 0.23)));
          }
          
          // Building outline
          float outline = neonLine(uv, buildingPos, buildingPos + vec2(0.0, buildingSize.y), 0.002, 0.005);
          outline += neonLine(uv, buildingPos, buildingPos + vec2(buildingSize.x, 0.0), 0.002, 0.005);
          outline += neonLine(uv, buildingPos + vec2(buildingSize.x, 0.0), 
                              buildingPos + buildingSize, 0.002, 0.005);
          outline += neonLine(uv, buildingPos + vec2(0.0, buildingSize.y), 
                              buildingPos + buildingSize, 0.002, 0.005);
                              
          color += outline * neonPink * flicker(time + fi, 1.0 + hash(vec2(fi, 0.76)) * 3.0, 0.2);
        }
        
        // Floating neon geometric shapes
        for (int i = 0; i < 8; i++) {
          float fi = float(i) / 8.0;
          
          // Position with subtle animation
          float xOffset = u_reduced_motion ? 0.0 : sin(time * (0.5 + fi) + fi * 10.0) * 0.1;
          float yOffset = u_reduced_motion ? 0.0 : cos(time * (0.3 + fi) + fi * 5.0) * 0.08;
          
          vec2 shapePos = vec2(
            0.2 + fi * 0.8 + xOffset,
            0.4 + hash(vec2(fi, 0.32)) * 0.4 + yOffset
          );
          
          // Size of shape
          float shapeSize = 0.01 + hash(vec2(fi, 0.67)) * 0.02;
          
          // Draw neon glow based on shape type
          float shapeSeed = hash(vec2(fi, 0.89));
          float shape;
          
          if (shapeSeed < 0.33) {
            // Triangle
            vec2 p = uv - shapePos;
            float angle = atan(p.y, p.x) + time * (hash(vec2(fi, 0.43)) - 0.5) * 0.5;
            float radius = length(p);
            float triangle = smoothstep(0.01, 0.0, abs(radius - shapeSize) - 0.002) *
                          step(cos(angle * 3.0 + fi), 0.3);
            shape = triangle;
          } else if (shapeSeed < 0.66) {
            // Circle
            shape = neonGlow(uv, shapePos, shapeSize, 2.0);
            shape = smoothstep(0.3, 1.0, shape) * 0.8;
          } else {
            // Rectangle
            vec2 p = abs(uv - shapePos);
            float rect = smoothstep(0.01, 0.0, max(p.x - shapeSize, p.y - shapeSize * 1.5) - 0.002);
            shape = rect;
          }
          
          // Flicker the shape
          float flick = flicker(time + fi, 2.0 + hash(vec2(fi, 0.27)) * 5.0, 0.3);
          
          // Color based on position
          vec3 shapeColor = mix(
            mix(neonPink, electricCyan, hash(vec2(fi, 0.55))),
            neonPurple,
            hash(vec2(fi, 0.78))
          );
          
          color += shape * shapeColor * flick;
        }
        
        // Add horizontal neon lines (roads)
        for (int i = 0; i < 3; i++) {
          float fi = float(i) / 3.0;
          float y = 0.1 + fi * 0.15;
          
          float road = neonLine(
            uv, 
            vec2(0.0, y), 
            vec2(1.0, y), 
            0.001, 
            0.006
          );
          
          // Traffic flow animation
          float traffic = sin(uv.x * 30.0 + time * (1.0 + fi));
          traffic = smoothstep(0.7, 1.0, traffic) * 0.5;
          
          color += road * mix(electricCyan, neonPink, fi) * (0.8 + traffic);
        }
        
        // Add a subtle vignette
        float vignette = 1.0 - smoothstep(0.4, 0.8, length(uv - center));
        color *= vignette;
        
        // Bloom/glow effect by slight blurring of bright areas
        vec2 pixelSize = 1.0 / u_resolution;
        float bloom = 0.0;
        
        for (int i = -2; i <= 2; i++) {
          for (int j = -2; j <= 2; j++) {
            vec2 offset = vec2(float(i), float(j)) * pixelSize * 3.0;
            vec2 sampleUV = uv + offset;
            
            // Calculate the brightness at this pixel
            vec2 sampleCenter = vec2(0.5, 0.5);
            sampleUV += (u_mouse - sampleCenter) * 0.05;
            
            // Recalculate grid and neon effects (simplified)
            float sampleGrid = grid(sampleUV, 20.0, 0.02) * 0.15;
            bloom += sampleGrid;
          }
        }
        
        bloom /= 25.0; // Average the samples
        color += bloom * electricCyan * 0.3; // Add bloom to the final color
        
        // Output final color
        gl_FragColor = vec4(color, 1.0);
      }
    `;

    // Create shader program
    const vertexShader = gl.createShader(gl.VERTEX_SHADER);
    if (!vertexShader) {
      console.error("Failed to create vertex shader");
      return;
    }
    gl.shaderSource(vertexShader, vsSource);
    gl.compileShader(vertexShader);

    if (!gl.getShaderParameter(vertexShader, gl.COMPILE_STATUS)) {
      console.error(
        "Vertex shader compilation failed:",
        gl.getShaderInfoLog(vertexShader)
      );
      gl.deleteShader(vertexShader);
      return;
    }

    const fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);
    if (!fragmentShader) {
      console.error("Failed to create fragment shader");
      return;
    }
    gl.shaderSource(fragmentShader, fsSource);
    gl.compileShader(fragmentShader);

    if (!gl.getShaderParameter(fragmentShader, gl.COMPILE_STATUS)) {
      console.error(
        "Fragment shader compilation failed:",
        gl.getShaderInfoLog(fragmentShader)
      );
      gl.deleteShader(fragmentShader);
      return;
    }

    const shaderProgram = gl.createProgram();
    if (!shaderProgram) {
      console.error("Failed to create shader program");
      return;
    }

    gl.attachShader(shaderProgram, vertexShader);
    gl.attachShader(shaderProgram, fragmentShader);
    gl.linkProgram(shaderProgram);

    if (!gl.getProgramParameter(shaderProgram, gl.LINK_STATUS)) {
      console.error(
        "Shader program linking failed:",
        gl.getProgramInfoLog(shaderProgram)
      );
      return;
    }

    shaderProgramRef.current = shaderProgram;

    // Create buffers
    const positionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    const positions = [-1.0, -1.0, 1.0, -1.0, -1.0, 1.0, 1.0, 1.0];
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positions), gl.STATIC_DRAW);

    const textureCoordBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, textureCoordBuffer);
    const textureCoordinates = [0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 1.0, 1.0];
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array(textureCoordinates),
      gl.STATIC_DRAW
    );

    // Animation loop
    const render = () => {
      if (!gl || !shaderProgramRef.current) return;

      gl.clearColor(0.04, 0.04, 0.14, 1.0);
      gl.clear(gl.COLOR_BUFFER_BIT);

      gl.useProgram(shaderProgramRef.current);

      // Set uniforms
      const timeUniformLocation = gl.getUniformLocation(
        shaderProgramRef.current,
        "u_time"
      );
      const mouseUniformLocation = gl.getUniformLocation(
        shaderProgramRef.current,
        "u_mouse"
      );
      const resolutionUniformLocation = gl.getUniformLocation(
        shaderProgramRef.current,
        "u_resolution"
      );
      const reducedMotionUniformLocation = gl.getUniformLocation(
        shaderProgramRef.current,
        "u_reduced_motion"
      );

      const elapsedTime = (Date.now() - startTimeRef.current) / 1000.0;
      gl.uniform1f(timeUniformLocation, elapsedTime);
      gl.uniform2f(mouseUniformLocation, mousePosition.x, mousePosition.y);
      gl.uniform2f(resolutionUniformLocation, canvas.width, canvas.height);
      gl.uniform1i(reducedMotionUniformLocation, reducedMotion ? 1 : 0);

      // Set position attribute
      const positionAttributeLocation = gl.getAttribLocation(
        shaderProgramRef.current,
        "aVertexPosition"
      );
      gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
      gl.vertexAttribPointer(
        positionAttributeLocation,
        2,
        gl.FLOAT,
        false,
        0,
        0
      );
      gl.enableVertexAttribArray(positionAttributeLocation);

      // Set texture coordinate attribute
      const textureCoordAttributeLocation = gl.getAttribLocation(
        shaderProgramRef.current,
        "aTextureCoord"
      );
      gl.bindBuffer(gl.ARRAY_BUFFER, textureCoordBuffer);
      gl.vertexAttribPointer(
        textureCoordAttributeLocation,
        2,
        gl.FLOAT,
        false,
        0,
        0
      );
      gl.enableVertexAttribArray(textureCoordAttributeLocation);

      // Draw
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);

      // Request next frame
      animationRef.current = requestAnimationFrame(render);
    };

    // Start the animation
    render();

    // Cleanup
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      if (gl && shaderProgramRef.current) {
        gl.deleteProgram(shaderProgramRef.current);
        shaderProgramRef.current = null;
      }
    };
  }, [mousePosition, reducedMotion]);

  return (
    <div
      className={className}
      style={{
        position: "relative",
        width: "100%",
        height: "100%",
        overflow: "hidden",
        background: "#0A0A23",
        ...style,
      }}
    >
      <canvas
        ref={canvasRef}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
        }}
      />
      {children}
    </div>
  );
};

export default CyberpunkNeonBackground;
