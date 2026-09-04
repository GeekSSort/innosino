import { organization } from "./organization";
import { siteUrl, SITE_NAME } from "@/app/shared-metadata";

/**
 * Builders for the JSON-LD graphs. Every one is fed from the same content
 * modules the pages render, so the markup and the visible page cannot disagree
 * — structured data that describes something the visitor cannot see is the one
 * way this feature actively backfires.
 */

const abs = (path: string) => (path === "/" ? siteUrl : `${siteUrl}${path}`);

/** The entity itself, once, in the root layout. */
export function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${siteUrl}/#organization`,
    name: organization.name,
    legalName: organization.legalName,
    url: siteUrl,
    description: organization.description,
    logo: { "@type": "ImageObject", url: abs(organization.logo) },
    founder: {
      "@type": "Person",
      name: organization.founder.name,
      jobTitle: organization.founder.title,
    },
    address: {
      "@type": "PostalAddress",
      addressLocality: organization.headquarters.locality,
      addressCountry: organization.headquarters.country,
    },
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "sales",
      email: organization.email,
      telephone: organization.telephone,
    },
    sameAs: [...organization.sameAs],
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
export function faqSchema(faqs: readonly { q: string; a: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
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
