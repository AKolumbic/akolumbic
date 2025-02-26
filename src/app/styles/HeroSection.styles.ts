import styled from "styled-components";
import { motion } from "framer-motion";

export const HeroContainer = styled(motion.section)`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #000;
  text-align: center;
  position: relative;
  overflow: hidden;
`;

export const HeroBackgroundOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(
    135deg,
    rgba(0, 0, 0, 0.9) 0%,
    rgba(15, 15, 20, 0.85) 100%
  );
  z-index: 1;
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
`;

/* Wrapper ensures first and last name can stack on mobile */
export const HeroTextWrapper = styled.div`
  display: flex;
  flex-direction: row;
  gap: 1.5rem;
  justify-content: center;
  align-items: center;
  text-align: center;

  @media (max-width: 600px) {
    flex-direction: column; /* ✅ Stacks first/last name */
  }
`;

export const FirstName = styled.div`
  font-size: min(10vw, 5rem);
  font-weight: bold;
  text-transform: uppercase;
  font-family: "SF Pro Display", "Michroma", sans-serif;
  white-space: nowrap;
  text-shadow: 0 4px 12px rgba(0, 0, 0, 0.5);

  @media (max-width: 600px) {
    font-size: min(12vw, 4rem);
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
  background-image: linear-gradient(
    to right,
    #ffffff,
    #e8f0fe,
    #c2d7f0,
    #90b4e5,
    #64b5f6,
    #fffde7
  );
  padding: 0 1px;
  text-shadow: none;
  position: relative;
  z-index: 2;
  will-change: background-position;
  filter: drop-shadow(0 1px 1px rgba(100, 181, 246, 0.9))
    drop-shadow(0 0 4px rgba(255, 255, 255, 0.2));
  letter-spacing: 0.025em;
`;

/* Letter wrapper to add enhanced effects */
export const LetterWrapper = styled(motion.div)`
  display: inline-block;
  position: relative;
  filter: drop-shadow(0 3px 4px rgba(0, 0, 0, 0.5));
  transform-style: preserve-3d;
  perspective: 1000px;

  &::before {
    content: "";
    position: absolute;
    inset: -2px;
    z-index: -1;
    opacity: 0.12;
    background: radial-gradient(
      circle at center,
      rgba(100, 181, 246, 0.8),
      rgba(100, 181, 246, 0.05) 70%,
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
      rgba(100, 181, 246, 0.5),
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
`;

/* Underline (Hidden on Mobile) */
export const Underline = styled(motion.div)`
  width: 80%;
  max-width: 400px;
  height: 2px;
  background: linear-gradient(to right, #64b5f6, rgba(255, 255, 255, 0.3));
  margin: 1.5rem auto;
  border-radius: 2px;

  @media (max-width: 600px) {
    width: 60%;
    max-width: 300px;
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

  @media (max-width: 600px) {
    flex-direction: column; /* ✅ Stacks text */
  }
`;

export const SubtextLine = styled(motion.p)`
  font-size: min(4vw, 1.5rem);
  font-family: "SF Pro Display", "Michroma", sans-serif;
  color: rgba(255, 255, 255, 0.9);
  text-align: center;
  letter-spacing: 1.5px;
  margin-top: 0.5rem;
  padding: 0 1rem;
  font-weight: 300;
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
