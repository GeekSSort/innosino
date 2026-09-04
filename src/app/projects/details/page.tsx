"use client";

import React, { useState } from "react";
import BackgroundVideo from "@/components/common/BackgroundVideo";
import Image from "next/image";
import Link from "next/link";
import FloatingNavbar from "@/components/navigation/FloatingNavbar";
import { chatWidget, copyright, footerLinks } from "@/content/site";

export default function ProjectDetailsPage() {
  const [chatOpen, setChatOpen] = useState(true);

  return (
    <main className="pd-page">
      {/* =====================================================================
          SECTION 1: HERO & OVERLAPPING MEDIA CARD
          The video card is the hero's last flow child and hangs into the white
          body below it by --page-hero-hang.
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
                <Link href="/projects" className="breadcrumb__link">
                  PROJECTS
                </Link>
                <span className="breadcrumb__link" aria-hidden="true">
                  ›
                </span>
                <span className="breadcrumb__link">PROJECT DETAILS</span>
              </div>

              <h1 className="page-hero__title">POLYPAN ELECTRONIC HANDPAN</h1>

              <p className="page-hero__sub">
                An intelligent electronic handpan combining 9-zone capacitive
                touch sensing, gesture control, and wireless MIDI built to give
                a 4,000-year-old instrument family a stage-ready, wireless
                voice.
              </p>

              {/* 4 Key Spec Pills */}
              <div className="pd-hero__specs">
                {[
                  "9 Independent Touch Zones",
                  "7 Gesture Combinations",
                  "3 layer CAPACITIVE TOUCH STACK",
                  "BLE Wireless Connectivity",
                ].map((stat) => (
                  <span key={stat} className="pd-spec">
                    {stat}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Header pill — in the hero's flow, directly above the video card,
              then floats once it scrolls away. */}
          <FloatingNavbar variant="inline" />

          {/* Overlapping hero visual card */}
          <div className="pd-hero__media">
            <BackgroundVideo
              src="/project_page/Project Details_first card video.mp4"
              poster="/posters/project_page/Project Details_first card video.webp"
              loading="lazy"
            />
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 2: MAIN WHITE CONTENT BODY
          Contains: Project Overview, The Challenge, Engineering Approach,
                    Technical Specifications, Signal Path, Project Timeline,
                    What Shipped, From Bench To Shell, and CTA Card
          ========================================================================= */}
      <section className="pd-body">
        <div
          className="container"
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "clamp(2.5rem, 5.6vw, 80px)",
          }}
        >
        {/* 1. PROJECT OVERVIEW */}
        <div style={{ display: "flex", flexDirection: "column", gap: "24px", width: "100%" }}>
          <h2
            style={{
              margin: 0,
              fontFamily: "var(--font-cal-sans), sans-serif",
              fontSize: "clamp(1.75rem, 1.375rem + 1.528vw, 2.75rem)",
              fontWeight: 400,
              color: "#000000",
              textTransform: "uppercase",
            }}
          >
            PROJECT <span style={{ color: "#FF7018" }}>OVERVIEW</span>
          </h2>
          <p
            style={{
              margin: 0,
              fontFamily: "var(--font-urbanist), sans-serif",
              fontSize: "16px",
              fontWeight: 400,
              lineHeight: "160%",
              color: "#555555",
            }}
          >
            The PolyPan is an electronic handpan designed to combine the rich harmonic acoustics of traditional handpans with the modern flexibility of a digital synthesizer and MIDI controller. Built from the ground up for stage performance and studio production, it features high-precision multi-zone touch sensing, motion-based expression, and zero-latency wireless connectivity.
          </p>

          <div style={{ display: "flex", flexWrap: "wrap", gap: "12px", marginTop: "8px" }}>
            {[
              "EMBEDDED SYSTEMS",
              "HARDWARE & PCB DESIGN",
              "DIGITAL MUSICAL INSTRUMENTS",
              "WIRELESS & IOT",
            ].map((tag) => (
              <div
                key={tag}
                style={{
                  border: "1px solid #E0E0E0",
                  borderRadius: "6px",
                  padding: "8px 16px",
                  fontFamily: "var(--font-urbanist), sans-serif",
                  fontSize: "13px",
                  fontWeight: 600,
                  color: "#444444",
                  backgroundColor: "#FBFBFB",
                  letterSpacing: "0.02em",
                }}
              >
                {tag}
              </div>
            ))}
          </div>
        </div>

        {/* 2. THE CHALLENGE */}
        <div style={{ display: "flex", flexDirection: "column", gap: "24px", width: "100%" }}>
          <h2
            style={{
              margin: 0,
              fontFamily: "var(--font-cal-sans), sans-serif",
              fontSize: "clamp(1.75rem, 1.375rem + 1.528vw, 2.75rem)",
              fontWeight: 400,
              color: "#000000",
              textTransform: "uppercase",
            }}
          >
            THE <span style={{ color: "#FF7018" }}>CHALLENGE</span>
          </h2>
          <p
            style={{
              margin: 0,
              fontFamily: "var(--font-urbanist), sans-serif",
              fontSize: "16px",
              fontWeight: 400,
              lineHeight: "160%",
              color: "#555555",
            }}
          >
            Translating the expressive, acoustic nuances of a physical steel handpan into a reliable, low-latency electronic instrument required solving three primary engineering hurdles:
          </p>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "var(--pd-cols-3)",
              gap: "24px",
              marginTop: "12px",
            }}
          >
            {[
              {
                title: "Preserving Acoustic Feel in a Touch-Only Surface",
                desc: "Replicating the subtle velocity sensitivity and multi-harmonic resonance of steel tone fields using capacitive sensing without false triggers or dead zones.",
              },
              {
                title: "Zero-Latency Between Note & Touch Trigger",
                desc: "Musicians perceive delays above 10ms as lag. Achieving sub-8ms end-to-end latency across capacitive scanning, DSP filtering, and wireless BLE transmission.",
              },
              {
                title: "A MIDI Engine Built For Every DAW & Platform",
                desc: "Designing a universally compliant MIDI engine supporting MPE (MIDI Polyphonic Expression) compatible with Ableton, Logic, iPad synths, and hardware modules.",
              },
            ].map((card, idx) => (
              <div
                key={idx}
                style={{
                  backgroundColor: "#FFF5F7",
                  border: "1px solid #FECDD3",
                  borderRadius: "14px",
                  padding: "28px 24px",
                  display: "flex",
                  flexDirection: "column",
                  gap: "14px",
                  boxSizing: "border-box",
                }}
              >
                <h3
                  style={{
                    margin: 0,
                    fontFamily: "var(--font-urbanist), sans-serif",
                    fontSize: "18px",
                    fontWeight: 700,
                    color: "#E11D48",
                    lineHeight: "1.3",
                  }}
                >
                  {card.title}
                </h3>
                <p
                  style={{
                    margin: 0,
                    fontFamily: "var(--font-urbanist), sans-serif",
                    fontSize: "14px",
                    fontWeight: 400,
                    lineHeight: "150%",
                    color: "#6B7280",
                  }}
                >
                  {card.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* 3. ENGINEERING APPROACH */}
        <div style={{ display: "flex", flexDirection: "column", gap: "24px", width: "100%" }}>
          <h2
            style={{
              margin: 0,
              fontFamily: "var(--font-cal-sans), sans-serif",
              fontSize: "clamp(1.75rem, 1.375rem + 1.528vw, 2.75rem)",
              fontWeight: 400,
              color: "#000000",
              textTransform: "uppercase",
            }}
          >
            ENGINEERING <span style={{ color: "#FF7018" }}>APPROACH</span>
          </h2>
          <p
            style={{
              margin: 0,
              fontFamily: "var(--font-urbanist), sans-serif",
              fontSize: "16px",
              fontWeight: 400,
              lineHeight: "160%",
              color: "#555555",
            }}
          >
            We developed an integrated hardware-firmware architecture that decouples physical touch acquisition from high-level MIDI synthesis, ensuring clean trigger detection and seamless gesture control.
          </p>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "var(--pd-cols-3)",
              gap: "24px",
              marginTop: "12px",
            }}
          >
            {[
              {
                title: "9-Zone Capacitive Stack",
                desc: "Custom 3-layer capacitive sensor PCB with isolated ground shielding to eliminate crosstalk between adjacent strike zones.",
              },
              {
                title: "Adaptive Baseline Filtering",
                desc: "Dynamic firmware thresholding algorithms that compensate for environmental temperature, humidity, and player skin moisture in real-time.",
              },
              {
                title: "BLE & USB-C Dual-Mode MIDI Engine",
                desc: "Integrated Bluetooth Low Energy 5.0 module with ultra-low latency stack alongside Class-Compliant USB MIDI for zero-setup studio plug-and-play.",
              },
            ].map((card, idx) => (
              <div
                key={idx}
                style={{
                  backgroundColor: "#F0FDF4",
                  border: "1px solid #BBF7D0",
                  borderRadius: "14px",
                  padding: "28px 24px",
                  display: "flex",
                  flexDirection: "column",
                  gap: "14px",
                  boxSizing: "border-box",
                }}
              >
                <h3
                  style={{
                    margin: 0,
                    fontFamily: "var(--font-urbanist), sans-serif",
                    fontSize: "18px",
                    fontWeight: 700,
                    color: "#15803D",
                    lineHeight: "1.3",
                  }}
                >
                  {card.title}
                </h3>
                <p
                  style={{
                    margin: 0,
                    fontFamily: "var(--font-urbanist), sans-serif",
                    fontSize: "14px",
                    fontWeight: 400,
                    lineHeight: "150%",
                    color: "#6B7280",
                  }}
                >
                  {card.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* 4. TECHNICAL SPECIFICATIONS */}
        <div style={{ display: "flex", flexDirection: "column", gap: "24px", width: "100%" }}>
          <h2
            style={{
              margin: 0,
              fontFamily: "var(--font-cal-sans), sans-serif",
              fontSize: "clamp(1.75rem, 1.375rem + 1.528vw, 2.75rem)",
              fontWeight: 400,
              color: "#000000",
              textTransform: "uppercase",
            }}
          >
            TECHNICAL <span style={{ color: "#FF7018" }}>SPECIFICATIONS</span>
          </h2>
          <p
            style={{
              margin: 0,
              fontFamily: "var(--font-urbanist), sans-serif",
              fontSize: "16px",
              fontWeight: 400,
              lineHeight: "160%",
              color: "#555555",
            }}
          >
            Comprehensive breakdown of hardware components, processing specifications, wireless performance, and mechanical design.
          </p>

          <div
            style={{
              width: "100%",
              border: "1px solid #E5E7EB",
              borderRadius: "14px",
              overflow: "hidden",
              backgroundColor: "#FFFFFF",
              boxShadow: "0 4px 20px rgba(0,0,0,0.03)",
              marginTop: "12px",
            }}
          >
            {[
              { label: "MCU", value: "STM32H7 / ARM Cortex-M7 @ 480MHz" },
              { label: "TOUCH SENSING", value: "Custom 9-pad capacitive array with dynamic sensitivity" },
              { label: "GESTURE SENSING", value: "6-Axis IMU for pitch bend & modulation gestures" },
              { label: "CONNECTIVITY", value: "Bluetooth 5.0 Low Energy MIDI + USB Type-C MIDI" },
              { label: "LATENCY", value: "< 8ms trigger-to-MIDI out latency" },
              { label: "POWER", value: "2500mAh Li-Po battery (12+ hours continuous playtime)" },
              { label: "PLATFORM", value: "iOS, iPadOS, macOS, Windows, Android, Linux" },
            ].map((row, idx, arr) => (
              <div
                key={row.label}
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  padding: "18px 28px",
                  borderBottom: idx === arr.length - 1 ? "none" : "1px solid #F0F0F0",
                  backgroundColor: idx % 2 === 0 ? "#FFFFFF" : "#FAFAFA",
                }}
              >
                <span
                  style={{
                    width: "min(100%, 280px)",
                    fontFamily: "var(--font-urbanist), sans-serif",
                    fontSize: "14px",
                    fontWeight: 700,
                    color: "#111827",
                    letterSpacing: "0.03em",
                  }}
                >
                  {row.label}
                </span>
                <span
                  style={{
                    fontFamily: "var(--font-urbanist), sans-serif",
                    fontSize: "15px",
                    fontWeight: 500,
                    color: "#4B5563",
                  }}
                >
                  {row.value}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* 5. SIGNAL PATH */}
        <div style={{ display: "flex", flexDirection: "column", gap: "24px", width: "100%" }}>
          <h2
            style={{
              margin: 0,
              fontFamily: "var(--font-cal-sans), sans-serif",
              fontSize: "clamp(1.75rem, 1.375rem + 1.528vw, 2.75rem)",
              fontWeight: 400,
              color: "#000000",
              textTransform: "uppercase",
            }}
          >
            SIGNAL <span style={{ color: "#FF7018" }}>PATH</span>
          </h2>
          <p
            style={{
              margin: 0,
              fontFamily: "var(--font-urbanist), sans-serif",
              fontSize: "16px",
              fontWeight: 400,
              lineHeight: "160%",
              color: "#555555",
            }}
          >
            From the moment a musician's fingertip strikes the surface to the transmission of MIDI data packets, the signal path is optimized for speed and accuracy.
          </p>

          <div
            style={{
              width: "100%",
              minHeight: "200px",
              borderRadius: "16px",
              backgroundColor: "#000000",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              gap: "20px",
              boxSizing: "border-box",
              padding: "24px",
              marginTop: "12px",
            }}
          >
            {/* Top Row */}
            <div className="pd-flow-row">
              <div
                style={{
                  border: "1px solid #FF7018",
                  borderRadius: "8px",
                  padding: "10px 24px",
                  color: "#FFFFFF",
                  fontFamily: "var(--font-urbanist), sans-serif",
                  fontSize: "14px",
                  fontWeight: 700,
                  backgroundColor: "rgba(255, 112, 24, 0.08)",
                }}
              >
                TOUCH LAYER
              </div>
              <span style={{ color: "#FF7018", fontSize: "18px" }}>➔</span>
              <div
                style={{
                  border: "1px solid #FF7018",
                  borderRadius: "8px",
                  padding: "10px 24px",
                  color: "#FFFFFF",
                  fontFamily: "var(--font-urbanist), sans-serif",
                  fontSize: "14px",
                  fontWeight: 700,
                  backgroundColor: "rgba(255, 112, 24, 0.08)",
                }}
              >
                SIGNAL FILTERING
              </div>
              <span style={{ color: "#FF7018", fontSize: "18px" }}>➔</span>
              <div
                style={{
                  border: "1px solid #FF7018",
                  borderRadius: "8px",
                  padding: "10px 24px",
                  color: "#FFFFFF",
                  fontFamily: "var(--font-urbanist), sans-serif",
                  fontSize: "14px",
                  fontWeight: 700,
                  backgroundColor: "rgba(255, 112, 24, 0.08)",
                }}
              >
                MCU / FIRMWARE DSP
              </div>
            </div>

            {/* Bottom Row */}
            <div className="pd-flow-row">
              <div
                style={{
                  border: "1px solid #FF7018",
                  borderRadius: "8px",
                  padding: "10px 24px",
                  color: "#FFFFFF",
                  fontFamily: "var(--font-urbanist), sans-serif",
                  fontSize: "14px",
                  fontWeight: 700,
                  backgroundColor: "rgba(255, 112, 24, 0.08)",
                }}
              >
                GESTURE SENSING
              </div>
              <span style={{ color: "#FF7018", fontSize: "18px" }}>➔</span>
              <div
                style={{
                  border: "1px solid #FF7018",
                  borderRadius: "8px",
                  padding: "10px 24px",
                  color: "#FFFFFF",
                  fontFamily: "var(--font-urbanist), sans-serif",
                  fontSize: "14px",
                  fontWeight: 700,
                  backgroundColor: "rgba(255, 112, 24, 0.08)",
                }}
              >
                MIDI OUT
              </div>
            </div>
          </div>
        </div>

        {/* 6. PROJECT TIMELINE */}
        <div style={{ display: "flex", flexDirection: "column", gap: "24px", width: "100%" }}>
          <h2
            style={{
              margin: 0,
              fontFamily: "var(--font-cal-sans), sans-serif",
              fontSize: "clamp(1.75rem, 1.375rem + 1.528vw, 2.75rem)",
              fontWeight: 400,
              color: "#000000",
              textTransform: "uppercase",
            }}
          >
            PROJECT <span style={{ color: "#FF7018" }}>TIMELINE</span>
          </h2>
          <p
            style={{
              margin: 0,
              fontFamily: "var(--font-urbanist), sans-serif",
              fontSize: "16px",
              fontWeight: 400,
              lineHeight: "160%",
              color: "#555555",
            }}
          >
            The end-to-end development cycle from initial proof-of-concept to pilot production and mass manufacturing readiness.
          </p>

          <div
            style={{
              width: "100%",
              minHeight: "260px",
              borderRadius: "16px",
              backgroundColor: "#000000",
              boxSizing: "border-box",
              padding: "24px 30px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              position: "relative",
              marginTop: "12px",
            }}
          >
            {/* Phase Headers */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "var(--pd-cols-4)",
                borderBottom: "1px solid rgba(255, 255, 255, 0.15)",
                paddingBottom: "12px",
                textAlign: "center",
              }}
            >
              {["PHASE 01", "PHASE 02", "PHASE 03", "PHASE 04"].map((p) => (
                <span
                  key={p}
                  style={{
                    fontFamily: "var(--font-urbanist), sans-serif",
                    fontSize: "14px",
                    fontWeight: 700,
                    color: "#FFFFFF",
                    letterSpacing: "0.05em",
                  }}
                >
                  {p}
                </span>
              ))}
            </div>

            {/* Stepped Timeline Milestone Pills */}
            <div
              style={{
                position: "relative",
                minHeight: "160px",
                display: "grid",
                gridTemplateColumns: "var(--pd-cols-4)",
                gap: "12px",
                alignItems: "center",
              }}
            >
              {/* Phase 1 Item */}
              <div style={{ display: "flex", justifyContent: "center" }}>
                <div
                  style={{
                    backgroundColor: "#FFFFFF",
                    borderRadius: "100px",
                    padding: "8px 18px",
                    color: "#000000",
                    fontFamily: "var(--font-urbanist), sans-serif",
                    fontSize: "13px",
                    fontWeight: 600,
                    whiteSpace: "nowrap",
                  }}
                >
                  Architecture & Feasibility
                </div>
              </div>

              {/* Phase 2 Items */}
              <div style={{ display: "flex", flexDirection: "column", gap: "12px", alignItems: "center" }}>
                <div
                  style={{
                    backgroundColor: "#FFFFFF",
                    borderRadius: "100px",
                    padding: "8px 18px",
                    color: "#000000",
                    fontFamily: "var(--font-urbanist), sans-serif",
                    fontSize: "13px",
                    fontWeight: 600,
                    whiteSpace: "nowrap",
                  }}
                >
                  Electronics & PCB v1
                </div>
                <div
                  style={{
                    backgroundColor: "#FFFFFF",
                    borderRadius: "100px",
                    padding: "8px 18px",
                    color: "#000000",
                    fontFamily: "var(--font-urbanist), sans-serif",
                    fontSize: "13px",
                    fontWeight: 600,
                    whiteSpace: "nowrap",
                  }}
                >
                  Case CAD & Ergonomics
                </div>
              </div>

              {/* Phase 3 Items */}
              <div style={{ display: "flex", flexDirection: "column", gap: "12px", alignItems: "center" }}>
                <div
                  style={{
                    backgroundColor: "#FFFFFF",
                    borderRadius: "100px",
                    padding: "8px 18px",
                    color: "#000000",
                    fontFamily: "var(--font-urbanist), sans-serif",
                    fontSize: "13px",
                    fontWeight: 600,
                    whiteSpace: "nowrap",
                  }}
                >
                  Firmware & Touch Tuning
                </div>
                <div
                  style={{
                    backgroundColor: "#FFFFFF",
                    borderRadius: "100px",
                    padding: "8px 18px",
                    color: "#000000",
                    fontFamily: "var(--font-urbanist), sans-serif",
                    fontSize: "13px",
                    fontWeight: 600,
                    whiteSpace: "nowrap",
                  }}
                >
                  BOM Optimization & Testing
                </div>
              </div>

              {/* Phase 4 Item */}
              <div style={{ display: "flex", justifyContent: "center" }}>
                <div
                  style={{
                    backgroundColor: "#FFFFFF",
                    borderRadius: "100px",
                    padding: "8px 18px",
                    color: "#000000",
                    fontFamily: "var(--font-urbanist), sans-serif",
                    fontSize: "13px",
                    fontWeight: 600,
                    whiteSpace: "nowrap",
                  }}
                >
                  Pilot Run & Mass Mfg
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 7. WHAT SHIPPED */}
        <div style={{ display: "flex", flexDirection: "column", gap: "24px", width: "100%" }}>
          <h2
            style={{
              margin: 0,
              fontFamily: "var(--font-cal-sans), sans-serif",
              fontSize: "clamp(1.75rem, 1.375rem + 1.528vw, 2.75rem)",
              fontWeight: 400,
              color: "#000000",
              textTransform: "uppercase",
            }}
          >
            WHAT <span style={{ color: "#FF7018" }}>SHIPPED</span>
          </h2>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "var(--pd-cols-4)",
              gap: "20px",
              marginTop: "8px",
            }}
          >
            {[
              { value: "<8MS", desc: "Ultra-Low Latency to Output" },
              { value: "0", desc: "False Triggers or Crosstalk Errors" },
              { value: "30+", desc: "Musical Presets Supported" },
              { value: "1", desc: "Patent-Ready Architecture" },
            ].map((stat, idx) => (
              <div
                key={idx}
                style={{
                  backgroundColor: "#F5F5F5",
                  borderRadius: "14px",
                  padding: "28px 24px",
                  display: "flex",
                  flexDirection: "column",
                  gap: "8px",
                  boxSizing: "border-box",
                }}
              >
                <span
                  style={{
                    fontFamily: "var(--font-cal-sans), sans-serif",
                    fontSize: "36px",
                    fontWeight: 400,
                    color: "#FF7018",
                  }}
                >
                  {stat.value}
                </span>
                <span
                  style={{
                    fontFamily: "var(--font-urbanist), sans-serif",
                    fontSize: "14px",
                    fontWeight: 500,
                    color: "#555555",
                  }}
                >
                  {stat.desc}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* 8. FROM BENCH TO SHELL */}
        <div style={{ display: "flex", flexDirection: "column", gap: "24px", width: "100%" }}>
          <h2
            style={{
              margin: 0,
              fontFamily: "var(--font-cal-sans), sans-serif",
              fontSize: "clamp(1.75rem, 1.375rem + 1.528vw, 2.75rem)",
              fontWeight: 400,
              color: "#000000",
              textTransform: "uppercase",
            }}
          >
            FROM BENCH TO <span style={{ color: "#FF7018" }}>SHELL</span>
          </h2>

          <div
            style={{
              display: "flex",
              flexDirection: "row",
              gap: "24px",
              width: "100%",
              minHeight: "520px",
              marginTop: "8px",
            }}
          >
            {/* Left Large Image Card (573 × 520 px) */}
            <div
              style={{
                width: "100%",
                minHeight: "520px",
                borderRadius: "16px",
                overflow: "hidden",
                backgroundColor: "#000000",
                position: "relative",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Image
                src="/homepage_assets/featured_project_images/white_moontype.png"
                alt="PolyPan Handpan Shell"
                width={420}
                height={420}
                style={{ objectFit: "contain" }}
              />
            </div>

            {/* Right Column: 2 Images (573 × 248 px each) from public/project_page */}
            <div
              style={{
                width: "100%",
                minHeight: "520px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
              }}
            >
              <div
                style={{
                  width: "100%",
                  minHeight: "248px",
                  borderRadius: "16px",
                  overflow: "hidden",
                  position: "relative",
                  backgroundColor: "#000000",
                }}
              >
                <Image
                  src="/project_page/image1 of from bench to shell.png"
                  alt="From bench to shell - Optical and PCB Sensor Wave"
                  fill
                  sizes="573px"
                  style={{ objectFit: "cover" }}
                />
              </div>

              <div
                style={{
                  width: "100%",
                  minHeight: "248px",
                  borderRadius: "16px",
                  overflow: "hidden",
                  position: "relative",
                  backgroundColor: "#000000",
                }}
              >
                <Image
                  src="/project_page/image2 of from bench to shell.png"
                  alt="From bench to shell - Touch Architecture Stack"
                  fill
                  sizes="573px"
                  style={{ objectFit: "cover" }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* 9. CTA CARD BANNER */}
        <div
          style={{
            width: "100%",
            minHeight: "328px",
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
            marginTop: "20px",
          }}
        >
          <h2
            style={{
              margin: 0,
              fontFamily: "var(--font-cal-sans), sans-serif",
              fontSize: "clamp(1.75rem, 1.375rem + 1.528vw, 2.75rem)",
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
              maxWidth: "680px",
              fontFamily: "var(--font-urbanist), sans-serif",
              fontSize: "16px",
              fontWeight: 500,
              color: "#FFFFFF",
              lineHeight: "150%",
            }}
          >
            Tell us what you're building, whether it's on paper, in CAD, or half-coded, and we'll help you bring it to life.
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
        </div>
      </section>

      {/* =========================================================================
          SECTION 3: FOOTER & INTERACTIVE CHAT WIDGET
          Black #000000 background
          ========================================================================= */}
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
    </main>
  );
}
