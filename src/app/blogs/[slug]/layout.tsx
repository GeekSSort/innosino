import type { Metadata } from "next";
import { pageMetadata } from "@/app/shared-metadata";
import JsonLd from "@/components/seo/JsonLd";
import { blogPostingSchema, breadcrumbSchema } from "@/content/schema";
import { client } from "@/sanity/client";
import { POST_QUERY, POST_SLUGS_QUERY, type Post } from "@/sanity/queries";

export async function generateStaticParams() {
  const slugs = await client.fetch<string[]>(POST_SLUGS_QUERY);
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await client.fetch<Post | null>(POST_QUERY, { slug });
  if (!post) return {};
  return pageMetadata({
    title: post.seo?.title?.trim() || post.title,
    description: post.seo?.description?.trim() || post.excerpt,
    path: `/blogs/${post.slug}`,
    image: post.seo?.image ?? post.image,
  });
}

export default async function BlogPostLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await client.fetch<Post | null>(POST_QUERY, { slug });
  if (!post) return children;

  return (
    <>
      {children}
      <JsonLd data={blogPostingSchema(post)} />
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Blog", path: "/blogs" },
          { name: post.title, path: `/blogs/${post.slug}` },
        ])}
      />
    </>
  );
}
