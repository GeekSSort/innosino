import {
  createImageUrlBuilder,
  type SanityImageSource,
} from "@sanity/image-url";
import { client } from "./client";

/**
 * @sanity/image-url v2 exports the builder by name — the default export is
 * deprecated, and the old `@sanity/image-url/lib/types/types` subpath no
 * longer resolves.
 */
const builder = createImageUrlBuilder(client);

/**
 * Build a CDN URL for a Sanity image. The site runs with
 * `images.unoptimized`, so there is no Next.js optimizer in front of these —
 * the width asked for here is the width that gets served.
 */
export const urlFor = (source: SanityImageSource) => builder.image(source);
