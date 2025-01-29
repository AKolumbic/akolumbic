import React from "react";

export default function AboutMe() {
  return (
    <section
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        padding: "4rem 2rem",
        fontFamily: "'Times New Roman', serif",
        backgroundColor: "#fff",
        color: "#000",
        borderTop: "8px solid #000", // Thick top border for contrast
      }}
    >
      {/* Title Section */}
      <div
        style={{
          textAlign: "center",
          marginBottom: "3rem",
        }}
      >
        <h2
          style={{
            fontSize: "2.8rem",
            textTransform: "uppercase",
            fontWeight: "bold",
            letterSpacing: "2px",
            marginBottom: "0.5rem",
          }}
        >
          About Andrew Kolumbic
        </h2>
        <p
          style={{
            fontSize: "1.2rem",
            fontStyle: "italic",
            color: "#333",
            maxWidth: "700px",
            margin: "0 auto",
          }}
        >
          “Do or do not, there is no try.”
        </p>
      </div>

      {/* Two-column layout */}
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "flex-start",
          gap: "3rem",
          maxWidth: "1000px",
          margin: "0 auto",
          padding: "1rem",
          borderTop: "2px solid #000",
          flexWrap: "wrap", // ✅ Ensures it wraps on smaller screens
        }}
      >
        {/* Left Column - Bio */}
        <div
          style={{
            flex: 1,
            minWidth: "280px",
            textAlign: "justify",
            lineHeight: "1.8",
          }}
        >
          <p>
            <strong>San Pedro, CA.</strong> I’m Andrew Kolumbic, a{" "}
            <strong>Software Engineer </strong>
            with six years of experience in{" "}
            <strong>TypeScript, React, and Angular</strong>. I don’t just write
            code—I deliver results. I take a structured, disciplined approach to
            software development, treating every project with the precision and
            dedication it demands. Whether it’s modernizing applications,
            optimizing performance, or leading development teams under tight
            deadlines, I ensure the work gets done—and gets done well.
          </p>
          <div style={{ height: "15px" }} />
          <p>
            I believe in efficiency, clarity, and continuous improvement. I stay
            ahead of the curve by leveraging cutting-edge tools and AI-driven
            development like <strong>ChatGPT</strong> and
            <strong>GitHub Copilot</strong>, not as crutches, but as force
            multipliers to refine and accelerate workflows. Every project I take
            on is met with a commitment to excellence, ensuring that what I
            build is not just functional, but scalable, maintainable, and
            impactful.
          </p>
          <p>
            I approach every challenge with a focus on execution, ensuring that
            ideas don’t just stay ideas—they become reality.
          </p>
        </div>

        {/* Right Column - Skills */}
        <div
          style={{
            flex: 1,
            minWidth: "280px", // ✅ Prevents text from getting cut off
            textAlign: "justify",
            lineHeight: "1.8",
          }}
        >
          <h3
            style={{
              fontSize: "1.5rem",
              fontWeight: "bold",
              marginBottom: "0.8rem",
              borderBottom: "1px solid #000",
              paddingBottom: "0.3rem",
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
              fontSize: "1rem",
              lineHeight: "1.7",
              maxWidth: "90%", // ✅ Ensures the list stays inside the column
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
        </div>
      </div>

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
              text-align: left; // ✅ Keeps list readable
              margin: 0 auto;
            }
          }
        `}
      </style>
    </section>
  );
}
