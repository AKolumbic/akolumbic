"use client";

import React, { useState, useEffect } from "react";
import { BackgroundProps } from "./types";

// Static CSS-based background that works reliably in all environments
const StaticSmokeBackground: React.FC = () => {
  return (
    <div
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        backgroundImage: `
          radial-gradient(circle at 50% 50%, rgba(5, 6, 14, 0.5) 0%, rgba(4, 6, 20, 0.7) 25%, rgba(4, 8, 30, 0.8) 50%, rgba(7, 11, 34, 0.9) 75%, rgba(10, 17, 40, 1) 100%),
          linear-gradient(to bottom, #020206, #0D1B2A, #1B263B)
        `,
        overflow: "hidden",
      }}
    >
      {/* Animated stars effect with CSS */}
      <div
        style={{
          position: "absolute",
          width: "100%",
          height: "100%",
          background: `
            radial-gradient(circle at 20% 30%, rgba(255, 255, 255, 0.5) 0.1%, rgba(255, 255, 255, 0) 0.15%),
            radial-gradient(circle at 70% 40%, rgba(255, 255, 255, 0.5) 0.1%, rgba(255, 255, 255, 0) 0.1%),
            radial-gradient(circle at 40% 60%, rgba(255, 255, 255, 0.5) 0.05%, rgba(255, 255, 255, 0) 0.1%),
            radial-gradient(circle at 80% 10%, rgba(255, 255, 255, 0.5) 0.05%, rgba(255, 255, 255, 0) 0.08%),
            radial-gradient(circle at 10% 80%, rgba(255, 255, 255, 0.5) 0.05%, rgba(255, 255, 255, 0) 0.1%),
            radial-gradient(circle at 60% 70%, rgba(255, 255, 255, 0.5) 0.05%, rgba(255, 255, 255, 0) 0.1%),
            radial-gradient(circle at 30% 20%, rgba(255, 255, 255, 0.5) 0.05%, rgba(255, 255, 255, 0) 0.1%),
            radial-gradient(circle at 90% 50%, rgba(255, 255, 255, 0.5) 0.05%, rgba(255, 255, 255, 0) 0.08%),
            radial-gradient(circle at 50% 90%, rgba(255, 255, 255, 0.5) 0.05%, rgba(255, 255, 255, 0) 0.1%)
          `,
        }}
      />

      {/* Animated smoke effect with CSS */}
      <div
        style={{
          position: "absolute",
          width: "200%",
          height: "200%",
          top: "-50%",
          left: "-50%",
          background:
            "url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiPgogIDxmaWx0ZXIgaWQ9Im5vaXNlIj4KICAgIDxmZVR1cmJ1bGVuY2UgdHlwZT0iZnJhY3RhbE5vaXNlIiBiYXNlRnJlcXVlbmN5PSIwLjA1IiBudW1PY3RhdmVzPSIyIiBzdGl0Y2hUaWxlcz0ic3RpdGNoIi8+CiAgICA8ZmVDb2xvck1hdHJpeCB0eXBlPSJzYXR1cmF0ZSIgdmFsdWVzPSIwIi8+CiAgPC9maWx0ZXI+CiAgPHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsdGVyPSJ1cmwoI25vaXNlKSIgb3BhY2l0eT0iMC4wNSIvPgo8L3N2Zz4=')",
          opacity: 0.8,
          animation: "drift 20s linear infinite",
        }}
      />

      {/* Animated particles */}
      <div className="stars">
        {Array.from({ length: 20 }).map((_, i) => (
          <div
            key={`star-${i}`}
            className="star"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${5 + Math.random() * 10}s`,
            }}
          />
        ))}
      </div>

      {/* CSS animations */}
      <style jsx>{`
        @keyframes drift {
          0% {
            transform: rotate(0deg) scale(1);
          }
          50% {
            transform: rotate(5deg) scale(1.1);
          }
          100% {
            transform: rotate(0deg) scale(1);
          }
        }

        .stars {
          position: absolute;
          width: 100%;
          height: 100%;
          top: 0;
          left: 0;
          pointer-events: none;
        }

        .star {
          position: absolute;
          width: 2px;
          height: 2px;
          border-radius: 50%;
          background-color: white;
          opacity: 0;
          animation: twinkle linear infinite;
        }

        @keyframes twinkle {
          0% {
            opacity: 0;
            transform: scale(0.5);
          }
          50% {
            opacity: 0.8;
            transform: scale(1);
          }
          100% {
            opacity: 0;
            transform: scale(0.5);
          }
        }
      `}</style>
    </div>
  );
};

// Mouse tracking effect for extra interactivity
const MouseTracker: React.FC = () => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({
        x: e.clientX,
        y: e.clientY,
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div
      className="mouse-glow"
      style={{
        left: `${mousePos.x}px`,
        top: `${mousePos.y}px`,
      }}
    >
      <style jsx>{`
        .mouse-glow {
          position: fixed;
          width: 200px;
          height: 200px;
          border-radius: 50%;
          background: radial-gradient(
            circle,
            rgba(255, 255, 255, 0.15) 0%,
            rgba(255, 255, 255, 0) 70%
          );
          transform: translate(-50%, -50%);
          pointer-events: none;
          z-index: 10;
          mix-blend-mode: screen;
        }
      `}</style>
    </div>
  );
};

// Main background component - now simplified to avoid React 19 compatibility issues
const MainBackground: React.FC<BackgroundProps> = ({
  reducedMotion = false,
}) => {
  return (
    <>
      <StaticSmokeBackground />
      {!reducedMotion && <MouseTracker />}
    </>
  );
};

// Add display name for React DevTools and error reporting
MainBackground.displayName = "MainBackground";

export default MainBackground;
