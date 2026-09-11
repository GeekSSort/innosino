/**
 * One-time import of src/content/* into the Content Lake.
 *
 * Ids use a hyphen, never a dot. Sanity's default public grant is
 * `_id in path("*")`, which matches single-segment ids only — an id like
 * "post.my-slug" reads as a two-segment path, the same shape as "drafts.*",
 * and is silently excluded from anonymous reads. A static build has no
 * credentials, so dotted ids make every query return nothing.
 *
 * Re-runnable: every document is written with createOrReplace under an id
 * derived from its slug, and uploaded assets are cached in .asset-cache.json,
 * so a second run updates in place instead of duplicating. Readable ids are a
 * deliberate exception to "let Sanity generate _id" — they are what makes the
 * import idempotent while we iterate. References are still resolved through a
 * lookup map rather than by rebuilding an id string at the reference site.
 *
 * Videos are NOT uploaded. They stay in /public and are stored as paths: the
 * home page autoplays 21 MB of loops for every visitor, and asset bandwidth is
 * metered where static hosting is not.
 *
 * Usage:  node scripts/migrate.mjs [--dry]
 */
import {createClient} from '@sanity/client'
import {readFileSync, writeFileSync, existsSync} from 'node:fs'
import {basename, join} from 'node:path'
import {homedir} from 'node:os'

const APP = '/Users/sirajul/innosino'
const PUBLIC = join(APP, 'public')
const CACHE = new URL('./.asset-cache.json', import.meta.url).pathname
const DRY = process.argv.includes('--dry')

/* ---------- client ---------- */

const cliConfig = join(homedir(), '.config', 'sanity', 'config.json')
if (!existsSync(cliConfig)) {
  throw new Error(`No Sanity CLI credentials at ${cliConfig}. Run: npx sanity login`)
}
const token = JSON.parse(readFileSync(cliConfig, 'utf8')).authToken
if (!token) throw new Error('No authToken in the Sanity CLI config. Run: npx sanity login')

const client = createClient({
  projectId: 'x3v92ipd',
  dataset: 'production',
  apiVersion: '2026-09-11',
  token,
  useCdn: false,
})

/* ---------- content modules ---------- */

const c = (name) => import(join(APP, 'src/content', name))
const [
  posts, services, projectsMod, home, about, career, contact,
  expertise, blogs, industriesMod, servicesIndexMod, site, navigation, privacy, life,
] = await Promise.all([
  c('posts.ts'), c('services.ts'), c('projects.ts'), c('home.ts'), c('about.ts'),
  c('career.ts'), c('contact.ts'), c('expertise.ts'), c('blogs.ts'), c('industries.ts'),
  c('servicesIndex.ts'), c('site.ts'), c('navigation.ts'), c('privacyPolicy.ts'), c('lifeAtInnosino.ts'),
])

/* ---------- helpers ---------- */

let keySeq = 0
const key = () => `k${(keySeq++).toString(36)}${Math.random().toString(36).slice(2, 7)}`

const slugify = (s) =>
  s.toLowerCase().trim().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')

const slugField = (current) => ({_type: 'slug', current})

/** Paragraph strings -> Portable Text blocks. */
const toPortableText = (paragraphs, style = 'normal') =>
  paragraphs.filter(Boolean).map((text) => ({
    _type: 'block',
    _key: key(),
    style,
    markDefs: [],
    children: [{_type: 'span', _key: key(), text, marks: []}],
  }))

const bullets = (items) =>
  items.filter(Boolean).map((text) => ({
    _type: 'block',
    _key: key(),
    style: 'normal',
    listItem: 'bullet',
    level: 1,
    markDefs: [],
    children: [{_type: 'span', _key: key(), text, marks: []}],
  }))

const keyed = (items) => items.map((item) => ({_key: key(), ...item}))

const splitHeading = (h) => ({_type: 'splitHeading', lead: h.lead, accent: h.accent})

