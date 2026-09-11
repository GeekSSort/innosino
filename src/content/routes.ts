import { client } from "@/sanity/client";
import {
  OPEN_ROLE_SLUGS_QUERY,
  POST_SLUGS_QUERY,
  SERVICE_SLUGS_QUERY,
} from "@/sanity/queries";

/**
 * Every URL that should be indexed, in one place.
 *
 * The sitemap is generated from this list rather than from a second hand-kept
 * copy, so the two cannot drift — a sitemap listing URLs the site does not
 * serve, or omitting ones it does, is worse than having no sitemap at all.
 *
 * Post, service and job slugs all come from the Content Lake, the same source
 * the routes themselves are built from, so publishing a post or closing a
 * vacancy moves the sitemap with it. A role marked as no longer hiring drops
 * out of both at once.
 *
 * The site is a static export, so this is also the complete set: `next build`
 * writes one HTML file per entry and nothing else is reachable.
 */
export async function indexableRoutes(): Promise<string[]> {
  const [postSlugs, serviceSlugs, roleSlugs] = await Promise.all([
    client.fetch<string[]>(POST_SLUGS_QUERY),
    client.fetch<string[]>(SERVICE_SLUGS_QUERY),
    client.fetch<string[]>(OPEN_ROLE_SLUGS_QUERY),
  ]);

  return [
    "/",
    "/about",
    "/expertise",
    "/life-at-innosino",
    "/industries",
    "/services",
    ...serviceSlugs.map((slug) => `/services/${slug}`),
    "/projects",
    "/projects/details",
    "/blogs",
    ...postSlugs.map((slug) => `/blogs/${slug}`),
    "/career",
    ...roleSlugs.map((slug) => `/career/${slug}`),
    "/contact",
    "/privacy-policy",
  ];
}
