import {defineField, defineType, defineArrayMember} from 'sanity'
import {RocketIcon} from '@sanity/icons/Rocket'

/**
 * One piece of work: the cards on /projects and the featured slot on the home
 * page.
 *
 * The long-form case study is its own document (projectDetailPage) because the
 * write-up is bespoke to one project. This type carried an unused summary,
 * sections and timeline for a while — fields an editor could fill and never
 * see rendered — and they are gone.
 */
export const project = defineType({
  name: 'project',
  title: 'Project',
  type: 'document',
  icon: RocketIcon,
  groups: [
    {name: 'content', title: 'Project', default: true},
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
      description: 'Click Generate to build this from the title.',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'category',
      type: 'string',
      group: 'content',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'filterTags',
      title: 'Show under these filters',
      type: 'array',
      group: 'content',
      of: [defineArrayMember({type: 'string'})],
      options: {layout: 'tags'},
      description:
        'Type a filter name and press Enter. These must match the filter names set on the Projects page, or the filter will not appear.',
    }),
    defineField({
      name: 'description',
      type: 'text',
      rows: 3,
      group: 'content',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'image',
      title: 'Photo',
      type: 'image',
      group: 'content',
      options: {hotspot: true},
      fields: [defineField({name: 'alt', title: 'Alt text', type: 'string'})],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'order',
      title: 'Order on the projects page',
      type: 'number',
      group: 'content',
      description: 'Lower numbers appear first.',
    }),
    defineField({
      name: 'isFeatured',
      title: 'Show as the highlighted project',
      type: 'boolean',
      group: 'content',
      initialValue: false,
      description:
        'Puts this project in the large panel at the top of the Projects page. Only turn this on for one project.',
    }),
    defineField({
      name: 'featuredBadge',
      title: 'Label on the large panel',
      type: 'string',
      group: 'content',
      hidden: ({parent}) => !parent?.isFeatured,
      description: 'Small caption over the photo, such as SMART INSTRUMENTS DEVELOPED.',
    }),
    defineField({
      name: 'stats',
      title: 'Key numbers',
      type: 'array',
      group: 'content',
      of: [defineArrayMember({type: 'stat'})],
    }),
    defineField({name: 'seo', type: 'seo', group: 'meta'}),
  ],
  orderings: [{title: 'Display order', name: 'order', by: [{field: 'order', direction: 'asc'}]}],
  preview: {
    select: {title: 'title', subtitle: 'category', media: 'image'},
  },
})
