import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,
  images: {
    // AVIF first, WebP as the fallback: both are markedly smaller than the
    // source PNG/JPEG, and the source format is still used when neither is
    // accepted. Next picks per request from the Accept header.
    formats: ["image/avif", "image/webp"],
    // These sources are static files in /public that only change on deploy, so
    // a long TTL keeps Vercel from re-running the same transforms every 4 hours
    // (the Next 16 default). Bump a filename if an image ever needs to change
    // before this expires.
    minimumCacheTTL: 2678400, // 31 days
  },
};

export default nextConfig;
