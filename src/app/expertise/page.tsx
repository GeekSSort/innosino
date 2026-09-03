"use client";

import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

export default function ExpertisePage() {
  const [chatOpen, setChatOpen] = useState(true);
  const heroVideoRef = useRef<HTMLVideoElement>(null);
  const cardVideoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (heroVideoRef.current) {
      heroVideoRef.current.play().catch(() => {});
    }
    if (cardVideoRef.current) {
      cardVideoRef.current.play().catch(() => {});
    }
  }, []);

  const featureCards = [
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

  const toolsAndTech = [
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

  const processStagesRow1 = [
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

  const processStagesRow2 = [
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

  return (
    <main
      style={{
        position: "relative",
        width: "1440px",
        minHeight: "4231px",
        overflow: "hidden",
        backgroundColor: "#000000",
        margin: "0 auto",
      }}
    >
      {/* =========================================================================
          SECTION 1: HERO SECTION & OVERLAPPING HARDWARE CARD (Height: 684px)
          Video: /expertise_page_assets/Expertise.mp4
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
              src="/service_page/Service sevtion Hero.mp4"
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

        {/* Logo at (135, 60) */}
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

        {/* Hero Title & Breadcrumb Block (x: 134, y: 112) */}
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
          {/* Breadcrumb: HOME > EXPERTISE */}
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
                Home
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
                Expertise
              </span>
            </div>
          </div>

          {/* Heading: OUR EXPERTISE */}
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
            OUR EXPERTISE
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
            End-to-end embedded hardware development from system architecture and PCB design to firmware development, testing, and manufacturing handoff delivered through a unified, reliable, and efficient engineering toolchain.
          </p>
        </div>

        {/* Floating Navbar at (134, 401) */}
        <div style={{ position: "absolute", left: "134px", top: "401px", zIndex: 30 }}>
                  </div>

        {/* Overlapping Featured Hardware Visual Card (x: 235, y: 549, w: 970, h: 546) */}
        <div
          style={{
            position: "absolute",
            left: "235px",
            top: "549px",
            width: "970px",
            height: "546px",
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
            backgroundColor: "#0B0B0B",
          }}
        >
          <video
            ref={cardVideoRef}
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
              src="/expertise_page_assets/Expertise.mp4"
              type="video/mp4"
            />
          </video>
        </div>
      </section>

      {/* =========================================================================
          SECTION 2: WHY IS INNOSINO THE RIGHT HARDWARE & PCB DESIGN PARTNER?
          Height: 939px | y: 684 | paddingTop: 459px | Background: #FFFFFF
          ========================================================================= */}
      <section
        style={{
          position: "relative",
          width: "1440px",
          minHeight: "939px",
          backgroundColor: "#FFFFFF",
          boxSizing: "border-box",
          paddingTop: "459px",
          paddingLeft: "135px",
          paddingRight: "135px",
          paddingBottom: "80px",
          display: "flex",
          flexDirection: "column",
          gap: "48px",
        }}
      >
        {/* Section Heading */}
        <h2
          style={{
            margin: 0,
            fontFamily: "'Cal Sans', 'Outfit', sans-serif",
            fontSize: "36px",
            fontWeight: 400,
            color: "#000000",
            textTransform: "uppercase",
            lineHeight: "1.2",
          }}
        >
          WHY IS INNOSINO THE RIGHT HARDWARE & PCB DESIGN <span style={{ color: "#FF7018" }}>PARTNER?</span>
        </h2>

        {/* 3x2 Feature Cards Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 370px)",
            columnGap: "30px",
            rowGap: "30px",
            width: "1170px",
          }}
        >
          {featureCards.map((card, idx) => (
            <div
              key={idx}
              style={{
                width: "370px",
                height: "113px",
                borderRadius: "12px",
                backgroundColor: "#F1F1F1",
                boxSizing: "border-box",
                padding: "24px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                gap: "8px",
                transition: "transform 0.2s ease, box-shadow 0.2s ease",
              }}
            >
              <h3
                style={{
                  margin: 0,
                  fontFamily: "'Urbanist', sans-serif",
                  fontSize: "24px",
                  fontWeight: 600,
                  color: "#000000",
                  lineHeight: "1.2",
                }}
              >
                {card.title}
              </h3>
              <p
                style={{
                  margin: 0,
                  fontFamily: "'Urbanist', sans-serif",
                  fontSize: "16px",
                  fontWeight: 500,
                  color: "#666666",
                  lineHeight: "150%",
                }}
              >
                {card.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* =========================================================================
          SECTION 3: TOOLS & TECHNOLOGIES
          Height: 1028px | y: 1623 | Background: #F1F1F1
          ========================================================================= */}
      <section
        style={{
          position: "relative",
          width: "1440px",
          minHeight: "1028px",
          backgroundColor: "#F1F1F1",
          boxSizing: "border-box",
          padding: "64px 135px",
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "flex-start",
        }}
      >
        {/* Left Side: Sticky Title */}
        <div
          style={{
            position: "sticky",
            top: "64px",
            width: "400px",
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
              lineHeight: "1.2",
            }}
          >
            TOOLS & <span style={{ color: "#FF7018" }}>TECHNOLOGIES</span>
          </h2>
        </div>

        {/* Right Side: 6 Tool Cards Stack */}
        <div
          style={{
            width: "570px",
            display: "flex",
            flexDirection: "column",
            gap: "24px",
          }}
        >
          {toolsAndTech.map((item, idx) => (
            <div
              key={idx}
              style={{
                width: "570px",
                height: "130px",
                borderRadius: "14px",
                backgroundColor: "#FFFFFF",
                boxSizing: "border-box",
                padding: "24px 32px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                gap: "8px",
                boxShadow: "0 4px 20px rgba(0, 0, 0, 0.03)",
                transition: "transform 0.2s ease, box-shadow 0.2s ease",
              }}
            >
              <h3
                style={{
                  margin: 0,
                  fontFamily: "'Urbanist', sans-serif",
                  fontSize: "28px",
                  fontWeight: 700,
                  color: "#000000",
                  lineHeight: "1.2",
                }}
              >
                {item.title}
              </h3>
              <p
                style={{
                  margin: 0,
                  fontFamily: "'Urbanist', sans-serif",
                  fontSize: "16px",
                  fontWeight: 500,
                  color: "#666666",
                  lineHeight: "150%",
                }}
              >
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* =========================================================================
          SECTION 4: OUR HARDWARE & PCB DESIGN PROCESS
          Height: 777px | y: 2651 | Background: #FFFFFF
          ========================================================================= */}
      <section
        style={{
          position: "relative",
          width: "1440px",
          minHeight: "777px",
          backgroundColor: "#FFFFFF",
          boxSizing: "border-box",
          padding: "64px 135px 80px 135px",
          display: "flex",
          flexDirection: "column",
          gap: "48px",
        }}
      >
        {/* Section Heading */}
        <h2
          style={{
            margin: 0,
            fontFamily: "'Cal Sans', 'Outfit', sans-serif",
            fontSize: "44px",
            fontWeight: 400,
            color: "#000000",
            textTransform: "uppercase",
            lineHeight: "1.2",
          }}
        >
          OUR HARDWARE & PCB DESIGN <span style={{ color: "#FF7018" }}>PROCESS</span>
        </h2>

        {/* Process Cards Rows */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "30px",
            width: "1170px",
          }}
        >
          {/* Row 1: Stages 01, 02, 03 (3 x 370px) */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 370px)",
              gap: "30px",
              width: "1170px",
            }}
          >
            {processStagesRow1.map((item, idx) => (
              <div
                key={idx}
                style={{
                  width: "370px",
                  height: "262px",
                  borderRadius: "14px",
                  backgroundColor: "#F8F8F8",
                  border: "1px solid #ECECEC",
                  boxSizing: "border-box",
                  padding: "28px 24px",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  transition: "transform 0.2s ease, box-shadow 0.2s ease",
                }}
              >
                <span
                  style={{
                    fontFamily: "'Urbanist', sans-serif",
                    fontSize: "16px",
                    fontWeight: 700,
                    color: "#FF7018",
                  }}
                >
                  {item.stage}
                </span>

                <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                  <h3
                    style={{
                      margin: 0,
                      fontFamily: "'Urbanist', sans-serif",
                      fontSize: "22px",
                      fontWeight: 700,
                      color: "#000000",
                      lineHeight: "1.25",
                    }}
                  >
                    {item.title}
                  </h3>
                  <p
                    style={{
                      margin: 0,
                      fontFamily: "'Urbanist', sans-serif",
                      fontSize: "14px",
                      fontWeight: 400,
                      color: "#666666",
                      lineHeight: "150%",
                    }}
                  >
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Row 2: Stages 04, 05 (2 x 570px) */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(2, 570px)",
              gap: "30px",
              width: "1170px",
            }}
          >
            {processStagesRow2.map((item, idx) => (
              <div
                key={idx}
                style={{
                  width: "570px",
                  height: "262px",
                  borderRadius: "14px",
                  backgroundColor: "#F8F8F8",
                  border: "1px solid #ECECEC",
                  boxSizing: "border-box",
                  padding: "28px 28px",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  transition: "transform 0.2s ease, box-shadow 0.2s ease",
                }}
              >
                <span
                  style={{
                    fontFamily: "'Urbanist', sans-serif",
                    fontSize: "16px",
                    fontWeight: 700,
                    color: "#FF7018",
                  }}
                >
                  {item.stage}
                </span>

                <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                  <h3
                    style={{
                      margin: 0,
                      fontFamily: "'Urbanist', sans-serif",
                      fontSize: "22px",
                      fontWeight: 700,
                      color: "#000000",
                      lineHeight: "1.25",
                    }}
                  >
                    {item.title}
                  </h3>
                  <p
                    style={{
                      margin: 0,
                      fontFamily: "'Urbanist', sans-serif",
                      fontSize: "14px",
                      fontWeight: 400,
                      color: "#666666",
                      lineHeight: "150%",
                    }}
                  >
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 5: CTA CARD BANNER
          Height: 488px | y: 3492 | Background: #FFFFFF
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
            position: "relative",
            overflow: "hidden",
          }}
        >
          {/* Fluted glass background texture strips */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              display: "flex",
              flexDirection: "row",
              pointerEvents: "none",
              opacity: 0.15,
            }}
          >
            {[...Array(14)].map((_, i) => (
              <div
                key={i}
                style={{
                  flex: 1,
                  height: "100%",
                  borderRight: "1px solid rgba(255,255,255,0.4)",
                  background: i % 2 === 0 ? "rgba(255,255,255,0.08)" : "transparent",
                }}
              />
            ))}
          </div>

          <h2
            style={{
              margin: 0,
              fontFamily: "'Cal Sans', 'Outfit', sans-serif",
              fontSize: "44px",
              fontWeight: 400,
              color: "#FFFFFF",
              textTransform: "uppercase",
              lineHeight: "1.2",
              zIndex: 2,
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
              zIndex: 2,
            }}
          >
            Tell us about your project—hardware, firmware, or both. We’ll come back with a clear path from concept to production.
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
              zIndex: 2,
            }}
          >
            <span>Book a Call</span>
            <span style={{ fontSize: "12px" }}>↗</span>
          </Link>
        </div>
      </section>

      {/* =========================================================================
          SECTION 6: FOOTER & INTERACTIVE CHAT
          Height: 276px | Background: #000000
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
