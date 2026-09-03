"use client";

import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

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

  const heroVideoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (heroVideoRef.current) {
      heroVideoRef.current.play().catch(() => {});
    }
  }, []);

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
    <main
      style={{
        position: "relative",
        width: "1440px",
        minHeight: "3757px",
        overflow: "hidden",
        backgroundColor: "#000000",
        margin: "0 auto",
      }}
    >
      {/* SECTION 1: HERO & FEATURED BLOG CARD OVERLAP */}
      <section
        style={{
          position: "relative",
          width: "1440px",
          height: "684px",
          backgroundColor: "#F1F1F1",
          overflow: "visible",
        }}
      >
        {/* Background Video using Contact page hero video */}
        <div
          style={{
            position: "absolute",
            left: 0,
            top: 0,
            width: "1440px",
            height: "684px",
            overflow: "hidden",
            pointerEvents: "none",
            zIndex: 1,
          }}
        >
          <video
            ref={heroVideoRef}
            autoPlay
            loop
            muted
            playsInline
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              display: "block",
            }}
          >
            <source
              src="/about_us/About Us Hero Section.mp4"
              type="video/mp4"
            />
          </video>
          <div
            style={{
              position: "absolute",
              inset: 0,
              backgroundColor: "rgba(0, 0, 0, 0.60)",
              pointerEvents: "none",
            }}
          />
        </div>

        {/* Logo */}
        <div
          style={{
            position: "absolute",
            left: "135px",
            top: "60px",
            width: "236px",
            height: "32px",
            zIndex: 20,
            display: "flex",
            alignItems: "center",
          }}
        >
          <Image
            src="/about_us/IS-Logo.png"
            alt="INNOSINO"
            width={236}
            height={32}
            style={{ objectFit: "contain", height: "32px", width: "auto" }}
            priority
          />
        </div>

        {/* Hero Title & Subtitle Frame */}
        <div
          style={{
            position: "absolute",
            left: "134px",
            top: "112px",
            width: "1171px",
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            gap: "16px",
            zIndex: 20,
          }}
        >
          {/* Breadcrumb: HOME > BLOG */}
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              gap: "10px",
              height: "24px",
            }}
          >
            <span style={{ fontSize: "14px", color: "#FF7018" }}>✦</span>
            <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
              <Link
                href="/"
                style={{
                  fontFamily: "'Urbanist', sans-serif",
                  fontSize: "16px",
                  fontWeight: 600,
                  color: "#FF7018",
                  textDecoration: "none",
                  textTransform: "uppercase",
                }}
              >
                HOME
              </Link>
              <span style={{ color: "#FF7018", fontSize: "14px" }}>&gt;</span>
              <span
                style={{
                  fontFamily: "'Urbanist', sans-serif",
                  fontSize: "16px",
                  fontWeight: 600,
                  color: "#FF7018",
                  textTransform: "uppercase",
                }}
              >
                BLOG
              </span>
            </div>
          </div>

          {/* Title: OUR LATEST BLOGS */}
          <h1
            style={{
              margin: 0,
              fontFamily: "'Cal Sans', 'Outfit', sans-serif",
              fontSize: "64px",
              fontWeight: 400,
              lineHeight: "1.1",
              color: "#FFFFFF",
              textTransform: "uppercase",
            }}
          >
            OUR LATEST BLOGS
          </h1>

          {/* Subtitle */}
          <p
            style={{
              margin: 0,
              width: "1171px",
              fontFamily: "'Urbanist', sans-serif",
              fontSize: "20px",
              fontWeight: 400,
              lineHeight: "150%",
              color: "#FFFFFF",
            }}
          >
            Stay updated with the latest industry trends, technical guides, engineering insights, project stories, and innovations that inspire smarter products and better technology solutions.
          </p>
        </div>

        {/* Floating Navbar */}
        <div style={{ position: "absolute", left: "134px", top: "401px", zIndex: 30 }}>
                  </div>

        {/* Overlapping Featured Blog Card */}
        <div
          style={{
            position: "absolute",
            left: "235px",
            top: "557px",
            width: "970px",
            height: "478px",
            borderRadius: "18px",
            backgroundColor: "#FFFFFF",
            boxShadow: "0 0 30px rgba(30, 30, 30, 0.10)",
            zIndex: 25,
            boxSizing: "border-box",
            padding: "36px",
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            overflow: "hidden",
          }}
        >
          {/* Left Column of Featured Card */}
          <div
            style={{
              width: "434px",
              height: "402px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
            }}
          >
            <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
              {/* Header: Tag + Date */}
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                  <span style={{ color: "#FF7018", fontSize: "14px" }}>✦</span>
                  <span
                    style={{
                      fontFamily: "'Urbanist', sans-serif",
                      fontSize: "16px",
                      fontWeight: 600,
                      color: "#FF7018",
                    }}
                  >
                    Featured Blog
                  </span>
                </div>
                <span
                  style={{
                    fontFamily: "'Urbanist', sans-serif",
                    fontSize: "14px",
                    fontWeight: 500,
                    color: "#888888",
                  }}
                >
                  March 12, 2026
                </span>
              </div>

              {/* Title */}
              <h2
                style={{
                  margin: 0,
                  fontFamily: "'Urbanist', sans-serif",
                  fontSize: "32px",
                  fontWeight: 700,
                  color: "#000000",
                  lineHeight: "1.25",
                }}
              >
                Inside The Logic IC Trainer Kit's 16 Profiles
              </h2>

              {/* Description */}
              <p
                style={{
                  margin: 0,
                  fontFamily: "'Urbanist', sans-serif",
                  fontSize: "15px",
                  fontWeight: 400,
                  lineHeight: "150%",
                  color: "#666666",
                }}
              >
                Why we chose a profile-based architecture over hardcoded logic families to improve flexibility, usability, maintainability, and long-term adaptability across diverse applications.
              </p>

              {/* Author & Read Time */}
              <div style={{ display: "flex", alignItems: "center", gap: "12px", marginTop: "4px" }}>
                <div
                  style={{
                    width: "32px",
                    height: "32px",
                    borderRadius: "50%",
                    backgroundColor: "#000000",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "#FF7018",
                    fontWeight: 700,
                    fontSize: "12px",
                    fontFamily: "'Urbanist', sans-serif",
                  }}
                >
                  IS
                </div>
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <span
                    style={{
                      fontFamily: "'Urbanist', sans-serif",
                      fontSize: "14px",
                      fontWeight: 700,
                      color: "#000000",
                    }}
                  >
                    Innosino Team
                  </span>
                  <span
                    style={{
                      fontFamily: "'Urbanist', sans-serif",
                      fontSize: "12px",
                      fontWeight: 500,
                      color: "#888888",
                    }}
                  >
                    8 min
                  </span>
                </div>
              </div>
            </div>

            {/* Know Details Button linking to /blogs/details */}
            <Link
              href="/blogs/details"
              style={{
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "6px",
                width: "136px",
                height: "40px",
                borderRadius: "100px",
                backgroundColor: "#000000",
                color: "#FFFFFF",
                fontFamily: "'Urbanist', sans-serif",
                fontSize: "14px",
                fontWeight: 600,
                textDecoration: "none",
              }}
            >
              <span>Know Details</span>
              <span style={{ fontSize: "11px" }}>↗</span>
            </Link>
          </div>

          {/* Right Column of Featured Card */}
          <div
            style={{
              width: "434px",
              height: "406px",
              borderRadius: "14px",
              overflow: "hidden",
              position: "relative",
              backgroundColor: "#0B0B0B",
            }}
          >
            <Image
              src="/blog_details assets/BD-01.png"
              alt="Inside The Logic IC Trainer Kit's 16 Profiles"
              fill
              style={{ objectFit: "cover" }}
              priority
            />
          </div>
        </div>
      </section>

      {/* SECTION 2: RESOURCES & INSIGHTS */}
      <section
        style={{
          position: "relative",
          width: "1440px",
          minHeight: "1800px",
          backgroundColor: "#FFFFFF",
          boxSizing: "border-box",
          paddingTop: "390px",
          paddingLeft: "135px",
          paddingRight: "135px",
          paddingBottom: "80px",
          display: "flex",
          flexDirection: "column",
          gap: "40px",
        }}
      >
        <h2
          style={{
            margin: 0,
            fontFamily: "'Cal Sans', 'Outfit', sans-serif",
            fontSize: "48px",
            fontWeight: 400,
            color: "#000000",
            textTransform: "uppercase",
          }}
        >
          RESOURCES & <span style={{ color: "#FF7018" }}>INSIGHTS</span>
        </h2>

        {/* Filter Row */}
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            gap: "12px",
            width: "1170px",
            overflowX: "auto",
            paddingBottom: "4px",
          }}
        >
          {/* Search Box */}
          <div
            style={{
              position: "relative",
              display: "flex",
              alignItems: "center",
              width: "180px",
              height: "42px",
              backgroundColor: "#EFEFEF",
              borderRadius: "100px",
              padding: "0 16px",
              boxSizing: "border-box",
              flexShrink: 0,
            }}
          >
            <span style={{ fontSize: "14px", color: "#888", marginRight: "8px" }}>🔍</span>
            <input
              type="text"
              placeholder="Search Project"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                width: "100%",
                border: "none",
                background: "none",
                fontFamily: "'Urbanist', sans-serif",
                fontSize: "14px",
                color: "#000",
                outline: "none",
              }}
            />
          </div>

          {/* Category Filter Pills */}
          {categories.map((cat) => {
            const isSelected = selectedCategory === cat;
            return (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                style={{
                  height: "42px",
                  padding: "0 20px",
                  borderRadius: "100px",
                  border: "none",
                  backgroundColor: isSelected ? "#FF7018" : "#EFEFEF",
                  color: isSelected ? "#FFFFFF" : "#333333",
                  fontFamily: "'Urbanist', sans-serif",
                  fontSize: "14px",
                  fontWeight: isSelected ? 600 : 500,
                  cursor: "pointer",
                  whiteSpace: "nowrap",
                  transition: "all 0.2s ease",
                  flexShrink: 0,
                }}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* 3x3 Blog Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "24px",
            width: "1170px",
            marginTop: "10px",
          }}
        >
          {filteredBlogs.map((blog, idx) => (
            <Link
              key={idx}
              href="/blogs/details"
              style={{
                width: "374px",
                height: "460px",
                display: "flex",
                flexDirection: "column",
                gap: "14px",
                boxSizing: "border-box",
                textDecoration: "none",
                color: "inherit",
              }}
            >
              <div
                style={{
                  width: "374px",
                  height: "240px",
                  borderRadius: "16px",
                  overflow: "hidden",
                  position: "relative",
                  backgroundColor: "#000000",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Image
                  src={blog.img}
                  alt={blog.title}
                  fill
                  style={{ objectFit: blog.img.includes("white_moontype") ? "contain" : "cover" }}
                />
              </div>

              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <span
                  style={{
                    fontFamily: "'Urbanist', sans-serif",
                    fontSize: "13px",
                    fontWeight: 600,
                    color: "#FF7018",
                  }}
                >
                  {blog.category}
                </span>
                <span
                  style={{
                    fontFamily: "'Urbanist', sans-serif",
                    fontSize: "13px",
                    fontWeight: 500,
                    color: "#888888",
                  }}
                >
                  {blog.date}
                </span>
              </div>

              <h3
                style={{
                  margin: 0,
                  fontFamily: "'Urbanist', sans-serif",
                  fontSize: "19px",
                  fontWeight: 700,
                  color: "#000000",
                  lineHeight: "1.3",
                }}
              >
                {blog.title}
              </h3>

              <p
                style={{
                  margin: 0,
                  fontFamily: "'Urbanist', sans-serif",
                  fontSize: "14px",
                  fontWeight: 400,
                  lineHeight: "140%",
                  color: "#666666",
                }}
              >
                {blog.desc}
              </p>

              <div style={{ display: "flex", alignItems: "center", gap: "10px", marginTop: "auto" }}>
                <div
                  style={{
                    width: "28px",
                    height: "28px",
                    borderRadius: "50%",
                    backgroundColor: "#000000",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "#FF7018",
                    fontWeight: 700,
                    fontSize: "11px",
                    fontFamily: "'Urbanist', sans-serif",
                  }}
                >
                  IS
                </div>
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <span
                    style={{
                      fontFamily: "'Urbanist', sans-serif",
                      fontSize: "13px",
                      fontWeight: 700,
                      color: "#000000",
                    }}
                  >
                    {blog.author}
                  </span>
                  <span
                    style={{
                      fontFamily: "'Urbanist', sans-serif",
                      fontSize: "12px",
                      fontWeight: 500,
                      color: "#888888",
                    }}
                  >
                    {blog.readTime}
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Pagination Bar */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: "8px",
            width: "1170px",
            marginTop: "30px",
          }}
        >
          <button
            type="button"
            onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
            style={{
              width: "40px",
              height: "40px",
              borderRadius: "8px",
              border: "1px solid #E0E0E0",
              backgroundColor: "#FFFFFF",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#666",
            }}
          >
            &lt;
          </button>

          {[1, 2, 3, 4, 5].map((num) => {
            const isAct = currentPage === num;
            return (
              <button
                key={num}
                type="button"
                onClick={() => setCurrentPage(num)}
                style={{
                  width: "40px",
                  height: "40px",
                  borderRadius: "8px",
                  border: "none",
                  backgroundColor: isAct ? "#FF7018" : "transparent",
                  color: isAct ? "#FFFFFF" : "#333333",
                  fontFamily: "'Urbanist', sans-serif",
                  fontSize: "15px",
                  fontWeight: isAct ? 700 : 500,
                  cursor: "pointer",
                }}
              >
                {num}
              </button>
            );
          })}

          <button
            type="button"
            onClick={() => setCurrentPage(currentPage + 1)}
            style={{
              width: "40px",
              height: "40px",
              borderRadius: "8px",
              border: "1px solid #E0E0E0",
              backgroundColor: "#FFFFFF",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#666",
            }}
          >
            &gt;
          </button>
        </div>
      </section>

      {/* SECTION 3: CTA CARD BANNER */}
      <section
        style={{
          position: "relative",
          width: "1440px",
          height: "488px",
          backgroundColor: "#FFFFFF",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          boxSizing: "border-box",
        }}
      >
        <div
          style={{
            width: "1170px",
            height: "328px",
            borderRadius: "20px",
            background: "linear-gradient(135deg, #FF7018 0%, #FFBE03 100%)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            textAlign: "center",
            gap: "20px",
            padding: "40px",
            boxSizing: "border-box",
            boxShadow: "0 20px 50px rgba(255, 112, 24, 0.25)",
          }}
        >
          <h2
            style={{
              margin: 0,
              fontFamily: "'Cal Sans', 'Outfit', sans-serif",
              fontSize: "44px",
              fontWeight: 400,
              color: "#FFFFFF",
              textTransform: "uppercase",
              lineHeight: "1.2",
            }}
          >
            HAVE A HARDWARE IDEA WORTH PROTOTYPING?
          </h2>
          <p
            style={{
              margin: 0,
              width: "640px",
              fontFamily: "'Urbanist', sans-serif",
              fontSize: "16px",
              fontWeight: 500,
              color: "#FFFFFF",
              lineHeight: "150%",
            }}
          >
            We turn ambitious concepts from single proof of concept through to production readiness.
          </p>
          <Link
            href="/contact"
            style={{
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "6px",
              padding: "14px 32px",
              borderRadius: "100px",
              backgroundColor: "#000000",
              color: "#FFFFFF",
              fontFamily: "'Urbanist', sans-serif",
              fontSize: "16px",
              fontWeight: 600,
              textDecoration: "none",
            }}
          >
            <span>Book a Call</span>
            <span style={{ fontSize: "12px" }}>↗</span>
          </Link>
        </div>
      </section>

      {/* SECTION 4: FOOTER & CHAT */}
      <footer
        style={{
          position: "relative",
          width: "1440px",
          height: "276px",
          backgroundColor: "#000000",
          boxSizing: "border-box",
        }}
      >
        <div style={{ position: "absolute", left: "135px", top: "64px", zIndex: 30 }}>
                  </div>

        {/* Interactive Chat Widget */}
        <div
          style={{
            position: "absolute",
            left: "974px",
            top: "39px",
            width: "331px",
            height: "141px",
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-end",
            justifyContent: "flex-end",
            gap: "12px",
            zIndex: 40,
          }}
        >
          {chatOpen && (
            <div
              style={{
                position: "relative",
                width: "331px",
                height: "81px",
                backgroundColor: "#FFFFFF",
                borderRadius: "8px",
                boxSizing: "border-box",
                padding: "9px 12px",
                display: "flex",
                flexDirection: "row",
                alignItems: "flex-start",
                justifyContent: "space-between",
                boxShadow: "0 10px 30px rgba(0,0,0,0.5)",
              }}
            >
              <p
                style={{
                  margin: 0,
                  width: "280px",
                  fontFamily: "'Urbanist', sans-serif",
                  fontSize: "14px",
                  fontWeight: 400,
                  lineHeight: "120%",
                  color: "#666666",
                }}
              >
                Welcome to Innosino! Need help? Just reply to this message—we’re online and ready to assist you.
              </p>
              <button
                type="button"
                onClick={() => setChatOpen(false)}
                style={{
                  background: "none",
                  border: "none",
                  padding: "2px",
                  cursor: "pointer",
                  color: "#999999",
                }}
                aria-label="Close chat bubble"
              >
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M3.5 3.5L10.5 10.5M10.5 3.5L3.5 10.5" stroke="#888888" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
              </button>
            </div>
          )}

          <button
            type="button"
            onClick={() => setChatOpen(!chatOpen)}
            style={{
              width: "48px",
              height: "48px",
              borderRadius: "50%",
              backgroundColor: "#FF6A00",
              border: "none",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              boxShadow: "0 4px 20px rgba(255, 106, 0, 0.4)",
            }}
            aria-label="Toggle chat"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M20 2H4C2.9 2 2 2.9 2 4V22L6 18H20C21.1 18 22 17.1 22 16V4C22 2.9 21.1 2 20 2Z" fill="#000000" />
              <rect x="6" y="7" width="12" height="2" rx="1" fill="#FF6A00" />
              <rect x="6" y="11" width="8" height="2" rx="1" fill="#FF6A00" />
            </svg>
          </button>
        </div>

        {/* Footer Bottom */}
        <div
          style={{
            position: "absolute",
            left: "135px",
            top: "156px",
            width: "1169px",
            height: "56px",
            borderTop: "1px solid rgba(255, 255, 255, 0.2)",
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            boxSizing: "border-box",
          }}
        >
          <p style={{ margin: 0, fontFamily: "'Urbanist', sans-serif", fontSize: "14px", fontWeight: 400, color: "rgba(255, 255, 255, 0.8)" }}>
            © 2026 Innosion All Rights Reserved
          </p>

          <div style={{ display: "flex", flexDirection: "row", alignItems: "center", gap: "24px" }}>
            {[
              { label: "Home", href: "/" },
              { label: "About Us", href: "/about" },
              { label: "Services", href: "/services" },
              { label: "Industries", href: "/#industries" },
              { label: "Blogs", href: "/blogs" },
              { label: "Privacy Policy", href: "#privacy" },
              { label: "Terms & Condition", href: "#terms" },
              { label: "Contact Us", href: "/contact" },
            ].map((link) => (
              <Link
                key={link.label}
                href={link.href}
                style={{
                  fontFamily: "'Urbanist', sans-serif",
                  fontSize: "16px",
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
      </footer>
    </main>
  );
}
