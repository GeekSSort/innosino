import { siteUrl, SITE_NAME } from "@/app/shared-metadata";
import type { Faq, OpenRole, Organization, Post } from "@/sanity/queries";

/**
 * Builders for the JSON-LD graphs. Every one is fed from the same content the
 * pages render, so the markup and the visible page cannot disagree —
 * structured data that describes something the visitor cannot see is the one
 * way this feature actively backfires.
 *
 * Nothing here reads a content module any more: the facts come from the
 * Content Lake, handed in by the page that is already querying them.
 */

/**
 * Absolute URL for a site path. Images now come from the asset CDN already
 * absolute, so a bare prefix would produce "https://innosino.comhttps://..."
 * — a malformed URL that quietly invalidates the graph it sits in.
 */
const abs = (path: string) => {
  if (/^https?:\/\//.test(path)) return path;
  return path === "/" ? siteUrl : `${siteUrl}${path}`;
};

/** The entity itself, once, in the root layout. */
export function organizationSchema(org: Organization) {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${siteUrl}/#organization`,
    name: org.siteName,
    legalName: org.legalName,
    url: siteUrl,
    description: org.organizationDescription,
    logo: { "@type": "ImageObject", url: abs(org.logo) },
    founder: {
      "@type": "Person",
      name: org.founder.name,
      jobTitle: org.founder.title,
    },
    /**
     * City and country only. There is no street address anywhere on the site,
     * and the Dhaka office belongs to DBTECH — a partner rather than INNOSINO
     * — so neither is claimed here.
     */
    address: {
      "@type": "PostalAddress",
      addressLocality: org.headquarters.locality,
      addressCountry: org.headquarters.country,
    },
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "sales",
      email: org.email,
      telephone: org.whatsApp,
    },
    sameAs: [org.linkedin].filter(Boolean),
  };
}

export function websiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${siteUrl}/#website`,
    url: siteUrl,
    name: SITE_NAME,
    publisher: { "@id": `${siteUrl}/#organization` },
  };
}

/**
 * Only ever built from question and answer pairs the page actually renders in
 * its accordion — an FAQPage describing answers that are not on the page is
 * the classic way this markup gets a site ignored.
 */
export function faqSchema(faqs: readonly Faq[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: { "@type": "Answer", text: f.answer },
    })),
  };
}

export function serviceSchema(service: {
  title: string;
  description: string;
  slug: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.title,
    description: service.description,
    url: abs(`/services/${service.slug}`),
    provider: { "@id": `${siteUrl}/#organization` },
    areaServed: "Worldwide",
  };
}

/** `trail` is the visible breadcrumb, home first. */
export function breadcrumbSchema(trail: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: trail.map((step, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: step.name,
      item: abs(step.path),
    })),
  };
}

/**
 * One job opening, so it can appear in Google's job search.
 *
 * `hiringOrganization` points at the Organization declared once in the root
 * layout rather than restating the company here, and `validThrough` is left
 * off deliberately: an expiry we do not track would start removing live
 * listings on a date nobody chose.
 */
export function jobPostingSchema(role: OpenRole) {
  return {
    "@context": "https://schema.org",
    "@type": "JobPosting",
    title: role.title,
    description: role.description,
    ...(role.postedAt ? { datePosted: role.postedAt } : {}),
    employmentType: role.employmentType.toUpperCase().replace(/-/g, "_"),
    hiringOrganization: { "@id": `${siteUrl}/#organization` },
    jobLocation: {
      "@type": "Place",
      address: {
        "@type": "PostalAddress",
        addressLocality: role.location,
      },
    },
    ...(/remote/i.test(role.location)
      ? { jobLocationType: "TELECOMMUTE" }
      : {}),
    url: abs(`/career/${role.slug}`),
    directApply: true,
  };
}

/**
 * One article. `datePublished` is the post's own ISO date rather than a build
 * timestamp, and the body is not reproduced here — the page renders it, and
 * duplicating prose into the markup only invites the two to drift.
 */
export function blogPostingSchema(post: Post) {
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    datePublished: post.date,
    image: abs(post.image),
    mainEntityOfPage: abs(`/blogs/${post.slug}`),
    author: { "@id": `${siteUrl}/#organization` },
    publisher: { "@id": `${siteUrl}/#organization` },
  };
}
