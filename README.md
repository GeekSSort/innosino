# INNOSINO

The INNOSINO website and the CMS that feeds it.

**Live:** [innosino.com](https://innosino.com) · **Studio:** [innosino.sanity.studio](https://innosino.sanity.studio)

---

## What this is

Two applications in one repository, sharing nothing but a Sanity project.

| | | |
|---|---|---|
| `/` | the website | Next.js 16 · App Router · **static export** |
| `studio-innosino-cms/` | the CMS | Sanity Studio 6 · standalone, own dependencies |
| `worker/` | one endpoint | Cloudflare Worker · `POST /api/apply` |

All page content lives in Sanity. Publishing rebuilds and redeploys the site
automatically, in about 90 seconds.

## Running it

```bash
npm install
npm run dev                 # the site          → localhost:3000

cd studio-innosino-cms
npm install
npm run dev                 # the Studio        → localhost:3333
```

Both read from the live `production` dataset — there is no local content
fixture. Edits in a local Studio are edits to real content.

`/api/apply` does not exist under `next dev`; use `npm run cf:preview` to run
the site with the Worker.

## Commands

| | |
|---|---|
| `npm run dev` | site dev server |
| `npm run build` | static export into `out/` |
| `npm run lint` | ESLint — must pass, CI enforces it |
| `npm run cf:preview` | build and serve with the Worker locally |
| `npm run cf:deploy` | build and deploy to Cloudflare by hand |
| `npx tsc --noEmit` | typecheck — CI enforces it |

In `studio-innosino-cms/`:

| | |
|---|---|
| `npm run dev` | Studio dev server |
| `npx sanity schema deploy` | **required after any schema change** |
| `npx sanity deploy` | publish the Studio |

## Layout

```
src/
  app/                  routes; each page is a Server Component that queries Sanity
  components/           by area — blog, career, home, projects, services, common…
  sanity/               client, queries, types, image URLs, page SEO
  lib/                  small pure helpers
  content/              three derived files only — see docs/architecture.md
worker/index.ts         the only server-side code
studio-innosino-cms/    the CMS
docs/                   start here
```

## Before you change anything

Three things bite people on this project, in order of how much time they cost:

1. **`output: "export"` means everything is build-time.** No request-time data,
   no route handlers, no preview. Changing that is a real migration, not a flag.
2. **A Sanity field that nothing renders looks like it works.** Wire it and
   check the built HTML, not just the typecheck.
3. **Document ids must not contain dots.** They become invisible to anonymous
   reads, and the build sees an empty dataset.

Each is explained in [docs/decisions.md](docs/decisions.md).

## Documentation

| | |
|---|---|
| [docs/architecture.md](docs/architecture.md) | how the pieces fit and why |
| [docs/content-model.md](docs/content-model.md) | the 21 document types and how they reach a page |
| [docs/operations.md](docs/operations.md) | deploying, secrets, and triage when something breaks |
| [docs/decisions.md](docs/decisions.md) | the non-obvious choices and what they cost |
| [AGENTS.md](AGENTS.md) | conventions for coding agents |

## Known gaps

- `/contact` shows a success message and sends nothing. Enquiries through it
  are lost. Same Worker, one more endpoint — not yet done.
- Job openings and their detail copy are placeholder text, not approved
  listings.
- The privacy policy has two gaps carried over from the original source:
  *Information We Collect* has no body, and *Changes To This Policy* reuses the
  Contact Us sentence.
