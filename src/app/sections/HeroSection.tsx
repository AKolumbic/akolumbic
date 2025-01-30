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
      .map((value) => ({ value, sort: Math.random() }))
      .sort((a, b) => a.sort - b.sort)
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
      y: "-100vh",
      opacity: 0,
    },
    fallIn: (i: number) => ({
      y: [0, -8, 3, 0], // Subtle bounce effect
      opacity: 1,
      transition: {
        delay: randomizedOrder[i] * 0.05,
        type: "spring",
        stiffness: 120,
        damping: 18,
      },
    }),
  };

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
      />

      {/* Subtext: Software Engineer | San Pedro, CA */}
      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 1 }}
        style={{
          fontSize: "min(4vw, 1.2rem)",
          fontFamily: "'Michroma', sans-serif",
          color: "rgba(255, 255, 255, 0.7)", // Soft contrast
          textAlign: "center",
          letterSpacing: "2px",
        }}
      >
        Software Engineer | San Pedro, CA
      </motion.p>
    </motion.section>
  );
}
