import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { fadeInUp } from "../data/variantsData";

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

  // /**
  //  * fadeInUp variants for Framer Motion animations.
  //  *
  //  * The content starts off hidden (with opacity 0 and moved 40px down) and
  //  * then fades in and moves upward into place. The delay can be customized via
  //  * the "custom" prop on the motion element.
  //  */
  // const fadeInUp = useMemo(
  //   () => ({
  //     hidden: { opacity: 0, y: 40 },
  //     visible: (delay = 0) => ({
  //       opacity: 1,
  //       y: 0,
  //       transition: { delay, duration: 0.8, ease: "easeOut" },
  //     }),
  //   }),
  //   []
  // );

  return (
    <motion.section
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      style={{
        backgroundColor: "#fff",
        color: "#000",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "'Times New Roman', serif",
        minHeight: "100vh",
        overflow: "hidden",
        padding: "5rem 2rem",
        textAlign: "center",
      }}
    >
      {/* Large Centered Quote */}
      <motion.p
        variants={fadeInUp}
        custom={0.2}
        style={{
          color: "#111",
          fontFamily: "'Times New Roman', serif",
          fontSize: "3rem",
          fontStyle: "italic",
          fontWeight: "bold",
          lineHeight: "1.4",
          marginBottom: "3rem",
          maxWidth: "900px",
        }}
      >
        “Do or do not, there is no try.”
      </motion.p>

      {/* Two-column layout */}
      <motion.div
        variants={fadeInUp}
        custom={0.4}
        style={{
          display: "flex",
          flexDirection: "row",
          flexWrap: "wrap",
          gap: "3rem",
          justifyContent: "center",
          alignItems: "flex-start",
          margin: "0 auto",
          maxWidth: "1100px",
          padding: "1rem",
          textAlign: "justify",
        }}
      >
        {/* Left Column - Bio */}
        <motion.div
          variants={fadeInUp}
          custom={0.6}
          style={{
            flex: 1,
            fontSize: "1.1rem",
            lineHeight: "1.8",
            minWidth: "320px",
          }}
        >
          <p>
            I’m <strong>Andrew Kolumbic</strong>, a{" "}
            <strong>Software Engineer</strong> with several years of experience
            in <strong>TypeScript, React, Angular, and Vue</strong>. I don’t
            just write code—I deliver results. I take a structured, disciplined
            approach to software development, treating every project with the
            precision and dedication it demands. Whether it’s modernizing
            applications, optimizing performance, or leading development teams
            under tight deadlines, I ensure the work gets done—and gets done
            well.
          </p>
          <div style={{ height: "20px" }} />
          <p>
            I believe in efficiency, clarity, and continuous improvement. I stay
            ahead of the curve by leveraging cutting-edge tools and AI-driven
            development like <strong>ChatGPT</strong> and{" "}
            <strong>GitHub Copilot</strong>, not as crutches, but as force
            multipliers to refine and accelerate workflows. Every project I take
            on is met with a commitment to excellence, ensuring that what I
            build is not just functional, but scalable, maintainable, and
            impactful.
          </p>
          <div style={{ height: "20px" }} />
          <p>
            I approach every challenge with a focus on execution, ensuring that
            ideas don’t just stay ideas—they become reality.
          </p>
        </motion.div>

        {/* Right Column - Skills */}
        <motion.div
          variants={fadeInUp}
          custom={0.8}
          style={{
            flex: 1,
            lineHeight: "1.8",
            minWidth: "320px",
          }}
        >
          <h3
            style={{
              borderBottom: "2px solid #000",
              fontSize: "1.6rem",
              fontWeight: "bold",
              marginBottom: "1rem",
              paddingBottom: "0.4rem",
              textAlign: "center",
            }}
          >
            Key Expertise
          </h3>
          <ul
            style={{
              fontSize: "1.1rem",
              flex: 1,
              lineHeight: "1.8",
              listStyleType: "none",
              margin: "0 auto",
              maxWidth: "90%",
              padding: 0,
            }}
          >
            <li>• TypeScript, JavaScript (ES6+), Python</li>
            <li>• React, Angular, Vue, Next.js</li>
            <li>• Node.js, Express.js</li>
            <li>• React Native, Ionic Framework</li>
            <li>• Jest, Mocha, Playwright</li>
            <li>• Generative AI: ChatGPT, GitHub Copilot</li>
            <li>• Agile, Scrum, Kanban</li>
          </ul>
        </motion.div>
      </motion.div>

      {/* Responsive behavior: Single column on smaller screens */}
      <style>
        {`
          @media (max-width: 768px) {
            div {
              flex-direction: column;
              padding: 1rem;
              text-align: center;
            }
            ul {
              margin: 0 auto;
              text-align: left;
            }
          }
        `}
      </style>
    </motion.section>
  );
};

export default React.memo(AboutMe);
