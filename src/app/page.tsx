// app/page.tsx
"use client";
import React from "react";
import HeroSection from "./sections/HeroSection";
import AboutMe from "./sections/AboutMe";
import HorizontalCarousel from "./sections/HorizontalCarousel";

export default function HomePage() {
  return (
    <>
      {/* Hero fills the first viewport */}
      <HeroSection />

      {/* Standard vertical scrolling reveals “About Me” */}
      <AboutMe />

      {/* Horizontal scrolling “carousel” style section */}
      <HorizontalCarousel />
    </>
  );
}
