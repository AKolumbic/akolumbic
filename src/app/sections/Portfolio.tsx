"use client";

import React, { useState, JSX } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FloatingCard,
  Card,
  GridContainer,
  TabButton,
  Tabs,
  SectionContainer,
  SectionTitle,
} from "../styles/Portfolio.styles";
import { professionalProjects, sideProjects } from "../data/projectData";
import {
  containerVariants,
  cardVariants,
  titleVariants,
} from "../data/variantsData";
import useMediaQuery from "../hooks/useMediaQuery";

/**
 * Portfolio Component
 *
 * Renders the portfolio section of the website, displaying professional and side projects.
 * The layout adapts based on the screen width:
 * - Mobile View: Displays tabs to toggle between Professional Work and Side Projects.
 * - Desktop View: Displays Professional Work and Side Projects in separate sections.
 *
 * The component uses Framer Motion for animations and adjusts its layout based
 * on the window width.
 *
 * @returns {JSX.Element} The rendered Portfolio component.
 */
export default function Portfolio(): JSX.Element {
  // Shared media query hook replaces manual resize listener
  const isDesktop = useMediaQuery("(min-width: 1024px)");
  // State for the active tab in mobile view: either "professional" or "side"
  const [activeTab, setActiveTab] = useState<"professional" | "side">(
    "professional"
  );

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      style={{
        alignItems: "center",
        color: "#FFF",
        display: "flex",
        flexDirection: "column",
        padding: "5rem 1.5rem",
        textAlign: "center",
        maxWidth: "1200px",
        margin: "0 auto",
        position: "relative",
        zIndex: 1,
        background: "transparent",
      }}
    >
      {/* Mobile View: Render Tabs to toggle between Professional Work and Side Projects */}
      {!isDesktop ? (
        <>
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
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
          </motion.div>

          <AnimatePresence mode="wait">
            {/* Render Professional Projects */}
            {activeTab === "professional" && (
              <motion.div
                key="professional"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
              >
                <GridContainer>
                  {professionalProjects.map((project, index) => (
                    <Card
                      key={project.title}
                      image={project.image}
                      variants={cardVariants}
                      whileHover="hover"
                      custom={index}
                    >
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
              <motion.div
                key="side"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
              >
                <GridContainer>
                  {sideProjects.map((project, index) => (
                    <FloatingCard
                      key={project.title}
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      image={project.image}
                      variants={cardVariants}
                      whileHover="hover"
                      custom={index}
                    >
                      <div className="overlay" />
                      <div style={{ position: "relative", zIndex: 1 }}>
                        <h3>{project.title}</h3>
                        <p>{project.description}</p>
                        <div>{project.tech.join(" • ")}</div>
                      </div>
                    </FloatingCard>
                  ))}
                </GridContainer>
              </motion.div>
            )}
          </AnimatePresence>
        </>
      ) : (
        // Desktop View: Render Professional Work and Side Projects in separate sections.
        <>
          <SectionContainer
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <SectionTitle
              variants={titleVariants}
              initial="hidden"
              animate="visible"
            >
              Professional Work
            </SectionTitle>
            <GridContainer
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              {professionalProjects.map((project, index) => (
                <Card
                  key={project.title}
                  image={project.image}
                  variants={cardVariants}
                  whileHover="hover"
                  custom={index}
                >
                  <div className="overlay" />
                  <div style={{ position: "relative", zIndex: 1 }}>
                    <h3>{project.title}</h3>
                    <div>{project.tech.join(" • ")}</div>
                  </div>
                </Card>
              ))}
            </GridContainer>
          </SectionContainer>

          <SectionContainer
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <SectionTitle
              variants={titleVariants}
              initial="hidden"
              animate="visible"
            >
              Side Projects
            </SectionTitle>
            <GridContainer
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              {sideProjects.map((project, index) => (
                <FloatingCard
                  key={project.title}
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  image={project.image}
                  variants={cardVariants}
                  whileHover="hover"
                  custom={index}
                >
                  <div className="overlay" />
                  <div style={{ position: "relative", zIndex: 1 }}>
                    <h3>{project.title}</h3>
                    <p>{project.description}</p>
                    <div>{project.tech.join(" • ")}</div>
                  </div>
                </FloatingCard>
              ))}
            </GridContainer>
          </SectionContainer>
        </>
      )}
    </motion.section>
  );
}
