import React from "react";
import { ThemeType } from "../../types/theme.types";
import { BackgroundProps } from "./types";
import {
  NightSkyBackground,
  BeachBackground,
  SunsetBackground,
  BlackHoleBackground,
  DigitalRainBackground,
  Hal9000Background,
  // AuroraBackground - temporarily disabled
} from "./ClientBackgrounds";

// Interface for registry entries
export interface BackgroundRegistryEntry {
  component: React.ComponentType<BackgroundProps>;
}

// Background registry - can be extended with new backgrounds
const backgrounds: Record<
  Exclude<ThemeType, "aurora">,
  BackgroundRegistryEntry
> = {
  nightsky: { component: NightSkyBackground },
  beach: { component: BeachBackground },
  sunset: { component: SunsetBackground },
  blackhole: { component: BlackHoleBackground },
  digitalrain: { component: DigitalRainBackground },
  hal9000: { component: Hal9000Background },
  // aurora: { component: AuroraBackground }, - temporarily disabled
};

/**
 * Get a background component by theme
 * @param theme The theme to get the background for
 * @returns The background component for the theme
 */
export const getBackgroundComponent = (
  theme: ThemeType
): React.ComponentType<BackgroundProps> => {
  // Handle aurora theme by falling back to nightsky
  if (
    theme === "aurora" ||
    !backgrounds[theme as Exclude<ThemeType, "aurora">]
  ) {
    console.warn(
      `Background for theme "${theme}" not found, falling back to Night Sky theme`
    );
    return backgrounds.nightsky.component;
  }

  return backgrounds[theme as Exclude<ThemeType, "aurora">].component;
};

/**
 * Register a new background component
 * @param theme The theme identifier
 * @param component The background component
 */
export const registerBackground = (
  theme: ThemeType,
  component: React.ComponentType<BackgroundProps>
): void => {
  if (theme === "aurora") {
    console.warn("Aurora theme is temporarily disabled");
    return;
  }
  backgrounds[theme as Exclude<ThemeType, "aurora">] = { component };
};
