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
 * Helper function to detect WebGL support
 */
const detectWebGLSupport = () => {
  try {
    // Only run this check on the client side
    if (typeof window === "undefined") return null;

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
  const [webGLSupported, setWebGLSupported] = useState<boolean | null>(null);
  const [loadError, setLoadError] = useState<boolean>(false);

  // Check WebGL support
  useEffect(() => {
    setWebGLSupported(detectWebGLSupport());
  }, []);

  // Load the Three.js component only on the client side if WebGL is supported
  useEffect(() => {
    if (webGLSupported) {
      import("./ThreeJSScene")
        .then((mod) => {
          setComponent(() => mod.default);
        })
        .catch((error) => {
          console.error("Failed to load ThreeJSScene:", error);
          setLoadError(true);
        });
    }
  }, [webGLSupported]);

  // Get the California colors for the fallback
  const typedColors = colors as unknown as CaliforniaThreeJSColors;
  const baseColor1 = typedColors.goldenState || "#F2A900";
  const baseColor2 = typedColors.poppy || "#FF5500";

  // Create a non-interactive fallback that appears until client-side code loads
  return (
    <div
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        background: `linear-gradient(to bottom, ${baseColor1} 0%, ${baseColor2} 70%, #5D4037 100%)`,
      }}
    >
      {Component && webGLSupported && !loadError && (
        <Component colors={typedColors} reducedMotion={!!reducedMotion} />
      )}
    </div>
  );
};

export default CaliforniaThreeJSBackground;
