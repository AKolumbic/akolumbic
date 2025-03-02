import React from "react";
import { ThemeType } from "../../types/gradient.types";
import MainBackground from "./MainBackground";
import BeachBackground from "./BeachBackground";
import SunsetBackground from "./SunsetBackground";
import CaliforniaThreeJSBackground from "./CaliforniaThreeJSBackground";
import { BackgroundProps } from "./types";

// Interface for registry entries
interface BackgroundRegistryEntry {
  component: React.ComponentType<BackgroundProps>;
}

// Background registry - can be extended with new backgrounds
const backgrounds: Record<ThemeType, BackgroundRegistryEntry> = {
  main: { component: MainBackground },
  beach: { component: BeachBackground },
  sunset: { component: SunsetBackground },
  california3d: { component: CaliforniaThreeJSBackground },
};

/**
 * Get a background component by theme
 * @param theme The theme to get the background for
 * @returns The background component for the theme
 */
export const getBackgroundComponent = (
  theme: ThemeType
): React.ComponentType<BackgroundProps> => {
  if (!backgrounds[theme]) {
    console.warn(
      `Background for theme "${theme}" not found, falling back to main theme`
    );
    return backgrounds.main.component;
  }

  return backgrounds[theme].component;
};

/**
 * Register a new background component
 * @param theme The theme identifier
 * @param component The background component
 */
export const registerBackgroundComponent = (
  theme: ThemeType,
  component: React.ComponentType<BackgroundProps>
): void => {
  backgrounds[theme] = { component };
};
