import {defineField, defineType, defineArrayMember} from 'sanity'
import {EnvelopeIcon} from '@sanity/icons/Envelope'

/** Contact. Only the FAQs listed here feed the FAQ structured data. */
export const contactPage = defineType({
  name: 'contactPage',
  title: 'Contact page',
  type: 'document',
  icon: EnvelopeIcon,
  groups: [
    {name: 'hero', title: 'Top of the page & form', default: true},
    {name: 'hubs', title: 'Offices'},
    {name: 'faq', title: 'Common questions'},
    {name: 'meta', title: 'Google & sharing'},
  ],
  fields: [
    defineField({name: 'hero', type: 'pageHero', group: 'hero', validation: (rule) => rule.required()}),
    defineField({
      name: 'form',
      title: 'Form intro',
      type: 'object',
      group: 'hero',
      fields: [
        defineField({name: 'title', type: 'string', validation: (rule) => rule.required()}),
        defineField({name: 'lede', type: 'text', rows: 3, validation: (rule) => rule.required()}),
        defineField({
          name: 'points',
          title: 'Bullet points',
          type: 'array',
          of: [defineArrayMember({type: 'string'})],
        }),
      ],
    }),

    defineField({name: 'hubsLede', title: 'Offices standfirst', type: 'text', rows: 3, group: 'hubs'}),
    defineField({
      name: 'hubs',
      title: 'Offices',
      type: 'array',
      group: 'hubs',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'hub',
          fields: [
            defineField({name: 'city', type: 'string', validation: (rule) => rule.required()}),
            defineField({name: 'address', type: 'text', rows: 2, validation: (rule) => rule.required()}),
            defineField({name: 'map', title: 'Map URL', type: 'url'}),
            defineField({
              name: 'isOwnOffice',
              title: 'INNOSINO office',
              type: 'boolean',
              initialValue: true,
              description:
                'Uncheck for a partner location. Only INNOSINO offices are claimed in the Organization structured data.',
            }),
          ],
          preview: {select: {title: 'city', subtitle: 'address'}},
        }),
      ],
    }),

    defineField({name: 'faqHeading', title: 'FAQ heading', type: 'splitHeading', group: 'faq'}),
    defineField({
      name: 'faqs',
      type: 'array',
      group: 'faq',
      of: [defineArrayMember({type: 'faq'})],
      description: 'Rendered in the accordion, and only these feed the FAQ structured data.',
    }),

    defineField({name: 'seo', type: 'seo', group: 'meta'}),
  ],
  preview: {
    select: {lead: 'hero.heading.lead', accent: 'hero.heading.accent'},
    prepare: ({lead, accent}: {lead?: string; accent?: string}) => ({
      title: 'Contact page',
      subtitle: [lead, accent].filter(Boolean).join('') || undefined,
    }),
  },
})
