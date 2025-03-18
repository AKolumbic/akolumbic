// This is a mockup file to visualize the expanded theme structure
// It is not intended to be used directly in the application yet

import { ThemeType } from "../../src/app/types/theme.types";

// Typography definitions
interface Typography {
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
interface ThemeColors {
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
    // Add more component-specific styling as needed
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

// Example implementation for Night Sky theme
export const nightSkyTheme: Theme = {
  type: "nightsky",
  name: "Night Sky",

  colors: {
    background: {
      main: "linear-gradient(135deg, #1A1A1A 0%, #0D1B2A 50%, #1B263B 100%)",
      secondary: "#1E293B",
      tertiary: "#273344",
    },
    text: {
      primary: "#FFFFFF",
      secondary: "#E2E8F0",
      tertiary: "#A0AEC0",
      accent: "#7DD3FC",
      inverse: "#0D1B2A",
    },
    accent: {
      primary: "#3B82F6",
      secondary: "#7DD3FC",
      tertiary: "#BAE6FD",
      highlight: "#0EA5E9",
    },
    ui: {
      border: "#334155",
      divider: "#2D3748",
      shadow: "rgba(0, 0, 0, 0.3)",
      hover: "rgba(59, 130, 246, 0.2)",
      focus: "rgba(59, 130, 246, 0.4)",
      disabled: "rgba(148, 163, 184, 0.2)",
    },
    semantic: {
      success: "#22C55E",
      error: "#EF4444",
      warning: "#F59E0B",
      info: "#3B82F6",
    },
  },

  typography: {
    fontFamily: {
      primary: '"Poppins", "SF Pro Display", sans-serif',
      secondary:
        '"Inter", "SF Pro Text", -apple-system, BlinkMacSystemFont, sans-serif',
    },
    fontSizes: {
      xs: "0.75rem",
      sm: "0.875rem",
      md: "1rem",
      lg: "1.125rem",
      xl: "1.25rem",
      "2xl": "1.5rem",
      "3xl": "2rem",
    },
    fontWeights: {
      normal: 400,
      medium: 500,
      semibold: 600,
      bold: 700,
    },
    lineHeights: {
      tight: "1.25",
      normal: "1.5",
      relaxed: "1.75",
    },
  },

  gradients: {
    main: "linear-gradient(135deg, #1A1A1A 0%, #0D1B2A 50%, #1B263B 100%)",
    card: "linear-gradient(135deg, #1E293B 0%, #273344 100%)",
    button: "linear-gradient(135deg, #3B82F6 0%, #0EA5E9 100%)",
    hover: "linear-gradient(135deg, #2563EB 0%, #0284C7 100%)",
  },

  components: {
    button: {
      primary: {
        background: "linear-gradient(135deg, #3B82F6 0%, #0EA5E9 100%)",
        color: "#FFFFFF",
        border: "none",
        hover: "linear-gradient(135deg, #2563EB 0%, #0284C7 100%)",
      },
      secondary: {
        background: "transparent",
        color: "#3B82F6",
        border: "1px solid #3B82F6",
        hover: "rgba(59, 130, 246, 0.1)",
      },
    },
    card: {
      background: "#1E293B",
      border: "1px solid #334155",
      shadow: "0 4px 8px rgba(0, 0, 0, 0.3)",
    },
    input: {
      background: "#273344",
      border: "1px solid #334155",
      color: "#FFFFFF",
      focus: "1px solid #3B82F6",
    },
  },

  animation: {
    duration: {
      fast: "0.15s",
      normal: "0.3s",
      slow: "0.5s",
    },
    easing: {
      default: "cubic-bezier(0.4, 0, 0.2, 1)",
      smooth: "cubic-bezier(0.22, 1, 0.36, 1)",
      bouncy: "cubic-bezier(0.2, 0.8, 0.2, 1.2)",
    },
  },
};

// Example implementation for Beach theme (partial)
export const beachTheme: Theme = {
  type: "beach",
  name: "Beach",

  colors: {
    background: {
      main: "linear-gradient(135deg, #01688D 0%, #0197B1 50%, #81BBA0 100%)",
      secondary: "#E2D7D6",
      tertiary: "#D6B59D",
    },
    text: {
      primary: "#01486D",
      secondary: "#01577F",
      tertiary: "#015F82",
      accent: "#017AA6",
      inverse: "#FFFFFF",
    },
    accent: {
      primary: "#0197B1",
      secondary: "#01A2BE",
      tertiary: "#01B5D5",
      highlight: "#01CBEF",
    },
    ui: {
      border: "#B69C87",
      divider: "#C9A791",
      shadow: "rgba(1, 104, 141, 0.2)",
      hover: "rgba(1, 151, 177, 0.1)",
      focus: "rgba(1, 151, 177, 0.3)",
      disabled: "rgba(182, 156, 135, 0.5)",
    },
    semantic: {
      success: "#10B981",
      error: "#F87171",
      warning: "#FBBF24",
      info: "#60A5FA",
    },
  },

  typography: {
    fontFamily: {
      primary: '"Montserrat", "SF Pro Display", sans-serif',
      secondary:
        '"Open Sans", "SF Pro Text", -apple-system, BlinkMacSystemFont, sans-serif',
    },
    fontSizes: {
      xs: "0.75rem",
      sm: "0.875rem",
      md: "1rem",
      lg: "1.125rem",
      xl: "1.25rem",
      "2xl": "1.5rem",
      "3xl": "2rem",
    },
    fontWeights: {
      normal: 400,
      medium: 500,
      semibold: 600,
      bold: 700,
    },
    lineHeights: {
      tight: "1.25",
      normal: "1.5",
      relaxed: "1.75",
    },
  },

  gradients: {
    main: "linear-gradient(135deg, #01688D 0%, #0197B1 50%, #81BBA0 100%)",
    card: "linear-gradient(135deg, #E2D7D6 0%, #D6B59D 100%)",
    button: "linear-gradient(135deg, #0197B1 0%, #01CBEF 100%)",
    hover: "linear-gradient(135deg, #01688D 0%, #0197B1 100%)",
  },

  components: {
    button: {
      primary: {
        background: "linear-gradient(135deg, #0197B1 0%, #01CBEF 100%)",
        color: "#FFFFFF",
        border: "none",
        hover: "linear-gradient(135deg, #01688D 0%, #0197B1 100%)",
      },
      secondary: {
        background: "transparent",
        color: "#0197B1",
        border: "1px solid #0197B1",
        hover: "rgba(1, 151, 177, 0.1)",
      },
    },
    card: {
      background: "#E2D7D6",
      border: "1px solid #B69C87",
      shadow: "0 4px 8px rgba(1, 104, 141, 0.15)",
    },
    input: {
      background: "#FFFFFF",
      border: "1px solid #B69C87",
      color: "#01486D",
      focus: "1px solid #0197B1",
    },
  },

  animation: {
    duration: {
      fast: "0.15s",
      normal: "0.3s",
      slow: "0.5s",
    },
    easing: {
      default: "cubic-bezier(0.4, 0, 0.2, 1)",
      smooth: "cubic-bezier(0.22, 1, 0.36, 1)",
      bouncy: "cubic-bezier(0.2, 0.8, 0.2, 1.2)",
    },
  },
};

// We would similarly define the other themes (Sunset, Black Hole)
// Note: This is just a mockup, we'll implement the actual themes
// during Phase 1 of our roadmap
