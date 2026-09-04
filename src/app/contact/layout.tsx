import { pageMetadata } from "@/app/shared-metadata";

/**
 * The page is a Client Component and cannot export metadata, so the segment
 * layout carries it — otherwise this URL would share the homepage's card.
 */
export const metadata = pageMetadata({
  title: "Contact Us",
  description: "Tell us about your project — hardware, firmware, or both. We'll come back with a clear path from concept to production.",
  path: "/contact",
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
