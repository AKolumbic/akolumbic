export type ThemeType =
  | "nightsky"
  | "beach"
  | "sunset"
  | "blackhole"
  | "digitalrain"
  | "hal9000";
/* | "aurora" */

// Typography definitions
export interface Typography {
  fontFamily: {
    primary: string;
    secondary: string;
  };
  fontSizes: {
    xs: string;
    sm: string;
    md: string;
    lg: string;
    xl: string;
    "2xl": string;
    "3xl": string;
  };
  fontWeights: {
    normal: number;
    medium: number;
    semibold: number;
    bold: number;
  };
  lineHeights: {
    tight: string;
    normal: string;
    relaxed: string;
  };
}

// Colors for each theme
export interface ThemeColors {
  // Background colors/gradients
  background: {
    main: string; // Main background gradient or color
    secondary: string; // Secondary background for cards, etc.
    tertiary: string; // Tertiary background for nested elements
  };

  // Text colors
  text: {
    primary: string;
    secondary: string;
    tertiary: string;
    accent: string;
    inverse: string; // For text on accent backgrounds
  };

  // Accent colors
  accent: {
    primary: string;
    secondary: string;
    tertiary: string;
    highlight: string;
  };

  // UI element colors
  ui: {
    border: string;
    divider: string;
    shadow: string;
    hover: string;
    focus: string;
    disabled: string;
  };

  // Semantic colors (success, error, etc.)
  semantic: {
    success: string;
    error: string;
    warning: string;
    info: string;
  };
}

// Expanded comprehensive theme interface
export interface Theme {
  type: ThemeType;
  name: string; // Display name (e.g., "Night Sky")
  colors: ThemeColors;
  typography: Typography;

  // Gradients specific to this theme
  gradients: {
    main: string;
    card: string;
    button: string;
    hover: string;
  };

  // Component-specific styling
  components: {
    button: {
      primary: {
        background: string;
        color: string;
        border: string;
        hover: string;
      };
      secondary: {
        background: string;
        color: string;
        border: string;
        hover: string;
      };
    };
    card: {
      background: string;
      border: string;
      shadow: string;
    };
    input: {
      background: string;
      border: string;
      color: string;
      focus: string;
    };
  };

  // Animation settings
  animation: {
    duration: {
      fast: string;
      normal: string;
      slow: string;
    };
    easing: {
      default: string;
      smooth: string;
      bouncy: string;
    };
  };
}
