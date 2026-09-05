/**
 * Copy that appears on more than one page.
 *
 * The footer used to be pasted into all nine pages, and the copies had already
 * drifted: the About and Privacy Policy footers were missing the Services link
 * the other seven carried. One list, one place.
 */

export interface NavLink {
  label: string;
  href: string;
}

export const siteName = "INNOSINO";

/** Rendered in the bottom bar of every page. */
export const copyright = "© 2026 Innosion All Rights Reserved";

/*
 * Expertise and Life at INNOSINO are here because their only other links live
 * in the navbar's More panel, which is rendered on client state and so reaches
 * no crawler and no no-JS visitor: both pages had zero inbound links in every
 * served page.
 */
export const footerLinks: NavLink[] = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Expertise", href: "/expertise" },
  { label: "Life at INNOSINO", href: "/life-at-innosino" },
  { label: "Industries", href: "/industries" },
  { label: "Blogs", href: "/blogs" },
  { label: "Career", href: "/career" },
  { label: "Privacy Policy", href: "/privacy-policy" },
  { label: "Terms & Condition", href: "#terms" },
  { label: "Contact Us", href: "/contact" },
];

/** The chat dock that sits above the footer bar on every page. */
export const chatWidget = {
  greeting:
    "Welcome to Innosino! Need help? Just reply to this message—we’re online and ready to assist you.",
  closeLabel: "Close chat bubble",
  toggleLabel: "Toggle chat",
};

export const contactDetails = {
  whatsApp: { label: "what’s app:", value: "+86 13262237839" },
  email: { label: "Email:", value: "ceo@innosino.com" },
  weChat: { label: "We Chat:", value: "Innosinno" },
};

export const social = {
  linkedin: "https://linkedin.com",
};

/** The glass banner that closes the About, Blogs, Projects and service pages. */
export const ctaBanner = {
  title: "HAVE AN IDEA? LET'S ENGINEER IT INTO A PRODUCT.",
  /* Blogs and Projects carried the colon, About and the service pages did
     not. Kept, as the grammatical one. */
  body: "Tell us about your project: hardware, firmware, or both. We'll come back with a clear path from concept to production.",
  action: { label: "Book a Call", href: "/contact" },
};
