"use client";
import React, { useEffect } from "react";
import { motion, useAnimation, Variants } from "framer-motion";
import { useInView } from "react-intersection-observer";
import {
  HeroSection,
  AboutMe,
  CareerTimeline,
  Portfolio,
  Contact,
} from "./sections";

import { smoothSlideUpVariants } from "./data/variantsData";

export default function HomePage() {
  // Disable scroll restoration and scroll to top on mount
  useEffect(() => {
    if (typeof window !== "undefined" && window.history.scrollRestoration) {
      window.history.scrollRestoration = "manual";
    }
    window.scrollTo(0, 0);
  }, []);

  // Generic Hook for Animations
  const useAnimatedSection = (variants: Variants) => {
    const controls = useAnimation();
    const { ref, inView } = useInView({
      threshold: 0.35,
      rootMargin: "-10% 0% -10% 0%",
    });

    useEffect(() => {
      controls.start(inView ? "visible" : "hidden");
    }, [inView, controls]);

    return { ref, controls, variants };
  };

  const aboutMeAnim = useAnimatedSection(smoothSlideUpVariants);
  const careerAnim = useAnimatedSection(smoothSlideUpVariants);
  const portfolioAnim = useAnimatedSection(smoothSlideUpVariants);

  return (
    <>
      <HeroSection />

      <motion.section
        ref={aboutMeAnim.ref}
        initial="hidden"
        animate={aboutMeAnim.controls}
        variants={aboutMeAnim.variants}
      >
        <AboutMe />
      </motion.section>

      <motion.section
        ref={careerAnim.ref}
        initial="hidden"
        animate={careerAnim.controls}
        variants={careerAnim.variants}
      >
        <CareerTimeline />
      </motion.section>

      <motion.section
        ref={portfolioAnim.ref}
        initial="hidden"
        animate={portfolioAnim.controls}
        variants={portfolioAnim.variants}
      >
        <Portfolio />
      </motion.section>

      <Contact />
    </>
  );
}
