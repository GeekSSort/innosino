import { defineQuery } from "next-sanity";
import type { PortableTextBlock } from "next-sanity";

/**
 * Queries project into the shapes the components already expect, so moving a
 * page onto Sanity changes where the data comes from and not how it is read.
 *
 * The one deliberate change is `sections[].body`: it was an array of plain
 * paragraphs and is now Portable Text, which is what lets an editor bold a
 * term or link a datasheet without a code change.
 */

export interface PageSeo {
  title: string | null;
  description: string | null;
  image: string | null;
}

export interface PostSection {
  /** Anchor id, also the table-of-contents target. */
  id: string;
  heading: string;
  body: PortableTextBlock[];
}

export interface Post {
  slug: string;
  category: string;
  /** Which filter pills on the index this post answers to. */
  filterTags: string[];
  /** ISO, so it sorts and feeds `datePublished` without being reparsed. */
  date: string;
  title: string;
  excerpt: string;
  image: string;
  pullQuote?: string;
  author: string;
  authorInitials: string;
  /** Overrides the title and excerpt in the page's metadata when set. */
  seo: PageSeo;
  sections: PostSection[];
}

/**
 * `filterTags` folds the primary category in with the extra pills, matching
 * what the index checks against. "All" is not stored — the index short-circuits
 * that pill rather than tagging every post with it.
 */
const POST_FIELDS = /* groq */ `
  "slug": slug.current,
  "category": category->title,
  "filterTags": array::compact([category->title]) + array::compact(filterTags[]->title),
  "date": publishedAt,
  title,
  excerpt,
  "image": image.asset->url,
  pullQuote,
  author,
  authorInitials,
  "seo": { "title": seo.title, "description": seo.description, "image": seo.image.asset->url },
  sections[]{
    "id": anchorId.current,
    heading,
    body
  }
`;

export const POSTS_QUERY = defineQuery(`
  *[_type == "post" && defined(slug.current)]
    | order(publishedAt desc) {
    ${POST_FIELDS}
  }
`);

export const POST_QUERY = defineQuery(`
  *[_type == "post" && slug.current == $slug][0] {
    ${POST_FIELDS}
  }
`);

export const POST_SLUGS_QUERY = defineQuery(`
  *[_type == "post" && defined(slug.current)].slug.current
`);

export const BLOG_CATEGORIES_QUERY = defineQuery(`
  *[_type == "category"] | order(order asc).title
`);

export const BLOGS_PAGE_QUERY = defineQuery(`
  *[_id == "blogsPage"][0] {
    hero {
      breadcrumb,
      "title": heading.lead + coalesce(heading.accent, ""),
      "sub": subtitle
    }
  }
`);

export interface SiteSettings {
  siteName: string;
  copyright: string;
  email: string;
  footerLinks: { label: string; href: string }[];
  chatWidget: { greeting: string; toggleLabel: string; closeLabel: string };
  ctaBanner: {
    title: string;
    body: string;
    action: { label: string; href: string };
  };
}

export const SITE_SETTINGS_QUERY = defineQuery(`
  *[_id == "siteSettings"][0] {
    siteName,
    copyright,
    email,
    footerLinks[]{ label, href },
    chatWidget { greeting, toggleLabel, closeLabel },
    ctaBanner { title, body, action { label, href } }
  }
`);

/* ------------------------------------------------------------------------ *
 * Shared fragments
 * ------------------------------------------------------------------------ */

export interface PageHero {
  breadcrumb: string;
  /** The plain run of the title. */
  titleLead: string;
  /** The run rendered in the accent colour. Empty when the title is one run. */
  titleAccent: string;
  sub: string;
}

/**
 * Heroes project to the shape the page components already read. A page whose
 * title is a single run gets an empty accent rather than a missing field, so
 * the component can render both without a branch.
 */
const HERO = /* groq */ `
  hero {
    breadcrumb,
    "titleLead": heading.lead,
    "titleAccent": coalesce(heading.accent, ""),
    "sub": coalesce(subtitle, "")
  }
`;

const HEADING = /* groq */ `{ lead, "accent": coalesce(accent, "") }`;

export interface SplitHeading {
  lead: string;
  accent: string;
}

export interface TextCard {
  title: string;
  description: string;
}

export interface NumberedItem {
  number: string;
  title: string;
  description: string;
}

export interface Stage {
  label: string;
  title: string;
  description: string;
}

export interface Stat {
  value: string;
  label: string;
  description?: string;
}

export interface Faq {
  question: string;
  answer: string;
}

