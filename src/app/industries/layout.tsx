import { pageMetadata } from "@/app/shared-metadata";

/**
 * The page is a Client Component and cannot export metadata, so the segment
 * layout carries it — the same arrangement the services index uses.
 */
export const metadata = pageMetadata({
  title: "Industries",
  description:
    "Consumer electronics, renewable energy, industrial automation, IoT, biomedical, RF and more — the sectors Innosino designs hardware and firmware for, from concept to mass production.",
  path: "/industries",
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
