import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import styled from "styled-components";
import { GradientBackgroundProps } from "../../types/gradient.types";

const BackgroundContainer = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg, #fdf7f4 0%, #ffafcc 30%, #a4133c 100%);
  overflow: hidden;
`;

const Petal = styled(motion.div)`
  position: absolute;
  border-radius: 65% 35% 50% 50% / 55% 45% 55% 45%;
  opacity: 0.8;
  box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.1);

  /* Create a subtle gradient to give depth */
  background: radial-gradient(
    ellipse at 30% 40%,
    #fff 0%,
    #ffcce0 40%,
    #ffafcc 70%,
    #ffa4c1 100%
  );

  /* Use a pseudo-element to create the subtle indentation at the tip of petal */
  &:before {
    content: "";
    position: absolute;
    top: 50%;
    left: 50%;
    width: 35%;
    height: 35%;
    background: radial-gradient(
      ellipse at center,
      rgba(255, 255, 255, 0.8) 0%,
      rgba(255, 255, 255, 0) 70%
    );
    transform: translate(-50%, -50%);
    border-radius: 50%;
  }
`;

interface PetalData {
  id: number;
  left: number;
  drift: number;
  delay: number;
  duration: number;
  size: number;
  startY: number;
  rotation: number;
}

const generatePetals = (count: number): PetalData[] => {
  return Array.from({ length: count }, (_, index) => {
    const duration = 10 + Math.random() * 20;
    return {
      id: index,
      left: Math.random() * 100,
      drift: Math.random() * 40 - 20,
      delay: -Math.random() * duration,
      duration,
      size: 8 + Math.random() * 12, // Subtle variance in petal size
      startY: Math.random() * 100,
      rotation: Math.random() * 360, // Random initial rotation
    };
  });
};

export const CherryBlossomBackground: React.FC<
  GradientBackgroundProps
> = () => {
  const [petals, setPetals] = useState<PetalData[]>([]);

  useEffect(() => {
    setPetals(generatePetals(60));
  }, []);

  return (
    <BackgroundContainer>
      {petals.map((petal) => (
        <Petal
          key={petal.id}
          style={{
            left: `${petal.left}%`,
            width: petal.size,
            height: petal.size,
            transform: `rotate(${petal.rotation}deg)`,
          }}
          initial={{ top: petal.startY + "%", opacity: 0, rotate: 0 }}
          animate={{
            top: "110%",
            opacity: [0, 1, 0],
            rotate: 360,
            x: [0, petal.drift, 0],
          }}
          transition={{
            delay: petal.delay,
            duration: petal.duration,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      ))}
    </BackgroundContainer>
  );
};

export default CherryBlossomBackground;
