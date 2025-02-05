import styled from "styled-components";

export const Footer = styled.footer`
  width: 100%;
  padding: 2rem 1rem;
  background: #000;
  color: #fff;
  text-align: center;
  position: relative;
  bottom: 0;
`;

export const IconContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  gap: 1.5rem;
  max-width: 450px; /* Keeps icons centered */
  margin: 0 auto; /* Ensures centering */

  @media (max-width: 600px) {
    display: grid;
    grid-template-columns: repeat(4, 1fr); /* 4 icons per row */
    gap: 1rem;
    justify-content: center;
    justify-items: center; /* Ensures icons are centered */
    max-width: 300px;
  }

  @media (max-width: 400px) {
    grid-template-columns: repeat(3, 1fr); /* Adjusts for very small screens */
  }
`;

export const IconLink = styled.a`
  color: #fff;
  font-size: 2rem;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: transform 0.2s ease-in-out;

  &:hover {
    transform: scale(1.2);
  }
`;

export const Copyright = styled.p`
  font-size: 0.9rem;
  opacity: 0.7;
  margin-top: 1rem;
`;
