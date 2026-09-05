/** The links the floating navbar and its two panels show. */

export interface NavItem {
  label: string;
  href: string;
  /** Hidden from the pill on phones (mirrors the mobile reference) and
      reachable from the "More" panel instead. */
  secondary?: boolean;
}

export const navItems: NavItem[] = [
  { label: "Services", href: "/services" },
  { label: "Industries", href: "/industries", secondary: true },
  { label: "Projects", href: "/projects" },
  { label: "About Us", href: "/about", secondary: true },
];

/** The Services panel: four disciplines in two columns, then the two broader
    offers on their own lines — the arrangement of the reference frame. */
export const serviceGridLinks: NavItem[] = [
  { label: "Embedded System Design", href: "/services/embedded-system-design" },
  { label: "Software Integration", href: "/services/software-integration" },
  { label: "Hardware & PCB Design", href: "/services/hardware-pcb-design" },
  { label: "Manufacturing Support", href: "/services/manufacturing-support" },
];

export const serviceStackLinks: NavItem[] = [
  { label: "Product Development", href: "/services/product-development" },
  { label: "Industrial Automation", href: "/services/industrial-automation" },
];

/** The More panel carries everything the pill has no room for, including the
    two links the phone pill drops. */
export const moreLinks: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "Industries", href: "/industries" },
  { label: "About Us", href: "/about" },
  { label: "Contact Us", href: "/contact" },
  { label: "Expertise", href: "/expertise" },
  { label: "Life at Innosino", href: "/life-at-innosino" },
  { label: "Blog", href: "/blogs" },
  { label: "Career", href: "/career" },
];
