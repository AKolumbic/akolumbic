export interface MainColors {
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

export interface CaliforniaThreeJSColors {
  goldenState: string;
  poppy: string;
  coastalBlue: string;
  redwood: string;
  sierraGreen: string;
}

export interface ThemeColors {
  main: {
    [key in "hero" | "about" | "portfolio"]: MainColors;
  };
  beach: {
    [key in "hero" | "about" | "portfolio"]: BeachColors;
  };
  sunset: {
    all: SunsetColors;
  };
  california3d: {
    all: CaliforniaThreeJSColors;
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

export type ThemeType = "main" | "beach" | "sunset" | "california3d";
