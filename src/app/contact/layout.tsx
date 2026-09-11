import type { Metadata } from "next";
import { pageSeo } from "@/sanity/page-seo";
import JsonLd from "@/components/seo/JsonLd";
import { breadcrumbSchema, faqSchema } from "@/content/schema";
import { client } from "@/sanity/client";
import { CONTACT_PAGE_QUERY, type ContactPageData } from "@/sanity/queries";

export async function generateMetadata(): Promise<Metadata> {
  return pageSeo("contactPage", "/contact", {
    title: "Contact Us",
    description: "Tell us about your project — hardware, firmware, or both. We'll come back with a clear path from concept to production.",
  });
}

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  /* Built from the same array the accordion renders, so the markup and the
     page can never describe different answers. */
  const page = await client.fetch<ContactPageData>(CONTACT_PAGE_QUERY);

  return (
    <>
      {children}
      {page.faqs?.length > 0 && <JsonLd data={faqSchema(page.faqs)} />}
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Contact Us", path: "/contact" },
        ])}
      />
    </>
  );
}
