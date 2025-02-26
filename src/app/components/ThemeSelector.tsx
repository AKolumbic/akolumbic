import React from "react";
import { ThemeContainer, ThemeButton } from "../styles/ThemeSelector.styles";
import { ThemeType } from "../types/theme.types";

interface ThemeSelectorProps {
  currentTheme: ThemeType;
  onThemeChange: (theme: ThemeType) => void;
}

const ThemeSelector: React.FC<ThemeSelectorProps> = ({
  currentTheme,
  onThemeChange,
}) => {
  return (
    <ThemeContainer>
      <ThemeButton
        $active={currentTheme === "main"}
        onClick={() => onThemeChange("main")}
      >
        Main
      </ThemeButton>
      <ThemeButton
        $active={currentTheme === "beach"}
        onClick={() => onThemeChange("beach")}
      >
        Beach
      </ThemeButton>
      <ThemeButton
        $active={currentTheme === "sunset"}
        onClick={() => onThemeChange("sunset")}
      >
        Sunset
      </ThemeButton>
    </ThemeContainer>
  );
};

export default ThemeSelector;
