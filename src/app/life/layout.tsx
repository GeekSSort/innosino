import { pageMetadata } from "@/app/shared-metadata";

/**
 * The page is a Client Component and cannot export metadata, so the segment
 * layout carries it — otherwise this URL would share the homepage's card.
 */
export const metadata = pageMetadata({
  title: "Life at INNOSINO",
  description: "Team moments, office events and the behind-the-scenes innovation of everyday engineering at INNOSINO.",
  path: "/life",
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
