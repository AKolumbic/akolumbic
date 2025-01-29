import React, { useEffect, useMemo } from "react";
import { motion } from "framer-motion";

export default function HeroSection() {
  const name = "Andrew Kolumbic";

  /**
   * Load Michroma font dynamically on the client-side.
   * Ensures the font is added only once per page load.
   */
  useEffect(() => {
    if (document.head.querySelector("link[href*='Michroma']")) return; // Prevents duplicate font injection

    const fontLink = document.createElement("link");
    fontLink.href =
      "https://fonts.googleapis.com/css2?family=Michroma&display=swap";
    fontLink.rel = "stylesheet";
    document.head.appendChild(fontLink);
  }, []);

  /**
   * Generates a shuffled array of indices to randomize letter animation order.
   * Uses structuredClone to avoid modifying the original array.
   */
  const shuffleArray = (array: number[]) => {
    return structuredClone(array)
      .map((value) => ({ value, sort: Math.random() })) // Assign random sort key
      .sort((a, b) => a.sort - b.sort) // Sort by key
      .map(({ value }) => value);
  };

  // Generate a random order for letter animations (memoized for stability)
  const randomizedOrder = useMemo(
    () => shuffleArray([...Array(name.length).keys()]),
    [name]
  );

  // Define animation variants for letters
  const letterVariants = {
    /**
     * Initial state: Letters start off-screen above the viewport
     * with zero opacity.
     */
    initial: {
      y: "-120vh",
      opacity: 0,
    },

    /**
     * Fall-in animation: Letters fall with a slight bounce and
     * gradually fade in. Each letter has a randomized delay for a
     * non-uniform appearance.
     */
    fallIn: (i: number) => ({
      y: [0, -6, 2, 0], // Adds subtle bounce effect
      opacity: [0, 0.2, 0.6, 1], // Gradual fade-in
      transition: {
        delay: randomizedOrder[i] * 0.12, // Randomized stagger effect
        type: "spring",
        stiffness: 80, // Lower stiffness = smoother movement
        damping: 22, // Higher damping = more controlled stop
        duration: 2, // Slow descent
      },
    }),

    /**
     * Default (idle) state: Letters return to normal when
     * not hovered over.
     */
    default: {
      y: 0,
      scale: 1,
      letterSpacing: "2px",
      transition: { duration: 0.5, ease: "easeOut" },
    },

    /**
     * Hover effect: Letters rise slightly and increase in size,
     * while spacing expands for a fluid motion.
     */
    hover: {
      y: -8,
      scale: 1.2,
      letterSpacing: "5px",
      transition: { type: "spring", stiffness: 160, damping: 14 },
    },

    /**
     * Adjacent letter effect: Slight movement when a nearby
     * letter is hovered over.
     */
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
