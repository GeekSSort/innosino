import type { PortableTextBlock } from "next-sanity";
import type { Post } from "@/sanity/queries";

const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

/**
 * Formatted here rather than with `toLocaleDateString`, which resolves against
 * whatever ICU data the runtime has: the server and the browser have to agree
 * on this string or React throws a hydration mismatch on every card.
 */
export function formatPostDate(iso: string): string {
  const [year, month, day] = iso.split("-").map(Number);
  return `${MONTHS[month - 1]} ${day}, ${year}`;
}

/** The text of a Portable Text body, for counting rather than rendering. */
export function toPlainText(blocks: PortableTextBlock[] = []): string {
  return blocks
    .map((block) =>
      block._type === "block" && Array.isArray(block.children)
        ? block.children
            .map((child) => (child as { text?: string }).text ?? "")
            .join("")
        : "",
    )
    .join(" ");
}

/**
 * Derived from the body at 200 words a minute rather than stored, so it cannot
 * claim "5 min" on an article that has since doubled in length.
 */
export function readTime(post: Post): string {
  const words = post.sections.reduce(
    (total, section) =>
      total +
      toPlainText(section.body).split(/\s+/).filter(Boolean).length +
      section.heading.split(/\s+/).length,
    0,
  );
  return `${Math.max(3, Math.round(words / 200))} min`;
}

/** Three other posts, preferring ones that share a filter pill. */
export function relatedPosts(post: Post, all: Post[], count = 3): Post[] {
  const others = all.filter((p) => p.slug !== post.slug);
  const shared = others.filter((p) =>
    p.filterTags.some((tag) => post.filterTags.includes(tag)),
  );
  return [...shared, ...others.filter((p) => !shared.includes(p))].slice(
    0,
    count,
  );
}
