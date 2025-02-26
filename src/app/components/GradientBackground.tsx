import React from "react";
import { motion } from "framer-motion";
import styled from "styled-components";

// Styled Components
const BackgroundContainer = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  overflow: hidden;
  z-index: 0;
  transition: all 0.5s ease;
  background-color: #000;
  transform: translateZ(0);
  backface-visibility: hidden;
  perspective: 1000;
  will-change: transform;
`;

const GradientOrb = styled(motion.div)<{ $color: string }>`
  position: absolute;
  border-radius: 50%;
  background: ${(props) => props.$color};
  filter: blur(80px);
  opacity: 0.15;
  z-index: 1;
  mix-blend-mode: lighten;
  transition: all 0.5s ease;
  pointer-events: none;
  transform: translateZ(0);
  backface-visibility: hidden;
  perspective: 1000;
  will-change: transform;
`;

// Wave animation for the beach theme
const WaveContainer = styled(motion.div)`
  position: absolute;
  width: 200%;
  height: 200%;
  left: -50%;
  background: transparent;
  pointer-events: none;
  transform: translateZ(0);
  backface-visibility: hidden;
  perspective: 1000;
  will-change: transform;
`;

const Wave = styled(motion.div)<{ $color: string; $delay: number }>`
  position: absolute;
  width: 100%;
  height: 100%;
  background: ${(props) => props.$color};
  opacity: 0.12;
  border-radius: 43%;
  transform: translateZ(0);
  backface-visibility: hidden;
  perspective: 1000;
  will-change: transform;
  animation: wave ${(props) => 20 + props.$delay}s infinite linear;

  @keyframes wave {
    from {
      transform: rotate(0deg) translateZ(0);
    }
    to {
      transform: rotate(360deg) translateZ(0);
    }
  }
`;

// Gradient overlay for the sunset theme
const SunsetGradient = styled(motion.div)`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(
    to bottom,
    #000000 0%,
    #000000 10%,
    #1a237e 40%,
    #7e57c2 60%,
    #ff5252 75%,
    #ff9800 85%,
    #ffd740 100%
  );
  opacity: 0;
  transition: opacity 1s ease;
`;

const CurvedHorizon = styled(motion.div)`
  position: absolute;
  top: 0;
  left: -50%;
  right: -50%;
  bottom: 0;
  width: 200%;
  height: 200%;
  background: radial-gradient(
    ellipse at 50% 80%,
    transparent 0%,
    rgba(0, 0, 0, 0.3) 30%,
    rgba(0, 0, 0, 0.8) 60%,
    rgba(0, 0, 0, 1) 100%
  );
  transform-origin: center;
  pointer-events: none;
`;

const SolarFlare = styled(motion.div)`
  position: absolute;
  width: 60vw;
  height: 60vh;
  background: radial-gradient(
    circle at center,
    rgba(255, 215, 64, 0.3) 0%,
    rgba(255, 82, 82, 0.2) 30%,
    transparent 70%
  );
  filter: blur(30px);
  mix-blend-mode: screen;
`;

type ThemeType = "main" | "beach" | "sunset";

// Theme color types
interface MainColors {
  sunset: string;
  ocean: string;
  sky: string;
}

interface BeachColors {
  sea: string;
  munsell: string;
  seaGreen: string;
  sand: string;
  vanilla: string;
  taupe: string;
}

interface SunsetColors {
  night: string;
  deepBlue: string;
  purple: string;
  red: string;
  orange: string;
  yellow: string;
}

interface ThemeColors {
  main: {
    [key in "hero" | "about" | "portfolio" | "contact"]: MainColors;
  };
  beach: {
    [key in "hero" | "about" | "portfolio" | "contact"]: BeachColors;
  };
  sunset: {
    all: SunsetColors;
  };
}

interface GradientBackgroundProps {
  /** Optional class name for additional styling */
  className?: string;
  /** Optional z-index override (default: 0) */
  zIndex?: number;
  /** Optional reduced motion setting for accessibility */
  reducedMotion?: boolean;
  /** Current active section */
  activeSection?: "hero" | "about" | "portfolio" | "contact";
  /** Current theme */
  theme?: ThemeType;
}

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
  // Color schemes for different themes and sections
  const themeColors: ThemeColors = {
    main: {
      hero: {
        sunset: "#1A1A1A",
        ocean: "#0D1B2A",
        sky: "#1B263B",
      },
      about: {
        sunset: "#1F1F1F",
        ocean: "#162635",
        sky: "#1E2A3F",
      },
      portfolio: {
        sunset: "#242424",
        ocean: "#1A2C3D",
        sky: "#212E44",
      },
      contact: {
        sunset: "#292929",
        ocean: "#1E3245",
        sky: "#243248",
      },
    },
    beach: {
      hero: {
        sea: "#01688D",
        munsell: "#0197B1",
        seaGreen: "#81BBA0",
        sand: "#E2D7D6",
        vanilla: "#D6B59D",
        taupe: "#B69C87",
      },
      about: {
        sea: "#015F82",
        munsell: "#018CA3",
        seaGreen: "#75AB91",
        sand: "#D6CBC9",
        vanilla: "#C9A791",
        taupe: "#A8907C",
      },
      portfolio: {
        sea: "#01779E",
        munsell: "#01A2BE",
        seaGreen: "#8DCBAF",
        sand: "#EEE3E2",
        vanilla: "#E3C2A9",
        taupe: "#C4A993",
      },
      contact: {
        sea: "#015A7B",
        munsell: "#018499",
        seaGreen: "#6FA189",
        sand: "#CFC4C3",
        vanilla: "#C19F89",
        taupe: "#A18874",
      },
    },
    sunset: {
      all: {
        night: "#000000",
        deepBlue: "#1a237e",
        purple: "#7e57c2",
        red: "#ff5252",
        orange: "#ff9800",
        yellow: "#ffd740",
      },
    },
  };

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
            <SunsetGradient
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.9 }}
              transition={{ duration: reducedMotion ? 0 : 1.5 }}
            />
            <CurvedHorizon
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: reducedMotion ? 0 : 1.5 }}
            />
            {/* Solar Flare Animation */}
            {!reducedMotion && (
              <SolarFlare
                initial={{ opacity: 0.4, scale: 1 }}
                animate={{
                  opacity: [0.4, 0.6, 0.4],
                  scale: [1, 1.1, 1],
                  x: ["-50%", "-48%", "-50%"],
                  y: ["-50%", "-52%", "-50%"],
                }}
                transition={{
                  duration: 8,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                style={{
                  top: "75%",
                  left: "50%",
                  transformOrigin: "center",
                }}
              />
            )}
            {/* Subtle color movement */}
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
