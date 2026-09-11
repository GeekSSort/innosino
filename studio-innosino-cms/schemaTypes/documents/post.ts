import {defineField, defineType, defineArrayMember} from 'sanity'
import {DocumentTextIcon} from '@sanity/icons/DocumentText'
import {TagIcon} from '@sanity/icons/Tag'

/**
 * A blog category. Kept as its own document so the filter pills on /blogs and
 * the categories a post can claim cannot drift apart — the old string arrays
 * let a post tag itself with a pill the index did not render.
 */
export const category = defineType({
  name: 'category',
  title: 'Blog category',
  type: 'document',
  icon: TagIcon,
  fields: [
    defineField({name: 'title', type: 'string', validation: (rule) => rule.required()}),
    defineField({
      name: 'slug',
      type: 'slug',
      options: {source: 'title'},
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'order',
      title: 'Order in the filter row',
      type: 'number',
      description: 'Lower numbers appear first.',
    }),
  ],
  orderings: [{title: 'Pill order', name: 'order', by: [{field: 'order', direction: 'asc'}]}],
  preview: {select: {title: 'title', subtitle: 'slug.current'}},
})

/**
 * One article, body included.
 *
 * `sections` is an array rather than a single rich-text field because the
 * article page renders a table of contents that scrolls to each section — the
 * anchor is part of the content contract, not a styling detail. Read time is
 * still derived on the frontend from the body, so it cannot claim "5 min" on
 * an article that has since doubled in length.
 */
export const post = defineType({
  name: 'post',
  title: 'Blog post',
  type: 'document',
  icon: DocumentTextIcon,
  groups: [
    {name: 'content', title: 'The article', default: true},
    {name: 'meta', title: 'Author & Google'},
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
        'Click Generate to build this from the title. It becomes innosino.com/blogs/… — changing it later breaks any link people have already shared.',
      validation: (rule) =>
        rule.required().custom((value) => {
          if (!value?.current) return 'Required'
          return /^[a-z0-9-]+$/.test(value.current)
            ? true
            : 'Lowercase letters, numbers and hyphens only'
        }),
    }),
    defineField({
      name: 'excerpt',
      type: 'text',
      rows: 3,
      group: 'content',
      title: 'Short summary',
      description:
        'One sentence. It appears on the blog listing card, under the title on the article, and in Google results.',
      validation: (rule) => rule.required().max(200).warning('Keep it under 200 characters.'),
    }),
    defineField({
      name: 'category',
      type: 'reference',
      to: [{type: 'category'}],
      group: 'content',
      title: 'Main category',
      description: 'The one shown on the card. Pick from the Blog categories list.',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'filterTags',
      title: 'Also show under these filters',
      type: 'array',
      group: 'content',
      of: [defineArrayMember({type: 'reference', to: [{type: 'category'}]})],
      description:
        'Optional. Adding “Featured Blogs” here puts the post under that filter on the blog page too.',
    }),
    defineField({
      name: 'publishedAt',
      title: 'Publish date',
      type: 'date',
      group: 'content',
      options: {dateFormat: 'YYYY-MM-DD'},
      description: 'Newest posts appear first on the blog page.',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'image',
      title: 'Cover photo',
      type: 'image',
      group: 'content',
      options: {hotspot: true},
      fields: [defineField({name: 'alt', title: 'Alt text', type: 'string'})],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'pullQuote',
      title: 'Pull quote',
      type: 'text',
      rows: 2,
      group: 'content',
      description:
        'Optional. One line lifted out and shown large in the middle of the article.',
    }),
    defineField({
      name: 'sections',
      title: 'Article sections',
      description:
        'The article is written in sections. Each heading becomes an entry in the “Table of Content” down the side.',
      type: 'array',
      group: 'content',
      validation: (rule) => rule.required().min(1),
      of: [
        defineArrayMember({
          type: 'object',
          name: 'section',
          fields: [
            defineField({name: 'heading', type: 'string', validation: (rule) => rule.required()}),
            /*
             * Generated from the heading and hidden: it is what the
             * "Table of Content" links jump to, which is plumbing rather than
             * something anyone should have to fill in.
             */
            defineField({
              name: 'anchorId',
              title: 'Link target',
              type: 'slug',
              options: {
                source: (_doc, context) => (context.parent as {heading?: string})?.heading ?? '',
              },
              hidden: true,
              validation: (rule) =>
                rule.required().error('Open the section and click Generate on the link target.'),
            }),
            defineField({name: 'body', type: 'richText', validation: (rule) => rule.required()}),
          ],
          preview: {select: {title: 'heading', subtitle: 'anchorId.current'}},
        }),
      ],
    }),
    defineField({
      name: 'author',
      title: 'Written by',
      type: 'string',
      group: 'meta',
      initialValue: 'Innosino Team',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'authorInitials',
      title: 'Initials for the little avatar',
      type: 'string',
      group: 'meta',
      initialValue: 'IS',
      validation: (rule) => rule.max(3),
    }),
    defineField({name: 'seo', type: 'seo', group: 'meta'}),
  ],
  orderings: [
    {title: 'Newest first', name: 'newest', by: [{field: 'publishedAt', direction: 'desc'}]},
  ],
  preview: {
    select: {title: 'title', subtitle: 'publishedAt', media: 'image'},
  },
})
