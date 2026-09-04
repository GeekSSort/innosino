import { pageMetadata } from "@/app/shared-metadata";
import JsonLd from "@/components/seo/JsonLd";
import { breadcrumbSchema } from "@/content/schema";

/**
 * The page is a Client Component and cannot export metadata, so the segment
 * layout carries it — otherwise this URL would share the homepage's card.
 */
export const metadata = pageMetadata({
  title: "Life at INNOSINO",
  description: "Team moments, office events and the behind-the-scenes innovation of everyday engineering at INNOSINO.",
  path: "/life-at-innosino",
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Life at INNOSINO", path: "/life-at-innosino" },
        ])}
      />
    </>
  );
}
