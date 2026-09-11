import {defineField, defineType, defineArrayMember} from 'sanity'
import {LinkIcon} from '@sanity/icons/Link'
import {HelpCircleIcon} from '@sanity/icons/HelpCircle'
import {BlockContentIcon} from '@sanity/icons/BlockContent'

/**
 * Reusable shapes, shared by the page singletons and the collection types.
 *
 * Every heading on the site is rendered as two runs — a plain lead and a
 * coloured accent — so the split is stored rather than guessed. It is the one
 * place presentation leaks into the model, and it earns that because the
 * editor genuinely chooses which words carry the accent.
 */
export const splitHeading = defineType({
  name: 'splitHeading',
  title: 'Heading',
  type: 'object',
  fields: [
    defineField({
      name: 'lead',
      title: 'Heading',
      type: 'string',
      description: 'The first part, in the normal colour.',
      /*
       * The trailing space that separates this from the highlighted words is
       * invisible in the input, so its absence is flagged here rather than
       * discovered on the live site.
       */
      validation: (rule) =>
        rule.required().custom((value, context) => {
          const accent = (context.parent as {accent?: string})?.accent
          if (!value || !accent) return true
          return value.endsWith(' ')
            ? true
            : 'Add a space at the end, or this will run into the highlighted words.'
        }),
    }),
    defineField({
      name: 'accent',
      title: 'Words to highlight',
      type: 'string',
      description:
        'The last few words, shown in orange. Leave blank if the whole heading should be one colour.',
    }),
  ],
  preview: {
    select: {lead: 'lead', accent: 'accent'},
    prepare: ({lead, accent}) => ({title: [lead, accent].filter(Boolean).join('')}),
  },
})

export const link = defineType({
  name: 'link',
  title: 'Link',
  type: 'object',
  icon: LinkIcon,
  fields: [
    defineField({name: 'label', type: 'string', validation: (rule) => rule.required()}),
    defineField({
      name: 'href',
      title: 'Where it goes',
      type: 'string',
      description:
        'A page on this site, written as /contact or /about — or a full address like https://linkedin.com for somewhere else.',
      validation: (rule) => rule.required(),
    }),
  ],
  preview: {
    select: {title: 'label', subtitle: 'href'},
  },
})

export const faq = defineType({
  name: 'faq',
  title: 'FAQ',
  type: 'object',
  icon: HelpCircleIcon,
  fields: [
    defineField({name: 'question', type: 'string', validation: (rule) => rule.required()}),
    defineField({name: 'answer', type: 'text', rows: 4, validation: (rule) => rule.required()}),
  ],
  preview: {select: {title: 'question', subtitle: 'answer'}},
})

/** A numbered step in a process rail: "Stage 01 — Requirements & Schematic". */
export const stage = defineType({
  name: 'stage',
  title: 'Process stage',
  type: 'object',
  fields: [
    defineField({
      name: 'label',
      title: 'Step label',
      type: 'string',
      description: 'The small line above the title, such as “Stage 01”.',
      validation: (rule) => rule.required(),
    }),
    defineField({name: 'title', type: 'string', validation: (rule) => rule.required()}),
    defineField({name: 'description', type: 'text', rows: 3, validation: (rule) => rule.required()}),
  ],
  preview: {select: {title: 'title', subtitle: 'label'}},
})

/** A numbered card: on-demand services, why-us points, hiring steps. */
export const numberedItem = defineType({
  name: 'numberedItem',
  title: 'Numbered item',
  type: 'object',
  fields: [
    defineField({
      name: 'number',
      title: 'Number on the card',
      type: 'string',
      description: 'Two digits, such as 01. Cards are shown in this order.',
      validation: (rule) => rule.required(),
    }),
    defineField({name: 'title', type: 'string', validation: (rule) => rule.required()}),
    defineField({name: 'description', type: 'text', rows: 3, validation: (rule) => rule.required()}),
  ],
  preview: {select: {title: 'title', subtitle: 'number'}},
})

/** A plain title + body card with no number. */
export const textCard = defineType({
  name: 'textCard',
  title: 'Card',
  type: 'object',
  fields: [
    defineField({name: 'title', type: 'string', validation: (rule) => rule.required()}),
    defineField({name: 'description', type: 'text', rows: 3, validation: (rule) => rule.required()}),
  ],
  preview: {select: {title: 'title', subtitle: 'description'}},
})

