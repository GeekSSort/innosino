import type { Metadata } from "next";
import { pageSeo } from "@/sanity/page-seo";
import JsonLd from "@/components/seo/JsonLd";
import { breadcrumbSchema } from "@/content/schema";

/**
 * Title and description come from the page's own SEO fields, falling back to
 * the copy below when they are left empty in the Studio.
 */
export async function generateMetadata(): Promise<Metadata> {
  return pageSeo("lifePage", "/life-at-innosino", {
    title: "Life at INNOSINO",
    description: "Team moments, office events and the behind-the-scenes innovation of everyday engineering at INNOSINO.",
  });
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Life at INNOSINO", path: "/life-at-innosino" },
        ])}
      />
    </>
  );
}
