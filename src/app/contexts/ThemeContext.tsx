"use client";

import React, {
  createContext,
  useState,
  useContext,
  useEffect,
  useCallback,
} from "react";
import { Theme, ThemeType } from "../types/theme.types";
import { themes } from "../data/themes";

interface ThemeContextType {
  currentTheme: Theme;
  themeType: ThemeType;
  setTheme: (themeType: ThemeType) => void;

  // Utility functions for accessing theme properties
  getColor: (path: string) => string;
  getFont: (type: "primary" | "secondary") => string;
  getGradient: (type: string) => string;
}

// Create context with default values
const ThemeContext = createContext<ThemeContextType>({
  currentTheme: themes.nightsky,
  themeType: "nightsky",
  setTheme: () => {},
  getColor: () => "",
  getFont: () => "",
  getGradient: () => "",
});

export const ThemeProvider: React.FC<{
  children: React.ReactNode;
  initialTheme?: ThemeType;
}> = ({ children, initialTheme = "nightsky" }) => {
  const [themeType, setThemeType] = useState<ThemeType>(initialTheme);
  const [currentTheme, setCurrentTheme] = useState<Theme>(themes[initialTheme]);

  // Update theme when themeType changes
  useEffect(() => {
    setCurrentTheme(themes[themeType]);

    // Save user theme preference in a cookie
    document.cookie = `userSelectedTheme=${themeType}; path=/; max-age=31536000`; // 1 year expiry
  }, [themeType]);

  // Initialize theme from cookie or system preference
  useEffect(() => {
    if (typeof window === "undefined") return;

    // Check for user selected theme in cookie
    const cookies = document.cookie.split(";").map((cookie) => cookie.trim());
    const themeCookie = cookies.find((cookie) =>
      cookie.startsWith("userSelectedTheme=")
    );

    if (themeCookie) {
      const savedTheme = themeCookie.split("=")[1] as ThemeType;
      if (savedTheme && Object.keys(themes).includes(savedTheme)) {
        setThemeType(savedTheme);
        return;
      }
    }

    // If no cookie, use system preference
    const darkModeQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const systemTheme: ThemeType = darkModeQuery.matches ? "nightsky" : "beach";
    setThemeType(systemTheme);

    // Set up listener for system theme changes
    const updateTheme = (e: MediaQueryListEvent) => {
      // Only update if user hasn't set a preference
      if (!document.cookie.includes("userSelectedTheme")) {
        setThemeType(e.matches ? "nightsky" : "beach");
      }
    };

    if (darkModeQuery.addEventListener) {
      darkModeQuery.addEventListener("change", updateTheme);
      return () => darkModeQuery.removeEventListener("change", updateTheme);
    } else {
      // Fallback for older browsers
      darkModeQuery.addListener(updateTheme);
      return () => darkModeQuery.removeListener(updateTheme);
    }
  }, []);

  // Helper function to safely navigate the theme object
  const getNestedValue = useCallback(
    <T,>(obj: Record<string, unknown>, path: string): T | null => {
      const keys = path.split(".");
      return keys.reduce<unknown>((acc, key) => {
        return acc &&
          typeof acc === "object" &&
          key in (acc as Record<string, unknown>)
          ? (acc as Record<string, unknown>)[key]
          : null;
      }, obj as unknown) as T | null;
    },
    []
  );

  // Utility functions for accessing theme properties
  const getColor = useCallback(
    (path: string): string => {
      return (
        getNestedValue<string>(
          currentTheme.colors as unknown as Record<string, unknown>,
          path
        ) || ""
      );
    },
    [currentTheme, getNestedValue]
  );

  const getFont = useCallback(
    (type: "primary" | "secondary"): string => {
      return currentTheme.typography?.fontFamily?.[type] || "";
    },
    [currentTheme]
  );

  const getGradient = useCallback(
    (type: string): string => {
      return (
        getNestedValue<string>(
          currentTheme.gradients as unknown as Record<string, unknown>,
          type
        ) || ""
      );
    },
    [currentTheme, getNestedValue]
  );

  return (
    <ThemeContext.Provider
      value={{
        currentTheme,
        themeType,
        setTheme: setThemeType,
        getColor,
        getFont,
        getGradient,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

// Custom hook for using the theme context
export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};

export default ThemeContext;
