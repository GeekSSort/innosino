# Content model

21 document types and 11 reusable objects, in `studio-innosino-cms/schemaTypes/`.

## The three kinds of document

**Page singletons** — one document per URL, locked to a fixed `_id` by
`structure.ts` so nobody can create a second Home page that nothing renders.
They are also removed from the global "create new" menu and cannot be deleted.

| document | URL |
|---|---|
| `homePage` | `/` |
| `aboutPage` | `/about` |
| `servicesPage` | `/services` |
| `expertisePage` | `/expertise` |
| `industriesPage` | `/industries` |
| `projectsPage` | `/projects` |
| `projectDetailPage` | `/projects/details` |
| `blogsPage` | `/blogs` |
| `careerPage` | `/career` |
| `contactPage` | `/contact` |
| `lifePage` | `/life-at-innosino` |
| `privacyPage` | `/privacy-policy` |
| `siteSettings` | menus, footer, contact details, shared CTA |

**Collections** — ordinary lists the pages read from.

| document | notes |
|---|---|
| `post` | blog articles; body is Portable Text in anchored sections |
| `category` | blog filter pills; a reference, so a post cannot claim a pill the index does not render |
| `service` | one per discipline; `navGroup` decides its place in the top menu |
| `project` | cards on `/projects`, and the featured slot |
| `industry` | the marquee and the industries grid |
| `testimonial` | client quotes on `/about` |
| `openRole` | job openings, each with its own `/career/<slug>` page |

**Records** — written by the site, not by an editor.

| document | notes |
|---|---|
| `jobApplication` | created by `worker/index.ts`; every field read-only except `status` |

## Reusable objects

`splitHeading` `pageHero` `link` `faq` `stage` `numberedItem` `textCard`
`stat` `ctaBanner` `seo` `richText`

### splitHeading — read this before editing a heading

Every heading on the site renders as two runs: a plain `lead` and a coloured
`accent`. They are joined with **no separator**, so the space between them has
to be at the end of `lead`.

```
lead: "WHAT WE "    accent: "DO"      →  WHAT WE DO
lead: "WHAT WE"     accent: "DO"      →  WHAT WEDO
```

A missing trailing space is invisible in the input and obvious on the live
site. This has gone wrong once. Both `splitHeading.lead` and
`homePage.hero.titleLead` now warn about it at edit time.

## Field conventions

- **`order`** — lower numbers first. Present on every collection.
- **`isOpen` / `isFeatured`** — flags that remove or promote without deleting.
  A closed `openRole` disappears from the listing, its own page and the
  sitemap at once, because all three read the same flag.
- **`seo`** — optional per page and per document. Left empty, the layout falls
  back to the curated title and description it ships with. It deliberately does
  **not** fall back to the hero: several heroes are full sentences, and one
  produced a 200-character `<title>`.
- **Video fields are strings, not assets.** They hold a path into `public/`.
  See [decisions.md](decisions.md).

## How content reaches a page

Queries live in one file, `src/sanity/queries.ts`, and project into the shapes
the components already expected. Moving a page onto the CMS changed where its
data came from, not how it was read.

```
src/sanity/queries.ts   GROQ + the TypeScript types for each result
src/sanity/client.ts    the configured client (useCdn: false — see decisions)
src/sanity/image.ts     urlFor(), the asset CDN URL builder
src/sanity/page-seo.ts  per-page metadata with its fallback
```

## Changing the schema

1. Edit under `studio-innosino-cms/schemaTypes/`
2. `npx tsc --noEmit` in the Studio
3. `npx sanity schema deploy` — required, or MCP tools and the deployed Studio
   keep the old shape
4. Update the matching query and type in `src/sanity/queries.ts`
5. Render it. **A field nothing renders is worse than no field** — it looks
   like it works. This has happened: the home page heading lived in the Studio
   for hours while the `<h1>` stayed hardcoded.

Never delete a field that holds production data. Deprecate it
(`deprecated`, `readOnly`, `hidden`), migrate, then remove.
