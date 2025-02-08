/** @type {import('next').NextConfig} */
const nextConfig = {
  compiler: {
    styledComponents: true, // ✅ Enables SSR for styled-components
  },
};

module.exports = nextConfig;
