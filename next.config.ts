import type { NextConfig } from "next";

const securityHeaders = [
  {
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains; preload",
  },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), interest-cohort=()",
  },
  {
    key: "Content-Security-Policy",
    value: [
      "default-src 'self'",
      "script-src 'self' 'unsafe-inline' https://challenges.cloudflare.com",
      "style-src 'self' 'unsafe-inline'",
      "img-src 'self' data: blob:",
      "font-src 'self' data:",
      "connect-src 'self' https://api.notion.com https://challenges.cloudflare.com",
      "frame-src https://challenges.cloudflare.com",
      "base-uri 'self'",
      "form-action 'self'",
    ].join("; "),
  },
  // GPC cache-key safety (INFRA-151) — declared here but overridden by
  // Next.js's RSC layer (Vary becomes `rsc, next-router-*, Accept-Encoding`).
  // Kept as intent declaration; relying on Set-Cookie + Cache-Control to
  // keep GPC-bearing responses out of shared caches. A proper fix requires
  // an OpenNext Worker middleware to append Vary after Next.js writes it.
  { key: "Vary", value: "Sec-GPC" },
];

const nextConfig: NextConfig = {
  turbopack: {
    // Fix workspace root detection issue
    root: process.cwd(),
    // Enable raw imports for markdown files
    rules: {
      "*.md": {
        loaders: ["raw-loader"],
        as: "*.js",
      },
    },
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: securityHeaders,
      },
    ];
  },
};

export default nextConfig;
