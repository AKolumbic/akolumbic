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

// Fragment shader for rendering the Aurora Borealis
// Adapted from "Auroras by nimitz 2017 (twitter: @stormoid)"
// License: Creative Commons Attribution-NonCommercial-ShareAlike 3.0 Unported License
const fragmentShaderSource = `
  precision highp float;

  uniform float u_time;
  uniform vec2 u_resolution;
  uniform vec2 u_mouse;

  #define time u_time
  #define iResolution u_resolution
  #define iMouse vec4(u_mouse, 0.0, 0.0)

  mat2 mm2(in float a){float c = cos(a), s = sin(a);return mat2(c,s,-s,c);}
  mat2 m2 = mat2(0.95534, 0.29552, -0.29552, 0.95534);
  float tri(in float x){return clamp(abs(fract(x)-.5),0.01,0.49);}
  vec2 tri2(in vec2 p){return vec2(tri(p.x)+tri(p.y),tri(p.y+tri(p.x)));}

  float triNoise2d(in vec2 p, float spd)
  {
      float z=1.8;
      float z2=2.5;
      float rz = 0.;
      p *= mm2(p.x*0.06);
      vec2 bp = p;
      for (float i=0.; i<5.; i++ )
      {
          vec2 dg = tri2(bp*1.85)*.75;
          dg *= mm2(time*spd);
          p -= dg/z2;

          bp *= 1.3;
          z2 *= .45;
          z *= .42;
          p *= 1.21 + (rz-1.0)*.02;
          
          rz += tri(p.x+tri(p.y))*z;
          p*= -m2;
      }
      return clamp(1./pow(rz*29., 1.3),0.,.55);
  }

  float hash21(in vec2 n){ return fract(sin(dot(n, vec2(12.9898, 4.1414))) * 43758.5453); }
  
  vec4 aurora(vec3 ro, vec3 rd)
  {
      vec4 col = vec4(0);
      vec4 avgCol = vec4(0);
      
      for(float i=0.;i<50.;i++)
      {
          float of = 0.006*hash21(gl_FragCoord.xy)*smoothstep(0.,15., i);
          float pt = ((.8+pow(i,1.4)*.002)-ro.y)/(rd.y*2.+0.4);
          pt -= of;
          vec3 bpos = ro + pt*rd;
          vec2 p = bpos.zx;
          float rzt = triNoise2d(p, 0.06);
          vec4 col2 = vec4(0,0,0, rzt);
          col2.rgb = (sin(1.-vec3(2.15,-.5, 1.2)+i*0.043)*0.5+0.5)*rzt;
          avgCol =  mix(avgCol, col2, .5);
          col += avgCol*exp2(-i*0.065 - 2.5)*smoothstep(0.,5., i);
      }
      
      col *= (clamp(rd.y*15.+.4,0.,1.));
      
      return col*1.8;
  }

  // Improved Background and Stars functions
  float hash(vec3 p) {
    p = fract(p * vec3(443.8975, 397.2973, 491.1871));
    p += dot(p.zxy, p.yxz + 19.19);
    return fract(p.x * p.y * p.z);
  }

  vec3 stars(in vec3 p)
  {
      vec3 c = vec3(0.);
      float res = max(iResolution.x, iResolution.y) * 0.8; // Adjust resolution factor
      
      for (float i=0.;i<4.;i++)
      {
          vec3 q = fract(p*(.15*res))-0.5;
          vec3 id = floor(p*(.15*res));
          float rn = hash(id); // Use new hash function
          
          // Make stars rounder and less grid-like
          float star = smoothstep(0.93, 1.0, 1.0 - length(q) * 2.0);
          
          // Make stars more sparse and vary their intensity more naturally
          float brightness = smoothstep(0.9, 1.0, rn) * smoothstep(0.0, 0.3, rn);
          
          // Apply star color
          vec3 starColor = mix(vec3(0.7, 0.8, 1.0), vec3(1.0, 0.8, 0.5), rn);
          
          c += star * brightness * starColor * (0.5 + 0.5 * sin(time * 0.3 + rn * 10.0));
          p *= 1.3;
      }
      
      return c * 0.5; // Reduce overall star brightness
  }

  vec3 bg(in vec3 rd)
  {
      float sd = dot(normalize(vec3(-0.5, -0.6, 0.9)), rd)*0.5+0.5;
      sd = pow(sd, 5.);
      vec3 col = mix(vec3(0.02, 0.05, 0.15), vec3(0.05, 0.02, 0.15), sd);
      return col*.63;
  }

  void main()
  {
      vec2 q = gl_FragCoord.xy / iResolution.xy;
      vec2 p = q - 0.5;
      p.x *= iResolution.x/iResolution.y;
      
      vec3 ro = vec3(0,0,-6.7);
      vec3 rd = normalize(vec3(p,1.3));
      
      // Get mouse position and scale it down to reduce panning speed
      vec2 mo = iMouse.xy / iResolution.xy-.5;
      mo = (mo==vec2(-.5))?mo=vec2(-0.1,0.1):mo;
      // Scale down mouse movement by 0.4 to make panning slower
      mo *= 0.4;
      mo.x *= iResolution.x/iResolution.y;
      
      // Apply rotation to ray direction based on scaled mouse position
      rd.yz *= mm2(mo.y);
      rd.xz *= mm2(mo.x + sin(time*0.05)*0.2);
      
      vec3 col = vec3(0.);
      vec3 brd = rd;
      float fade = smoothstep(0.,0.01,abs(brd.y))*0.1+0.9;
      
      col = bg(rd)*fade;
      
      if (rd.y > 0.){
          vec4 aur = smoothstep(0.,1.5,aurora(ro,rd))*fade;
          col += stars(rd);
          col = col*(1.-aur.a) + aur.rgb;
      }
      else // Reflections
      {
          rd.y = abs(rd.y);
          col = bg(rd)*fade*0.6;
          vec4 aur = smoothstep(0.0,2.5,aurora(ro,rd));
          col += stars(rd)*0.1;
          col = col*(1.-aur.a) + aur.rgb;
          vec3 pos = ro + ((0.5-ro.y)/rd.y)*rd;
          float nz2 = triNoise2d(pos.xz*vec2(.5,.7), 0.);
          col += mix(vec3(0.2,0.25,0.5)*0.08,vec3(0.3,0.3,0.5)*0.7, nz2*0.4);
      }
      
      // Add subtle vignette effect to reduce any visible grid patterns at the edges
      float vignette = smoothstep(0.0, 0.5, 1.0 - length(q - 0.5) * 1.3);
      col *= mix(0.9, 1.0, vignette);
      
      gl_FragColor = vec4(col, 1.);
  }
`;