const heroFrom = ({breadcrumb, title, titleLead, titleAccent, sub}) => ({
  _type: 'pageHero',
  breadcrumb,
  heading: {
    _type: 'splitHeading',
    lead: titleLead ?? title ?? '',
    accent: titleAccent ?? '',
  },
  subtitle: sub,
})

/* ---------- assets ---------- */

const assetCache = existsSync(CACHE) ? JSON.parse(readFileSync(CACHE, 'utf8')) : {}
const missingAssets = []

async function uploadImage(publicPath) {
  if (!publicPath) return undefined
  if (assetCache[publicPath]) return assetCache[publicPath]

  const file = join(PUBLIC, decodeURIComponent(publicPath).replace(/^\//, ''))
  if (!existsSync(file)) {
    missingAssets.push(publicPath)
    return undefined
  }
  if (DRY) return 'image-DRYRUN'

  const asset = await client.assets.upload('image', readFileSync(file), {
    filename: basename(file),
  })
  assetCache[publicPath] = asset._id
  writeFileSync(CACHE, JSON.stringify(assetCache, null, 2))
  process.stdout.write('.')
  return asset._id
}

async function imageField(publicPath, alt) {
  const id = await uploadImage(publicPath)
  if (!id) return undefined
  return {
    _type: 'image',
    asset: {_type: 'reference', _ref: id},
    ...(alt ? {alt} : {}),
  }
}

/* ---------- documents ---------- */

const docs = []
const ref = (id) => ({_type: 'reference', _ref: id})

/* Blog categories. "All" is a UI pill the index always renders, not a category. */
const categoryIds = new Map()
blogs.categories
  .filter((title) => title !== 'All')
  .forEach((title, i) => {
    const id = `category-${slugify(title)}`
    categoryIds.set(title, id)
    docs.push({
      _id: id,
      _type: 'category',
      title,
      slug: slugField(slugify(title)),
      order: i,
    })
  })

/* Posts */
for (const p of posts.posts) {
  const primary = categoryIds.get(p.category)
  const extras = p.filterTags
    .filter((t) => t !== 'All' && t !== p.category)
    .map((t) => categoryIds.get(t))
    .filter(Boolean)

  docs.push({
    _id: `post-${p.slug}`,
    _type: 'post',
    title: p.title,
    slug: slugField(p.slug),
    excerpt: p.excerpt,
    ...(primary ? {category: ref(primary)} : {}),
    filterTags: extras.map((id) => ({_key: key(), ...ref(id)})),
    publishedAt: p.date,
    image: await imageField(p.image, p.title),
    ...(p.pullQuote ? {pullQuote: p.pullQuote} : {}),
    sections: p.sections.map((s) => ({
      _key: key(),
      _type: 'section',
      heading: s.heading,
      anchorId: slugField(s.id),
      body: toPortableText(s.body),
    })),
    author: posts.postAuthor,
    authorInitials: posts.postAuthorInitials,
  })
}

/* Projects.
 *
 * Three sources describe the same handful of projects, so they are merged by
 * title into one document each:
 *   - allProjects    the grid cards. Nine entries, but only three distinct
 *                    projects — each repeats three times to fill a 3x3 grid.
 *                    The duplication is a layout artefact, not content, so it
 *                    is not carried into the CMS.
 *   - featuredProject the /projects hero. "Smart Musical Instruments" appears
 *                    here and on the home page but never in the grid.
 *   - home.featuredProjects  the same projects again, with their stat figures.
 */
const projectIds = new Map()
{
  const merged = new Map()
  const upsert = (title, patch) => {
    const existing = merged.get(title) ?? {title, order: merged.size}
    merged.set(title, {...existing, ...patch})
  }

  for (const p of projectsMod.allProjects) {
    if (merged.has(p.title)) continue
    upsert(p.title, {
      category: p.category,
      filterTags: p.filterTags.filter((t) => t !== 'All'),
      description: p.desc,
      imagePath: p.img,
    })
  }

  const fp = projectsMod.featuredProject
  upsert(fp.title, {
    description: merged.get(fp.title)?.description ?? fp.desc,
    imagePath: merged.get(fp.title)?.imagePath ?? fp.image,
    isFeatured: true,
    featuredBadge: fp.badge,
  })

  for (const f of home.featuredProjects) {
    upsert(f.title, {
      description: merged.get(f.title)?.description ?? f.description,
      imagePath: merged.get(f.title)?.imagePath ?? f.image,
      stats: f.stats,
    })
  }

  for (const p of merged.values()) {
    const slug = slugify(p.title)
    const id = `project-${slug}`
    projectIds.set(p.title, id)
    docs.push({
      _id: id,
      _type: 'project',
      title: p.title,
      slug: slugField(slug),
      category: p.category ?? 'Smart Devices',
      filterTags: p.filterTags ?? [],
      description: p.description,
      image: await imageField(p.imagePath, p.title),
      order: p.order,
      isFeatured: Boolean(p.isFeatured),
      ...(p.isFeatured && p.featuredBadge ? {featuredBadge: p.featuredBadge} : {}),
      stats: keyed(
        (p.stats ?? []).map((st) => ({_type: 'stat', value: st.value, label: st.label})),
      ),
    })
  }
}

/* Services */
const gridSlugs = new Set(
  navigation.serviceGridLinks.map((l) => l.href.replace('/services/', '')),
)
const serviceIds = new Map()
for (const [i, s] of services.services.entries()) {
  const id = `service-${s.slug}`
  serviceIds.set(s.slug, id)
  docs.push({
    _id: id,
    _type: 'service',
    title: s.title,
    slug: slugField(s.slug),
    description: s.description,
    order: i,
    navGroup: gridSlugs.has(s.slug) ? 'grid' : 'stack',
    processStages: keyed(
      s.processStages.map((x) => ({_type: 'stage', label: x.stage, title: x.title, description: x.desc})),
    ),
    onDemandServices: keyed(
      s.onDemandServices.map((x) => ({_type: 'numberedItem', number: x.num, title: x.title, description: x.desc})),
    ),
    whyUsPoints: keyed(
      s.whyUsPoints.map((x) => ({_type: 'numberedItem', number: x.num, title: x.title, description: x.desc})),
    ),
    faqs: keyed(s.faqs.map((f) => ({_type: 'faq', question: f.q, answer: f.a}))),
    projects: await Promise.all(
      (s.projects ?? []).map(async (p) => ({
        _key: key(),
        _type: 'caseStudy',
        title: p.title,
        category: p.category,
        description: p.desc,
        image: await imageField(p.image, p.title),
      })),
    ),
  })
}

/* Industries */
const industryIds = []
for (const [i, ind] of home.industriesList.entries()) {
  const id = `industry-${slugify(ind.title)}`
  industryIds.push(id)
  docs.push({
    _id: id,
    _type: 'industry',
    title: ind.title,
    slug: slugField(slugify(ind.title)),
    description: ind.description,
    image: await imageField(ind.image, ind.title),
    order: i,
  })
}

/* Testimonials */
const testimonialIds = []
for (const [i, t] of about.testimonials.entries()) {
  const id = `testimonial-${slugify(t.author)}-${i}`
  testimonialIds.push(id)
  docs.push({
    _id: id,
    _type: 'testimonial',
    quote: t.quote,
    author: t.author,
    role: t.role,
    avatar: await imageField(t.avatar, t.author),
    order: i,
  })
}

/* Open roles */
career.openRoles.forEach((r, i) => {
  docs.push({
    _id: `openRole-${slugify(r.title)}`,
    _type: 'openRole',
    title: r.title,
    number: r.num,
    meta: r.meta,
    description: r.desc,
    isOpen: true,
    order: i,
  })
})

/* ---------- singletons ---------- */

docs.push({
  _id: 'siteSettings',
  _type: 'siteSettings',
  siteName: site.siteName,
  copyright: site.copyright,
  navItems: keyed(
    navigation.navItems.map((n) => ({
      _type: 'navItem',
      label: n.label,
      href: n.href,
      secondary: Boolean(n.secondary),
    })),
  ),
  moreLinks: keyed(navigation.moreLinks.map((l) => ({_type: 'link', label: l.label, href: l.href}))),
  footerLinks: keyed(site.footerLinks.map((l) => ({_type: 'link', label: l.label, href: l.href}))),
  email: site.contactDetails.email.value,
  whatsApp: site.contactDetails.whatsApp.value,
  linkedin: site.social.linkedin,
  chatWidget: {
    greeting: site.chatWidget.greeting,
    toggleLabel: site.chatWidget.toggleLabel,
    closeLabel: site.chatWidget.closeLabel,
  },
  legalName: 'INNOSINO (上海) Technology Co., Ltd.',
  organizationDescription:
    'An innovation-driven engineering company turning ideas into high-performance, market-ready products across embedded systems, hardware and PCB design, product development and industrial automation.',
  logo: await imageField('/about_us/IS-Logo.webp', 'INNOSINO'),
  headquarters: {locality: 'Shanghai', country: 'CN'},
  founder: {name: about.founderQuote.name, title: about.founderQuote.role},
  ctaBanner: {
    _type: 'ctaBanner',
    title: site.ctaBanner.title,
    body: site.ctaBanner.body,
    action: {_type: 'link', label: site.ctaBanner.action.label, href: site.ctaBanner.action.href},
  },
})

/* Home */
const splashOrder = ['coreServices', 'featuredProject', 'industrySolutions']
docs.push({
  _id: 'homePage',
  _type: 'homePage',
  hero: {
    titleLead: home.heroCopy.titleLead,
    titleAccent: home.heroCopy.titleAccent,
    subtitle: home.heroCopy.subtitle,
  },
  splashFrames: keyed(
    splashOrder.map((k) => {
      const f = home.splashFrames[k]
      return {
        _type: 'splashFrame',
        title: f.title,
        ...(f.heading ? {heading: f.heading} : {}),
        loopSeconds: f.loopSeconds,
      }
    }),
  ),
  serviceMedia: await Promise.all(
    home.serviceMedia.map(async (m) => ({
      _key: key(),
      _type: 'serviceClip',
      title: m.title,
      body: m.body,
      ...(serviceIds.get(m.id) ? {service: ref(serviceIds.get(m.id))} : {}),
      video: m.videoSrc,
      ...(m.webmSrc ? {videoWebm: m.webmSrc} : {}),
      poster: await imageField(m.posterSrc, m.title),
      scrimOpacity: m.scrimOpacity,
      playbackRate: m.playbackRate ?? 1,
    })),
  ),
  featuredProjectsLede: home.featuredProjectsLede,
  featuredProjects: home.featuredProjects
    .map((f) => projectIds.get(f.title))
    .filter(Boolean)
    .map((id) => ({_key: key(), ...ref(id)})),
  industriesLede: home.industriesLede,
  industries: industryIds.map((id) => ({_key: key(), ...ref(id)})),
})

/* About */
docs.push({
  _id: 'aboutPage',
  _type: 'aboutPage',
  hero: heroFrom({
    breadcrumb: about.aboutHero.breadcrumb,
    title: about.aboutHero.title,
  }),
  founderQuote: {
    text: about.founderQuote.text,
    name: about.founderQuote.name,
    role: about.founderQuote.role,
  },
  vision: {title: about.visionMission.vision.label, body: about.visionMission.vision.desc},
  mission: {title: about.visionMission.mission.label, body: about.visionMission.mission.desc},
  visionFigure: await imageField(about.visionMission.figure.src, about.visionMission.figure.alt),
  driveHeading: splitHeading(about.aboutHeadings.drives),
  driveCards: keyed(
    about.driveCards.map((d) => ({_type: 'textCard', title: d.title, description: d.desc})),
  ),
  resultsHeading: splitHeading(about.aboutHeadings.results),
  stats: keyed(
    about.stats.map((s) => ({_type: 'stat', value: s.number, label: s.title, description: s.desc})),
  ),
  testimonialsHeading: splitHeading(about.aboutHeadings.testimonials),
  testimonials: testimonialIds.map((id) => ({_key: key(), ...ref(id)})),
})

/* Services index */
docs.push({
  _id: 'servicesPage',
  _type: 'servicesPage',
  hero: heroFrom(servicesIndexMod.servicesIndex),
})

/* Expertise */
docs.push({
  _id: 'expertisePage',
  _type: 'expertisePage',
  hero: heroFrom(expertise.expertiseHero),
  whyHeading: splitHeading(expertise.expertiseHeadings.why),
  featureCards: keyed(
    expertise.featureCards.map((f) => ({_type: 'textCard', title: f.title, description: f.desc})),
  ),
  toolsHeading: splitHeading(expertise.expertiseHeadings.tools),
  toolsAndTech: keyed(
    expertise.toolsAndTech.map((t) => ({_type: 'textCard', title: t.title, description: t.desc})),
  ),
  processHeading: splitHeading(expertise.expertiseHeadings.process),
  processStages: keyed(
    [...expertise.processStagesRow1, ...expertise.processStagesRow2].map((s) => ({
      _type: 'stage',
      label: s.stage,
      title: s.title,
      description: s.desc,
    })),
  ),
})

/* Industries */
docs.push({
  _id: 'industriesPage',
  _type: 'industriesPage',
  hero: heroFrom(industriesMod.industriesPage),
  gridHeading: splitHeading(industriesMod.industriesPage.gridHeading),
})

/* Projects */
docs.push({
  _id: 'projectsPage',
  _type: 'projectsPage',
  hero: heroFrom(projectsMod.projectsHero),
  featuredEyebrow: projectsMod.featuredProject.eyebrow,
  recentHeading: splitHeading(projectsMod.projectsHeadings.recent),
  categories: projectsMod.projectCategories.filter((t) => t !== 'All'),
})

/* Blog index */
docs.push({
  _id: 'blogsPage',
  _type: 'blogsPage',
  hero: heroFrom(blogs.blogsHero),
})

/* Career */
docs.push({
  _id: 'careerPage',
  _type: 'careerPage',
  hero: heroFrom(career.careerHero),
  whyJoinHeading: splitHeading(career.whyJoin.heading),
  whyJoinCards: keyed(
    career.whyJoin.cards.map((c) => ({_type: 'textCard', title: c.title, description: c.desc})),
  ),
  hiringHeading: splitHeading(career.hiring.heading),
  hiringSteps: keyed(
    career.hiring.steps.map((s) => ({_type: 'numberedItem', number: s.num, title: s.title, description: s.desc})),
  ),
  lifeHeading: splitHeading(career.lifeStrip.heading),
  lifeLink: {_type: 'link', label: career.lifeStrip.link.label, href: career.lifeStrip.link.href},
  lifePhotos: (
    await Promise.all(career.lifeStrip.photos.map((p) => imageField(p.src, p.alt)))
  )
    .filter(Boolean)
    .map((img) => ({_key: key(), ...img})),
  cta: {
    _type: 'ctaBanner',
    title: career.careerCta.title,
    body: career.careerCta.body,
    action: {
      _type: 'link',
      label: career.careerCta.action.label,
      href: career.careerCta.action.href,
    },
  },
})

/* Contact */
docs.push({
  _id: 'contactPage',
  _type: 'contactPage',
  hero: heroFrom(contact.contactHero),
  form: {
    title: contact.contactForm.title,
    lede: contact.contactForm.lede,
    points: contact.contactForm.points,
  },
  hubsLede: contact.hubsLede,
  hubs: keyed(
    contact.contactHubs.map((h) => ({
      _type: 'hub',
      city: h.city,
      address: h.address,
      map: h.map,
      /* Dhaka is DBTECH's office, a partner rather than INNOSINO, so it must
         not be claimed as our own location in the structured data. */
      isOwnOffice: h.city.toUpperCase() !== 'DHAKA',
    })),
  ),
  faqHeading: splitHeading(contact.contactHeadings.faq),
  faqs: keyed(contact.contactFaqs.map((f) => ({_type: 'faq', question: f.q, answer: f.a}))),
})

/* Life at INNOSINO — rebuilt from the Figma-extracted keys into real fields. */
const L = life.lifeAtInnosino
docs.push({
  _id: 'lifePage',
  _type: 'lifePage',
  hero: {
    _type: 'pageHero',
    breadcrumb: L.lifeAtInnosino,
    heading: {_type: 'splitHeading', lead: L.lifeAtInnosino2, accent: ''},
    subtitle: L.getAGlimpseOf,
  },
  ambition: L.ourAmbitionIsTo,
  highlights: keyed([
    {_type: 'highlight', title: L.revCBringUp, body: L.theEntirePolypanBoard},
    {_type: 'highlight', title: L.n16ProjectsShippedThis, body: L.thisMonthWeSuccessfully},
    {_type: 'highlight', title: L.bleMidiLatencyNow, body: L.afterExtensiveTestingAnd},
  ]),
  gallery: (
    await Promise.all(
      ['/lifeininnosino/4.webp', '/lifeininnosino/8.webp', '/lifeininnosino/12.webp'].map((p) =>
        imageField(p, 'Life at INNOSINO'),
      ),
    )
  )
    .filter(Boolean)
    .map((img) => ({_key: key(), ...img})),
})

/* Privacy policy — the heading/paragraph pairs become one ordered body. */
const P = privacy.privacyPolicy
docs.push({
  _id: 'privacyPage',
  _type: 'privacyPage',
  hero: {
    _type: 'pageHero',
    breadcrumb: P.privacyPolicy,
    heading: {_type: 'splitHeading', lead: P.privacyPolicy2, accent: ''},
    subtitle: P.innosinoBuildsHardwareAnd,
  },
  lastUpdated: '2026-07-01',
  body: [
    ...toPortableText([P.informationWeCollect], 'h3'),
    ...toPortableText([P.howWeUseIt], 'h3'),
    ...bullets([P.respondToProjectInquiries, P.improveTheWebsiteAnd, P.sendUpdatesOnlyIf]),
    ...toPortableText([P.dataSharing], 'h3'),
    ...toPortableText([P.weDonTSell]),
    ...toPortableText([P.dataRetentionSecurity], 'h3'),
    ...toPortableText([P.weKeepPersonalData]),
    ...toPortableText([P.yourRights], 'h3'),
    ...toPortableText([P.youCanRequestAccess]),
    ...toPortableText([P.childrenSPrivacy], 'h3'),
    ...toPortableText([P.ourSiteIsnT]),
    ...toPortableText([P.changesToThisPolicy], 'h3'),
    ...toPortableText([P.questionsAboutThisPolicy]),
    ...toPortableText([P.contactUs], 'h3'),
    ...toPortableText([P.questionsAboutThisPolicy2]),
  ],
})

/* ---------- commit ---------- */

const counts = docs.reduce((acc, d) => ({...acc, [d._type]: (acc[d._type] ?? 0) + 1}), {})
console.log('\n\nDocuments built:')
for (const [type, n] of Object.entries(counts).sort()) console.log(`  ${String(n).padStart(3)}  ${type}`)
console.log(`  ${String(docs.length).padStart(3)}  TOTAL`)

if (missingAssets.length) {
  console.log(`\nMissing asset files (${missingAssets.length}), field left empty:`)
  for (const p of [...new Set(missingAssets)]) console.log(`  ${p}`)
}

if (DRY) {
  console.log('\n--dry: nothing written.')
  process.exit(0)
}

let tx = client.transaction()
for (const doc of docs) tx = tx.createOrReplace(doc)
await tx.commit()
console.log(`\nCommitted ${docs.length} documents to x3v92ipd/production.`)
