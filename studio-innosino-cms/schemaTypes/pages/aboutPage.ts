import {defineField, defineType, defineArrayMember} from 'sanity'
import {InfoOutlineIcon} from '@sanity/icons/InfoOutline'

/**
 * About.
 *
 * The founder block is also the source for the Person in the Organization
 * graph, so the name and title here are the ones the markup claims.
 */
export const aboutPage = defineType({
  name: 'aboutPage',
  title: 'About page',
  type: 'document',
  icon: InfoOutlineIcon,
  groups: [
    {name: 'hero', title: 'Top of the page', default: true},
    {name: 'body', title: 'Vision, values & numbers'},
    {name: 'proof', title: 'Client quotes'},
    {name: 'meta', title: 'Google & sharing'},
  ],
  fields: [
    defineField({name: 'hero', type: 'pageHero', group: 'hero', validation: (rule) => rule.required()}),
    defineField({
      name: 'founderQuote',
      title: 'Founder quote',
      type: 'object',
      group: 'hero',
      fields: [
        defineField({name: 'text', type: 'text', rows: 5, validation: (rule) => rule.required()}),
        defineField({name: 'name', type: 'string', validation: (rule) => rule.required()}),
        defineField({name: 'role', type: 'string', validation: (rule) => rule.required()}),
      ],
      validation: (rule) => rule.required(),
    }),

    defineField({
      name: 'vision',
      type: 'object',
      group: 'body',
      fields: [
        defineField({name: 'title', type: 'string', validation: (rule) => rule.required()}),
        defineField({name: 'body', type: 'text', rows: 4, validation: (rule) => rule.required()}),
      ],
    }),
    defineField({
      name: 'mission',
      type: 'object',
      group: 'body',
      fields: [
        defineField({name: 'title', type: 'string', validation: (rule) => rule.required()}),
        defineField({name: 'body', type: 'text', rows: 4, validation: (rule) => rule.required()}),
      ],
    }),
    defineField({
      name: 'visionFigure',
      title: 'Vision & mission image',
      type: 'image',
      group: 'body',
      options: {hotspot: true},
      fields: [defineField({name: 'alt', title: 'Alt text', type: 'string'})],
    }),
    defineField({
      name: 'driveHeading',
      title: 'What drives us — heading',
      type: 'splitHeading',
      group: 'body',
    }),
    defineField({
      name: 'driveCards',
      title: 'What drives us',
      type: 'array',
      group: 'body',
      of: [defineArrayMember({type: 'textCard'})],
    }),
    defineField({
      name: 'resultsHeading',
      title: 'Results — heading',
      type: 'splitHeading',
      group: 'body',
    }),
    defineField({
      name: 'stats',
      title: 'Results figures',
      type: 'array',
      group: 'body',
      of: [defineArrayMember({type: 'stat'})],
    }),

    defineField({
      name: 'testimonialsHeading',
      title: 'Testimonials — heading',
      type: 'splitHeading',
      group: 'proof',
    }),
    defineField({
      name: 'testimonials',
      type: 'array',
      group: 'proof',
      of: [defineArrayMember({type: 'reference', to: [{type: 'testimonial'}]})],
      description: 'Leave empty to show every testimonial in its display order.',
    }),

    defineField({name: 'seo', type: 'seo', group: 'meta'}),
  ],
  preview: {
    select: {lead: 'hero.heading.lead', accent: 'hero.heading.accent'},
    prepare: ({lead, accent}: {lead?: string; accent?: string}) => ({
      title: 'About page',
      subtitle: [lead, accent].filter(Boolean).join('') || undefined,
    }),
  },
})
