import React from "react";
import "./globals.css";
import { ReactNode } from "react";
import Head from "next/head"; // Import Head from Next.js

export const metadata = {
  title: "Andrew Kolumbic",
  description: "Portfolio for Andrew Kolumbic",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <Head>
        <link rel="icon" href="/favicon.ico" type="image/x-icon" />
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
      </body>
    </html>
  );
}
