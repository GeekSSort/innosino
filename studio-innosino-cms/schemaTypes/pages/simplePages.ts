import {defineField, defineType, defineArrayMember} from 'sanity'
import {CogIcon} from '@sanity/icons/Cog'
import {BulbOutlineIcon} from '@sanity/icons/BulbOutline'
import {EarthGlobeIcon} from '@sanity/icons/EarthGlobe'
import {RocketIcon} from '@sanity/icons/Rocket'
import {DocumentTextIcon} from '@sanity/icons/DocumentText'
import {ImagesIcon} from '@sanity/icons/Images'
import {LockIcon} from '@sanity/icons/Lock'

/** /services — the index. The six disciplines are their own documents. */
export const servicesPage = defineType({
  name: 'servicesPage',
  title: 'Services index',
  type: 'document',
  icon: CogIcon,
  fields: [
    defineField({name: 'hero', type: 'pageHero', validation: (rule) => rule.required()}),
    defineField({name: 'seo', type: 'seo'}),
  ],
  preview: {
    select: {lead: 'hero.heading.lead', accent: 'hero.heading.accent'},
    prepare: ({lead, accent}: {lead?: string; accent?: string}) => ({
      title: 'Services index',
      subtitle: [lead, accent].filter(Boolean).join('') || undefined,
    }),
  },
})

/** /expertise — capability, tooling and the process rail. */
export const expertisePage = defineType({
  name: 'expertisePage',
  title: 'Expertise page',
  type: 'document',
  icon: BulbOutlineIcon,
  groups: [
    {name: 'hero', title: 'Top of the page', default: true},
    {name: 'body', title: 'Strengths & tools'},
    {name: 'process', title: 'How we work'},
    {name: 'meta', title: 'Google & sharing'},
  ],
  fields: [
    defineField({name: 'hero', type: 'pageHero', group: 'hero', validation: (rule) => rule.required()}),
    defineField({name: 'whyHeading', title: 'Why us — heading', type: 'splitHeading', group: 'body'}),
    defineField({
      name: 'featureCards',
      title: 'Why us',
      type: 'array',
      group: 'body',
      of: [defineArrayMember({type: 'textCard'})],
    }),
    defineField({name: 'toolsHeading', title: 'Tools — heading', type: 'splitHeading', group: 'body'}),
    defineField({
      name: 'toolsAndTech',
      title: 'Tools & technologies',
      type: 'array',
      group: 'body',
      of: [defineArrayMember({type: 'textCard'})],
    }),
    defineField({name: 'processHeading', title: 'Process — heading', type: 'splitHeading', group: 'process'}),
    defineField({
      name: 'processStages',
      title: 'Process stages',
      type: 'array',
      group: 'process',
      of: [defineArrayMember({type: 'stage'})],
      description: 'Rendered in two rows; the split is worked out from the count.',
    }),
    defineField({name: 'seo', type: 'seo', group: 'meta'}),
  ],
  preview: {
    select: {lead: 'hero.heading.lead', accent: 'hero.heading.accent'},
    prepare: ({lead, accent}: {lead?: string; accent?: string}) => ({
      title: 'Expertise page',
      subtitle: [lead, accent].filter(Boolean).join('') || undefined,
    }),
  },
})

/** /industries — the sectors themselves are their own documents. */
export const industriesPage = defineType({
  name: 'industriesPage',
  title: 'Industries page',
  type: 'document',
  icon: EarthGlobeIcon,
  fields: [
    defineField({name: 'hero', type: 'pageHero', validation: (rule) => rule.required()}),
    defineField({name: 'gridHeading', title: 'Grid heading', type: 'splitHeading'}),
    defineField({name: 'seo', type: 'seo'}),
  ],
  preview: {
    select: {lead: 'hero.heading.lead', accent: 'hero.heading.accent'},
    prepare: ({lead, accent}: {lead?: string; accent?: string}) => ({
      title: 'Industries page',
      subtitle: [lead, accent].filter(Boolean).join('') || undefined,
    }),
  },
})