const AuroraBackground: React.FC<BackgroundProps> = ({
  reducedMotion = false,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationFrameRef = useRef<number>();
  const startTimeRef = useRef<number>(Date.now());
  const isAnimating = useRef(true);

  // Mouse tracking state
  const mousePositionRef = useRef<{ x: number; y: number }>({ x: 0.5, y: 0.5 });
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
    const mouseLocation = gl.getUniformLocation(program, "u_mouse");

    if (positionLocation === -1) {
      console.error("Failed to get position attribute location");
      return;
    }
    if (!resolutionLocation || !timeLocation || !mouseLocation) {
      console.error("Failed to get uniform locations");
      return;
    }

    gl.enableVertexAttribArray(positionLocation);
    gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0);

    // Set up background color - deep blue/black
    gl.clearColor(0.02, 0.05, 0.1, 1.0);

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

      // Calculate normalized mouse position (0-1)
      const normalizedX = e.clientX / window.innerWidth;
      const normalizedY = e.clientY / window.innerHeight;

      // Add mouse position smoothing with dampening factor
      const currentX = mousePositionRef.current.x / canvas.width;
      const currentY = mousePositionRef.current.y / canvas.height;

      // Lerp (linear interpolation) between current position and target for smooth movement
      const dampening = 0.1; // Lower values = smoother/slower movement
      const newX = currentX + (normalizedX - currentX) * dampening;
      const newY = currentY + (normalizedY - currentY) * dampening;

      // Update mouse position
      mousePositionRef.current = {
        x: newX * canvas.width,
        y: (1.0 - newY) * canvas.height, // Invert Y for WebGL coordinates
      };
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

      // Pass uniforms to shader
      gl.uniform1f(timeLocation, time);
      gl.uniform2f(
        mouseLocation,
        mousePositionRef.current.x,
        mousePositionRef.current.y
      );
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);

      animationFrameRef.current = requestAnimationFrame(render);
    };

    // Handle reduced motion preference
    isAnimating.current = !reducedMotion;

    // Always show a static frame for reduced motion
    if (reducedMotion) {
      gl.uniform1f(timeLocation, 0.0); // Static time
      gl.uniform2f(mouseLocation, canvas.width / 2, canvas.height / 2); // Center the view
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
        backgroundColor: "#020510",
        overflow: "hidden",
      }}
    >
      <canvas
        ref={canvasRef}
        style={{
          position: "absolute",
          width: "100%",
          height: "100%",
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: "10px",
          right: "10px",
          color: "rgba(255, 255, 255, 0.5)",
          fontSize: "10px",
          fontFamily: "monospace",
          textAlign: "right",
        }}
      >
        Aurora shader by nimitz (2017)
      </div>
    </div>
  );
};

export default AuroraBackground;
