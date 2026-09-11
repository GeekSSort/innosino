import type {ComponentType} from 'react'
import type {StructureResolver} from 'sanity/structure'
import {CogIcon} from '@sanity/icons/Cog'
import {HomeIcon} from '@sanity/icons/Home'
import {InfoOutlineIcon} from '@sanity/icons/InfoOutline'
import {BulbOutlineIcon} from '@sanity/icons/BulbOutline'
import {EarthGlobeIcon} from '@sanity/icons/EarthGlobe'
import {RocketIcon} from '@sanity/icons/Rocket'
import {CaseIcon} from '@sanity/icons/Case'
import {DocumentTextIcon} from '@sanity/icons/DocumentText'
import {UsersIcon} from '@sanity/icons/Users'
import {EnvelopeIcon} from '@sanity/icons/Envelope'
import {ImagesIcon} from '@sanity/icons/Images'
import {LockIcon} from '@sanity/icons/Lock'
import {TagIcon} from '@sanity/icons/Tag'
import {CommentIcon} from '@sanity/icons/Comment'
import {EnvelopeIcon as InboxIcon} from '@sanity/icons/Envelope'

/**
 * The Studio sidebar, written for the person who actually edits this site
 * rather than for the shape of the schema.
 *
 * Everything is one click deep. The previous version filed the twelve pages
 * inside a "Pages" folder and the posts inside a "Blog" folder, which meant
 * the single most common job — change some words on the home page — started
 * with opening a folder you had to know was there.
 *
 * The order is how often something gets touched, not how the data is modelled:
 * the things that change weekly are at the top, the pages that change monthly
 * in the middle, and the set-and-forget settings at the bottom.
 */

/** Each page, with the address it maps to so nobody has to guess. */
const PAGES: {type: string; title: string; url: string; icon: ComponentType}[] = [
  {type: 'homePage', title: 'Home', url: '/', icon: HomeIcon},
  {type: 'aboutPage', title: 'About us', url: '/about', icon: InfoOutlineIcon},
  {type: 'servicesPage', title: 'Services', url: '/services', icon: CogIcon},
  {type: 'expertisePage', title: 'Expertise', url: '/expertise', icon: BulbOutlineIcon},
  {type: 'industriesPage', title: 'Industries', url: '/industries', icon: EarthGlobeIcon},
  {type: 'projectsPage', title: 'Projects', url: '/projects', icon: RocketIcon},
  {type: 'projectDetailPage', title: 'PolyPan case study', url: '/projects/details', icon: CaseIcon},
  {type: 'blogsPage', title: 'Blog', url: '/blogs', icon: DocumentTextIcon},
  {type: 'careerPage', title: 'Careers', url: '/career', icon: UsersIcon},
  {type: 'contactPage', title: 'Contact us', url: '/contact', icon: EnvelopeIcon},
  {type: 'lifePage', title: 'Life at INNOSINO', url: '/life-at-innosino', icon: ImagesIcon},
  {type: 'privacyPage', title: 'Privacy policy', url: '/privacy-policy', icon: LockIcon},
]

export const structure: StructureResolver = (S) =>
  S.list()
    .title('INNOSINO website')
    .items([
      /* ---- Things you add to, most often ---------------------------- */
      S.documentTypeListItem('post')
        .title('Blog posts')
        .icon(DocumentTextIcon),
      S.documentTypeListItem('project')
        .title('Projects')
        .icon(RocketIcon),
      S.documentTypeListItem('openRole')
        .title('Job openings')
        .icon(UsersIcon),
      S.documentTypeListItem('testimonial')
        .title('Client quotes')
        .icon(CommentIcon),

      /* Applications arrive here from the job pages. Newest first, because
         the only question anyone opens this list to answer is "what came in?" */
      S.listItem()
        .title('Job applications')
        .icon(InboxIcon)
        .child(
          S.documentTypeList('jobApplication')
            .title('Job applications')
            .defaultOrdering([{field: 'submittedAt', direction: 'desc'}]),
        ),

      S.divider(),

      /* ---- One document per page on the website ---------------------- */
      ...PAGES.map(({type, title, url, icon}) =>
        S.listItem()
          .title(`${title} page`)
          .id(type)
          .icon(icon)
          .child(S.document().schemaType(type).documentId(type).title(`${title} page`)),
      ),

      S.divider(),

      /* ---- Set up once, rarely touched ------------------------------ */
      S.documentTypeListItem('service')
        .title('Service types')
        .icon(CogIcon),
      S.documentTypeListItem('industry')
        .title('Industries served')
        .icon(EarthGlobeIcon),
      S.documentTypeListItem('category')
        .title('Blog categories')
        .icon(TagIcon),
      S.listItem()
        .title('Menus, footer & contact details')
        .icon(CogIcon)
        .child(
          S.document()
            .schemaType('siteSettings')
            .documentId('siteSettings')
            .title('Menus, footer & contact details'),
        ),
    ])
