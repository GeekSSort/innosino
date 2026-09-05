"use client";

import React, { useState } from "react";
import BackgroundVideo from "@/components/common/BackgroundVideo";
import Image from "next/image";
import Link from "next/link";
import FloatingNavbar from "@/components/navigation/FloatingNavbar";
import { chatWidget, copyright, ctaBanner, footerLinks } from "@/content/site";
import JsonLd from "@/components/seo/JsonLd";
import { breadcrumbSchema } from "@/content/schema";
import { blogsHero, categories } from "@/content/blogs";
import {
  featuredPost,
  formatPostDate,
  postAuthor,
  postAuthorInitials,
  readTime,
  sortedPosts,
} from "@/content/posts";

/** The grid holds nine; the rest paginate. */
const PER_PAGE = 9;

export default function BlogsPage() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [chatOpen, setChatOpen] = useState(true);


  const featured = featuredPost();

  /* The featured card above the grid is the newest post, so the grid skips it
     rather than showing the same article twice on one screen. */
  const filteredBlogs = sortedPosts().filter((post) => {
    if (post.slug === featured.slug) return false;
    const matchesCategory =
      selectedCategory === "All" || post.filterTags.includes(selectedCategory);
    const query = searchQuery.toLowerCase();
    const matchesSearch =
      post.title.toLowerCase().includes(query) ||
      post.excerpt.toLowerCase().includes(query) ||
      post.category.toLowerCase().includes(query);
    return matchesCategory && matchesSearch;
  });

  /* Clamped rather than reset: a filter that shortens the list past the
     current page would otherwise leave the grid empty with no way back. */
  const pageCount = Math.max(1, Math.ceil(filteredBlogs.length / PER_PAGE));
  const page = Math.min(currentPage, pageCount);
  const pageBlogs = filteredBlogs.slice((page - 1) * PER_PAGE, page * PER_PAGE);


  return (
    <main className="blog-page">
      {/* =====================================================================
          SECTION 1: HERO & FEATURED BLOG CARD
          The featured card is the hero's last flow child and hangs into the
          white band below it by --page-hero-hang.
          ===================================================================== */}
      <section className="page-hero">
        <div className="section-media">
          <BackgroundVideo
            src="/about_us/About Us Hero Section.mp4"
            poster="/posters/about_us/About Us Hero Section.webp"
            loading="eager"
          />
          <div
            className="section-media__scrim"
            style={{ backgroundColor: "rgba(0, 0, 0, 0.60)" }}
          />
        </div>

        <div className="container page-hero__inner">
          <div className="page-hero__head">
            <Link href="/" aria-label="INNOSINO home" className="brand-logo-link">
              <Image
                src="/about_us/IS-Logo.webp"
                alt="INNOSINO"
                width={340}
                height={128}
                className="brand-logo"
                preload
              />
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
                <span className="breadcrumb__link">{blogsHero.breadcrumb}</span>
              </div>

              <h1 className="page-hero__title">{blogsHero.title}</h1>

              <p className="page-hero__sub">{blogsHero.sub}</p>
            </div>
          </div>

          {/* Header pill — in the hero's flow, then floats once it scrolls
              away (same behaviour as the projects page). */}
          <FloatingNavbar variant="inline" />

          {/* Overlapping Featured Blog Card */}
          <div className="pj-featured">
            <div className="pj-featured__body">
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "clamp(0.875rem, 1.4vw, 20px)",
                }}
              >
                <div className="blog-card__meta">
                  <span
                    style={{ display: "flex", alignItems: "center", gap: "8px" }}
                  >
                    <span aria-hidden="true">✦</span>
                    <span>Featured Blog</span>
                  </span>
                  <span className="blog-card__date">{formatPostDate(featured.date)}</span>
                </div>

                <h2
                  className="pj-featured__title"
                  style={{ lineHeight: 1.25 }}
                >
                  {featured.title}
                </h2>

                <p className="pj-featured__desc">{featured.excerpt}</p>

                <div className="blog-byline" style={{ marginBlockStart: "4px" }}>
                  <span className="blog-byline__avatar">{postAuthorInitials}</span>
                  <span>
                    <span className="blog-byline__name">{postAuthor}</span>
                    <span className="blog-byline__time">{readTime(featured)}</span>
                  </span>
                </div>
              </div>

              <Link href={`/blogs/${featured.slug}`} className="pj-featured__cta">
                <span>Know Details</span>
                <span style={{ fontSize: "0.8em" }} aria-hidden="true">
                  ↗
                </span>
              </Link>
            </div>

            <div className="pj-featured__media" style={{ backgroundColor: "#0B0B0B" }}>
              <Image
                src={featured.image}
                alt={featured.title}
                fill
                sizes="(max-width: 899px) 100vw, 434px"
                style={{ objectFit: "cover" }}
                preload
              />
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================================
          SECTION 2: RESOURCES & INSIGHTS
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
            RESOURCES &amp; <span style={{ color: "#FF7018" }}>INSIGHTS</span>
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
                placeholder="Search Blog"
                aria-label="Search blogs"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            {categories.map((cat) => (
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

          {/* Blog grid */}
          <div className="pj-grid">
            {pageBlogs.map((post) => (
              <Link
                key={post.slug}
                href={`/blogs/${post.slug}`}
                className="blog-card"
              >
                <div className="blog-card__media">
                  <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    sizes="(max-width: 599px) 100vw, (max-width: 1023px) 50vw, 374px"
                    style={{ objectFit: "cover" }}
                  />
                </div>

                <div className="blog-card__meta">
                  <span>{post.category}</span>
                  <span className="blog-card__date">
                    {formatPostDate(post.date)}
                  </span>
                </div>

                <h3 className="blog-card__title">{post.title}</h3>

                <p className="blog-card__desc">{post.excerpt}</p>

                <div className="blog-byline">
                  <span className="blog-byline__avatar">{postAuthorInitials}</span>
                  <span>
                    <span className="blog-byline__name">{postAuthor}</span>
                    <span className="blog-byline__time">{readTime(post)}</span>
                  </span>
                </div>
              </Link>
            ))}
          </div>

          {/* Pagination — page numbers come from the filtered count, so the
              row cannot offer a page the grid has nothing for. */}
          {pageCount > 1 && (
            <div className="pj-pagination">
              <button
                type="button"
                className="pj-page-button pj-page-button--step"
                aria-label="Previous page"
                disabled={page === 1}
                onClick={() => setCurrentPage(Math.max(1, page - 1))}
              >
                &lt;
              </button>

              {Array.from({ length: pageCount }, (_, i) => i + 1).map((num) => (
                <button
                  key={num}
                  type="button"
                  className="pj-page-button"
                  aria-current={page === num ? "page" : undefined}
                  onClick={() => setCurrentPage(num)}
                >
                  {num}
                </button>
              ))}

              <button
                type="button"
                className="pj-page-button pj-page-button--step"
                aria-label="Next page"
                disabled={page === pageCount}
                onClick={() => setCurrentPage(Math.min(pageCount, page + 1))}
              >
                &gt;
              </button>
            </div>
          )}
        </div>
      </section>

      {/* =====================================================================
          SECTION 3: CTA CARD BANNER
          ===================================================================== */}
      <section className="flow-section" style={{ backgroundColor: "#FFFFFF" }}>
        <div className="container">
          <div className="cta-banner cta-banner--compact">
            <h2 className="cta-banner__title">{ctaBanner.title}</h2>

            <p className="cta-banner__body">{ctaBanner.body}</p>

            <Link href={ctaBanner.action.href} className="cta-banner__button">
              <span>{ctaBanner.action.label}</span>
              <span style={{ fontSize: "0.75em" }} aria-hidden="true">
                ↗
              </span>
            </Link>
          </div>
        </div>
      </section>

      {/* =====================================================================
          SECTION 4: FOOTER & CHAT
          ===================================================================== */}
      <footer
        className="flow-section"
        style={{ backgroundColor: "#000000", paddingBlockStart: 0 }}
      >
        <div className="container">
          <div
            className="chat-dock"
            style={{ marginBlockEnd: "clamp(1.5rem, 3vw, 2.5rem)" }}
          >
            {chatOpen && (
              <div className="chat-dock__bubble">
                <p
                  style={{
                    margin: 0,
                    fontSize: "var(--fs-small)",
                    fontWeight: 400,
                    lineHeight: 1.2,
                    color: "#666666",
                  }}
                >
                  {chatWidget.greeting}
                </p>
                <button
                  type="button"
                  onClick={() => setChatOpen(false)}
                  style={{
                    background: "none",
                    border: "none",
                    padding: "2px",
                    cursor: "pointer",
                    display: "flex",
                    flexShrink: 0,
                  }}
                  aria-label={chatWidget.closeLabel}
                >
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 14 14"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M3.5 3.5L10.5 10.5M10.5 3.5L3.5 10.5"
                      stroke="#888888"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                    />
                  </svg>
                </button>
              </div>
            )}

            <button
              type="button"
              onClick={() => setChatOpen(!chatOpen)}
              className="chat-dock__toggle"
              aria-label={chatWidget.toggleLabel}
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M20 2H4C2.9 2 2 2.9 2 4V22L6 18H20C21.1 18 22 17.1 22 16V4C22 2.9 21.1 2 20 2Z"
                  fill="#000000"
                />
                <rect x="6" y="7" width="12" height="2" rx="1" fill="#FF6A00" />
                <rect x="6" y="11" width="8" height="2" rx="1" fill="#FF6A00" />
              </svg>
            </button>
          </div>

          <div className="footer-bar">
            <p
              style={{
                margin: 0,
                fontSize: "var(--fs-small)",
                fontWeight: 400,
                color: "rgba(255, 255, 255, 0.8)",
              }}
            >
              {copyright}
            </p>

            <div className="footer-bar__links">
              {footerLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  style={{
                    fontSize: "var(--fs-body)",
                    fontWeight: 500,
                    color: "#FFFFFF",
                    textDecoration: "none",
                    whiteSpace: "nowrap",
                  }}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </footer>
      <JsonLd
        data={breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Blog", path: "/blogs" },
        ])}
      />

    </main>
  );
}
