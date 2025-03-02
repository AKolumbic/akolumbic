/** @type {import('next').NextConfig} */
const nextConfig = {
  // Removed Three.js transpilation config

  // Removed Webpack config for shader files

  // Turbopack config - simplified for stability
  experimental: {
    turbo: {},
  },

  // Image optimization settings
  images: {
    domains: [],
    remotePatterns: [],
  },

  // Set production sourcemaps for easier debugging
  productionBrowserSourceMaps: true,

  // Enable React strict mode now that we don't have Three.js
  reactStrictMode: true,

  // Handle Vercel deployment
  output: "standalone",

  // Extended security headers
  headers: async () => {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "Cross-Origin-Opener-Policy",
            value: "same-origin",
          },
          {
            key: "Cross-Origin-Embedder-Policy",
            value: "require-corp",
          },
        ],
      },
    ];
  },
};

module.exports = nextConfig;
