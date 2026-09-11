/**
 * Gives each job opening a slug so it can have a page of its own, and splits
 * the old "Shanghai · Full-time" meta line into the two fields it always was.
 *
 * Location and contract type are separate because Google's JobPosting markup
 * wants them separately — and because one string holding two facts is a field
 * nobody can filter on later.
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

const slugify = (s) =>
  s.toLowerCase().trim().replace(/&/g, ' and ').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')

/** "Shanghai · 6 months" is an internship in everything but name. */
const TYPES = {
  'full-time': 'Full-time',
  'part-time': 'Part-time',
  contract: 'Contract',
  internship: 'Internship',
}
const readType = (raw, title) => {
  const key = (raw ?? '').toLowerCase().trim()
  if (TYPES[key]) return TYPES[key]
  if (/intern/i.test(title) || /month/i.test(key)) return 'Internship'
  return 'Full-time'
}

const roles = await client.fetch('*[_type == "openRole"]{_id, title, meta, location, employmentType, slug}')
if (!roles.length) throw new Error('no openRole documents found')

const today = new Date().toISOString().slice(0, 10)
let tx = client.transaction()
for (const r of roles) {
  const [rawLocation, rawType] = (r.meta ?? '').split('·').map((p) => p.trim())
  tx = tx.patch(r._id, (p) =>
    p
      .set({
        slug: r.slug ?? {_type: 'slug', current: slugify(r.title)},
        location: r.location ?? rawLocation ?? 'Shanghai',
        employmentType: r.employmentType ?? readType(rawType, r.title),
        postedAt: today,
      })
      /* meta is now derived from the two fields above; leaving it would be a
         third copy of the same fact, free to drift. */
      .unset(['meta']),
  )
  console.log(`  ${r.title} -> /career/${slugify(r.title)}`)
}
await tx.commit()
console.log(`\nPatched ${roles.length} job openings.`)
