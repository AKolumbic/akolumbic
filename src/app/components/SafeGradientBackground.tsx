"use client";

import React, { useState, useEffect } from "react";
import GradientBackground from "./GradientBackground";
import { GradientBackgroundProps } from "../types/gradient.types";
import { useTheme } from "../contexts/ThemeContext";

/**
 * A safe wrapper for GradientBackground that handles errors
 */
const SafeGradientBackground: React.FC<
  Omit<GradientBackgroundProps, "theme">
> = (props) => {
  const [hasError, setHasError] = useState(false);
  const { themeType } = useTheme();

  // Reset error state if props change
  useEffect(() => {
    setHasError(false);
  }, [themeType, props.activeSection]);

  if (hasError) {
    // Fallback to a simple gradient if there's an error
    return (
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background:
            "linear-gradient(135deg, #1A1A1A 0%, #0D1B2A 50%, #1B263B 100%)",
          zIndex: props.zIndex || 0,
        }}
      />
    );
  }

  try {
    return <GradientBackground {...props} theme={themeType} />;
  } catch (error) {
    console.error("Error rendering GradientBackground:", error);
    setHasError(true);
    return null;
  }
};

export default SafeGradientBackground;
