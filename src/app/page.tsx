"use client";

import React, { useEffect, JSX, useState } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useAnimation,
} from "framer-motion";
import { useInView } from "react-intersection-observer";
import HeroSection from "./sections/HeroSection";
import AboutMe from "./sections/AboutMe";
import Portfolio from "./sections/Portfolio";
import Contact from "./sections/Contact";
import GradientBackground from "./components/GradientBackground";
import ThemeSelector from "./components/ThemeSelector";
import { ThemeType } from "./types/theme.types";
import ScrollProgress from "./components/ScrollProgress";
import useDelayedIntersectionObserver from "./hooks/useDelayedIntersectionObserver";

// Enhanced animation variants for smoother transitions
const sectionVariants = {
  hidden: {
    opacity: 0,
    y: 100,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.22, 1, 0.36, 1], // Custom cubic bezier for smooth easing
      staggerChildren: 0.2,
    },
  },
  exit: {
    opacity: 0,
    y: -50,
    transition: {
      duration: 0.5,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

/**
 * HomePage Component
 *
 * The main landing page of the application with enhanced transitions between sections
 * and a scroll indicator that appears if the user hasn't scrolled after a delay.
 *
 * @returns {JSX.Element} The rendered HomePage component.
 */
export default function HomePage(): JSX.Element {
  // State to check if the screen is mobile-sized
  const [isMobile, setIsMobile] = useState(false);
  const [activeSection, setActiveSection] = useState<
    "hero" | "about" | "portfolio"
  >("hero");
  const [theme, setTheme] = useState<ThemeType>("main");

  // New state for tracking if user has scrolled
  const [hasScrolled, setHasScrolled] = useState(false);

  // New state to track if hero animations are complete
  const [showNavigation, setShowNavigation] = useState(false);

  // Calculate when to show the navigation based on hero animations
  useEffect(() => {
    // Get total hero animation time
    const firstName = "ANDREW";
    const lastName = "KOLUMBIC";
    const totalNameLength = firstName.length + lastName.length;
    const lastLetterDelay = (totalNameLength - 1) * 0.2;
    const nameAnimationComplete = lastLetterDelay + 1.25;

    // Add delay for the underline and subtext animations
    const totalAnimationTime = nameAnimationComplete + 0.65 + 0.4 + 0.2;

    // Set a timeout to show navigation after animations complete
    const timer = setTimeout(() => {
      setShowNavigation(true);
    }, totalAnimationTime * 1000); // Convert to milliseconds

    return () => clearTimeout(timer);
  }, []);

  // Scroll progress for parallax effects
  const { scrollY } = useScroll();
  const smoothScrollY = useSpring(scrollY, {
    mass: 0.1,
    stiffness: 100,
    damping: 20,
  });

  // Motion values for enhanced parallax effects
  const heroParallax = useTransform(smoothScrollY, [0, 500], [0, -150]);
  const heroOpacity = useTransform(smoothScrollY, [0, 300], [1, 0.3]);
  const aboutParallax = useTransform(smoothScrollY, [300, 1000], [100, 0]);
  const portfolioParallax = useTransform(smoothScrollY, [800, 1500], [100, 0]);
  const contactParallax = useTransform(smoothScrollY, [1300, 2000], [100, 0]);

  // Animation controls for each section
  const heroControls = useAnimation();
  const aboutControls = useAnimation();
  const portfolioControls = useAnimation();
  const contactControls = useAnimation();

  // Debounced scroll handler with enhanced tracking
  useEffect(() => {
    let timeoutId: NodeJS.Timeout;
    const handleScroll = () => {
      // Mark that user has scrolled
      if (!hasScrolled) {
        setHasScrolled(true);
      }

      if (timeoutId) {
        clearTimeout(timeoutId);
      }
      timeoutId = setTimeout(() => {
        // Logic to determine active section based on scroll position
        // is now handled by the intersection observers below
      }, 100); // 100ms debounce
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [hasScrolled]);

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

  // Enhanced intersection observers with improved settings
  const { ref: heroRef, inView: heroInView } = useInView({
    threshold: 0.3,
    triggerOnce: false,
  });

  // Use delayed intersection observer for other sections
  const { ref: aboutRef, inView: aboutInView } =
    useDelayedIntersectionObserver<HTMLDivElement>({
      threshold: 0.3,
      triggerOnce: false,
      delay: 100, // Small delay for smoother transition
    });

  const { ref: portfolioRef, inView: portfolioInView } =
    useDelayedIntersectionObserver<HTMLDivElement>({
      threshold: 0.3,
      triggerOnce: false,
      delay: 100,
    });

  const { ref: contactRef, inView: contactInView } =
    useDelayedIntersectionObserver<HTMLDivElement>({
      threshold: 0.3,
      triggerOnce: false,
      delay: 100,
    });

  // Update section animations based on visibility
  useEffect(() => {
    if (heroInView) {
      heroControls.start("visible");
      setActiveSection("hero");
    } else {
      heroControls.start("exit");
    }

    if (aboutInView) {
      aboutControls.start("visible");
      setActiveSection("about");
    } else {
      aboutControls.start("hidden");
    }

    if (portfolioInView) {
      portfolioControls.start("visible");
      setActiveSection("portfolio");
    } else {
      portfolioControls.start("hidden");
    }

    if (contactInView) {
      contactControls.start("visible");
      // Still update active section to portfolio for the contact section
      // This ensures the background animation continues properly
      setActiveSection("portfolio");
    } else {
      contactControls.start("hidden");
    }
  }, [
    heroInView,
    aboutInView,
    portfolioInView,
    contactInView,
    heroControls,
    aboutControls,
    portfolioControls,
    contactControls,
  ]);

  return (
    <>
      <GradientBackground activeSection={activeSection} theme={theme} />
      {!isMobile && (
        <ThemeSelector currentTheme={theme} onThemeChange={setTheme} />
      )}

      <ScrollProgress
        activeSection={activeSection}
        isVisible={showNavigation}
      />

      <motion.div
        id="hero-section"
        key="hero-section"
        ref={heroRef}
        initial="hidden"
        animate={heroControls}
        variants={sectionVariants}
        style={{
          y: heroParallax,
          opacity: heroOpacity,
        }}
      >
        <HeroSection />
      </motion.div>

      <motion.div
        id="about-section"
        key="about-section"
        ref={aboutRef}
        initial="hidden"
        animate={aboutControls}
        variants={sectionVariants}
        style={{ y: aboutParallax }}
      >
        <AboutMe />
      </motion.div>

      <motion.div
        id="portfolio-section"
        key="portfolio-section"
        ref={portfolioRef}
        initial="hidden"
        animate={portfolioControls}
        variants={sectionVariants}
        style={{ y: portfolioParallax }}
      >
        <Portfolio />
      </motion.div>

      <motion.div
        id="contact-section"
        key="contact-section"
        ref={contactRef}
        initial="hidden"
        animate={contactControls}
        variants={sectionVariants}
        style={{ y: contactParallax }}
      >
        <Contact />
      </motion.div>
    </>
  );
}
