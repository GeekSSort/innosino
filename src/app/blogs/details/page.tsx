"use client";

import React, { useState } from "react";
import BackgroundVideo from "@/components/common/BackgroundVideo";
import Image from "next/image";
import Link from "next/link";
import { chatWidget, copyright, ctaBanner, footerLinks } from "@/content/site";
import { blogPost } from "@/content/blogPost";

export default function BlogDetailsPage() {
  const [activeSection, setActiveSection] = useState("the-hardcoding-problem");
  const [copied, setCopied] = useState(false);
  const [chatOpen, setChatOpen] = useState(true);


  const handleCopyLink = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const tableOfContents = [
    { id: "the-hardcoding-problem", label: "The Hardcoding Problem" },
    { id: "the-profile-schema", label: "The Profile Schema" },
    { id: "the-16-profiles", label: "The 16 Profiles" },
    { id: "real-time-visualization", label: "Real-Time Visualization" },
    { id: "what-it-taught-us", label: "What It Taught Us" },
  ];

  return (
    <main
      style={{
        position: "relative",
        width: "1440px",
        minHeight: "4799px",
        overflow: "hidden",
        backgroundColor: "#000000",
        margin: "0 auto",
      }}
    >
      {/* =========================================================================
          {blogPost.section1HeroSection}
          Hero video: /about_us/About Us Hero Section.mp4
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
          <BackgroundVideo
            src="/about_us/About Us Hero Section.mp4"
            poster="/posters/about_us/About Us Hero Section.webp"
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
              backgroundColor: "rgba(0, 0, 0, 0.65)",
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
          <Link href="/" aria-label="INNOSINO home" className="brand-logo-link">
            <Image
              src="/about_us/IS-Logo.webp"
              alt="INNOSINO"
              width={236}
              height={32}
              style={{ objectFit: "contain", height: "32px", width: "auto" }}
              preload
            />
          </Link>
        </div>

        {/* Hero Title & Breadcrumb Block */}
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
          {/* Breadcrumb: HOME > BLOG > BLOG DETAILS */}
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
                  fontFamily: "var(--font-urbanist), sans-serif",
                  fontSize: "16px",
                  fontWeight: 600,
                  color: "#FF7018",
                  textDecoration: "none",
                  textTransform: "uppercase",
                }}
              >
                Home
              </Link>
              <span style={{ color: "#FF7018", fontSize: "14px" }}>&gt;</span>
              <Link
                href="/blogs"
                style={{
                  fontFamily: "var(--font-urbanist), sans-serif",
                  fontSize: "16px",
                  fontWeight: 600,
                  color: "#FF7018",
                  textDecoration: "none",
                  textTransform: "uppercase",
                }}
              >
                Blog
              </Link>
              <span style={{ color: "#FF7018", fontSize: "14px" }}>&gt;</span>
              <span
                style={{
                  fontFamily: "var(--font-urbanist), sans-serif",
                  fontSize: "16px",
                  fontWeight: 600,
                  color: "#FF7018",
                  textTransform: "uppercase",
                }}
              >
                {blogPost.blogDetails}
              </span>
            </div>
          </div>

          {/* Main Title: INSIDE THE LOGIC IC TRAINER KIT'S 16 PROFILES */}
          <h1
            style={{
              margin: 0,
              fontFamily: "var(--font-cal-sans), sans-serif",
              fontSize: "64px",
              fontWeight: 400,
              lineHeight: "1.1",
              color: "#FFFFFF",
              textTransform: "uppercase",
              maxWidth: "1171px",
            }}
          >
            {blogPost.insideTheLogicIc}
          </h1>

          {/* Subtitle */}
          <p
            style={{
              margin: 0,
              width: "1171px",
              fontFamily: "var(--font-urbanist), sans-serif",
              fontSize: "20px",
              fontWeight: 400,
              lineHeight: "150%",
              color: "#FFFFFF",
            }}
          >
            {blogPost.whyWeChoseA}
          </p>

          {/* Meta Information Bar (Author + Categories) */}
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              gap: "24px",
              marginTop: "4px",
            }}
          >
            {/* Author */}
            <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
              <div
                style={{
                  width: "40px",
                  height: "40px",
                  borderRadius: "50%",
                  background: "linear-gradient(135deg, #FF7018 0%, #FFBE03 100%)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#FFFFFF",
                  fontWeight: 700,
                  fontSize: "14px",
                  fontFamily: "var(--font-urbanist), sans-serif",
                }}
              >
                IS
              </div>
              <div style={{ display: "flex", flexDirection: "column" }}>
                <span
                  style={{
                    fontFamily: "var(--font-urbanist), sans-serif",
                    fontSize: "15px",
                    fontWeight: 700,
                    color: "#FFFFFF",
                  }}
                >
                  {blogPost.innosinoTeam}
                </span>
                <span
                  style={{
                    fontFamily: "var(--font-urbanist), sans-serif",
                    fontSize: "13px",
                    fontWeight: 400,
                    color: "rgba(255, 255, 255, 0.7)",
                  }}
                >
                  {blogPost.n8MinRead}
                </span>
              </div>
            </div>

            {/* Tags / Pills */}
            <span
              style={{
                display: "inline-flex",
                alignItems: "center",
                height: "34px",
                padding: "0 16px",
                borderRadius: "100px",
                backgroundColor: "rgba(255, 255, 255, 0.15)",
                backdropFilter: "blur(8px)",
                color: "#FFFFFF",
                fontFamily: "var(--font-urbanist), sans-serif",
                fontSize: "13px",
                fontWeight: 600,
                border: "1px solid rgba(255, 255, 255, 0.2)",
              }}
            >
              {blogPost.embeddedSystems}
            </span>

            <span
              style={{
                display: "inline-flex",
                alignItems: "center",
                height: "34px",
                padding: "0 16px",
                borderRadius: "100px",
                backgroundColor: "rgba(255, 255, 255, 0.15)",
                backdropFilter: "blur(8px)",
                color: "#FFFFFF",
                fontFamily: "var(--font-urbanist), sans-serif",
                fontSize: "13px",
                fontWeight: 600,
                border: "1px solid rgba(255, 255, 255, 0.2)",
              }}
            >
              Product
            </span>
          </div>
        </div>

        {/* Floating Navbar (Top: 519px, Left: 134px) */}
        <div style={{ position: "absolute", left: "134px", top: "519px", zIndex: 30 }}>
                  </div>

        {/* Overlapping Hero Visual Card (x: 238, y: 559, w: 970, h: 478) */}
        <div
          style={{
            position: "absolute",
            left: "238px",
            top: "559px",
            width: "970px",
            height: "478px",
            borderRadius: "18px",
            boxSizing: "border-box",
            zIndex: 25,
            border: "2px solid transparent",
            backgroundImage:
              "linear-gradient(rgba(0,0,0,1), rgba(0,0,0,1)), linear-gradient(90deg, rgba(255,112,24,1) 26.9%, rgba(255,190,3,1) 100%)",
            backgroundOrigin: "border-box",
            backgroundClip: "padding-box, border-box",
            overflow: "hidden",
            boxShadow: "0 20px 60px rgba(0, 0, 0, 0.4)",
          }}
        >
          <Image
            src="/blog_details assets/BD-01.webp"
            alt="Inside the Logic IC Trainer Kit Profiles"
            fill
            sizes="970px"
            style={{ objectFit: "cover" }}
            preload
          />
        </div>
      </section>

      {/* =========================================================================
          {blogPost.section2ArticleBody}
          Left: Table of contents & Share | Center: Blog Prose | Right: Related Project
          ========================================================================= */}
      <section
        style={{
          position: "relative",
          width: "1440px",
          backgroundColor: "#FFFFFF",
          boxSizing: "border-box",
          paddingTop: "410px",
          paddingLeft: "135px",
          paddingRight: "135px",
          paddingBottom: "100px",
        }}
      >
        <div
          style={{
            width: "1170px",
            display: "grid",
            gridTemplateColumns: "220px 640px 250px",
            gap: "30px",
            alignItems: "start",
          }}
        >
          {/* LEFT COLUMN: Table of Contents & Share */}
          <aside
            style={{
              position: "sticky",
              top: "40px",
              display: "flex",
              flexDirection: "column",
              gap: "24px",
            }}
          >
            {/* Table of Contents Box */}
            <div
              style={{
                backgroundColor: "#F9F9F9",
                borderRadius: "14px",
                padding: "20px",
                border: "1px solid #ECECEC",
                display: "flex",
                flexDirection: "column",
                gap: "14px",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <div
                  style={{
                    width: "16px",
                    height: "16px",
                    borderRadius: "50%",
                    border: "2px solid #FF7018",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <div style={{ width: "6px", height: "6px", borderRadius: "50%", backgroundColor: "#FF7018" }} />
                </div>
                <span
                  style={{
                    fontFamily: "var(--font-urbanist), sans-serif",
                    fontSize: "14px",
                    fontWeight: 700,
                    color: "#111111",
                  }}
                >
                  {blogPost.tableOfContent}
                </span>
              </div>

              {/* Progress Line */}
              <div
                style={{
                  width: "100%",
                  height: "2px",
                  backgroundColor: "#E0E0E0",
                  position: "relative",
                  borderRadius: "2px",
                }}
              >
                <div
                  style={{
                    width: "35%",
                    height: "100%",
                    backgroundColor: "#FF7018",
                    borderRadius: "2px",
                  }}
                />
              </div>

              {/* TOC Links */}
              <div style={{ display: "flex", flexDirection: "column", gap: "12px", marginTop: "6px" }}>
                {tableOfContents.map((item) => {
                  const isActive = activeSection === item.id;
                  return (
                    <a
                      key={item.id}
                      href={"#" + item.id}
                      onClick={() => setActiveSection(item.id)}
                      style={{
                        fontFamily: "var(--font-urbanist), sans-serif",
                        fontSize: "13px",
                        fontWeight: isActive ? 700 : 500,
                        color: isActive ? "#FF7018" : "#666666",
                        textDecoration: "none",
                        lineHeight: "1.4",
                        transition: "color 0.2s ease",
                      }}
                    >
                      {item.label}
                    </a>
                  );
                })}
              </div>
            </div>

            {/* Share this post Box */}
            <div
              style={{
                backgroundColor: "#F9F9F9",
                borderRadius: "14px",
                padding: "20px",
                border: "1px solid #ECECEC",
                display: "flex",
                flexDirection: "column",
                gap: "12px",
              }}
            >
              <span
                style={{
                  fontFamily: "var(--font-urbanist), sans-serif",
                  fontSize: "14px",
                  fontWeight: 700,
                  color: "#111111",
                }}
              >
                {blogPost.shareThisPost}
              </span>

              <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <button
                  type="button"
                  onClick={handleCopyLink}
                  style={{
                    width: "36px",
                    height: "36px",
                    borderRadius: "8px",
                    backgroundColor: "#FFFFFF",
                    border: "1px solid #DDDDDD",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    cursor: "pointer",
                    color: "#333333",
                    transition: "all 0.2s ease",
                  }}
                  title="Copy Link"
                >
                  🔗
                </button>

                <a
                  href="https://twitter.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    width: "36px",
                    height: "36px",
                    borderRadius: "8px",
                    backgroundColor: "#FFFFFF",
                    border: "1px solid #DDDDDD",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    cursor: "pointer",
                    color: "#333333",
                    textDecoration: "none",
                    fontWeight: 700,
                    fontSize: "13px",
                  }}
                  title="Twitter / X"
                >
                  𝕏
                </a>

                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    width: "36px",
                    height: "36px",
                    borderRadius: "8px",
                    backgroundColor: "#FFFFFF",
                    border: "1px solid #DDDDDD",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    cursor: "pointer",
                    color: "#0077B5",
                    textDecoration: "none",
                    fontWeight: 700,
                    fontSize: "13px",
                  }}
                  title="LinkedIn"
                >
                  in
                </a>
              </div>
              {copied && (
                <span style={{ fontSize: "12px", color: "#FF7018", fontFamily: "var(--font-urbanist), sans-serif" }}>
                  ✓ Link copied!
                </span>
              )}
            </div>
          </aside>

          {/* CENTER COLUMN: Main Article Prose */}
          <article
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "32px",
              fontFamily: "var(--font-urbanist), sans-serif",
              color: "#333333",
              lineHeight: "1.7",
              fontSize: "16px",
            }}
          >
            {/* Intro Paragraph */}
            <p style={{ margin: 0, fontSize: "17px", color: "#444444" }}>
              {blogPost.whenEngineeringTheLogic}
            </p>

            {/* Section 1: The Hardcoding Problem */}
            <div id="the-hardcoding-problem" style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              <h2
                style={{
                  margin: 0,
                  fontFamily: "var(--font-cal-sans), sans-serif",
                  fontSize: "28px",
                  fontWeight: 400,
                  color: "#000000",
                  textTransform: "uppercase",
                }}
              >
                {blogPost.theHardcodingProblem}
              </h2>
              <p style={{ margin: 0 }}>
                Early prototypes relied on static, hardwired PCB traces mapping 74-series logic chips to fixed I/O headers. While straightforward to construct, this approach revealed severe limitations within hours of test deployments:
              </p>
              <ul style={{ margin: 0, paddingLeft: "20px", display: "flex", flexDirection: "column", gap: "8px" }}>
                <li>Zero support for non-standard DIP packages or evolving CMOS/TTL voltage tolerances.</li>
                <li>Inability to dynamically remap test pins during complex multi-gate experiments.</li>
                <li>Excessive jumper wire clutter, obscuring student visibility and causing signal integrity degradation.</li>
              </ul>
            </div>

            {/* Callout / Blockquote */}
            <div
              style={{
                backgroundColor: "#FFF8F3",
                borderLeft: "4px solid #FF7018",
                padding: "20px 24px",
                borderRadius: "0 12px 12px 0",
                margin: "12px 0",
              }}
            >
              <p
                style={{
                  margin: 0,
                  fontFamily: "var(--font-urbanist), sans-serif",
                  fontSize: "18px",
                  fontWeight: 600,
                  fontStyle: "italic",
                  color: "#111111",
                  lineHeight: "1.5",
                }}
              >
                {blogPost.hardwareShouldAdaptTo}
              </p>
            </div>

            {/* Section 2: The Profile Schema */}
            <div id="the-profile-schema" style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              <h2
                style={{
                  margin: 0,
                  fontFamily: "var(--font-cal-sans), sans-serif",
                  fontSize: "28px",
                  fontWeight: 400,
                  color: "#000000",
                  textTransform: "uppercase",
                }}
              >
                {blogPost.theProfileSchema}
              </h2>
              <p style={{ margin: 0 }}>
                To solve this, we decoupled physical pin headers from direct logic lines by inserting an intelligent multiplexed matrix driver controlled by a low-power Cortex-M4 microcontroller. Each test configuration is stored as an immutable profile schema containing:
              </p>
              <ul style={{ margin: 0, paddingLeft: "20px", display: "flex", flexDirection: "column", gap: "8px" }}>
                <li><strong>Pin Assignment Map:</strong> Dynamic mapping of VCC, GND, and logic I/O vectors.</li>
                <li><strong>Voltage Envelope:</strong> Configurable 3.3V and 5V thresholds with real-time overcurrent cutoffs.</li>
                <li><strong>Truth Table Signature:</strong> Onboard automated verification tests with instant pass/fail LEDs.</li>
              </ul>

              {/* Embedded Technical Image from blog_details assets */}
              <div
                style={{
                  width: "100%",
                  height: "300px",
                  borderRadius: "14px",
                  overflow: "hidden",
                  position: "relative",
                  margin: "16px 0",
                  backgroundColor: "#000000",
                }}
              >
                <Image
                  src="/blog_details assets/BD-02.webp"
                  alt="Logic Matrix Circuit Diagram"
                  fill
                  sizes="640px"
                  style={{ objectFit: "cover" }}
                />
              </div>
            </div>

            {/* Section 3: The 16 Profiles */}
            <div id="the-16-profiles" style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              <h2
                style={{
                  margin: 0,
                  fontFamily: "var(--font-cal-sans), sans-serif",
                  fontSize: "28px",
                  fontWeight: 400,
                  color: "#000000",
                  textTransform: "uppercase",
                }}
              >
                {blogPost.the16Profiles}
              </h2>
              <p style={{ margin: 0 }}>
                {blogPost.wePreLoaded16}
              </p>

              {/* Matrix Code / Visual Box from blog_details assets */}
              <div
                style={{
                  width: "100%",
                  height: "280px",
                  borderRadius: "14px",
                  overflow: "hidden",
                  position: "relative",
                  margin: "12px 0",
                  backgroundColor: "#050B14",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Image
                  src="/blog_details assets/BD-03.webp"
                  alt="Binary Waveform and Matrix Interface"
                  fill
                  sizes="640px"
                  style={{ objectFit: "contain" }}
                />
              </div>
            </div>

            {/* Section 4: Real-Time Visualization */}
            <div id="real-time-visualization" style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              <h2
                style={{
                  margin: 0,
                  fontFamily: "var(--font-cal-sans), sans-serif",
                  fontSize: "28px",
                  fontWeight: 400,
                  color: "#000000",
                  textTransform: "uppercase",
                }}
              >
                {blogPost.realTimeVisualization}
              </h2>
              <p style={{ margin: 0 }}>
                {blogPost.everyGateInputAnd}
              </p>
            </div>

            {/* Section 5: What It Taught Us */}
            <div id="what-it-taught-us" style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              <h2
                style={{
                  margin: 0,
                  fontFamily: "var(--font-cal-sans), sans-serif",
                  fontSize: "28px",
                  fontWeight: 400,
                  color: "#000000",
                  textTransform: "uppercase",
                }}
              >
                {blogPost.whatItTaughtUs}
              </h2>
              <p style={{ margin: 0 }}>
                {blogPost.movingFromFixedFunction}
              </p>
            </div>

            {/* Article Footer Tags */}
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: "10px",
                paddingTop: "24px",
                borderTop: "1px solid #ECECEC",
                marginTop: "16px",
              }}
            >
              {["# Embedded Systems", "# PCB & Circuit Design", "# Hardware Architecture"].map((tag) => (
                <span
                  key={tag}
                  style={{
                    backgroundColor: "#F5F5F5",
                    padding: "8px 16px",
                    borderRadius: "100px",
                    fontSize: "13px",
                    fontWeight: 600,
                    color: "#555555",
                    fontFamily: "var(--font-urbanist), sans-serif",
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>
          </article>

          {/* RIGHT COLUMN: Related Project Card */}
          <aside
            style={{
              position: "sticky",
              top: "40px",
              display: "flex",
              flexDirection: "column",
              gap: "20px",
            }}
          >
            <div
              style={{
                backgroundColor: "#F9F9F9",
                borderRadius: "16px",
                padding: "20px",
                border: "1px solid #ECECEC",
                display: "flex",
                flexDirection: "column",
                gap: "16px",
                boxShadow: "0 4px 20px rgba(0,0,0,0.04)",
              }}
            >
              <span
                style={{
                  fontFamily: "var(--font-urbanist), sans-serif",
                  fontSize: "16px",
                  fontWeight: 700,
                  color: "#000000",
                }}
              >
                {blogPost.logicIcTrainerKit}
              </span>

              <div
                style={{
                  width: "100%",
                  height: "140px",
                  borderRadius: "10px",
                  overflow: "hidden",
                  position: "relative",
                  backgroundColor: "#0B0B0B",
                }}
              >
                <Image
                  src="/blog_details assets/BD-01.webp"
                  alt="Logic IC Trainer Kit"
                  fill
                  sizes="250px"
                  style={{ objectFit: "cover" }}
                />
              </div>

              <Link
                href="/blogs/details"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "6px",
                  width: "100%",
                  height: "40px",
                  borderRadius: "100px",
                  backgroundColor: "#000000",
                  color: "#FFFFFF",
                  fontFamily: "var(--font-urbanist), sans-serif",
                  fontSize: "14px",
                  fontWeight: 600,
                  textDecoration: "none",
                }}
              >
                <span>Project Details</span>
                <span style={{ fontSize: "11px" }}>↗</span>
              </Link>
            </div>
          </aside>
        </div>
      </section>

      {/* SECTION 3: SEE OTHER BLOGS */}
      <section
        style={{
          position: "relative",
          width: "1440px",
          backgroundColor: "#FFFFFF",
          boxSizing: "border-box",
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
            fontFamily: "var(--font-cal-sans), sans-serif",
            fontSize: "48px",
            fontWeight: 400,
            color: "#000000",
            textTransform: "uppercase",
          }}
        >
          SEE OTHER <span style={{ color: "#FF7018" }}>BLOGS</span>
        </h2>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "24px",
            width: "1170px",
          }}
        >
          {[
            {
              category: "PCB Design",
              date: "March 12, 2026",
              title: "Stack-Up Choices For 3-Layer Sense Boards",
              desc: "How we choose copper weight, spacing, and shielding for capacitive ground track.",
              author: "Innosino Team",
              img: "/homepage_assets/featured_project_images/white_moontype.webp",
            },
            {
              category: "Firmware",
              date: "March 12, 2026",
              title: "Debugging Cross-Talk In Dense Capacitive Arrays",
              desc: "A practical walk-through of adaptive baseline filtering for closely packed touch zones.",
              author: "Innosino Team",
              img: "/blog_details assets/BD-02.webp",
            },
            {
              category: "Embedded Systems",
              date: "March 12, 2026",
              title: "Getting BLE MIDI Latency Under 10ms",
              desc: "Notes from tuning connection intervals and packet scheduling for live performance use.",
              author: "Innosino Team",
              img: "/blog_details assets/BD-03.webp",
            },
          ].map((blog, idx) => (
            <Link
              key={idx}
              href="/blogs/details"
              style={{
                width: "374px",
                display: "flex",
                flexDirection: "column",
                gap: "14px",
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
                }}
              >
                <Image
                  src={blog.img}
                  alt={blog.title}
                  fill
                  sizes="374px"
                  style={{ objectFit: blog.img.includes("white_moontype") ? "contain" : "cover" }}
                />
              </div>

              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <span
                  style={{
                    fontFamily: "var(--font-urbanist), sans-serif",
                    fontSize: "13px",
                    fontWeight: 600,
                    color: "#FF7018",
                  }}
                >
                  {blog.category}
                </span>
                <span
                  style={{
                    fontFamily: "var(--font-urbanist), sans-serif",
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
                  fontFamily: "var(--font-urbanist), sans-serif",
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
                  fontFamily: "var(--font-urbanist), sans-serif",
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
                    fontFamily: "var(--font-urbanist), sans-serif",
                  }}
                >
                  IS
                </div>
                <span
                  style={{
                    fontFamily: "var(--font-urbanist), sans-serif",
                    fontSize: "13px",
                    fontWeight: 700,
                    color: "#000000",
                  }}
                >
                  {blog.author}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* SECTION 4: CTA CARD BANNER */}
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
              fontFamily: "var(--font-cal-sans), sans-serif",
              fontSize: "44px",
              fontWeight: 400,
              color: "#FFFFFF",
              textTransform: "uppercase",
              lineHeight: "1.2",
            }}
          >
            {ctaBanner.title}
          </h2>
          <p
            style={{
              margin: 0,
              width: "640px",
              fontFamily: "var(--font-urbanist), sans-serif",
              fontSize: "16px",
              fontWeight: 500,
              color: "#FFFFFF",
              lineHeight: "150%",
            }}
          >
            {blogPost.weTurnAmbitiousConcepts}
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
              fontFamily: "var(--font-urbanist), sans-serif",
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

      {/* SECTION 5: FOOTER & CHAT WIDGET */}
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
                  fontFamily: "var(--font-urbanist), sans-serif",
                  fontSize: "14px",
                  fontWeight: 400,
                  lineHeight: "120%",
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
                  color: "#999999",
                }}
                aria-label={chatWidget.closeLabel}
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
            aria-label={chatWidget.toggleLabel}
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
          <p style={{ margin: 0, fontFamily: "var(--font-urbanist), sans-serif", fontSize: "14px", fontWeight: 400, color: "rgba(255, 255, 255, 0.8)" }}>
            {copyright}
          </p>

          <div style={{ display: "flex", flexDirection: "row", alignItems: "center", gap: "24px" }}>
            {footerLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                style={{
                  fontFamily: "var(--font-urbanist), sans-serif",
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
