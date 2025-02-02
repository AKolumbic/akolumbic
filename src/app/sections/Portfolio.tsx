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
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  padding: 1.5rem;
  border-radius: 12px;
  border: 1px solid rgba(255, 255, 255, 0.2);
  text-align: left;
  text-decoration: none;
  color: inherit;
  transition: all 0.3s ease;
  display: block;
  position: relative;
  animation: ${floatAnimation} 4s ease-in-out infinite;
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
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          padding: "5rem 2rem",
          color: "#FFF",
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
            textTransform: "uppercase",
            textShadow: "0px 0px 10px rgba(255, 255, 255, 0.6)",
          }}
        >
          My Side Projects
        </motion.h2>

        {/* 🔹 Project Grid with Parallax */}
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
            <FloatingCard
              key={project.title}
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut", delay: i * 0.2 }}
              style={{ y: parallaxY }} // 🔹 Parallax effect
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
                  <motion.span
                    key={tech}
                    whileHover={{
                      scale: 1.1,
                      boxShadow: "0px 0px 8px rgba(255, 255, 255, 0.8)",
                    }}
                    style={{
                      background: "#FFF",
                      color: "#000",
                      padding: "5px 10px",
                      borderRadius: "5px",
                      fontWeight: "bold",
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
