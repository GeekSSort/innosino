/** Uploads the ten-photo mosaic that was declared inline in the page. */
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
  projectId: 'x3v92ipd', dataset: 'production',
  apiVersion: '2026-09-11', token, useCdn: false,
})
const cache = existsSync(CACHE) ? JSON.parse(readFileSync(CACHE, 'utf8')) : {}

/* Order matches the mosaic's slots, each of which has its own size. */
const PHOTOS = [
  {src: '/lifeininnosino/8.webp', alt: 'Office moments'},
  {src: '/lifeininnosino/2.webp', alt: 'Team collaboration'},
  {src: '/lifeininnosino/3.webp', alt: 'Group discussion'},
  {src: '/lifeininnosino/4.webp', alt: 'Breakout space'},
  {src: '/lifeininnosino/5.webp', alt: 'Coding in flow'},
  {src: '/lifeininnosino/9.webp', alt: 'Innosino Headquarters'},
  {src: '/lifeininnosino/6.webp', alt: 'Modern workspace'},
  {src: '/lifeininnosino/7.webp', alt: 'Coffee chat'},
  {src: '/lifeininnosino/10.webp', alt: 'Peer review'},
  {src: '/lifeininnosino/11.webp', alt: 'Focused engineering'},
]

let n = 0
const key = () => `k${(n++).toString(36)}${Math.random().toString(36).slice(2, 7)}`
const mosaic = []
for (const photo of PHOTOS) {
  let id = cache[photo.src]
  if (!id) {
    const file = join(PUBLIC, photo.src.replace(/^\//, ''))
    if (!existsSync(file)) throw new Error(`missing ${file}`)
    const asset = await client.assets.upload('image', readFileSync(file), {filename: basename(file)})
    id = asset._id
    cache[photo.src] = id
    writeFileSync(CACHE, JSON.stringify(cache, null, 2))
    process.stdout.write('.')
  }
  mosaic.push({_key: key(), _type: 'image', asset: {_type: 'reference', _ref: id}, alt: photo.alt})
}

await client.patch('lifePage').set({photoMosaic: mosaic}).commit()
console.log(`\nlifePage.photoMosaic set to ${mosaic.length} photos.`)
