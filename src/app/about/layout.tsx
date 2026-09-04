import { pageMetadata } from "@/app/shared-metadata";
import JsonLd from "@/components/seo/JsonLd";
import { breadcrumbSchema } from "@/content/schema";

/**
 * The page is a Client Component and cannot export metadata, so the segment
 * layout carries it — otherwise this URL would share the homepage's card.
 */
export const metadata = pageMetadata({
  title: "About Us",
  description: "An innovation-driven engineering company turning ideas into high-performance, market-ready products across embedded systems, electronics, smart energy and industrial technologies.",
  path: "/about",
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "About Us", path: "/about" },
        ])}
      />
    </>
  );
}
