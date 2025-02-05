"use client";

/**
 * Portfolio Component
 *
 * Renders the portfolio section of the website, displaying professional and side projects.
 * The layout adapts based on the screen width:
 * - Mobile View: Displays tabs to toggle between Professional Work and Side Projects.
 * - Desktop View: Displays Professional Work and Side Projects in separate sections.
 *
 * The component uses Framer Motion for a simple fade-in animation and adjusts its layout based
 * on the window width.
 *
 * @returns {JSX.Element} The rendered Portfolio component.
 */
import React, { useState, useEffect, JSX } from "react";
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

export default function Portfolio(): JSX.Element {
  // State to determine if the current view is desktop (width >= 1024px)
  const [isDesktop, setIsDesktop] = useState<boolean | null>(null);
  // State for the active tab in mobile view: either "professional" or "side"
  const [activeTab, setActiveTab] = useState<"professional" | "side">(
    "professional"
  );

  /**
   * handleResize sets the isDesktop state based on the current window width.
   */
  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth >= 1024);
    };

    handleResize(); // Immediately check on mount.
    window.addEventListener("resize", handleResize);
    // Cleanup event listener on unmount.
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Prevent rendering until we have determined the screen size.
  if (isDesktop === null) return <div>Loading...</div>;

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
        {/* Mobile View: Render Tabs to toggle between Professional Work and Side Projects */}
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

            {/* Render Professional Projects */}
            {activeTab === "professional" && (
              <motion.div>
                <GridContainer>
                  {professionalProjects.map((project) => (
                    <Card key={project.title} image={project.image}>
                      {/* Overlay for visual effect */}
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

            {/* Render Side Projects */}
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
          // Desktop View: Render Professional Work and Side Projects in separate sections.
          <>
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
