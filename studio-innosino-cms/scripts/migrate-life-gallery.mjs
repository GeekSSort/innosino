/**
 * Uploads the Life page carousel images and stores them as lifePage.gallery.
 *
 * The first import only carried the three photos the career strip reuses; the
 * carousel on the page itself had its own five, declared inline in the
 * component where no editor could reach them.
 */
import {createClient} from '@sanity/client'
import {readFileSync, writeFileSync, existsSync} from 'node:fs'
import {basename, join} from 'node:path'
import {homedir} from 'node:os'

const CACHE = new URL('./.asset-cache.json', import.meta.url).pathname
const PUBLIC = '/Users/sirajul/innosino/public'

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

const cache = existsSync(CACHE) ? JSON.parse(readFileSync(CACHE, 'utf8')) : {}

const PHOTOS = [
  {src: '/lifeininnosino/12.webp', alt: 'Team collaboration'},
  {src: '/lifeininnosino/13.webp', alt: 'INNOSINO bright open office'},
  {src: '/lifeininnosino/14.webp', alt: 'Engineering brainstorming room'},
  {src: '/lifeininnosino/2.webp', alt: 'Electronics workbench'},
  {src: '/lifeininnosino/3.webp', alt: 'Team scrum & review'},
]

let n = 0
const key = () => `k${(n++).toString(36)}${Math.random().toString(36).slice(2, 7)}`

const gallery = []
for (const photo of PHOTOS) {
  let id = cache[photo.src]
  if (!id) {
    const file = join(PUBLIC, photo.src.replace(/^\//, ''))
    if (!existsSync(file)) throw new Error(`missing ${file}`)
    const asset = await client.assets.upload('image', readFileSync(file), {
      filename: basename(file),
    })
    id = asset._id
    cache[photo.src] = id
    writeFileSync(CACHE, JSON.stringify(cache, null, 2))
    process.stdout.write('.')
  }
  gallery.push({
    _key: key(),
    _type: 'image',
    asset: {_type: 'reference', _ref: id},
    alt: photo.alt,
  })
}

await client.patch('lifePage').set({gallery}).commit()
console.log(`\nlifePage.gallery set to ${gallery.length} photos.`)
