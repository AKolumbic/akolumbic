import styled from "styled-components";
import { motion } from "framer-motion";

export const BackgroundContainer = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  overflow: hidden;
  z-index: 0;
  transition: all 0.5s ease;
  background-color: #000;
  transform: translateZ(0);
  backface-visibility: hidden;
  perspective: 1000;
  will-change: transform;
`;

export const GradientOrb = styled(motion.div)<{ $color: string }>`
  position: absolute;
  border-radius: 50%;
  background: ${(props) => props.$color};
  filter: blur(80px);
  opacity: 0.15;
  z-index: 1;
  mix-blend-mode: lighten;
  transition: all 0.5s ease;
  pointer-events: none;
  transform: translateZ(0);
  backface-visibility: hidden;
  perspective: 1000;
  will-change: transform;
`;

export const WaveContainer = styled(motion.div)`
  position: absolute;
  width: 200%;
  height: 200%;
  left: -50%;
  background: transparent;
  pointer-events: none;
  transform: translateZ(0);
  backface-visibility: hidden;
  perspective: 1000;
  will-change: transform;
`;

export const Wave = styled(motion.div)<{ $color: string; $delay: number }>`
  position: absolute;
  width: 100%;
  height: 100%;
  background: ${(props) => props.$color};
  opacity: 0.12;
  border-radius: 42% 48% 46% 44%;
  transform: translateZ(0);
  backface-visibility: hidden;
  perspective: 1000;
  will-change: transform;
  animation: wave ${(props) => 20 + props.$delay}s infinite linear;

  @keyframes wave {
    0% {
      transform: rotate(0deg) translateY(0%) scaleY(1) translateZ(0);
      border-radius: 42% 48% 46% 44%;
    }
    25% {
      transform: rotate(90deg) translateY(1%) scaleY(1.02) translateZ(0);
      border-radius: 44% 42% 49% 45%;
    }
    50% {
      transform: rotate(180deg) translateY(0%) scaleY(1) translateZ(0);
      border-radius: 46% 45% 42% 47%;
    }
    75% {
      transform: rotate(270deg) translateY(-1%) scaleY(0.98) translateZ(0);
      border-radius: 45% 47% 44% 43%;
    }
    100% {
      transform: rotate(360deg) translateY(0%) scaleY(1) translateZ(0);
      border-radius: 42% 48% 46% 44%;
    }
  }
`;

export const SunsetGradient = styled(motion.div)`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(
    to bottom,
    #000000 0%,
    #000000 10%,
    #1a237e 40%,
    #7e57c2 60%,
    #ff5252 75%,
    #ff9800 85%,
    #ffd740 100%
  );
  opacity: 0;
  transition: opacity 1s ease;
`;

export const CurvedHorizon = styled(motion.div)`
  position: absolute;
  top: 0;
  left: -50%;
  right: -50%;
  bottom: 0;
  width: 200%;
  height: 200%;
  background: radial-gradient(
    ellipse at 50% 80%,
    transparent 0%,
    rgba(0, 0, 0, 0.3) 30%,
    rgba(0, 0, 0, 0.8) 60%,
    rgba(0, 0, 0, 1) 100%
  );
  transform-origin: center;
  pointer-events: none;
`;

export const SolarFlare = styled(motion.div)`
  position: absolute;
  width: 60vw;
  height: 60vh;
  background: radial-gradient(
    circle at center,
    rgba(255, 215, 64, 0.3) 0%,
    rgba(255, 82, 82, 0.2) 30%,
    transparent 70%
  );
  filter: blur(30px);
  mix-blend-mode: screen;
`;
