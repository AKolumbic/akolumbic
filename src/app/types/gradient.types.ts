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

export interface DigitalRainColors {
  primary: string; // Neon Green
  background: string; // Dark Green/Black
  accent: string; // Bright Lime
}

export interface Hal9000Colors {
  eye: string; // Red eye
  background: string; // Black background
  accent: string; // Highlight
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
  digitalrain: {
    all: DigitalRainColors;
  };
  hal9000: {
    all: Hal9000Colors;
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
