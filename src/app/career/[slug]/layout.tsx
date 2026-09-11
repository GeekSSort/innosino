import type { Metadata } from "next";
import { pageMetadata } from "@/app/shared-metadata";
import JsonLd from "@/components/seo/JsonLd";
import { breadcrumbSchema, jobPostingSchema } from "@/content/schema";
import { client } from "@/sanity/client";
import {
  OPEN_ROLE_QUERY,
  OPEN_ROLE_SLUGS_QUERY,
  type OpenRole,
} from "@/sanity/queries";

export async function generateStaticParams() {
  const slugs = await client.fetch<string[]>(OPEN_ROLE_SLUGS_QUERY);
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const role = await client.fetch<OpenRole | null>(OPEN_ROLE_QUERY, { slug });
  if (!role) return {};

  return pageMetadata({
    title: `${role.title} — ${role.location}`,
    description: role.description,
    path: `/career/${role.slug}`,
  });
}

export default async function JobLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const role = await client.fetch<OpenRole | null>(OPEN_ROLE_QUERY, { slug });
  if (!role) return children;

  return (
    <>
      {children}
      {/* Built from the same document the page renders, so the listing Google
          indexes and the one a visitor reads cannot describe different jobs. */}
      <JsonLd data={jobPostingSchema(role)} />
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Career", path: "/career" },
          { name: role.title, path: `/career/${role.slug}` },
        ])}
      />
    </>
  );
}
