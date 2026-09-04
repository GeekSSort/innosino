import { serviceSlugs } from "./services";

/**
 * Every URL that should be indexed, in one place.
 *
 * The sitemap is generated from this list rather than from a second hand-kept
 * copy, so the two cannot drift — a sitemap listing URLs the site does not
 * serve, or omitting ones it does, is worse than having no sitemap at all.
 *
 * The site is a static export, so this is also the complete set: `next build`
 * writes one HTML file per entry and nothing else is reachable.
 */
export const indexableRoutes: string[] = [
  "/",
  "/about",
  "/expertise",
  "/life-at-innosino",
  "/services",
  ...serviceSlugs.map((slug) => `/services/${slug}`),
  "/projects",
  "/projects/details",
  "/blogs",
  "/blogs/details",
  "/contact",
  "/privacy-policy",
];
