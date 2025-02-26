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
  // const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  // useEffect(() => {
  //   const checkScreenSize = () => {
  //     const isMobileScreen = window.innerWidth <= 768;
  //     setIsMobile(isMobileScreen);
  //   };

  //   checkScreenSize();
  //   window.addEventListener("resize", checkScreenSize);

  //   return () => window.removeEventListener("resize", checkScreenSize);
  // }, []);

  // Define name and split into first/last
  const firstName = "Andrew";
  const lastName = "Kolumbic";

  // Compute a stable randomized order for letters
  const randomizedOrder = useMemo(
    () => shuffleArray([...Array(firstName.length + lastName.length).keys()]),
    []
  );

  // Animation variants
  const letterVariants = useMemo(
    () => ({
      initial: { y: "-100vh", opacity: 0, rotateX: 5 },
      fallIn: (i: number) => ({
        y: [0, -8, 3, 0], // Subtle bounce
        opacity: 1,
        rotateX: [5, 0],
        scale: [1, 1.05, 0.98, 1], // Very subtle pulse
        transition: {
          delay: randomizedOrder[i] * 0.06,
          type: "spring",
          stiffness: 110,
          damping: 20,
        },
      }),
    }),
    [randomizedOrder]
  );

  // Get gradient colors for a letter based on its position using white-gray-blue spectrum
  const getGradientColors = () => {
    // White-gray-blue color palette with subtle yellow
    return {
      start: "#ffffff", // White
      midLight: "#e8f0fe", // Light blue-white
      mid: "#c2d7f0", // Light blue-gray
      midDark: "#90b4e5", // Medium blue
      end: "#64b5f6", // Brighter blue
      accent: "#fffde7", // Very subtle yellow tint
    };
  };

  // Create rolling wave animation for the entire name
  const letterAnimationProps = (isFirstName: boolean, index: number) => {
    const colors = getGradientColors();
    // Create a position-based effect that rolls across letters
    const letterPosition = isFirstName ? index : index + firstName.length;

    // Each letter animates with its own part of the wave
    // The delay is carefully calibrated to create a smooth flow
    const waveDelay = letterPosition * 0.25; // Reduced delay for more subtle transition

    return {
      style: {
        backgroundSize: "200% 100%",
        backgroundImage: `linear-gradient(
          to right,
          ${colors.start},
          ${colors.midLight},
          ${colors.mid},
          ${colors.midDark},
          ${colors.end},
          ${colors.accent}
        )`,
      },
      animate: {
        // Simple 2-position background shift (start to end)
        backgroundPosition: ["0% center", "100% center", "0% center"],
      },
      transition: {
        backgroundPosition: {
          duration: 14, // Slower animation cycle
          times: [0, 0.5, 1], // Better control of timing
          ease: "easeInOut",
          repeat: Infinity,
          delay: waveDelay, // This creates the wave effect
        },
      },
    };
  };

  // const scrollToAbout = () => {
  //   document.getElementById("about-section")?.scrollIntoView({
  //     behavior: "smooth",
  //   });
  // };

  if (!isClient) return null; // Prevents rendering until mounted

  return (
    <HeroContainer>
      <HeroContentWrapper>
        {/* Name Wrapper (Mobile: Stacks First/Last Name) */}
        <HeroTextWrapper>
          <FirstName>
            {firstName.split("").map((char, i) => (
              <LetterWrapper
                key={i}
                custom={i}
                initial="initial"
                animate="fallIn"
                variants={letterVariants}
                whileHover={{
                  scale: 1.08,
                  transition: { duration: 0.2 },
                  z: 10,
                }}
              >
                <GradientLetter {...letterAnimationProps(true, i)}>
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
                whileHover={{
                  scale: 1.08,
                  transition: { duration: 0.2 },
                  z: 10,
                }}
              >
                <GradientLetter {...letterAnimationProps(false, i)}>
                  {char}
                </GradientLetter>
              </LetterWrapper>
            ))}
          </LastName>
        </HeroTextWrapper>

        {/* Underline with enhanced animation */}
        <Underline
          initial={{ scaleX: 0, opacity: 0 }}
          animate={{ scaleX: 1, opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.8, ease: "easeOut" }}
        />

        {/* Subtext with improved styling and animation */}
        <SubtextWrapper>
          <SubtextLine
            initial={{ opacity: 0, y: 20 }}
            animate={{
              opacity: 1,
              y: 0,
              backgroundPosition: ["0% center", "100% center", "0% center"],
            }}
            transition={{
              opacity: { delay: 1.2, duration: 0.5 },
              y: { delay: 1.2, duration: 0.5 },
              backgroundPosition: {
                duration: 14,
                times: [0, 0.5, 1],
                ease: "easeInOut",
                repeat: Infinity,
                delay: 0.5,
              },
            }}
            style={{
              backgroundImage: `linear-gradient(
                to right,
                #ffffff,
                #e8f0fe,
                #c2d7f0,
                #90b4e5,
                #64b5f6,
                #fffde7
              )`,
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
