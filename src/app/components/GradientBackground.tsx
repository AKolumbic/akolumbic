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
  theme = "main",
}) => {
  // Add logging for debugging
  useEffect(() => {
    console.log(`Background updated: ${theme} theme, ${activeSection} section`);
  }, [theme, activeSection]);

  const currentColors =
    theme === "sunset"
      ? themeColors.sunset.all
      : themeColors[theme][activeSection];

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
