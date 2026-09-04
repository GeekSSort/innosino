import { pageMetadata } from "@/app/shared-metadata";

/**
 * The page is a Client Component and cannot export metadata, so the segment
 * layout carries it — otherwise this URL would share the homepage's card.
 */
export const metadata = pageMetadata({
  title: "Projects",
  description: "Selected work: intelligent instruments, embedded platforms and connected products built to solve real problems and reach production.",
  path: "/projects",
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
