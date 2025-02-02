import React from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import styled, { keyframes } from "styled-components";

// 🔹 Floating Animation (Fix)
const floatAnimation = keyframes`
  0% { transform: translateY(0px); }
  50% { transform: translateY(-10px); }
  100% { transform: translateY(0px); }
`;

// 🔹 Background Animation
const AnimatedBackground = styled.div`
  background: linear-gradient(-45deg, #000000, #1a1a1a, #333333);
  background-size: 400% 400%;
  animation: gradientShift 10s ease infinite;
  @keyframes gradientShift {
    0% {
      background-position: 0% 50%;
    }
    50% {
      background-position: 100% 50%;
    }
    100% {
      background-position: 0% 50%;
    }
  }
`;

// 🔹 Styled Floating Card
const FloatingCard = styled(motion.a)`
  animation: ${floatAnimation} 4s ease-in-out infinite;
  backdrop-filter: blur(10px);
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 12px;
  color: inherit;
  display: block;
  padding: 1.5rem;
  position: relative;
  text-align: left;
  text-decoration: none;
  transition: all 0.3s ease;
  &:hover {
    transform: scale(1.1) rotate(1deg);
    box-shadow: 0px 0px 20px rgba(255, 255, 255, 0.5);
  }
`;

// 🔹 Project Data
const projects = [
  {
    title: "BATMAN-Streets-of-Gotham",
    description:
      "A 2D Batman Platformer using Phaser 3, TypeScript, and Rollup.",
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
  {
    title: "Vue Calculator",
    description: "A calculator built with Vue.js.",
    tech: ["Vue.js", "JavaScript"],
    link: "https://github.com/AKolumbic/vue-calc",
  },
];

export default function Portfolio() {
  // 🔹 Parallax Effect for Scrolling
  const { scrollYProgress } = useScroll();
  const parallaxY = useTransform(scrollYProgress, [0, 1], ["0px", "-50px"]);

  return (
    <AnimatedBackground>
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        style={{
          alignItems: "center",
          color: "#FFF",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          minHeight: "100vh",
          padding: "5rem 2rem",
          textAlign: "center",
        }}
      >
        {/* 🔹 Section Title with Glow Effect */}
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          style={{
            fontSize: "2.5rem",
            fontWeight: "bold",
            marginBottom: "2rem",
            textShadow: "0px 0px 10px rgba(255, 255, 255, 0.6)",
            textTransform: "uppercase",
          }}
        >
          My Side Projects
        </motion.h2>

        {/* 🔹 Project Grid with Parallax */}
        <motion.div
          style={{
            display: "grid",
            gap: "2rem",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            maxWidth: "1100px",
            padding: "1rem",
            width: "100%",
          }}
        >
          {projects.map((project, i) => (
            <FloatingCard
              animate={{ opacity: 1, y: 0 }}
              whileHover={{
                y: -10,
                transition: { duration: 0.3, ease: "easeOut" },
              }}
              href={project.link}
              initial={{ opacity: 0, y: 50 }}
              key={project.title}
              rel="noopener noreferrer"
              style={{ y: parallaxY }} // 🔹 Parallax effect
              target="_blank"
              transition={{ delay: i * 0.2, duration: 0.8, ease: "easeOut" }}
            >
              <h3 style={{ fontSize: "1.5rem", marginBottom: "0.5rem" }}>
                {project.title}
              </h3>
              <p style={{ fontSize: "1rem", marginBottom: "1rem" }}>
                {project.description}
              </p>
              <div
                style={{
                  color: "#BBB",
                  display: "flex",
                  flexWrap: "wrap",
                  fontSize: "0.9rem",
                  gap: "8px",
                }}
              >
                {project.tech.map((tech) => (
                  <motion.span
                    key={tech}
                    style={{
                      background: "#FFF",
                      borderRadius: "5px",
                      color: "#000",
                      fontWeight: "bold",
                      padding: "5px 10px",
                    }}
                    whileHover={{
                      scale: 1.1,
                      boxShadow: "0px 0px 8px rgba(255, 255, 255, 0.8)",
                    }}
                  >
                    {tech}
                  </motion.span>
                ))}
              </div>
            </FloatingCard>
          ))}
        </motion.div>
      </motion.section>
    </AnimatedBackground>
  );
}