export interface CtaBanner {
  title: string;
  body: string;
  action: { label: string; href: string };
}

/* ------------------------------------------------------------------------ *
 * Services
 * ------------------------------------------------------------------------ */

export interface ServiceCaseStudy {
  title: string;
  category: string;
  description: string;
  image: string;
}

export interface Service {
  slug: string;
  title: string;
  description: string;
  navGroup: "grid" | "stack";
  processStages: Stage[];
  onDemandServices: NumberedItem[];
  whyUsPoints: NumberedItem[];
  faqs: Faq[];
  /** Overrides the title and description in the page's metadata when set. */
  seo: PageSeo;
  projects?: ServiceCaseStudy[];
}

const SERVICE_FIELDS = /* groq */ `
  "slug": slug.current,
  title,
  description,
  navGroup,
  processStages[]{ label, title, description },
  onDemandServices[]{ number, title, description },
  whyUsPoints[]{ number, title, description },
  faqs[]{ question, answer },
  "seo": { "title": seo.title, "description": seo.description, "image": seo.image.asset->url },
  "projects": projects[]{ title, category, description, "image": image.asset->url }
`;

export const SERVICES_QUERY = defineQuery(`
  *[_type == "service"] | order(order asc) { ${SERVICE_FIELDS} }
`);

export const SERVICE_QUERY = defineQuery(`
  *[_type == "service" && slug.current == $slug][0] { ${SERVICE_FIELDS} }
`);

export const SERVICE_SLUGS_QUERY = defineQuery(`
  *[_type == "service"] | order(order asc).slug.current
`);

export const SERVICES_PAGE_QUERY = defineQuery(`
  *[_id == "servicesPage"][0] { ${HERO} }
`);

/* ------------------------------------------------------------------------ *
 * Projects
 * ------------------------------------------------------------------------ */

export interface Project {
  slug: string;
  title: string;
  category: string;
  filterTags: string[];
  description: string;
  image: string;
  isFeatured: boolean;
  featuredBadge?: string;
  stats: Stat[];
}

const PROJECT_FIELDS = /* groq */ `
  "slug": slug.current,
  title,
  category,
  "filterTags": coalesce(filterTags, []),
  description,
  "image": image.asset->url,
  "isFeatured": coalesce(isFeatured, false),
  featuredBadge,
  "stats": coalesce(stats[]{ value, label, description }, [])
`;

export const PROJECTS_QUERY = defineQuery(`
  *[_type == "project"] | order(order asc) { ${PROJECT_FIELDS} }
`);

export const PROJECTS_PAGE_QUERY = defineQuery(`
  *[_id == "projectsPage"][0] {
    ${HERO},
    featuredEyebrow,
    recentHeading ${HEADING},
    "categories": coalesce(categories, [])
  }
`);

/* ------------------------------------------------------------------------ *
 * Page singletons
 * ------------------------------------------------------------------------ */

export const HOME_PAGE_QUERY = defineQuery(`
  *[_id == "homePage"][0] {
    hero { titleLead, titleAccent, subtitle },
    splashFrames[]{ title, heading, loopSeconds },
    serviceMedia[]{
      title,
      body,
      "id": service->slug.current,
      "videoSrc": video,
      "webmSrc": videoWebm,
      "posterSrc": poster.asset->url,
      scrimOpacity,
      playbackRate
    },
    featuredProjectsLede,
    "featuredProjects": featuredProjects[]->{
      title,
      description,
      "image": image.asset->url,
      "stats": coalesce(stats[]{ value, label }, [])
    },
    industriesLede,
    "industries": select(
      count(industries) > 0 => industries[]->{
        "id": slug.current, title, description, "image": image.asset->url
      },
      *[_type == "industry"] | order(order asc) {
        "id": slug.current, title, description, "image": image.asset->url
      }
    )
  }
`);

export const ABOUT_PAGE_QUERY = defineQuery(`
  *[_id == "aboutPage"][0] {
    ${HERO},
    founderQuote { text, name, role },
    vision { title, body },
    mission { title, body },
    "visionFigure": { "src": visionFigure.asset->url, "alt": coalesce(visionFigure.alt, "") },
    driveHeading ${HEADING},
    driveCards[]{ title, description },
    resultsHeading ${HEADING},
    stats[]{ value, label, description },
    testimonialsHeading ${HEADING},
    "testimonials": select(
      count(testimonials) > 0 => testimonials[]->{
        quote, author, role, "avatar": avatar.asset->url
      },
      *[_type == "testimonial"] | order(order asc) {
        quote, author, role, "avatar": avatar.asset->url
      }
    )
  }
`);

