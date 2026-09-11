/**
 * Creates the Sanity webhook that rebuilds the site when content is published.
 *
 * Run it and paste a GitHub token when prompted. The token is read from the
 * terminal with the echo suppressed - it is never an argument, never written
 * to a file, and never appears in shell history.
 *
 *   node scripts/create-deploy-webhook.mjs
 */
import {createInterface} from 'node:readline'
import {readFileSync} from 'node:fs'
import {join} from 'node:path'
import {homedir} from 'node:os'

const PROJECT_ID = 'x3v92ipd'
const REPO = 'GeekSSort/innosino'

const sanityToken = JSON.parse(
  readFileSync(join(homedir(), '.config', 'sanity', 'config.json'), 'utf8'),
).authToken
if (!sanityToken) throw new Error('Not logged in. Run: npx sanity login')

/** Prompt for a secret, redrawing the prompt so the typed value never shows. */
function askHidden(question) {
  return new Promise((resolve) => {
    const rl = createInterface({
      input: process.stdin,
      output: process.stdout,
      terminal: true,
    })
    const redraw = () => {
      process.stdout.clearLine(0)
      process.stdout.cursorTo(0)
      process.stdout.write(question)
    }
    process.stdin.on('data', redraw)
    rl.question(question, (answer) => {
      process.stdin.off('data', redraw)
      rl.close()
      process.stdout.write('\n')
      resolve(answer.trim())
    })
  })
}

const pat = await askHidden('Paste your GitHub token (hidden), then press Enter: ')
if (!pat) throw new Error('No token given.')

/* Check the token can actually reach the repo before creating a webhook that
   would otherwise fail silently every time somebody publishes. */
const probe = await fetch(`https://api.github.com/repos/${REPO}`, {
  headers: {authorization: `Bearer ${pat}`, accept: 'application/vnd.github+json'},
})
if (!probe.ok) {
  throw new Error(
    `GitHub rejected that token (${probe.status}). It needs write access to ${REPO}.`,
  )
}
console.log(`OK - token can reach ${REPO}`)

const body = {
  name: 'Rebuild site on publish',
  description: 'Triggers the Deploy workflow so published content reaches the live site.',
  url: `https://api.github.com/repos/${REPO}/dispatches`,
  on: ['create', 'update', 'delete'],
  /*
   * Drafts never trigger a build - only publishing does. Applications are
   * excluded outright: they arrive from the public form and would each kick
   * off a deploy of a site whose content has not changed.
   */
  filter: '!(_type match "jobApplication")',
  projection: '{"event_type": "sanity-publish"}',
  httpMethod: 'POST',
  apiVersion: 'v2021-03-25',
  includeDrafts: false,
  headers: {
    Authorization: `Bearer ${pat}`,
    Accept: 'application/vnd.github+json',
  },
}

const res = await fetch(`https://api.sanity.io/v2021-10-04/hooks/projects/${PROJECT_ID}`, {
  method: 'POST',
  headers: {
    'content-type': 'application/json',
    authorization: `Bearer ${sanityToken}`,
  },
  body: JSON.stringify(body),
})

const text = await res.text()
if (!res.ok) {
  throw new Error(`Sanity rejected the webhook (${res.status}): ${text}`)
}

console.log('OK - webhook created.')
console.log('')
console.log('Publish anything in the Studio and watch the build at:')
console.log(`  https://github.com/${REPO}/actions`)