/** /projects — the index frame. Cards come from project documents. */
export const projectsPage = defineType({
  name: 'projectsPage',
  title: 'Projects page',
  type: 'document',
  icon: RocketIcon,
  fields: [
    defineField({name: 'hero', type: 'pageHero', validation: (rule) => rule.required()}),
    defineField({
      name: 'featuredEyebrow',
      type: 'string',
      initialValue: 'Featured Project',
      description: 'The small label above the featured card.',
    }),
    defineField({name: 'recentHeading', title: 'Recent projects — heading', type: 'splitHeading'}),
    defineField({
      name: 'categories',
      title: 'Filter pills',
      type: 'array',
      of: [defineArrayMember({type: 'string'})],
      options: {layout: 'tags'},
      description: 'Must match the filter tags the projects carry, or a pill shows an empty grid.',
    }),
    defineField({name: 'seo', type: 'seo'}),
  ],
  preview: {
    select: {lead: 'hero.heading.lead', accent: 'hero.heading.accent'},
    prepare: ({lead, accent}: {lead?: string; accent?: string}) => ({
      title: 'Projects page',
      subtitle: [lead, accent].filter(Boolean).join('') || undefined,
    }),
  },
})

/**
 * /projects/details — the PolyPan case study.
 *
 * A page of its own rather than fields on the project document: the copy here
 * is bespoke to this one write-up, and the generic project type would have to
 * grow a signal-path and a timeline that no other project uses.
 */
export const projectDetailPage = defineType({
  name: 'projectDetailPage',
  title: 'Project case study',
  type: 'document',
  icon: RocketIcon,
  groups: [
    {name: 'hero', title: 'Top of the page', default: true},
    {name: 'body', title: 'Overview & specs'},
    {name: 'process', title: 'How it works & timeline'},
    {name: 'meta', title: 'Google & sharing'},
  ],
  fields: [
    defineField({name: 'hero', type: 'pageHero', group: 'hero', validation: (rule) => rule.required()}),
    defineField({
      name: 'heroVideo',
      title: 'Hero video',
      type: 'string',
      group: 'hero',
      description: 'Path to a clip in /public. Video is served from static hosting, not the asset CDN.',
    }),
    defineField({name: 'sectionsHeading', title: 'Body heading', type: 'string', group: 'body'}),
    defineField({
      name: 'overviewIntro',
      title: 'Overview',
      type: 'text',
      rows: 5,
      group: 'body',
      description: 'Opens the white body section.',
    }),
    defineField({
      name: 'architectureNote',
      title: 'Architecture note',
      type: 'text',
      rows: 4,
      group: 'body',
      description: 'Sits further down, beside the architecture diagram.',
    }),
    defineField({name: 'specsLede', title: 'Specifications standfirst', type: 'text', rows: 3, group: 'body'}),
    defineField({name: 'signalPathLede', title: 'Signal path standfirst', type: 'text', rows: 3, group: 'process'}),
    defineField({
      name: 'signalPathSteps',
      title: 'Signal path steps',
      type: 'array',
      group: 'process',
      of: [defineArrayMember({type: 'string'})],
    }),
    defineField({name: 'timelineLede', title: 'Timeline standfirst', type: 'text', rows: 3, group: 'process'}),
    defineField({
      name: 'timelineSteps',
      title: 'Timeline steps',
      type: 'array',
      group: 'process',
      of: [defineArrayMember({type: 'string'})],
    }),
    defineField({name: 'cta', title: 'Closing CTA', type: 'ctaBanner', group: 'body'}),
    defineField({name: 'seo', type: 'seo', group: 'meta'}),
  ],
  preview: {
    select: {lead: 'hero.heading.lead', accent: 'hero.heading.accent'},
    prepare: ({lead, accent}: {lead?: string; accent?: string}) => ({
      title: 'Project case study',
      subtitle: [lead, accent].filter(Boolean).join('') || undefined,
    }),
  },
})

/** /blogs — the index frame. Filter pills come from category documents. */
export const blogsPage = defineType({
  name: 'blogsPage',
  title: 'Blog index',
  type: 'document',
  icon: DocumentTextIcon,
  fields: [
    defineField({name: 'hero', type: 'pageHero', validation: (rule) => rule.required()}),
    defineField({name: 'seo', type: 'seo'}),
  ],
  preview: {
    select: {lead: 'hero.heading.lead', accent: 'hero.heading.accent'},
    prepare: ({lead, accent}: {lead?: string; accent?: string}) => ({
      title: 'Blog index',
      subtitle: [lead, accent].filter(Boolean).join('') || undefined,
    }),
  },
})

