import { notFound } from "next/navigation";
import { getPost, posts } from "@/content/posts";
import BlogArticle from "@/components/blog/BlogArticle";

/** Static export needs the full slug set at build time. */
export function generateStaticParams() {
  return posts.map((post) => ({ slug: post.slug }));
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();
  return <BlogArticle post={post} />;
}
