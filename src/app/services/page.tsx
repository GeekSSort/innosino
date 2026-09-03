"use client";

import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import FloatingNavbar from "@/components/navigation/FloatingNavbar";

// Process Steps Data (Section: 1498:14592)
const processStages = [
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
  {
    stage: "Stage 04",
    title: "Bring-up & Testing",
    desc: "Hands-on bring-up, signal probing, and stress testing to surface edge cases before pilot production runs.",
  },
  {
    stage: "Stage 05",
    title: "DFM Review & Production Handoff",
    desc: "A final manufacturability pass, then a documentation package your contract manufacturer can build from directly.",
  },
];

// On-Demand Services Data (Section: 1498:14628)
const onDemandServices = [
  {
    num: "01",
    title: "Schematic Capture",
    desc: "Circuit design and component selection built around your BOM and cost targets.",
  },
  {
    num: "02",
    title: "PCB Layout & Routing",
    desc: "Placement and routing across single to high-density multilayer stack-ups.",
  },
  {
    num: "03",
    title: "Signal Integrity & EMI/EMC",
    desc: "Impedance-controlled routing and grounding strategy, planned before layout begins.",
  },
  {
    num: "04",
    title: "DFM / DFA Review",
    desc: "Every board checked against real assembly tolerances before it reaches fabrication.",
  },
  {
    num: "05",
    title: "Prototyping & Bring-up",
    desc: "Fast-turn prototypes and hands-on bring-up so issues surface in the lab.",
  },
  {
    num: "06",
    title: "Testing & Validation",
    desc: "Functional and environmental testing against the product's real operating conditions.",
  },
  {
    num: "07",
    title: "Component Sourcing",
    desc: "BOM management with sourcing and availability checks against your target volumes.",
  },
];

// Representative Work Data (Section: 1498:14674)
const representativeProjects = [
  {
    category: "SMART IoT",
    title: "Sensor Node & Gateway Boards",
    desc: "Multilayer control boards for field sensors and gateways wireless connectivity, low-power design, and connector layouts built for industrial enclosures.",
    image: "/service_page/Sensor Node & Gateway Boards.jpg",
  },
  {
    category: "BIOMEDICAL",
    title: "Wearable & Monitoring Boards",
    desc: "Space-constrained PCB layouts for wearable and biomedical devices, engineered for low power consumption, reliable EMI performance, and seamless integration into compact, skin-safe enclosures.",
    image: "/service_page/Wearable & Monitoring Boards.png",
  },
  {
    category: "RENEWABLE ENERGY",
    title: "Power & Metering Boards",
    desc: "High-current PCB layouts for power conversion and smart metering systems, engineered with optimized trace routing, thermal management, and stack-up planning for reliable, long-term performance.",
    image: "/service_page/Power & Metering Boards.png",
  },
];

// Why Us Data (Section: 1498:14733)
const whyUsPoints = [
  {
    num: "01",
    title: "Engineering + Innovation",
    desc: "We design to your specifications while identifying overlooked details that help prevent issues before production.",
  },
  {
    num: "02",
    title: "Cost Optimized Development",
    desc: "Stack-up, placement, and routing with impedance, thermal, and EMI considerations built into the layout itself.",
  },
  {
    num: "03",
    title: "Full Cycle, One Team",
    desc: "Idea through production under one roof no gap between the schematic team and the people who build it.",
  },
  {
    num: "04",
    title: "Manufacturing Ready Files",
    desc: "Documentation that matches the silkscreen, so your contract manufacturer builds it right the first time.",
  },
  {
    num: "05",
    title: "Cross Industry Experience",
    desc: "From consumer electronics to biomedical we bring constraints from one industry into another.",
  },
  {
    num: "06",
    title: "Direct Engineering Access",
    desc: "You talk to the engineer laying out your board, not a project manager relaying messages.",
  },
];

