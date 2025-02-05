import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  AnimatedBackground,
  FloatingCard,
  Card,
  GridContainer,
  TabButton,
  Tabs,
  SectionContainer,
} from "../styles/Portfolio.styles";
import { professionalProjects, sideProjects } from "../data/projectData";

export default function Portfolio() {
  const [activeTab, setActiveTab] = useState<"professional" | "side">(
    "professional"
  );
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth >= 1024); // Adjust breakpoint if needed
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

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
          padding: "3rem 1.5rem",
          textAlign: "center",
          maxWidth: "1200px",
          margin: "0 auto",
        }}
      >
        {/* 🔹 Desktop: Show Both Sections | Mobile: Tab Navigation */}
        {!isDesktop ? (
          <>
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

            {activeTab === "professional" && (
              <motion.div>
                <GridContainer>
                  {professionalProjects.map((project) => (
                    <Card key={project.title} image={project.image}>
                      <div className="overlay" />
                      <div style={{ position: "relative", zIndex: 1 }}>
                        <h3>{project.title}</h3>
                        <div>{project.tech.join(" • ")}</div>
                      </div>
                    </Card>
                  ))}
                </GridContainer>
              </motion.div>
            )}

            {activeTab === "side" && (
              <motion.div>
                <GridContainer>
                  {sideProjects.map((project) => (
                    <FloatingCard
                      key={project.title}
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      image={project.image}
                    >
                      <h3>{project.title}</h3>
                      <p>{project.description}</p>
                      <div>{project.tech.join(" • ")}</div>
                    </FloatingCard>
                  ))}
                </GridContainer>
              </motion.div>
            )}
          </>
        ) : (
          <>
            {/* 🔹 Desktop Layout: Show Both Sections Stacked */}
            <SectionContainer>
              <h2>Professional Work</h2>
              <GridContainer>
                {professionalProjects.map((project) => (
                  <Card key={project.title} image={project.image}>
                    <div className="overlay" />
                    <div style={{ position: "relative", zIndex: 1 }}>
                      <h3>{project.title}</h3>
                      <div>{project.tech.join(" • ")}</div>
                    </div>
                  </Card>
                ))}
              </GridContainer>
            </SectionContainer>

            <SectionContainer>
              <h2>Side Projects</h2>
              <GridContainer>
                {sideProjects.map((project) => (
                  <FloatingCard
                    key={project.title}
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    image={project.image}
                  >
                    <h3>{project.title}</h3>
                    <p>{project.description}</p>
                    <div>{project.tech.join(" • ")}</div>
                  </FloatingCard>
                ))}
              </GridContainer>
            </SectionContainer>
          </>
        )}
      </motion.section>
    </AnimatedBackground>
  );
}
