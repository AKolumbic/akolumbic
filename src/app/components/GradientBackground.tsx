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
  transition: all 1s ease;
  background-color: #000;
`;

const GradientOrb = styled(motion.div)<{ $color: string }>`
  position: absolute;
  border-radius: 50%;
  background: ${(props) => props.$color};
  filter: blur(100px);
  opacity: 0.2;
  z-index: 1;
  mix-blend-mode: lighten;
  transition: all 1s ease;
  pointer-events: none;
`;

// Wave animation for the beach theme
const WaveContainer = styled(motion.div)`
  position: absolute;
  width: 200%;
  height: 200%;
  left: -50%;
  background: transparent;
  pointer-events: none;
`;

const Wave = styled(motion.div)<{ $color: string; $delay: number }>`
  position: absolute;
  width: 100%;
  height: 100%;
  background: ${(props) => props.$color};
  opacity: 0.1;
  border-radius: 43%;
  animation: wave ${(props) => 7 + props.$delay}s infinite linear;

  @keyframes wave {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
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
    #1a237e 20%,
    #7e57c2 40%,
    #ff5252 60%,
    #ff9800 80%,
    #ffd740 100%
  );
  opacity: 0;
  transition: opacity 1s ease;
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
        sunset: "#661C1C",
        ocean: "#1B4B8A",
        sky: "#4A2B57",
      },
      about: {
        sunset: "#662D15",
        ocean: "#1B3A6B",
        sky: "#432B47",
      },
      portfolio: {
        sunset: "#661C1E",
        ocean: "#153A6B",
        sky: "#3D2857",
      },
      contact: {
        sunset: "#662424",
        ocean: "#1B4273",
        sky: "#472B57",
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
            {/* Gradient orbs for the water and sky */}
            {[
              {
                color: colors.sea,
                position: { bottom: "-10%", left: "-10%" },
                size: { width: "120vw", height: "60vh" },
                animation: {
                  x: ["-2%", "2%", "-1%"],
                  y: ["1%", "-2%", "2%"],
                  scale: [1, 1.02, 0.99],
                },
                duration: 20,
              },
              {
                color: colors.munsell,
                position: { bottom: "20%", right: "-20%" },
                size: { width: "100vw", height: "50vh" },
                animation: {
                  x: ["2%", "-2%", "1%"],
                  y: ["-1%", "2%", "-2%"],
                  scale: [0.99, 1.01, 0.98],
                },
                duration: 25,
              },
              {
                color: colors.seaGreen,
                position: { top: "10%", right: "10%" },
                size: { width: "80vw", height: "40vh" },
                animation: {
                  x: ["-1%", "3%", "-2%"],
                  y: ["2%", "-1%", "2%"],
                  scale: [1.01, 0.99, 1.02],
                },
                duration: 22,
              },
            ].map((orb, index) => (
              <GradientOrb
                key={index}
                $color={orb.color}
                animate={reducedMotion ? {} : orb.animation}
                transition={{
                  duration: orb.duration,
                  repeat: Infinity,
                  repeatType: "reverse",
                  ease: "easeInOut",
                }}
                style={{
                  ...orb.position,
                  ...orb.size,
                }}
              />
            ))}
            {/* Animated waves */}
            <WaveContainer>
              {[0, 1, 2].map((i) => (
                <Wave
                  key={i}
                  $color={colors.sea}
                  $delay={i}
                  style={{
                    top: `${45 + i * 5}%`,
                    opacity: 0.07 - i * 0.02,
                  }}
                />
              ))}
            </WaveContainer>
          </>
        );
      }

      case "sunset":
        return (
          <SunsetGradient
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.8 }}
            transition={{ duration: 1 }}
          />
        );

      default:
        return orbs.map((orb, index) => (
          <GradientOrb
            key={index}
            $color={orb.color}
            animate={reducedMotion ? {} : orb.animation}
            transition={{
              duration: orb.duration,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "easeInOut",
            }}
            style={{
              ...orb.position,
              ...orb.size,
            }}
          />
        ));
    }
  };

  // Default orb configurations (used for main theme)
  const orbs = [
    {
      color: (currentColors as MainColors).sunset,
      position: { top: "0%", left: "0%" },
      size: { width: "120vw", height: "120vh" },
      animation: {
        x: ["-5%", "5%", "-2%"],
        y: ["2%", "-5%", "5%"],
        scale: [1, 1.05, 0.98],
      },
      duration: 25,
    },
    {
      color: (currentColors as MainColors).ocean,
      position: { bottom: "-20%", right: "-20%" },
      size: { width: "120vw", height: "120vh" },
      animation: {
        x: ["5%", "-5%", "2%"],
        y: ["-2%", "5%", "-5%"],
        scale: [1.02, 0.98, 1.05],
      },
      duration: 30,
    },
    {
      color: (currentColors as MainColors).sky,
      position: { top: "30%", right: "-10%" },
      size: { width: "100vw", height: "100vh" },
      animation: {
        x: ["-2%", "7%", "-4%"],
        y: ["4%", "-2%", "5%"],
        scale: [0.98, 1.02, 0.95],
      },
      duration: 20,
    },
  ];

  return (
    <BackgroundContainer className={className} style={{ zIndex }}>
      {renderThemeContent()}
    </BackgroundContainer>
  );
};

export default GradientBackground;