// FAQ Data (Section: 1498:14775)
const faqs = [
  {
    q: "What does the Hardware & PCB Design service include?",
    a: "Our Hardware & PCB design service covers schematic architecture, component sourcing & BOM management, multilayer PCB stack-up design, impedance control, SI/PI analysis, DFM/DFA fabrication checks, fast-turn prototyping, and full manufacturing documentation handoff.",
  },
  {
    q: "How many layers can you design for?",
    a: "We routinely engineer 2 to 16+ layer boards ranging from standard double-sided microcontrollers to high-density interconnect (HDI) multilayer RF and FPGA carrier boards.",
  },
  {
    q: "What tools and platforms do you design around?",
    a: "Layout is done in Altium Designer. The STM32 family covers most of our control and processing designs, with FreeRTOS and LVGL for the firmware and display layer.",
  },
  {
    q: "Do you support the handoff to manufacturing?",
    a: "Yes. We generate turnkey manufacturing packages including Gerbers, drill files, IPC-2581/ODB++ packages, pick-and-place files, and detailed assembly drawings. We also coordinate directly with fabrication and assembly houses.",
  },
  {
    q: "Can you take over a board that's already in progress?",
    a: "Absolutely. We can perform schematic & layout reviews, identify bugs or EMI issues, optimize the BOM for supply chain constraints, or redesign existing layouts for cost reduction and scale.",
  },
];

// Industries for auto-slider
const industriesList = [
  { title: "Consumer Electronics", image: "/homepage_assets/industries/Consumer Electronics.jpg" },
  { title: "Renewable Energy", image: "/homepage_assets/industries/Renewable Energy.jpg" },
  { title: "Industrial Automation", image: "/homepage_assets/industries/Industrial Automation.png" },
  { title: "Smart IOT", image: "/homepage_assets/industries/Smart IOT.png" },
  { title: "Engineering Education", image: "/homepage_assets/industries/Engineering Education.png" },
  { title: "Digital Musical Instruments", image: "/homepage_assets/industries/Digital Musical Instruments.png" },
  { title: "Biomedical Electronics", image: "/homepage_assets/industries/Biomedical Electronics.png" },
  { title: "NFC and RFID Technology", image: "/homepage_assets/industries/NFC and RFID Technology.png" },
];

// Partner Logos for continuous right-to-left sliding marquee
const partnerLogos = [
  { name: "Adobe", color: "#FA0F00", symbol: "A" },
  { name: "GitLab", color: "#FC6D26", symbol: "🦊" },
  { name: "pendo", color: "#FF3366", symbol: "✦" },
  { name: "hotjar", color: "#FD3A00", symbol: "🔥" },
  { name: "Fivetran", color: "#006BFF", symbol: "彡" },
  { name: "Airwallex", color: "#000000", symbol: "❖" },
  { name: "ROS", color: "#FF4A00", symbol: "●" },
  { name: "Matter", color: "#000000", symbol: "⬡" },
  { name: "FreeRTOS", color: "#0083D7", symbol: "▲" },
  { name: "Altium", color: "#A87A24", symbol: "✦" },
];

