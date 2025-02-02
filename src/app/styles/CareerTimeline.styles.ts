import styled from "styled-components";
import { motion } from "framer-motion";

export const TimelineContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 4rem 2rem;
  background: linear-gradient(180deg, #111, #1a1a1a);
`;

export const TimelineWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  max-width: 1000px;
  width: 100%;
  position: relative;
  gap: 1.5rem;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
    gap: 2rem;
  }
`;

export const TimelineLine = styled.div`
  position: absolute;
  top: 50%;
  left: 0;
  right: 0;
  height: 3px;
  background: rgba(255, 255, 255, 0.2);
  z-index: -1;

  @media (max-width: 768px) {
    top: 0;
    left: 50%;
    width: 3px;
    height: 100%;
  }
`;

export const CareerCard = styled(motion.div)`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  background: rgba(255, 255, 255, 0.08);
  backdrop-filter: blur(8px);
  border-radius: 15px;
  padding: 2rem;
  width: 280px;
  min-height: 320px;
  box-shadow: 0px 4px 12px rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.15);
  transition: all 0.3s ease-in-out;
  position: relative;

  &:hover {
    transform: scale(1.05);
    box-shadow: 0px 8px 18px rgba(255, 255, 255, 0.3);
  }

  @media (max-width: 768px) {
    width: 100%;
    max-width: 360px;
  }
`;

export const Logo = styled.img`
  width: 60px;
  height: 60px;
  object-fit: contain;
  margin-bottom: 1rem;
  filter: brightness(1.2);
`;

export const TechStack = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-top: 1rem;
  justify-content: center;
`;

export const TechBadge = styled.span`
  background: #fff;
  color: #000;
  padding: 6px 12px;
  border-radius: 6px;
  font-size: 0.85rem;
  font-weight: bold;
  box-shadow: 2px 2px 6px rgba(0, 0, 0, 0.2);
`;
