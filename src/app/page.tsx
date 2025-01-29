"use client";
import React, { useEffect } from "react";
import HeroSection from "./sections/HeroSection";
import AboutMe from "./sections/AboutMe";
// import HorizontalCarousel from "./sections/HorizontalCarousel";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";

export default function HomePage() {
  // Scroll to the top on page load
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Controls for AboutMe animation
  const aboutMeControls = useAnimation();
  const { ref: aboutMeRef, inView: aboutMeInView } = useInView({
    threshold: 0.3, // Triggers when 30% of section is visible
    rootMargin: "-10% 0% -10% 0%", // Trigger a little before it's fully in view
  });

  useEffect(() => {
    if (aboutMeInView) {
      aboutMeControls.start("visible");
    } else {
      aboutMeControls.start("hidden"); // Reset animation when scrolling back up
    }
  }, [aboutMeInView, aboutMeControls]);

  return (
    <>
      {/* Hero fills the first viewport */}
      <HeroSection />

      {/* Standard vertical scrolling reveals “About Me” in both directions */}
      <motion.div
        ref={aboutMeRef}
        initial="hidden"
        animate={aboutMeControls}
        variants={{
          hidden: { opacity: 0, y: 50 },
          visible: { opacity: 1, y: 0, transition: { duration: 1 } },
        }}
      >
        <AboutMe />
      </motion.div>

      {/* Horizontal scrolling “carousel” style section */}
      {/* <HorizontalCarousel /> */}
    </>
  );
}
