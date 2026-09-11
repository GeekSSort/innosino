import type { Metadata } from "next";
import { pageSeo } from "@/sanity/page-seo";

/**
 * Title and description come from the page's own SEO fields, falling back to
 * the copy below when they are left empty in the Studio.
 */
export async function generateMetadata(): Promise<Metadata> {
  return pageSeo("servicesPage", "/services", {
    title: "Services",
    description: "Hardware and PCB design, embedded systems, product development and industrial automation — engineered for real-world performance and seamless manufacturing.",
  });
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
