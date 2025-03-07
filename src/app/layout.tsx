import React from "react";
import "./globals.css";
import { ReactNode } from "react";
import Head from "next/head";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Playfair_Display } from "next/font/google";

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "700"],
  display: "swap",
});

export const metadata = {
  title: "Andrew Kolumbic",
  description: "Portfolio for Andrew Kolumbic",
  viewport: "width=device-width, initial-scale=1, viewport-fit=cover",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={playfair.className}>
      <Head>
        <link rel="icon" href="/favicon.ico" type="image/x-icon" />
        <link
          href="https://fonts.googleapis.com/css2?family=Michroma&display=swap"
          rel="stylesheet"
        />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, viewport-fit=cover"
        />
      </Head>
      <body
        style={{
          margin: 0,
          padding: 0,
          backgroundColor: "#000",
          color: "#fff",
          fontFamily: "sans-serif",
          paddingBottom: "env(safe-area-inset-bottom, 0)",
        }}
      >
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
