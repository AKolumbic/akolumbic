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

  /* Adjust for our MobileView component which positions it absolutely */
  .mobile-view & {
    position: relative;
    top: 0;
    right: 0;
  }

  /* Add a visually-hidden class for accessibility */
  .visually-hidden {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    white-space: nowrap;
    border-width: 0;
  }

  @media (max-width: 768px) {
    top: 15px;
    right: 15px;
  }
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

  @media (max-width: 768px) {
    width: 36px;
    height: 36px;

    svg {
      width: 18px;
      height: 18px;
    }
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

  @media (max-width: 768px) {
    min-width: 140px;
    right: 0;
    position: absolute;
  }
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
      props.$active ? "rgba(255, 255, 255, 0.15)" : "transparent"};
    border-radius: inherit;
    transition: background 0.3s ease;
  }

  &:hover::before {
    background: rgba(255, 255, 255, 0.15);
  }

  &::after {
    content: ${(props) => (props.$active ? "'✓'" : "''")};
    position: absolute;
    right: 12px;
    width: auto;
    height: auto;
    font-size: 14px;
    color: #fff;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.3s ease;
    opacity: ${(props) => (props.$active ? "1" : "0")};
  }

  /* Add a left border for active theme */
  border-left: ${(props) =>
    props.$active ? "3px solid #fff" : "3px solid transparent"};
  padding-left: ${(props) => (props.$active ? "13px" : "16px")};
  font-weight: ${(props) => (props.$active ? "600" : "500")};
`;
