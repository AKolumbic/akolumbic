"use client";

import React, { useRef, useEffect } from "react";
import { BackgroundProps } from "./types";

const vertexShaderSource = `
  attribute vec4 position;
  void main() {
    gl_Position = position;
  }
`;

const fragmentShaderSource = `
  precision highp float;
  uniform vec2 r;
  uniform float t;
  
  void main() {
    // Normalize coordinates
    vec2 p = (gl_FragCoord.xy * 2.0 - r) / r.y / 0.7;
    vec2 d = vec2(0.0, 1.0); // Changed from (-1.0, 1.0) to (0.0, 1.0) to align horizontally
    
    // Create base pattern with horizontal orientation
    vec2 c = p * mat2(1.0, 0.0, 0.0, 1.0) * mat2(1.0, 0.0, d / (0.1 + 5.0 / dot(5.0 * p - d, 5.0 * p - d)));
    vec2 v = c;
    
    // Apply time-based transformation with reduced speed (0.1 instead of 0.2)
    v *= mat2(cos(log(length(v)) + t * 0.1 + vec2(0.0, 33.0)), cos(log(length(v)) + t * 0.1 + vec2(11.0, 0.0))) * 5.0;
    
    // Initialize output color
    vec4 o = vec4(0.0);
    
    // Build up the pattern with reduced iterations for performance
    for(float i = 0.0; i < 9.0; i++) {
      o += sin(vec4(v.x, v.y, v.y, v.x)) + 1.0;
      v += 0.7 * sin(v.yx * i + t * 0.5) / (i + 1.0) + 0.5; // Slowed down the inner animation too
    }
    
    // Calculate final pattern with horizontal orientation
    o = 1.0 - exp(
      -exp(c.x * vec4(0.6, -0.4, -1.0, 0.0)) / o /
      (0.1 + 0.1 * pow(length(sin(v / 0.3) * 0.2 + c * vec2(1.0, 1.0)) - 1.0, 2.0)) /
      (1.0 + 7.0 * exp(0.3 * c.y - dot(c, c))) /
      (0.03 + abs(length(p) - 0.7)) * 0.2
    );
    
    gl_FragColor = o;
  }
`;

const BlackHoleBackground: React.FC<BackgroundProps> = ({ reducedMotion }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationFrameRef = useRef<number>();
  const startTimeRef = useRef<number>(Date.now());
  const isAnimating = useRef(true);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) {
      console.error("Canvas not found");
      return;
    }

    const gl = canvas.getContext("webgl", {
      alpha: false,
      antialias: true,
      powerPreference: "high-performance", // Request high-performance GPU
    });
    if (!gl) {
      console.error("WebGL not supported");
      return;
    }

    console.log("WebGL context created successfully");

    // Create shaders
    const vertexShader = gl.createShader(gl.VERTEX_SHADER);
    const fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);
    if (!vertexShader || !fragmentShader) {
      console.error("Failed to create shaders");
      return;
    }

    gl.shaderSource(vertexShader, vertexShaderSource);
    gl.shaderSource(fragmentShader, fragmentShaderSource);

    // Compile shaders and check for errors
    gl.compileShader(vertexShader);
    if (!gl.getShaderParameter(vertexShader, gl.COMPILE_STATUS)) {
      console.error(
        "Vertex shader compilation failed:",
        gl.getShaderInfoLog(vertexShader)
      );
      return;
    }
    console.log("Vertex shader compiled successfully");

    gl.compileShader(fragmentShader);
    if (!gl.getShaderParameter(fragmentShader, gl.COMPILE_STATUS)) {
      console.error(
        "Fragment shader compilation failed:",
        gl.getShaderInfoLog(fragmentShader)
      );
      return;
    }
    console.log("Fragment shader compiled successfully");

    // Create and link program
    const program = gl.createProgram();
    if (!program) {
      console.error("Failed to create program");
      return;
    }

    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);

    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      console.error("Program linking failed:", gl.getProgramInfoLog(program));
      return;
    }
    console.log("Program linked successfully");

    gl.useProgram(program);

    // Create buffer
    const buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]),
      gl.STATIC_DRAW
    );

    // Set up attributes and uniforms
    const positionLocation = gl.getAttribLocation(program, "position");
    const resolutionLocation = gl.getUniformLocation(program, "r");
    const timeLocation = gl.getUniformLocation(program, "t");

    if (positionLocation === -1) {
      console.error("Failed to get position attribute location");
      return;
    }
    if (!resolutionLocation || !timeLocation) {
      console.error("Failed to get uniform locations");
      return;
    }

    gl.enableVertexAttribArray(positionLocation);
    gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0);

    // Clear color to black
    gl.clearColor(0.0, 0.0, 0.0, 1.0);

    const resize = () => {
      const pixelRatio = window.devicePixelRatio || 1;
      const width = window.innerWidth * pixelRatio;
      const height = window.innerHeight * pixelRatio;

      canvas.width = width;
      canvas.height = height;
      canvas.style.width = window.innerWidth + "px";
      canvas.style.height = window.innerHeight + "px";

      gl.viewport(0, 0, width, height);
      gl.uniform2f(resolutionLocation, width, height);
      console.log(`Canvas resized to ${width}x${height}`);
    };

    window.addEventListener("resize", resize);
    resize();

    const render = () => {
      if (!isAnimating.current) return;

      gl.clear(gl.COLOR_BUFFER_BIT);
      const time = (Date.now() - startTimeRef.current) / 1000;
      gl.uniform1f(timeLocation, time);
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
      animationFrameRef.current = requestAnimationFrame(render);
    };

    // Handle reduced motion preference
    isAnimating.current = !reducedMotion;
    if (isAnimating.current) {
      console.log("Starting render loop with normal motion");
      render();
    } else {
      console.log("Reduced motion mode: rendering single frame");
      // Render one frame for static view
      gl.clear(gl.COLOR_BUFFER_BIT);
      gl.uniform1f(timeLocation, 0);
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
    }

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      isAnimating.current = false;
      window.removeEventListener("resize", resize);
      gl.deleteProgram(program);
      gl.deleteShader(vertexShader);
      gl.deleteShader(fragmentShader);
      gl.deleteBuffer(buffer);
    };
  }, [reducedMotion]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        background: "#000",
      }}
    />
  );
};

export default BlackHoleBackground;
