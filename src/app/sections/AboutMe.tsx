import React, { useEffect } from "react";
import { motion } from "framer-motion";

export default function AboutMe() {
  // Load Michroma font dynamically (if not already loaded)
  useEffect(() => {
    if (document.head.querySelector("link[href*='Michroma']")) return;

    const fontLink = document.createElement("link");
    fontLink.href =
      "https://fonts.googleapis.com/css2?family=Michroma&display=swap";
    fontLink.rel = "stylesheet";
    document.head.appendChild(fontLink);
  }, []);

  // Animation Variants
  const fadeInUp = {
    hidden: { opacity: 0, y: 40 },
    visible: (delay = 0) => ({
      opacity: 1,
      y: 0,
      transition: { delay, duration: 0.8, ease: "easeOut" },
    }),
  };

  return (
    <motion.section
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        padding: "5rem 2rem",
        fontFamily: "'Times New Roman', serif",
        backgroundColor: "#fff",
        color: "#000",
        textAlign: "center",
        overflow: "hidden",
      }}
    >
      {/* Large Centered Quote */}
      <motion.p
        variants={fadeInUp}
        custom={0.2}
        style={{
          fontSize: "3rem",
          fontWeight: "bold",
          fontStyle: "italic",
          color: "#111",
          maxWidth: "900px",
          marginBottom: "3rem",
          lineHeight: "1.4",
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
          justifyContent: "center",
          alignItems: "flex-start",
          gap: "3rem",
          maxWidth: "1100px",
          margin: "0 auto",
          padding: "1rem",
          flexWrap: "wrap",
          textAlign: "justify",
        }}
      >
        {/* Left Column - Bio */}
        <motion.div
          variants={fadeInUp}
          custom={0.6}
          style={{
            flex: 1,
            minWidth: "320px",
            lineHeight: "1.8",
            fontSize: "1.1rem",
          }}
        >
          <p>
            I’m <strong>Andrew Kolumbic</strong>, a{" "}
            <strong>Software Engineer </strong>
            with several years of experience in{" "}
            <strong>TypeScript, React, Angular, and Vue</strong>. I don’t just
            write code—I deliver results. I take a structured, disciplined
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
            minWidth: "320px",
            lineHeight: "1.8",
          }}
        >
          <h3
            style={{
              fontSize: "1.6rem",
              fontWeight: "bold",
              marginBottom: "1rem",
              borderBottom: "2px solid #000",
              paddingBottom: "0.4rem",
              textAlign: "center",
            }}
          >
            Key Expertise
          </h3>
          <ul
            style={{
              listStyleType: "none",
              padding: 0,
              margin: "0 auto",
              fontSize: "1.1rem",
              lineHeight: "1.8",
              maxWidth: "90%",
            }}
          >
            <li>• TypeScript, JavaScript (ES6+), Python</li>
            <li>• React, Angular, Vue</li>
            <li>• Node.js, Express.js</li>
            <li>• React Native, Ionic Framework</li>
            <li>• Jest, Mocha, Playwright</li>
            <li>• Generative AI: ChatGPT, GitHub Copilot</li>
            <li>• Agile, Scrum, Kanban</li>
          </ul>
        </motion.div>
      </motion.div>

      {/* Responsive behavior - Single column on smaller screens */}
      <style>
        {`
          @media (max-width: 768px) {
            div {
              flex-direction: column;
              text-align: center;
              padding: 1rem;
            }
            ul {
              text-align: left;
              margin: 0 auto;
            }
          }
        `}
      </style>
    </motion.section>
  );
}
