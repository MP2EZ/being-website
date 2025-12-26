import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  turbopack: {
    // Fix workspace root detection issue
    root: process.cwd(),
    // Enable raw imports for markdown files
    rules: {
      '*.md': {
        loaders: ['raw-loader'],
        as: '*.js',
      },
    },
  },
};

export default nextConfig;
