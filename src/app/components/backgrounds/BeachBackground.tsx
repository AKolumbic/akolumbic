import React from "react";
import { motion } from "framer-motion";
import {
  GradientOrb,
  WaveContainer,
  Wave,
} from "../../styles/GradientBackground.styles";
import { BeachColors } from "../../types/gradient.types";
import { BackgroundProps } from "./types";

const BeachBackground: React.FC<BackgroundProps> = ({
  colors,
  reducedMotion = false,
}) => {
  const typedColors = colors as unknown as BeachColors;

  return (
    <>
      {/* Base gradient for ocean color */}
      <motion.div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: `linear-gradient(to bottom, ${typedColors.sea} 0%, ${typedColors.munsell} 60%, ${typedColors.seaGreen} 100%)`,
          opacity: 0.3,
        }}
      />

      {/* Waves */}
      <WaveContainer>
        {!reducedMotion && (
          <>
            <Wave
              $color={typedColors.sea}
              $delay={0}
              style={{
                opacity: 0.15,
                transform: "translateZ(0)",
              }}
            />
            <Wave
              $color={typedColors.munsell}
              $delay={5}
              style={{
                opacity: 0.12,
                transform: "translateZ(0)",
              }}
            />
            <Wave
              $color={typedColors.seaGreen}
              $delay={10}
              style={{
                opacity: 0.1,
                transform: "translateZ(0)",
              }}
            />
          </>
        )}
      </WaveContainer>

      {/* Gradient orbs */}
      <GradientOrb
        $color={typedColors.sand}
        animate={
          !reducedMotion
            ? {
                x: ["-5%", "5%"],
                y: ["2%", "-2%"],
              }
            : {}
        }
        transition={{
          duration: 25,
          repeat: Infinity,
          repeatType: "reverse",
          ease: "easeInOut",
        }}
        style={{
          top: "60%",
          left: "50%",
          width: "80vw",
          height: "40vh",
          opacity: 0.4,
          mixBlendMode: "soft-light",
        }}
      />
      <GradientOrb
        $color={typedColors.vanilla}
        animate={
          !reducedMotion
            ? {
                x: ["3%", "-3%"],
                y: ["-2%", "2%"],
              }
            : {}
        }
        transition={{
          duration: 30,
          repeat: Infinity,
          repeatType: "reverse",
          ease: "easeInOut",
        }}
        style={{
          bottom: "20%",
          right: "30%",
          width: "60vw",
          height: "30vh",
          opacity: 0.35,
          mixBlendMode: "soft-light",
        }}
      />
      {/* Additional warm light orb */}
      <GradientOrb
        $color={typedColors.taupe}
        animate={
          !reducedMotion
            ? {
                x: ["2%", "-2%"],
                y: ["-3%", "3%"],
              }
            : {}
        }
        transition={{
          duration: 20,
          repeat: Infinity,
          repeatType: "reverse",
          ease: "easeInOut",
        }}
        style={{
          bottom: "40%",
          left: "20%",
          width: "50vw",
          height: "40vh",
          opacity: 0.3,
          mixBlendMode: "soft-light",
        }}
      />
    </>
  );
};

export default BeachBackground;
