import { notFound } from "next/navigation";
import ServiceDetail from "@/components/services/ServiceDetail";
import { client } from "@/sanity/client";
import {
  SERVICE_QUERY,
  SERVICE_SLUGS_QUERY,
  SITE_SETTINGS_QUERY,
  HOME_PAGE_QUERY,
  type Service,
  type SiteSettings,
} from "@/sanity/queries";

/** Static export needs the full slug set at build time. */
export async function generateStaticParams() {
  const slugs = await client.fetch<string[]>(SERVICE_SLUGS_QUERY);
  return slugs.map((slug) => ({ slug }));
}

export default async function ServiceDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const [service, settings, home] = await Promise.all([
    client.fetch<Service | null>(SERVICE_QUERY, { slug }),
    client.fetch<SiteSettings>(SITE_SETTINGS_QUERY),
    client.fetch<{ industriesLede: string }>(HOME_PAGE_QUERY),
  ]);
  if (!service) notFound();
  return (
    <ServiceDetail
      service={service}
      settings={settings}
      industriesLede={home.industriesLede}
    />
  );
}
