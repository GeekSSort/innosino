import { pageMetadata } from "@/app/shared-metadata";
import JsonLd from "@/components/seo/JsonLd";
import { breadcrumbSchema } from "@/content/schema";

/**
 * The page is a Client Component and cannot export metadata, so the segment
 * layout carries it — otherwise this URL would share the homepage's card.
 */
export const metadata = pageMetadata({
  title: "Project Details",
  description: "Selected work: intelligent instruments, embedded platforms and connected products built to solve real problems and reach production.",
  path: "/projects/details",
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Projects", path: "/projects" },
          { name: "Project Details", path: "/projects/details" },
        ])}
      />
    </>
  );
}
