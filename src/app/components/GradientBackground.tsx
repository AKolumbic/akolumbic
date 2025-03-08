"use client";

import React, { useEffect, useState } from "react";
import { BackgroundContainer } from "../styles/GradientBackground.styles";
import { GradientBackgroundProps, ThemeType } from "../types/gradient.types";
import { themeColors } from "../data/themeColors";
import { getBackgroundComponent } from "./backgrounds/BackgroundRegistry";

const useSystemTheme = (): ThemeType => {
  const [systemTheme, setSystemTheme] = useState<ThemeType>(() => {
    // Initialize with a check if we're in the browser
    if (typeof window !== "undefined") {
      return window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "nightsky"
        : "beach";
    }
    return "nightsky"; // Default to nightsky if not in browser
  });

  useEffect(() => {
    if (typeof window === "undefined") return;

    // Check if system prefers dark mode
    const darkModeQuery = window.matchMedia("(prefers-color-scheme: dark)");

    const updateTheme = (e: MediaQueryListEvent | MediaQueryList) => {
      console.log("System theme changed:", e.matches ? "dark" : "light");
      setSystemTheme(e.matches ? "nightsky" : "beach");
    };

    // Set initial theme
    updateTheme(darkModeQuery);

    // Use the appropriate event listener based on browser support
    if (darkModeQuery.addEventListener) {
      darkModeQuery.addEventListener("change", updateTheme);
      return () => darkModeQuery.removeEventListener("change", updateTheme);
    } else {
      // Fallback for older browsers
      darkModeQuery.addListener(updateTheme);
      return () => darkModeQuery.removeListener(updateTheme);
    }
  }, []);

  return systemTheme;
};

/**
 * A dynamic background component that supports multiple themes and
 * backgrounds including Night Sky, Beach, Black Hole, and Sunset gradients.
 *
 * @param {object} props - Component props
 * @returns {JSX.Element} - Rendered component
 */
const GradientBackground: React.FC<GradientBackgroundProps> = ({
  className,
  zIndex = 0,
  reducedMotion = false,
  activeSection = "hero",
  theme,
}) => {
  const systemTheme = useSystemTheme();
  const currentTheme = theme || systemTheme;

  // Add enhanced logging for debugging
  useEffect(() => {
    // Debug background initialization
    console.log(
      `Background initialized: ${currentTheme} theme, ${activeSection} section`
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
  }, [currentTheme, activeSection]);

  // Get the appropriate colors based on theme and section
  const currentColors = (() => {
    if (!themeColors[currentTheme]) {
      console.warn(
        `Theme "${currentTheme}" not found, falling back to nightsky theme`
      );
      return themeColors.nightsky[activeSection];
    }

    // Special case for themes with only 'all' property
    if ("all" in themeColors[currentTheme]) {
      return themeColors[currentTheme].all;
    }

    // Normal case for nightsky and beach themes
    return themeColors[currentTheme][activeSection];
  })();

  // Get the appropriate background component for the current theme
  const BackgroundComponent = getBackgroundComponent(currentTheme);

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
