import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,

  /**
   * The site has no server-side code at all — no data fetching, no cookies or
   * headers, no route handlers — so it builds to plain HTML/CSS/JS in `out/`.
   * That is what makes it free to host: static assets are served without ever
   * invoking a Worker, so they cost no requests and no bandwidth.
   *
   * Adding anything that needs a server later (Sanity draft mode / visual
   * editing, on-demand revalidation) means dropping this line and deploying
   * through @opennextjs/cloudflare instead.
   */
  output: "export",

  images: {
    /**
     * A static export has no image optimizer to call at request time, so the
     * files in /public are served as authored. The AVIF/WebP negotiation this
     * used to do would need a paid service (Cloudflare Images) or a build-time
     * conversion step; neither is worth it while the whole image set is ~7 MB.
     */
    unoptimized: true,
  },
};

export default nextConfig;
