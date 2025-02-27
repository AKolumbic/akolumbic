import styled from "styled-components";
import { motion } from "framer-motion";

export const Footer = styled.footer`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 1rem;
  background: rgba(0, 0, 0, 0.8);
  backdrop-filter: blur(10px);
  width: 100%;
  text-align: center;
  opacity: 0.75;

  /* Stick to bottom only on mobile */
  @media (max-width: 768px) {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
  }
`;

export const IconContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 0.8rem;
  margin-bottom: 0.5rem;
`;

export const IconWrapper = styled(motion.div)`
  display: inline-flex;
  align-items: center;
  justify-content: center;
`;

export const IconLink = styled(motion.a)`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 2.5rem;
  height: 2.5rem;
  font-size: 1.5rem;
  color: white;
  transition: color 0.3s ease-in-out;

  svg {
    width: 1.5rem;
    height: 1.5rem;
  }

  @media (max-width: 768px) {
    width: 2rem;
    height: 2rem;
    font-size: 1.2rem;

    svg {
      width: 1.2rem;
      height: 1.2rem;
    }
  }
`;

export const Copyright = styled.p`
  font-size: 0.85rem;
  color: rgba(255, 255, 255, 0.7);
  margin-top: 0.5rem;
`;
