import styled from "styled-components";
import { motion } from "framer-motion";

export const FABContainer = styled(motion.div)`
  position: fixed;
  bottom: 20px;
  right: 20px;
  z-index: 1000;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  transform: translateZ(0);
  will-change: transform;

  @media (max-width: 768px) {
    bottom: 15px;
    right: 15px;
  }
`;

export const FABButton = styled(motion.button)`
  width: 50px;
  height: 50px;
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
  }

  svg {
    width: 24px;
    height: 24px;
  }

  @media (max-width: 768px) {
    width: 45px;
    height: 45px;

    svg {
      width: 20px;
      height: 20px;
    }
  }
`;

export const FABTooltip = styled(motion.div)`
  position: absolute;
  right: calc(100% + 10px);
  bottom: calc(100% - 30px);
  transform: none;
  background: rgba(0, 0, 0, 0.8);
  backdrop-filter: blur(10px);
  color: white;
  padding: 8px 12px;
  border-radius: 6px;
  font-size: 14px;
  white-space: nowrap;
  pointer-events: none;
  border: 1px solid rgba(255, 255, 255, 0.1);

  &:after {
    content: "";
    position: absolute;
    right: -6px;
    bottom: 10px;
    transform: none;
    border-left: 6px solid rgba(0, 0, 0, 0.8);
    border-top: 6px solid transparent;
    border-bottom: 6px solid transparent;
  }

  @media (max-width: 768px) {
    display: none;
  }
`;
