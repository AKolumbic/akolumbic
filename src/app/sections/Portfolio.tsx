import React, { useEffect, useRef, useState } from "react";
import { motion, Variants } from "framer-motion";

// Project data
const projects = [
  {
    title: "BATMAN-Streets-of-Gotham",
    description:
      "A 2D Batman Platformer that uses Phaser 3, TypeScript, and Rollup for bundling.",
    tech: ["Phaser 3", "TypeScript", "Rollup"],
    link: "https://github.com/AKolumbic/BATMAN-Streets-of-Gotham",
  },
  {
    title: "twitchbot",
    description: "A bot for my Twitch channel.",
    tech: ["TypeScript"],
    link: "https://github.com/AKolumbic/twitchbot",
  },
  {
    title: "dndStuff",
    description: "D&D-themed React practice.",
    tech: ["React", "TypeScript"],
    link: "https://github.com/AKolumbic/dndStuff",
  },
  {
    title: "warcraft",
    description: "Warcraft-themed coding experiments.",
    tech: ["TypeScript"],
    link: "https://github.com/AKolumbic/warcraft",
  },
];

// Function to generate floating movement animation
const getRandomMovement = (): Variants => ({
  animate: {
    x: Math.random() * 20 - 10,
    y: Math.random() * 20 - 10,
    transition: {
      duration: 4,
      ease: "easeInOut",
      repeat: Infinity,
      repeatType: "mirror" as const, // ✅ Explicitly set type
    },
  },
});

export default function Portfolio() {
  const [floatingAnimations, setFloatingAnimations] = useState(
    projects.map(() => getRandomMovement())
  );

  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setFloatingAnimations(projects.map(() => getRandomMovement()));
    }, 4000);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        padding: "5rem 2rem",
        backgroundColor: "#fff",
        color: "#000",
        borderTop: "8px solid #000",
        textAlign: "center",
      }}
    >
      {/* Section Title */}
      <motion.h2
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        style={{
          fontSize: "2.5rem",
          fontWeight: "bold",
          marginBottom: "2rem",
          textTransform: "uppercase",
        }}
      >
        My Side Projects
      </motion.h2>

      {/* Project Grid */}
      <motion.div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
          gap: "2rem",
          maxWidth: "1100px",
          width: "100%",
          padding: "1rem",
        }}
      >
        {projects.map((project, i) => (
          <motion.a
            key={project.title} // ✅ Stable key
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }} // ✅ Use correct Framer Motion variants
            variants={floatingAnimations[i]} // ✅ Assign animation variants
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            style={{
              background: "#f8f8f8",
              padding: "1.5rem",
              borderRadius: "8px",
              boxShadow: "0 5px 15px rgba(0, 0, 0, 0.1)",
              textAlign: "left",
              textDecoration: "none",
              color: "inherit",
              transition: "all 0.3s ease",
              position: "relative",
              display: "block",
            }}
          >
            <h3 style={{ fontSize: "1.5rem", marginBottom: "0.5rem" }}>
              {project.title}
            </h3>
            <p style={{ fontSize: "1rem", marginBottom: "1rem" }}>
              {project.description}
            </p>
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: "8px",
                fontSize: "0.9rem",
                color: "#555",
              }}
            >
              {project.tech.map((tech) => (
                <span
                  key={tech}
                  style={{
                    background: "#000",
                    color: "#fff",
                    padding: "5px 10px",
                    borderRadius: "5px",
                    fontWeight: "bold",
                  }}
                >
                  {tech}
                </span>
              ))}
            </div>
          </motion.a>
        ))}
      </motion.div>
    </motion.section>
  );
}
