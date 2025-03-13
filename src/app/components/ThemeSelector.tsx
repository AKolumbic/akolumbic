import React, { useState } from "react";
import { AnimatePresence } from "framer-motion";
import {
  ThemeContainer,
  ThemeToggle,
  ThemePanel,
  ThemeButton,
} from "../styles/ThemeSelector.styles";
import { ThemeType } from "../types/theme.types";
import { useTheme } from "../contexts/ThemeContext";
import { themes, getThemeDisplayName } from "../data/themes";

interface ThemeSelectorProps {
  // The onThemeChange is now optional since we can use our theme context directly
  onThemeChange?: (theme: ThemeType) => void;
}

const ThemeSelector: React.FC<ThemeSelectorProps> = ({ onThemeChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const { themeType, setTheme } = useTheme();

  // Handle theme change with both context and optional callback
  const handleThemeChange = (theme: ThemeType) => {
    setTheme(theme);
    // Also call the onThemeChange callback if provided (for backward compatibility)
    if (onThemeChange) {
      onThemeChange(theme);
    }
    setIsOpen(false);
  };

  return (
    <ThemeContainer>
      <ThemeToggle
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        title={`Theme: ${getThemeDisplayName(themeType)}`}
      >
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="12" cy="12" r="5" />
          <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
        </svg>
      </ThemeToggle>

      <AnimatePresence>
        {isOpen && (
          <ThemePanel
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
          >
            {Object.entries(themes).map(([key, theme]) => (
              <ThemeButton
                key={key}
                $active={themeType === key}
                $gradient={theme.gradients.main}
                onClick={() => handleThemeChange(key as ThemeType)}
                whileHover={{ x: 2 }}
                whileTap={{ scale: 0.98 }}
              >
                {theme.name}{" "}
                {themeType === key && (
                  <span className="visually-hidden">(Current)</span>
                )}
              </ThemeButton>
            ))}
          </ThemePanel>
        )}
      </AnimatePresence>
    </ThemeContainer>
  );
};

export default ThemeSelector;
