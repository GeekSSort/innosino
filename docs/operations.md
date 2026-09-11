# Operations

Deploying, credentials, and what to do when something looks wrong.

## The publish pipeline

```
Publish in the Studio
  → Sanity webhook              "Rebuild site on publish"
  → POST /repos/GeekSSort/innosino/dispatches   {"event_type":"sanity-publish"}
  → GitHub Actions              .github/workflows/deploy.yml
  → npm ci → lint → tsc → build → wrangler deploy
  → live                        ~90 seconds end to end
```

The webhook filters out `jobApplication`. Without that, every application
submitted through the site would trigger a full rebuild of content that had
not changed.

`repository_dispatch` only runs workflows **from the default branch**. The
workflow must exist on `main` or the dispatch returns 204 and nothing happens.

## Deploying by hand

```bash
npm run cf:deploy        # next build && wrangler deploy
```

Safe at any time. This is also the fallback if Actions is down.

## Credentials, and where each one lives

| secret | lives in | used for |
|---|---|---|
| `SANITY_WRITE_TOKEN` | Cloudflare Worker secret | writing job applications |
| `CLOUDFLARE_API_TOKEN` | GitHub repo secret | the deploy step |
| `CLOUDFLARE_ACCOUNT_ID` | GitHub repo secret | the deploy step |
| GitHub PAT | the Sanity webhook's `Authorization` header | firing the dispatch |

Setting or rotating them:

```bash
npx wrangler secret put SANITY_WRITE_TOKEN            # Worker
gh secret set CLOUDFLARE_API_TOKEN --repo GeekSSort/innosino
# the PAT is edited on the webhook at sanity.io/manage
```

Never put a Sanity **write** token anywhere the browser can reach it. The
dataset is publicly readable by design; it is writable only from the Worker.
`.dev.vars` is gitignored for local Worker testing.

## Triage

**A change was published but the site still shows the old text.**

1. Check https://github.com/GeekSSort/innosino/actions — is there a run?
   - No run → the webhook did not fire, or the workflow is missing from `main`
   - Red run → the build failed and the old site is still up, which is the
     intended behaviour. The log says why.
2. A run succeeded but the text is unchanged → **the field is probably not
   wired.** Confirm what Sanity holds, then confirm the component reads it:

```bash
curl -s "https://x3v92ipd.apicdn.sanity.io/v2026-09-11/data/query/production?query=*%5B_id%3D%3D%22homePage%22%5D%5B0%5D.hero"
grep -rn "titleLead" src/components/home/HeroSection.tsx
```

   This exact failure has happened: the heading was in the Studio and
   hardcoded in the JSX at the same time.

**Applications are not arriving.**

```bash
curl -X POST https://innosino.com/api/apply -H 'content-type: application/json' \
  -d '{"name":"t","email":"t@e.com","message":"t","roleTitle":"t"}'
```

| response | meaning |
|---|---|
| `{"ok":true}` | working — check Studio → Job applications |
| `Applications are not configured` | `SANITY_WRITE_TOKEN` is unset |
| `Could not save your application` | token exists but lacks Editor permission |

**The whole site 404s or errors.** Roll back in the Cloudflare dashboard —
Workers → innosino → Deployments — or redeploy the last good commit.

## Local development

```bash
npm run dev                         # site, :3000
cd studio-innosino-cms && npm run dev   # Studio, :3333
npm run cf:preview                  # site + Worker under wrangler, needs .dev.vars
```

`/api/apply` does not exist under `next dev` — there is no Worker. The form
detects the failure and falls back to email rather than reporting a success it
cannot back up. Use `cf:preview` to exercise the real endpoint.

## The migration scripts

`studio-innosino-cms/scripts/` holds the one-time imports that moved the site
onto the CMS. They are kept as a record of how the content got its shape.

**`migrate.mjs` no longer runs** — it reads `src/content/` modules the
migration deleted. Restoring them from git is the only way to re-run it, and
there should be no reason to. The smaller scripts still work.
