import React from "react";
import "./globals.css";
import { ReactNode } from "react";
import Head from "next/head";
import { Analytics } from "@vercel/analytics/react";

export const metadata = {
  title: "Andrew Kolumbic",
  description: "Portfolio for Andrew Kolumbic",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <Head>
        <link rel="icon" href="/favicon.ico" type="image/x-icon" />
        <link
          href="https://fonts.googleapis.com/css2?family=Michroma&display=swap"
          rel="stylesheet"
        />
      </Head>
      <body
        style={{
          margin: 0,
          padding: 0,
          backgroundColor: "#000",
          color: "#fff",
          fontFamily: "sans-serif",
        }}
      >
        {children}
        <Analytics />
      </body>
    </html>
  );
}
