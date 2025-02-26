import styled from "styled-components";
import { motion } from "framer-motion";

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

// 🔹 Container for Professional & Side Projects
export const SectionContainer = styled.div`
  width: 100%;
  max-width: 1200px;
  margin: 4rem auto;
  text-align: center;
`;

// 🔹 Grid Container for Projects
export const GridContainer = styled.div`
  display: grid;
  gap: 1rem;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  max-width: 1100px;
  width: 100%;
  padding: 1rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr; /* ✅ Single column on smaller screens */
    gap: 0.5rem; /* ✅ Reduce gap */
    padding: 0.5rem; /* ✅ Reduce padding for better alignment */
  }
`;

// 🔹 Shared Card Styling (Professional & Side Projects)
export const Card = styled(motion.div)<{ image?: string }>`
  width: 100%; /* ✅ Allow cards to use the full width available */
  min-width: 250px;
  max-width: 100%;
  margin: 0 auto;
  backdrop-filter: blur(10px);
  background: rgba(0, 0, 0, 0.5);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 12px;
  padding: 1.2rem;
  text-align: center;
  transition: all 0.3s ease-in-out;
  color: #fff;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  min-height: 200px;
  box-shadow: 0px 5px 15px rgba(0, 0, 0, 0.3);
  overflow: hidden;

  /* Overlay for better text readability */
  .overlay {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(
      to bottom,
      rgba(0, 0, 0, 0.4),
      rgba(0, 0, 0, 0.7)
    );
    z-index: 0;
  }

  @media (max-width: 768px) {
    padding: 0.8rem; /* ✅ Adjust padding */
    min-height: auto; /* ✅ Prevent excessive height issues */
  }

  &:hover {
    transform: scale(1.05);
    box-shadow: 0px 8px 25px rgba(255, 255, 255, 0.3);
  }

  /* ✅ Background Image */
  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: ${({ image }) => (image ? `url(${image})` : "none")}
      center/cover no-repeat;
    opacity: 0.3;
    z-index: -1;
    border-radius: 12px;
  }
`;

export const FloatingCard = styled(motion.a)<{ image?: string }>`
  width: 100%;
  min-width: 250px;
  max-width: 100%;
  margin: 0 auto;
  backdrop-filter: blur(10px);
  background: rgba(0, 0, 0, 0.5);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 12px;
  display: block;
  padding: 1.2rem;
  text-align: center;
  text-decoration: none;
  transition: all 0.3s ease-in-out;
  color: inherit;
  position: relative;
  overflow: hidden;

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
    opacity: 0.3;
    z-index: -1;
    border-radius: 12px;
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
      rgba(0, 0, 0, 0.4),
      rgba(0, 0, 0, 0.7)
    );
    z-index: 0;
  }

  @media (max-width: 768px) {
    padding: 0.8rem;
  }

  &:hover {
    transform: scale(1.05);
    box-shadow: 0px 5px 20px rgba(255, 255, 255, 0.3);
  }
`;

// 🔹 Tab Navigation
export const Tabs = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 1.5rem;
  gap: 1rem;

  @media (max-width: 768px) {
    flex-wrap: wrap;
  }
`;

export const TabButton = styled.button<{ $active: boolean }>`
  background: none;
  border: none;
  color: ${({ $active }) => ($active ? "#FFF" : "#777")};
  cursor: pointer;
  font-size: 1.1rem;
  font-weight: bold;
  padding: 0.6rem 1.5rem;
  transition: color 0.3s ease, border-bottom 0.3s ease;
  border-bottom: ${({ $active }) => ($active ? "3px solid #FFF" : "none")};

  &:hover {
    color: #fff;
  }
`;
