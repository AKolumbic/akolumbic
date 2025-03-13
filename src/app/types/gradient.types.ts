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

/* Temporarily disabled
export interface AuroraColors {
  background: string; // Dark blue/black night sky
  aurora: string; // Primary aurora glow color
  accent: string; // Secondary glow/highlight color
}
*/

export interface DeepOceanColors {
  primary: string; // Ocean Blue
  background: string; // Deep Sea Blue
  accent: string; // Bioluminescent Blue
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
  deepocean: {
    all: DeepOceanColors;
  };
  /* Temporarily disabled
  aurora: {
    all: AuroraColors;
  };
  */
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
