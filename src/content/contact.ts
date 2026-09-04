/** Copy for the Contact page (/contact). */

export interface Faq {
  q: string;
  a: string;
}

export interface Hub {
  city: string;
  address: string;
  map: string;
}

export const contactHero = {
  breadcrumb: "CONTACT US",
  title: "LET'S BUILD BETTER HARDWARE.",
  sub: "Turn your hardware concept into a production-ready product with expert engineering, precision PCB design, and end-to-end development support.",
};

export const contactForm = {
  title: "Tell us what you're building",
  lede: "The more context you give us up front, the faster we can scope the engineering work and get back to you with a real answer.",
  points: [
    "Expect a response from us within 24 hours.",
    "We're happy to sign an NDA upon request.",
    "Dedicated Hardware Experts.",
  ],
};

export const hubsLede =
  "From concept to production, INNOSINO delivers embedded systems, hardware, PCB design, software integration, and industrial automation.";

export const contactHeadings = {
  faq: { lead: "HOW LONG UNTIL I HEAR ", accent: "BACK?" },
};

/** The live clock is state on the page, so only the fixed fields live here. */
export const contactHubs: Hub[] = [
  {
    city: "SHANGHAI",
    address:
      "INNOSINO (上海) Technology Co., Ltd. — Headquarters, Shanghai, China",
    map: "https://maps.google.com/?q=Shanghai",
  },
  {
    city: "DHAKA",
    address: "DBTECH Technology Co. Ltd. — Partner Office, Dhaka, Bangladesh",
    map: "https://maps.google.com/?q=Dhaka",
  },
];

export const contactFaqs: Faq[] = [
  {
    q: "How long until I hear back?",
    a: "We review inquiries as they come in and respond within 24 hours on business days. If you provide schematics or a project brief upfront, our engineers can often return initial feasibility notes in the very first response.",
  },
  {
    q: "Do I need a finished spec before reaching out?",
    a: "Not at all. Whether you have a rough block diagram, a BOM draft, or just a concept napkin sketch, our engineering team can help formalize specifications, select viable architectures, and scope the development roadmap.",
  },
  {
    q: "Can you sign an NDA before reviewing project details?",
    a: "Yes. We regularly execute non-disclosure agreements before reviewing confidential schematics, proprietary firmware requirements, or industrial designs.",
  },
  {
    q: "Do you work with clients outside Bangladesh?",
    a: "Yes! We work with global clients across North America, Europe, East Asia, and Australia. Our headquarters in Shanghai and partner office in Dhaka enable direct coordination with global supply chains and fabrication facilities.",
  },
];
