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

interface GradientBackgroundProps {
  /** Optional class name for additional styling */
  className?: string;
  /** Optional z-index override (default: 0) */
  zIndex?: number;
  /** Optional reduced motion setting for accessibility */
  reducedMotion?: boolean;
  /** Current active section */
  activeSection?: "hero" | "about" | "portfolio" | "contact";
}

/**
 * GradientBackground Component
 *
 * A reusable animated gradient background with colorful orbs that move and
 * scale for a dynamic effect. Colors transition based on the active section.
 *
 * @param {object} props - Component props
 * @returns {JSX.Element} - Rendered component
 */
const GradientBackground: React.FC<GradientBackgroundProps> = ({
  className,
  zIndex = 0,
  reducedMotion = false,
  activeSection = "hero",
}) => {
  // Color schemes for different sections inspired by California sunsets
  const sectionColors = {
    hero: {
      sunset: "#661C1C", // Darker sunset red
      ocean: "#1B4B8A", // Darker ocean blue
      sky: "#4A2B57", // Darker twilight purple
    },
    about: {
      sunset: "#662D15", // Darker orange sunset
      ocean: "#1B3A6B", // Darker deep ocean blue
      sky: "#432B47", // Darker evening purple
    },
    portfolio: {
      sunset: "#661C1E", // Darker vibrant sunset
      ocean: "#153A6B", // Darker bright ocean blue
      sky: "#3D2857", // Darker rich purple
    },
    contact: {
      sunset: "#662424", // Darker soft sunset
      ocean: "#1B4273", // Darker calm ocean blue
      sky: "#472B57", // Darker soft purple
    },
  };

  const currentColors = sectionColors[activeSection];

  // Configurations for the gradient orbs
  const orbs = [
    {
      color: currentColors.sunset,
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
      color: currentColors.ocean,
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
      color: currentColors.sky,
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
      {orbs.map((orb, index) => (
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
    </BackgroundContainer>
  );
};

export default GradientBackground;
