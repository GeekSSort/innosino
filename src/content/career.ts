/** Copy for the careers page (/career). */

import { contactDetails } from "./site";

export const careerHero = {
  breadcrumb: "CAREER",
  titleLead: "BUILD THINGS THAT ",
  titleAccent: "SHIP",
  sub: "We take products from a first sketch to a production line. If you would rather own a subsystem than a ticket, there is a bench here for you.",
};

/**
 * Applications go to the one address the site already publishes. A careers@
 * alias would be a mailbox we cannot promise anyone reads — the same reason
 * organization.ts refuses to invent a street address.
 */
export const applyEmail = contactDetails.email.value;

export const applyHref = (role: string) =>
  `mailto:${applyEmail}?subject=${encodeURIComponent(`Application — ${role}`)}`;

export interface CareerValue {
  title: string;
  desc: string;
}

export const whyJoin = {
  heading: { lead: "WHY ENGINEERS ", accent: "STAY" },
  cards: [
    {
      title: "Real products, not slideware",
      desc: "Your work leaves the building. Everything we design is aimed at a production line with a date on it.",
    },
    {
      title: "Ownership from day one",
      desc: "Small teams, whole problems. You take a subsystem end to end rather than a ticket at a time.",
    },
    {
      title: "The lab is downstairs",
      desc: "Scopes, analysers and a bench of your own. You are never blocked waiting for a slot to measure something.",
    },
    {
      title: "Learn across the stack",
      desc: "Firmware people read schematics here, and hardware people read code. The boundary is where the interesting bugs live.",
    },
    {
      title: "Honest timelines",
      desc: "We quote what a thing actually takes. That applies to your projects the same way it applies to our clients'.",
    },
    {
      title: "Ship globally from Shanghai",
      desc: "Clients across energy, medical, industrial and consumer work — and the manufacturing base to build for all of them.",
    },
  ] satisfies CareerValue[],
};

export interface OpenRole {
  num: string;
  title: string;
  /** Location and contract type, shown under the title. */
  meta: string;
  desc: string;
}

/** Placeholder listings — replace with the roles actually open before launch. */
export const openRoles: OpenRole[] = [
  {
    num: "01",
    title: "Embedded Firmware Engineer",
    meta: "Shanghai · Full-time",
    desc: "C and RTOS work on ARM Cortex-M targets: drivers, BLE and Wi-Fi stacks, OTA, and the bring-up that turns a new board into a working one.",
  },
  {
    num: "02",
    title: "Hardware & PCB Design Engineer",
    meta: "Shanghai · Full-time",
    desc: "Schematic capture through multilayer layout, DFM review and EMC pre-compliance, for boards that go straight into production.",
  },
  {
    num: "03",
    title: "IoT Backend & Cloud Engineer",
    meta: "Remote · Full-time",
    desc: "Device APIs, telemetry pipelines and dashboards behind the fleets our hardware joins, from provisioning through to live control.",
  },
  {
    num: "04",
    title: "Test & Validation Engineer",
    meta: "Shanghai · Full-time",
    desc: "Test fixtures, automated bring-up scripts and environmental testing — the evidence a design holds before it reaches a customer.",
  },
  {
    num: "05",
    title: "Manufacturing Support Engineer",
    meta: "Shenzhen · Full-time",
    desc: "Sit between design and the line: pilot builds, yield analysis, supplier qualification and the fixes that take a prototype to volume.",
  },
  {
    num: "06",
    title: "Engineering Intern",
    meta: "Shanghai · 6 months",
    desc: "Six months alongside the hardware and firmware teams on live projects, with your own scope and an engineer to answer to.",
  },
];

export const hiring = {
  heading: { lead: "HOW WE ", accent: "HIRE" },
  steps: [
    {
      num: "01",
      title: "Application",
      desc: "Send a CV and anything you have built. A repo, a board file or a photo of something that works counts for more than a cover letter.",
    },
    {
      num: "02",
      title: "Intro call",
      desc: "Thirty minutes on what you have worked on and what you want next, with the engineer you would sit beside.",
    },
    {
      num: "03",
      title: "Technical deep dive",
      desc: "One real problem from our domain, discussed the way we would discuss it on a Tuesday. No whiteboard trivia.",
    },
    {
      num: "04",
      title: "Offer",
      desc: "References, terms and a start date. We come back within a week either way.",
    },
  ],
};

export const lifeStrip = {
  heading: { lead: "THE PLACE YOU WOULD ", accent: "WORK" },
  link: { label: "See life at INNOSINO", href: "/life-at-innosino" },
  photos: [
    { src: "/lifeininnosino/4.webp", alt: "The INNOSINO team at work" },
    { src: "/lifeininnosino/8.webp", alt: "Bench testing in the INNOSINO lab" },
    { src: "/lifeininnosino/12.webp", alt: "An INNOSINO team moment" },
  ],
};

export const careerCta = {
  title: "NOTHING HERE FITS? TELL US WHAT YOU WOULD BUILD.",
  body: "We open roles when we meet the right engineer, not only when a listing goes up. Send what you have worked on and what you want to work on next.",
  action: { label: "Send an open application", href: applyHref("Open application") },
};
