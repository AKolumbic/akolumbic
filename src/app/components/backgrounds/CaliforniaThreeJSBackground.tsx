"use client";

import React, { useEffect, useState } from "react";
import { CaliforniaThreeJSColors } from "../../types/gradient.types";
import { BackgroundProps } from "./types";

// Define the expected props interface
interface ThreeJSSceneProps {
  colors: CaliforniaThreeJSColors;
  reducedMotion: boolean;
}

/**
 * California ThreeJS Background component
 * This is a client-only component that renders a 3D scene with mouse tracking
 */
const CaliforniaThreeJSBackground: React.FC<BackgroundProps> = ({
  colors,
  reducedMotion = false,
}) => {
  const [Component, setComponent] =
    useState<React.ComponentType<ThreeJSSceneProps> | null>(null);

  // Load the Three.js component only on the client side
  useEffect(() => {
    // @ts-expect-error - Module exists but TypeScript can't find it
    import("./ThreeJSScene").then((mod) => {
      setComponent(() => mod.default);
    });
  }, []);

  // Create a non-interactive fallback that appears until client-side code loads
  return (
    <div
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        background: `linear-gradient(to bottom, #0D1B2A 0%, #1E88E5 70%, #5D4037 100%)`,
      }}
    >
      {Component && (
        <Component
          colors={colors as unknown as CaliforniaThreeJSColors}
          reducedMotion={!!reducedMotion}
        />
      )}
    </div>
  );
};

export default CaliforniaThreeJSBackground;
