"use client";

import React, { useEffect } from "react";
import { motion, useAnimation } from "framer-motion";
import HeroSection from "../sections/HeroSection";
import Contact from "../sections/Contact";
import { ThemeType } from "../types/theme.types";
import SafeGradientBackground from "./SafeGradientBackground";
import ThemeSelector from "./ThemeSelector";
import styled from "styled-components";

// Styled components for mobile layout
const MobileContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh; /* Use min-height instead of fixed height */
  width: 100%;
  overflow: hidden;
  background: #000;
  position: relative; /* For absolute positioning of ThemeSelector */
  /* Add padding at the bottom for safe area */
  padding-bottom: env(safe-area-inset-bottom, 1rem);
`;

const HeroContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  /* Blend with the contact section */
  background-color: transparent;
  padding-bottom: 20px; /* Add some space before the footer */
  /* Ensure we don't take up too much space */
  max-height: 85vh;
`;

const ContactContainer = styled.div`
  width: 100%;
  /* Ensure no border or line at the top */
  border-top: none;
  /* Minimum height to ensure visibility */
  min-height: 120px;
  /* Add margins for extra safety */
  margin-bottom: env(safe-area-inset-bottom, 1rem);
  /* Ensure we don't overflow */
  overflow: visible;
  position: fixed;
  bottom: 0;
`;

// Mobile positioned theme selector
const MobileThemeSelector = styled.div`
  position: absolute;
  top: 1rem;
  right: 1rem;
  z-index: 50;
  pointer-events: auto; /* Ensure clicks register */
`;

const mobileVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.5,
      ease: "easeOut",
    },
  },
};

interface MobileViewProps {
  theme: ThemeType;
}

export default function MobileView({ theme: initialTheme }: MobileViewProps) {
  const heroControls = useAnimation();
  const contactControls = useAnimation();
  const [theme, setTheme] = React.useState<ThemeType>(initialTheme);

  // Start animations on component mount
  useEffect(() => {
    heroControls.start("visible");
    contactControls.start("visible");
  }, [heroControls, contactControls]);

  return (
    <MobileContainer className="mobile-view">
      <SafeGradientBackground activeSection="hero" theme={theme} />

      <MobileThemeSelector>
        <ThemeSelector currentTheme={theme} onThemeChange={setTheme} />
      </MobileThemeSelector>

      <HeroContainer>
        <motion.div
          initial="hidden"
          animate={heroControls}
          variants={mobileVariants}
          style={{ width: "100%" }}
        >
          <HeroSection />
        </motion.div>
      </HeroContainer>

      <ContactContainer>
        <motion.div
          initial="hidden"
          animate={contactControls}
          variants={mobileVariants}
        >
          <Contact />
        </motion.div>
      </ContactContainer>
    </MobileContainer>
  );
}
