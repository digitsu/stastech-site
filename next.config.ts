import type { NextConfig } from "next";

/**
 * Static-export config. The site ships as plain HTML/CSS/JS to Cloudflare
 * Workers static assets (see wrangler.jsonc) — no server, no SSR, no ISR.
 *
 * - output: "export"      -> `next build` emits a fully static ./out directory.
 * - images.unoptimized    -> required for export; the Image component emits
 *                            plain <img> tags instead of the optimizer route.
 *
 * Note: ESLint is no longer configured here (Next 16 removed the `eslint`
 * key). Linting runs separately via `npm run lint`.
 */
const nextConfig: NextConfig = {
  output: "export",
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
