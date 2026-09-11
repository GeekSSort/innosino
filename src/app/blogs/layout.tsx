import type { Metadata } from "next";
import { pageSeo } from "@/sanity/page-seo";

/**
 * Title and description come from the page's own SEO fields, falling back to
 * the copy below when they are left empty in the Studio.
 */
export async function generateMetadata(): Promise<Metadata> {
  return pageSeo("blogsPage", "/blogs", {
    title: "Blog & Insights",
    description: "Engineering notes and product-development insight from the INNOSINO team.",
  });
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
