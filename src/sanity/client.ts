import { createClient } from "next-sanity";

/**
 * The project id and dataset are public identifiers — they travel in the URL
 * of every content request — so they are literals with an env override rather
 * than required environment variables. `.env*` is gitignored here, and a build
 * that fails because an unset variable left `projectId` undefined is a worse
 * outcome than a value that is visible anyway.
 */
export const projectId =
  process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ?? "x3v92ipd";
export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production";

/**
 * Pinned rather than tracking "today": the API version decides how queries are
 * interpreted, so a floating date would let a build change behaviour on its own.
 */
export const apiVersion = "2026-09-11";

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  /**
   * The site is a static export: every query runs during `next build` and
   * never at request time, so there is no request-time traffic for the CDN to
   * absorb — and a build kicked off by a publish webhook fires within seconds
   * of the change. The CDN served a stale response in exactly that window
   * during testing, producing a deploy that silently missed the edit. The live
   * API is a little slower per query and always current, which is the correct
   * trade for a build that runs a few dozen of them.
   */
  useCdn: false,
});
