"use client";

import React, { useEffect, JSX, useState } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import HeroSection from "./sections/HeroSection";
import AboutMe from "./sections/AboutMe";
import Portfolio from "./sections/Portfolio";
import Contact from "./sections/Contact";
import GradientBackground from "./components/GradientBackground";
import useScrollAnimation from "./hooks/useScrollAnimation";
import { smoothSlideUpVariants } from "./data/variantsData";
import ThemeSelector from "./components/ThemeSelector";
import { ThemeType } from "./types/theme.types";

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
  const [theme, setTheme] = useState<ThemeType>("main");

  // Debounced scroll handler
  useEffect(() => {
    let timeoutId: NodeJS.Timeout;
    const handleScroll = () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
      timeoutId = setTimeout(() => {
        const scrollPosition = window.scrollY;
        if (scrollPosition < window.innerHeight * 0.5) {
          setActiveSection("hero");
        }
      }, 100); // 100ms debounce
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, []);

  // Optimized resize handler
  useEffect(() => {
    let timeoutId: NodeJS.Timeout;
    const handleResize = () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
      timeoutId = setTimeout(() => {
        setIsMobile(window.innerWidth <= 768);
      }, 100); // 100ms debounce
    };

    handleResize();
    window.addEventListener("resize", handleResize, { passive: true });
    return () => {
      window.removeEventListener("resize", handleResize);
      if (timeoutId) clearTimeout(timeoutId);
    };
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

  // Setup intersection observers with reduced sensitivity
  const { ref: heroRef, inView: heroInView } = useInView({
    threshold: 0.1,
    triggerOnce: false,
  });
  const { ref: aboutRef, inView: aboutInView } = useInView({
    threshold: 0.3,
    triggerOnce: false,
  });
  const { ref: portfolioRef, inView: portfolioInView } = useInView({
    threshold: 0.3,
    triggerOnce: false,
  });
  const { ref: contactRef, inView: contactInView } = useInView({
    threshold: 0.3,
    triggerOnce: false,
  });

  // Update active section based on visibility
  useEffect(() => {
    if (heroInView) {
      setActiveSection("hero");
    } else if (aboutInView) {
      setActiveSection("about");
    } else if (portfolioInView) {
      setActiveSection("portfolio");
    } else if (contactInView) {
      setActiveSection("contact");
    }
  }, [heroInView, aboutInView, portfolioInView, contactInView]);

  // Use custom hook to animate the AboutMe and Portfolio sections.
  const aboutMeAnim = useScrollAnimation();
  const portfolioAnim = useScrollAnimation();

  return (
    <>
      <GradientBackground activeSection={activeSection} theme={theme} />
      {!isMobile && (
        <ThemeSelector currentTheme={theme} onThemeChange={setTheme} />
      )}

      <motion.div
        ref={heroRef}
        initial={false}
        style={{ willChange: "transform, opacity" }}
      >
        <HeroSection />
      </motion.div>

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
          style={{ willChange: "transform, opacity" }}
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
          style={{ willChange: "transform, opacity" }}
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
