"use client";

import React, { useEffect } from "react";
import { BackgroundContainer } from "../styles/GradientBackground.styles";
import { GradientBackgroundProps } from "../types/gradient.types";
import { themeColors } from "../data/themeColors";
import { getBackgroundComponent } from "./backgrounds/BackgroundRegistry";

/**
 * GradientBackground Component
 *
 * A reusable animated gradient background that supports multiple California-themed
 * backgrounds including Main tech, beach waves, and sunset gradients.
 *
 * @param {object} props - Component props
 * @returns {JSX.Element} - Rendered component
 */
const GradientBackground: React.FC<GradientBackgroundProps> = ({
  className,
  zIndex = 0,
  reducedMotion = false,
  activeSection = "hero",
  theme = "nightsky",
}) => {
  // Add enhanced logging for debugging
  useEffect(() => {
    // Debug background initialization
    console.log(
      `Background initialized: ${theme} theme, ${activeSection} section`
    );

    // Check and log WebGL support
    try {
      const canvas = document.createElement("canvas");
      const hasWebGL = !!(
        window.WebGLRenderingContext &&
        (canvas.getContext("webgl") || canvas.getContext("experimental-webgl"))
      );
      console.log(`WebGL support: ${hasWebGL ? "yes" : "no"}`);

      // Additional browser environment info
      console.log(`User Agent: ${navigator.userAgent}`);
      console.log(
        `Window dimensions: ${window.innerWidth}x${window.innerHeight}`
      );
      console.log(`Device pixel ratio: ${window.devicePixelRatio}`);
    } catch (e) {
      console.warn("Error checking WebGL support:", e);
    }
  }, [theme, activeSection]);

  // Get the appropriate colors based on theme and section
  const currentColors = (() => {
    if (!themeColors[theme]) {
      console.warn(
        `Theme "${theme}" not found, falling back to nightsky theme`
      );
      return themeColors.nightsky[activeSection];
    }

    // Special case for themes with only 'all' property
    if ("all" in themeColors[theme]) {
      return themeColors[theme].all;
    }

    // Normal case for nightsky and beach themes
    return themeColors[theme][activeSection];
  })();

  // Get the appropriate background component for the current theme
  const BackgroundComponent = getBackgroundComponent(theme);

  return (
    <BackgroundContainer className={className} style={{ zIndex }}>
      <BackgroundComponent
        colors={currentColors}
        reducedMotion={reducedMotion}
      />
    </BackgroundContainer>
  );
};

export default GradientBackground;
