import { pageMetadata } from "@/app/shared-metadata";

/**
 * The page is a Client Component and cannot export metadata, so the segment
 * layout carries it — otherwise this URL would share the homepage's card.
 */
export const metadata = pageMetadata({
  title: "Services",
  description: "Hardware and PCB design, embedded systems, product development and industrial automation — engineered for real-world performance and seamless manufacturing.",
  path: "/services",
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
