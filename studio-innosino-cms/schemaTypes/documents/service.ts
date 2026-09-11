import {defineField, defineType, defineArrayMember} from 'sanity'
import {CogIcon} from '@sanity/icons/Cog'

/**
 * One service discipline. Each detail page is this data plus one shared
 * template, so a new service needs no code — only a document.
 *
 * `projects` stays optional on purpose: the template drops the case-study
 * section entirely rather than showing invented work, so a discipline with no
 * photographed project simply leaves it empty.
 */
export const service = defineType({
  name: 'service',
  title: 'Service',
  type: 'document',
  icon: CogIcon,
  groups: [
    {name: 'content', title: 'Name & intro', default: true},
    {name: 'process', title: 'How we work'},
    {name: 'proof', title: 'Examples & questions'},
    {name: 'meta', title: 'Google & sharing'},
  ],
  fields: [
    defineField({
      name: 'title',
      type: 'string',
      group: 'content',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'slug',
      type: 'slug',
      group: 'content',
      title: 'Web address',
      options: {source: 'title', maxLength: 96},
      description:
        'Click Generate to build this from the title. It becomes innosino.com/services/… — changing it later breaks existing links.',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'One-line summary',
      type: 'text',
      rows: 3,
      group: 'content',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'order',
      title: 'Order on the services page',
      type: 'number',
      group: 'content',
      description: 'Lower numbers appear first.',
    }),
    defineField({
      name: 'navGroup',
      title: 'Where it sits in the top menu',
      type: 'string',
      group: 'content',
      description:
        'The Services menu shows the main disciplines in a block of four, then the wider offerings listed underneath.',
      options: {
        list: [
          {title: 'In the block of four', value: 'grid'},
          {title: 'In the list underneath', value: 'stack'},
        ],
        layout: 'radio',
      },
      initialValue: 'grid',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'processStages',
      title: 'The steps we take',
      type: 'array',
      group: 'process',
      of: [defineArrayMember({type: 'stage'})],
      validation: (rule) => rule.required().min(1),
    }),
    defineField({
      name: 'onDemandServices',
      title: 'What you can ask for',
      type: 'array',
      group: 'process',
      of: [defineArrayMember({type: 'numberedItem'})],
      validation: (rule) => rule.required().min(1),
    }),
    defineField({
      name: 'whyUsPoints',
      title: 'Why choose us',
      type: 'array',
      group: 'process',
      of: [defineArrayMember({type: 'numberedItem'})],
      validation: (rule) => rule.required().min(1),
    }),
    defineField({
      name: 'projects',
      title: 'Example work',
      type: 'array',
      group: 'proof',
      description:
        'Photos of work shown on this page only — not the same as the Projects list. Leave empty and the section simply disappears, rather than showing made-up examples.',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'caseStudy',
          fields: [
            defineField({name: 'title', type: 'string', validation: (rule) => rule.required()}),
            defineField({name: 'category', type: 'string', validation: (rule) => rule.required()}),
            defineField({name: 'description', type: 'text', rows: 3, validation: (rule) => rule.required()}),
            defineField({
              name: 'image',
              type: 'image',
              options: {hotspot: true},
              fields: [defineField({name: 'alt', title: 'Alt text', type: 'string'})],
              validation: (rule) => rule.required(),
            }),
          ],
          preview: {select: {title: 'title', subtitle: 'category', media: 'image'}},
        }),
      ],
    }),
    defineField({
      name: 'faqs',
      title: 'Common questions',
      type: 'array',
      group: 'proof',
      of: [defineArrayMember({type: 'faq'})],
      description:
        'Shown as a drop-down list at the bottom of the page. Google can show these directly in search results.',
    }),
    defineField({name: 'seo', type: 'seo', group: 'meta'}),
  ],
  orderings: [{title: 'Display order', name: 'order', by: [{field: 'order', direction: 'asc'}]}],
  preview: {select: {title: 'title', subtitle: 'slug.current'}},
})
