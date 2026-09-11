/**
 * Seeds each page's SEO fields with the title and description the site already
 * shipped, so an editor opening the Studio sees the real metadata rather than
 * two empty boxes they have to guess at.
 *
 * The layouts keep the same pair as a fallback, so clearing a field in the
 * Studio restores it rather than emptying the tag.
 */
import {createClient} from '@sanity/client'
import {readFileSync} from 'node:fs'
import {join} from 'node:path'
import {homedir} from 'node:os'

const token = JSON.parse(
  readFileSync(join(homedir(), '.config', 'sanity', 'config.json'), 'utf8'),
).authToken
const client = createClient({
  projectId: 'x3v92ipd', dataset: 'production',
  apiVersion: '2026-09-11', token, useCdn: false,
})

const pairs = JSON.parse(
  readFileSync(new URL('./page-seo.json', import.meta.url), 'utf8'),
)

let tx = client.transaction()
for (const [id, {title, description}] of Object.entries(pairs)) {
  tx = tx.patch(id, (p) => p.set({'seo.title': title, 'seo.description': description}))
}
await tx.commit()
console.log(`Seeded SEO on ${Object.keys(pairs).length} pages.`)
