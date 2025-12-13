import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Fix workspace root detection issue
  turbopack: {
    root: process.cwd(),
  },
  // Enable raw imports for markdown files
  webpack: (config) => {
    config.module.rules.push({
      test: /\.md$/,
      type: 'asset/source',
    });
    return config;
  },
};

export default nextConfig;
