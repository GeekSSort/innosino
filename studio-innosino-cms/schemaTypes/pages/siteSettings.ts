import {defineField, defineType, defineArrayMember} from 'sanity'
import {CogIcon} from '@sanity/icons/Cog'

/**
 * Everything that appears on more than one page.
 *
 * The footer used to be pasted into all nine pages and the copies had already
 * drifted — two of them were missing the Services link the other seven
 * carried. One list, one place.
 *
 * The organisation block is the source for the Organization graph in the root
 * layout. Nothing in it should claim something the site does not show: there
 * is no street address anywhere on the site, so the postal address stops at
 * the city.
 */
export const siteSettings = defineType({
  name: 'siteSettings',
  title: 'Menus, footer & contact details',
  type: 'document',
  icon: CogIcon,
  groups: [
    {name: 'nav', title: 'Menus & footer', default: true},
    {name: 'contact', title: 'Contact details'},
    {name: 'shared', title: 'The orange call-to-action'},
    {name: 'org', title: 'Company details'},
    {name: 'general', title: 'Site name & copyright'},
  ],
  fields: [
    defineField({
      name: 'siteName',
      type: 'string',
      group: 'general',
      initialValue: 'INNOSINO',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'copyright',
      title: 'Copyright line',
      type: 'string',
      group: 'general',
      description: 'The small grey line at the very bottom of every page.',
      validation: (rule) => rule.required(),
    }),

    defineField({
      name: 'navItems',
      title: 'Top menu',
      description: 'The floating bar at the top of every page.',
      type: 'array',
      group: 'nav',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'navItem',
          fields: [
            defineField({name: 'label', type: 'string', validation: (rule) => rule.required()}),
            defineField({name: 'href', type: 'string', validation: (rule) => rule.required()}),
            defineField({
              name: 'secondary',
              title: 'Hide on phones',
              type: 'boolean',
              initialValue: false,
              description:
                'There is no room for every link on a phone. Hidden ones still appear under “More”.',
            }),
          ],
          preview: {select: {title: 'label', subtitle: 'href'}},
        }),
      ],
      validation: (rule) => rule.required().min(1),
    }),
    defineField({
      name: 'moreLinks',
      title: 'The “More” drop-down',
      type: 'array',
      group: 'nav',
      of: [defineArrayMember({type: 'link'})],
      description: 'Opens from the top menu. Put everything here, including the links phones hide.',
    }),
    defineField({
      name: 'footerLinks',
      title: 'Footer links',
      type: 'array',
      group: 'nav',
      of: [defineArrayMember({type: 'link'})],
      description:
        'The row of links at the bottom of every page. Keep Expertise and Life at INNOSINO here — Google only finds those pages through this row.',
      validation: (rule) => rule.required().min(1),
    }),

    defineField({
      name: 'email',
      type: 'string',
      group: 'contact',
      validation: (rule) => rule.required().email(),
    }),
    defineField({
      name: 'whatsApp',
      title: 'WhatsApp number',
      description: 'Shown on the contact page, with the country code.',
      type: 'string',
      group: 'contact',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'linkedin',
      title: 'LinkedIn URL',
      type: 'url',
      group: 'contact',
    }),
    defineField({
      name: 'chatWidget',
      title: 'Chat bubble',
      description: 'The little message box above the footer on every page.',
      type: 'object',
      group: 'contact',
      options: {collapsible: true, collapsed: true},
      fields: [
        defineField({name: 'greeting', type: 'text', rows: 3, validation: (rule) => rule.required()}),
        defineField({name: 'toggleLabel', type: 'string', initialValue: 'Toggle chat'}),
        defineField({name: 'closeLabel', type: 'string', initialValue: 'Close chat bubble'}),
      ],
    }),

    defineField({
      name: 'legalName',
      title: 'Registered company name',
      type: 'string',
      group: 'org',
      description: 'The full legal name. Google uses this; it is not shown on the site.',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'organizationDescription',
      title: 'What the company does',
      type: 'text',
      rows: 4,
      group: 'org',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'logo',
      title: 'Logo',
      type: 'image',
      group: 'org',
      description: 'Used at the top of every page. Replacing it here changes it everywhere.',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'headquarters',
      title: 'Head office',
      type: 'object',
      group: 'org',
      description:
        'City and country only. The site never shows a street address, so none should be claimed here either.',
      fields: [
        defineField({name: 'locality', type: 'string', validation: (rule) => rule.required()}),
        defineField({
          name: 'country',
          title: 'Country code',
          type: 'string',
          description: 'Two letters, e.g. CN.',
          validation: (rule) => rule.required().length(2),
        }),
      ],
    }),
    defineField({
      name: 'founder',
      type: 'object',
      group: 'org',
      fields: [
        defineField({name: 'name', type: 'string', validation: (rule) => rule.required()}),
        defineField({name: 'title', type: 'string', validation: (rule) => rule.required()}),
      ],
    }),

    defineField({
      name: 'ctaBanner',
      title: 'Call-to-action panel',
      type: 'ctaBanner',
      group: 'shared',
      description:
        'The orange “Book a Call” panel at the bottom of About, Blog, Projects and every service page. Edit it once here and it changes on all of them.',
      validation: (rule) => rule.required(),
    }),
  ],
  preview: {
    select: {subtitle: 'siteName'},
    prepare: ({subtitle}: {subtitle?: string}) => ({
      title: 'Menus, footer & contact details',
      subtitle,
    }),
  },
})
