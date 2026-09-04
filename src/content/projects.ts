/** Copy for the projects index (/projects). */

export const projectsHero = {
  breadcrumb: "PROJECTS",
  title: "OUR PROJECTS",
  sub: "Explore the innovative solutions we've designed and developed across industries. Every project reflects our commitment to quality, precision, and solving real-world challenges through smart engineering.",
};

export const featuredProject = {
  eyebrow: "Featured Project",
  title: "Smart Musical Instruments",
  desc: "Engineered an intelligent musical instruments powered by AI, DSP, and embedded technologies, enabling real-time audio processing, ultra-low-latency wireless connectivity, intelligent gesture recognition, and patent-ready innovations for next-generation digital music experiences.",
  badge: "SMART INSTRUMENTS DEVELOPED",
  image: "/homepage_assets/featured_project_images/guitar.png",
  cta: { label: "Know Details", href: "/projects/details" },
};

export const projectsHeadings = {
  recent: { lead: "OUR RECENT ", accent: "PROJECTS" },
};

export interface ProjectCard {
  id: number;
  category: string;
  title: string;
  desc: string;
  img: string;
  filterTags: string[];
}

export const projectCategories: string[] = [
  "All",
  "Featured Projects",
  "Embedded Systems",
  "PCB Design",
  "IOT Devices",
  "Industrial Automation",
  "Smart Devices",
];

export const allProjects: ProjectCard[] = [
  {
    id: 1,
    category: "Smart Devices",
    title: "PolyPan Electronic Handpan",
    desc: "An intelligent electronic handpan combining 9-zone touch sensing, gesture control, and wireless MIDI for next-generation musicians.",
    img: "/homepage_assets/featured_project_images/white_moontype.png",
    filterTags: ["All", "Smart Devices", "Featured Projects"],
  },
  {
    id: 2,
    category: "Wireless Systems",
    title: "AI Sensor & Security Systems",
    desc: "An AI-powered security system that uses advanced mmWave sensors to detect human presence, monitor vitals, and ensure workplace safety.",
    img: "/homepage_assets/featured_project_images/ai.png",
    filterTags: ["All", "Embedded Systems", "IOT Devices"],
  },
  {
    id: 3,
    category: "Smart Devices",
    title: "Logic IC Trainer Kit",
    desc: "An interactive digital logic training kit that helps students learn logic circuits through hands-on experimentation and fault analysis.",
    img: "/homepage_assets/featured_project_images/blue and black image.png",
    filterTags: ["All", "PCB Design", "Smart Devices"],
  },
  {
    id: 4,
    category: "Smart Devices",
    title: "Logic IC Trainer Kit",
    desc: "An interactive digital logic training kit that helps students learn logic circuits through hands-on experimentation and fault analysis.",
    img: "/homepage_assets/featured_project_images/blue and black image.png",
    filterTags: ["All", "PCB Design", "Smart Devices"],
  },
  {
    id: 5,
    category: "Smart Devices",
    title: "PolyPan Electronic Handpan",
    desc: "An intelligent electronic handpan combining 9-zone touch sensing, gesture control, and wireless MIDI for next-generation musicians.",
    img: "/homepage_assets/featured_project_images/white_moontype.png",
    filterTags: ["All", "Smart Devices", "Featured Projects"],
  },
  {
    id: 6,
    category: "Wireless Systems",
    title: "AI Sensor & Security Systems",
    desc: "An AI-powered security system that uses advanced mmWave sensors to detect human presence, monitor vitals, and ensure workplace safety.",
    img: "/homepage_assets/featured_project_images/ai.png",
    filterTags: ["All", "Embedded Systems", "IOT Devices"],
  },
  {
    id: 7,
    category: "Wireless Systems",
    title: "AI Sensor & Security Systems",
    desc: "An AI-powered security system that uses advanced mmWave sensors to detect human presence, monitor vitals, and ensure workplace safety.",
    img: "/homepage_assets/featured_project_images/ai.png",
    filterTags: ["All", "Embedded Systems", "IOT Devices"],
  },
  {
    id: 8,
    category: "Smart Devices",
    title: "Logic IC Trainer Kit",
    desc: "An interactive digital logic training kit that helps students learn logic circuits through hands-on experimentation and fault analysis.",
    img: "/homepage_assets/featured_project_images/blue and black image.png",
    filterTags: ["All", "PCB Design", "Smart Devices"],
  },
  {
    id: 9,
    category: "Smart Devices",
    title: "PolyPan Electronic Handpan",
    desc: "An intelligent electronic handpan combining 9-zone touch sensing, gesture control, and wireless MIDI for next-generation musicians.",
    img: "/homepage_assets/featured_project_images/white_moontype.png",
    filterTags: ["All", "Smart Devices", "Featured Projects"],
  },
];
