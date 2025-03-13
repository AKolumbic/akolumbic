"use client";

import React from "react";
import { motion } from "framer-motion";
import styled from "styled-components";
import { BackgroundProps } from "./types";
import { DeepOceanColors } from "../../types/gradient.types";

// Styled components for the ocean effects
const BioluminescentParticle = styled(motion.div)<{ color: string }>`
  position: absolute;
  width: 2px;
  height: 2px;
  background: ${(props) => props.color};
  border-radius: 50%;
  filter: blur(1px);
  opacity: 0.6;
`;

const WaveEffect = styled(motion.div)<{ color: string }>`
  position: absolute;
  width: 200%;
  height: 200%;
  background: ${(props) => props.color};
  opacity: 0.1;
  filter: blur(8px);
`;

const DeepOceanBackground: React.FC<BackgroundProps> = ({
  colors,
  reducedMotion = false,
}) => {
  const typedColors = colors as DeepOceanColors;

  // Create an array of particles for the bioluminescent effect
  const particles = Array.from({ length: 50 }, (_, i) => ({
    id: i,
    initialX: Math.random() * 100,
    initialY: Math.random() * 100 + 100,
  }));

  return (
    <>
      {/* Base gradient */}
      <motion.div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: `linear-gradient(135deg, ${typedColors.background} 0%, ${typedColors.primary} 60%, ${typedColors.background} 100%)`,
          opacity: 0.8,
        }}
      />

      {/* Wave effects */}
      {!reducedMotion && (
        <>
          <WaveEffect
            color={typedColors.primary}
            initial={{ x: "-50%", y: "0%" }}
            animate={{
              x: "-25%",
              y: "-10%",
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "easeInOut",
            }}
          />
          <WaveEffect
            color={typedColors.accent}
            initial={{ x: "-25%", y: "-50%" }}
            animate={{
              x: "-50%",
              y: "-40%",
            }}
            transition={{
              duration: 15,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "easeInOut",
            }}
          />
        </>
      )}

      {/* Bioluminescent particles */}
      {!reducedMotion &&
        particles.map(({ id, initialX, initialY }) => (
          <BioluminescentParticle
            key={id}
            color={typedColors.accent}
            initial={{
              x: `${initialX}%`,
              y: `${initialY}%`,
              scale: 0.8,
              opacity: 0.4,
            }}
            animate={{
              x: `${initialX + (Math.random() * 20 - 10)}%`,
              y: `${initialY - 100}%`,
              scale: [0.8, 1.2, 0.8],
              opacity: [0.4, 0.8, 0.4],
            }}
            transition={{
              duration: 8 + Math.random() * 4,
              repeat: Infinity,
              ease: "linear",
            }}
          />
        ))}
    </>
  );
};

export default DeepOceanBackground;
