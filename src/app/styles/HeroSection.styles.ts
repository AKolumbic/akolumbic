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
  gap: 1.5rem;
  justify-content: center;
  align-items: center;
  text-align: center;
  transform: translateZ(0);
  will-change: transform;

  @media (max-width: 600px) {
    flex-direction: column;
    gap: 0.5rem;
  }
`;

export const FirstName = styled.div`
  font-size: clamp(3rem, 8vw, 6rem);
  line-height: 1.1;
  margin-bottom: 0.5rem;
  display: flex;
  justify-content: center;
  font-family: "Playfair Display", serif;
  font-weight: 700;
`;

export const LastName = styled.div`
  font-size: clamp(3rem, 8vw, 6rem);
  line-height: 1.1;
  display: flex;
  justify-content: center;
  font-family: "Playfair Display", serif;
  font-weight: 700;
`;

/* Individual letter with gradient animation */
export const GradientLetter = styled(motion.span)`
  display: inline-block;
  color: #ffffff;
  padding: 0 1px;
  text-shadow: 0 0 10px rgba(255, 236, 179, 0.4),
    0 0 20px rgba(255, 236, 179, 0.2);
  position: relative;
  z-index: 2;
  will-change: transform;
  transform: translateZ(0);
  letter-spacing: 0.025em;
  font-family: "Playfair Display", serif;
  font-weight: 700;

  @media (max-width: 768px) {
    letter-spacing: 0;
  }
`;

/* Letter wrapper to add enhanced effects */
export const LetterWrapper = styled(motion.div)`
  display: inline-block;
  position: relative;
  filter: drop-shadow(0 3px 4px rgba(0, 0, 0, 0.5));
  transform-style: preserve-3d;
  perspective: 1000px;
  will-change: transform;
  transform: translateZ(0);

  @media (min-width: 769px) {
    &::before {
      content: "";
      position: absolute;
      inset: -2px;
      z-index: -1;
      opacity: 0.12;
      background: radial-gradient(
        circle at center,
        rgba(255, 107, 107, 0.8),
        rgba(255, 107, 107, 0.05) 70%,
        transparent 100%
      );
      filter: blur(2px);
    }

    &::after {
      content: "";
      position: absolute;
      inset: -1px;
      border-radius: 2px;
      z-index: -1;
      opacity: 0;
      background: radial-gradient(
        circle at center,
        rgba(255, 107, 107, 0.5),
        transparent 70%
      );
      transition: opacity 0.3s ease;
    }

    &:hover::after {
      opacity: 0.6;
    }

    &:hover::before {
      opacity: 0.25;
      filter: blur(3px);
      transition: all 0.3s ease;
    }
  }

  @media (max-width: 768px) {
    filter: drop-shadow(0 2px 2px rgba(0, 0, 0, 0.4));
    transform-style: flat;
    perspective: none;
  }
`;

/* Underline (Hidden on Mobile) */
export const Underline = styled(motion.div)`
  width: 80%;
  max-width: 400px;
  height: 2px;
  background: linear-gradient(to right, #ff6b6b, rgba(255, 228, 181, 0.3));
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
export const SubtextWrapper = styled.div`
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
  text-shadow: 0 0 10px rgba(255, 236, 179, 0.3);
  font-family: "SF Pro Display", -apple-system, BlinkMacSystemFont, sans-serif;
  font-weight: 400;
  letter-spacing: 0.02em;
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
