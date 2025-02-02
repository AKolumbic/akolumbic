import React from "react";
import { motion } from "framer-motion";

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

export default function Portfolio() {
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
        backgroundColor: "#000", // ✅ Set background to black
        color: "#FFF", // ✅ Adjust text color for contrast
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
        {projects.map((project) => (
          <motion.a
            key={project.title}
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            style={{
              background: "#1A1A1A", // ✅ Darker gray for contrast against black
              padding: "1.5rem",
              borderRadius: "8px",
              boxShadow: "0 5px 15px rgba(255, 255, 255, 0.1)", // ✅ White glow effect
              textAlign: "left",
              textDecoration: "none",
              color: "inherit",
              transition: "all 0.3s ease",
              display: "block",
              border: "1px solid rgba(255, 255, 255, 0.2)", // ✅ Subtle border
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
                color: "#BBB",
              }}
            >
              {project.tech.map((tech) => (
                <span
                  key={tech}
                  style={{
                    background: "#FFF",
                    color: "#000",
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
