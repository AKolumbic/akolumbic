"use client";

import React, { useEffect, useRef } from "react";
import styled from "styled-components";
import { BackgroundProps } from "./types";

// Digital Rain colors
interface DigitalRainColors {
  primary?: string; // Neon Green
  background?: string; // Dark Green/Black
  accent?: string; // Bright Lime
}

const defaultColors: DigitalRainColors = {
  primary: "#00FF41", // Neon Green
  background: "#011401", // Dark Green/Black
  accent: "#00CC33", // Bright Lime
};

const Container = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
`;

const Canvas = styled.canvas`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
`;

// Main Digital Rain background component
const DigitalRainBackground: React.FC<BackgroundProps> = ({
  colors,
  reducedMotion = false,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rainColors = {
    primary: colors?.primary || defaultColors.primary,
    background: colors?.background || defaultColors.background,
    accent: colors?.accent || defaultColors.accent,
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Set canvas dimensions to match window size
    const setCanvasSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    setCanvasSize();
    window.addEventListener("resize", setCanvasSize);

    // Generate characters for the rain
    const chars =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789$+-*/=%\"'#&_(),.;:?!\\|{}<>[]^~";

    // Define rain drops
    class RainDrop {
      x: number;
      y: number;
      speed: number;
      text: string;
      fontSize: number;
      opacity: number;
      maxLength: number;
      characters: { char: string; opacity: number }[];

      constructor(x: number, fontSize: number) {
        this.x = x;
        this.y = Math.random() * -100; // Start above the canvas
        this.speed = 1 + Math.random() * 3;
        this.fontSize = fontSize;
        this.opacity = 0.1 + Math.random() * 0.7;
        this.maxLength = 10 + Math.floor(Math.random() * 20); // Length of the trail
        this.characters = [];

        // Slower animation if reduced motion is enabled
        if (reducedMotion) {
          this.speed *= 0.5;
        }
      }

      update(canvasHeight: number) {
        // Move the raindrop
        this.y += this.speed;

        // Add new character at the head of the raindrop
        if (Math.random() > 0.9) {
          const randomChar = chars.charAt(
            Math.floor(Math.random() * chars.length)
          );
          this.characters.unshift({ char: randomChar, opacity: this.opacity });
        }

        // Limit length of the trail
        if (this.characters.length > this.maxLength) {
          this.characters.pop();
        }

        // Decrease opacity of each character in the trail
        this.characters.forEach((charObj, i) => {
          charObj.opacity = this.opacity * (1 - i / this.maxLength);
        });

        // Reset if it's gone off screen
        if (this.y - this.fontSize * this.maxLength > canvasHeight) {
          this.y = Math.random() * -100;
          this.characters = [];
        }
      }

      draw(ctx: CanvasRenderingContext2D) {
        // Draw each character in the trail
        this.characters.forEach((charObj, i) => {
          const y = this.y - i * this.fontSize;

          // Skip if above the canvas
          if (y < 0) return;

          // First character is brighter (head of the rain drop)
          const isHead = i === 0;
          const color = isHead ? rainColors.accent : rainColors.primary;

          // Set text properties
          ctx.font = `${this.fontSize}px monospace`;
          ctx.fillStyle = color;
          ctx.globalAlpha = charObj.opacity;

          // Add glow effect
          if (isHead && !reducedMotion) {
            ctx.shadowColor = rainColors.accent;
            ctx.shadowBlur = 10;
          } else {
            ctx.shadowBlur = 0;
          }

          // Draw the character
          ctx.fillText(charObj.char, this.x, y);
          ctx.globalAlpha = 1;
          ctx.shadowBlur = 0;
        });
      }
    }

    // Create raindrops
    const rainDrops: RainDrop[] = [];
    const createRainDrops = () => {
      const fontSize = 14;
      const columns = Math.floor(canvas.width / fontSize);

      // Create raindrops at different x positions
      for (let i = 0; i < columns; i++) {
        const x = i * fontSize;
        // Create multiple raindrops per column with different starting positions
        const drops = Math.floor(Math.random() * 2) + 1;
        for (let j = 0; j < drops; j++) {
          rainDrops.push(new RainDrop(x, fontSize));
        }
      }
    };

    createRainDrops();
    window.addEventListener("resize", () => {
      rainDrops.length = 0;
      createRainDrops();
    });

    // Animation loop
    let animationId: number;
    const animate = () => {
      // Clear canvas with semi-transparent background for trail effect
      ctx.fillStyle = rainColors.background;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Update and draw raindrops
      rainDrops.forEach((drop) => {
        drop.update(canvas.height);
        drop.draw(ctx);
      });

      animationId = requestAnimationFrame(animate);
    };

    animate();

    // Cleanup
    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", setCanvasSize);
    };
  }, [
    rainColors.primary,
    rainColors.background,
    rainColors.accent,
    reducedMotion,
  ]);

  return (
    <Container>
      <Canvas ref={canvasRef} />
    </Container>
  );
};

export default DigitalRainBackground;
