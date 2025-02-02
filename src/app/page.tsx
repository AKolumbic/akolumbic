"use client";
import React, { useEffect } from "react";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import HeroSection from "./sections/HeroSection";
import AboutMe from "./sections/AboutMe";
import Portfolio from "./sections/Portfolio";

// Define AboutMe animation variants
const aboutMeVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 1, ease: "easeOut" },
  },
};

// Define Portfolio animation variants with a slight delay for a smoother transition
const portfolioVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 1, ease: "easeOut", delay: 0.2 },
  },
};

export default function HomePage() {
  // Ensure the page always starts at the top by disabling browser scroll restoration
  useEffect(() => {
    if (typeof window !== "undefined" && window.history.scrollRestoration) {
      window.history.scrollRestoration = "manual";
    }
    window.scrollTo(0, 0);
  }, []);

  // Animation controls and intersection observer for the About Me section
  const aboutMeControls = useAnimation();
  const { ref: aboutMeRef, inView: aboutMeInView } = useInView({
    threshold: 0.35,
    rootMargin: "-10% 0% -10% 0%",
  });

  useEffect(() => {
    aboutMeControls.start(aboutMeInView ? "visible" : "hidden");
  }, [aboutMeInView, aboutMeControls]);

  // Animation controls and intersection observer for the Portfolio section
  const portfolioControls = useAnimation();
  const { ref: portfolioRef, inView: portfolioInView } = useInView({
    threshold: 0.35,
    rootMargin: "-10% 0% -10% 0%",
  });

  useEffect(() => {
    portfolioControls.start(portfolioInView ? "visible" : "hidden");
  }, [portfolioInView, portfolioControls]);

  return (
    <>
      <HeroSection />

      <motion.div
        ref={aboutMeRef}
        initial="hidden"
        animate={aboutMeControls}
        variants={aboutMeVariants}
      >
        <AboutMe />
      </motion.div>

      <motion.div
        ref={portfolioRef}
        initial="hidden"
        animate={portfolioControls}
        variants={portfolioVariants}
      >
        <Portfolio />
      </motion.div>
    </>
  );
}
