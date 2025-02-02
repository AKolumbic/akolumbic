// src/app/sections/Portfolio.tsx

import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  AnimatedBackground,
  Card,
  FloatingCard,
  GridContainer,
  TabButton,
  Tabs,
} from "../styles/Portfolio.styles";
import { professionalProjects, sideProjects } from "../data/projectData";

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
          <motion.div>
            <GridContainer>
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
            </GridContainer>
          </motion.div>
        )}

        {/* 🔹 Side Projects Section (Now Clickable) */}
        {activeTab === "side" && (
          <motion.div>
            <GridContainer>
              {sideProjects.map((project, i) => (
                <FloatingCard
                  key={project.title}
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  delay={i * 0.2}
                >
                  <h3>{project.title}</h3>
                  <p>{project.description}</p>
                  <div>{project.tech.join(" • ")}</div>
                </FloatingCard>
              ))}
            </GridContainer>
          </motion.div>
        )}
      </motion.section>
    </AnimatedBackground>
  );
}
