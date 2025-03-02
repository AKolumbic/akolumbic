import React from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import styled from "styled-components";

// Types for section names
type SectionName = "hero" | "about" | "portfolio";

interface ScrollProgressProps {
  activeSection: SectionName;
  isVisible: boolean; // New prop to control visibility
}

const ProgressContainer = styled(motion.div)`
  position: fixed;
  right: 20px;
  top: 50%;
  transform: translateY(-50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 15px;
  z-index: 1000;
`;

const ProgressBar = styled(motion.div)`
  width: 4px;
  height: 150px; // Adjusted for 3 indicators
  background: rgba(255, 255, 255, 0.2);
  border-radius: 4px;
  position: absolute;
  right: 4px;
  top: 50%;
  transform: translateY(-50%);
`;

const ProgressFill = styled(motion.div)`
  width: 100%;
  background: rgba(255, 255, 255, 0.8);
  border-radius: 4px;
  position: absolute;
  bottom: 0;
`;

// New wrapper to ensure all indicators are perfectly centered
const IndicatorWrapper = styled.div`
  position: relative;
  width: 14px; /* This is the max width of the indicators */
  height: 14px; /* This is the max height of the indicators */
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Indicator = styled(motion.button)<{ $active: boolean }>`
  width: ${({ $active }) => ($active ? "14px" : "10px")};
  height: ${({ $active }) => ($active ? "14px" : "10px")};
  border-radius: 50%;
  background: ${({ $active }) =>
    $active ? "#fff" : "rgba(255, 255, 255, 0.4)"};
  border: none;
  cursor: pointer;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 2;
  transition: all 0.3s ease;
  padding: 0;
  margin: 0;

  &:hover {
    background: #fff;
  }
`;

// Pulse animation variants
const pulseVariants = {
  active: {
    scale: 1.2,
    boxShadow: [
      "0 0 0 0 rgba(255, 255, 255, 0)",
      "0 0 0 2px rgba(255, 255, 255, 0.4)",
      "0 0 0 4px rgba(255, 255, 255, 0.2)",
      "0 0 0 6px rgba(255, 255, 255, 0)",
    ],
    transition: {
      boxShadow: {
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut",
      },
      scale: {
        duration: 0.3,
      },
    },
  },
  inactive: {
    scale: 1,
    boxShadow: "0 0 0 0 rgba(255, 255, 255, 0)",
    transition: {
      scale: {
        duration: 0.3,
      },
    },
  },
};

const ScrollProgress: React.FC<ScrollProgressProps> = ({
  activeSection,
  isVisible,
}) => {
  const { scrollYProgress } = useScroll();
  const scaleY = useSpring(scrollYProgress, { stiffness: 100, damping: 20 });

  const scrollToSection = (section: SectionName) => {
    // Scroll to the relevant section element
    const element = document.getElementById(`${section}-section`);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    } else if (section === "hero") {
      // For hero, scroll to top
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <ProgressContainer
      initial={{ opacity: 0 }}
      animate={{ opacity: isVisible ? 1 : 0 }}
      transition={{ duration: 0.5 }}
    >
      <ProgressBar>
        <ProgressFill style={{ scaleY, originY: 0 }} />
      </ProgressBar>

      <IndicatorWrapper>
        <Indicator
          $active={activeSection === "hero"}
          onClick={() => scrollToSection("hero")}
          initial={{ scale: 0.8 }}
          animate={activeSection === "hero" ? "active" : "inactive"}
          variants={pulseVariants}
          whileHover={{ scale: 1.3 }}
          whileTap={{ scale: 0.9 }}
        />
      </IndicatorWrapper>

      <IndicatorWrapper>
        <Indicator
          $active={activeSection === "about"}
          onClick={() => scrollToSection("about")}
          initial={{ scale: 0.8 }}
          animate={activeSection === "about" ? "active" : "inactive"}
          variants={pulseVariants}
          whileHover={{ scale: 1.3 }}
          whileTap={{ scale: 0.9 }}
        />
      </IndicatorWrapper>

      <IndicatorWrapper>
        <Indicator
          $active={activeSection === "portfolio"}
          onClick={() => scrollToSection("portfolio")}
          initial={{ scale: 0.8 }}
          animate={activeSection === "portfolio" ? "active" : "inactive"}
          variants={pulseVariants}
          whileHover={{ scale: 1.3 }}
          whileTap={{ scale: 0.9 }}
        />
      </IndicatorWrapper>
    </ProgressContainer>
  );
};

export default ScrollProgress;
