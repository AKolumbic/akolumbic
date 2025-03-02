import React, { useEffect, useState, useRef } from "react";
import { AnimatePresence } from "framer-motion";
import {
  AboutSection,
  Quote,
  ContentContainer,
  BioColumn,
  SkillsColumn,
  SkillsHeading,
  SkillsList,
  SkillItem,
  ContentWrapper,
  SectionTitle,
  ResumeButtonContainer,
  Tooltip,
  TooltipContent,
  ExternalLink,
} from "../styles/AboutMe.styles";
import {
  aboutContainerVariants,
  aboutItemVariants,
} from "../data/variantsData";
import { skills } from "../data/skillsData";
import TactileButton from "../components/tactile-button/tactile-button.component";
import { FiDownload, FiExternalLink } from "react-icons/fi";

/**
 * AboutMe Component
 *
 * Renders the About Me section for the portfolio. This section displays a
 * large centered quote along with a two-column layout that shows a short bio
 * on the left and a list of key expertise on the right.
 *
 * Features modern Apple/OpenAI-inspired design with glass morphism, gradient
 * background, and smooth animations.
 *
 * @returns {JSX.Element} The rendered AboutMe section.
 */
const AboutMe: React.FC = () => {
  // Load the SF Pro Display font dynamically
  useEffect(() => {
    const link = document.createElement("link");
    link.href = "https://fonts.cdnfonts.com/css/sf-pro-display";
    link.rel = "stylesheet";
    document.head.appendChild(link);

    return () => {
      document.head.removeChild(link);
    };
  }, []);

  // State to track which tooltip is currently shown
  const [activeTooltip, setActiveTooltip] = useState<number | null>(null);

  // Track if we're hovering over the tooltip
  const [hoveringTooltip, setHoveringTooltip] = useState(false);

  // Store refs for each skill item to position tooltips
  const skillRefs = useRef<(HTMLLIElement | null)[]>([]);

  // Effect to initialize refs array and handle window blur
  useEffect(() => {
    skillRefs.current = skillRefs.current.slice(0, skills.length);

    // Handle window blur (user switches windows/tabs)
    const handleWindowBlur = () => {
      setActiveTooltip(null);
      setHoveringTooltip(false);
    };

    // Handle mouse leave from document
    const handleDocumentMouseLeave = (e: MouseEvent) => {
      if (
        e.clientY <= 0 ||
        e.clientX <= 0 ||
        e.clientX >= window.innerWidth ||
        e.clientY >= window.innerHeight
      ) {
        setActiveTooltip(null);
        setHoveringTooltip(false);
      }
    };

    window.addEventListener("blur", handleWindowBlur);
    document.addEventListener("mouseleave", handleDocumentMouseLeave);

    return () => {
      window.removeEventListener("blur", handleWindowBlur);
      document.removeEventListener("mouseleave", handleDocumentMouseLeave);
      // Clean up tooltip state on unmount
      setActiveTooltip(null);
      setHoveringTooltip(false);
    };
  }, [skills.length]);

  // Handler for tooltip hover
  const handleTooltipHover = (isHovering: boolean) => {
    setHoveringTooltip(isHovering);
    if (!isHovering) {
      // Add a small delay before hiding the tooltip to prevent flickering
      setTimeout(() => {
        setActiveTooltip(null);
      }, 100);
    }
  };

  // Handler for skill item hover
  const handleSkillHover = (index: number, isHovering: boolean) => {
    if (isHovering) {
      setActiveTooltip(index);
      setHoveringTooltip(false);
    } else {
      // Only hide the tooltip if we're not hovering over it
      if (!hoveringTooltip) {
        // Add a small delay before hiding the tooltip to prevent flickering
        setTimeout(() => {
          setActiveTooltip(null);
        }, 100);
      }
    }
  };

  return (
    <AboutSection
      id="about-section"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      variants={aboutContainerVariants}
    >
      <ContentWrapper>
        {/* Large Centered Quote */}
        <Quote variants={aboutItemVariants}>
          <span>Do or do not,</span> there is no try.
        </Quote>

        {/* Two-column layout */}
        <ContentContainer variants={aboutContainerVariants}>
          {/* Left Column - Bio */}
          <BioColumn
            variants={aboutItemVariants}
            whileHover={{ y: -5, transition: { duration: 0.3 } }}
          >
            <SectionTitle variants={aboutItemVariants}>About Me</SectionTitle>
            <p>
              I&apos;m <strong>Andrew Kolumbic</strong>, a{" "}
              <strong>Software Engineer</strong> with several years of
              experience in <strong>TypeScript, React, Angular, and Vue</strong>
              . I don&apos;t just write code—I deliver results. I take a
              structured, disciplined approach to software development, treating
              every project with the precision and dedication it demands.
            </p>
            <p>
              I believe in efficiency, clarity, and continuous improvement. I
              stay ahead of the curve by leveraging cutting-edge tools and
              AI-driven development like <strong>Cursor</strong> and{" "}
              <strong>ChatGPT</strong>, not as crutches, but as force
              multipliers to refine and accelerate workflows.
            </p>
            <p>
              I approach every challenge with a focus on execution, ensuring
              that ideas don&apos;t just stay ideas—they become reality.
            </p>

            {/* Resume Download Button */}
            <ResumeButtonContainer
              variants={aboutItemVariants}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <TactileButton
                href="/Andrew Kolumbic - Resume.docx"
                download="Andrew Kolumbic - Resume.docx"
              >
                <FiDownload style={{ marginRight: "8px" }} /> Download Resume
              </TactileButton>
            </ResumeButtonContainer>
          </BioColumn>

          {/* Right Column - Skills */}
          <SkillsColumn
            variants={aboutItemVariants}
            whileHover={{ y: -5, transition: { duration: 0.3 } }}
          >
            <SkillsHeading variants={aboutItemVariants}>
              Key Expertise
            </SkillsHeading>
            <SkillsList variants={aboutContainerVariants}>
              {skills.map((skill, index) => (
                <SkillItem
                  key={index}
                  variants={aboutItemVariants}
                  custom={index}
                  ref={(el) => {
                    skillRefs.current[index] = el;
                    return undefined;
                  }}
                  onHoverStart={() => handleSkillHover(index, true)}
                  onHoverEnd={() => handleSkillHover(index, false)}
                  whileHover={{
                    x: 5,
                    backgroundColor: "rgba(255, 255, 255, 0.05)",
                    boxShadow: "0 2px 10px rgba(100, 181, 246, 0.1)",
                    borderLeftColor: "rgba(100, 181, 246, 1)",
                    transition: {
                      type: "spring",
                      stiffness: 400,
                      damping: 20,
                      backgroundColor: { duration: 0.3, ease: "easeOut" },
                      boxShadow: { duration: 0.3, ease: "easeOut" },
                      borderLeftColor: { duration: 0.3, ease: "easeOut" },
                    },
                  }}
                >
                  {skill.title}
                </SkillItem>
              ))}
            </SkillsList>

            {/* Position tooltip near the active skill item */}
            <AnimatePresence>
              {activeTooltip !== null && skillRefs.current[activeTooltip] && (
                <Tooltip
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                  onHoverStart={() => handleTooltipHover(true)}
                  onHoverEnd={() => handleTooltipHover(false)}
                  style={{
                    position: "absolute",
                    top: `${
                      skillRefs.current[activeTooltip]?.offsetTop || 0
                    }px`,
                    left: `${
                      (skillRefs.current[activeTooltip]?.offsetWidth || 0) - 100
                    }px`,
                    pointerEvents: "auto", // Make tooltip interactive
                  }}
                >
                  <TooltipContent>
                    <div
                      style={{
                        fontWeight: "bold",
                        marginBottom: "8px",
                        color: "#64b5f6",
                      }}
                    >
                      {skills[activeTooltip].title}
                    </div>
                    <p>{skills[activeTooltip].description}</p>
                    <div style={{ marginTop: "10px" }}>
                      {skills[activeTooltip].links.map((link, linkIndex) => (
                        <ExternalLink
                          key={linkIndex}
                          href={link.url}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {link.name} <FiExternalLink size={12} />
                        </ExternalLink>
                      ))}
                    </div>
                  </TooltipContent>
                </Tooltip>
              )}
            </AnimatePresence>
          </SkillsColumn>
        </ContentContainer>
      </ContentWrapper>
    </AboutSection>
  );
};

export default React.memo(AboutMe);
