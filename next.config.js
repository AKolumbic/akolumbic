/** @type {import('next').NextConfig} */
const nextConfig = {
  // Transpile Three.js and related packages properly
  transpilePackages: [
    "three",
    "@react-three/fiber",
    "@react-three/drei",
    "@react-spring/three",
  ],

  // Webpack config to handle Three.js correctly
  webpack: (config) => {
    // Allow importing of shader files
    config.module.rules.push({
      test: /\.(glsl|vs|fs|vert|frag)$/,
      exclude: /node_modules/,
      use: ["raw-loader"],
    });

    return config;
  },

  // Turbopack config - simplified for stability
  experimental: {
    turbo: {},
  },

  // Ensure images from Three.js are optimized
  images: {
    domains: [],
    remotePatterns: [],
  },

  // Set production sourcemaps for easier debugging
  productionBrowserSourceMaps: true,

  // Strict mode can cause issues with Three.js animations
  reactStrictMode: false,

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
