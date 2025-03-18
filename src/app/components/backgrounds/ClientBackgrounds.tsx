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

// Dynamic imports for backgrounds
const DynamicNightSkyBackground = dynamic<BackgroundProps>(
  () =>
    import("./NightSkyBackground").catch((error) => {
      console.error("Failed to load NightSkyBackground:", error);
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

const DynamicBlackHoleBackground = dynamic<BackgroundProps>(
  () =>
    import("./BlackHoleBackground").catch((error) => {
      console.error("Failed to load BlackHoleBackground:", error);
      return Promise.resolve(() => (
        <FallbackBackground colors={{ background: "#000000" }} />
      ));
    }),
  {
    ssr: false,
    loading: () => <LoadingBackground />,
  }
);

// Dynamic Digital Rain Background
const DynamicDigitalRainBackground = dynamic<BackgroundProps>(
  () =>
    import("./DigitalRainBackground").catch((error) => {
      console.error("Failed to load DigitalRainBackground:", error);
      return Promise.resolve(() => (
        <FallbackBackground
          colors={{
            primary: "#00FF41",
            background: "#011401",
            accent: "#00CC33",
          }}
        />
      ));
    }),
  {
    ssr: false,
    loading: () => <LoadingBackground />,
  }
);

// HAL 9000 Background
const DynamicHal9000Background = dynamic<BackgroundProps>(
  () =>
    import("./Hal9000Background").catch((error) => {
      console.error("Failed to load Hal9000Background:", error);
      return Promise.resolve(() => (
        <FallbackBackground
          colors={{
            eye: "#FF0000",
            background: "#000000",
            accent: "#FF3333",
          }}
        />
      ));
    }),
  {
    ssr: false,
    loading: () => <LoadingBackground />,
  }
);

// Aurora Background
/*
const DynamicAuroraBackground = dynamic<BackgroundProps>(
  () =>
    import("./AuroraBackground").catch((error) => {
      console.error("Failed to load AuroraBackground:", error);
      return Promise.resolve(() => (
        <FallbackBackground
          colors={{
            background: "#020510",
            aurora: "#3366FF",
            accent: "#00CCFF",
          }}
        />
      ));
    }),
  {
    ssr: false,
    loading: () => <LoadingBackground />,
  }
);
*/

// Simple component exports
export const NightSkyBackground: React.FC<BackgroundProps> = (props) => (
  <DynamicNightSkyBackground {...props} />
);

export const BeachBackground: React.FC<BackgroundProps> = (props) => (
  <DynamicBeachBackground {...props} />
);

export const SunsetBackground: React.FC<BackgroundProps> = (props) => (
  <DynamicSunsetBackground {...props} />
);

export const BlackHoleBackground: React.FC<BackgroundProps> = (props) => (
  <DynamicBlackHoleBackground {...props} />
);

export const DigitalRainBackground: React.FC<BackgroundProps> = (props) => (
  <DynamicDigitalRainBackground {...props} />
);

export const Hal9000Background: React.FC<BackgroundProps> = (props) => (
  <DynamicHal9000Background {...props} />
);

/*
export const AuroraBackground: React.FC<BackgroundProps> = (props) => (
  <DynamicAuroraBackground {...props} />
);
*/

const DynamicDeepOceanBackground = dynamic<BackgroundProps>(
  () =>
    import("./DeepOceanBackground").catch((error) => {
      console.error("Failed to load DeepOceanBackground:", error);
      return Promise.resolve(() => (
        <FallbackBackground
          colors={{
            primary: "#1E81B0",
            background: "#0A1128",
            accent: "#8CE8FF",
          }}
        />
      ));
    }),
  {
    ssr: false,
    loading: () => <LoadingBackground />,
  }
);

export const DeepOceanBackground: React.FC<BackgroundProps> = (props) => (
  <DynamicDeepOceanBackground {...props} />
);