export default function ServicePage() {
  const [openFaq, setOpenFaq] = useState<number | null>(2); // Default open: index 2
  const [chatOpen, setChatOpen] = useState(true);
  const [sliderX, setSliderX] = useState(0);
  const [partnersSliderX, setPartnersSliderX] = useState(0);

  const heroVideoRef = useRef<HTMLVideoElement>(null);
  const circuitVideoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (heroVideoRef.current) {
      heroVideoRef.current.play().catch(() => {});
    }
    if (circuitVideoRef.current) {
      circuitVideoRef.current.play().catch(() => {});
    }
  }, []);

  // Continuous auto-sliding for industry carousel
  useEffect(() => {
    let animId: number;
    const itemWidth = 400;
    const totalWidth = industriesList.length * itemWidth;

    const animate = () => {
      setSliderX((prev) => (prev + 0.8) % totalWidth);
      animId = requestAnimationFrame(animate);
    };

    animId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animId);
  }, []);

  // Continuous auto-sliding for partner logos (right to left)
  useEffect(() => {
    let animId: number;
    const itemWidth = 260;
    const totalWidth = partnerLogos.length * itemWidth;

    const animate = () => {
      setPartnersSliderX((prev) => (prev + 0.6) % totalWidth);
      animId = requestAnimationFrame(animate);
    };

    animId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animId);
  }, []);

  const displayIndustries = [...industriesList, ...industriesList, ...industriesList];
  const displayPartners = [...partnerLogos, ...partnerLogos, ...partnerLogos, ...partnerLogos];

  return (
    <main
      style={{
        position: "relative",
        width: "1440px",
        overflow: "hidden",
        backgroundColor: "#000000",
        margin: "0 auto",
      }}
    >
      {/* =========================================================================
          SECTION 1: SERVICE HERO SECTION (Node 1498:14571, x: 0, y: 0, w: 1440, h: 684)
          Overlapping PCB Video: Node 1498:14585 (x: 235, y: 549, w: 970, h: 546)
          ========================================================================= */}
      <section
        style={{
          position: "relative",
          width: "1440px",
          height: "684px",
          backgroundColor: "#000000",
          overflow: "visible",
        }}
      >
        {/* Background Video: Node 1498:14572 */}
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
              backgroundColor: "rgba(0, 0, 0, 0.4)",
              pointerEvents: "none",
            }}
          />
        </div>

        {/* Logo: Node 1498:14573 (x: 135, y: 60, w: 236, h: 32) */}
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

        {/* Hero Content Frame: Node 1498:14574 (x: 134, y: 112, w: 1171, h: 199) */}
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
          {/* Breadcrumb: SERVICES > HARDWARE & PCB DESIGN */}
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              gap: "10px",
              height: "24px",
            }}
          >
            <div
              style={{
                width: "24px",
                height: "24px",
                borderRadius: "50%",
                background: "linear-gradient(135deg, #FF7018 0%, #FFBE03 100%)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <span style={{ fontSize: "10px", fontWeight: 800, color: "#000" }}>●</span>
            </div>
            <span
              style={{
                fontFamily: "'Urbanist', sans-serif",
                fontSize: "16px",
                fontWeight: 600,
                color: "#FF7018",
                textTransform: "uppercase",
              }}
            >
              SERVICES
            </span>
            <span
              style={{
                fontFamily: "'Urbanist', sans-serif",
                fontSize: "16px",
                fontWeight: 600,
                color: "#FF7018",
              }}
            >
              ›
            </span>
            <span
              style={{
                fontFamily: "'Urbanist', sans-serif",
                fontSize: "16px",
                fontWeight: 600,
                color: "#FF7018",
                textTransform: "uppercase",
              }}
            >
              HARDWARE & PCB DESIGN
            </span>
          </div>

          {/* Title */}
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
            HARDWARE & PCB DESIGN
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
            We transform schematic concepts into production-ready PCB designs, delivering reliable
            circuit and layout engineering built for real-world performance and seamless manufacturing.
          </p>
        </div>

        {/* Floating Navbar: Node 1498:14584 (x: 134, y: 401, w: 582, h: 68) */}
        <div
          style={{
            position: "absolute",
            left: "134px",
            top: "401px",
            zIndex: 30,
          }}
        >
          <FloatingNavbar styleOverride={{ position: "relative", left: "auto", top: "auto" }} />
        </div>

        {/* Overlapping Hero PCB Video Card: Node 1498:14585 (x: 235, y: 549, w: 970, h: 546) */}
        <div
          style={{
            position: "absolute",
            left: "235px",
            top: "549px",
            width: "970px",
            height: "546px",
            borderRadius: "18px",
            overflow: "hidden",
            boxShadow: "0 24px 80px rgba(0, 0, 0, 0.35)",
            border: "2px solid rgba(255, 112, 24, 0.4)",
            backgroundColor: "#000000",
            zIndex: 25,
          }}
        >
          <video
            ref={circuitVideoRef}
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
            <source src="/service_page/Service -Video.mp4" type="video/mp4" />
          </video>
        </div>
      </section>

      {/* =========================================================================
          SECTION 2: TRUSTED BY & PARTNERS (Node 1498:14587, y: 1169 to 1439, w: 1440, h: 270)
          Clearance allocated so the overlapping PCB video card (bottom: 1095px) has 74px breathing room
          before the TRUSTED BY heading at y: 1169px. Features continuous right-to-left sliding marquee
          with left and right edge fading.
          ========================================================================= */}
      <section
        style={{
          position: "relative",
          width: "1440px",
          minHeight: "755px",
          backgroundColor: "#FFFFFF",
          boxSizing: "border-box",
          paddingTop: "485px", // 684px hero + 485px = 1169px exact Figma offset
          marginTop: "0px",
          overflow: "hidden",
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-start",
        }}
      >
        {/* Title */}
        <div style={{ textAlign: "center", marginBottom: "36px", position: "relative", zIndex: 10 }}>
          <h2
            style={{
              margin: 0,
              fontFamily: "'Cal Sans', 'Outfit', sans-serif",
              fontSize: "24px",
              fontWeight: 400,
              color: "#666666",
              letterSpacing: "0.04em",
            }}
          >
            TRUSTED BY 30+ Global Partners & Collaborations
          </h2>
        </div>

        {/* Sliding Marquee Container with Left and Right Edge Fade Gradients */}
        <div
          style={{
            position: "relative",
            width: "1440px",
            overflow: "hidden",
            display: "flex",
            flexDirection: "column",
            gap: "28px",
          }}
        >
          {/* Left Edge Fade Gradient */}
          <div
            style={{
              position: "absolute",
              left: 0,
              top: 0,
              bottom: 0,
              width: "200px",
              background: "linear-gradient(90deg, rgba(255,255,255,1) 0%, rgba(255,255,255,0) 100%)",
              zIndex: 10,
              pointerEvents: "none",
            }}
          />

          {/* Right Edge Fade Gradient */}
          <div
            style={{
              position: "absolute",
              right: 0,
              top: 0,
              bottom: 0,
              width: "200px",
              background: "linear-gradient(270deg, rgba(255,255,255,1) 0%, rgba(255,255,255,0) 100%)",
              zIndex: 10,
              pointerEvents: "none",
            }}
          />

          {/* Row 1: Sliding Right to Left */}
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              gap: "64px",
              transform: `translateX(-${partnersSliderX}px)`,
              willChange: "transform",
              alignItems: "center",
              width: "max-content",
            }}
          >
            {displayPartners.map((brand, bIdx) => (
              <div
                key={`r1-${bIdx}`}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                  fontFamily: "'Urbanist', sans-serif",
                  fontWeight: 700,
                  fontSize: "22px",
                  color: brand.color,
                  letterSpacing: "0.02em",
                  flexShrink: 0,
                }}
              >
                <span
                  style={{
                    fontSize: brand.name === "Adobe" ? "24px" : "18px",
                    fontWeight: 900,
                    color: brand.color,
                  }}
                >
                  {brand.symbol}
                </span>
                <span>{brand.name}</span>
              </div>
            ))}
          </div>

          {/* Row 2: Sliding Right to Left with offset */}
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              gap: "64px",
              transform: `translateX(-${(partnersSliderX * 1.15 + 180) % (partnerLogos.length * 260)}px)`,
              willChange: "transform",
              alignItems: "center",
              width: "max-content",
            }}
          >
            {displayPartners.map((brand, bIdx) => (
              <div
                key={`r2-${bIdx}`}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                  fontFamily: "'Urbanist', sans-serif",
                  fontWeight: 700,
                  fontSize: "22px",
                  color: brand.color,
                  letterSpacing: "0.02em",
                  flexShrink: 0,
                }}
              >
                <span
                  style={{
                    fontSize: brand.name === "Adobe" ? "24px" : "18px",
                    fontWeight: 900,
                    color: brand.color,
                  }}
                >
                  {brand.symbol}
                </span>
                <span>{brand.name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 3: OUR HARDWARE & PCB DESIGN PROCESS (Node 1498:14592, y: 1439, w: 1440, h: 777)
          ========================================================================= */}
      <section
        style={{
          position: "relative",
          width: "1440px",
          minHeight: "777px",
          backgroundColor: "#F6F6F6",
          boxSizing: "border-box",
          padding: "64px 135px",
        }}
      >
        <div style={{ marginBottom: "48px" }}>
          <h2
            style={{
              margin: 0,
              fontFamily: "'Cal Sans', 'Outfit', sans-serif",
              fontSize: "36px",
              fontWeight: 400,
              color: "#000000",
              textTransform: "uppercase",
            }}
          >
            OUR HARDWARE & PCB DESIGN <span style={{ color: "#FF7018" }}>PROCESS</span>
          </h2>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "24px", width: "1170px" }}>
          {/* Top Row: Stages 1, 2, 3 */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "24px" }}>
            {processStages.slice(0, 3).map((item) => (
              <div
                key={item.stage}
                style={{
                  height: "230px",
                  borderRadius: "16px",
                  backgroundColor: "#FFFFFF",
                  padding: "32px 28px",
                  boxSizing: "border-box",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  boxShadow: "0 4px 24px rgba(0,0,0,0.03)",
                }}
              >
                <span
                  style={{
                    fontFamily: "'Urbanist', sans-serif",
                    fontSize: "14px",
                    fontWeight: 700,
                    color: "#FF7018",
                    textTransform: "uppercase",
                  }}
                >
                  {item.stage}
                </span>
                <div>
                  <h3
                    style={{
                      margin: "0 0 8px 0",
                      fontFamily: "'Urbanist', sans-serif",
                      fontSize: "20px",
                      fontWeight: 700,
                      color: "#000000",
                    }}
                  >
                    {item.title}
                  </h3>
                  <p
                    style={{
                      margin: 0,
                      fontFamily: "'Urbanist', sans-serif",
                      fontSize: "14px",
                      fontWeight: 500,
                      lineHeight: "150%",
                      color: "#666666",
                    }}
                  >
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Bottom Row: Stages 4, 5 */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "24px" }}>
            {processStages.slice(3, 5).map((item) => (
              <div
                key={item.stage}
                style={{
                  height: "230px",
                  borderRadius: "16px",
                  backgroundColor: "#FFFFFF",
                  padding: "32px 28px",
                  boxSizing: "border-box",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  boxShadow: "0 4px 24px rgba(0,0,0,0.03)",
                }}
              >
                <span
                  style={{
                    fontFamily: "'Urbanist', sans-serif",
                    fontSize: "14px",
                    fontWeight: 700,
                    color: "#FF7018",
                    textTransform: "uppercase",
                  }}
                >
                  {item.stage}
                </span>
                <div>
                  <h3
                    style={{
                      margin: "0 0 8px 0",
                      fontFamily: "'Urbanist', sans-serif",
                      fontSize: "20px",
                      fontWeight: 700,
                      color: "#000000",
                    }}
                  >
                    {item.title}
                  </h3>
                  <p
                    style={{
                      margin: 0,
                      fontFamily: "'Urbanist', sans-serif",
                      fontSize: "14px",
                      fontWeight: 500,
                      lineHeight: "150%",
                      color: "#666666",
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
          SECTION 4: OUR ON-DEMAND HARDWARE SERVICES (Node 1498:14628, y: 2216, w: 1440, h: 995)
          ========================================================================= */}
      <section
        style={{
          position: "relative",
          width: "1440px",
          minHeight: "995px",
          backgroundColor: "#FFFFFF",
          boxSizing: "border-box",
          padding: "64px 135px",
        }}
      >
        <div style={{ marginBottom: "48px" }}>
          <h2
            style={{
              margin: 0,
              fontFamily: "'Cal Sans', 'Outfit', sans-serif",
              fontSize: "36px",
              fontWeight: 400,
              color: "#000000",
              textTransform: "uppercase",
            }}
          >
            OUR ON-DEMAND HARDWARE <span style={{ color: "#FF7018" }}>SERVICES</span>
          </h2>
        </div>

        <div style={{ display: "flex", flexDirection: "column", borderTop: "1px solid #EAEAEA", width: "1170px" }}>
          {onDemandServices.map((service) => (
            <div
              key={service.num}
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "28px 0",
                borderBottom: "1px solid #EAEAEA",
              }}
            >
              <span
                style={{
                  width: "48px",
                  fontFamily: "'Urbanist', sans-serif",
                  fontSize: "16px",
                  fontWeight: 600,
                  color: "#FF7018",
                }}
              >
                {service.num}
              </span>
              <h3
                style={{
                  margin: 0,
                  width: "340px",
                  fontFamily: "'Urbanist', sans-serif",
                  fontSize: "24px",
                  fontWeight: 600,
                  color: "#000000",
                }}
              >
                {service.title}
              </h3>
              <p
                style={{
                  margin: 0,
                  width: "560px",
                  fontFamily: "'Urbanist', sans-serif",
                  fontSize: "16px",
                  fontWeight: 400,
                  lineHeight: "150%",
                  color: "#666666",
                }}
              >
                {service.desc}
              </p>
              <div style={{ width: "32px", display: "flex", justifyContent: "flex-end", color: "#999999" }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M7 17L17 7M17 7H7M17 7V17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* =========================================================================
          SECTION 5: REPRESENTATIVE WORK (Node 1498:14674, y: 3211, w: 1440, h: 1522)
          ========================================================================= */}
      <section
        style={{
          position: "relative",
          width: "1440px",
          minHeight: "1522px",
          backgroundColor: "#000000",
          boxSizing: "border-box",
          padding: "64px 135px",
        }}
      >
        <div style={{ marginBottom: "48px" }}>
          <h2
            style={{
              margin: 0,
              fontFamily: "'Cal Sans', 'Outfit', sans-serif",
              fontSize: "36px",
              fontWeight: 400,
              color: "#FFFFFF",
              textTransform: "uppercase",
            }}
          >
            REPRESENTATIVE <span style={{ color: "#FF7018" }}>WORK</span>
          </h2>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "40px", width: "1170px" }}>
          {representativeProjects.map((proj) => (
            <div
              key={proj.title}
              style={{
                width: "1170px",
                height: "444px",
                borderRadius: "20px",
                backgroundColor: "#111111",
                border: "1px solid rgba(255, 255, 255, 0.12)",
                overflow: "hidden",
                display: "flex",
                flexDirection: "row",
                boxSizing: "border-box",
                padding: "36px 40px",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <div style={{ width: "520px", display: "flex", flexDirection: "column", justifyContent: "space-between", height: "100%" }}>
                <div>
                  <span
                    style={{
                      fontFamily: "'Urbanist', sans-serif",
                      fontSize: "14px",
                      fontWeight: 700,
                      color: "#FF7018",
                      textTransform: "uppercase",
                      letterSpacing: "0.08em",
                    }}
                  >
                    ● {proj.category}
                  </span>
                  <h3
                    style={{
                      margin: "16px 0 16px 0",
                      fontFamily: "'Cal Sans', 'Outfit', sans-serif",
                      fontSize: "32px",
                      fontWeight: 400,
                      color: "#FFFFFF",
                    }}
                  >
                    {proj.title}
                  </h3>
                  <p
                    style={{
                      margin: 0,
                      fontFamily: "'Urbanist', sans-serif",
                      fontSize: "16px",
                      fontWeight: 400,
                      lineHeight: "150%",
                      color: "#AAAAAA",
                    }}
                  >
                    {proj.desc}
                  </p>
                </div>

                <Link
                  href="#contact"
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "8px",
                    width: "fit-content",
                    padding: "12px 28px",
                    borderRadius: "100px",
                    background: "linear-gradient(135deg, #FF7018 0%, #FFBE03 100%)",
                    color: "#000000",
                    fontFamily: "'Urbanist', sans-serif",
                    fontSize: "15px",
                    fontWeight: 600,
                    textDecoration: "none",
                  }}
                >
                  <span>Book a Call</span>
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M2.5 9.5L9.5 2.5M9.5 2.5H4M9.5 2.5V8" stroke="#000000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </Link>
              </div>

              <div
                style={{
                  position: "relative",
                  width: "520px",
                  height: "360px",
                  borderRadius: "16px",
                  overflow: "hidden",
                  backgroundColor: "#222222",
                }}
              >
                <Image src={proj.image} alt={proj.title} fill sizes="520px" style={{ objectFit: "cover" }} />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* =========================================================================
          SECTION 6: WHY IS INNOSINO THE RIGHT PARTNER (Node 1498:14733, y: 4733, w: 1440, h: 777)
          ========================================================================= */}
      <section
        style={{
          position: "relative",
          width: "1440px",
          minHeight: "777px",
          backgroundColor: "#F6F6F6",
          boxSizing: "border-box",
          padding: "64px 135px",
        }}
      >
        <div style={{ marginBottom: "48px" }}>
          <h2
            style={{
              margin: 0,
              fontFamily: "'Cal Sans', 'Outfit', sans-serif",
              fontSize: "36px",
              fontWeight: 400,
              color: "#000000",
              textTransform: "uppercase",
            }}
          >
            WHY IS INNOSINO THE RIGHT HARDWARE & PCB DESIGN <span style={{ color: "#FF7018" }}>PARTNER?</span>
          </h2>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "24px", width: "1170px" }}>
          {whyUsPoints.map((item) => (
            <div
              key={item.num}
              style={{
                height: "230px",
                borderRadius: "16px",
                backgroundColor: "#FFFFFF",
                padding: "32px 28px",
                boxSizing: "border-box",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                boxShadow: "0 4px 24px rgba(0,0,0,0.03)",
              }}
            >
              <span style={{ fontFamily: "'Urbanist', sans-serif", fontSize: "14px", fontWeight: 700, color: "#FF7018" }}>
                ● {item.num}
              </span>
              <div>
                <h3 style={{ margin: "0 0 8px 0", fontFamily: "'Urbanist', sans-serif", fontSize: "20px", fontWeight: 700, color: "#000000" }}>
                  {item.title}
                </h3>
                <p style={{ margin: 0, fontFamily: "'Urbanist', sans-serif", fontSize: "14px", fontWeight: 500, lineHeight: "150%", color: "#666666" }}>
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* =========================================================================
          SECTION 7: FREQUENTLY ASKED QUESTIONS (Node 1498:14775, y: 5510, w: 1440, h: 799)
          ========================================================================= */}
      <section
        style={{
          position: "relative",
          width: "1440px",
          minHeight: "799px",
          backgroundColor: "#FFFFFF",
          boxSizing: "border-box",
          padding: "64px 135px",
        }}
      >
        <div style={{ marginBottom: "48px" }}>
          <h2
            style={{
              margin: 0,
              fontFamily: "'Cal Sans', 'Outfit', sans-serif",
              fontSize: "36px",
              fontWeight: 400,
              color: "#000000",
              textTransform: "uppercase",
            }}
          >
            HAVE <span style={{ color: "#FF7018" }}>QUESTIONS?</span>
          </h2>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "16px", width: "1170px" }}>
          {faqs.map((faq, fIdx) => {
            const isOpen = openFaq === fIdx;
            return (
              <div
                key={faq.q}
                style={{
                  borderRadius: "12px",
                  border: "1px solid #EAEAEA",
                  backgroundColor: "#FFFFFF",
                  overflow: "hidden",
                  transition: "all 0.2s ease",
                }}
              >
                <button
                  type="button"
                  onClick={() => setOpenFaq(isOpen ? null : fIdx)}
                  style={{
                    width: "100%",
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                    padding: "24px",
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    textAlign: "left",
                  }}
                >
                  <span style={{ fontFamily: "'Urbanist', sans-serif", fontSize: "18px", fontWeight: 600, color: "#000000" }}>
                    {faq.q}
                  </span>
                  <span
                    style={{
                      fontSize: "20px",
                      color: "#999999",
                      transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
                      transition: "transform 0.2s ease",
                    }}
                  >
                    ▾
                  </span>
                </button>
                {isOpen && (
                  <div
                    style={{
                      padding: "0 24px 24px 24px",
                      fontFamily: "'Urbanist', sans-serif",
                      fontSize: "15px",
                      fontWeight: 400,
                      lineHeight: "150%",
                      color: "#666666",
                    }}
                  >
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* =========================================================================
          SECTION 8: INDUSTRY SOLUTIONS (Node 1498:14806, y: 6309, w: 1440, h: 590)
          ========================================================================= */}
      <section
        style={{
          position: "relative",
          width: "1440px",
          height: "590px",
          backgroundColor: "#000000",
          overflow: "hidden",
        }}
      >
        <div style={{ position: "absolute", left: "135px", top: "64px", width: "1170px", zIndex: 10 }}>
          <h2
            style={{
              margin: 0,
              fontFamily: "'Cal Sans', 'Outfit', sans-serif",
              fontSize: "32px",
              fontWeight: 400,
              color: "#FFFFFF",
              lineHeight: "140%",
            }}
          >
            Discover the industries we serve with innovative technology and smart
            engineering solutions for real-world challenges.
          </h2>
        </div>

        <div style={{ position: "absolute", left: 0, top: "208px", width: "100%", overflow: "hidden" }}>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              gap: "30px",
              transform: `translateX(-${sliderX}px)`,
              willChange: "transform",
            }}
          >
            {displayIndustries.map((item, idx) => (
              <div
                key={idx}
                style={{
                  position: "relative",
                  width: "370px",
                  height: "318px",
                  borderRadius: "16px",
                  overflow: "hidden",
                  flexShrink: 0,
                  backgroundColor: "#111111",
                }}
              >
                <Image src={item.image} alt={item.title} fill sizes="370px" style={{ objectFit: "cover" }} />
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    background: "linear-gradient(180deg, rgba(0,0,0,0) 40%, rgba(0,0,0,0.85) 100%)",
                  }}
                />
                <div style={{ position: "absolute", left: "24px", bottom: "24px", zIndex: 2 }}>
                  <h3 style={{ margin: 0, fontFamily: "'Urbanist', sans-serif", fontSize: "20px", fontWeight: 600, color: "#FFFFFF" }}>
                    {item.title}
                  </h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 9: CTA GLASS BANNER (Node 1498:14815, y: 6963, w: 1440, h: 528)
          Card is perfectly centered horizontally and vertically on pure white background.
          ========================================================================= */}
      <section
        style={{
          position: "relative",
          width: "1440px",
          minHeight: "528px",
          backgroundColor: "#FFFFFF",
          boxSizing: "border-box",
          padding: "64px 135px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            width: "1170px",
            height: "400px",
            borderRadius: "24px",
            background: "linear-gradient(135deg, rgba(255, 112, 24, 1) 26.9%, rgba(255, 190, 3, 1) 100%)",
            boxShadow: "0 24px 80px rgba(255, 112, 24, 0.4)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            textAlign: "center",
            padding: "48px",
            boxSizing: "border-box",
            gap: "20px",
          }}
        >
          <h2
            style={{
              margin: 0,
              fontFamily: "'Cal Sans', 'Outfit', sans-serif",
              fontSize: "40px",
              fontWeight: 400,
              color: "#FFFFFF",
              textTransform: "uppercase",
              letterSpacing: "0.02em",
            }}
          >
            HAVE AN IDEA? LET'S ENGINEER IT INTO A PRODUCT.
          </h2>

          <p
            style={{
              margin: 0,
              maxWidth: "580px",
              fontFamily: "'Urbanist', sans-serif",
              fontSize: "16px",
              fontWeight: 500,
              lineHeight: "150%",
              color: "rgba(255, 255, 255, 0.9)",
            }}
          >
            Tell us about your project hardware, firmware, or both. We'll
            come back with a clear path from concept to production.
          </p>

          <Link
            href="#contact"
            style={{
              marginTop: "12px",
              padding: "12px 28px",
              borderRadius: "100px",
              backgroundColor: "#000000",
              color: "#FFFFFF",
              fontFamily: "'Urbanist', sans-serif",
              fontSize: "16px",
              fontWeight: 500,
              textDecoration: "none",
              display: "flex",
              alignItems: "center",
              gap: "8px",
              boxShadow: "0 8px 24px rgba(0,0,0,0.3)",
            }}
          >
            <span>Book a Call</span>
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M2.5 9.5L9.5 2.5M9.5 2.5H4M9.5 2.5V8" stroke="#FFFFFF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Link>
        </div>
      </section>

      {/* =========================================================================
          SECTION 10: FOOTER & CHAT WIDGET (Node 1498:14837, y: 7427, w: 1440, h: 276)
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
          <FloatingNavbar styleOverride={{ position: "relative", left: "auto", top: "auto" }} />
        </div>

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
                Welcome to Innosino! Need help? Just reply to this message—we’re
                online and ready to assist you.
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
              { label: "Contact Us", href: "#contact" },
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
