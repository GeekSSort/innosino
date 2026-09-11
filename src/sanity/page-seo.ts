import type { Metadata } from "next";
import { pageMetadata } from "@/app/shared-metadata";
import { client } from "./client";
import { PAGE_SEO_QUERY, type PageSeo } from "./queries";

/**
 * Build a page's metadata from the Studio, falling back to the copy the site
 * shipped with.
 *
 * The fallback is not decoration: a query that returns nothing — an unpublished
 * singleton, a renamed field — would otherwise emit an empty title and
 * description, which is worse than the hardcoded pair it replaced.
 */
export async function pageSeo(
  documentId: string,
  path: string,
  fallback: { title: string; description: string },
): Promise<Metadata> {
  const seo = await client.fetch<PageSeo | null>(PAGE_SEO_QUERY, {
    id: documentId,
  });

  return pageMetadata({
    title: seo?.title?.trim() || fallback.title,
    description: seo?.description?.trim() || fallback.description,
    path,
    image: seo?.image ?? undefined,
  });
}
