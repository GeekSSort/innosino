<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# Working on this repository

Read [README.md](README.md) first, then the doc that matches the task:
[architecture](docs/architecture.md) · [content model](docs/content-model.md) ·
[operations](docs/operations.md) · [decisions](docs/decisions.md).

`docs/decisions.md` is the important one. It records choices that look
arbitrary and are not, each with what it cost to learn.

## The gates

Nothing ships without these three passing. CI runs all of them, and a red
build leaves the previous site up rather than publishing something broken.

```bash
npm run lint        # zero warnings, not just zero errors
npx tsc --noEmit
npm run build
```

The Studio has its own typecheck: `cd studio-innosino-cms && npx tsc --noEmit`.
Schema changes also need `npx sanity schema deploy`, or the deployed Studio and
the MCP tools keep the old shape.

## Traps, in order of how much time they cost

**A field nothing renders looks like it works.** The home page heading sat in
the Studio for hours while the `<h1>` stayed a hardcoded literal — the editor
typed into a box that changed nothing. After wiring a field, grep the built
HTML in `out/`, not just the typecheck.

**Document ids must not contain dots.** Sanity's public grant is
`_id in path("*")` — one segment. `post.my-slug` reads as a path like
`drafts.*` and is invisible to anonymous reads, which is every static build.
Use `post-my-slug`.

**`output: "export"` is load-bearing.** No request-time data, no route
handlers, no preview. Every Sanity query runs during `next build`. Changing
this means `@opennextjs/cloudflare` and a metered Worker on every page view.

**A new page that renders its own navbar must be added to the allowlist** in
`components/navigation/FloatingNavbar.tsx` — `ROUTES_WITH_INLINE_NAV` or
`PREFIXES_WITH_INLINE_NAV`. Miss it and the page shows two navbars. The file
warns about this; it was missed anyway.

**Never put a Sanity write token where the browser can reach it.** The dataset
is publicly readable by design and writable only from `worker/index.ts`, using
a Worker secret.

**Video stays in `public/`.** Video fields are path strings, not assets. See
`docs/decisions.md` before changing that.

## Conventions

- Comments explain **why**, and earn their place. Prefer none to a restatement
  of the code. Where a value was measured or tuned — animation timings, hero
  card dimensions — say so, or someone will "clean it up".
- Pages are Server Components. Push browser state down into a Client Component
  rather than marking a whole page `"use client"`.
- Queries and their result types live together in `src/sanity/queries.ts`.
- Project into the shape the component already reads. Moving a page onto the
  CMS should change where data comes from, not how it is consumed.
- Derived things stay derived: the sitemap and the JSON-LD are built from the
  same Sanity data the pages render, so they cannot describe a different site.

## Verifying UI work

`tsc` passing is not evidence a page renders. For layout or content changes,
check the built output or drive a browser. Every page must survive 390px with
no horizontal overflow:

```js
const de = document.documentElement;
({ overflow: de.scrollWidth > de.clientWidth,
   oversized: [...document.querySelectorAll('*')]
     .filter(el => el.getBoundingClientRect().width > de.clientWidth + 1).length })
```

## Environment note

On the machine this was built on, a broken `zshz` shell hook makes `cd` exit 1
in every zsh invocation, so commands silently run in the wrong directory.
Running through `/bin/sh -c "cd … && …"` avoids it. If `cd` appears to do
nothing, that is why — not the repository.
