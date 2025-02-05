import React, { useMemo, useRef } from "react";
import { motion } from "framer-motion";
import {
  HeroContainer,
  HeroText,
  Underline,
  Subtext,
} from "../styles/HeroSection.styles";

function shuffleArray(array: number[]): number[] {
  return array
    .map((value) => ({ value, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ value }) => value);
}

const HeroSection: React.FC = () => {
  const name = "Andrew Kolumbic";
  const randomizedOrder = useRef(
    shuffleArray([...Array(name.length).keys()])
  ).current;

  const letterVariants = useMemo(
    () => ({
      initial: { y: "-100vh", opacity: 0 },
      fallIn: (i: number) => ({
        y: [0, -8, 3, 0], // Subtle bounce effect
        opacity: 1,
        transition: {
          delay: randomizedOrder[i] * 0.06,
          type: "spring",
          stiffness: 110,
          damping: 20,
        },
      }),
    }),
    []
  );

  return (
    <HeroContainer>
      <HeroText>
        {name.split("").map((char, i) => (
          <motion.span
            key={i}
            custom={i}
            initial="initial"
            animate="fallIn"
            variants={letterVariants}
          >
            {char === " " ? "\u00A0" : char}
          </motion.span>
        ))}
      </HeroText>

      <Underline
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 0.8, ease: "easeOut", delay: 0.8 }}
      />

      <Subtext
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 1 }}
      >
        Software Engineer | San Pedro, CA
      </Subtext>
    </HeroContainer>
  );
};

export default React.memo(HeroSection);
