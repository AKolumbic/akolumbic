import styled from "styled-components";
import { motion } from "framer-motion";

export const HeroContainer = styled(motion.section)`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  background-color: #000;
  text-align: center;
`;

export const HeroText = styled(motion.div)`
  text-align: center; /* ✅ Centers text */
  font-size: min(10vw, 5rem);
  font-weight: bold;
  text-transform: uppercase;
  font-family: "Michroma", sans-serif;
  color: #fff;
  white-space: nowrap;
  display: block; /* ✅ Ensures correct layout */

  @media (max-width: 600px) {
    font-size: min(12vw, 1rem); /* ✅ Adjusted for mobile */
    white-space: normal; /* ✅ Allows wrapping */
    display: block; /* ✅ Removes flex behavior */
    line-height: 1.2; /* ✅ Better spacing */
    max-width: 90%; /* ✅ Prevents it from stretching */
    margin: 0 auto; /* ✅ Centers text */
  }
`;

export const Underline = styled(motion.div)`
  width: 80%;
  max-width: 400px;
  height: 2px;
  background-color: #fff;
  margin: 1rem auto;
  transform-origin: center;

  @media (max-width: 600px) {
    display: none; /* Hide underline on small screens */
  }
`;

export const Subtext = styled(motion.p)`
  font-size: min(4vw, 1.2rem);
  font-family: "Michroma", sans-serif;
  color: rgba(255, 255, 255, 0.8);
  text-align: center;
  letter-spacing: 1.5px;
  margin-top: 0.5rem;
  padding: 0 1rem;
`;
