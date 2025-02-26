import styled from "styled-components";

export const ThemeContainer = styled.div`
  position: fixed;
  top: 20px;
  right: 20px;
  z-index: 1000;
  display: flex;
  gap: 10px;
  background: rgba(0, 0, 0, 0.6);
  backdrop-filter: blur(10px);
  padding: 10px;
  border-radius: 8px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  transform: translateZ(0);
  will-change: transform;

  @media (max-width: 768px) {
    display: none;
  }
`;

export const ThemeButton = styled.button<{ $active: boolean }>`
  background: ${(props) =>
    props.$active ? "rgba(255, 255, 255, 0.2)" : "rgba(255, 255, 255, 0.1)"};
  color: white;
  border: none;
  padding: 8px 12px;
  border-radius: 6px;
  cursor: pointer;
  font-family: "SF Pro Display", -apple-system, BlinkMacSystemFont, sans-serif;
  font-size: 14px;
  transition: background 0.3s ease;
  transform: translateZ(0);

  &:hover {
    background: rgba(255, 255, 255, 0.25);
  }
`;
