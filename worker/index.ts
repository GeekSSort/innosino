/**
 * The site's only server-side code.
 *
 * Everything else is a static export served straight from the edge; this
 * Worker exists for one route, POST /api/apply, because a job application has
 * to reach the Content Lake and writing to it needs a token. A write token in
 * the browser bundle would let anyone edit or empty the dataset, so it lives
 * here as a Worker secret instead:
 *
 *   wrangler secret put SANITY_WRITE_TOKEN
 *
 * `run_worker_first` is deliberately unset in wrangler.jsonc, so a request for
 * a page or an asset never invokes this Worker and the site stays free to
 * serve. Only unmatched paths get here.
 */

interface Env {
  /**
   * The static site, bound in wrangler.jsonc. Typed structurally rather than
   * as Cloudflare's `Fetcher` so the app's typecheck does not need
   * @cloudflare/workers-types for a single interface.
   */
  ASSETS: { fetch(request: Request): Promise<Response> };
  /** Set with `wrangler secret put SANITY_WRITE_TOKEN`. Never in the repo. */
  SANITY_WRITE_TOKEN: string;
}

const SANITY_PROJECT_ID = "x3v92ipd";
const SANITY_DATASET = "production";
const SANITY_API_VERSION = "2026-09-11";

/** Long enough for a real application, short enough that nobody stores a novel. */
const LIMITS = {
  name: 200,
  email: 320,
  phone: 60,
  links: 500,
  message: 5000,
  roleTitle: 200,
  roleSlug: 200,
} as const;

type Field = keyof typeof LIMITS;

const json = (body: unknown, status: number) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { "content-type": "application/json" },
  });

function clean(value: unknown, field: Field): string {
  if (typeof value !== "string") return "";
  return value.trim().slice(0, LIMITS[field]);
}

async function handleApply(request: Request, env: Env): Promise<Response> {
  if (request.method !== "POST") {
    return json({ error: "Method not allowed" }, 405);
  }

  if (!env.SANITY_WRITE_TOKEN) {
    // Loud rather than silent: a missing secret must not look like success.
    return json({ error: "Applications are not configured" }, 500);
  }

  let payload: Record<string, unknown>;
  try {
    payload = (await request.json()) as Record<string, unknown>;
  } catch {
    return json({ error: "Expected JSON" }, 400);
  }

  /*
   * A field no human can see. Bots fill in everything they find, so anything
   * arriving with this set is discarded — and answered with 200, because
   * telling a bot it failed only invites it to try again differently.
   */
  if (clean(payload.company, "name")) {
    return json({ ok: true }, 200);
  }

  const name = clean(payload.name, "name");
  const email = clean(payload.email, "email");
  const message = clean(payload.message, "message");
  const roleTitle = clean(payload.roleTitle, "roleTitle");

  if (!name || !email || !message || !roleTitle) {
    return json({ error: "Name, email, role and message are required" }, 400);
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return json({ error: "That email address does not look right" }, 400);
  }

  const doc = {
    _type: "jobApplication",
    roleTitle,
    roleSlug: clean(payload.roleSlug, "roleSlug"),
    name,
    email,
    phone: clean(payload.phone, "phone"),
    links: clean(payload.links, "links"),
    message,
    /* Set here rather than taken from the request: a timestamp the sender
       controls is not a timestamp. */
    submittedAt: new Date().toISOString(),
    status: "new",
  };

  const res = await fetch(
    `https://${SANITY_PROJECT_ID}.api.sanity.io/v${SANITY_API_VERSION}/data/mutate/${SANITY_DATASET}`,
    {
      method: "POST",
      headers: {
        "content-type": "application/json",
        authorization: `Bearer ${env.SANITY_WRITE_TOKEN}`,
      },
      body: JSON.stringify({ mutations: [{ create: doc }] }),
    },
  );

  if (!res.ok) {
    // The applicant gets a generic failure; the detail goes to the Worker log.
    console.error("Sanity mutate failed", res.status, await res.text());
    return json({ error: "Could not save your application" }, 502);
  }

  return json({ ok: true }, 200);
}

const worker = {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);

    if (url.pathname === "/api/apply") {
      return handleApply(request, env);
    }

    // Anything else is the static site.
    return env.ASSETS.fetch(request);
  },
};

export default worker;
