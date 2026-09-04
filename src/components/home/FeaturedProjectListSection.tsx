"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";

// Sparkle Icon matching Figma node 1498:14140 / 1498:14163 (color: #D65900)
function SparkleIcon() {
  return (
    <svg
      width="20"
      height="23"
      viewBox="0 0 20 23"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ display: "block", flexShrink: 0 }}
      aria-hidden="true"
    >
      <path
        d="M10 0.6C10 6.5 14.5 11 19.786 11C14.5 11 10 15.5 10 23.4C10 15.5 5.5 11 0.214 11C5.5 11 10 6.5 10 0.6Z"
        fill="#D65900"
      />
    </svg>
  );
}

function ArrowUpRightIcon({ color = "#FFFFFF" }: { color?: string }) {
  return (
    <svg
      width="12"
      height="12"
      viewBox="0 0 12 12"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ display: "block", flexShrink: 0 }}
      aria-hidden="true"
    >
      <path
        d="M2.5 9.5L9.5 2.5M9.5 2.5H4M9.5 2.5V8"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

interface ProjectStat {
  value: string;
  label: string;
}

interface FeaturedProject {
  title: string;
  description: string;
  image: string;
  stats: ProjectStat[];
}

const featuredProjects: FeaturedProject[] = [
  {
    title: "Smart Musical Instruments",
    description:
      "Engineered six intelligent instruments with AI, DSP, and embedded technologies, delivering real-time audio processing, wireless connectivity, and patent-ready innovations.",
    image: "/homepage_assets/featured_project_images/guitar.png",
    stats: [{ value: "6+", label: "Smart Instruments Developed" }],
  },
  {
    title: "PolyPan Electronic Handpan",
    description:
      "An intelligent electronic handpan combining 9-zone touch sensing, gesture control, and wireless MIDI to deliver a modern, expressive musical experience powered by embedded technology.",
    image: "/homepage_assets/featured_project_images/white_moontype.png",
    stats: [
      { value: "9", label: "Independent Touch Zones" },
      { value: "7", label: "Gesture Combinations" },
    ],
  },
  {
    title: "AI Sensor & Security Systems",
    description:
      "An AI-powered security system that uses advanced mmWave sensors to detect human presence, monitor occupancy in real time, and enable smart, camera-free access control for safer and more efficient spaces.",
    image: "/homepage_assets/featured_project_images/ai.png",
    stats: [{ value: "$2.8B", label: "Addressable Market" }],
  },
  {
    title: "Logic IC Trainer Kit",
    description:
      "An interactive digital logic training kit that helps students learn logic circuits through hands-on experiments, real-time visualization, and WebSerial connectivity for a practical engineering learning experience.",
    image: "/homepage_assets/featured_project_images/blue and black image.png",
    stats: [{ value: "16", label: "Logic IC Profiles" }],
  },
];

/**
 * View 8 — the stacking "Featured Project" cards.
 *
 * Each card is `position: sticky` so later cards slide over earlier ones,
 * leaving a 20px sliver of each previous card visible. The sticky offset is
 * derived from the card index instead of being hand-written per card, and the
 * stack degrades to a plain vertical list below 900px (see `.stack-card` in
 * globals.css) where there is not enough viewport height for it to read.
 */
export default function FeaturedProjectListSection() {
  return (
    <section className="flow-section" style={{
        backgroundColor: "#FFBE03",
        paddingBottom: "clamp(3rem, 9.2vw, 132px)",
      }}>
      <div className="container">
        <h2 className="section-lede" style={{ color: "#000000" }}>
          Discover some of our latest projects, built to solve real-world
          problems with smart technology and innovative ideas.
        </h2>

        <div className="stack" style={{ marginTop: "clamp(2rem, 3.9vw, 3.5rem)" }}>
          {featuredProjects.map((project, index) => (
            <article
              key={project.title}
              className="stack-card"
              style={
                {
                  "--stack-top": `calc(var(--stack-base) + ${index * 20}px)`,
                  zIndex: index + 1,
                } as React.CSSProperties
              }
            >
              <div className="stack-card__body">
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "10px",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "10px",
                    }}
                  >
                    <SparkleIcon />
                    <span
                      style={{
                        fontSize: "var(--fs-body)",
                        fontWeight: 600,
                        lineHeight: 1.5,
                        color: "#D65900",
                      }}
                    >
                      Featured Project
                    </span>
                  </div>

                  <h3
                    style={{
                      margin: 0,
                      fontSize: "var(--fs-h3)",
                      fontWeight: 600,
                      lineHeight: 1.2,
                      color: "#000000",
                      textWrap: "balance",
                    }}
                  >
                    {project.title}
                  </h3>

                  <p
                    style={{
                      margin: 0,
                      fontSize: "var(--fs-body)",
                      fontWeight: 500,
                      lineHeight: 1.5,
                      color: "#333333",
                    }}
                  >
                    {project.description}
                  </p>
                </div>

                <div
                  style={{
                    display: "flex",
                    flexWrap: "wrap",
                    gap: "12px",
                  }}
                >
                  {project.stats.map((stat) => (
                    <div
                      key={stat.label}
                      style={{
                        borderRadius: "8px",
                        backgroundColor: "rgba(255, 255, 255, 0.4)",
                        padding: "4px 16px",
                        display: "flex",
                        alignItems: "center",
                        gap: "8px",
                      }}
                    >
                      <span
                        style={{
                          fontSize: "var(--fs-h4)",
                          fontWeight: 600,
                          color: "#000000",
                        }}
                      >
                        {stat.value}
                      </span>
                      <span
                        style={{
                          fontSize: "var(--fs-small)",
                          fontWeight: 600,
                          color: "#333333",
                          textTransform: "uppercase",
                        }}
                      >
                        {stat.label}
                      </span>
                    </div>
                  ))}
                </div>

                <Link href="/projects/details" className="pill-button">
                  <span>Know Details</span>
                  <ArrowUpRightIcon />
                </Link>
              </div>

              <div className="stack-card__media">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  sizes="(max-width: 899px) 100vw, 476px"
                  style={{ objectFit: "cover" }}
                />
              </div>
            </article>
          ))}
        </div>

        <div
          style={{
            position: "relative",
            zIndex: 10,
            marginTop: "clamp(2.5rem, 4.4vw, 4rem)",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <button type="button" className="pill-button">
            <span>View All Projects</span>
            <ArrowUpRightIcon />
          </button>
        </div>
      </div>
    </section>
  );
}
