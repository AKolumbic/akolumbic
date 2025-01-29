// app/sections/HorizontalCarousel.tsx
"use client";
import React from "react";
import { useRef } from "react";
import RetroImageLoader from "../retroImageLoader";

export default function HorizontalCarousel() {
  /*
   * This is a conceptual “horizontal scroll” approach:
   *   1) A parent container with a fixed height
   *   2) A child container with display: flex, flex-direction: row
   *   3) Overflow-x: scroll to allow horizontal scrolling
   *
   * On desktop, the user can scroll horizontally or use a trackpad.
   * On mobile, they can swipe sideways.
   *
   * For super-smooth auto-snapping, you can use CSS scroll-snap.
   * Or advanced libraries (GSAP horizontal scroll).
   */

  const scrollRef = useRef<HTMLDivElement>(null);

  return (
    <section
      style={{
        // Give a bit of vertical space so the user sees new “section”
        minHeight: "80vh",
        marginTop: "4rem",
      }}
    >
      <h2 style={{ fontSize: "2rem", margin: "0 0 2rem 0", padding: "0 2rem" }}>
        My Projects
      </h2>

      {/* The horizontal scroll wrapper */}
      <div
        ref={scrollRef}
        style={{
          display: "flex",
          overflowX: "auto",
          scrollSnapType: "x mandatory", // enables snap
          scrollBehavior: "smooth", // smooth scrolling
        }}
      >
        {/* Each child is a "slide" or "card" representing a project */}
        <div
          style={{
            flex: "0 0 80vw", // each card is 80% of viewport width
            scrollSnapAlign: "start",
            marginRight: "2rem",
            border: "1px solid #444",
            padding: "1rem",
          }}
        >
          <h3>Project 1</h3>
          <RetroImageLoader />
        </div>

        <div
          style={{
            flex: "0 0 80vw",
            scrollSnapAlign: "start",
            marginRight: "2rem",
            border: "1px solid #444",
            padding: "1rem",
          }}
        >
          <h3>Project 2</h3>
          <p>Another project highlight</p>
        </div>

        <div
          style={{
            flex: "0 0 80vw",
            scrollSnapAlign: "start",
            marginRight: "2rem",
            border: "1px solid #444",
            padding: "1rem",
          }}
        >
          <h3>Project 3</h3>
          <p>More details here</p>
        </div>

        {/* ...Add as many slides as you want... */}
      </div>
    </section>
  );
}
