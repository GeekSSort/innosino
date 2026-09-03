"use client";

import React, { useState } from "react";
import BackgroundVideo from "@/components/common/BackgroundVideo";
import Image from "next/image";
import Link from "next/link";

const categories = [
  "All",
  "Featured Projects",
  "Embedded Systems",
  "PCB Design",
  "IOT Devices",
  "Industrial Automation",
  "Smart Devices",
];

const allProjects = [
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

export default function ProjectsPage() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [chatOpen, setChatOpen] = useState(true);


  // Filter projects
  const filteredProjects = allProjects.filter((p) => {
    const matchesCategory =
      selectedCategory === "All" || p.filterTags.includes(selectedCategory);
    const matchesSearch =
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.desc.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.category.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <main
      style={{
        position: "relative",
        width: "1440px",
        minHeight: "3497px",
        overflow: "hidden",
        backgroundColor: "#000000",
        margin: "0 auto",
      }}
    >
      {/* =========================================================================
          SECTION 1: HERO & FEATURED PROJECT CARD OVERLAP (Height 684px)
          Top background: Video /homepage_assets/Home page Hero section.mp4
          ========================================================================= */}
      <section
        style={{
          position: "relative",
          width: "1440px",
          height: "684px",
          backgroundColor: "#F1F1F1",
          overflow: "visible",
        }}
      >
        {/* Background Video */}
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
          <BackgroundVideo
            src="/project_page/Project Page-Hero Section.mp4"
            poster="/posters/project_page/Project Page-Hero Section.webp"
            loading="eager"
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              display: "block",
            }}
          />
          <div
            style={{
              position: "absolute",
              inset: 0,
              backgroundColor: "rgba(0, 0, 0, 0.55)",
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
            preload
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
          {/* Breadcrumb: HOME > PROJECTS */}
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
                PROJECTS
              </span>
            </div>
          </div>

          {/* Title: OUR PROJECTS */}
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
            OUR PROJECTS
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
            Explore the innovative solutions we've designed and developed across industries. Every project reflects our commitment to quality, precision, and solving real-world challenges through smart engineering.
          </p>
        </div>

        {/* Floating Navbar (Top: 401px, Left: 134px) */}
        <div style={{ position: "absolute", left: "134px", top: "401px", zIndex: 30 }}>
                  </div>

        {/* Overlapping Featured Project Card (Node 1498:14883, x: 235, y: 557, w: 970, h: 478) */}
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
          {/* Left Column of Featured Card (Width: 434px) */}
          <div
            style={{
              width: "434px",
              height: "402px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
            }}
          >
            <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
              {/* Tag & Title */}
              <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
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
                    Featured Project
                  </span>
                </div>

                <h2
                  style={{
                    margin: 0,
                    fontFamily: "'Urbanist', sans-serif",
                    fontSize: "36px",
                    fontWeight: 700,
                    color: "#000000",
                    lineHeight: "1.2",
                  }}
                >
                  Smart Musical Instruments
                </h2>
              </div>

              {/* Description */}
              <p
                style={{
                  margin: 0,
                  fontFamily: "'Urbanist', sans-serif",
                  fontSize: "15px",
                  fontWeight: 500,
                  lineHeight: "150%",
                  color: "#666666",
                }}
              >
                Engineered an intelligent musical instruments powered by AI, DSP, and embedded technologies, enabling real-time audio processing, ultra-low-latency wireless connectivity, intelligent gesture recognition, and patent-ready innovations for next-generation digital music experiences.
              </p>

              {/* Tag Badge */}
              <div
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "8px",
                  border: "1.5px solid #FF7018",
                  borderRadius: "6px",
                  padding: "8px 14px",
                  width: "fit-content",
                }}
              >
                <span style={{ fontSize: "14px", color: "#FF7018" }}>⚡</span>
                <span
                  style={{
                    fontFamily: "'Urbanist', sans-serif",
                    fontSize: "13px",
                    fontWeight: 700,
                    color: "#000000",
                    letterSpacing: "0.04em",
                  }}
                >
                  SMART INSTRUMENTS DEVELOPED
                </span>
              </div>
            </div>

            {/* Know Details Button */}
            <Link
              href="#featured-details"
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

          {/* Right Column of Featured Card: Guitar Image (Width: 434px, Height: 406px) */}
          <div
            style={{
              width: "434px",
              height: "406px",
              borderRadius: "14px",
              overflow: "hidden",
              position: "relative",
              backgroundColor: "#161616",
            }}
          >
            <Image
              src="/homepage_assets/featured_project_images/guitar.png"
              alt="Smart Musical Instruments"
              fill
              sizes="434px"
              style={{ objectFit: "cover" }}
            />
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 2: OUR RECENT PROJECTS (Filters, Grid, Pagination)
          White section with paddingTop to compensate for overlapping card
          ========================================================================= */}
      <section
        style={{
          position: "relative",
          width: "1440px",
          minHeight: "1800px",
          backgroundColor: "#FFFFFF",
          boxSizing: "border-box",
          paddingTop: "390px", // Room for the 478px floating card
          paddingLeft: "135px",
          paddingRight: "135px",
          paddingBottom: "80px",
          display: "flex",
          flexDirection: "column",
          gap: "40px",
        }}
      >
        {/* Title: OUR RECENT PROJECTS */}
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
          OUR RECENT <span style={{ color: "#FF7018" }}>PROJECTS</span>
        </h2>

        {/* Filter Pills & Search Bar Row */}
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

        {/* 3x3 Project Grid (Node width 374, height 416) */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "24px",
            width: "1170px",
            marginTop: "10px",
          }}
        >
          {filteredProjects.map((project, idx) => (
            <div
              key={idx}
              style={{
                width: "374px",
                height: "416px",
                display: "flex",
                flexDirection: "column",
                gap: "16px",
                boxSizing: "border-box",
              }}
            >
              {/* Project Image Card */}
              <div
                style={{
                  width: "374px",
                  height: "280px",
                  borderRadius: "16px",
                  overflow: "hidden",
                  position: "relative",
                  backgroundColor: "#0D0D0D",
                }}
              >
                <Image
                  src={project.img}
                  alt={project.title}
                  fill
                  sizes="374px"
                  style={{ objectFit: "cover" }}
                />
              </div>

              {/* Project Info */}
              <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                <span
                  style={{
                    fontFamily: "'Urbanist', sans-serif",
                    fontSize: "13px",
                    fontWeight: 600,
                    color: "#FF7018",
                  }}
                >
                  {project.category}
                </span>
                <h3
                  style={{
                    margin: 0,
                    fontFamily: "'Urbanist', sans-serif",
                    fontSize: "20px",
                    fontWeight: 700,
                    color: "#000000",
                  }}
                >
                  {project.title}
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
                  {project.desc}
                </p>
              </div>
            </div>
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

          {[1, 2, 3, 4, 5, 10].map((num) => {
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

      {/* =========================================================================
          SECTION 3: CTA CARD BANNER (White Section, Centered CTA Card)
          ========================================================================= */}
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
            HAVE AN IDEA? LET'S ENGINEER IT INTO A PRODUCT.
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
            Tell us about your project: hardware, firmware, or both. We'll come back with a clear path from concept to production.
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

      {/* =========================================================================
          SECTION 4: FOOTER & INTERACTIVE CHAT WIDGET
          Black #000000 background
          ========================================================================= */}
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

        {/* Footer Bottom Links & Copyright */}
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
              { label: "Blogs", href: "#blogs" },
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
