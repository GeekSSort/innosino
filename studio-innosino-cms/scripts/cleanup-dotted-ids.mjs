/**
 * Removes the first import's documents, which used dotted ids
 * ("post.my-slug"). Sanity's public grant is `_id in path("*")` — one segment
 * only — so dotted ids are invisible to anonymous reads and a static build
 * sees an empty dataset. The re-import writes hyphenated ids instead.
 *
 * Safe to run twice: a query matching nothing deletes nothing.
 */
import {createClient} from '@sanity/client'
import {readFileSync} from 'node:fs'
import {join} from 'node:path'
import {homedir} from 'node:os'

const token = JSON.parse(
  readFileSync(join(homedir(), '.config', 'sanity', 'config.json'), 'utf8'),
).authToken
if (!token) throw new Error('No authToken. Run: npx sanity login')

const client = createClient({
  projectId: 'x3v92ipd',
  dataset: 'production',
  apiVersion: '2026-09-11',
  token,
  useCdn: false,
})

const PREFIXES = ['post', 'category', 'service', 'project', 'industry', 'testimonial', 'openRole']
const filter = PREFIXES.map((p) => `_id in path("${p}.**")`).join(' || ')

const doomed = await client.fetch(`*[${filter}]._id`)
if (!doomed.length) {
  console.log('Nothing to clean up.')
  process.exit(0)
}

console.log(`Deleting ${doomed.length} documents with dotted ids...`)
await client.delete({query: `*[${filter}]`})
console.log('Done.')
