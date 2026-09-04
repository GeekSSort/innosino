/** Copy for the Expertise page (/expertise). */

export interface Item {
  title: string;
  desc: string;
}

export interface Stage {
  stage: string;
  title: string;
  desc: string;
}

export const expertiseHero = {
  breadcrumb: "Expertise",
  title: "OUR EXPERTISE",
  sub: "End-to-end embedded hardware development from system architecture and PCB design to firmware development, testing, and manufacturing handoff delivered through a unified, reliable, and efficient engineering toolchain.",
};

export const expertiseHeadings = {
  why: { lead: "WHY IS INNOSINO THE RIGHT HARDWARE & PCB DESIGN ", accent: "PARTNER?" },
  tools: { lead: "TOOLS & ", accent: "TECHNOLOGIES" },
  process: { lead: "OUR HARDWARE & PCB DESIGN ", accent: "PROCESS" },
};

export const featureCards: Item[] = [
  {
    title: "Embedded Firmware",
    desc: "C/C++ on bare-metal and RTOS targets.",
  },
  {
    title: "Schematic & PCB Design",
    desc: "Multi-layer boards built for signal integrity.",
  },
  {
    title: "Signal Processing",
    desc: "Real-time DSP for audio and sensor data.",
  },
  {
    title: "Wireless Connectivity",
    desc: "BLE and WebSerial links tuned for low latency.",
  },
  {
    title: "Embedded UI & Graphics",
    desc: "Interfaces for constrained hardware.",
  },
  {
    title: "Sensor Integration",
    desc: "Capacitive, mmWave, and inductive sensing.",
  },
];

export const toolsAndTech: Item[] = [
  {
    title: "Altium Designer",
    desc: "Schematic capture · PCB layout",
  },
  {
    title: "STM32 · ARM Cortex-M",
    desc: "Primary MCU family",
  },
  {
    title: "FreeRTOS",
    desc: "Real-time task scheduling",
  },
  {
    title: "Relentless iteration",
    desc: "Embedded graphics & UI",
  },
  {
    title: "LVGL",
    desc: "Embedded graphics & UI",
  },
  {
    title: "C / C++",
    desc: "Application & driver layer",
  },
];

export const processStagesRow1: Stage[] = [
  {
    stage: "Stage 01",
    title: "Requirements & Schematic",
    desc: "We lock the electrical requirements, select components against cost and availability, and produce a reviewed schematic.",
  },
  {
    stage: "Stage 02",
    title: "Layout & Routing",
    desc: "Stack-up, placement, and routing with impedance, thermal, and EMI considerations built into the layout itself.",
  },
  {
    stage: "Stage 03",
    title: "Prototype Fabrication",
    desc: "Fast-turn boards are fabricated and assembled so the design meets hardware before it meets a customer.",
  },
];

export const processStagesRow2: Stage[] = [
  {
    stage: "Stage 04",
    title: "Bring-up & Testing",
    desc: "We power on with current-limited supplies, validate each power rail, flash test firmware, and run functional diagnostics.",
  },
  {
    stage: "Stage 05",
    title: "DFM Review & Production Handoff",
    desc: "A final manufacturability pass, then a documentation package your contract manufacturer can build from directly.",
  },
];
