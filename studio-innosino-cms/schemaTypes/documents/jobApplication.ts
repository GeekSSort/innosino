import {defineField, defineType} from 'sanity'
import {EnvelopeIcon} from '@sanity/icons/Envelope'

/**
 * One application, submitted from a job page.
 *
 * Every field is read-only: this is a record of what somebody sent, and an
 * editor who could rewrite it would be editing evidence. Applications can
 * still be deleted, which is what spam needs.
 *
 * The document is created by the Cloudflare Worker at /api/apply using a
 * server-side token. Nothing in the browser can write here — a write token in
 * a static bundle would let anyone edit or empty the whole dataset.
 */
export const jobApplication = defineType({
  name: 'jobApplication',
  title: 'Application',
  type: 'document',
  icon: EnvelopeIcon,
  fields: [
    defineField({name: 'roleTitle', title: 'Applied for', type: 'string', readOnly: true}),
    defineField({name: 'roleSlug', title: 'Job page', type: 'string', readOnly: true}),
    defineField({name: 'name', title: 'Full name', type: 'string', readOnly: true}),
    defineField({name: 'email', type: 'string', readOnly: true}),
    defineField({name: 'phone', type: 'string', readOnly: true}),
    defineField({
      name: 'links',
      title: 'Portfolio, GitHub or LinkedIn',
      type: 'string',
      readOnly: true,
    }),
    defineField({
      name: 'message',
      title: 'Why this role',
      type: 'text',
      rows: 8,
      readOnly: true,
    }),
    defineField({
      name: 'submittedAt',
      title: 'Received',
      type: 'datetime',
      readOnly: true,
    }),
    defineField({
      name: 'status',
      title: 'Status',
      type: 'string',
      description: 'The one field you can change — for tracking where an application got to.',
      options: {
        list: [
          {title: 'New', value: 'new'},
          {title: 'Reviewing', value: 'reviewing'},
          {title: 'Replied', value: 'replied'},
          {title: 'Not proceeding', value: 'closed'},
        ],
        layout: 'radio',
      },
      initialValue: 'new',
    }),
  ],
  orderings: [
    {title: 'Newest first', name: 'newest', by: [{field: 'submittedAt', direction: 'desc'}]},
  ],
  preview: {
    select: {name: 'name', role: 'roleTitle', at: 'submittedAt', status: 'status'},
    prepare: ({name, role, at, status}: {name?: string; role?: string; at?: string; status?: string}) => ({
      title: `${name ?? 'Someone'} — ${role ?? 'unknown role'}`,
      subtitle: [at ? new Date(at).toLocaleDateString('en-GB') : null, status]
        .filter(Boolean)
        .join(' · '),
    }),
  },
})
