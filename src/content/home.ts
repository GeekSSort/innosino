/** Copy for the home page (/) and the sections it composes. */

export const heroCopy = {
  titleLead: "WELCOME TO ",
  titleAccent: "INNOSINO",
  subtitle:
    "We turn ideas into high-performance, market ready products from concept to mass production.",
};

/** The three full-bleed animated frames. */
export const splashFrames = {
  coreServices: { title: "Core Services", loopSeconds: 3.283 },
  featuredProject: { title: "Featured Project", loopSeconds: 2.667 },
  industrySolutions: { title: "Industry Solutions", heading: "INDUSTRY SOLUTIONS", loopSeconds: 2.467 },
};

export interface ServiceMedia {
  id: string;
  videoSrc: string;
  posterSrc: string;
  webmSrc?: string;
  scrimOpacity: number;
  title: string;
  body: string;
}

/** The four story-scroll service cards, in the order the page shows them. */
export const serviceMedia: ServiceMedia[] = [
  {
    id: "embedded-system-design",
    videoSrc: "/homepage_assets/Embedded System Design.mp4",
    posterSrc: "/posters/homepage_assets/Embedded System Design.webp",
    scrimOpacity: 0.12,
    title: "Embedded System Design",
    body: "We build intelligent, energy-efficient embedded systems with seamless hardware-software integration, delivering reliable solutions tailored to your application.",
  },
  {
    id: "hardware-pcb-design",
    videoSrc: "/homepage_assets/Hardware and PCB Design.mp4",
    posterSrc: "/posters/homepage_assets/Hardware and PCB Design.webp",
    scrimOpacity: 0.12,
    title: "Hardware & PCB Design",
    body: "Hardware & PCB Design delivers reliable, high-performance circuits engineered for efficient, scalable, and robust electronic systems.",
  },
  {
    id: "product-development",
    videoSrc: "/homepage_assets/Product Development.mp4",
    posterSrc: "/posters/homepage_assets/Product Development.webp",
    scrimOpacity: 0.12,
    title: "Product Development",
    body: "Transforming innovative ideas into reliable, market-ready products through research, engineering, and advanced technology.",
  },
  {
    id: "industrial-automation",
    videoSrc: "/homepage_assets/Industrial Automation.mp4",
    posterSrc: "/posters/homepage_assets/Industrial Automation.webp",
    scrimOpacity: 0,
    title: "Industrial Automation",
    body: "Industrial Automation streamlines processes through intelligent control systems, enabling faster, more efficient, and highly reliable production.",
  },
];

export const featuredProjectsLede =
  "Discover some of our latest projects, built to solve real-world problems with smart technology and innovative ideas.";

export const industriesLede =
  "Discover the industries we serve with innovative technology and smart engineering solutions for real-world challenges.";

export interface ProjectStat {
  value: string;
  label: string;
}

export interface FeaturedProject {
  title: string;
  description: string;
  image: string;
  stats: ProjectStat[];
}

export const featuredProjects: FeaturedProject[] = [
  {
    title: "Smart Musical Instruments",
    description:
      "Engineered six intelligent instruments with AI, DSP, and embedded technologies, delivering real-time audio processing, wireless connectivity, and patent-ready innovations.",
    image: "/homepage_assets/featured_project_images/guitar.webp",
    stats: [{ value: "6+", label: "Smart Instruments Developed" }],
  },
  {
    title: "PolyPan Electronic Handpan",
    description:
      "An intelligent electronic handpan combining 9-zone touch sensing, gesture control, and wireless MIDI to deliver a modern, expressive musical experience powered by embedded technology.",
    image: "/homepage_assets/featured_project_images/white_moontype.webp",
    stats: [
      { value: "9", label: "Independent Touch Zones" },
      { value: "7", label: "Gesture Combinations" },
    ],
  },
  {
    title: "AI Sensor & Security Systems",
    description:
      "An AI-powered security system that uses advanced mmWave sensors to detect human presence, monitor occupancy in real time, and enable smart, camera-free access control for safer and more efficient spaces.",
    image: "/homepage_assets/featured_project_images/ai.webp",
    stats: [{ value: "$2.8B", label: "Addressable Market" }],
  },
  {
    title: "Logic IC Trainer Kit",
    description:
      "An interactive digital logic training kit that helps students learn logic circuits through hands-on experiments, real-time visualization, and WebSerial connectivity for a practical engineering learning experience.",
    image: "/homepage_assets/featured_project_images/blue and black image.webp",
    stats: [{ value: "16", label: "Logic IC Profiles" }],
  },
];
export interface IndustryItem {
  id: string;
  title: string;
  image: string;
}

export const industriesList: IndustryItem[] = [
  {
    id: "1",
    title: "Consumer Electronics",
    image: "/homepage_assets/industries/Consumer Electronics.webp",
  },
  {
    id: "2",
    title: "Renewable Energy",
    image: "/homepage_assets/industries/Renewable Energy.webp",
  },
  {
    id: "3",
    title: "Industrial Automation",
    image: "/homepage_assets/industries/Industrial Automation.webp",
  },
  {
    id: "4",
    title: "Smart IOT",
    image: "/homepage_assets/industries/Smart IOT.webp",
  },
  {
    id: "5",
    title: "Engineering Education",
    image: "/homepage_assets/industries/Engineering Education.webp",
  },
  {
    id: "6",
    title: "Digital Musical Instruments",
    image: "/homepage_assets/industries/Digital Musical Instruments.webp",
  },
  {
    id: "7",
    title: "Biomedical Electronics",
    image: "/homepage_assets/industries/Biomedical Electronics.webp",
  },
  {
    id: "8",
    title: "NFC and RFID Technology",
    image: "/homepage_assets/industries/NFC and RFID Technology.webp",
  },
  {
    id: "9",
    title: "Wireless Communication",
    image: "/homepage_assets/industries/Wireless Communication.webp",
  },
];
