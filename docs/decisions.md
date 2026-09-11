# Decisions

The choices that are not obvious from the code, and what each one costs.
Written so a future change can be made deliberately rather than by accident.

---

## Document ids use hyphens, never dots

`post-my-slug`, not `post.my-slug`.

Sanity's default public grant is `_id in path("*")`, which matches
**single-segment ids only**. An id containing a dot reads as a two-segment
path — the same shape as `drafts.*` — and is silently excluded from anonymous
reads.

This cost an afternoon. Authenticated queries returned 20 posts; the static
build, which has no credentials, saw an empty dataset and failed with
"generateStaticParams returned an empty array". Nothing in the error pointed
at the ids.

Readable ids are otherwise a deliberate exception to Sanity's "let the Content
Lake generate `_id`" guidance: they make the import idempotent, so a re-run
updates in place instead of duplicating. References are still resolved through
a lookup map, never by rebuilding an id string.

---

## `useCdn: false`

Every query runs at build time, so there is no request-time traffic for the
CDN to absorb. Meanwhile a build triggered by a publish webhook starts within
seconds of the change — and the CDN served a stale response inside exactly
that window during testing, producing a deploy that silently missed the edit.

The live API is slightly slower per query and always current. For a few dozen
build-time queries that is the correct trade.

---

## Video stays in `public/`

There is 21 MB of it, the home page autoplays it for every visitor, and
Sanity's own guidance is explicit: file assets have no transcoding and no
adaptive streaming, and video drives bandwidth bills.

Static assets on Cloudflare are free and unmetered; the asset CDN is not. So
video fields are path strings and the Studio says so in plain words — *"Videos
are not uploaded here. Ask a developer to add a new one."*

The cost: an editor cannot change a video alone. Accepted, because the
alternative is a metered bill for the site's single heaviest asset.

**If video ever needs to be editable**, the answer is Mux (via
`sanity-plugin-mux-input`) or Media Library on an Enterprise plan — not
file assets.

---

## One Worker, and `run_worker_first` left unset

The site needed server-side code for exactly one thing: writing a job
application with a token the browser must never see.

With `main` and `assets` both set and `run_worker_first` absent, Cloudflare
serves anything matching a static asset directly from the edge and never
invokes the Worker. Only unmatched paths — just `POST /api/apply` — reach it.

**Setting `run_worker_first: true` would route every page view through the
Worker and start metering them.** Do not set it without meaning to.

---

## The application form falls back to email

A static site has no endpoint, so the form posts to the Worker. If that call
fails for any reason — including `next dev`, where no Worker exists — it opens
the applicant's mail client and says so.

It never reports a success it cannot back up. This is not a general
principle applied for its own sake: `/contact` on this site still shows
*"Thank you! We've received your request"* and sends nothing, and has been
discarding enquiries. That is the failure mode being avoided.

A CV still goes by email. Accepting a file means multipart upload and asset
storage, worth building once somebody is actually hiring through this.

---

## Split headings join with no separator

`lead` + `accent` are concatenated directly, so the separating space belongs
at the end of `lead`. This lets a heading be deliberately joined, and makes a
missing space invisible until it ships.

It has gone wrong once, producing `WELCOME TO THEINNOSINO` on the home page.
Both fields now warn at edit time. If it happens again, make the render
forgiving instead — the editor should not have to think about an invisible
character.

---

## Page SEO does not fall back to the hero

Empty SEO fields fall back to the curated title and description in the layout,
not to the page's own heading.

Deriving from the hero was tried and reverted: About's hero heading is a full
sentence, which produced a 200-character `<title>`.

---

## `/career/<slug>` had to be added to an allowlist

`FloatingNavbar` keeps `ROUTES_WITH_INLINE_NAV` and
`PREFIXES_WITH_INLINE_NAV`. A page that renders `variant="inline"` and is
missing from those lists shows **two navbars** — its own and the root layout's
floating copy.

The file says so in a comment. The job detail route was still added without
it, and the duplicate was spotted on the live site rather than in review. Any
new page that composes its own pill goes in the list in the same commit.

---

## The footer is one component

It used to be pasted into ten pages, and the copies had already drifted: two
were missing the Services link the others carried, and the Expertise page's
was a fixed 1440px block that could not respond below that width.

Extracting `SiteFooter` is also what let six pages stop being Client
Components — the chat bubble's open/closed state was the only reason they
carried `"use client"`.

---

## Three pages were 1440px Figma exports

Expertise, Privacy policy and Life at INNOSINO had their content at absolute
pixel coordinates inside a fixed 1440px frame. Below that width the content
sat off the side of the screen.

They now use the site's own primitives — `.page-hero`, `.container`,
`.hero-follow`, `.page-hero__media` — and hold up at 390px with the desktop
layout unchanged (the hanging hero card still measures exactly 970×546).

One trap worth remembering: `<body>` is a flex column, so a `<main>` with no
explicit width sizes to its **widest child** rather than the viewport. Two of
those pages looked fixed but were not until `width: 100%` was pinned on
`<main>`.
