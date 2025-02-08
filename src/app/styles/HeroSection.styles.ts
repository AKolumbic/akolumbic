import styled from "styled-components";
import { motion } from "framer-motion";

export const HeroContainer = styled(motion.section)`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #000;
  text-align: center;
`;

/* Wrapper ensures first and last name can stack on mobile */
export const HeroTextWrapper = styled.div`
  display: flex;
  flex-direction: row;
  gap: 0.5rem;
  justify-content: center;
  align-items: center;
  text-align: center;

  @media (max-width: 600px) {
    flex-direction: column; /* ✅ Stacks first/last name */
  }
`;

export const FirstName = styled(motion.div)`
  font-size: min(10vw, 5rem);
  font-weight: bold;
  text-transform: uppercase;
  font-family: "Michroma", sans-serif;
  color: #fff;
  white-space: nowrap;

  @media (max-width: 600px) {
    font-size: min(12vw, 4rem);
  }
`;

export const LastName = styled(FirstName)``;

/* Underline (Hidden on Mobile) */
export const Underline = styled(motion.div)`
  width: 80%;
  max-width: 400px;
  height: 2px;
  background-color: #fff;
  margin: 1rem auto;

  @media (max-width: 600px) {
    display: none;
  }
`;

/* Wrapper allows subtext to stack on mobile */
export const SubtextWrapper = styled.div`
  display: flex;
  flex-direction: row;
  gap: 0.5rem;
  justify-content: center;
  align-items: center;
  text-align: center;

  @media (max-width: 600px) {
    flex-direction: column; /* ✅ Stacks text */
  }
`;

export const SubtextLine = styled(motion.p)`
  font-size: min(4vw, 1.2rem);
  font-family: "Michroma", sans-serif;
  color: rgba(255, 255, 255, 0.8);
  text-align: center;
  letter-spacing: 1.5px;
  margin-top: 0.5rem;
  padding: 0 1rem;
`;
