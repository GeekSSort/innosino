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
  title: 'Open role',
  type: 'document',
  icon: UsersIcon,
  fields: [
    defineField({name: 'title', type: 'string', validation: (rule) => rule.required()}),
    defineField({
      name: 'number',
      type: 'string',
      description: 'Two digits, e.g. "01".',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'meta',
      type: 'string',
      description: 'The line under the title, e.g. "Shanghai · Full-time · Hardware".',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'description',
      type: 'text',
      rows: 4,
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'isOpen',
      title: 'Currently open',
      type: 'boolean',
      initialValue: true,
      description: 'Unchecking hides the role from /career without deleting it.',
    }),
    defineField({name: 'order', type: 'number', description: 'Lower shows first.'}),
  ],
  orderings: [{title: 'Display order', name: 'order', by: [{field: 'order', direction: 'asc'}]}],
  preview: {select: {title: 'title', subtitle: 'meta'}},
})
