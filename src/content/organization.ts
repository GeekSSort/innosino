import { contactDetails, siteName, social } from "./site";
import { founderQuote } from "./about";

/**
 * The facts that identify INNOSINO as an entity rather than a string, for the
 * Organization graph in the root layout.
 *
 * Everything here is on the site: the founder on /about, the headquarters and
 * both contact routes on /contact. Nothing is invented, and nothing is claimed
 * that the pages do not show — in particular there is no street address
 * anywhere on the site, so the postal address stops at the city.
 *
 * The Dhaka office is deliberately absent. It belongs to DBTECH Technology Co.
 * Ltd., a partner rather than INNOSINO, so listing it as INNOSINO's own
 * location would be a false claim about a real company.
 */
export const organization = {
  name: siteName,
  legalName: "INNOSINO (上海) Technology Co., Ltd.",
  description:
    "An innovation-driven engineering company turning ideas into high-performance, market-ready products across embedded systems, hardware and PCB design, product development and industrial automation.",
  logo: "/about_us/IS-Logo.png",
  founder: { name: founderQuote.name, title: founderQuote.role },
  headquarters: { locality: "Shanghai", country: "CN" },
  email: contactDetails.email.value,
  telephone: contactDetails.whatsApp.value,
  sameAs: [social.linkedin],
} as const;
