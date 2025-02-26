import React, { useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import styled from "styled-components";
import {
  fadeInUp,
  staggeredFadeInVariants,
  blurInVariants,
} from "../data/variantsData";

// Styled Components
const AboutSection = styled(motion.section)`
  background: linear-gradient(to bottom, #ffffff, #f8f8f8);
  color: #000;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-family: "Segoe UI", "Roboto", sans-serif;
  min-height: 100vh;
  overflow: hidden;
  padding: 5rem 2rem;
  text-align: center;
  position: relative;
`;

const Quote = styled(motion.p)`
  color: #111;
  font-family: "Michroma", sans-serif;
  font-size: clamp(1.5rem, 5vw, 3rem);
  font-style: italic;
  font-weight: bold;
  line-height: 1.4;
  margin-bottom: 3rem;
  max-width: 900px;

  &::before,
  &::after {
    content: '"';
    color: #888;
    font-size: 1.2em;
  }
`;

const ContentContainer = styled(motion.div)`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 3rem;
  justify-content: center;
  align-items: flex-start;
  margin: 0 auto;
  max-width: 1100px;
  padding: 1rem;
  text-align: justify;

  @media (max-width: 768px) {
    flex-direction: column;
    padding: 1rem;
    text-align: center;
  }
`;

const BioColumn = styled(motion.div)`
  flex: 1;
  font-size: 1.1rem;
  line-height: 1.8;
  min-width: 320px;

  p {
    margin-bottom: 1.5rem;
  }

  strong {
    color: #333;
    font-weight: 600;
  }
`;

const SkillsColumn = styled(motion.div)`
  flex: 1;
  line-height: 1.8;
  min-width: 320px;
  position: relative;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: -20px;
    width: 3px;
    height: 100%;
    background: linear-gradient(to bottom, transparent, #333, transparent);

    @media (max-width: 768px) {
      display: none;
    }
  }
`;

const SkillsHeading = styled.h3`
  border-bottom: 2px solid #000;
  font-family: "Michroma", sans-serif;
  font-size: 1.6rem;
  font-weight: bold;
  margin-bottom: 1.5rem;
  padding-bottom: 0.4rem;
  text-align: center;
`;

const SkillsList = styled.ul`
  font-size: 1.1rem;
  flex: 1;
  line-height: 1.8;
  list-style-type: none;
  margin: 0 auto;
  max-width: 90%;
  padding: 0;

  @media (max-width: 768px) {
    text-align: left;
  }
`;

const SkillItem = styled(motion.li)`
  display: flex;
  align-items: center;
  margin-bottom: 0.8rem;
  transition: transform 0.2s ease;

  &:hover {
    transform: translateX(5px);
  }

  &::before {
    content: "•";
    color: #555;
    margin-right: 10px;
    font-size: 1.2em;
  }
`;

const BackgroundShape = styled(motion.div)`
  position: absolute;
  background: rgba(0, 0, 0, 0.03);
  border-radius: 50%;
  width: 300px;
  height: 300px;
  z-index: 0;
`;

/**
 * AboutMe Component
 *
 * Renders the About Me section for the portfolio. This section displays a
 * large centered quote along with a two-column layout that shows a short bio
 * on the left and a list of key expertise on the right.
 *
 * The component dynamically loads the Michroma font (if not already loaded)
 * and animates its content with a fade in/up effect using Framer Motion.
 *
 * @returns {JSX.Element} The rendered AboutMe section.
 *
 * @example
 * <AboutMe />
 */
const AboutMe: React.FC = () => {
  // Load the Michroma font dynamically (if not already loaded)
  useEffect(() => {
    const existingFontLink = document.head.querySelector(
      "link[href*='Michroma']"
    );
    if (existingFontLink) return;

    const fontLink = document.createElement("link");
    fontLink.href =
      "https://fonts.googleapis.com/css2?family=Michroma&display=swap";
    fontLink.rel = "stylesheet";
    document.head.appendChild(fontLink);
  }, []);

  // Parallax scroll effect
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], [0, -50]);

  const skills = [
    "TypeScript, JavaScript (ES6+), Python",
    "React, Angular, Vue, Next.js",
    "Node.js, Express.js",
    "React Native, Ionic Framework",
    "Jest, Mocha, Playwright",
    "Generative AI: ChatGPT, GitHub Copilot",
    "Agile, Scrum, Kanban",
  ];

  return (
    <AboutSection
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
    >
      {/* Background decorative shapes */}
      <BackgroundShape
        style={{ top: "10%", left: "5%", opacity: 0.5 }}
        animate={{
          scale: [1, 1.2, 1],
          rotate: [0, 180, 360],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
      />
      <BackgroundShape
        style={{ bottom: "10%", right: "5%", opacity: 0.5 }}
        animate={{
          scale: [1.2, 1, 1.2],
          rotate: [360, 180, 0],
          opacity: [0.5, 0.3, 0.5],
        }}
        transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
      />

      {/* Large Centered Quote */}
      <Quote variants={blurInVariants} style={{ y }}>
        Do or do not, there is no try.
      </Quote>

      {/* Two-column layout */}
      <ContentContainer variants={fadeInUp} custom={0.4}>
        {/* Left Column - Bio */}
        <BioColumn variants={fadeInUp} custom={0.6}>
          <p>
            I&apos;m <strong>Andrew Kolumbic</strong>, a{" "}
            <strong>Software Engineer</strong> with several years of experience
            in <strong>TypeScript, React, Angular, and Vue</strong>. I
            don&apos;t just write code—I deliver results. I take a structured,
            disciplined approach to software development, treating every project
            with the precision and dedication it demands.
          </p>
          <p>
            I believe in efficiency, clarity, and continuous improvement. I stay
            ahead of the curve by leveraging cutting-edge tools and AI-driven
            development like <strong>ChatGPT</strong> and{" "}
            <strong>GitHub Copilot</strong>, not as crutches, but as force
            multipliers to refine and accelerate workflows.
          </p>
          <p>
            I approach every challenge with a focus on execution, ensuring that
            ideas don&apos;t just stay ideas—they become reality.
          </p>
        </BioColumn>

        {/* Right Column - Skills */}
        <SkillsColumn variants={fadeInUp} custom={0.8}>
          <SkillsHeading>Key Expertise</SkillsHeading>
          <SkillsList>
            {skills.map((skill, index) => (
              <SkillItem
                key={index}
                variants={staggeredFadeInVariants}
                custom={index}
                whileHover={{ x: 10, transition: { duration: 0.2 } }}
              >
                {skill}
              </SkillItem>
            ))}
          </SkillsList>
        </SkillsColumn>
      </ContentContainer>
    </AboutSection>
  );
};

export default React.memo(AboutMe);
