import { pageMetadata } from "@/app/shared-metadata";

/**
 * The page is a Client Component and cannot export metadata, so the segment
 * layout carries it — otherwise this URL would share the homepage's card.
 */
export const metadata = pageMetadata({
  title: "Privacy Policy",
  description: "How INNOSINO collects, uses and protects your information.",
  path: "/privacy-policy",
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
