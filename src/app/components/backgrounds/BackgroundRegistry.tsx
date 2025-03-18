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
  DeepOceanBackground,
  // CherryBlossomBackground removed
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
  deepocean: { component: DeepOceanBackground },
  // cherryblossom removed
  // aurora: { component: AuroraBackground }, - temporarily disabled
};

/**
 * Get a background component by theme
 * @param theme The theme to get the background for
 * @returns The background component for the theme
 */
export const getBackgroundComponent = (theme: ThemeType) =>
  backgrounds[theme]?.component || NightSkyBackground;

/**
 * Register a new background component
 * @param theme The theme identifier
 * @param component The background component
 */
export const registerBackground = (
  theme: ThemeType,
  component: React.ComponentType<BackgroundProps>
): void => {
  backgrounds[theme as Exclude<ThemeType, "aurora">] = { component };
};
