import React from "react";
import { motion } from "framer-motion";
import {
  BackgroundContainer,
  GradientOrb,
  WaveContainer,
  Wave,
  SunsetGradient,
  CurvedHorizon,
  SolarFlare,
} from "../styles/GradientBackground.styles";
import {
  GradientBackgroundProps,
  BeachColors,
  MainColors,
  SunsetColors,
} from "../types/gradient.types";
import { themeColors } from "../data";

/**
 * GradientBackground Component
 *
 * A reusable animated gradient background that supports multiple California-themed
 * backgrounds including Main tech, beach waves, and sunset gradients.
 *
 * @param {object} props - Component props
 * @returns {JSX.Element} - Rendered component
 */
const GradientBackground: React.FC<GradientBackgroundProps> = ({
  className,
  zIndex = 0,
  reducedMotion = false,
  activeSection = "hero",
  theme = "main",
}) => {
  const currentColors =
    theme === "sunset"
      ? themeColors.sunset.all
      : themeColors[theme][activeSection];

  // Theme-specific configurations
  const renderThemeContent = () => {
    switch (theme) {
      case "beach": {
        const colors = currentColors as BeachColors;
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
                background: `linear-gradient(to bottom, ${colors.sea} 0%, ${colors.munsell} 60%, ${colors.seaGreen} 100%)`,
                opacity: 0.3,
              }}
            />

            {/* Waves */}
            <WaveContainer>
              {!reducedMotion && (
                <>
                  <Wave
                    $color={colors.sea}
                    $delay={0}
                    style={{
                      opacity: 0.15,
                      transform: "translateZ(0)",
                    }}
                  />
                  <Wave
                    $color={colors.munsell}
                    $delay={5}
                    style={{
                      opacity: 0.12,
                      transform: "translateZ(0)",
                    }}
                  />
                  <Wave
                    $color={colors.seaGreen}
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
              $color={colors.sand}
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
              $color={colors.vanilla}
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
              $color={colors.taupe}
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
      }

      case "sunset": {
        const colors = currentColors as SunsetColors;
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
                  $color={colors.purple}
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
                  $color={colors.orange}
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
      }

      default: {
        const colors = currentColors as MainColors;
        return (
          <>
            <GradientOrb
              $color={colors.ocean}
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
              $color={colors.sky}
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
      }
    }
  };

  return (
    <BackgroundContainer className={className} style={{ zIndex }}>
      {renderThemeContent()}
    </BackgroundContainer>
  );
};

export default GradientBackground;