export const stat = defineType({
  name: 'stat',
  title: 'Statistic',
  type: 'object',
  fields: [
    defineField({
      name: 'value',
      title: 'The big number',
      type: 'string',
      description: 'Such as 16+, $2.8B or 20 yrs.',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'label',
      title: 'What it counts',
      type: 'string',
      description: 'Such as “Smart instruments developed”.',
      validation: (rule) => rule.required(),
    }),
    defineField({name: 'description', title: 'Extra line (optional)', type: 'text', rows: 2}),
  ],
  preview: {select: {title: 'value', subtitle: 'label'}},
})

/** The glass banner that closes About, Blogs, Projects and every service page. */
export const ctaBanner = defineType({
  name: 'ctaBanner',
  title: 'Call to action banner',
  type: 'object',
  fields: [
    defineField({name: 'title', type: 'string', validation: (rule) => rule.required()}),
    defineField({name: 'body', type: 'text', rows: 3, validation: (rule) => rule.required()}),
    defineField({name: 'action', type: 'link', validation: (rule) => rule.required()}),
  ],
  preview: {select: {title: 'title', subtitle: 'body'}},
})

/** The breadcrumb + title + standfirst block every inner page opens with. */
export const pageHero = defineType({
  name: 'pageHero',
  title: 'Page hero',
  type: 'object',
  fields: [
    defineField({
      name: 'breadcrumb',
      title: 'Small label above the title',
      type: 'string',
      description: 'Usually the page name in capitals, such as ABOUT US.',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'heading',
      title: 'Big heading',
      type: 'splitHeading',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'subtitle',
      title: 'Intro paragraph',
      type: 'text',
      rows: 4,
      description: 'The sentence or two under the heading.',
    }),
  ],
  preview: {
    select: {lead: 'heading.lead', accent: 'heading.accent', subtitle: 'breadcrumb'},
    prepare: ({lead, accent, subtitle}) => ({
      title: [lead, accent].filter(Boolean).join('') || 'Page hero',
      subtitle,
    }),
  },
})

/**
 * Per-page search metadata. Left empty, the frontend falls back to the page's
 * own hero title and standfirst rather than shipping a blank description.
 */
export const seo = defineType({
  name: 'seo',
  title: 'Google & social sharing',
  type: 'object',
  options: {collapsible: true, collapsed: true},
  fields: [
    defineField({
      name: 'title',
      title: 'Title shown in Google',
      type: 'string',
      description: 'Leave blank to use the page title the site already uses.',
      validation: (rule) =>
        rule.max(60).warning('Google cuts titles off after about 60 characters.'),
    }),
    defineField({
      name: 'description',
      title: 'Description shown in Google',
      type: 'text',
      rows: 3,
      description: 'One or two sentences. Leave blank to use the page description the site already uses.',
      validation: (rule) =>
        rule.max(160).warning('Google cuts descriptions off after about 160 characters.'),
    }),
    defineField({
      name: 'image',
      title: 'Image shown when shared',
      type: 'image',
      options: {hotspot: true},
      description:
        'What appears when someone posts a link to this page on LinkedIn or WhatsApp. Leave blank to use the site’s standard image.',
    }),
  ],
})

/** Long-form prose. Headings inside an article body are h3; h2 is the section. */
export const richText = defineType({
  name: 'richText',
  title: 'Rich text',
  type: 'array',
  icon: BlockContentIcon,
  of: [
    defineArrayMember({
      type: 'block',
      styles: [
        {title: 'Normal', value: 'normal'},
        {title: 'Sub-heading', value: 'h3'},
        {title: 'Quote', value: 'blockquote'},
      ],
      lists: [
        {title: 'Bullet', value: 'bullet'},
        {title: 'Numbered', value: 'number'},
      ],
      marks: {
        decorators: [
          {title: 'Bold', value: 'strong'},
          {title: 'Italic', value: 'em'},
          {title: 'Code', value: 'code'},
        ],
        annotations: [
          defineArrayMember({
            name: 'link',
            type: 'object',
            title: 'Link',
            icon: LinkIcon,
            fields: [
              defineField({
                name: 'href',
                type: 'string',
                validation: (rule) => rule.required(),
              }),
            ],
          }),
        ],
      },
    }),
    defineArrayMember({type: 'image', options: {hotspot: true}, fields: [
      defineField({name: 'alt', title: 'Alt text', type: 'string'}),
    ]}),
  ],
})

export const objectTypes = [
  splitHeading,
  link,
  faq,
  stage,
  numberedItem,
  textCard,
  stat,
  ctaBanner,
  pageHero,
  seo,
  richText,
]
