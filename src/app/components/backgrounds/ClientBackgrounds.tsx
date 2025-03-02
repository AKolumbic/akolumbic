"use client";

import React from "react";
import dynamic from "next/dynamic";
import { BackgroundProps } from "./types";
import FallbackBackground from "./FallbackBackground";

// Loading component while the backgrounds are loading
const LoadingBackground: React.FC = () => (
  <div
    style={{
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      background: "#1A1A1A",
    }}
  />
);

// Client-side only dynamic imports of all background components with fallback
export const MainBackground = dynamic<BackgroundProps>(
  () =>
    import("./MainBackground").catch(() =>
      Promise.resolve(() => (
        <FallbackBackground
          colors={{ sunset: "#1A1A1A", ocean: "#0D1B2A", sky: "#1B263B" }}
        />
      ))
    ),
  {
    ssr: false,
    loading: () => <LoadingBackground />,
  }
);

export const BeachBackground = dynamic<BackgroundProps>(
  () =>
    import("./BeachBackground").catch(() =>
      Promise.resolve(() => (
        <FallbackBackground colors={{ sea: "#01688D", sand: "#E2D7D6" }} />
      ))
    ),
  {
    ssr: false,
    loading: () => <LoadingBackground />,
  }
);

export const SunsetBackground = dynamic<BackgroundProps>(
  () =>
    import("./SunsetBackground").catch(() =>
      Promise.resolve(() => (
        <FallbackBackground
          colors={{ night: "#000000", orange: "#ff9800", yellow: "#ffd740" }}
        />
      ))
    ),
  {
    ssr: false,
    loading: () => <LoadingBackground />,
  }
);

export const CaliforniaThreeJSBackground = dynamic<BackgroundProps>(
  () =>
    import("./CaliforniaThreeJSBackground").catch(() =>
      Promise.resolve(() => (
        <FallbackBackground
          colors={{ goldenState: "#FFD700", poppy: "#FF6D00" }}
        />
      ))
    ),
  {
    ssr: false,
    loading: () => <LoadingBackground />,
  }
);
