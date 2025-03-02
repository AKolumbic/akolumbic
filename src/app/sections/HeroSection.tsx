"use client"; // Ensure it's a client component

import React, { useMemo, useState, useEffect } from "react";
// import { motion } from "framer-motion";
import {
  HeroContainer,
  HeroTextWrapper,
  FirstName,
  LastName,
  Underline,
  SubtextWrapper,
  SubtextLine,
  HeroContentWrapper,
  GradientLetter,
  LetterWrapper,
} from "../styles/HeroSection.styles";
// import TactileButton from "../components/tactile-button/tactile-button.component";
// import { FiArrowDown } from "react-icons/fi";

/**
 * Shuffles an array of numbers into a random order.
 * This is used to randomize animation order while ensuring
 * consistency between SSR and client hydration.
 */
function shuffleArray(array: number[]): number[] {
  return array
    .map((value) => ({ value, sort: Math.random() })) // Use random values for sorting
    .sort((a, b) => a.sort - b.sort)
    .map(({ value }) => value);
}

const HeroSection: React.FC = () => {
  // Ensure component only renders on the client (fixes hydration issues)
  const [isClient, setIsClient] = useState(false);
  // State to check if the screen is mobile-sized
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    const checkScreenSize = () => {
      const isMobileScreen = window.innerWidth <= 768;
      setIsMobile(isMobileScreen);
    };

    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);

    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  // Define name and split into first/last
  const firstName = "ANDREW";
  const lastName = "KOLUMBIC";

  // Compute a stable randomized order for letters - only for desktop
  const randomizedOrder = useMemo(
    () =>
      !isMobile
        ? shuffleArray([...Array(firstName.length + lastName.length).keys()])
        : [],
    [isMobile]
  );

  // Calculate total animation duration for name
  const totalNameLength = firstName.length + lastName.length;
  const lastLetterDelay = (totalNameLength - 1) * 0.2; // Time until last letter starts (reduced from 0.4 to 0.2)
  const nameAnimationComplete = lastLetterDelay + 1.25; // Add letter animation duration (reduced from 2.5 to 1.25)

  // Animation variants - simplified for mobile
  const letterVariants = useMemo(
    () => ({
      initial: isMobile ? { opacity: 0 } : { opacity: 0, scale: 1.2 },
      fallIn: (i: number) => ({
        opacity: [0, 0.3, 0.6, 0.8, 1],
        scale: isMobile ? 1 : [1.2, 1.1, 1.05, 1],
        transition: {
          delay: isMobile ? i * 0.015 : randomizedOrder[i] * 0.2, // Reduced from 0.03 and 0.4 to 0.015 and 0.2
          duration: isMobile ? 0.15 : 1.25, // Reduced from 0.3 and 2.5 to 0.15 and 1.25
          times: [0, 0.2, 0.5, 0.8, 1],
          ease: "easeInOut",
        },
      }),
    }),
    [isMobile, randomizedOrder]
  );

  // Simplified letter props without ongoing animations
  const letterAnimationProps = () => {
    return {
      style: {
        willChange: "transform",
        transform: "translateZ(0)",
      },
    };
  };

  // const scrollToAbout = () => {
  //   document.getElementById("about-section")?.scrollIntoView({
  //     behavior: "smooth",
  //   });
  // };

  if (!isClient) return null;

  return (
    <HeroContainer>
      <HeroContentWrapper>
        <HeroTextWrapper>
          <FirstName>
            {firstName.split("").map((char, i) => (
              <LetterWrapper
                key={i}
                custom={i}
                initial="initial"
                animate="fallIn"
                variants={letterVariants}
              >
                <GradientLetter {...letterAnimationProps()}>
                  {char}
                </GradientLetter>
              </LetterWrapper>
            ))}
          </FirstName>
          <LastName>
            {lastName.split("").map((char, i) => (
              <LetterWrapper
                key={i + firstName.length}
                custom={i + firstName.length}
                initial="initial"
                animate="fallIn"
                variants={letterVariants}
              >
                <GradientLetter {...letterAnimationProps()}>
                  {char}
                </GradientLetter>
              </LetterWrapper>
            ))}
          </LastName>
        </HeroTextWrapper>

        <Underline
          initial={{ scaleX: 0, opacity: 0 }}
          animate={{ scaleX: 1, opacity: 1 }}
          transition={{
            delay: isMobile ? 0.15 : nameAnimationComplete + 0.25, // Reduced from 0.3 and 0.5 to 0.15 and 0.25
            duration: isMobile ? 0.2 : 0.4, // Reduced from 0.4 and 0.8 to 0.2 and 0.4
            ease: "easeOut",
          }}
        />

        <SubtextWrapper
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{
            delay: isMobile ? 0.2 : nameAnimationComplete + 0.65, // Reduced from 0.4 and 1.3 to 0.2 and 0.65
            duration: 0.4, // Reduced from 0.8 to 0.4
          }}
        >
          <SubtextLine
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              opacity: { duration: 0.4 }, // Reduced from 0.8 to 0.4
              y: { duration: 0.4 }, // Reduced from 0.8 to 0.4
            }}
          >
            Software Engineer - San Pedro, CA
          </SubtextLine>
        </SubtextWrapper>

        {/* Scroll down button */}
        {/* {!isMobile && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2, duration: 0.5 }}
            style={{
              marginTop: "3rem",
            }}
          >
            <TactileButton onClick={scrollToAbout}>
              Explore <FiArrowDown style={{ marginLeft: "8px" }} />
            </TactileButton>
          </motion.div>
        )} */}
      </HeroContentWrapper>
    </HeroContainer>
  );
};

export default React.memo(HeroSection);
