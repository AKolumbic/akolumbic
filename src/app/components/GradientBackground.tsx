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
  transition: background-color 1s ease;
`;

const GradientOrb = styled(motion.div)<{ $color: string }>`
  position: absolute;
  border-radius: 50%;
  background: ${(props) => props.$color};
  filter: blur(100px);
  opacity: 0.2;
  z-index: 0;
  transition: background-color 1s ease;
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
  // Color schemes for different sections
  const sectionColors = {
    hero: {
      primary: "#3b82f6", // Blue
      secondary: "#8b5cf6", // Purple
      accent: "#14b8a6", // Teal
    },
    about: {
      primary: "#10b981", // Emerald
      secondary: "#3b82f6", // Blue
      accent: "#6366f1", // Indigo
    },
    portfolio: {
      primary: "#8b5cf6", // Purple
      secondary: "#ec4899", // Pink
      accent: "#6366f1", // Indigo
    },
    contact: {
      primary: "#6366f1", // Indigo
      secondary: "#14b8a6", // Teal
      accent: "#3b82f6", // Blue
    },
  };

  const currentColors = sectionColors[activeSection];

  // Configurations for the gradient orbs
  const orbs = [
    {
      color: currentColors.primary,
      position: { top: "20%", left: "10%" },
      size: { width: "500px", height: "500px" },
      animation: {
        x: ["-10%", "30%", "-5%"],
        y: ["5%", "-20%", "25%"],
        scale: [1, 1.2, 0.9],
      },
      duration: 25,
    },
    {
      color: currentColors.secondary,
      position: { bottom: "10%", right: "20%" },
      size: { width: "600px", height: "600px" },
      animation: {
        x: ["10%", "-20%", "10%"],
        y: ["-5%", "10%", "-25%"],
        scale: [1.1, 0.9, 1.2],
      },
      duration: 30,
    },
    {
      color: currentColors.accent,
      position: { top: "50%", right: "10%" },
      size: { width: "400px", height: "400px" },
      animation: {
        x: ["-5%", "15%", "-15%"],
        y: ["15%", "-5%", "10%"],
        scale: [0.9, 1.1, 0.8],
      },
      duration: 20,
    },
  ];

  return (
    <BackgroundContainer
      className={className}
      style={{
        zIndex,
      }}
    >
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
