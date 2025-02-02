import React, { useState } from "react";
import { motion } from "framer-motion";
import styled, { keyframes } from "styled-components";

// 🔹 Floating Animation for Side Project Cards Only
const floatAnimation = keyframes`
  0% { transform: translateY(0px); }
  50% { transform: translateY(-10px); }
  100% { transform: translateY(0px); }
`;

// 🔹 Background Animation
const AnimatedBackground = styled.div`
  background: linear-gradient(-45deg, #000000, #1a1a1a, #333333, #222);
  background-size: 300% 300%;
  animation: gradientShift 8s ease infinite;

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

// 🔹 Shared Card Styling (Professional & Side Projects)
const Card = styled(motion.div)`
  backdrop-filter: blur(10px);
  background: rgba(255, 255, 255, 0.12);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 12px;
  padding: 1.5rem;
  text-align: left;
  transition: all 0.3s ease-in-out;
  color: #fff;

  &:hover {
    transform: scale(1.05);
    box-shadow: 0px 5px 20px rgba(255, 255, 255, 0.3);
  }
`;

// 🔹 Side Project Cards (With Floating Effect & Hover Effect)
const FloatingCard = styled(Card)<{ delay: number }>`
  animation: ${floatAnimation} ${({ delay }) => 4 + delay}s ease-in-out infinite;
`;

// 🔹 Tab Navigation Styles (Fixed Active Prop Issue)
const Tabs = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 2rem;
`;

const TabButton = styled.button<{ $active: boolean }>`
  background: none;
  border: none;
  color: ${({ $active }) => ($active ? "#FFF" : "#777")};
  font-size: 1.2rem;
  font-weight: bold;
  padding: 0.8rem 2rem;
  cursor: pointer;
  border-bottom: ${({ $active }) => ($active ? "3px solid #FFF" : "none")};
  transition: color 0.3s ease, border-bottom 0.3s ease;

  &:hover {
    color: #fff;
  }
`;

// 🔹 Professional Work Data
const professionalProjects = [
  {
    title: "Enterprise Software Modernization",
    company: "The Home Depot",
    impact:
      "Optimized workflows for 10,000+ users, improving load times by 30% and user engagement by 25%.",
    tech: ["React", "Angular", "TypeScript", "Ionic"],
  },
  {
    title: "Public Sector App Modernization",
    company: "Florida Department of Corrections",
    impact:
      "Led front-end team in building a modern Angular app, reducing onboarding time by 85% and delivering the project 100% on time.",
    tech: ["Angular", "TypeScript", "Material UI"],
  },
  {
    title: "iPad App Development",
    company: "Southern California Edison",
    impact:
      "Designed React Native iPad app with offline functionality, reducing report submission delays by 40%.",
    tech: ["React Native", "Node.js", "FeathersJS"],
  },
];

// 🔹 Side Projects Data
const sideProjects = [
  {
    title: "Literally This Website",
    description: "The codebase for my personal portfolio site.",
    tech: ["Next.js", "React", "TypeScript", "Framer Motion"],
    link: "https://github.com/AKolumbic/akolumbic",
  },
  {
    title: "BATMAN: Streets of Gotham",
    description:
      "A 2D Batman Platformer using Phaser 3, TypeScript, and Rollup.",
    tech: ["Phaser 3", "TypeScript", "Rollup"],
    link: "https://github.com/AKolumbic/BATMAN-Streets-of-Gotham",
  },
  {
    title: "Twitchbot",
    description: "A bot for my Twitch channel.",
    tech: ["TypeScript"],
    link: "https://github.com/AKolumbic/twitchbot",
  },
  {
    title: "D&D Stuff",
    description: "D&D-themed React practice.",
    tech: ["React", "TypeScript"],
    link: "https://github.com/AKolumbic/dndStuff",
  },
  {
    title: "Warcraft Stuff",
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
  const [activeTab, setActiveTab] = useState<"professional" | "side">(
    "professional"
  );

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
        {/* 🔹 Tab Navigation */}
        <Tabs>
          <TabButton
            $active={activeTab === "professional"}
            onClick={() => setActiveTab("professional")}
          >
            Professional Work
          </TabButton>
          <TabButton
            $active={activeTab === "side"}
            onClick={() => setActiveTab("side")}
          >
            Side Projects
          </TabButton>
        </Tabs>

        {/* 🔹 Professional Work Section (No Floating Animation) */}
        {activeTab === "professional" && (
          <motion.div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
              gap: "2rem",
              maxWidth: "1100px",
              width: "100%",
            }}
          >
            {professionalProjects.map((project) => (
              <Card key={project.title}>
                <h3>{project.title}</h3>
                <p>
                  <strong>{project.company}</strong>
                </p>
                <p>{project.impact}</p>
                <div>{project.tech.join(" • ")}</div>
              </Card>
            ))}
          </motion.div>
        )}

        {/* 🔹 Side Projects Section (With Floating Animation & Hover Effect) */}
        {activeTab === "side" && (
          <motion.div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
              gap: "2rem",
              maxWidth: "1100px",
              width: "100%",
            }}
          >
            {sideProjects.map((project, i) => (
              <FloatingCard key={project.title} delay={i * 0.2}>
                <h3>{project.title}</h3>
                <p>{project.description}</p>
                <div>{project.tech.join(" • ")}</div>
              </FloatingCard>
            ))}
          </motion.div>
        )}
      </motion.section>
    </AnimatedBackground>
  );
}
