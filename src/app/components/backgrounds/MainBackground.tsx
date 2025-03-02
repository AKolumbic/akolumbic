"use client";

import React, { useState, useEffect, useRef } from "react";
import { BackgroundProps } from "./types";

// Interactive starry background that highlights stars when the mouse is nearby
const StarryBackground: React.FC<{ reducedMotion: boolean }> = ({
  reducedMotion,
}) => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [stars, setStars] = useState<
    Array<{
      x: number;
      y: number;
      size: number;
      twinkleSpeed: number;
      brightness: number;
      id: number;
    }>
  >([]);
  const backgroundRef = useRef<HTMLDivElement>(null);
  const isMouseMoving = useRef(false);
  const lastUpdate = useRef(0);

  // Create stars on component mount
  useEffect(() => {
    // Increased stars by another 15% (from 86 to 99)
    const newStars = Array.from({ length: 99 }).map((_, i) => ({
      x: Math.random() * 100, // x position as percentage
      y: Math.random() * 100, // y position as percentage
      size: 1 + Math.random() * 2, // Size between 1-3px
      twinkleSpeed: 3 + Math.random() * 7, // Animation duration between 3-10s
      brightness: 0.1 + Math.random() * 0.5, // Base brightness between 0.1-0.6
      id: i, // Unique ID for React keys
    }));
    setStars(newStars);
  }, []);

  // Track mouse movements
  useEffect(() => {
    if (reducedMotion) return;

    const handleMouseMove = (e: MouseEvent) => {
      isMouseMoving.current = true;

      // Throttle updates to improve performance
      const now = Date.now();
      if (now - lastUpdate.current < 30) return; // ~30fps
      lastUpdate.current = now;

      const rect = backgroundRef.current?.getBoundingClientRect();
      if (rect) {
        setMousePos({
          x: ((e.clientX - rect.left) / rect.width) * 100,
          y: ((e.clientY - rect.top) / rect.height) * 100,
        });
      }
    };

    const handleMouseLeave = () => {
      isMouseMoving.current = false;
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [reducedMotion]);

  return (
    <div
      ref={backgroundRef}
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        background: `
          radial-gradient(circle at 50% 50%, rgba(5, 6, 14, 0.5) 0%, rgba(4, 6, 20, 0.7) 25%, rgba(4, 8, 30, 0.8) 50%, rgba(7, 11, 34, 0.9) 75%, rgba(10, 17, 40, 1) 100%),
          linear-gradient(to bottom, #020206, #0D1B2A, #1B263B)
        `,
        overflow: "hidden",
      }}
    >
      {/* Fancy stars with mouse interaction */}
      <div className="starField">
        {stars.map((star) => {
          // Calculate distance from mouse to this star (Euclidean distance)
          const dx = star.x - mousePos.x;
          const dy = star.y - mousePos.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          // The closer to the mouse, the brighter the star
          // Slightly reduced influence radius to 14% due to more stars
          const influenceRadius = 14;
          const mouseEffect =
            isMouseMoving.current && !reducedMotion
              ? Math.max(0, 1 - distance / influenceRadius)
              : 0;

          // Boost brightness based on mouse proximity (max 2x brighter)
          const boostedBrightness = star.brightness * (1 + mouseEffect * 2);

          // Apply a subtle size increase too
          const boostedSize = star.size * (1 + mouseEffect * 0.5);

          return (
            <div
              key={star.id}
              className="star"
              style={{
                left: `${star.x}%`,
                top: `${star.y}%`,
                width: `${boostedSize}px`,
                height: `${boostedSize}px`,
                opacity: boostedBrightness,
                animationDuration: `${star.twinkleSpeed}s`,
                // Increase glow effect by 5% and make it smoother
                boxShadow:
                  mouseEffect > 0.25
                    ? `0 0 ${3 + mouseEffect * 5.25}px rgba(255, 255, 255, ${
                        mouseEffect * 0.735
                      })`
                    : "none",
                // Highlight color varies slightly based on position
                backgroundColor:
                  mouseEffect > 0.5
                    ? `hsl(${210 + (star.id % 60)}, 80%, ${
                        70 + mouseEffect * 30
                      }%)`
                    : "white",
                // Make transitions smoother for a more refined effect
                transition:
                  "opacity 0.3s ease-out, width 0.3s ease-out, height 0.3s ease-out, box-shadow 0.3s ease-out, background-color 0.3s ease-out",
              }}
            />
          );
        })}
      </div>

      <style jsx>{`
        .starField {
          position: absolute;
          width: 100%;
          height: 100%;
          top: 0;
          left: 0;
        }

        .star {
          position: absolute;
          border-radius: 50%;
          transform: translate(-50%, -50%);
          animation: twinkle linear infinite;
        }

        @keyframes twinkle {
          0%,
          100% {
            opacity: 0.1;
            transform: scale(0.7);
          }
          50% {
            opacity: 0.9;
            transform: scale(1.1);
          }
        }
      `}</style>
    </div>
  );
};

// Main background component with improved star interaction
const MainBackground: React.FC<BackgroundProps> = ({
  reducedMotion = false,
}) => {
  return <StarryBackground reducedMotion={reducedMotion} />;
};

// Add display name for React DevTools and error reporting
MainBackground.displayName = "MainBackground";

export default MainBackground;
