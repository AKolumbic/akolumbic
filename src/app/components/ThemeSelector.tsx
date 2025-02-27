import React, { useState } from "react";
import { AnimatePresence } from "framer-motion";
import {
  ThemeContainer,
  ThemeToggle,
  ThemePanel,
  ThemeButton,
} from "../styles";
import { ThemeType } from "../types";

interface ThemeSelectorProps {
  currentTheme: ThemeType;
  onThemeChange: (theme: ThemeType) => void;
}

const themeGradients = {
  main: "linear-gradient(135deg, #1A1A1A 0%, #0D1B2A 50%, #1B263B 100%)",
  beach: "linear-gradient(135deg, #01688D 0%, #0197B1 50%, #81BBA0 100%)",
  sunset: "linear-gradient(135deg, #1a237e 0%, #7e57c2 50%, #ff5252 100%)",
};

const ThemeSelector: React.FC<ThemeSelectorProps> = ({
  currentTheme,
  onThemeChange,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <ThemeContainer>
      <ThemeToggle
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
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
            <ThemeButton
              $active={currentTheme === "main"}
              $gradient={themeGradients.main}
              onClick={() => {
                onThemeChange("main");
                setIsOpen(false);
              }}
              whileHover={{ x: 2 }}
              whileTap={{ scale: 0.98 }}
            >
              Main
            </ThemeButton>
            <ThemeButton
              $active={currentTheme === "beach"}
              $gradient={themeGradients.beach}
              onClick={() => {
                onThemeChange("beach");
                setIsOpen(false);
              }}
              whileHover={{ x: 2 }}
              whileTap={{ scale: 0.98 }}
            >
              Beach
            </ThemeButton>
            <ThemeButton
              $active={currentTheme === "sunset"}
              $gradient={themeGradients.sunset}
              onClick={() => {
                onThemeChange("sunset");
                setIsOpen(false);
              }}
              whileHover={{ x: 2 }}
              whileTap={{ scale: 0.98 }}
            >
              Sunset
            </ThemeButton>
          </ThemePanel>
        )}
      </AnimatePresence>
    </ThemeContainer>
  );
};

export default ThemeSelector;
