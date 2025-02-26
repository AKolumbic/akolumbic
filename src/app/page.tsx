"use client";

import React, { useEffect, JSX, useState } from "react";
import { motion, useAnimation, Variants } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { HeroSection, AboutMe, Portfolio, Contact } from "./sections";
import { smoothSlideUpVariants } from "./data/variantsData";
import GradientBackground from "./components/GradientBackground";

type Section = "hero" | "about" | "portfolio" | "contact";

/**
 * Custom hook that returns animation controls and a ref for an element.
 * The animation will start when the element comes into view.
 *
 * @param {Variants} variants - The Framer Motion variants to use for the animation.
 * @returns {{
 *   ref: (element: HTMLElement | null) => void,
 *   controls: ReturnType<typeof useAnimation>,
 *   variants: Variants
 * }}
 */
function useAnimatedSection(variants: Variants) {
  const controls = useAnimation();
  const { ref, inView } = useInView({
    threshold: 0.35,
    rootMargin: "-10% 0% -10% 0%",
  });

  useEffect(() => {
    // Start the animation when the element is in view; hide it otherwise.
    controls.start(inView ? "visible" : "hidden");
  }, [inView, controls]);

  return { ref, controls, variants };
}

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
  const [activeSection, setActiveSection] = useState<Section>("hero");

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
  const aboutMeAnim = useAnimatedSection(smoothSlideUpVariants);
  const portfolioAnim = useAnimatedSection(smoothSlideUpVariants);

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

  return (
    <>
      <GradientBackground activeSection={activeSection} />

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
          variants={aboutMeAnim.variants}
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
          variants={portfolioAnim.variants}
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
