/**
 * Rewrites the privacyPage body so the closing "Contact Us" clause lives in
 * its own fields. The page renders that clause alongside the email address and
 * its copy button, so leaving it inside the rich-text body would print the
 * heading twice.
 */
import {createClient} from '@sanity/client'
import {readFileSync} from 'node:fs'
import {join} from 'node:path'
import {homedir} from 'node:os'

const token = JSON.parse(
  readFileSync(join(homedir(), '.config', 'sanity', 'config.json'), 'utf8'),
).authToken
const client = createClient({
  projectId: 'x3v92ipd',
  dataset: 'production',
  apiVersion: '2026-09-11',
  token,
  useCdn: false,
})

const doc = await client.getDocument('privacyPage')
if (!doc) throw new Error('privacyPage not found')

const text = (b) => (b.children ?? []).map((c) => c.text ?? '').join('')
const i = doc.body.findIndex((b) => b.style === 'h3' && text(b).trim() === 'Contact Us')
if (i === -1) {
  console.log('No "Contact Us" heading in body — already split.')
  process.exit(0)
}

await client.patch('privacyPage').set({
  body: doc.body.slice(0, i),
  contactHeading: text(doc.body[i]),
  contactBody: doc.body.slice(i + 1).map(text).filter(Boolean).join(' '),
}).commit()

console.log(`privacyPage split: ${i} clause blocks kept, contact section extracted.`)
