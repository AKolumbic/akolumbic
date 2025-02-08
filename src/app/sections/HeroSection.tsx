"use client"; // Ensure it's a client component

import React, { useMemo, useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  HeroContainer,
  HeroTextWrapper,
  FirstName,
  LastName,
  Underline,
  SubtextWrapper,
  SubtextLine,
} from "../styles/HeroSection.styles";

/**
 * Shuffles an array of numbers into a random order.
 * This is used to randomize animation order while ensuring
 * consistency between SSR and client hydration.
 */
function shuffleArray(array: number[]): number[] {
  return array
    .map((value) => ({ value, sort: value })) // Keeps stable order
    .sort((a, b) => a.sort - b.sort)
    .map(({ value }) => value);
}

const HeroSection: React.FC = () => {
  // Ensure component only renders on the client (fixes hydration issues)
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  // Define name and split into first/last
  const firstName = "Andrew";
  const lastName = "Kolumbic";

  // Compute a stable randomized order for letters
  const randomizedOrder = useMemo(
    () => shuffleArray([...Array(firstName.length + lastName.length).keys()]),
    []
  );

  // Animation variants
  const letterVariants = useMemo(
    () => ({
      initial: { y: "-100vh", opacity: 0 },
      fallIn: (i: number) => ({
        y: [0, -8, 3, 0], // Subtle bounce
        opacity: 1,
        transition: {
          delay: randomizedOrder[i] * 0.06,
          type: "spring",
          stiffness: 110,
          damping: 20,
        },
      }),
    }),
    [randomizedOrder]
  );

  if (!isClient) return null; // Prevents rendering until mounted

  return (
    <HeroContainer>
      {/* Name Wrapper (Mobile: Stacks First/Last Name) */}
      <HeroTextWrapper>
        <FirstName>
          {firstName.split("").map((char, i) => (
            <motion.span
              key={i}
              custom={i}
              initial="initial"
              animate="fallIn"
              variants={letterVariants}
            >
              {char}
            </motion.span>
          ))}
        </FirstName>
        <LastName>
          {lastName.split("").map((char, i) => (
            <motion.span
              key={i + firstName.length}
              custom={i + firstName.length}
              initial="initial"
              animate="fallIn"
              variants={letterVariants}
            >
              {char}
            </motion.span>
          ))}
        </LastName>
      </HeroTextWrapper>

      {/* Underline (Hidden on Mobile) */}
      <Underline
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ delay: 0.8, duration: 0.8, ease: "easeOut" }}
      />

      {/* Subtext (Mobile: Stacks Lines) */}
      <SubtextWrapper>
        <SubtextLine>Software Engineer</SubtextLine>
        {/* <SubtextLine>San Pedro, CA</SubtextLine> */}
      </SubtextWrapper>
    </HeroContainer>
  );
};

export default React.memo(HeroSection);
