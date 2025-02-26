import styled from "styled-components";
import { motion } from "framer-motion";

// 🔹 Section Title
export const SectionTitle = styled(motion.h2)`
  font-family: "SF Pro Display", "Inter", -apple-system, BlinkMacSystemFont,
    sans-serif;
  font-size: clamp(1.8rem, 4vw, 2.4rem);
  font-weight: 500;
  color: #fff;
  margin-bottom: 2rem;
  letter-spacing: -0.02em;
  position: relative;
  display: inline-block;

  &::after {
    content: "";
    position: absolute;
    left: 50%;
    bottom: -10px;
    width: 40px;
    height: 3px;
    background-color: rgba(255, 255, 255, 0.5);
    transform: translateX(-50%);
  }
`;

// 🔹 Container for Professional & Side Projects
export const SectionContainer = styled(motion.div)`
  width: 100%;
  max-width: 1200px;
  margin: 6rem auto;
  text-align: center;
  position: relative;
  z-index: 1;
`;

// 🔹 Grid Container for Projects
export const GridContainer = styled(motion.div)`
  display: grid;
  gap: 1.5rem;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  max-width: 1200px;
  width: 100%;
  padding: 1rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 1rem;
    padding: 0.5rem;
  }
`;

// Card shimmer effect
const shimmerEffect = `
  &::after {
    content: "";
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background: linear-gradient(
      to right,
      rgba(255, 255, 255, 0) 0%,
      rgba(255, 255, 255, 0.03) 25%,
      rgba(255, 255, 255, 0.06) 50%,
      rgba(255, 255, 255, 0.03) 75%,
      rgba(255, 255, 255, 0) 100%
    );
    transform: translateX(-100%);
    transition: transform 0.8s ease;
    z-index: 2;
    pointer-events: none;
  }
  
  &:hover::after {
    transform: translateX(100%);
  }
`;

// 🔹 Shared Card Styling (Professional & Side Projects)
export const Card = styled(motion.div)<{ image?: string }>`
  width: 100%;
  min-width: 280px;
  max-width: 100%;
  margin: 0 auto;
  backdrop-filter: blur(12px);
  background: rgba(30, 30, 30, 0.6);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 16px;
  padding: 1.6rem;
  text-align: center;
  color: #fff;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  min-height: 220px;
  box-shadow: 0px 10px 30px rgba(0, 0, 0, 0.2);
  overflow: hidden;
  position: relative;
  cursor: pointer;
  ${shimmerEffect}

  h3 {
    font-family: "SF Pro Display", "Inter", -apple-system, BlinkMacSystemFont,
      sans-serif;
    font-weight: 500;
    font-size: 1.5rem;
    margin-bottom: 0.8rem;
    letter-spacing: -0.01em;
  }

  div {
    font-family: "SF Pro Text", "Inter", -apple-system, BlinkMacSystemFont,
      sans-serif;
    color: rgba(255, 255, 255, 0.7);
    font-size: 0.95rem;
    letter-spacing: 0.02em;
  }

  /* Overlay for better text readability */
  .overlay {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(
      to bottom,
      rgba(0, 0, 0, 0.3),
      rgba(0, 0, 0, 0.8)
    );
    z-index: 0;
    transition: opacity 0.4s ease;
  }

  @media (max-width: 768px) {
    padding: 1.2rem;
    min-height: auto;
  }

  &:hover {
    transform: translateY(-8px) scale(1.01);
    box-shadow: 0px 20px 40px rgba(0, 0, 0, 0.4);
    transition: all 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275);

    .overlay {
      opacity: 0.8;
    }
  }

  /* Background Image */
  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: ${({ image }) => (image ? `url(${image})` : "none")}
      center/cover no-repeat;
    opacity: 0.5;
    z-index: -1;
    border-radius: 16px;
    transition: opacity 0.4s ease, transform 0.4s ease;
  }

  &:hover::before {
    opacity: 0.7;
    transform: scale(1.08);
  }
`;

export const FloatingCard = styled(motion.a)<{ image?: string }>`
  width: 100%;
  min-width: 280px;
  max-width: 100%;
  margin: 0 auto;
  backdrop-filter: blur(12px);
  background: rgba(30, 30, 30, 0.6);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 16px;
  display: block;
  padding: 1.6rem;
  text-align: center;
  text-decoration: none;
  color: inherit;
  position: relative;
  overflow: hidden;
  box-shadow: 0px 10px 30px rgba(0, 0, 0, 0.2);
  ${shimmerEffect}

  h3 {
    font-family: "SF Pro Display", "Inter", -apple-system, BlinkMacSystemFont,
      sans-serif;
    font-weight: 500;
    font-size: 1.5rem;
    margin-bottom: 0.8rem;
    letter-spacing: -0.01em;
    color: #fff;
  }

  p {
    font-family: "SF Pro Text", "Inter", -apple-system, BlinkMacSystemFont,
      sans-serif;
    color: rgba(255, 255, 255, 0.9);
    font-size: 1rem;
    line-height: 1.5;
    margin-bottom: 1rem;
  }

  div {
    font-family: "SF Pro Text", "Inter", -apple-system, BlinkMacSystemFont,
      sans-serif;
    color: rgba(255, 255, 255, 0.7);
    font-size: 0.95rem;
    letter-spacing: 0.02em;
  }

  /* Background Image */
  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: ${({ image }) => (image ? `url(${image})` : "none")}
      center/cover no-repeat;
    opacity: 0.5;
    z-index: -1;
    border-radius: 16px;
    transition: opacity 0.4s ease, transform 0.4s ease;
  }

  /* Overlay for better text readability */
  .overlay {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(
      to bottom,
      rgba(0, 0, 0, 0.3),
      rgba(0, 0, 0, 0.8)
    );
    z-index: 0;
    transition: opacity 0.4s ease;
  }

  @media (max-width: 768px) {
    padding: 1.2rem;
  }

  &:hover {
    transform: translateY(-8px) scale(1.01);
    box-shadow: 0px 20px 40px rgba(0, 0, 0, 0.4);
    transition: all 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275);

    .overlay {
      opacity: 0.8;
    }

    &::before {
      opacity: 0.7;
      transform: scale(1.08);
    }
  }
`;

// 🔹 Tab Navigation
export const Tabs = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 2.5rem;
  gap: 2rem;
  position: relative;
  z-index: 2;

  @media (max-width: 768px) {
    flex-wrap: wrap;
    gap: 1rem;
  }
`;

export const TabButton = styled.button<{ $active: boolean }>`
  background: none;
  border: none;
  color: ${({ $active }) => ($active ? "#FFF" : "rgba(255, 255, 255, 0.5)")};
  cursor: pointer;
  font-family: "SF Pro Display", "Inter", -apple-system, BlinkMacSystemFont,
    sans-serif;
  font-size: 1.1rem;
  font-weight: 500;
  padding: 0.6rem 1.5rem;
  transition: all 0.3s ease;
  position: relative;

  &::after {
    content: "";
    position: absolute;
    bottom: -5px;
    left: 50%;
    width: ${({ $active }) => ($active ? "100%" : "0%")};
    height: 2px;
    background-color: ${({ $active }) => ($active ? "#fff" : "transparent")};
    transform: translateX(-50%);
    transition: width 0.3s ease;
  }

  &:hover {
    color: #fff;

    &::after {
      width: ${({ $active }) => ($active ? "100%" : "40%")};
    }
  }
`;
