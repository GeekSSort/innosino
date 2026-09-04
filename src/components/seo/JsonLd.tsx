/**
 * Emits one JSON-LD block.
 *
 * Rendered from the segment layouts, which are Server Components, so the graph
 * is in the served HTML rather than being assembled after hydration — a
 * crawler that never runs the page's JavaScript still gets it.
 *
 * `JSON.stringify` is the escaping: the only sequence that could break out of
 * a script element is `</`, which cannot appear in the output because every
 * string is machine-generated from content modules. The `<` is escaped anyway,
 * so a stray one in future copy cannot end the element early.
 */
export default function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replace(/</g, "\\u003c"),
      }}
    />
  );
}
