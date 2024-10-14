const { PHASE_DEVELOPMENT_SERVER } = require("next/constants");

const ext = ["jsx", "tsx", "js", "ts"];

/** @type {import('next').NextConfig} */
const nextConfig = (phase, { defaultConfig }) => ({
  ...defaultConfig,
  pageExtensions:
    phase === PHASE_DEVELOPMENT_SERVER
      ? ext.concat(ext.map((item) => "dev." + item))
      : ext,
  images: {
    // NOTE: https://github.com/vercel/next.js/issues/54482
    unoptimized: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    // !! WARN !!
    // Dangerously allow production builds to successfully complete even if
    // your project has type errors.
    // !! WARN !!
    ignoreBuildErrors: true,
  },
});

module.exports = nextConfig;
