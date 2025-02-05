import React, { useMemo, useRef } from "react";
import { motion } from "framer-motion";
import {
  HeroContainer,
  HeroText,
  Underline,
  Subtext,
} from "../styles/HeroSection.styles";

/**
 * Shuffles an array of numbers into a random order.
 *
 * @param {number[]} array - The array of numbers to shuffle.
 * @returns {number[]} A new array with the elements in randomized order.
 *
 * @example
 * // For an array [0, 1, 2], this might return [1, 0, 2]
 * const order = shuffleArray([0, 1, 2]);
 */
function shuffleArray(array: number[]): number[] {
  return array
    .map((value) => ({ value, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ value }) => value);
}

/**
 * HeroSection Component
 *
 * Renders the hero section with an animated display of the name "Andrew Kolumbic".
 * Each letter falls into place with a subtle bounce effect, and an underline plus
 * subtext animate into view.
 *
 * @returns {JSX.Element} The rendered hero section.
 */
const HeroSection: React.FC = () => {
  // The name to display in the hero section.
  const name = "Andrew Kolumbic";

  // Compute a randomized order for the letters only once.
  const randomizedOrder = useRef(
    shuffleArray([...Array(name.length).keys()])
  ).current;

  // Memoize the letter animation variants. Each letter will fall in with a bounce.
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
    [randomizedOrder]
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
        transition={{ delay: 0.8, duration: 0.8, ease: "easeOut" }}
      />

      <Subtext
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 1 }}
      >
        Software Engineer | San Pedro, CA
      </Subtext>
    </HeroContainer>
  );
};

export default React.memo(HeroSection);
