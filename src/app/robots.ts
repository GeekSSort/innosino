import type { MetadataRoute } from "next";
import { siteUrl } from "./shared-metadata";

/**
 * `robots.ts` and `sitemap.ts` are Route Handlers, and a static export will not
 * prerender one unless it says so — the build fails outright otherwise.
 */
export const dynamic = "force-static";


/**
 * The site had no robots.txt of its own: the file served at the root was the
 * one Cloudflare generates, which nothing in this repo could review or test,
 * and which named no sitemap.
 *
 * Nothing here is disallowed. A 19-page static export has no infinite spaces
 * to fence off — no search, no cart, no filter parameters that generate their
 * own URLs — and blocking a path only stops it being fetched, never indexed,
 * so a `Disallow` without a reason costs more than it saves.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: `${siteUrl}/sitemap.xml`,
    host: siteUrl,
  };
}
