import styled, { keyframes } from "styled-components";
import { motion } from "framer-motion";

// 🔹 Floating Animation for Side Project Cards Only
export const floatAnimation = keyframes`
  0% { transform: translateY(0px); }
  50% { transform: translateY(-10px); }
  100% { transform: translateY(0px); }
`;

// 🔹 Background Animation
export const AnimatedBackground = styled.div`
  background: linear-gradient(-45deg, #000000, #1a1a1a, #333333, #222);
  background-size: 300% 300%;
  animation: gradientShift 8s ease infinite;

  @keyframes gradientShift {
    0% {
      background-position: 0% 50%;
    }
    50% {
      background-position: 100% 50%;
    }
    100% {
      background-position: 0% 50%;
    }
  }
`;

// 🔹 Shared Card Styling (Professional & Side Projects)
export const Card = styled(motion.div)`
  backdrop-filter: blur(10px);
  background: rgba(255, 255, 255, 0.12);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 12px;
  padding: 1.5rem;
  text-align: left;
  transition: all 0.3s ease-in-out;
  color: #fff;

  &:hover {
    transform: scale(1.05);
    box-shadow: 0px 5px 20px rgba(255, 255, 255, 0.3);
  }
`;

// 🔹 Side Project Cards (Floating Effect & Clickable)
export const FloatingCard = styled(motion.a)<{ delay: number }>`
  animation: ${floatAnimation} ${({ delay }) => 4 + delay}s ease-in-out infinite;
  backdrop-filter: blur(10px);
  background: rgba(255, 255, 255, 0.12);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 12px;
  display: block;
  padding: 1.5rem;
  text-align: left;
  text-decoration: none;
  transition: all 0.3s ease-in-out;
  color: inherit;

  &:hover {
    transform: scale(1.05);
    box-shadow: 0px 5px 20px rgba(255, 255, 255, 0.3);
  }
`;

// 🔹 Tab Navigation Styles
export const Tabs = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 2rem;
`;

export const TabButton = styled.button<{ $active: boolean }>`
  background: none;
  border: none;
  color: ${({ $active }) => ($active ? "#FFF" : "#777")};
  cursor: pointer;
  font-size: 1.2rem;
  font-weight: bold;
  padding: 0.8rem 2rem;
  transition: color 0.3s ease, border-bottom 0.3s ease;
  border-bottom: ${({ $active }) => ($active ? "3px solid #FFF" : "none")};

  &:hover {
    color: #fff;
  }
`;

// 🔹 Grid Container for Projects
export const GridContainer = styled.div`
  display: grid;
  gap: 2rem;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  max-width: 1100px;
  width: 100%;
  padding: 1rem;
`;
