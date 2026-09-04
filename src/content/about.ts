/** Copy for the About page (/about). */

export const aboutHero = {
  breadcrumb: "ABOUT US",
  title:
    "We are an innovation-driven engineering company that transforms ideas into high-performance, market-ready products across embedded systems, electronics, smart energy, and industrial technologies.",
};

export const founderQuote = {
  text: "With over 20 years in electronics R&D, INNOSINO is built on a passion for true problem-solving and innovation. We identify problems, learn deeply, and engineer better solutions from the ground up. Our goal is to empower inventors and entrepreneurs to turn ideas into real, manufacturable, and impactful products.",
  name: "Shah Jaman",
  role: "Founder & CEO",
};

export const visionMission = {
  vision: {
    label: "VISION",
    desc: "To become a globally trusted innovation partner the team companies call when an idea needs to become a real, working product.",
  },
  mission: {
    label: "MISSION",
    desc: "We transform ideas into products, deliver engineering solutions, bridge R&D and manufacturing, and build lasting partnerships.",
  },
  figure: {
    src: "/about_us/imageundervisionmission.png",
    alt: "Innosino Building Architecture",
  },
};

export interface DriveCard {
  title: string;
  desc: string;
}

export const driveCards: DriveCard[] = [
  {
    title: "Precision first",
    desc: "Every trace and line of firmware is engineered with precision for reliable, production-ready performance.",
  },
  {
    title: "Built to ship",
    desc: "We design for manufacturing from day one, not as an afterthought once the prototype works.",
  },
  {
    title: "Honest partnership",
    desc: "Clear timelines, clear costs, and direct answers even when the answer is not yet.",
  },
  {
    title: "Relentless iteration",
    desc: "We treat every revision as a chance to make the product faster, cheaper, or more reliable.",
  },
];

export interface Testimonial {
  quote: string;
  author: string;
  role: string;
  avatar: string;
}

export const testimonials: Testimonial[] = [
  {
    quote:
      "“Working with this team was a game changer they truly understood our vision, solved key challenges, and delivered a production-ready solution on time.”",
    author: "Arif Rahman",
    role: "Founder & CEO, NexaTech Labs",
    avatar: "/homepage_assets/featured_project_images/white_moontype.png",
  },
  {
    quote:
      "“They brought deep technical expertise and a practical approach helping us move from idea to production faster than expected.”",
    author: "Tanvir Hossain",
    role: "CTO, VoltEdge Systems",
    avatar: "/homepage_assets/featured_project_images/guitar.png",
  },
  {
    quote:
      "“A reliable partner who understands both engineering and business delivering quality without compromise.”",
    author: "Nusrat Karim",
    role: "Co-Founder, Nexlify Tech",
    avatar: "/homepage_assets/featured_project_images/ai.png",
  },
  {
    quote:
      "“Strong communication, fast execution, and production ready outcomes exactly what we needed.”",
    author: "Fahim Rahman",
    role: "Founder, IoTWorks",
    avatar: "/homepage_assets/featured_project_images/blue and black image.png",
  },
];

export interface Stat {
  title: string;
  number: string;
  desc: string;
}

export const stats: Stat[] = [
  {
    title: "Innovations Delivered",
    number: "15+",
    desc: "Turning bold ideas into real-world engineering solutions.",
  },
  {
    title: "Industry Sectors",
    number: "4",
    desc: "Delivering embedded solutions across diverse industries.",
  },
  {
    title: "Patents Filed",
    number: "2",
    desc: "Advancing innovation through proprietary technologies.",
  },
  {
    title: "Strategic Partnerships",
    number: "50",
    desc: "Collaborating with innovators to build the future.",
  },
];

/** Section headings, kept here so the page file carries no prose at all. */
export const aboutHeadings = {
  drives: { lead: "What Drives ", accent: "Us" },
  testimonials: { lead: "WHAT OUR CLIENTS ", accent: "SAY" },
  results: { lead: "DRIVING INNOVATION THROUGH ", accent: "RESULTS" },
};
