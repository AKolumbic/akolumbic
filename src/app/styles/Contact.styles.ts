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
  gap: 1.5rem;
  flex-wrap: wrap;

  @media (max-width: 768px) {
    display: grid;
    grid-template-columns: repeat(3, 1fr); /* 3 icons per row */
    gap: 1rem;
    max-width: 350px;
    margin: 0 auto;
  }
`;

export const IconLink = styled.a`
  color: #fff;
  font-size: 2rem;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: transform 0.2s ease-in-out, color 0.2s ease-in-out;

  &:hover {
    transform: scale(1.2);
  }
`;

export const Copyright = styled.p`
  font-size: 0.9rem;
  opacity: 0.7;
  margin-top: 1rem;
`;
