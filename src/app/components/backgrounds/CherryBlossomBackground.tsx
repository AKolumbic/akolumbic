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
  background: #ffafcc; /* Soft Pink */
  border-radius: 50%;
  opacity: 0.8;
  box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.2);
`;

interface PetalData {
  id: number;
  left: number;
  drift: number;
  delay: number;
  duration: number;
  size: number;
  startY: number;
}

const generatePetals = (count: number): PetalData[] => {
  return Array.from({ length: count }, (_, index) => {
    const duration = 5 + Math.random() * 10;
    return {
      id: index,
      left: Math.random() * 100,
      drift: Math.random() * 40 - 20,
      delay: -Math.random() * duration,
      duration,
      size: 10 + Math.random() * 10,
      startY: Math.random() * 100,
    };
  });
};

export const CherryBlossomBackground: React.FC<
  GradientBackgroundProps
> = () => {
  const [petals, setPetals] = useState<PetalData[]>([]);

  useEffect(() => {
    setPetals(generatePetals(40));
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
