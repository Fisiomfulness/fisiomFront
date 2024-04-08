const { PHASE_DEVELOPMENT_SERVER } = require("next/constants");

const ext = ["jsx", "tsx", "js", "ts"];

/** @type {import('next').NextConfig} */
const nextConfig = (phase, { defaultConfig }) => ({
  ...defaultConfig,
  pageExtensions:
    phase === PHASE_DEVELOPMENT_SERVER
      ? ext.concat(ext.map((item) => "dev." + item))
      : ext,
  experimental: {
    swcPlugins: [["@swc-jotai/react-refresh", {}]],
  },
  images: {
    // NOTE: https://github.com/vercel/next.js/issues/54482
    unoptimized: true,
  },
  onDemandEntries: {
    pagesBufferLength: 0,
  },
  cacheMaxMemorySize: 0,
});

module.exports = nextConfig;
