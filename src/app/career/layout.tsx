import { pageMetadata } from "@/app/shared-metadata";

/**
 * The page is a Client Component and cannot export metadata, so the segment
 * layout carries it — the same arrangement the services index uses.
 */
export const metadata = pageMetadata({
  title: "Career",
  description:
    "Open engineering roles at Innosino — embedded firmware, hardware and PCB design, IoT backend, test and manufacturing support. Build products that reach a production line.",
  path: "/career",
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
