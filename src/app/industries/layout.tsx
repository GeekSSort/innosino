import type { Metadata } from "next";
import { pageSeo } from "@/sanity/page-seo";

/**
 * The page is a Client Component and cannot export metadata, so the segment
 * layout carries it — the same arrangement the services index uses.
 */
export async function generateMetadata(): Promise<Metadata> {
  return pageSeo("industriesPage", "/industries", {
    title: "Industries",
    description: "Consumer electronics, renewable energy, industrial automation, IoT, biomedical, RF and more — the sectors Innosino designs hardware and firmware for, from concept to mass production.",
  });
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
