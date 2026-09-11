import { notFound } from "next/navigation";
import BlogArticle from "@/components/blog/BlogArticle";
import { client } from "@/sanity/client";
import {
  POSTS_QUERY,
  POST_QUERY,
  POST_SLUGS_QUERY,
  SITE_SETTINGS_QUERY,
  type Post,
  type SiteSettings,
} from "@/sanity/queries";

/** Static export needs the full slug set at build time. */
export async function generateStaticParams() {
  const slugs = await client.fetch<string[]>(POST_SLUGS_QUERY);
  return slugs.map((slug) => ({ slug }));
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const [post, all, settings] = await Promise.all([
    client.fetch<Post | null>(POST_QUERY, { slug }),
    client.fetch<Post[]>(POSTS_QUERY),
    client.fetch<SiteSettings>(SITE_SETTINGS_QUERY),
  ]);
  if (!post) notFound();
  return <BlogArticle post={post} all={all} settings={settings} />;
}
