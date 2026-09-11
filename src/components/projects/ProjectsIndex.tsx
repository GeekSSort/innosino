"use client";

import React, { useState } from "react";
import BrandLogo from "@/components/navigation/BrandLogo";
import BackgroundVideo from "@/components/common/BackgroundVideo";
import Image from "next/image";
import Link from "next/link";
import FloatingNavbar from "@/components/navigation/FloatingNavbar";
import SiteFooter from "@/components/common/SiteFooter";
import JsonLd from "@/components/seo/JsonLd";
import { breadcrumbSchema } from "@/content/schema";
import type {
  Project,
  ProjectsPageData,
  SiteSettings,
} from "@/sanity/queries";

export interface ProjectsIndexProps {
  page: ProjectsPageData;
  projects: Project[];
  /** The project flagged as featured, if any. */
  featured?: Project;
  settings: SiteSettings;
}

export default function ProjectsIndex({
  page,
  projects,
  featured,
  settings,
}: ProjectsIndexProps) {
  /*
   * Only pills at least one project answers to. The Studio list is the order,
   * not the truth: it carried "Industrial Automation" while no project was
   * tagged with it, so that pill filtered the grid down to nothing.
   */
  const present = new Set(projects.flatMap((p) => p.filterTags));
  const pills = ["All", ...page.categories.filter((c) => present.has(c))];

  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);


  // Filter projects
  const filteredProjects = projects.filter((p) => {
    const matchesCategory =
      selectedCategory === "All" || p.filterTags.includes(selectedCategory);
    const matchesSearch =
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.category.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <main className="pj-page">
      {/* =====================================================================
          SECTION 1: HERO & FEATURED PROJECT CARD (Node 1498:14883)
          The featured card is the hero's last flow child and hangs into the
          white band below it by --page-hero-hang.
          ===================================================================== */}
      <section className="page-hero">
        <div className="section-media">
          <BackgroundVideo
            src="/project_page/Project Page-Hero Section.mp4"
            poster="/posters/project_page/Project Page-Hero Section.webp"
            loading="eager"
          />
          <div
            className="section-media__scrim"
            style={{ backgroundColor: "rgba(0, 0, 0, 0.55)" }}
          />
        </div>

        <div className="container page-hero__inner">
          <div className="page-hero__head">
            <Link href="/" aria-label="INNOSINO home" className="brand-logo-link">
              <BrandLogo />
            </Link>

            <div className="page-hero__copy">
              <div className="breadcrumb">
                <svg
                  className="breadcrumb__mark"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                >
                  <path
                    d="M12 0.6C12 6.9 17.1 12 23.4 12C17.1 12 12 17.1 12 23.4C12 17.1 6.9 12 0.6 12C6.9 12 12 6.9 12 0.6Z"
                    fill="#FF7018"
                  />
                </svg>
                <Link href="/" className="breadcrumb__link">
                  HOME
                </Link>
                <span className="breadcrumb__link" aria-hidden="true">
                  ›
                </span>
                <span className="breadcrumb__link">{page.hero.breadcrumb}</span>
              </div>

              <h1 className="page-hero__title">{page.hero.titleLead}{page.hero.titleAccent}</h1>

              <p className="page-hero__sub">{page.hero.sub}</p>
            </div>
          </div>

          {/* Header pill — composed in the hero's flow, then floats once it
              scrolls away (same behaviour as the contact page). */}
          <FloatingNavbar variant="inline" />

          {/* Overlapping Featured Project Card (Node 1498:14883) */}
          <div className="pj-featured">
            <div className="pj-featured__body">
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "clamp(1rem, 1.7vw, 24px)",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "clamp(0.75rem, 1.1vw, 16px)",
                  }}
                >
                  <span className="pj-featured__eyebrow">
                    <span aria-hidden="true">✦</span>
                    <span>{page.featuredEyebrow}</span>
                  </span>

                  <h2 className="pj-featured__title">{featured?.title}</h2>
                </div>

                <p className="pj-featured__desc">{featured?.description}</p>

                <span className="pj-badge">
                  <span style={{ color: "#FF7018" }} aria-hidden="true">
                    ⚡
                  </span>
                  <span>{featured?.featuredBadge}</span>
                </span>
              </div>

              <Link href={`/projects/details`} className="pj-featured__cta">
                <span>{"Know Details"}</span>
                <span style={{ fontSize: "0.8em" }} aria-hidden="true">
                  ↗
                </span>
              </Link>
            </div>

            <div className="pj-featured__media">
              <Image
                src={featured?.image ?? ""}
                alt={featured?.title ?? ""}
                fill
                sizes="(max-width: 899px) 100vw, 434px"
                style={{ objectFit: "cover" }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================================
          SECTION 2: OUR RECENT PROJECTS (Filters, Grid, Pagination)
          ===================================================================== */}
      <section
        className="hero-follow"
        style={{ paddingBlockEnd: "clamp(3rem, 6.9vw, 80px)" }}
      >
        <div
          className="container"
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "clamp(1.5rem, 2.8vw, 40px)",
          }}
        >
          <h2
            className="section-heading"
            style={{
              color: "#000000",
              fontSize: "clamp(1.75rem, 1.1rem + 2.2vw, 3rem)",
            }}
          >
            {page.recentHeading.lead}
            <span style={{ color: "#FF7018" }}>
              {page.recentHeading.accent}
            </span>
          </h2>

          {/* Filter pills & search */}
          <div className="pj-filters">
            <div className="pj-search">
              <span
                style={{ fontSize: "14px", color: "#888", marginRight: "8px" }}
                aria-hidden="true"
              >
                🔍
              </span>
              <input
                type="text"
                className="pj-search__input"
                placeholder="Search Project"
                aria-label="Search projects"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            {pills.map((cat) => (
              <button
                key={cat}
                type="button"
                className="pj-pill"
                aria-pressed={selectedCategory === cat}
                onClick={() => setSelectedCategory(cat)}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Project grid */}
          <div className="pj-grid">
            {filteredProjects.map((project, idx) => (
              <article key={idx} className="pj-card">
                <div className="pj-card__media">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    sizes="(max-width: 599px) 100vw, (max-width: 1023px) 50vw, 374px"
                    style={{ objectFit: "cover" }}
                  />
                </div>

                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "6px",
                  }}
                >
                  <span className="pj-card__category">{project.category}</span>
                  <h3 className="pj-card__title">{project.title}</h3>
                  <p className="pj-card__desc">{project.description}</p>
                </div>
              </article>
            ))}
          </div>

          {/* Pagination */}
          <div className="pj-pagination">
            <button
              type="button"
              className="pj-page-button pj-page-button--step"
              aria-label="Previous page"
              onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
            >
              &lt;
            </button>

            {[1, 2, 3, 4, 5, 10].map((num) => (
              <button
                key={num}
                type="button"
                className="pj-page-button"
                aria-current={currentPage === num ? "page" : undefined}
                onClick={() => setCurrentPage(num)}
              >
                {num}
              </button>
            ))}

            <button
              type="button"
              className="pj-page-button pj-page-button--step"
              aria-label="Next page"
              onClick={() => setCurrentPage(currentPage + 1)}
            >
              &gt;
            </button>
          </div>
        </div>
      </section>

      {/* =====================================================================
          SECTION 3: CTA CARD BANNER
          ===================================================================== */}
      <section className="flow-section" style={{ backgroundColor: "#FFFFFF" }}>
        <div className="container">
          <div className="cta-banner cta-banner--compact">
            <h2 className="cta-banner__title">{settings.ctaBanner.title}</h2>

            <p className="cta-banner__body">{settings.ctaBanner.body}</p>

            <Link href={settings.ctaBanner.action.href} className="cta-banner__button">
              <span>{settings.ctaBanner.action.label}</span>
              <span style={{ fontSize: "0.75em" }} aria-hidden="true">
                ↗
              </span>
            </Link>
          </div>
        </div>
      </section>

      {/* =====================================================================
          SECTION 4: FOOTER & INTERACTIVE CHAT WIDGET
          ===================================================================== */}
      <SiteFooter settings={settings} />
      <JsonLd
        data={breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Projects", path: "/projects" },
        ])}
      />

    </main>
  );
}
