import { notFound } from "next/navigation";
import JobDetail from "@/components/career/JobDetail";
import { client } from "@/sanity/client";
import {
  OPEN_ROLES_QUERY,
  OPEN_ROLE_QUERY,
  OPEN_ROLE_SLUGS_QUERY,
  SITE_SETTINGS_QUERY,
  type OpenRole,
  type SiteSettings,
} from "@/sanity/queries";

/** Static export needs the full slug set at build time. */
export async function generateStaticParams() {
  const slugs = await client.fetch<string[]>(OPEN_ROLE_SLUGS_QUERY);
  return slugs.map((slug) => ({ slug }));
}

export default async function JobPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const [role, all, settings] = await Promise.all([
    client.fetch<OpenRole | null>(OPEN_ROLE_QUERY, { slug }),
    client.fetch<OpenRole[]>(OPEN_ROLES_QUERY),
    client.fetch<SiteSettings>(SITE_SETTINGS_QUERY),
  ]);

  /* A role switched to "not hiring" stops matching the query, so its page
     stops being generated and any remaining link 404s rather than inviting
     applications for something that is closed. */
  if (!role) notFound();

  return (
    <JobDetail
      role={role}
      otherRoles={all.filter((r) => r.slug !== role.slug)}
      settings={settings}
    />
  );
}
