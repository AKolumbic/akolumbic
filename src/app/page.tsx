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
import SafeGradientBackground from "./components/SafeGradientBackground";
import ThemeSelector from "./components/ThemeSelector";
import ScrollProgress from "./components/ScrollProgress";
import useDelayedIntersectionObserver from "./hooks/useDelayedIntersectionObserver";
import useMediaQuery from "./hooks/useMediaQuery";
import MobileView from "./components/MobileView";
import { ThemeProvider } from "./contexts/ThemeContext";
import ResumeDownloadFAB from "./components/ResumeDownloadFAB";

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
  // Use matchMedia-based hook instead of manual resize listener + debounce.
  // matchMedia only fires when the query result changes, not on every pixel.
  const isMobile = useMediaQuery("(max-width: 768px)");
  const [activeSection, setActiveSection] = useState<
    "hero" | "about" | "portfolio"
  >("hero");

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

  // Lightweight scroll listener: only tracks whether the user has ever scrolled.
  // Removes itself after the first scroll event to avoid ongoing work.
  useEffect(() => {
    if (hasScrolled) return;

    const handleScroll = () => {
      setHasScrolled(true);
    };

    window.addEventListener("scroll", handleScroll, { passive: true, once: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [hasScrolled]);

  // Resize handling is now done by useMediaQuery hook above.
  // It uses matchMedia which is event-driven and more efficient.

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

    // On mobile, prevent scroll completely
    if (isMobile && typeof document !== "undefined") {
      document.body.style.overflow = "hidden";
    } else if (typeof document !== "undefined") {
      document.body.style.overflow = "";
    }

    return () => {
      if (typeof document !== "undefined") {
        document.body.style.overflow = "";
      }
    };
  }, [isMobile]);

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

  // Per-section animation effects: each section only triggers its own
  // animation control when its visibility changes, preventing unnecessary
  // re-evaluation of unrelated sections during scroll.
  useEffect(() => {
    if (heroInView) {
      heroControls.start("visible");
      setActiveSection("hero");
    } else {
      heroControls.start("exit");
    }
  }, [heroInView, heroControls]);

  useEffect(() => {
    if (aboutInView) {
      aboutControls.start("visible");
      setActiveSection("about");
    } else {
      aboutControls.start("hidden");
    }
  }, [aboutInView, aboutControls]);

  useEffect(() => {
    if (portfolioInView) {
      portfolioControls.start("visible");
      setActiveSection("portfolio");
    } else {
      portfolioControls.start("hidden");
    }
  }, [portfolioInView, portfolioControls]);

  useEffect(() => {
    if (contactInView) {
      contactControls.start("visible");
      // Keep active section as portfolio for the contact section
      // to ensure the background animation continues properly
      setActiveSection("portfolio");
    } else {
      contactControls.start("hidden");
    }
  }, [contactInView, contactControls]);

  // If on mobile, render the dedicated MobileView component
  if (isMobile) {
    return (
      <ThemeProvider>
        <MobileView />
      </ThemeProvider>
    );
  }

  // Otherwise render the desktop layout
  return (
    <ThemeProvider>
      <main className="main">
        <SafeGradientBackground activeSection={activeSection} />
        <ThemeSelector />
        <ResumeDownloadFAB />

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
      </main>
    </ThemeProvider>
  );
}
