"use client";
import React, { useEffect } from "react";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import HeroSection from "./sections/HeroSection";
import AboutMe from "./sections/AboutMe";
import CareerTimeline from "./sections/CareerTimeline"; // ✅ Import CareerTimeline
import Portfolio from "./sections/Portfolio";
import Contact from "./sections/Contact";

// Define animation variants
const fadeInVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 1, ease: "easeOut" },
  },
};

export default function HomePage() {
  useEffect(() => {
    if (typeof window !== "undefined" && window.history.scrollRestoration) {
      window.history.scrollRestoration = "manual";
    }
    window.scrollTo(0, 0);
  }, []);

  // Animation hooks for each section
  const aboutMeControls = useAnimation();
  const { ref: aboutMeRef, inView: aboutMeInView } = useInView({
    threshold: 0.35,
    rootMargin: "-10% 0% -10% 0%",
  });

  useEffect(() => {
    aboutMeControls.start(aboutMeInView ? "visible" : "hidden");
  }, [aboutMeInView, aboutMeControls]);

  const careerControls = useAnimation();
  const { ref: careerRef, inView: careerInView } = useInView({
    threshold: 0.35,
    rootMargin: "-10% 0% -10% 0%",
  });

  useEffect(() => {
    careerControls.start(careerInView ? "visible" : "hidden");
  }, [careerInView, careerControls]);

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
        variants={fadeInVariants}
      >
        <AboutMe />
      </motion.div>

      <motion.div
        ref={careerRef}
        initial="hidden"
        animate={careerControls}
        variants={fadeInVariants}
      >
        <CareerTimeline />
      </motion.div>

      <motion.div
        ref={portfolioRef}
        initial="hidden"
        animate={portfolioControls}
        variants={fadeInVariants}
      >
        <Portfolio />
      </motion.div>

      <Contact />
    </>
  );
}
