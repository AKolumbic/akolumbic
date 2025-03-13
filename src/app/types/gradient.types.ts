import { ThemeType } from "./theme.types";
export type { ThemeType };

export interface NightSkyColors {
  sunset: string;
  ocean: string;
  sky: string;
}

export interface BeachColors {
  sea: string;
  munsell: string;
  seaGreen: string;
  sand: string;
  vanilla: string;
  taupe: string;
}

export interface SunsetColors {
  night: string;
  deepBlue: string;
  purple: string;
  red: string;
  orange: string;
  yellow: string;
}

export interface BlackHoleColors {
  background: string;
}

export interface ThemeColors {
  nightsky: {
    [key in "hero" | "about" | "portfolio"]: NightSkyColors;
  };
  beach: {
    [key in "hero" | "about" | "portfolio"]: BeachColors;
  };
  sunset: {
    all: SunsetColors;
  };
  blackhole: {
    all: BlackHoleColors;
  };
}

export interface GradientBackgroundProps {
  /** Optional class name for additional styling */
  className?: string;
  /** Optional z-index override (default: 0) */
  zIndex?: number;
  /** Optional reduced motion setting for accessibility */
  reducedMotion?: boolean;
  /** Current active section */
  activeSection?: "hero" | "about" | "portfolio";
  /** Current theme */
  theme?: ThemeType;
}
