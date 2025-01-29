import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

export default function HeroSection() {
  const name = "Andrew Kolumbic";
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  // Load font dynamically (Only on the client side)
  useEffect(() => {
    if (typeof document !== "undefined") {
      const fontLink = document.createElement("link");
      fontLink.href =
        "https://fonts.googleapis.com/css2?family=Michroma&display=swap";
      fontLink.rel = "stylesheet";
      document.head.appendChild(fontLink);
    }
  }, []);

  // Define animation variants for letters
  const letterVariants = {
    initial: {
      y: "-100vh", // Letters start falling from above
      opacity: 0,
    },
    fallIn: (i: number) => ({
      y: 0,
      opacity: 1,
      transition: {
        delay: i * 0.05, // Stagger effect on fall
        type: "spring",
        stiffness: 150,
        damping: 20,
      },
    }),
    default: {
      y: 0,
      scale: 1,
      letterSpacing: "2px",
      transition: { duration: 0.2 },
    },
    hover: {
      y: -10,
      scale: 1.3,
      letterSpacing: "6px",
      transition: { type: "spring", stiffness: 200, damping: 12 },
    },
    adjacent: {
      y: -5,
      scale: 1.15,
      letterSpacing: "4px",
      transition: { type: "spring", stiffness: 180, damping: 14 },
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
          flexWrap: "wrap",
          justifyContent: "center",
          alignItems: "center",
          maxWidth: "90vw",
          textAlign: "center",
          gap: hoveredIndex !== null ? "8px" : "4px",
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
            onMouseEnter={() => setHoveredIndex(i)}
            onMouseLeave={() => setHoveredIndex(null)}
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
