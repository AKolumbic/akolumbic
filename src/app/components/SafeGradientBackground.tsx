"use client";

import React, { useState, useEffect } from "react";
import GradientBackground from "./GradientBackground";
import { GradientBackgroundProps } from "../types/gradient.types";

/**
 * A safe wrapper for GradientBackground that handles errors
 */
const SafeGradientBackground: React.FC<GradientBackgroundProps> = (props) => {
  const [hasError, setHasError] = useState(false);

  // Reset error state if props change
  useEffect(() => {
    setHasError(false);
  }, [props.theme, props.activeSection]);

  if (hasError) {
    // Fallback to a simple gradient if there's an error
    return (
      <div
        className={props.className}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          zIndex: props.zIndex || 0,
          background: "linear-gradient(to bottom, #1A1A1A, #0D1B2A, #1B263B)",
        }}
      />
    );
  }

  // Use error boundary pattern with try/catch
  try {
    return <GradientBackground {...props} />;
  } catch (error) {
    console.error("Error rendering GradientBackground:", error);
    setHasError(true);
    return (
      <div
        className={props.className}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          zIndex: props.zIndex || 0,
          background: "linear-gradient(to bottom, #1A1A1A, #0D1B2A, #1B263B)",
        }}
      />
    );
  }
};

export default SafeGradientBackground;
