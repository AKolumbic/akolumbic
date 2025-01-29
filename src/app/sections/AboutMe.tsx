// app/sections/AboutMe.tsx

import React from "react";

export default function AboutMe() {
  // This would be your personal bio or summary.
  // We can keep the styling minimal with some margin/padding.
  return (
    <section
      style={{
        minHeight: "70vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        padding: "3rem",
      }}
    >
      <h2
        style={{
          fontSize: "2rem",
          marginBottom: "1rem",
        }}
      >
        About Me
      </h2>
      <p
        style={{
          lineHeight: 1.6,
          maxWidth: "600px",
        }}
      >
        I’m Andrew Kolumbic, a passionate developer with a focus on [describe
        specialty], driven by creating interactive experiences and pushing the
        boundaries of what’s possible on the web.
      </p>
    </section>
  );
}
