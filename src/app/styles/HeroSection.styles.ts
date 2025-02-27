import styled from "styled-components";
import { motion } from "framer-motion";

export const HeroContainer = styled(motion.section)`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  position: relative;
  overflow: hidden;
  background-color: transparent;
  transform: translateZ(0);
  will-change: transform;

  @media (max-width: 768px) {
    background-color: #000;
  }
`;

export const HeroContentWrapper = styled.div`
  position: relative;
  z-index: 2;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  max-width: 1200px;
  padding: 2rem;
  transform: translateZ(0);
  will-change: transform;
`;

/* Wrapper ensures first and last name can stack on mobile */
export const HeroTextWrapper = styled.div`
  display: flex;
  flex-direction: row;
  gap: 4rem;
  justify-content: center;
  align-items: center;
  text-align: center;
  transform: translateZ(0);
  will-change: transform;
  width: 100%;
  padding: 0 2rem;

  @media (max-width: 600px) {
    flex-direction: column;
    gap: 2rem;
  }
`;

export const FirstName = styled.div`
  font-size: clamp(3rem, 8vw, 6rem);
  line-height: 1.1;
  display: flex;
  justify-content: center;
  font-family: "Franklin Gothic Heavy", "Franklin Gothic", "ITC Franklin Gothic",
    Arial, sans-serif;
  font-weight: 900;
  letter-spacing: -0.03em;
  -webkit-text-stroke: 0.75px white;
`;

export const LastName = styled.div`
  font-size: clamp(3rem, 8vw, 6rem);
  line-height: 1.1;
  display: flex;
  justify-content: center;
  font-family: "Franklin Gothic Heavy", "Franklin Gothic", "ITC Franklin Gothic",
    Arial, sans-serif;
  font-weight: 900;
  letter-spacing: -0.03em;
  -webkit-text-stroke: 0.75px white;
`;

/* Individual letter with gradient animation */
export const GradientLetter = styled(motion.span)`
  display: inline-block;
  color: #ffffff;
  padding: 0;
  margin: 0 -0.01em;
  position: relative;
  z-index: 2;
  will-change: transform;
  transform: translateZ(0);
  letter-spacing: -0.01em;
  font-family: "Franklin Gothic Heavy", "Franklin Gothic", "ITC Franklin Gothic",
    Arial, sans-serif;
  font-weight: 900;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;

  @media (max-width: 768px) {
    letter-spacing: -0.02em;
    margin: 0;
    -webkit-text-stroke: 0.25px white;
  }
`;

/* Letter wrapper to add enhanced effects */
export const LetterWrapper = styled(motion.div)`
  display: inline-block;
  position: relative;
  transform-style: preserve-3d;
  perspective: 1000px;
  will-change: transform;
  transform: translateZ(0);

  @media (max-width: 768px) {
    transform-style: flat;
    perspective: none;
  }
`;

/* Underline (Hidden on Mobile) */
export const Underline = styled(motion.div)`
  width: 80%;
  max-width: 400px;
  height: 2px;
  background: white; // linear-gradient(to right, #ff6b6b, rgba(255, 228, 181, 0.3));
  margin: 1.5rem auto;
  border-radius: 2px;
  transform: translateZ(0);
  will-change: transform;

  @media (max-width: 600px) {
    width: 60%;
    max-width: 300px;
    margin: 1rem auto;
  }
`;

/* Wrapper allows subtext to stack on mobile */
export const SubtextWrapper = styled(motion.div)`
  display: flex;
  flex-direction: row;
  gap: 0.5rem;
  justify-content: center;
  align-items: center;
  text-align: center;
  transform: translateZ(0);
  will-change: transform;

  @media (max-width: 600px) {
    flex-direction: column;
    gap: 0.25rem;
  }
`;

export const SubtextLine = styled(motion.p)`
  font-size: clamp(1rem, 2.5vw, 1.5rem);
  color: #ffffff;
  font-family: "Franklin Gothic Roman", "Franklin Gothic",
    "ITC Franklin Gothic Book", Arial, sans-serif;
  font-weight: 400;
  letter-spacing: 0.04em;
  margin: 0;
  padding: 0;
  will-change: transform;
  transform: translateZ(0);
`;

export const TaglineWrapper = styled(motion.p)`
  font-size: min(3.5vw, 1.1rem);
  font-family: "SF Pro Display", -apple-system, BlinkMacSystemFont, sans-serif;
  color: rgba(255, 255, 255, 0.8);
  text-align: center;
  letter-spacing: 0.5px;
  margin-top: 1.5rem;
  max-width: 600px;
  line-height: 1.6;
  font-weight: 300;
  padding: 0 1rem;
`;
