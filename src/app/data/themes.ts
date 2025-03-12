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

// Export all themes in a single object for easy access
export const themes: Record<ThemeType, Theme> = {
  nightsky: nightSkyTheme,
  beach: beachTheme,
  sunset: sunsetTheme,
  blackhole: blackholeTheme,
};

// Helper to get theme display name
export const getThemeDisplayName = (themeType: ThemeType): string => {
  return themes[themeType].name;
};
