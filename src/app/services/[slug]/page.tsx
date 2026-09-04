import { notFound } from "next/navigation";
import ServiceDetail from "@/components/services/ServiceDetail";
import { getService, services } from "@/content/services";

/** Static export needs the full slug set at build time. */
export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export default async function ServiceDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) notFound();
  return <ServiceDetail service={service} />;
}
