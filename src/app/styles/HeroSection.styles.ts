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
  font-size: min(10vw, 5rem);
  font-weight: bold;
  text-transform: uppercase;
  font-family: "SF Pro Display", "Michroma", sans-serif;
  white-space: nowrap;
  text-shadow: 0 4px 12px rgba(0, 0, 0, 0.5);
  transform: translateZ(0);
  will-change: transform;

  @media (max-width: 600px) {
    font-size: min(12vw, 4rem);
    text-shadow: 0 2px 6px rgba(0, 0, 0, 0.5);
  }
`;

export const LastName = styled(FirstName)``;

/* Individual letter with gradient animation */
export const GradientLetter = styled(motion.span)`
  display: inline-block;
  background-size: 200% 100%;
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  color: transparent;
  padding: 0 1px;
  text-shadow: none;
  position: relative;
  z-index: 2;
  will-change: transform, background-position;
  transform: translateZ(0);
  filter: drop-shadow(0 1px 1px rgba(255, 107, 107, 0.9))
    drop-shadow(0 0 4px rgba(255, 140, 105, 0.3));
  letter-spacing: 0.025em;

  @media (max-width: 768px) {
    background-size: 100% 100%;
    filter: drop-shadow(0 1px 1px rgba(255, 107, 107, 0.7));
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
  font-size: min(4vw, 1.5rem);
  font-family: "SF Pro Display", "Michroma", sans-serif;
  background-size: 200% 100%;
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  color: transparent;
  text-align: center;
  letter-spacing: 1.5px;
  margin-top: 0.5rem;
  padding: 0 1rem;
  font-weight: 300;
  will-change: transform, background-position;
  transform: translateZ(0);
  filter: drop-shadow(0 1px 1px rgba(255, 107, 107, 0.9))
    drop-shadow(0 0 4px rgba(255, 140, 105, 0.3));

  @media (max-width: 768px) {
    font-size: min(3.5vw, 1.2rem);
    letter-spacing: 1px;
    background-size: 100% 100%;
    filter: drop-shadow(0 1px 1px rgba(255, 107, 107, 0.7));
  }
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
