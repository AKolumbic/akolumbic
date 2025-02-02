import styled from "styled-components";

// 🔹 Styled Footer Container
export const Footer = styled.footer`
  background-color: #000;
  padding: 2rem;
  text-align: center;
`;

// 🔹 Icon Container with Hover Effects
export const IconContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 1.5rem;
  margin-bottom: 1rem;
`;

// 🔹 Individual Icon Styling
export const IconLink = styled.a`
  color: #fff;
  font-size: 1.8rem;
  transition: all 0.3s ease-in-out;

  &:hover {
    color: #fff;
    text-shadow: 0px 0px 12px rgba(255, 255, 255, 0.8); /* ✅ White glow effect */
    transform: scale(1.2);
  }
`;

// 🔹 Copyright Text
export const Copyright = styled.p`
  color: #aaa;
  font-size: 0.9rem;
  margin-top: 1rem;
`;
