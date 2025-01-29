import React, { useEffect, useMemo } from "react";
import { motion } from "framer-motion";

export default function HeroSection() {
  const name = "Andrew Kolumbic";

  useEffect(() => {
    if (typeof document !== "undefined") {
      const fontLink = document.createElement("link");
      fontLink.href =
        "https://fonts.googleapis.com/css2?family=Michroma&display=swap";
      fontLink.rel = "stylesheet";
      document.head.appendChild(fontLink);
    }
  }, []);

  // Shuffle function to randomize animation order
  const shuffleArray = (array: number[]) => {
    return array
      .map((value) => ({ value, sort: Math.random() })) // Assign a random sort key
      .sort((a, b) => a.sort - b.sort) // Sort by random key
      .map(({ value }) => value);
  };

  // Generate randomized order only once per render
  const randomizedOrder = useMemo(
    () => shuffleArray([...Array(name.length).keys()]),
    [name]
  );

  // Define animation variants for letters
  const letterVariants = {
    initial: {
      y: "-120vh", // Start even higher for a longer fall
      opacity: 0,
    },
    fallIn: (i: number) => ({
      y: [0, -6, 2, 0], // Gentle bouncing effect on landing
      opacity: [0, 0.2, 0.6, 1], // Extended fade-in
      transition: {
        delay: randomizedOrder[i] * 0.12, // Increased delay for even slower stagger
        type: "spring",
        stiffness: 80, // Lower stiffness for slower movement
        damping: 22, // More controlled stop
        duration: 2, // Longer duration for slower descent
      },
    }),
    default: {
      y: 0,
      scale: 1,
      letterSpacing: "2px",
      transition: { duration: 0.5, ease: "easeOut" },
    },
    hover: {
      y: -8,
      scale: 1.2,
      letterSpacing: "5px",
      transition: { type: "spring", stiffness: 160, damping: 14 },
    },
    adjacent: {
      y: -4,
      scale: 1.1,
      letterSpacing: "3px",
      transition: { type: "spring", stiffness: 140, damping: 16 },
    },
  };

  return (
    <motion.section
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        overflow: "hidden",
        backgroundColor: "#000",
      }}
    >
      <motion.div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          maxWidth: "90vw",
          textAlign: "center",
          gap: "4px", // Prevents letters from looking too cramped
        }}
      >
        {name.split("").map((char, i) => (
          <motion.span
            key={i}
            custom={i}
            initial="initial"
            animate="fallIn"
            whileHover="hover"
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
    </motion.section>
  );
}