export const EXPERTISE_PAGE_QUERY = defineQuery(`
  *[_id == "expertisePage"][0] {
    ${HERO},
    whyHeading ${HEADING},
    featureCards[]{ title, description },
    toolsHeading ${HEADING},
    toolsAndTech[]{ title, description },
    processHeading ${HEADING},
    processStages[]{ label, title, description }
  }
`);

export const INDUSTRIES_PAGE_QUERY = defineQuery(`
  *[_id == "industriesPage"][0] {
    ${HERO},
    gridHeading ${HEADING}
  }
`);

export const INDUSTRIES_QUERY = defineQuery(`
  *[_type == "industry"] | order(order asc) {
    "id": slug.current,
    title,
    description,
    "image": image.asset->url
  }
`);

export const CAREER_PAGE_QUERY = defineQuery(`
  *[_id == "careerPage"][0] {
    ${HERO},
    whyJoinHeading ${HEADING},
    whyJoinCards[]{ title, description },
    hiringHeading ${HEADING},
    hiringSteps[]{ number, title, description },
    lifeHeading ${HEADING},
    lifeLink { label, href },
    "lifePhotos": lifePhotos[]{ "src": asset->url, "alt": coalesce(alt, "") },
    cta { title, body, action { label, href } }
  }
`);

export const OPEN_ROLES_QUERY = defineQuery(`
  *[_type == "openRole" && isOpen == true] | order(order asc) {
    number, title, meta, description
  }
`);

export const CONTACT_PAGE_QUERY = defineQuery(`
  *[_id == "contactPage"][0] {
    ${HERO},
    form { title, lede, "points": coalesce(points, []) },
    hubsLede,
    hubs[]{ city, address, map, isOwnOffice },
    faqHeading ${HEADING},
    faqs[]{ question, answer }
  }
`);

export const LIFE_PAGE_QUERY = defineQuery(`
  *[_id == "lifePage"][0] {
    ${HERO},
    ambition,
    highlights[]{ title, body, "image": image.asset->url },
    "gallery": gallery[]{ "src": asset->url, "alt": coalesce(alt, "") },
    "photoMosaic": photoMosaic[]{ "src": asset->url, "alt": coalesce(alt, "") }
  }
`);

export const PRIVACY_PAGE_QUERY = defineQuery(`
  *[_id == "privacyPage"][0] {
    ${HERO},
    lastUpdated,
    body,
    contactHeading,
    contactBody
  }
`);

/**
 * The organisation facts behind the JSON-LD in the root layout, plus the
 * navigation the header renders. Split from SITE_SETTINGS_QUERY so a page that
 * only needs the footer does not carry the whole record.
 */
export interface Organization {
  siteName: string;
  legalName: string;
  organizationDescription: string;
  logo: string;
  headquarters: { locality: string; country: string };
  founder: { name: string; title: string };
  email: string;
  whatsApp: string;
  linkedin: string;
}

export const ORGANIZATION_QUERY = defineQuery(`
  *[_id == "siteSettings"][0] {
    siteName,
    legalName,
    organizationDescription,
    "logo": logo.asset->url,
    headquarters { locality, country },
    founder { name, title },
    email,
    whatsApp,
    linkedin
  }
`);

/* ------------------------------------------------------------------------ *
 * Page query result types
 * ------------------------------------------------------------------------ */

export interface Testimonial {
  quote: string;
  author: string;
  role: string;
  avatar: string;
}

export interface AboutPageData {
  hero: PageHero;
  founderQuote: { text: string; name: string; role: string };
  vision: { title: string; body: string };
  mission: { title: string; body: string };
  visionFigure: { src: string; alt: string };
  driveHeading: SplitHeading;
  driveCards: TextCard[];
  resultsHeading: SplitHeading;
  stats: Stat[];
  testimonialsHeading: SplitHeading;
  testimonials: Testimonial[];
}

export interface ExpertisePageData {
  hero: PageHero;
  whyHeading: SplitHeading;
  featureCards: TextCard[];
  toolsHeading: SplitHeading;
  toolsAndTech: TextCard[];
  processHeading: SplitHeading;
  processStages: Stage[];
}

export interface Industry {
  id: string;
  title: string;
  description: string;
  image: string;
}

export interface IndustriesPageData {
  hero: PageHero;
  gridHeading: SplitHeading;
}

export interface ProjectsPageData {
  hero: PageHero;
  featuredEyebrow: string;
  recentHeading: SplitHeading;
  categories: string[];
}

