import type { Metadata } from "next";
import { pageSeo } from "@/sanity/page-seo";
import JsonLd from "@/components/seo/JsonLd";
import { breadcrumbSchema } from "@/content/schema";

/**
 * Title and description come from the page's own SEO fields, falling back to
 * the copy below when they are left empty in the Studio.
 */
export async function generateMetadata(): Promise<Metadata> {
  return pageSeo("aboutPage", "/about", {
    title: "About Us",
    description: "An innovation-driven engineering company turning ideas into high-performance, market-ready products across embedded systems, electronics, smart energy and industrial technologies.",
  });
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "About Us", path: "/about" },
        ])}
      />
    </>
  );
}
