import React, { useMemo, useRef } from "react";
import { motion } from "framer-motion";

// Utility: Shuffle function moved outside the component.
function shuffleArray(array: number[]): number[] {
  return array
    .map((value) => ({ value, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ value }) => value);
}

const HeroSection: React.FC = () => {
  const name = "Andrew Kolumbic";

  // Compute the randomized order once using a ref.
  const randomizedOrder = useRef(
    shuffleArray([...Array(name.length).keys()])
  ).current;

  // Memoize the animation variants to avoid recalculations.
  const letterVariants = useMemo(
    () => ({
      initial: { y: "-100vh", opacity: 0 },
      fallIn: (i: number) => ({
        y: [0, -8, 3, 0], // Subtle bounce effect
        opacity: 1,
        transition: {
          delay: randomizedOrder[i] * 0.06, // Slightly slower stagger effect
          type: "spring",
          stiffness: 110,
          damping: 20,
        },
      }),
    }),
    [] // No dependencies needed because randomizedOrder is fixed.
  );

  return (
    <motion.section
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        overflow: "hidden",
        backgroundColor: "#000",
      }}
    >
      {/* Name Animation */}
      <motion.div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center",
          gap: "4px",
        }}
      >
        {name.split("").map((char, i) => (
          <motion.span
            key={i}
            custom={i}
            initial="initial"
            animate="fallIn"
            variants={letterVariants}
            style={{
              fontSize: "min(10vw, 5rem)",
              fontWeight: "bold",
              textTransform: "uppercase",
              fontFamily: "'Michroma', sans-serif",
              color: "#FFF",
              display: "inline-block",
              whiteSpace: "nowrap",
            }}
          >
            {char === " " ? "\u00A0" : char}
          </motion.span>
        ))}
      </motion.div>

      {/* Underline */}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 0.8, ease: "easeOut", delay: 0.8 }}
        style={{
          width: "80%",
          maxWidth: "400px",
          height: "2px",
          backgroundColor: "#FFF",
          margin: "1rem auto",
          transformOrigin: "center",
        }}
        className="underline"
      />

      {/* Subtext: Software Engineer | San Pedro, CA */}
      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 1 }}
        style={{
          fontSize: "min(4vw, 1.2rem)",
          fontFamily: "'Michroma', sans-serif",
          color: "rgba(255, 255, 255, 0.8)",
          textAlign: "center",
          letterSpacing: "1.5px",
          marginTop: "0.5rem",
          padding: "0 1rem",
        }}
      >
        Software Engineer | San Pedro, CA
      </motion.p>

      {/* Media Query to hide the underline on small screens */}
      <style>
        {`
          @media (max-width: 600px) {
            .underline {
              display: none !important;
            }
          }
        `}
      </style>
    </motion.section>
  );
};

export default React.memo(HeroSection);
