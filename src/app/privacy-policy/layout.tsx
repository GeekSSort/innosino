import { pageMetadata } from "@/app/shared-metadata";
import JsonLd from "@/components/seo/JsonLd";
import { breadcrumbSchema } from "@/content/schema";

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
  return (
    <>
      {children}
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Privacy Policy", path: "/privacy-policy" },
        ])}
      />
    </>
  );
}
