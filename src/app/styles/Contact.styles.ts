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

  /* Mobile specific styles */
  @media (max-width: 768px) {
    width: 100%;
    padding: 1.5rem 1rem 2rem;
    background: #000;
    opacity: 1;
    height: auto;
    min-height: 130px;
    z-index: 10;
    position: relative;
    box-shadow: none; /* Remove shadow that might create a line */
    /* Remove the border that creates a line */
    border-top: none;
    visibility: visible !important;
    display: flex !important;
  }

  &.mobile-footer {
    opacity: 1;
    padding-bottom: calc(env(safe-area-inset-bottom, 1rem) + 0.5rem);
  }
`;

export const IconContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 0.8rem;
  margin-bottom: 0.5rem;

  @media (max-width: 768px) {
    gap: 1.2rem;
  }
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
    width: 2.5rem;
    height: 2.5rem;
    font-size: 1.5rem;

    svg {
      width: 1.5rem;
      height: 1.5rem;
    }
  }
`;

export const Copyright = styled.p`
  font-size: 0.85rem;
  color: rgba(255, 255, 255, 0.7);
  margin-top: 0.5rem;

  @media (max-width: 768px) {
    font-size: 0.9rem;
    color: rgba(255, 255, 255, 0.9);
    margin-top: 1rem;
    margin-bottom: 0.75rem; /* More space at the bottom */
    padding-bottom: 0.75rem; /* More padding at the bottom */
    /* Ensure visibility */
    position: relative;
    z-index: 5;
    /* Prevent wrapping issues */
    max-width: 90%;
    line-height: 1.4;
  }
`;
