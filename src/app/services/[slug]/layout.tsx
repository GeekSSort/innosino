import type { Metadata } from "next";
import { pageMetadata } from "@/app/shared-metadata";
import JsonLd from "@/components/seo/JsonLd";
import { breadcrumbSchema, faqSchema, serviceSchema } from "@/content/schema";
import { client } from "@/sanity/client";
import {
  SERVICE_QUERY,
  SERVICE_SLUGS_QUERY,
  type Service,
} from "@/sanity/queries";

export async function generateStaticParams() {
  const slugs = await client.fetch<string[]>(SERVICE_SLUGS_QUERY);
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const service = await client.fetch<Service | null>(SERVICE_QUERY, { slug });
  if (!service) return {};
  return pageMetadata({
    title: service.seo?.title?.trim() || service.title,
    description: service.seo?.description?.trim() || service.description,
    path: `/services/${service.slug}`,
    image: service.seo?.image ?? undefined,
  });
}

export default async function ServiceDetailLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const service = await client.fetch<Service | null>(SERVICE_QUERY, { slug });
  if (!service) return children;

  return (
    <>
      {children}
      <JsonLd data={serviceSchema(service)} />
      {/* Built from the same array the accordion renders, so the markup and
          the page can never describe different answers. */}
      {service.faqs?.length > 0 && <JsonLd data={faqSchema(service.faqs)} />}
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Services", path: "/services" },
          { name: service.title, path: `/services/${service.slug}` },
        ])}
      />
    </>
  );
}
