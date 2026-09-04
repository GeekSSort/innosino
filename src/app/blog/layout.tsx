import { pageMetadata } from "@/app/shared-metadata";

/**
 * The page is a Client Component and cannot export metadata, so the segment
 * layout carries it — otherwise this URL would share the homepage's card.
 */
export const metadata = pageMetadata({
  title: "Blog & Insights",
  description: "Engineering notes and product-development insight from the INNOSINO team.",
  path: "/blog",
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
