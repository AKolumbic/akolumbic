import React from "react";
import { GradientOrb } from "../../styles/GradientBackground.styles";
import { MainColors } from "../../types/gradient.types";
import { BackgroundProps } from "./types";

const MainBackground: React.FC<BackgroundProps> = ({
  colors,
  reducedMotion,
}) => {
  const typedColors = colors as unknown as MainColors;

  return (
    <>
      <GradientOrb
        $color={typedColors.ocean}
        initial={{ x: "-50%", y: "-50%" }}
        animate={
          !reducedMotion
            ? {
                x: ["-50%", "-48%", "-50%"],
                y: ["-50%", "-52%", "-50%"],
              }
            : {}
        }
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        style={{
          top: "50%",
          left: "50%",
          width: "120vw",
          height: "120vh",
          opacity: 0.4,
        }}
      />
      <GradientOrb
        $color={typedColors.sky}
        initial={{ x: "-50%", y: "-50%" }}
        animate={
          !reducedMotion
            ? {
                x: ["-50%", "-52%", "-50%"],
                y: ["-50%", "-48%", "-50%"],
              }
            : {}
        }
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        style={{
          top: "50%",
          left: "50%",
          width: "100vw",
          height: "100vh",
          opacity: 0.3,
        }}
      />
    </>
  );
};

export default MainBackground;
