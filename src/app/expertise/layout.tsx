import type { Metadata } from "next";
import { pageSeo } from "@/sanity/page-seo";
import JsonLd from "@/components/seo/JsonLd";
import { breadcrumbSchema } from "@/content/schema";

/**
 * Title and description come from the page's own SEO fields, falling back to
 * the copy below when they are left empty in the Studio.
 */
export async function generateMetadata(): Promise<Metadata> {
  return pageSeo("expertisePage", "/expertise", {
    title: "Expertise",
    description: "Two decades of electronics R&D across embedded systems, PCB design, smart energy and industrial automation.",
  });
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Expertise", path: "/expertise" },
        ])}
      />
    </>
  );
}
