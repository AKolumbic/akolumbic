import styled from "styled-components";

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

export const IconLink = styled.a`
  color: white;
  font-size: 1.5rem;
  transition: transform 0.3s ease-in-out, color 0.3s ease-in-out;

  &:hover {
    transform: scale(1.2);
    color: #bbb;
  }
`;

export const Copyright = styled.p`
  font-size: 0.85rem;
  color: rgba(255, 255, 255, 0.7);
  margin-top: 0.5rem;
`;
