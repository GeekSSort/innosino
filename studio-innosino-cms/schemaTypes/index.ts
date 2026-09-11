import {objectTypes} from './objects'
import {post, category} from './documents/post'
import {service} from './documents/service'
import {project} from './documents/project'
import {industry, testimonial, openRole} from './documents/misc'
import {siteSettings} from './pages/siteSettings'
import {homePage} from './pages/homePage'
import {aboutPage} from './pages/aboutPage'
import {careerPage} from './pages/careerPage'
import {contactPage} from './pages/contactPage'
import {
  servicesPage,
  expertisePage,
  industriesPage,
  projectsPage,
  projectDetailPage,
  blogsPage,
  lifePage,
  privacyPage,
} from './pages/simplePages'

/** One document per page, plus the collections those pages list. */
export const singletonTypes = [
  siteSettings,
  homePage,
  aboutPage,
  servicesPage,
  expertisePage,
  industriesPage,
  projectsPage,
  projectDetailPage,
  blogsPage,
  careerPage,
  contactPage,
  lifePage,
  privacyPage,
]

export const collectionTypes = [
  post,
  category,
  service,
  project,
  industry,
  testimonial,
  openRole,
]

/** The names Structure locks to a fixed document id — see structure.ts. */
export const SINGLETON_TYPES = singletonTypes.map((type) => type.name)

export const schemaTypes = [...objectTypes, ...singletonTypes, ...collectionTypes]
