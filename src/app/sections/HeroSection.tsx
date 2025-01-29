import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

export default function HeroSection() {
  // Mouse position state
  const [mouseX, setMouseX] = useState(0);
  const [mouseY, setMouseY] = useState(0);

  // Load font dynamically (Only on the client side)
  useEffect(() => {
    if (typeof document !== "undefined") {
      const fontLink = document.createElement("link");
      fontLink.href =
        "https://fonts.googleapis.com/css2?family=Michroma&display=swap";
      fontLink.rel = "stylesheet";
      document.head.appendChild(fontLink);
    }
  }, []);

  // Update mouse position on move
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMouseX((e.clientX / window.innerWidth - 0.5) * 50);
      setMouseY((e.clientY / window.innerHeight - 0.5) * 50);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // Handle touch movement for mobile
  useEffect(() => {
    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        const touch = e.touches[0];
        setMouseX((touch.clientX / window.innerWidth - 0.5) * 50);
        setMouseY((touch.clientY / window.innerHeight - 0.5) * 50);
      }
    };

    window.addEventListener("touchmove", handleTouchMove);
    return () => window.removeEventListener("touchmove", handleTouchMove);
  }, []);

  return (
    <motion.section
      initial={{ opacity: 0, scale: 0.8, y: -50 }}
      animate={{ opacity: 1, scale: 1.05, y: 0 }}
      transition={{
        duration: 1,
        ease: "easeOut",
        type: "spring",
        stiffness: 120,
      }}
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        overflow: "hidden",
        backgroundColor: "#000",
      }}
    >
      <motion.h1
        style={{
          fontSize: "5rem",
          fontWeight: "bold",
          textAlign: "center",
          margin: 0,
          textTransform: "uppercase",
          //   color: "#00FF00",
          fontFamily: "'Michroma', sans-serif",
          letterSpacing: "4px",
          //   textShadow: "0px 0px 10px #00FF00, 0px 0px 20px #007700",
        }}
        animate={{ x: mouseX, y: mouseY }}
        transition={{ type: "spring", stiffness: 80, damping: 8 }}
      >
        Andrew Kolumbic
      </motion.h1>
    </motion.section>
  );
}
