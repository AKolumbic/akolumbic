import { Theme, ThemeType } from "../types/theme.types";
// We'll use the existing colors when we refactor specific components
// import { themeColors } from "./themeColors";

// Night Sky Theme
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

// Beach Theme
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

// Sunset Theme
export const sunsetTheme: Theme = {
  type: "sunset",
  name: "Sunset",

  colors: {
    background: {
      main: "linear-gradient(135deg, #1a237e 0%, #7e57c2 50%, #ff5252 100%)",
      secondary: "#311B92",
      tertiary: "#4527A0",
    },
    text: {
      primary: "#FFFFFF",
      secondary: "#F3E5F5",
      tertiary: "#D1C4E9",
      accent: "#FFC107",
      inverse: "#1A237E",
    },
    accent: {
      primary: "#FF5252",
      secondary: "#FF8A80",
      tertiary: "#FFCDD2",
      highlight: "#FFC107",
    },
    ui: {
      border: "#7E57C2",
      divider: "#5E35B1",
      shadow: "rgba(26, 35, 126, 0.3)",
      hover: "rgba(255, 82, 82, 0.2)",
      focus: "rgba(255, 82, 82, 0.4)",
      disabled: "rgba(209, 196, 233, 0.5)",
    },
    semantic: {
      success: "#66BB6A",
      error: "#EF5350",
      warning: "#FFA726",
      info: "#42A5F5",
    },
  },

  typography: {
    fontFamily: {
      primary: '"Raleway", "SF Pro Display", sans-serif',
      secondary:
        '"Lato", "SF Pro Text", -apple-system, BlinkMacSystemFont, sans-serif',
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
    main: "linear-gradient(135deg, #1a237e 0%, #7e57c2 50%, #ff5252 100%)",
    card: "linear-gradient(135deg, #311B92 0%, #4527A0 100%)",
    button: "linear-gradient(135deg, #FF5252 0%, #FFC107 100%)",
    hover: "linear-gradient(135deg, #D32F2F 0%, #FFA000 100%)",
  },

  components: {
    button: {
      primary: {
        background: "linear-gradient(135deg, #FF5252 0%, #FFC107 100%)",
        color: "#FFFFFF",
        border: "none",
        hover: "linear-gradient(135deg, #D32F2F 0%, #FFA000 100%)",
      },
      secondary: {
        background: "transparent",
        color: "#FF5252",
        border: "1px solid #FF5252",
        hover: "rgba(255, 82, 82, 0.1)",
      },
    },
    card: {
      background: "#311B92",
      border: "1px solid #7E57C2",
      shadow: "0 4px 8px rgba(26, 35, 126, 0.3)",
    },
    input: {
      background: "#4527A0",
      border: "1px solid #7E57C2",
      color: "#FFFFFF",
      focus: "1px solid #FF5252",
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

// Black Hole Theme
export const blackholeTheme: Theme = {
  type: "blackhole",
  name: "Black Hole",

  colors: {
    background: {
      main: "linear-gradient(135deg, #000000 0%, #1a1a1a 50%, #333333 100%)",
      secondary: "#0D0D0D",
      tertiary: "#1A1A1A",
    },
    text: {
      primary: "#FFFFFF",
      secondary: "#CCCCCC",
      tertiary: "#999999",
      accent: "#FF9000",
      inverse: "#000000",
    },
    accent: {
      primary: "#FF9000",
      secondary: "#FFB347",
      tertiary: "#FFD78E",
      highlight: "#FFA726",
    },
    ui: {
      border: "#333333",
      divider: "#222222",
      shadow: "rgba(0, 0, 0, 0.5)",
      hover: "rgba(255, 144, 0, 0.2)",
      focus: "rgba(255, 144, 0, 0.4)",
      disabled: "rgba(102, 102, 102, 0.5)",
    },
    semantic: {
      success: "#00C853",
      error: "#FF3D00",
      warning: "#FF9000",
      info: "#29B6F6",
    },
  },

  typography: {
    fontFamily: {
      primary: '"Space Grotesk", "SF Pro Display", sans-serif',
      secondary:
        '"IBM Plex Sans", "SF Pro Text", -apple-system, BlinkMacSystemFont, sans-serif',
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
    main: "linear-gradient(135deg, #000000 0%, #1a1a1a 50%, #333333 100%)",
    card: "linear-gradient(135deg, #0D0D0D 0%, #1A1A1A 100%)",
    button: "linear-gradient(135deg, #FF9000 0%, #FFA726 100%)",
    hover: "linear-gradient(135deg, #E68200 0%, #FB8C00 100%)",
  },

  components: {
    button: {
      primary: {
        background: "linear-gradient(135deg, #FF9000 0%, #FFA726 100%)",
        color: "#000000",
        border: "none",
        hover: "linear-gradient(135deg, #E68200 0%, #FB8C00 100%)",
      },
      secondary: {
        background: "transparent",
        color: "#FF9000",
        border: "1px solid #FF9000",
        hover: "rgba(255, 144, 0, 0.1)",
      },
    },
    card: {
      background: "#0D0D0D",
      border: "1px solid #333333",
      shadow: "0 4px 8px rgba(0, 0, 0, 0.5)",
    },
    input: {
      background: "#1A1A1A",
      border: "1px solid #333333",
      color: "#FFFFFF",
      focus: "1px solid #FF9000",
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

// Digital Rain Theme (Matrix-inspired)
export const digitalRainTheme: Theme = {
  type: "digitalrain",
  name: "Digital Rain",

  colors: {
    background: {
      main: "#011401", // Dark Green/Black
      secondary: "#021902", // Slightly lighter shade
      tertiary: "#032703", // Even lighter shade
    },
    text: {
      primary: "#00FF41", // Neon Green
      secondary: "#00E136", // Slightly darker
      tertiary: "#00B52C", // Even darker
      accent: "#00CC33", // Bright Lime
      inverse: "#000000", // Black
    },
    accent: {
      primary: "#00FF41", // Neon Green
      secondary: "#00CC33", // Bright Lime
      tertiary: "#00AA28", // Darker lime
      highlight: "#39FF14", // Brighter neon green
    },
    ui: {
      border: "#005F17", // Dark green
      divider: "#004010", // Darker green
      shadow: "rgba(0, 255, 65, 0.3)", // Neon green shadow
      hover: "rgba(0, 255, 65, 0.2)", // Neon green hover
      focus: "rgba(0, 255, 65, 0.4)", // Neon green focus
      disabled: "rgba(0, 100, 27, 0.4)", // Dark green disabled
    },
    semantic: {
      success: "#00FF41", // Neon Green
      error: "#FF3F3F", // Red
      warning: "#FFCC00", // Yellow
      info: "#00FFFF", // Cyan
    },
  },

  typography: {
    fontFamily: {
      primary: '"Courier New", monospace',
      secondary: '"Consolas", monospace',
    },
    fontSizes: {
      xs: "0.75rem",
      sm: "0.875rem",
      md: "1rem",
      lg: "1.125rem",
      xl: "1.25rem",
      "2xl": "1.5rem",
      "3xl": "1.875rem",
    },
    fontWeights: {
      normal: 400,
      medium: 500,
      semibold: 600,
      bold: 700,
    },
    lineHeights: {
      tight: "1.2",
      normal: "1.5",
      relaxed: "1.75",
    },
  },

  gradients: {
    main: "linear-gradient(135deg, #011401 0%, #001200 50%, #021902 100%)",
    card: "linear-gradient(135deg, #011401 0%, #042404 100%)",
    button: "linear-gradient(135deg, #00CC33 0%, #00FF41 100%)",
    hover: "linear-gradient(135deg, #00FF41 0%, #39FF14 100%)",
  },

  components: {
    button: {
      primary: {
        background: "linear-gradient(135deg, #00CC33 0%, #00FF41 100%)",
        color: "#000000",
        border: "1px solid #00FF41",
        hover: "linear-gradient(135deg, #00FF41 0%, #39FF14 100%)",
      },
      secondary: {
        background: "transparent",
        color: "#00FF41",
        border: "1px solid #00FF41",
        hover: "rgba(0, 255, 65, 0.1)",
      },
    },
    card: {
      background: "rgba(1, 20, 1, 0.8)",
      border: "1px solid #00FF41",
      shadow:
        "0 4px 6px rgba(0, 255, 65, 0.1), 0 1px 3px rgba(0, 255, 65, 0.08)",
    },
    input: {
      background: "rgba(1, 10, 1, 0.8)",
      border: "1px solid #00CC33",
      color: "#00FF41",
      focus: "1px solid #39FF14",
    },
  },

  animation: {
    duration: {
      fast: "150ms",
      normal: "300ms",
      slow: "500ms",
    },
    easing: {
      default: "cubic-bezier(0.4, 0, 0.2, 1)",
      smooth: "cubic-bezier(0.65, 0, 0.35, 1)",
      bouncy: "cubic-bezier(0.2, 0.9, 0.3, 1.5)",
    },
  },
};

export const hal9000Theme: Theme = {
  type: "hal9000",
  name: "HAL-Sauron",

  colors: {
    background: {
      main: "linear-gradient(135deg, #300000 0%, #220000 50%, #400000 100%)",
      secondary: "#1A0000",
      tertiary: "#2A0000",
    },
    text: {
      primary: "#FFFFFF",
      secondary: "#FFCCCC",
      tertiary: "#FF9999",
      accent: "#FF3300",
      inverse: "#000000",
    },
    accent: {
      primary: "#FF3300",
      secondary: "#FF5500",
      tertiary: "#FF7700",
      highlight: "#FFAA00",
    },
    ui: {
      border: "#600000",
      divider: "#400000",
      shadow: "rgba(80, 0, 0, 0.5)",
      hover: "rgba(255, 51, 0, 0.2)",
      focus: "rgba(255, 51, 0, 0.4)",
      disabled: "rgba(153, 51, 51, 0.5)",
    },
    semantic: {
      success: "#00C853",
      error: "#FF3D00",
      warning: "#FF9000",
      info: "#29B6F6",
    },
  },

  typography: {
    fontFamily: {
      primary: '"Space Mono", "SF Pro Display", monospace',
      secondary: '"IBM Plex Mono", "SF Pro Text", monospace',
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
    main: "linear-gradient(135deg, #300000 0%, #220000 50%, #400000 100%)",
    card: "linear-gradient(135deg, #1A0000 0%, #2A0000 100%)",
    button: "linear-gradient(135deg, #990000 0%, #FF3300 100%)",
    hover: "linear-gradient(135deg, #FF3300 0%, #FF7700 100%)",
  },

  components: {
    button: {
      primary: {
        background: "linear-gradient(135deg, #990000 0%, #FF3300 100%)",
        color: "#FFFFFF",
        border: "1px solid #FF3300",
        hover: "linear-gradient(135deg, #FF3300 0%, #FF7700 100%)",
      },
      secondary: {
        background: "transparent",
        color: "#FF3300",
        border: "1px solid #FF3300",
        hover: "rgba(255, 51, 0, 0.1)",
      },
    },
    card: {
      background: "rgba(26, 0, 0, 0.8)",
      border: "1px solid #600000",
      shadow:
        "0 4px 6px rgba(255, 51, 0, 0.1), 0 1px 3px rgba(255, 51, 0, 0.08)",
    },
    input: {
      background: "rgba(20, 0, 0, 0.8)",
      border: "1px solid #600000",
      color: "#FF3300",
      focus: "1px solid #FF5500",
    },
  },

  animation: {
    duration: {
      fast: "150ms",
      normal: "300ms",
      slow: "500ms",
    },
    easing: {
      default: "cubic-bezier(0.4, 0, 0.2, 1)",
      smooth: "cubic-bezier(0.65, 0, 0.35, 1)",
      bouncy: "cubic-bezier(0.2, 0.9, 0.3, 1.5)",
    },
  },
};

// Deep Ocean Theme
export const deepOceanTheme: Theme = {
  type: "deepocean",
  name: "Deep Ocean",

  colors: {
    background: {
      main: "linear-gradient(135deg, #0A1128 0%, #1E81B0 60%, #134F6E 100%)",
      secondary: "#0D1D37",
      tertiary: "#12284A",
    },
    text: {
      primary: "#FFFFFF",
      secondary: "#E6F1F6",
      tertiary: "#A7CDE0",
      accent: "#8CE8FF",
      inverse: "#0A1128",
    },
    accent: {
      primary: "#1E81B0",
      secondary: "#52A7CE",
      tertiary: "#8CE8FF",
      highlight: "#38B6FF",
    },
    ui: {
      border: "#1B567A",
      divider: "#1B6890",
      shadow: "rgba(10, 17, 40, 0.5)",
      hover: "rgba(30, 129, 176, 0.3)",
      focus: "rgba(140, 232, 255, 0.4)",
      disabled: "rgba(167, 205, 224, 0.2)",
    },
    semantic: {
      success: "#32CD99",
      error: "#FF6B6B",
      warning: "#FFD166",
      info: "#52A7CE",
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
    main: "linear-gradient(135deg, #0A1128 0%, #1E81B0 60%, #134F6E 100%)",
    card: "linear-gradient(135deg, #0D1D37 0%, #12284A 100%)",
    button: "linear-gradient(135deg, #1E81B0 0%, #8CE8FF 100%)",
    hover: "linear-gradient(135deg, #1B567A 0%, #52A7CE 100%)",
  },

  components: {
    button: {
      primary: {
        background: "linear-gradient(135deg, #1E81B0 0%, #8CE8FF 100%)",
        color: "#FFFFFF",
        border: "none",
        hover: "linear-gradient(135deg, #1B567A 0%, #52A7CE 100%)",
      },
      secondary: {
        background: "transparent",
        color: "#8CE8FF",
        border: "1px solid #8CE8FF",
        hover: "rgba(140, 232, 255, 0.1)",
      },
    },
    card: {
      background: "#0D1D37",
      border: "1px solid #1B567A",
      shadow: "0 4px 8px rgba(10, 17, 40, 0.5)",
    },
    input: {
      background: "#12284A",
      border: "1px solid #1B567A",
      color: "#FFFFFF",
      focus: "1px solid #8CE8FF",
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

/*
export const auroraTheme: Theme = {
  type: "aurora",
  name: "Aurora",
  // ... rest of aurora theme definition ...
};
*/

// Export all themes
export const themes: Record<ThemeType, Theme> = {
  nightsky: nightSkyTheme,
  digitalrain: digitalRainTheme,
  hal9000: hal9000Theme,
  blackhole: blackholeTheme,
  sunset: sunsetTheme,
  beach: beachTheme,
  deepocean: deepOceanTheme,
  // cherryblossom removed
  // aurora: auroraTheme, - temporarily disabled
};

// Helper to get theme display name
export const getThemeDisplayName = (themeType: ThemeType): string => {
  return themes[themeType].name;
};
