import React from "react";
import {
  GradientOrb,
  SunsetGradient,
  CurvedHorizon,
  SolarFlare,
} from "../../styles/GradientBackground.styles";
import { SunsetColors } from "../../types/gradient.types";
import { BackgroundProps } from "./types";

const SunsetBackground: React.FC<BackgroundProps> = ({
  colors,
  reducedMotion = false,
}) => {
  const typedColors = colors as unknown as SunsetColors;

  return (
    <>
      <SunsetGradient style={{ opacity: 1 }} />
      <CurvedHorizon />
      <SolarFlare
        style={{
          bottom: "30%",
          left: "50%",
          transform: "translateX(-50%)",
        }}
        animate={
          !reducedMotion
            ? {
                opacity: [0.6, 0.8, 0.6],
                scale: [1, 1.1, 1],
              }
            : {}
        }
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {!reducedMotion && (
        <>
          <GradientOrb
            $color={typedColors.purple}
            animate={{
              y: ["70%", "65%", "70%"],
              scale: [1, 1.1, 1],
              opacity: [0.2, 0.3, 0.2],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            style={{
              bottom: 0,
              left: "30%",
              width: "40vw",
              height: "30vh",
              opacity: 0.2,
            }}
          />
          <GradientOrb
            $color={typedColors.orange}
            animate={{
              y: ["75%", "70%", "75%"],
              scale: [1, 1.2, 1],
              opacity: [0.15, 0.25, 0.15],
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            style={{
              bottom: 0,
              right: "20%",
              width: "35vw",
              height: "25vh",
              opacity: 0.15,
            }}
          />
        </>
      )}
    </>
  );
};

export default SunsetBackground;
