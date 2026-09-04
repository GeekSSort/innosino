import type { MetadataRoute } from "next";
import { indexableRoutes } from "@/content/routes";
import { siteUrl } from "./shared-metadata";

/**
 * `robots.ts` and `sitemap.ts` are Route Handlers, and a static export will not
 * prerender one unless it says so — the build fails outright otherwise.
 */
export const dynamic = "force-static";


/**
 * Built from the same route list the site is, so the sitemap cannot list a URL
 * that is not served or miss one that is.
 *
 * No `lastModified`, `changeFrequency` or `priority`. The last two are ignored
 * outright; the first would have to be `new Date()` here, which claims every
 * page changed on every build and teaches crawlers to disregard the field. An
 * absent lastmod is better than a false one — when these pages get real
 * timestamps (a CMS, or the git commit date of their content module), that is
 * the moment to add it.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  return indexableRoutes.map((path) => ({
    url: path === "/" ? siteUrl : `${siteUrl}${path}`,
  }));
}
