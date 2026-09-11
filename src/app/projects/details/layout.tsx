import type { Metadata } from "next";
import { pageSeo } from "@/sanity/page-seo";
import JsonLd from "@/components/seo/JsonLd";
import { breadcrumbSchema } from "@/content/schema";

/**
 * Title and description come from the page's own SEO fields, falling back to
 * the copy below when they are left empty in the Studio.
 */
export async function generateMetadata(): Promise<Metadata> {
  return pageSeo("projectDetailPage", "/projects/details", {
    title: "Project Details",
    description: "Selected work: intelligent instruments, embedded platforms and connected products built to solve real problems and reach production.",
  });
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Projects", path: "/projects" },
          { name: "Project Details", path: "/projects/details" },
        ])}
      />
    </>
  );
}
