import styled from "styled-components";
import { motion } from "framer-motion";

export const AboutSection = styled(motion.section)`
  background: linear-gradient(135deg, #080808 0%, #1a1a1a 100%);
  color: #fff;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-family: "SF Pro Display", "SF Pro Text", -apple-system,
    BlinkMacSystemFont, "Segoe UI", "Roboto", sans-serif;
  min-height: 100vh;
  overflow: hidden;
  padding: 5rem 2rem;
  text-align: center;
  position: relative;
`;

export const ContentWrapper = styled(motion.div)`
  position: relative;
  z-index: 1;
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const Quote = styled(motion.p)`
  color: #fff;
  font-family: "SF Pro Display", -apple-system, BlinkMacSystemFont, sans-serif;
  font-size: clamp(1.8rem, 5vw, 3.2rem);
  font-style: italic;
  font-weight: 500;
  letter-spacing: -0.025em;
  line-height: 1.4;
  margin-bottom: 5rem;
  max-width: 900px;
  position: relative;
  text-align: center;
  align-self: center;
  width: 100%;

  span {
    background: linear-gradient(to right, #64b5f6, #e5e5e5);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }

  &::before,
  &::after {
    content: '"';
    font-family: "Georgia", serif;
    font-size: 4rem;
    position: absolute;
    opacity: 0.15;
  }

  &::before {
    top: -2rem;
    left: -2rem;
  }

  &::after {
    bottom: -3rem;
    right: -2rem;
  }
`;

export const ContentContainer = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
  gap: 4rem;
  align-items: start;
  margin: 2rem auto;
  width: 100%;

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
    gap: 3rem;
  }
`;

export const SectionTitle = styled(motion.h2)`
  font-family: "SF Pro Display", -apple-system, BlinkMacSystemFont, sans-serif;
  font-size: 2.5rem;
  font-weight: 700;
  letter-spacing: -0.03em;
  margin-bottom: 3rem;
  position: relative;
  display: inline-block;
  text-align: center;
  align-self: center;

  &::after {
    content: "";
    position: absolute;
    height: 4px;
    width: 40%;
    background: linear-gradient(to right, #64b5f6, transparent);
    bottom: -0.5rem;
    left: 30%;
    border-radius: 4px;
  }
`;

export const BioColumn = styled(motion.div)`
  font-size: 1.1rem;
  line-height: 1.8;
  background: rgba(255, 255, 255, 0.03);
  backdrop-filter: blur(10px);
  border-radius: 16px;
  padding: 2.5rem;
  border: 1px solid rgba(255, 255, 255, 0.05);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
  height: 100%;

  p {
    margin-bottom: 1.5rem;
    color: rgba(255, 255, 255, 0.9);
    font-weight: 300;
    letter-spacing: 0.01em;
  }

  strong {
    color: #fff;
    font-weight: 600;
  }
`;

export const SkillsColumn = styled(motion.div)`
  line-height: 1.8;
  position: relative;
  background: rgba(255, 255, 255, 0.03);
  backdrop-filter: blur(10px);
  border-radius: 16px;
  padding: 2.5rem;
  border: 1px solid rgba(255, 255, 255, 0.05);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
  height: 100%;
`;

export const SkillsHeading = styled(motion.h3)`
  font-family: "SF Pro Display", -apple-system, BlinkMacSystemFont, sans-serif;
  font-size: 1.8rem;
  font-weight: 600;
  margin-bottom: 2rem;
  padding-bottom: 0.8rem;
  text-align: center;
  position: relative;
  letter-spacing: -0.02em;

  &::after {
    content: "";
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 60px;
    height: 3px;
    background: linear-gradient(to right, #64b5f6, transparent);
    border-radius: 3px;
  }
`;

export const SkillsList = styled(motion.ul)`
  font-size: 1.1rem;
  line-height: 1.8;
  list-style-type: none;
  margin: 0 auto;
  padding: 0;
  display: grid;
  grid-template-columns: 1fr;
  gap: 0.5rem;
`;

export const SkillItem = styled(motion.li)`
  display: flex;
  align-items: center;
  margin-bottom: 0.8rem;
  padding: 0.8rem 1rem;
  background: rgba(255, 255, 255, 0.02);
  border-radius: 8px;
  border-left: 3px solid rgba(100, 181, 246, 0.5);
  color: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(5px);
  will-change: transform, background-color, border-left-color, box-shadow;
  position: relative;
  cursor: pointer;
  overflow: visible;
`;

export const BackgroundShape = styled(motion.div)`
  position: absolute;
  background: rgba(255, 255, 255, 0.02);
  border-radius: 50%;
  filter: blur(20px);
  z-index: 0;
`;

export const ResumeButtonContainer = styled(motion.div)`
  margin-top: 5rem;
  display: flex;
  justify-content: center;

  @media (max-width: 768px) {
    margin-top: 2rem;
  }
`;

// Tooltip Components
export const Tooltip = styled(motion.div)`
  width: 280px;
  z-index: 9999; /* Extra high z-index */
  pointer-events: auto; /* Make tooltip interactive */
  filter: drop-shadow(0 4px 12px rgba(0, 0, 0, 0.4));

  @media (max-width: 768px) {
    width: 260px;
    left: auto !important;
    right: 0;
  }
`;

export const TooltipContent = styled.div`
  background: rgba(30, 30, 40, 0.98);
  backdrop-filter: blur(10px);
  border-radius: 8px;
  border: 1px solid rgba(100, 181, 246, 0.3);
  padding: 15px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.4);
  color: rgba(255, 255, 255, 0.95);
  font-size: 0.85rem;
  line-height: 1.5;
  text-align: left;
  overflow: hidden;

  p {
    margin: 0 0 8px;
  }
`;

export const ExternalLink = styled.a`
  display: inline-flex;
  align-items: center;
  margin-right: 12px;
  margin-bottom: 6px;
  color: rgba(100, 181, 246, 0.95);
  text-decoration: none;
  font-size: 0.8rem;
  transition: color 0.2s ease, transform 0.2s ease;

  &:hover {
    color: rgba(100, 181, 246, 1);
    transform: translateY(-1px);
  }

  svg {
    margin-left: 3px;
  }
`;
