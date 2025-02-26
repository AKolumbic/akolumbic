"use client";

import React, { useEffect, JSX, useState } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import HeroSection from "./sections/HeroSection";
import AboutMe from "./sections/AboutMe";
import Portfolio from "./sections/Portfolio";
import Contact from "./sections/Contact";
import GradientBackground from "./components/GradientBackground";
import styled from "styled-components";
import useScrollAnimation from "./hooks/useScrollAnimation";
import { smoothSlideUpVariants } from "./data/variantsData";

/**
 * HomePage Component
 *
 * The main landing page of the application. It renders the HeroSection,
 * AboutMe section (animated with a smooth slide up effect), Portfolio (animated
 * with the same effect), and Contact section. Scroll restoration is disabled and
 * the page is scrolled to the top on mount.
 *
 * @returns {JSX.Element} The rendered HomePage component.
 */
export default function HomePage(): JSX.Element {
  // State to check if the screen is mobile-sized
  const [isMobile, setIsMobile] = useState(false);
  const [activeSection, setActiveSection] = useState<
    "hero" | "about" | "portfolio" | "contact"
  >("hero");
  const [theme, setTheme] = useState<"main" | "beach" | "sunset">("main");

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth <= 768); // Adjust breakpoint if needed
    };

    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);

    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  // fixes error caused by Grammarly during development.
  useEffect(() => {
    const body = document.body;
    if (body.hasAttribute("data-new-gr-c-s-check-loaded")) {
      body.removeAttribute("data-new-gr-c-s-check-loaded");
    }
    if (body.hasAttribute("data-gr-ext-installed")) {
      body.removeAttribute("data-gr-ext-installed");
    }
  }, []);

  // Disable browser scroll restoration and scroll to top when the component mounts.
  useEffect(() => {
    if (typeof window !== "undefined" && window.history.scrollRestoration) {
      window.history.scrollRestoration = "manual";
    }
    window.scrollTo(0, 0);
  }, []);

  // Use custom hook to animate the AboutMe and Portfolio sections.
  const aboutMeAnim = useScrollAnimation();
  const portfolioAnim = useScrollAnimation();

  // Setup intersection observers for each section
  const { ref: heroRef, inView: heroInView } = useInView({ threshold: 0.5 });
  const { ref: aboutRef, inView: aboutInView } = useInView({ threshold: 0.5 });
  const { ref: portfolioRef, inView: portfolioInView } = useInView({
    threshold: 0.5,
  });
  const { ref: contactRef, inView: contactInView } = useInView({
    threshold: 0.5,
  });

  // Update active section based on which section is most in view
  useEffect(() => {
    if (heroInView) setActiveSection("hero");
    else if (aboutInView) setActiveSection("about");
    else if (portfolioInView) setActiveSection("portfolio");
    else if (contactInView) setActiveSection("contact");
  }, [heroInView, aboutInView, portfolioInView, contactInView]);

  // Theme selection component
  const ThemeSelector = styled.div`
    position: fixed;
    top: 20px;
    right: 20px;
    z-index: 1000;
    display: flex;
    gap: 10px;
    background: rgba(0, 0, 0, 0.6);
    backdrop-filter: blur(10px);
    padding: 10px;
    border-radius: 8px;
    border: 1px solid rgba(255, 255, 255, 0.1);
  `;

  const ThemeButton = styled.button<{ $active: boolean }>`
    background: ${(props) =>
      props.$active ? "rgba(255, 255, 255, 0.2)" : "rgba(255, 255, 255, 0.1)"};
    color: white;
    border: none;
    padding: 8px 12px;
    border-radius: 6px;
    cursor: pointer;
    font-family: "SF Pro Display", -apple-system, BlinkMacSystemFont, sans-serif;
    font-size: 14px;
    transition: all 0.3s ease;

    &:hover {
      background: rgba(255, 255, 255, 0.25);
    }
  `;

  return (
    <>
      <GradientBackground activeSection={activeSection} theme={theme} />

      <ThemeSelector>
        <ThemeButton
          $active={theme === "main"}
          onClick={() => setTheme("main")}
        >
          Main
        </ThemeButton>
        <ThemeButton
          $active={theme === "beach"}
          onClick={() => setTheme("beach")}
        >
          Beach
        </ThemeButton>
        <ThemeButton
          $active={theme === "sunset"}
          onClick={() => setTheme("sunset")}
        >
          Sunset
        </ThemeButton>
      </ThemeSelector>

      <div ref={heroRef}>
        <HeroSection />
      </div>

      {/* Conditionally render AboutMe on larger screens */}
      {!isMobile && (
        <motion.section
          ref={(node) => {
            aboutMeAnim.ref(node);
            aboutRef(node);
          }}
          initial="hidden"
          animate={aboutMeAnim.controls}
          variants={smoothSlideUpVariants}
        >
          <AboutMe />
        </motion.section>
      )}

      {/* Conditionally render Portfolio on larger screens */}
      {!isMobile && (
        <motion.section
          ref={(node) => {
            portfolioAnim.ref(node);
            portfolioRef(node);
          }}
          initial="hidden"
          animate={portfolioAnim.controls}
          variants={smoothSlideUpVariants}
        >
          <Portfolio />
        </motion.section>
      )}

      <div ref={contactRef}>
        <Contact />
      </div>
    </>
  );
}
