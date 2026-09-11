# Architecture

How the pieces fit, and why they are arranged this way.

## The shape of it

```
                    ┌─────────────────────────┐
   editor  ────────▶│  innosino.sanity.studio │  Sanity Studio
                    │  (studio-innosino-cms/) │  a standalone React SPA
                    └────────────┬────────────┘
                                 │ publish
                                 ▼
                    ┌─────────────────────────┐
                    │   Sanity Content Lake   │  project x3v92ipd
                    │   dataset: production   │  public read, token write
                    └────────────┬────────────┘
                                 │ webhook
                                 ▼
                    ┌─────────────────────────┐
                    │     GitHub Actions      │  .github/workflows/deploy.yml
                    │  lint → tsc → build     │  repository_dispatch
                    └────────────┬────────────┘
                                 │ wrangler deploy
                                 ▼
   visitor ────────▶┌─────────────────────────┐
                    │   Cloudflare Workers    │  innosino.com
                    │   static assets (out/)  │  served from the edge, free
                    │   + worker/index.ts     │  one route: POST /api/apply
                    └────────────┬────────────┘
                                 │ write (server-side token)
                                 ▼
                       back to the Content Lake
```

## Two applications, one repository

| | | |
|---|---|---|
| `/` | the website | Next.js 16, App Router, static export |
| `studio-innosino-cms/` | the CMS | Sanity Studio 6, its own `package.json` and `node_modules` |

The Studio is **standalone**, not embedded in the Next.js app. It has its own
dependencies, its own TypeScript config, its own deploy. The app's
`tsconfig.json` and `eslint.config.mjs` both exclude it, or `next build` would
try to type-check a React SPA that has nothing to do with the site.

They share exactly one thing: the Content Lake.

## The constraint everything else follows from

`next.config.ts` sets `output: "export"`. The site is a pile of static HTML
files. There is no server rendering pages, no request-time data fetching, no
Next.js route handlers.

Consequences, all of which are deliberate:

- **Every Sanity query runs during `next build`.** Publishing changes nothing
  until a build runs. That is what the webhook is for.
- **No preview and no Presentation tool.** Those need a server. Adding them
  means dropping `output: "export"` and deploying through
  `@opennextjs/cloudflare`, which is a real decision, not a flag.
- **Serving costs nothing.** Static asset requests on Cloudflare are free and
  unmetered. This is the property that makes the whole arrangement cheap, and
  it is worth protecting.

## The one piece of server-side code

`worker/index.ts` handles exactly one route: `POST /api/apply`.

It exists because a job application has to be written to the Content Lake, and
writing needs a token. A write token in the browser bundle would let anyone
edit or empty the dataset, so it lives as a Worker secret instead.

`run_worker_first` is deliberately **unset** in `wrangler.jsonc`. With `main`
and `assets` both configured, a request that matches a static asset is served
straight from the edge without invoking the Worker. Only unmatched paths reach
it. Setting `run_worker_first: true` would route every page view through the
Worker and start metering them.

## How a page gets its content

Every page is a Server Component that queries Sanity at build time and passes
data down. Where a page needs browser state — a filter, a carousel, a form —
that part is split into a Client Component underneath it.

```
app/blogs/page.tsx            Server Component, runs the queries
  └─ components/blog/BlogsIndex.tsx   "use client", holds filter + pagination
```

This split is why most pages are Server Components at all. Before the
migration nearly every page was `"use client"` purely because it held the
open/closed state of the chat bubble in the footer. Extracting that into
`components/common/SiteFooter.tsx` let six pages drop the directive.

Two pieces of chrome are shared through context rather than props, because
they render from a dozen places including inside Client Components:

- `NavProvider` — the root layout fetches the navigation once and publishes it
- `BrandLogo` — reads the logo from that same context

## What is still in the repository rather than the CMS

`src/content/` is down to three files, and all three are derived:

| file | why it stays |
|---|---|
| `routes.ts` | builds the sitemap from Sanity slugs — a list, not content |
| `schema.ts` | JSON-LD builders, fed by the same data the pages render |
| `splash.ts` | one `localStorage` key |

Video also stays in `public/`. There is 21 MB of it and the home page autoplays
it for every visitor; asset-CDN bandwidth is metered where static hosting is
not. Video fields in the Studio are path strings, and say so.

## Reading further

- [content-model.md](content-model.md) — what is in the CMS and how it maps to pages
- [operations.md](operations.md) — deploying, secrets, and what to do when something breaks
- [decisions.md](decisions.md) — the non-obvious choices and what they cost
