import {defineField, defineType, defineArrayMember} from 'sanity'
import {HomeIcon} from '@sanity/icons/Home'

/**
 * The home page.
 *
 * The splash timings are editable because every detail on the page is, but
 * they are genuine calibration rather than copy: the three frames are paced
 * from one loop length so portrait and desktop stay in step, and the Embedded
 * System Design clip runs at half speed deliberately. Changing them changes
 * the pacing of the opening animation, so the defaults are the tuned values.
 */
export const homePage = defineType({
  name: 'homePage',
  title: 'Home page',
  type: 'document',
  icon: HomeIcon,
  groups: [
    {name: 'hero', title: 'Top of the page', default: true},
    {name: 'services', title: 'Service videos'},
    {name: 'projects', title: 'Projects shown'},
    {name: 'industries', title: 'Industries shown'},
    {name: 'meta', title: 'Google & sharing'},
  ],
  fields: [
    defineField({
      name: 'hero',
      type: 'object',
      group: 'hero',
      fields: [
        defineField({
          name: 'titleLead',
          title: 'Heading',
          type: 'string',
          initialValue: 'WELCOME TO',
          description: 'The first line of the heading. The logo follows on the line below it.',
          validation: (rule) => rule.required(),
        }),
        defineField({
          name: 'titleAccent',
          title: 'Company name',
          type: 'string',
          /*
           * The second line is the logo image, not type, so this is what
           * screen readers and search engines read in its place. It is still
           * required: an empty alt would leave the heading reading as one
           * dangling half-sentence.
           */
          description:
            'The second line is the logo. This is the name behind it, for screen readers and search engines.',
          validation: (rule) => rule.required(),
        }),
        defineField({
          name: 'subtitle',
          title: 'Intro paragraph',
          type: 'text',
          rows: 3,
          validation: (rule) => rule.required(),
        }),
      ],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'splashFrames',
      title: 'Opening animation',
      type: 'array',
      group: 'hero',
      description:
        'The three screens that play when someone first arrives. The timings below were measured against the animation files — change them only if the animation itself changes.',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'splashFrame',
          fields: [
            defineField({name: 'title', type: 'string', validation: (rule) => rule.required()}),
            defineField({
              name: 'heading',
              title: 'Large heading (optional)',
              type: 'string',
              description: 'Only some frames show one.',
            }),
            defineField({
              name: 'loopSeconds',
              title: 'How long it plays (seconds)',
              type: 'number',
              description:
                'Matched to the animation file. Changing it makes the animation run out of step on phones.',
              validation: (rule) => rule.required().positive().max(30),
            }),
          ],
          preview: {select: {title: 'title', subtitle: 'loopSeconds'}},
        }),
      ],
    }),

    defineField({
      name: 'serviceMedia',
      title: 'Service videos',
      description:
        'The four full-screen videos people scroll through, in order.',
      type: 'array',
      group: 'services',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'serviceClip',
          fields: [
            defineField({name: 'title', type: 'string', validation: (rule) => rule.required()}),
            defineField({name: 'body', type: 'text', rows: 3, validation: (rule) => rule.required()}),
            defineField({
              name: 'service',
              title: 'Links to which service',
              type: 'reference',
              to: [{type: 'service'}],
            }),
            defineField({
              name: 'video',
              title: 'Video file',
              type: 'string',
              description:
                'Videos are not uploaded here — they are stored with the website. Paste the file name exactly, such as /homepage_assets/Product Development.mp4. Ask a developer to add a new one.',
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: 'videoWebm',
              title: 'Smaller video file (optional)',
              type: 'string',
              description: 'A lighter version used where the browser supports it.',
            }),
            defineField({
              name: 'poster',
              title: 'Still image',
              type: 'image',
              options: {hotspot: true},
              description:
                'Shown while the video loads, and to anyone whose browser blocks video. Upload this one here.',
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: 'scrimOpacity',
              title: 'Darkening over the video',
              type: 'number',
              initialValue: 0.5,
              description:
                'Makes the white text readable. 0 leaves the video untouched, 1 is solid black. Around 0.1 suits bright footage.',
              validation: (rule) => rule.required().min(0).max(1),
            }),
            defineField({
              name: 'playbackRate',
              title: 'Playback speed',
              type: 'number',
              initialValue: 1,
              description: '1 is normal speed. 0.5 plays at half speed, for footage cut too fast to read behind text.',
              validation: (rule) => rule.min(0.1).max(4),
            }),
          ],
          preview: {select: {title: 'title', subtitle: 'body', media: 'poster'}},
        }),
      ],
    }),

    defineField({
      name: 'featuredProjectsLede',
      title: 'Projects intro paragraph',
      type: 'text',
      rows: 3,
      group: 'projects',
    }),
    defineField({
      name: 'featuredProjects',
      title: 'Projects to show',
      type: 'array',
      group: 'projects',
      of: [defineArrayMember({type: 'reference', to: [{type: 'project'}]})],
      description: 'Pick from the Projects list. They appear in the order you put them in here.',
    }),

    defineField({
      name: 'industriesLede',
      title: 'Industries intro paragraph',
      type: 'text',
      rows: 3,
      group: 'industries',
    }),
    defineField({
      name: 'industries',
      title: 'Industries to show',
      type: 'array',
      group: 'industries',
      of: [defineArrayMember({type: 'reference', to: [{type: 'industry'}]})],
      description:
        'The scrolling strip near the bottom. Leave this empty and it shows every industry automatically.',
    }),

    defineField({name: 'seo', type: 'seo', group: 'meta'}),
  ],
  preview: {
    select: {lead: 'hero.titleLead', accent: 'hero.titleAccent'},
    prepare: ({lead, accent}: {lead?: string; accent?: string}) => ({
      title: 'Home page',
      subtitle: [lead, accent].filter(Boolean).join('') || undefined,
    }),
  },
})
