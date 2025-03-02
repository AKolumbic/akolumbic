"use client";

import React from "react";
import { BackgroundProps } from "./types";

/**
 * A simple fallback background component that shows a gradient
 * when Three.js components fail to load
 */
const FallbackBackground: React.FC<BackgroundProps> = ({
  colors,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  reducedMotion = false,
}) => {
  // Extract colors or use defaults
  const colorValues = Object.values(colors || {});
  const gradient =
    colorValues.length > 1
      ? `linear-gradient(to bottom right, ${colorValues.join(", ")})`
      : "#1A1A1A";

  return (
    <div
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        background: gradient,
        zIndex: -1,
      }}
    />
  );
};

export default FallbackBackground;