export interface CareerPageData {
  hero: PageHero;
  whyJoinHeading: SplitHeading;
  whyJoinCards: TextCard[];
  hiringHeading: SplitHeading;
  hiringSteps: NumberedItem[];
  lifeHeading: SplitHeading;
  lifeLink: { label: string; href: string };
  lifePhotos: { src: string; alt: string }[];
  cta: CtaBanner;
}

export interface OpenRole {
  number: string;
  title: string;
  meta: string;
  description: string;
}

export interface ContactPageData {
  hero: PageHero;
  form: { title: string; lede: string; points: string[] };
  hubsLede: string;
  hubs: {
    city: string;
    address: string;
    map: string;
    isOwnOffice: boolean;
  }[];
  faqHeading: SplitHeading;
  faqs: Faq[];
}

export interface LifePageData {
  hero: PageHero;
  ambition: string;
  highlights: { title: string; body: string; image?: string }[];
  /** The hero carousel. */
  gallery: { src: string; alt: string }[];
  /** The ten-slot grid lower down; each position has its own size. */
  photoMosaic: { src: string; alt: string }[];
}

export interface PrivacyPageData {
  hero: PageHero;
  lastUpdated: string;
  body: PortableTextBlock[];
  contactHeading: string;
  contactBody: string;
}

export interface HomePageData {
  hero: { titleLead: string; titleAccent: string; subtitle: string };
  splashFrames: { title: string; heading?: string; loopSeconds: number }[];
  serviceMedia: {
    id: string;
    title: string;
    body: string;
    videoSrc: string;
    webmSrc?: string;
    posterSrc: string;
    scrimOpacity: number;
    playbackRate: number;
  }[];
  featuredProjectsLede: string;
  featuredProjects: {
    title: string;
    description: string;
    image: string;
    stats: { value: string; label: string }[];
  }[];
  industriesLede: string;
  industries: Industry[];
}

export interface ProjectDetailPageData {
  hero: PageHero;
  heroVideo: string;
  sectionsHeading: string;
  overviewIntro: string;
  architectureNote: string;
  specsLede: string;
  signalPathLede: string;
  signalPathSteps: string[];
  timelineLede: string;
  timelineSteps: string[];
  cta: CtaBanner;
}

export const PROJECT_DETAIL_PAGE_QUERY = defineQuery(`
  *[_id == "projectDetailPage"][0] {
    ${HERO},
    heroVideo,
    sectionsHeading,
    overviewIntro,
    architectureNote,
    specsLede,
    signalPathLede,
    "signalPathSteps": coalesce(signalPathSteps, []),
    timelineLede,
    "timelineSteps": coalesce(timelineSteps, []),
    cta { title, body, action { label, href } }
  }
`);

export interface NavLink {
  label: string;
  href: string;
}

export interface NavData {
  /** The brand mark, shown in every page hero. */
  logo: string;
  navItems: (NavLink & { secondary: boolean })[];
  moreLinks: NavLink[];
  /** The four disciplines shown as a grid in the Services panel. */
  serviceGridLinks: NavLink[];
  /** The broader offers, stacked beneath them. */
  serviceStackLinks: NavLink[];
}

/**
 * The navbar. The two service lists are derived from the services themselves
 * rather than kept as a second hand-maintained list, so a new discipline
 * appears in the panel as soon as it is published.
 */
export const NAV_QUERY = defineQuery(`
  {
    "logo": *[_id == "siteSettings"][0].logo.asset->url,
    "navItems": *[_id == "siteSettings"][0].navItems[]{
      label, href, "secondary": coalesce(secondary, false)
    },
    "moreLinks": *[_id == "siteSettings"][0].moreLinks[]{ label, href },
    "serviceGridLinks": *[_type == "service" && navGroup == "grid"] | order(order asc) {
      "label": title, "href": "/services/" + slug.current
    },
    "serviceStackLinks": *[_type == "service" && navGroup == "stack"] | order(order asc) {
      "label": title, "href": "/services/" + slug.current
    }
  }
`);

/* ------------------------------------------------------------------------ *
 * Per-page SEO
 * ------------------------------------------------------------------------ */

/**
 * A page's own search metadata.
 *
 * Deliberately not derived from the hero when empty: several heroes are full
 * sentences, and About's would have produced a 200-character <title>. An unset
 * field falls back to the curated pair in the layout instead.
 */
export const PAGE_SEO_QUERY = defineQuery(`
  *[_id == $id][0]{
    "title": seo.title,
    "description": seo.description,
    "image": seo.image.asset->url
  }
`);
