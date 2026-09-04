import type { MetadataRoute } from "next";
import { siteUrl } from "./shared-metadata";

/**
 * `robots.ts` is a Route Handler, and a static export will not prerender one
 * unless it says so — the build fails to collect it otherwise.
 */
export const dynamic = "force-static";

/**
 * Crawlers that fetch a page at answer time in order to quote and link it.
 * These are what put the site in AI answers, so they are named as allowed
 * rather than left to the wildcard: a future blanket rule cannot then take
 * them out by accident.
 *
 * Each is the retrieval counterpart of a trainer in the list below —
 * OAI-SearchBot to GPTBot, Claude-SearchBot to ClaudeBot — which is why
 * blocking one and allowing the other is coherent rather than contradictory.
 */
const CITATION_CRAWLERS = [
  "OAI-SearchBot",
  "ChatGPT-User",
  "PerplexityBot",
  "Perplexity-User",
  "Claude-SearchBot",
  "Claude-User",
];

/**
 * Crawlers that collect pages to train or fine-tune models. Refused, which is
 * the policy the site already served through Cloudflare's generated file and
 * which this keeps — now in the repo, where it can be reviewed and tested.
 *
 * Google-Extended governs Gemini grounding and training only. Google's AI
 * Overviews are built from the ordinary Googlebot index, so blocking it costs
 * nothing in AI answers.
 */
const TRAINING_CRAWLERS = [
  "Amazonbot",
  "Applebot-Extended",
  "Bytespider",
  "CCBot",
  "ClaudeBot",
  "CloudflareBrowserRenderingCrawler",
  "Google-Extended",
  "GPTBot",
  "meta-externalagent",
];

/**
 * Nothing is disallowed for ordinary search. A 19-page static export has no
 * infinite spaces to fence off — no search, no cart, no filter parameters that
 * generate their own URLs — and a `Disallow` only stops a URL being fetched,
 * never indexed, so one without a reason costs more than it saves.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        // https://contentsignals.org — states the same policy the rules below
        // enforce, for agents that read the declaration rather than the groups.
        other: { "Content-Signal": "search=yes,ai-train=no,use=reference" },
      },
      { userAgent: CITATION_CRAWLERS, allow: "/" },
      { userAgent: TRAINING_CRAWLERS, disallow: "/" },
    ],
    sitemap: `${siteUrl}/sitemap.xml`,
    host: siteUrl,
  };
}
