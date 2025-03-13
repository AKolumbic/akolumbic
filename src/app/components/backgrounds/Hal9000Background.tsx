"use client";

import React, { useRef, useEffect } from "react";
import { BackgroundProps } from "./types";

// Simple vertex shader that renders a full-screen quad
const vertexShaderSource = `
  attribute vec4 position;
  void main() {
    gl_Position = position;
  }
`;

// Fragment shader for rendering the HAL-Sauron hybrid digital eye
const fragmentShaderSource = `
  precision mediump float;

  uniform float u_time;
  uniform vec2 u_resolution;
  uniform vec2 u_lookDir;

  // Random function for noise generation
  float random(vec2 st) {
    return fract(sin(dot(st.xy, vec2(12.9898, 78.233))) * 43758.5453123);
  }

  // 2D noise
  float noise(in vec2 st) {
    vec2 i = floor(st);
    vec2 f = fract(st);
    
    float a = random(i);
    float b = random(i + vec2(1.0, 0.0));
    float c = random(i + vec2(0.0, 1.0));
    float d = random(i + vec2(1.0, 1.0));

    vec2 u = f * f * (3.0 - 2.0 * f);
    return mix(a, b, u.x) + (c - a)* u.y * (1.0 - u.x) + (d - b) * u.x * u.y;
  }

  // Fractal Brownian Motion
  float fbm(in vec2 st) {
    float value = 0.0;
    float amplitude = 0.5;
    float frequency = 2.0;
    
    for (int i = 0; i < 5; i++) {
        value += amplitude * noise(st * frequency);
        st *= 2.0;
        amplitude *= 0.5;
        frequency *= 2.0;
    }
    return value;
  }

  // Compute a pseudo-normal for sphere mapping
  vec3 getNormal(vec2 uv) {
    float len = length(uv);
    if (len > 1.0) return vec3(0.0, 0.0, 1.0);
    float z = sqrt(1.0 - len * len);
    return normalize(vec3(uv, z));
  }

  // Vertical oval pupil shape for Sauron-like effect with look direction parameter
  float pupilMask(vec2 uv, float time) {
    // Animate pupil dilation
    float dilation = 0.6 + 0.1 * sin(time * 0.5);
    float pupilWidth = 0.2 * dilation;
    float pupilHeight = 0.7 * dilation;
    
    // Apply the look direction offset
    vec2 pupilUV = uv - u_lookDir * 0.3;
    
    // Calculate distance to center, scaled by oval dimensions
    pupilUV.x /= pupilWidth;
    pupilUV.y /= pupilHeight;
    float pupilDist = length(pupilUV);
    
    // Create soft-edged oval mask
    return 1.0 - smoothstep(0.9, 1.0, pupilDist);
  }

  void main() {
    // Normalize pixel coordinates so that center is (0,0)
    vec2 uv = (gl_FragCoord.xy - 0.5 * u_resolution.xy) / (0.5 * u_resolution.y);

    // Compute basic radius for circular boundaries
    float r = length(uv);
    float angle = atan(uv.y, uv.x);
    
    // Apply a pulsating/breathing effect to the entire eye
    float breathe = 1.0 + 0.03 * sin(u_time * 0.7);
    vec2 breatheUV = uv / breathe;
    float breatheR = length(breatheUV);
    
    // Apply swirling fire effect that evolves with time
    float timeScale = u_time * 0.5;
    float swirl = 0.1 * sin(5.0 * angle + timeScale);
    float flameTime = timeScale + fbm(breatheUV * 2.0 + timeScale * 0.1);
    float flame = fbm(vec2(breatheR * 5.0 - flameTime, angle * 3.0));
    
    // Create a dynamic fiery iris
    vec3 fireColor1 = vec3(1.0, 0.2, 0.0);  // Orange-red
    vec3 fireColor2 = vec3(0.9, 0.1, 0.0);  // Deep red
    vec3 fireColor3 = vec3(1.0, 0.7, 0.0);  // Yellow highlights
    
    // Mix fire colors based on noise and radius
    float fireMix = flame * (1.0 - breatheR);
    vec3 fireColor = mix(fireColor2, fireColor1, fireMix);
    fireColor = mix(fireColor, fireColor3, fireMix * fireMix * 0.7);
    
    // Digital circuit pattern overlay
    float circuit = 0.0;
    float circuitScale = 20.0;
    vec2 circuitUV = breatheUV * circuitScale;
    
    // Create horizontal and vertical circuit lines
    float hlines = step(0.9, 1.0 - abs(sin(circuitUV.y * 3.14159)));
    float vlines = step(0.9, 1.0 - abs(sin(circuitUV.x * 3.14159)));
    
    // Create circuit node points at intersections
    float nodes = step(0.95, (1.0 - abs(sin(circuitUV.x * 3.14159))) * (1.0 - abs(sin(circuitUV.y * 3.14159))));
    
    // Combine into circuit pattern
    circuit = max(max(hlines * 0.3, vlines * 0.3), nodes);
    
    // Apply normal mapping for 3D effect
    vec3 normal = getNormal(breatheUV);
    vec3 lightDir = normalize(vec3(0.5 * sin(timeScale), 0.5 * cos(timeScale), 1.0));
    float diffuse = max(dot(normal, lightDir), 0.0);
    
    // Specular highlight - MODIFIED: Reduced intensity and sharpness significantly
    vec3 viewDir = vec3(0.0, 0.0, 1.0);
    vec3 halfDir = normalize(lightDir + viewDir);
    // Reduced specular power and made it more confined to the center
    float spec = pow(max(dot(normal, halfDir), 0.0), 64.0) * 0.3 * (1.0 - smoothstep(0.0, 0.7, breatheR));
    
    // Create the vertical pupil using look direction
    float pupil = pupilMask(breatheUV, u_time);
    float pupilEdge = pupilMask(breatheUV * 0.9, u_time) - pupilMask(breatheUV, u_time);
    
    // Scan lines effect
    float scanline = sin(gl_FragCoord.y * 0.1 + u_time * 5.0) * 0.5 + 0.5;
    scanline = pow(scanline, 10.0) * 0.3;
    
    // Calculate final color
    vec3 color = fireColor * (diffuse * 0.8 + 0.2);
    
    // Add electronic circuit pattern
    color = mix(color, vec3(1.0, 0.3, 0.0), circuit * (1.0 - pupil) * 0.3);
    
    // Add pupil - dark center with glowing edge
    color = mix(color, vec3(0.0, 0.0, 0.0), pupil * 0.9);
    color += vec3(1.0, 0.3, 0.0) * pupilEdge * 2.0;
    
    // MODIFIED: Add much reduced specular highlight and scanlines
    // Limit specular to a smaller area and reduce intensity
    color += vec3(1.0, 0.5, 0.3) * spec * (1.0 - pupil) * 0.5;
    color += vec3(1.0, 0.3, 0.0) * scanline * (1.0 - pupil) * 0.2;
    
    // Apply edge mask for the eye
    float mask = 1.0 - smoothstep(0.8, 1.0, breatheR);
    color *= mask;
    
    // Add subtle outer glow
    float glow = smoothstep(0.8, 1.4, breatheR) * (1.0 - smoothstep(1.4, 1.8, breatheR));
    color += vec3(0.8, 0.0, 0.0) * glow * 0.3;

    gl_FragColor = vec4(color, 1.0);
  }
`;

