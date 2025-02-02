import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  AnimatedBackground,
  FloatingCard,
  Card,
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

        {/* 🔹 Professional Work Section with Background Images */}
        {activeTab === "professional" && (
          <motion.div>
            <GridContainer>
              {professionalProjects.map((project) => (
                <Card
                  key={project.title}
                  image={project.image}
                  style={{
                    backgroundImage: `url(${project.image})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    position: "relative",
                  }}
                >
                  {/* Overlay for better text readability */}
                  <div
                    style={{
                      position: "absolute",
                      top: 0,
                      left: 0,
                      width: "100%",
                      height: "100%",
                      backgroundColor: "rgba(0, 0, 0, 0.6)",
                      borderRadius: "inherit",
                    }}
                  />
                  <div style={{ position: "relative", zIndex: 1 }}>
                    <h3>{project.title}</h3>
                    <div>{project.tech.join(" • ")}</div>
                  </div>
                </Card>
              ))}
            </GridContainer>
          </motion.div>
        )}

        {/* 🔹 Side Projects Section with Floating Animation */}
        {activeTab === "side" && (
          <motion.div>
            <GridContainer>
              {sideProjects.map((project) => (
                <FloatingCard
                  key={project.title}
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    transition: "transform 0.3s ease-in-out",
                    backgroundImage: `url(${project.image})`,
                    backgroundSize: "cover", // Ensures the image fully covers the card
                    backgroundPosition: "center", // Centers the background image
                    backgroundRepeat: "no-repeat", // Prevents image tiling
                  }}
                  whileHover={{
                    transform: "scale(1.05)",
                    boxShadow: "0px 5px 15px rgba(255, 255, 255, 0.3)",
                  }}
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
