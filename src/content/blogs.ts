/** Copy for the blog index (/blogs). */

/** Every post is bylined to the team, so the avatar initials are shared. */
export const authorInitials = "IS";

export const blogsHero = {
  breadcrumb: "BLOG",
  title: "OUR LATEST BLOGS",
  sub: "Stay updated with the latest industry trends, technical guides, engineering insights, project stories, and innovations that inspire smarter products and better technology solutions.",
};

export const featuredBlog = {
  eyebrow: "Featured Blog",
  date: "March 12, 2026",
  title: "Inside The Logic IC Trainer Kit's 16 Profiles",
  desc: "Why we chose a profile-based architecture over hardcoded logic families to improve flexibility, usability, maintainability, and long-term adaptability across diverse applications.",
  author: "Innosino Team",
  initials: "IS",
  readTime: "8 min",
  image: "/blog_details assets/BD-01.png",
  cta: { label: "Know Details", href: "/blogs/details" },
};

export interface BlogCard {
  id: number;
  category: string;
  date: string;
  title: string;
  desc: string;
  author: string;
  readTime: string;
  img: string;
  filterTags: string[];
}

export const categories: string[] = [
  "All",
  "Featured Blogs",
  "Embedded Systems",
  "Firmware",
  "PCB Design",
  "IOT Devices",
  "Industrial Automation",
];

export const allBlogs: BlogCard[] = [
  {
    id: 1,
    category: "PCB Design",
    date: "March 12, 2026",
    title: "Stack-Up Choices For 3-Layer Sense Boards",
    desc: "How we choose copper weight, spacing, and shielding for a sensitive ground track.",
    author: "Innosino Team",
    readTime: "5 min",
    img: "/homepage_assets/featured_project_images/white_moontype.png",
    filterTags: ["All", "PCB Design", "Featured Blogs"],
  },
  {
    id: 2,
    category: "Firmware",
    date: "March 12, 2026",
    title: "Debugging Cross-Talk In Dense Capacitive Arrays",
    desc: "A practical walk-through of adaptive baseline filtering for closely packed touch zones.",
    author: "Innosino Team",
    readTime: "6 min",
    img: "/blog_details assets/BD-02.png",
    filterTags: ["All", "Firmware", "Embedded Systems"],
  },
  {
    id: 3,
    category: "Embedded Systems",
    date: "March 12, 2026",
    title: "Getting BLE MIDI Latency Under 10ms",
    desc: "Notes from tuning connection intervals and packet scheduling for live performance use.",
    author: "Innosino Team",
    readTime: "7 min",
    img: "/blog_details assets/BD-03.png",
    filterTags: ["All", "Embedded Systems", "IOT Devices"],
  },
  {
    id: 4,
    category: "Embedded Systems",
    date: "March 12, 2026",
    title: "Getting BLE MIDI Latency Under 10ms",
    desc: "Notes from tuning connection intervals and packet scheduling for live performance use.",
    author: "Innosino Team",
    readTime: "7 min",
    img: "/blog_details assets/BD-03.png",
    filterTags: ["All", "Embedded Systems", "IOT Devices"],
  },
  {
    id: 5,
    category: "PCB Design",
    date: "March 12, 2026",
    title: "Stack-Up Choices For 3-Layer Sense Boards",
    desc: "How we choose copper weight, spacing, and shielding for a sensitive ground track.",
    author: "Innosino Team",
    readTime: "5 min",
    img: "/homepage_assets/featured_project_images/white_moontype.png",
    filterTags: ["All", "PCB Design", "Featured Blogs"],
  },
  {
    id: 6,
    category: "Firmware",
    date: "March 12, 2026",
    title: "Debugging Cross-Talk In Dense Capacitive Arrays",
    desc: "A practical walk-through of adaptive baseline filtering for closely packed touch zones.",
    author: "Innosino Team",
    readTime: "6 min",
    img: "/blog_details assets/BD-02.png",
    filterTags: ["All", "Firmware", "Embedded Systems"],
  },
  {
    id: 7,
    category: "Firmware",
    date: "March 12, 2026",
    title: "Debugging Cross-Talk In Dense Capacitive Arrays",
    desc: "A practical walk-through of adaptive baseline filtering for closely packed touch zones.",
    author: "Innosino Team",
    readTime: "6 min",
    img: "/blog_details assets/BD-02.png",
    filterTags: ["All", "Firmware", "Embedded Systems"],
  },
  {
    id: 8,
    category: "Embedded Systems",
    date: "March 12, 2026",
    title: "Getting BLE MIDI Latency Under 10ms",
    desc: "Notes from tuning connection intervals and packet scheduling for live performance use.",
    author: "Innosino Team",
    readTime: "7 min",
    img: "/blog_details assets/BD-03.png",
    filterTags: ["All", "Embedded Systems", "IOT Devices"],
  },
  {
    id: 9,
    category: "PCB Design",
    date: "March 12, 2026",
    title: "Stack-Up Choices For 3-Layer Sense Boards",
    desc: "How we choose copper weight, spacing, and shielding for a sensitive ground track.",
    author: "Innosino Team",
    readTime: "5 min",
    img: "/homepage_assets/featured_project_images/white_moontype.png",
    filterTags: ["All", "PCB Design", "Featured Blogs"],
  },
];