/** /life-at-innosino */
export const lifePage = defineType({
  name: 'lifePage',
  title: 'Life at INNOSINO',
  type: 'document',
  icon: ImagesIcon,
  groups: [
    {name: 'hero', title: 'Top of the page', default: true},
    {name: 'body', title: 'News & photos'},
    {name: 'meta', title: 'Google & sharing'},
  ],
  fields: [
    defineField({name: 'hero', type: 'pageHero', group: 'hero', validation: (rule) => rule.required()}),
    defineField({
      name: 'ambition',
      title: 'Ambition statement',
      type: 'text',
      rows: 4,
      group: 'hero',
    }),
    defineField({
      name: 'highlights',
      title: 'Highlights',
      type: 'array',
      group: 'body',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'highlight',
          fields: [
            defineField({name: 'title', type: 'string', validation: (rule) => rule.required()}),
            defineField({name: 'body', type: 'text', rows: 3, validation: (rule) => rule.required()}),
            defineField({
              name: 'image',
              type: 'image',
              options: {hotspot: true},
              fields: [defineField({name: 'alt', title: 'Alt text', type: 'string'})],
            }),
          ],
          preview: {select: {title: 'title', subtitle: 'body', media: 'image'}},
        }),
      ],
    }),
    defineField({
      name: 'photoMosaic',
      title: 'Photo mosaic',
      type: 'array',
      group: 'body',
      description:
        'The ten-photo grid lower down the page. Order matters: each position has its own size in the layout, so swapping a photo keeps the shape it sits in.',
      validation: (rule) => rule.max(10),
      of: [
        defineArrayMember({
          type: 'image',
          options: {hotspot: true},
          fields: [defineField({name: 'alt', title: 'Alt text', type: 'string'})],
        }),
      ],
    }),
    defineField({
      name: 'gallery',
      title: 'Hero carousel',
      type: 'array',
      group: 'body',
      of: [
        defineArrayMember({
          type: 'image',
          options: {hotspot: true},
          fields: [defineField({name: 'alt', title: 'Alt text', type: 'string'})],
        }),
      ],
    }),
    defineField({name: 'seo', type: 'seo', group: 'meta'}),
  ],
  preview: {
    select: {lead: 'hero.heading.lead', accent: 'hero.heading.accent'},
    prepare: ({lead, accent}: {lead?: string; accent?: string}) => ({
      title: 'Life at INNOSINO',
      subtitle: [lead, accent].filter(Boolean).join('') || undefined,
    }),
  },
})

/**
 * /privacy-policy — one rich-text body rather than the fixed heading-and-
 * paragraph pairs the page shipped with, so clauses can be added or reordered
 * without a code change.
 */
export const privacyPage = defineType({
  name: 'privacyPage',
  title: 'Privacy policy',
  type: 'document',
  icon: LockIcon,
  fields: [
    defineField({name: 'hero', type: 'pageHero', validation: (rule) => rule.required()}),
    defineField({
      name: 'lastUpdated',
      type: 'date',
      options: {dateFormat: 'YYYY-MM-DD'},
      description: 'Shown at the top of the policy.',
    }),
    defineField({
      name: 'body',
      title: 'Policy clauses',
      type: 'richText',
      description: 'Sub-headings become clause titles. Add or reorder freely.',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'contactHeading',
      title: 'Contact section heading',
      type: 'string',
      description: 'Closes the policy, above the email address.',
    }),
    defineField({name: 'contactBody', title: 'Contact section body', type: 'text', rows: 3}),
    defineField({name: 'seo', type: 'seo'}),
  ],
  preview: {
    select: {lead: 'hero.heading.lead', accent: 'hero.heading.accent'},
    prepare: ({lead, accent}: {lead?: string; accent?: string}) => ({
      title: 'Privacy policy',
      subtitle: [lead, accent].filter(Boolean).join('') || undefined,
    }),
  },
})
