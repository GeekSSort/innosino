import type { Metadata } from "next";
import { pageSeo } from "@/sanity/page-seo";

/**
 * Title and description come from the page's own SEO fields, falling back to
 * the copy below when they are left empty in the Studio.
 */
export async function generateMetadata(): Promise<Metadata> {
  return pageSeo("projectsPage", "/projects", {
    title: "Projects",
    description: "Selected work: intelligent instruments, embedded platforms and connected products built to solve real problems and reach production.",
  });
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
