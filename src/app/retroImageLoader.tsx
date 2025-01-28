"use client";

import React, { useEffect, useState, useRef } from "react";
import Image from "next/image";

export default function RetroImageLoader() {
  const totalLines = 30;
  const [linesLoaded, setLinesLoaded] = useState(0);

  // We'll store the current timer ID in a ref, so we can clear it if unmounting
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    let currentLine = 0;

    function loadLine() {
      // Update state to reveal one more line
      setLinesLoaded(currentLine);

      currentLine++;
      if (currentLine <= totalLines) {
        // Our stutter range is between 300ms and 600ms
        const randomDelay = 300 + Math.random() * 300;
        timerRef.current = setTimeout(loadLine, randomDelay);
      }
    }

    loadLine();

    // Cleanup function runs if component unmounts
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, [totalLines]);

  // Convert linesLoaded -> [0..100] for clip path
  const revealPercentage = (linesLoaded / totalLines) * 100;

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        backgroundColor: "#000",
      }}
    >
      <div
        style={{
          position: "relative",
          width: "80vw",
          maxWidth: "600px",
          aspectRatio: "4 / 3",
          overflow: "hidden",
          border: "2px solid #333",
          background: "#222",
        }}
      >
        <Image
          src="/globe.svg" // Replace with your actual image
          alt="Retro loading simulation"
          fill
          style={{
            objectFit: "cover",
            clipPath: `inset(0 0 ${100 - revealPercentage}% 0)`,
            transition: "clip-path 0.3s linear",
          }}
        />
        {linesLoaded < totalLines && (
          <div
            style={{
              position: "absolute",
              bottom: 0,
              left: 0,
              width: "100%",
              background: "#444",
              color: "#eee",
              textAlign: "center",
              fontFamily: "monospace",
              padding: "4px",
              fontSize: "0.8rem",
            }}
          >
            Loading...
          </div>
        )}
      </div>
    </div>
  );
}
