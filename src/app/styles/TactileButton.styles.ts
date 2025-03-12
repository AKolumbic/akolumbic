import styled from "styled-components";

export const StyledButton = styled.button`
  all: unset;
  cursor: pointer;
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
  position: relative;
  border-radius: 999vw;
  background-color: rgba(30, 30, 35, 0.9);
  box-shadow: -0.15em -0.15em 0.15em -0.075em rgba(5, 5, 5, 0.25),
    0.0375em 0.0375em 0.0675em 0 rgba(5, 5, 5, 0.1);

  &::after {
    content: "";
    position: absolute;
    z-index: 0;
    width: calc(100% + 0.3em);
    height: calc(100% + 0.3em);
    top: -0.15em;
    left: -0.15em;
    border-radius: inherit;
    background: linear-gradient(
      -135deg,
      rgba(5, 5, 5, 0.5),
      transparent 20%,
      transparent 100%
    );
    filter: blur(0.0125em);
    opacity: 0.25;
    mix-blend-mode: multiply;
  }
`;

export const ButtonOutter = styled.div`
  position: relative;
  z-index: 1;
  border-radius: inherit;
  transition: box-shadow 300ms ease;
  will-change: box-shadow;
  box-shadow: 0 0.05em 0.05em -0.01em rgba(5, 5, 5, 1),
    0 0.01em 0.01em -0.01em rgba(5, 5, 5, 0.5),
    0.15em 0.3em 0.1em -0.01em rgba(5, 5, 5, 0.25);

  ${StyledButton}:active & {
    box-shadow: 0 0 0 0 rgba(5, 5, 5, 1), 0 0 0 0 rgba(5, 5, 5, 0.5),
      0 0 0 0 rgba(5, 5, 5, 0.25);
  }
`;

export const ButtonInner = styled.div`
  --inset: 0.035em;
  position: relative;
  z-index: 1;
  border-radius: inherit;
  padding: 1em 1.5em;
  background-image: linear-gradient(
    135deg,
    rgba(27, 38, 59, 0.95),
    rgba(13, 27, 42, 0.95)
  );
  transition: box-shadow 300ms ease, clip-path 250ms ease,
    background-image 250ms ease, transform 250ms ease;
  will-change: box-shadow, clip-path, background-image, transform;
  overflow: clip;
  clip-path: inset(0 0 0 0 round 999vw);
  box-shadow: 0 0 0 0 inset rgba(5, 5, 5, 0.1),
    -0.05em -0.05em 0.05em 0 inset rgba(5, 5, 5, 0.25),
    0 0 0 0 inset rgba(5, 5, 5, 0.1),
    0 0 0.05em 0.2em inset rgba(255, 255, 255, 0.25),
    0.025em 0.05em 0.1em 0 inset rgba(255, 255, 255, 1),
    0.12em 0.12em 0.12em inset rgba(255, 255, 255, 0.25),
    -0.075em -0.25em 0.25em 0.1em inset rgba(5, 5, 5, 0.25);

  ${StyledButton}:active & {
    clip-path: inset(
      clamp(1px, 0.0625em, 2px) clamp(1px, 0.0625em, 2px)
        clamp(1px, 0.0625em, 2px) clamp(1px, 0.0625em, 2px) round 999vw
    );
    box-shadow: 0.1em 0.15em 0.05em 0 inset rgba(5, 5, 5, 0.75),
      -0.025em -0.03em 0.05em 0.025em inset rgba(5, 5, 5, 0.5),
      0.25em 0.25em 0.2em 0 inset rgba(5, 5, 5, 0.5),
      0 0 0.05em 0.5em inset rgba(255, 255, 255, 0.15),
      0 0 0 0 inset rgba(255, 255, 255, 1),
      0.12em 0.12em 0.12em inset rgba(255, 255, 255, 0.25),
      -0.075em -0.12em 0.2em 0.1em inset rgba(5, 5, 5, 0.25);
  }

  & span {
    position: relative;
    z-index: 4;
    font-family: "SF Pro Display", "Inter", sans-serif;
    letter-spacing: -0.05em;
    font-weight: 500;
    color: rgba(255, 255, 255, 0.95);
    transition: transform 250ms ease;
    display: flex;
    align-items: center;
    justify-content: center;
    text-rendering: optimizeLegibility;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-shadow: rgba(0, 0, 0, 0.1) 0 0 0.1em;
  }

  ${StyledButton}:active & span {
    transform: scale(0.975);
    color: rgba(255, 255, 255, 1);
  }

  ${StyledButton}:hover & span {
    color: rgba(255, 255, 255, 1);
  }
`;
