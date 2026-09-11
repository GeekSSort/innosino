import BlogsIndex from "@/components/blog/BlogsIndex";
import { client } from "@/sanity/client";
import {
  BLOGS_PAGE_QUERY,
  BLOG_CATEGORIES_QUERY,
  POSTS_QUERY,
  SITE_SETTINGS_QUERY,
  type Post,
  type SiteSettings,
} from "@/sanity/queries";

/**
 * A Server Component so the four queries run once during `next build` and the
 * grid ships as HTML. The filtering, search and pagination are browser state,
 * so they stay in BlogsIndex behind "use client" — the page hands it data and
 * nothing else.
 */
export default async function BlogsPage() {
  const [posts, categories, page, settings] = await Promise.all([
    client.fetch<Post[]>(POSTS_QUERY),
    client.fetch<string[]>(BLOG_CATEGORIES_QUERY),
    client.fetch<{ hero: { breadcrumb: string; title: string; sub: string } }>(
      BLOGS_PAGE_QUERY,
    ),
    client.fetch<SiteSettings>(SITE_SETTINGS_QUERY),
  ]);

  return (
    <BlogsIndex
      posts={posts}
      categories={categories}
      hero={page.hero}
      settings={settings}
    />
  );
}
