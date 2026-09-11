import {defineField, defineType, defineArrayMember} from 'sanity'
import {UsersIcon} from '@sanity/icons/Users'

/** Career. Open roles are their own documents; this is the frame around them. */
export const careerPage = defineType({
  name: 'careerPage',
  title: 'Career page',
  type: 'document',
  icon: UsersIcon,
  groups: [
    {name: 'hero', title: 'Top of the page', default: true},
    {name: 'body', title: 'Why join & how we hire'},
    {name: 'life', title: 'Photo strip & sign-off'},
    {name: 'meta', title: 'Google & sharing'},
  ],
  fields: [
    defineField({name: 'hero', type: 'pageHero', group: 'hero', validation: (rule) => rule.required()}),

    defineField({name: 'whyJoinHeading', title: 'Why engineers stay — heading', type: 'splitHeading', group: 'body'}),
    defineField({
      name: 'whyJoinCards',
      title: 'Why engineers stay',
      type: 'array',
      group: 'body',
      of: [defineArrayMember({type: 'textCard'})],
    }),
    defineField({name: 'hiringHeading', title: 'How we hire — heading', type: 'splitHeading', group: 'body'}),
    defineField({
      name: 'hiringSteps',
      title: 'How we hire',
      type: 'array',
      group: 'body',
      of: [defineArrayMember({type: 'numberedItem'})],
    }),

    defineField({name: 'lifeHeading', title: 'Life strip — heading', type: 'splitHeading', group: 'life'}),
    defineField({name: 'lifeLink', title: 'Life strip link', type: 'link', group: 'life'}),
    defineField({
      name: 'lifePhotos',
      title: 'Life strip photos',
      type: 'array',
      group: 'life',
      of: [
        defineArrayMember({
          type: 'image',
          options: {hotspot: true},
          fields: [defineField({name: 'alt', title: 'Alt text', type: 'string'})],
        }),
      ],
    }),
    defineField({
      name: 'cta',
      title: 'Closing CTA',
      type: 'ctaBanner',
      group: 'life',
      description: 'The open-application prompt. Overrides the shared banner on this page.',
    }),

    defineField({name: 'seo', type: 'seo', group: 'meta'}),
  ],
  preview: {
    select: {lead: 'hero.heading.lead', accent: 'hero.heading.accent'},
    prepare: ({lead, accent}: {lead?: string; accent?: string}) => ({
      title: 'Career page',
      subtitle: [lead, accent].filter(Boolean).join('') || undefined,
    }),
  },
})
