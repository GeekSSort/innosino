import type { Metadata } from "next";

/**
 * Social scrapers need absolute URLs, so every relative path below is resolved
 * against this. Point it at the real domain once there is one — until then set
 * NEXT_PUBLIC_SITE_URL at build time (e.g. the *.workers.dev URL) or cards will
 * link to localhost.
 */
export const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export const SITE_NAME = "INNOSINO";
export const HOME_TITLE = "Innosino - From Concept to Mass Production";
export const HOME_DESCRIPTION =
  "We turn ideas into high-performance, market ready products from concept to mass production.";

/** The share card every page uses, generated from app/opengraph-image.png. */
const OG_IMAGE = {
  url: "/opengraph-image.png",
  width: 1200,
  height: 630,
  alt: "INNOSINO — From Concept to Mass Production",
};

/**
 * Next merges metadata *shallowly*: a segment that declares `openGraph` or
 * `twitter` replaces the root's copy entirely, image included. So every page
 * builds its tags from this one helper rather than declaring the nested
 * objects itself and silently dropping og:image.
 */
export function pageMetadata({
  title,
  description,
  path,
}: {
  title: string;
  description: string;
  path: string;
}): Metadata {
  const socialTitle = `${title} | ${SITE_NAME}`;
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      title: socialTitle,
      description,
      url: path,
      siteName: SITE_NAME,
      type: "website",
      locale: "en_US",
      images: [OG_IMAGE],
    },
    twitter: {
      card: "summary_large_image",
      title: socialTitle,
      description,
      images: [OG_IMAGE],
    },
  };
}
