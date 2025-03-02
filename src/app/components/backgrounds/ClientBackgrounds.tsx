"use client";

import dynamic from "next/dynamic";
import { BackgroundProps } from "./types";

// Client-side only dynamic imports of all background components
export const MainBackground = dynamic<BackgroundProps>(
  () => import("./MainBackground"),
  { ssr: false }
);

export const BeachBackground = dynamic<BackgroundProps>(
  () => import("./BeachBackground"),
  { ssr: false }
);

export const SunsetBackground = dynamic<BackgroundProps>(
  () => import("./SunsetBackground"),
  { ssr: false }
);

export const CaliforniaThreeJSBackground = dynamic<BackgroundProps>(
  () => import("./CaliforniaThreeJSBackground"),
  { ssr: false }
);
