import styled from "styled-components";
import { motion } from "framer-motion";

export const ThemeContainer = styled(motion.div)`
  position: fixed;
  top: 20px;
  right: 20px;
  z-index: 1000;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  transform: translateZ(0);
  will-change: transform;
`;

export const ThemeToggle = styled(motion.button)`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: rgba(0, 0, 0, 0.6);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  transition: all 0.3s ease;

  &:hover {
    background: rgba(0, 0, 0, 0.8);
    transform: scale(1.05);
  }
`;

export const ThemePanel = styled(motion.div)`
  margin-top: 10px;
  background: rgba(0, 0, 0, 0.8);
  backdrop-filter: blur(10px);
  border-radius: 12px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  padding: 8px;
  display: flex;
  flex-direction: column;
  gap: 8px;
  min-width: 160px;
`;

export const ThemeButton = styled(motion.button)<{
  $active: boolean;
  $gradient: string;
}>`
  background: ${(props) => props.$gradient};
  color: white;
  border: none;
  padding: 10px 16px;
  border-radius: 8px;
  cursor: pointer;
  font-family: "SF Pro Display", -apple-system, BlinkMacSystemFont, sans-serif;
  font-size: 14px;
  font-weight: 500;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
  text-align: left;
  display: flex;
  align-items: center;
  gap: 8px;

  &::before {
    content: "";
    position: absolute;
    inset: 0;
    background: ${(props) =>
      props.$active ? "rgba(255, 255, 255, 0.1)" : "transparent"};
    border-radius: inherit;
    transition: background 0.3s ease;
  }

  &:hover::before {
    background: rgba(255, 255, 255, 0.15);
  }

  &::after {
    content: "";
    position: absolute;
    right: 12px;
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: ${(props) =>
      props.$active ? "#fff" : "rgba(255, 255, 255, 0.5)"};
    transition: all 0.3s ease;
  }
`;
