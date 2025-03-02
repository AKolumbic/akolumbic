"use client";

import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { BackgroundProps } from "./types";
import FallbackBackground from "./FallbackBackground";

// Helper function to detect WebGL support
const detectWebGLSupport = () => {
  try {
    // Only run this check on the client side
    if (typeof window === "undefined") return null;

    const canvas = document.createElement("canvas");
    const hasWebGL = !!(
      window.WebGLRenderingContext &&
      (canvas.getContext("webgl") || canvas.getContext("experimental-webgl"))
    );

    console.log(
      `ClientBackgrounds: WebGL support detection result: ${
        hasWebGL ? "yes" : "no"
      }`
    );
    return hasWebGL;
  } catch (e) {
    console.warn("WebGL not supported:", e);
    return false;
  }
};

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

// WebGL check wrapper component
const WebGLChecker: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [webGLSupported, setWebGLSupported] = useState<boolean | null>(null);

  useEffect(() => {
    setWebGLSupported(detectWebGLSupport());
  }, []);

  // Show static fallback if WebGL is not supported
  if (webGLSupported === false) {
    console.warn(
      "WebGL is not supported in this browser or environment, using fallback"
    );
    return (
      <FallbackBackground
        colors={{ sunset: "#1A1A1A", ocean: "#0D1B2A", sky: "#1B263B" }}
      />
    );
  }

  // Show loading state while checking
  if (webGLSupported === null) {
    return <LoadingBackground />;
  }

  // WebGL is supported, render children
  return <>{children}</>;
};

// Dynamic imports for backgrounds
const DynamicMainBackground = dynamic<BackgroundProps>(
  () =>
    import("./MainBackground").catch((error) => {
      console.error("Failed to load MainBackground:", error);
      return Promise.resolve(() => (
        <FallbackBackground
          colors={{ sunset: "#1A1A1A", ocean: "#0D1B2A", sky: "#1B263B" }}
        />
      ));
    }),
  {
    ssr: false,
    loading: () => <LoadingBackground />,
  }
);

const DynamicBeachBackground = dynamic<BackgroundProps>(
  () =>
    import("./BeachBackground").catch((error) => {
      console.error("Failed to load BeachBackground:", error);
      return Promise.resolve(() => (
        <FallbackBackground colors={{ sea: "#01688D", sand: "#E2D7D6" }} />
      ));
    }),
  {
    ssr: false,
    loading: () => <LoadingBackground />,
  }
);

const DynamicSunsetBackground = dynamic<BackgroundProps>(
  () =>
    import("./SunsetBackground").catch((error) => {
      console.error("Failed to load SunsetBackground:", error);
      return Promise.resolve(() => (
        <FallbackBackground
          colors={{ night: "#000000", orange: "#ff9800", yellow: "#ffd740" }}
        />
      ));
    }),
  {
    ssr: false,
    loading: () => <LoadingBackground />,
  }
);

const DynamicCaliforniaThreeJSBackground = dynamic<BackgroundProps>(
  () =>
    import("./CaliforniaThreeJSBackground").catch((error) => {
      console.error("Failed to load CaliforniaThreeJSBackground:", error);
      return Promise.resolve(() => (
        <FallbackBackground
          colors={{ goldenState: "#FFD700", poppy: "#FF6D00" }}
        />
      ));
    }),
  {
    ssr: false,
    loading: () => <LoadingBackground />,
  }
);

// Wrapper components that check for WebGL support before rendering Three.js backgrounds
export const MainBackground: React.FC<BackgroundProps> = (props) => (
  <WebGLChecker>
    <DynamicMainBackground {...props} />
  </WebGLChecker>
);

// Beach background doesn't use Three.js, so no need for WebGL check
export const BeachBackground: React.FC<BackgroundProps> = (props) => (
  <DynamicBeachBackground {...props} />
);

// Sunset background doesn't use Three.js, so no need for WebGL check
export const SunsetBackground: React.FC<BackgroundProps> = (props) => (
  <DynamicSunsetBackground {...props} />
);

// California background uses Three.js, so we need WebGL check
export const CaliforniaThreeJSBackground: React.FC<BackgroundProps> = (
  props
) => (
  <WebGLChecker>
    <DynamicCaliforniaThreeJSBackground {...props} />
  </WebGLChecker>
);