const Hal9000Background: React.FC<BackgroundProps> = ({
  reducedMotion = false,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationFrameRef = useRef<number>();
  const startTimeRef = useRef<number>(Date.now());
  const isAnimating = useRef(true);

  // Eye movement state
  const lookDirRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const targetLookDirRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const lastLookChangeRef = useRef<number>(0);
  const lookStateRef = useRef<"idle" | "looking" | "returning">("idle");

  // Mouse tracking
  const mousePositionRef = useRef<{ x: number; y: number }>({ x: 0.5, y: 0.5 });
  const isMouseMovingRef = useRef<boolean>(false);
  const lastMouseMoveTimeRef = useRef<number>(0);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) {
      console.error("Canvas not found");
      return;
    }

    const gl = canvas.getContext("webgl", {
      alpha: true,
      antialias: true,
      powerPreference: "high-performance",
    });

    if (!gl) {
      console.error("WebGL not supported");
      return;
    }

    // Create shaders
    const vertexShader = gl.createShader(gl.VERTEX_SHADER);
    const fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);
    if (!vertexShader || !fragmentShader) {
      console.error("Failed to create shaders");
      return;
    }

    gl.shaderSource(vertexShader, vertexShaderSource);
    gl.shaderSource(fragmentShader, fragmentShaderSource);

    // Compile shaders
    gl.compileShader(vertexShader);
    if (!gl.getShaderParameter(vertexShader, gl.COMPILE_STATUS)) {
      console.error(
        "Vertex shader compilation failed:",
        gl.getShaderInfoLog(vertexShader)
      );
      return;
    }

    gl.compileShader(fragmentShader);
    if (!gl.getShaderParameter(fragmentShader, gl.COMPILE_STATUS)) {
      console.error(
        "Fragment shader compilation failed:",
        gl.getShaderInfoLog(fragmentShader)
      );
      return;
    }

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

    gl.useProgram(program);

    // Create buffer for the full-screen quad
    const buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]), // Full screen quad: 2 triangles
      gl.STATIC_DRAW
    );

    // Set up attributes and uniforms
    const positionLocation = gl.getAttribLocation(program, "position");
    const resolutionLocation = gl.getUniformLocation(program, "u_resolution");
    const timeLocation = gl.getUniformLocation(program, "u_time");
    const lookDirLocation = gl.getUniformLocation(program, "u_lookDir");

    if (positionLocation === -1) {
      console.error("Failed to get position attribute location");
      return;
    }
    if (!resolutionLocation || !timeLocation || !lookDirLocation) {
      console.error("Failed to get uniform locations");
      return;
    }

    gl.enableVertexAttribArray(positionLocation);
    gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0);

    // Set up background color - deep dark red
    gl.clearColor(0.1, 0.0, 0.0, 1.0);

    // Handle canvas resize
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
    };

    // Handle mouse movement
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;

      // Get container bounds
      const rect = containerRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      // Calculate normalized mouse position relative to container center (-1 to 1)
      const normalizedX = ((e.clientX - centerX) / (rect.width / 2)) * 0.8;
      const normalizedY = ((e.clientY - centerY) / (rect.height / 2)) * 0.8;

      // Clamp values to ensure they stay within reasonable bounds
      mousePositionRef.current = {
        x: Math.max(-0.8, Math.min(0.8, normalizedX)),
        y: Math.max(-0.8, Math.min(0.8, normalizedY)),
      };

      // Update mouse movement state
      isMouseMovingRef.current = true;
      lastMouseMoveTimeRef.current = Date.now() / 1000;
    };

    // Add mouse event listener
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("resize", resize);
    resize();

    // Render function
    const render = () => {
      if (!isAnimating.current) return;

      gl.clear(gl.COLOR_BUFFER_BIT);

      // Calculate time and pass to shader
      // Use slower animation for reduced motion
      const timeScale = reducedMotion ? 0.1 : 1.0;
      const time = ((Date.now() - startTimeRef.current) / 1000) * timeScale;

      // Handle eye movement based on mouse
      updateEyeMovement(time);

      // Pass uniforms to shader
      gl.uniform1f(timeLocation, time);
      gl.uniform2f(lookDirLocation, lookDirRef.current.x, lookDirRef.current.y);
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);

      animationFrameRef.current = requestAnimationFrame(render);
    };

    // Function to update eye movement based on mouse position
    const updateEyeMovement = (time: number) => {
      const movementSpeed = 3.0; // How fast the eye moves
      const mouseTimeout = 1.5; // Seconds after which we consider mouse "stopped"

      // Check if the mouse has been idle
      const mouseMoveDelta = time - lastMouseMoveTimeRef.current;

      if (isMouseMovingRef.current && mouseMoveDelta < mouseTimeout) {
        // Mouse is active - track it
        targetLookDirRef.current = {
          x: mousePositionRef.current.x,
          y: mousePositionRef.current.y,
        };

        // Occasional slight random offset for more natural movement
        if (Math.random() < 0.01) {
          targetLookDirRef.current = {
            x: targetLookDirRef.current.x + (Math.random() * 0.2 - 0.1),
            y: targetLookDirRef.current.y + (Math.random() * 0.2 - 0.1),
          };
        }

        // Ensure target stays within bounds
        targetLookDirRef.current = {
          x: Math.max(-0.7, Math.min(0.7, targetLookDirRef.current.x)),
          y: Math.max(-0.7, Math.min(0.7, targetLookDirRef.current.y)),
        };

        // Reset look state
        lookStateRef.current = "idle";
        lastLookChangeRef.current = time;
      } else {
        // Mouse has been idle - occasionally perform random movements
        isMouseMovingRef.current = false;

        // Every 4-8 seconds, make a slight random movement if we're not already
        if (
          lookStateRef.current === "idle" &&
          time - lastLookChangeRef.current > 4 + Math.random() * 4
        ) {
          // 40% chance to glance around
          if (Math.random() < 0.4) {
            const currentPos = lookDirRef.current;
            // Make smaller random movements from current position
            targetLookDirRef.current = {
              x: Math.max(
                -0.6,
                Math.min(0.6, currentPos.x + (Math.random() * 0.3 - 0.15))
              ),
              y: Math.max(
                -0.6,
                Math.min(0.6, currentPos.y + (Math.random() * 0.3 - 0.15))
              ),
            };
            lookStateRef.current = "looking";
            lastLookChangeRef.current = time;
          } else {
            // 60% chance to return to center when idle
            if (
              Math.abs(lookDirRef.current.x) > 0.05 ||
              Math.abs(lookDirRef.current.y) > 0.05
            ) {
              targetLookDirRef.current = { x: 0, y: 0 };
              lookStateRef.current = "returning";
              lastLookChangeRef.current = time;
            } else {
              // Reset timer but stay idle
              lastLookChangeRef.current = time;
            }
          }
        }

        // Handle state transitions when not tracking mouse - ensure we don't stay in non-idle states too long
        if (
          lookStateRef.current === "looking" &&
          time - lastLookChangeRef.current > 1.0
        ) {
          // After looking briefly, return to center
          targetLookDirRef.current = { x: 0, y: 0 };
          lookStateRef.current = "returning";
          lastLookChangeRef.current = time;
        } else if (
          lookStateRef.current === "returning" &&
          time - lastLookChangeRef.current > 1.0
        ) {
          // After returning, go back to idle
          lookStateRef.current = "idle";
          lastLookChangeRef.current = time;
        } else if (time - lastLookChangeRef.current > 5.0) {
          // Safeguard: if we've been in any state too long, force return to center
          targetLookDirRef.current = { x: 0, y: 0 };
          lookStateRef.current = "returning";
          lastLookChangeRef.current = time;
        }
      }

      // Smoothly interpolate current position toward target (same for both mouse tracking and idle behavior)
      const currentLookDir = lookDirRef.current;
      const targetLookDir = targetLookDirRef.current;

      // Use appropriate smoothing for different states
      let smoothingFactor;
      if (isMouseMovingRef.current) {
        smoothingFactor = 0.15; // Responsive for mouse movement
      } else if (lookStateRef.current === "returning") {
        smoothingFactor = 0.12; // Medium speed for returning to center
      } else {
        smoothingFactor = 0.07; // Slower for random movements
      }

      // Calculate time delta with a maximum cap to prevent large jumps
      const delta = Math.min(0.1, time - lastLookChangeRef.current);

      lookDirRef.current = {
        x:
          currentLookDir.x +
          (targetLookDir.x - currentLookDir.x) *
            smoothingFactor *
            movementSpeed *
            delta,
        y:
          currentLookDir.y +
          (targetLookDir.y - currentLookDir.y) *
            smoothingFactor *
            movementSpeed *
            delta,
      };

      // Hard limit to ensure we never exceed bounds
      lookDirRef.current = {
        x: Math.max(-0.7, Math.min(0.7, lookDirRef.current.x)),
        y: Math.max(-0.7, Math.min(0.7, lookDirRef.current.y)),
      };

      // If we're very close to target, snap to it to avoid tiny movements
      if (
        Math.abs(currentLookDir.x - targetLookDir.x) < 0.005 &&
        Math.abs(currentLookDir.y - targetLookDir.y) < 0.005
      ) {
        lookDirRef.current = { ...targetLookDir };
      }

      // Safety check: if values are NaN, reset to center
      if (isNaN(lookDirRef.current.x) || isNaN(lookDirRef.current.y)) {
        lookDirRef.current = { x: 0, y: 0 };
        targetLookDirRef.current = { x: 0, y: 0 };
      }
    };

    // Handle reduced motion preference
    isAnimating.current = !reducedMotion;

    // Always show a static frame for reduced motion
    if (reducedMotion) {
      gl.uniform1f(timeLocation, 0.0); // Static time
      gl.uniform2f(lookDirLocation, 0, 0); // Look straight ahead
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
    } else {
      render();
    }

    // Cleanup function
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      isAnimating.current = false;
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", handleMouseMove);

      // Clean up WebGL resources
      gl.deleteProgram(program);
      gl.deleteShader(vertexShader);
      gl.deleteShader(fragmentShader);
      gl.deleteBuffer(buffer);
    };
  }, [reducedMotion]);

  return (
    <div
      ref={containerRef}
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        backgroundColor: "#220000",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        style={{
          position: "relative",
          width: "60%",
          maxWidth: "500px",
          height: "60%",
          maxHeight: "500px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {/* Dark circular panel behind eye */}
        <div
          style={{
            position: "absolute",
            width: "100%",
            height: "100%",
            borderRadius: "50%",
            backgroundColor: "#1A0000",
            boxShadow:
              "0 0 30px rgba(255,50,0,0.3), inset 0 0 15px rgba(0,0,0,0.8)",
          }}
        />

        {/* Eye */}
        <canvas
          ref={canvasRef}
          style={{
            position: "absolute",
            width: "80%",
            height: "80%",
            zIndex: 10,
          }}
        />

        {/* Text below Eye */}
        <div
          style={{
            position: "absolute",
            bottom: "-60px",
            textAlign: "center",
            color: "#ff3300",
            fontFamily: "monospace",
            fontSize: "1.2rem",
            textShadow: "0 0 5px rgba(255, 50, 0, 0.7)",
            letterSpacing: "2px",
          }}
        >
          HAL-SAURON
        </div>
      </div>
    </div>
  );
};

export default Hal9000Background;
