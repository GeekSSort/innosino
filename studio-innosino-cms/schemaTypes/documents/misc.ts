import {defineField, defineType, defineArrayMember} from 'sanity'
import {EarthGlobeIcon} from '@sanity/icons/EarthGlobe'
import {CommentIcon} from '@sanity/icons/Comment'
import {UsersIcon} from '@sanity/icons/Users'

/** One sector on the home-page marquee and the /industries grid. */
export const industry = defineType({
  name: 'industry',
  title: 'Industry',
  type: 'document',
  icon: EarthGlobeIcon,
  fields: [
    defineField({name: 'title', type: 'string', validation: (rule) => rule.required()}),
    defineField({
      name: 'slug',
      type: 'slug',
      options: {source: 'title'},
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'description',
      type: 'text',
      rows: 3,
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'image',
      type: 'image',
      options: {hotspot: true},
      fields: [defineField({name: 'alt', title: 'Alt text', type: 'string'})],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'order',
      type: 'number',
      description: 'Position in the marquee and the grid. Lower shows first.',
    }),
  ],
  orderings: [{title: 'Display order', name: 'order', by: [{field: 'order', direction: 'asc'}]}],
  preview: {select: {title: 'title', subtitle: 'description', media: 'image'}},
})

export const testimonial = defineType({
  name: 'testimonial',
  title: 'Testimonial',
  type: 'document',
  icon: CommentIcon,
  fields: [
    defineField({
      name: 'quote',
      type: 'text',
      rows: 4,
      validation: (rule) => rule.required(),
    }),
    defineField({name: 'author', type: 'string', validation: (rule) => rule.required()}),
    defineField({name: 'role', type: 'string', validation: (rule) => rule.required()}),
    defineField({
      name: 'avatar',
      type: 'image',
      options: {hotspot: true},
      fields: [defineField({name: 'alt', title: 'Alt text', type: 'string'})],
    }),
    defineField({name: 'order', type: 'number', description: 'Lower shows first.'}),
  ],
  orderings: [{title: 'Display order', name: 'order', by: [{field: 'order', direction: 'asc'}]}],
  preview: {select: {title: 'author', subtitle: 'role', media: 'avatar'}},
})

/**
 * An open role. Applications go to a mailto: built from the site email and the
 * role title, so there is no separate application URL to keep in sync.
 */
export const openRole = defineType({
  name: 'openRole',
  title: 'Job opening',
  type: 'document',
  icon: UsersIcon,
  groups: [
    {name: 'summary', title: 'The role', default: true},
    {name: 'detail', title: 'What the job involves'},
  ],
  fields: [
    defineField({
      name: 'title',
      title: 'Job title',
      type: 'string',
      group: 'summary',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Web address',
      type: 'slug',
      group: 'summary',
      options: {source: 'title', maxLength: 96},
      description:
        'Click Generate to build this from the job title. It becomes innosino.com/career/… — changing it later breaks any link already shared.',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'number',
      title: 'Number in the list',
      type: 'string',
      group: 'summary',
      description: 'Two digits, such as 01.',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'location',
      type: 'string',
      group: 'summary',
      description: 'Where the job is based, such as Shanghai — or Remote.',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'employmentType',
      title: 'Type of contract',
      type: 'string',
      group: 'summary',
      options: {
        list: [
          {title: 'Full-time', value: 'Full-time'},
          {title: 'Part-time', value: 'Part-time'},
          {title: 'Contract', value: 'Contract'},
          {title: 'Internship', value: 'Internship'},
        ],
      },
      description: 'Shown beside the location, and told to Google so the job can appear in job search.',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Short summary',
      type: 'text',
      rows: 4,
      group: 'summary',
      description: 'One short paragraph. It appears on the careers list and at the top of the job page.',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'postedAt',
      title: 'Date posted',
      type: 'date',
      group: 'summary',
      options: {dateFormat: 'YYYY-MM-DD'},
      description: 'Google will not show a job in job search without this.',
    }),
    defineField({
      name: 'isOpen',
      title: 'Currently hiring',
      type: 'boolean',
      group: 'summary',
      initialValue: true,
      description: 'Turning this off removes the job from the site without deleting it.',
    }),
    defineField({
      name: 'order',
      title: 'Order on the careers page',
      type: 'number',
      group: 'summary',
      description: 'Lower numbers appear first.',
    }),

    defineField({
      name: 'intro',
      title: 'Opening paragraphs',
      type: 'richText',
      group: 'detail',
      description: 'The longer description on the job page itself.',
    }),
    defineField({
      name: 'responsibilities',
      title: 'What you would do',
      type: 'array',
      group: 'detail',
      of: [defineArrayMember({type: 'string'})],
      description: 'One bullet per line. The section is hidden if you leave it empty.',
    }),
    defineField({
      name: 'requirements',
      title: 'What we are looking for',
      type: 'array',
      group: 'detail',
      of: [defineArrayMember({type: 'string'})],
      description: 'One bullet per line. Hidden if empty.',
    }),
    defineField({
      name: 'niceToHave',
      title: 'Nice to have',
      type: 'array',
      group: 'detail',
      of: [defineArrayMember({type: 'string'})],
      description: 'Optional extras rather than requirements. Hidden if empty.',
    }),
  ],
  orderings: [{title: 'Display order', name: 'order', by: [{field: 'order', direction: 'asc'}]}],
  preview: {
    select: {title: 'title', location: 'location', type: 'employmentType', isOpen: 'isOpen'},
    prepare: ({title, location, type, isOpen}: {title?: string; location?: string; type?: string; isOpen?: boolean}) => ({
      title,
      subtitle: [location, type, isOpen === false ? 'closed' : null].filter(Boolean).join(' · '),
    }),
  },
})
