"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import styled from "styled-components";
import { BackgroundProps } from "./types";
import { DeepOceanColors } from "../../types/gradient.types";

// Water layer with subtle wave animation
const WaterBackground = styled(motion.div)`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(135deg, #0a1128 0%, #1e81b0 60%, #134f6e 100%);
  opacity: 0.9;
`;

// Water ripple effect
const WaterRipple = styled(motion.div)<{
  color: string;
  size: number;
  opacity: number;
}>`
  position: absolute;
  width: ${(props) => props.size}%;
  height: ${(props) => props.size / 3}%;
  background: ${(props) => props.color};
  opacity: ${(props) => props.opacity};
  border-radius: 50%;
  filter: blur(30px);
`;

// Bioluminescent particle
const Particle = styled(motion.div)<{ color: string; size: number }>`
  position: absolute;
  width: ${(props) => props.size}px;
  height: ${(props) => props.size}px;
  background: ${(props) => props.color};
  border-radius: 50%;
  filter: blur(1px);
  opacity: 0.7;
  box-shadow: 0 0 ${(props) => props.size * 2}px ${(props) => props.size}px
    ${(props) => props.color};
`;

interface ParticleData {
  id: number;
  x: number;
  y: number;
  size: number;
  delay: number;
  duration: number;
  drift: number;
}

const DeepOceanBackground: React.FC<BackgroundProps> = ({ colors }) => {
  const typedColors = colors as DeepOceanColors;
  const [particles, setParticles] = useState<ParticleData[]>([]);

  // Generate particles once on mount
  useEffect(() => {
    const newParticles = Array.from({ length: 50 }, (_, i) => ({
      id: i,
      x: Math.random() * 100, // random horizontal position
      y: 100 + Math.random() * 20, // start just below the visible area
      size: 1 + Math.random() * 3, // varying sizes
      delay: Math.random() * 10, // staggered animation
      duration: 15 + Math.random() * 20, // varying speeds
      drift: Math.random() * 20 - 10, // horizontal movement
    }));
    setParticles(newParticles);
  }, []);

  return (
    <>
      {/* Base ocean gradient */}
      <WaterBackground />

      {/* Water ripples */}
      <WaterRipple
        color={typedColors.primary}
        size={180}
        opacity={0.2}
        initial={{ x: "0%", y: "30%" }}
        animate={{
          x: ["0%", "5%", "-3%", "2%", "0%"],
          y: ["30%", "28%", "33%", "29%", "30%"],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          repeatType: "mirror",
          ease: "easeInOut",
        }}
      />

      <WaterRipple
        color={typedColors.accent}
        size={120}
        opacity={0.15}
        initial={{ x: "-10%", y: "60%" }}
        animate={{
          x: ["-10%", "-5%", "-15%", "-8%", "-10%"],
          y: ["60%", "63%", "58%", "62%", "60%"],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          repeatType: "mirror",
          ease: "easeInOut",
        }}
      />

      {/* Bioluminescent particles */}
      {particles.map((particle) => (
        <Particle
          key={particle.id}
          color={typedColors.accent}
          size={particle.size}
          initial={{
            x: `${particle.x}%`,
            y: `${particle.y}%`,
            opacity: 0,
            scale: 0.5,
          }}
          animate={{
            x: [
              `${particle.x}%`,
              `${particle.x + particle.drift}%`,
              `${particle.x}%`,
            ],
            y: "-10%",
            opacity: [0, 0.7, 0],
            scale: [0.5, 1, 0.5],
          }}
          transition={{
            duration: particle.duration,
            delay: particle.delay,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      ))}

      {/* Occasional larger particles */}
      <Particle
        color={typedColors.accent}
        size={5}
        initial={{ x: "30%", y: "100%", opacity: 0 }}
        animate={{
          y: "0%",
          opacity: [0, 0.9, 0],
          scale: [0.8, 1.5, 0.8],
        }}
        transition={{
          duration: 30,
          repeat: Infinity,
          repeatDelay: 15,
          ease: "easeInOut",
        }}
      />

      <Particle
        color={typedColors.accent}
        size={4}
        initial={{ x: "70%", y: "100%", opacity: 0 }}
        animate={{
          y: "0%",
          opacity: [0, 0.8, 0],
          scale: [0.8, 1.3, 0.8],
        }}
        transition={{
          duration: 25,
          delay: 8,
          repeat: Infinity,
          repeatDelay: 20,
          ease: "easeInOut",
        }}
      />
    </>
  );
};

export default DeepOceanBackground;
