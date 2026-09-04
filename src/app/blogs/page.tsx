"use client";

import React, { useState } from "react";
import BackgroundVideo from "@/components/common/BackgroundVideo";
import Image from "next/image";
import Link from "next/link";
import FloatingNavbar from "@/components/navigation/FloatingNavbar";

const categories = [
  "All",
  "Featured Blogs",
  "Embedded Systems",
  "Firmware",
  "PCB Design",
  "IOT Devices",
  "Industrial Automation",
];

const allBlogs = [
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

export default function BlogsPage() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [chatOpen, setChatOpen] = useState(true);


  // Filter blogs
  const filteredBlogs = allBlogs.filter((b) => {
    const matchesCategory =
      selectedCategory === "All" || b.filterTags.includes(selectedCategory);
    const matchesSearch =
      b.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.desc.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.category.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });


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
                src="/about_us/IS-Logo.png"
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
                <span className="breadcrumb__link">BLOG</span>
              </div>

              <h1 className="page-hero__title">OUR LATEST BLOGS</h1>

              <p className="page-hero__sub">
                Stay updated with the latest industry trends, technical guides,
                engineering insights, project stories, and innovations that
                inspire smarter products and better technology solutions.
              </p>
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
                  <span className="blog-card__date">March 12, 2026</span>
                </div>

                <h2
                  className="pj-featured__title"
                  style={{ lineHeight: 1.25 }}
                >
                  Inside The Logic IC Trainer Kit&apos;s 16 Profiles
                </h2>

                <p className="pj-featured__desc">
                  Why we chose a profile-based architecture over hardcoded logic
                  families to improve flexibility, usability, maintainability,
                  and long-term adaptability across diverse applications.
                </p>

                <div className="blog-byline" style={{ marginBlockStart: "4px" }}>
                  <span className="blog-byline__avatar">IS</span>
                  <span>
                    <span className="blog-byline__name">Innosino Team</span>
                    <span className="blog-byline__time">8 min</span>
                  </span>
                </div>
              </div>

              <Link href="/blogs/details" className="pj-featured__cta">
                <span>Know Details</span>
                <span style={{ fontSize: "0.8em" }} aria-hidden="true">
                  ↗
                </span>
              </Link>
            </div>

            <div className="pj-featured__media" style={{ backgroundColor: "#0B0B0B" }}>
              <Image
                src="/blog_details assets/BD-01.png"
                alt="Inside The Logic IC Trainer Kit's 16 Profiles"
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
            {filteredBlogs.map((blog, idx) => (
              <Link key={idx} href="/blogs/details" className="blog-card">
                <div className="blog-card__media">
                  <Image
                    src={blog.img}
                    alt={blog.title}
                    fill
                    sizes="(max-width: 599px) 100vw, (max-width: 1023px) 50vw, 374px"
                    style={{
                      objectFit: blog.img.includes("white_moontype")
                        ? "contain"
                        : "cover",
                    }}
                  />
                </div>

                <div className="blog-card__meta">
                  <span>{blog.category}</span>
                  <span className="blog-card__date">{blog.date}</span>
                </div>

                <h3 className="blog-card__title">{blog.title}</h3>

                <p className="blog-card__desc">{blog.desc}</p>

                <div className="blog-byline">
                  <span className="blog-byline__avatar">IS</span>
                  <span>
                    <span className="blog-byline__name">{blog.author}</span>
                    <span className="blog-byline__time">{blog.readTime}</span>
                  </span>
                </div>
              </Link>
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
            <h2 className="cta-banner__title">
              HAVE AN IDEA? LET&apos;S ENGINEER IT INTO A PRODUCT.
            </h2>

            <p className="cta-banner__body">
              Tell us about your project: hardware, firmware, or both.
              We&apos;ll come back with a clear path from concept to production.
            </p>

            <Link href="/contact" className="cta-banner__button">
              <span>Book a Call</span>
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
                  Welcome to Innosino! Need help? Just reply to this
                  message&mdash;we&rsquo;re online and ready to assist you.
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
                  aria-label="Close chat bubble"
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
              aria-label="Toggle chat"
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
              © 2026 Innosion All Rights Reserved
            </p>

            <div className="footer-bar__links">
              {[
                { label: "Home", href: "/" },
                { label: "About Us", href: "/about" },
                { label: "Services", href: "/services" },
                { label: "Industries", href: "/#industries" },
                { label: "Blogs", href: "/blogs" },
                { label: "Privacy Policy", href: "/privacy-policy" },
                { label: "Terms & Condition", href: "#terms" },
                { label: "Contact Us", href: "/contact" },
              ].map((link) => (
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
    </main>
  );
}
