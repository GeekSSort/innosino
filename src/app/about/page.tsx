"use client";

import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

// Testimonials data exactly from Figma geometry
const testimonials = [
  {
    quote:
      "“Working with this team was a game changer they truly understood our vision, solved key challenges, and delivered a production-ready solution on time.”",
    author: "Arif Rahman",
    role: "Founder & CEO, NexaTech Labs",
    avatar: "/homepage_assets/featured_project_images/white_moontype.png",
  },
  {
    quote:
      "“They brought deep technical expertise and a practical approach helping us move from idea to production faster than expected.”",
    author: "Tanvir Hossain",
    role: "CTO, VoltEdge Systems",
    avatar: "/homepage_assets/featured_project_images/guitar.png",
  },
  {
    quote:
      "“A reliable partner who understands both engineering and business delivering quality without compromise.”",
    author: "Nusrat Karim",
    role: "Co-Founder, Nexlify Tech",
    avatar: "/homepage_assets/featured_project_images/ai.png",
  },
  {
    quote:
      "“Strong communication, fast execution, and production ready outcomes exactly what we needed.”",
    author: "Fahim Rahman",
    role: "Founder, IoTWorks",
    avatar: "/homepage_assets/featured_project_images/blue & black image.png",
  },
];

export default function AboutPage() {
  const [chatOpen, setChatOpen] = useState(true);
  const heroVideoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (heroVideoRef.current) {
      heroVideoRef.current.playbackRate = 1.0;
      heroVideoRef.current.play().catch((err) => {
        console.warn("Autoplay was prevented:", err);
      });
    }
  }, []);

  return (
    <main
      style={{
        position: "relative",
        width: "1440px",
        minHeight: "4358px",
        overflow: "hidden",
        backgroundColor: "#000000",
        margin: "0 auto",
      }}
    >
      {/* =========================================================================
          SECTION 1: HERO SECTION (Node 1498:14274, x: 0, y: 0, w: 1440, h: 684)
          ========================================================================= */}
      <section
        style={{
          position: "relative",
          width: "1440px",
          height: "684px",
          overflow: "visible",
          backgroundColor: "#000000",
        }}
      >
        {/* Background Video (Node 1498:14275) with 0.32 black overlay */}
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
              backgroundColor: "rgba(0, 0, 0, 0.32)",
              pointerEvents: "none",
            }}
          />
        </div>

        {/* Brand Logo (Node 1498:14274 Logo, x: 134, y: 60, w: 236, h: 32) */}
        <div
          style={{
            position: "absolute",
            left: "134px",
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
            style={{
              objectFit: "contain",
              height: "32px",
              width: "auto",
            }}
            priority
          />
        </div>

        {/* Breadcrumb & Main Heading (Node 1498:14276, x: 134, y: 112, w: 1171, h: 192) */}
        <div
          style={{
            position: "absolute",
            left: "134px",
            top: "112px",
            width: "1171px",
            height: "192px",
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            gap: "24px",
            zIndex: 20,
          }}
        >
          {/* Breadcrumb (Sub Heading: HOME > ABOUT US) */}
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              gap: "8px",
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
              <span
                style={{
                  fontSize: "10px",
                  fontWeight: 800,
                  color: "#000",
                }}
              >
                ●
              </span>
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
              HOME
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
              ABOUT US
            </span>
          </div>

          {/* Headline Text: Node 1498:14284 (fontSize: 32px SemiBold 600, line-height: 150%, #FFFFFF) */}
          <h1
            style={{
              margin: 0,
              width: "1171px",
              fontFamily: "'Urbanist', sans-serif",
              fontSize: "32px",
              fontWeight: 600,
              lineHeight: "150%",
              color: "#FFFFFF",
              textAlign: "left",
            }}
          >
            We are an innovation-driven engineering company that transforms ideas
            into high-performance, market-ready products across embedded
            systems, electronics, smart energy, and industrial technologies.
          </h1>
        </div>

        {/* Floating Header / Navbar (Node 1498:14285, x: 134, y: 376, w: 582, h: 68) */}
        <div
          style={{
            position: "absolute",
            left: "134px",
            top: "376px",
            zIndex: 30,
          }}
        >
                  </div>

        {/* Floating Gradient Banner (Node 1498:14298 "5", x: 235, y: 524, w: 970, h: 384, overlap with next section) */}
        <div
          style={{
            position: "absolute",
            left: "235px",
            top: "524px",
            width: "970px",
            height: "384px",
            borderRadius: "18px",
            background:
              "linear-gradient(135deg, rgba(255, 112, 24, 1) 26.9%, rgba(255, 190, 3, 1) 100%)",
            boxShadow: "0 20px 60px rgba(255, 112, 24, 0.35)",
            zIndex: 25,
            overflow: "hidden",
            boxSizing: "border-box",
            padding: "48px 56px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <p
            style={{
              margin: 0,
              fontFamily: "'Urbanist', sans-serif",
              fontSize: "24px",
              fontWeight: 600,
              lineHeight: "150%",
              color: "#000000",
              textAlign: "left",
            }}
          >
            With over 20 years in electronics R&D, INNOSINO is built on a passion
            for true problem-solving and innovation. We identify problems, learn
            deeply, and engineer better solutions from the ground up. Our goal
            is to empower inventors and entrepreneurs to turn ideas into real,
            manufacturable, and impactful products.
          </p>
        </div>
      </section>

      {/* =========================================================================
          SECTION 2: VISION & MISSION (Node 1498:14263, x: 0, y: 684, w: 1440, h: 1119, bg: #FFFFFF)
          ========================================================================= */}
      <section
        style={{
          position: "relative",
          width: "1440px",
          height: "1119px",
          backgroundColor: "#FFFFFF",
          color: "#000000",
          boxSizing: "border-box",
          paddingTop: "260px", // clearance for overlapping banner
        }}
      >
        {/* Row 1: VISION (Node 1498:14264, x: 136, y: 319, w: 1169, h: 96) */}
        <div
          style={{
            position: "absolute",
            left: "136px",
            top: "319px",
            width: "1169px",
            height: "96px",
            display: "flex",
            flexDirection: "row",
            alignItems: "flex-start",
            gap: "48px",
          }}
        >
          {/* Label */}
          <div style={{ width: "163px", flexShrink: 0 }}>
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
              VISION
            </h2>
          </div>

          {/* Description */}
          <p
            style={{
              margin: 0,
              flex: 1,
              fontFamily: "'Urbanist', sans-serif",
              fontSize: "32px",
              fontWeight: 500,
              lineHeight: "150%",
              color: "#666666",
            }}
          >
            To become a globally trusted innovation partner the team companies
            call when an idea needs to become a real, working product.
          </p>
        </div>

        {/* Row 2: MISSION (Node 1498:14268, x: 135, y: 495, w: 1169, h: 96) */}
        <div
          style={{
            position: "absolute",
            left: "135px",
            top: "495px",
            width: "1169px",
            height: "96px",
            display: "flex",
            flexDirection: "row",
            alignItems: "flex-start",
            justifyContent: "space-between",
            gap: "48px",
          }}
        >
          {/* Description */}
          <p
            style={{
              margin: 0,
              width: "930px",
              fontFamily: "'Urbanist', sans-serif",
              fontSize: "32px",
              fontWeight: 500,
              lineHeight: "150%",
              color: "#666666",
            }}
          >
            We transform ideas into products, deliver engineering solutions,
            bridge R&D and manufacturing, and build lasting partnerships.
          </p>

          {/* Label */}
          <div style={{ width: "191px", flexShrink: 0, textAlign: "right" }}>
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
              MISSION
            </h2>
          </div>
        </div>

        {/* Architecture / Building Image Card (Node 1498:14272, x: 235, y: 655, w: 970, h: 400, radius: 18px) */}
        <div
          style={{
            position: "absolute",
            left: "235px",
            top: "655px",
            width: "970px",
            height: "400px",
            borderRadius: "18px",
            overflow: "hidden",
            boxShadow: "0 20px 60px rgba(0, 0, 0, 0.12)",
            backgroundColor: "#F0F0F0",
          }}
        >
          <Image
            src="/about_us/imageundervisionmission.png"
            alt="Innosino Building Architecture"
            fill
            sizes="970px"
            style={{ objectFit: "cover" }}
          />
        </div>
      </section>

      {/* =========================================================================
          SECTION 3: WHAT DRIVES US (Node 1498:14300, x: 0, y: 1803, w: 1440, h: 816, bg: #F2F2F2)
          ========================================================================= */}
      <section
        style={{
          position: "relative",
          width: "1440px",
          height: "816px",
          backgroundColor: "#F2F2F2",
          color: "#000000",
        }}
      >
        {/* Section Heading (Node 1498:14300 What Drives Us, x: 135, y: 64, w: 241, h: 47) */}
        <div
          style={{
            position: "absolute",
            left: "135px",
            top: "64px",
            width: "241px",
            height: "47px",
          }}
        >
          <h2
            style={{
              margin: 0,
              fontFamily: "'Cal Sans', 'Outfit', sans-serif",
              fontSize: "36px",
              fontWeight: 400,
              color: "#000000",
            }}
          >
            What Drives{" "}
            <span style={{ color: "#FF7018" }}>Us</span>
          </h2>
        </div>

        {/* 4 Feature Cards Vertical Stack (Node 1498:14302 Frame 1618873777, x: 735, y: 64, w: 570, h: 688) */}
        <div
          style={{
            position: "absolute",
            left: "735px",
            top: "64px",
            width: "570px",
            display: "flex",
            flexDirection: "column",
            gap: "24px",
          }}
        >
          {[
            {
              title: "Precision first",
              desc: "Every trace and line of firmware is engineered with precision for reliable, production-ready performance.",
            },
            {
              title: "Built to ship",
              desc: "We design for manufacturing from day one, not as an afterthought once the prototype works.",
            },
            {
              title: "Honest partnership",
              desc: "Clear timelines, clear costs, and direct answers even when the answer is not yet.",
            },
            {
              title: "Relentless iteration",
              desc: "We treat every revision as a chance to make the product faster, cheaper, or more reliable.",
            },
          ].map((card, i) => (
            <div
              key={card.title}
              style={{
                width: "570px",
                height: "154px",
                borderRadius: "16px",
                backgroundColor: "#FFFFFF",
                boxSizing: "border-box",
                padding: "24px 32px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                gap: "12px",
                boxShadow: "0 4px 24px rgba(0,0,0,0.04)",
              }}
            >
              <h3
                style={{
                  margin: 0,
                  fontFamily: "'Urbanist', sans-serif",
                  fontSize: "24px",
                  fontWeight: 600,
                  color: "#000000",
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
                  lineHeight: "150%",
                  color: "#666666",
                }}
              >
                {card.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* =========================================================================
          SECTION 4: WHAT OUR CLIENTS SAY (Node 1498:14320, x: 0, y: 2619, w: 1440, h: 509, bg: #FFFFFF)
          ========================================================================= */}
      <section
        style={{
          position: "relative",
          width: "1440px",
          height: "509px",
          backgroundColor: "#FFFFFF",
          overflow: "hidden",
        }}
      >
        {/* Title (Node 1498:14320 What Our Clients Say, x: 135, y: 64, w: 384, h: 47) */}
        <div
          style={{
            position: "absolute",
            left: "135px",
            top: "64px",
            width: "384px",
            height: "47px",
          }}
        >
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
            WHAT OUR CLIENTS <span style={{ color: "#FF7018" }}>SAY</span>
          </h2>
        </div>

        {/* Carousel / Cards Track (Node 1498:14321, x: 135, y: 175, w: 1570, h: 271) */}
        <div
          style={{
            position: "absolute",
            left: "135px",
            top: "175px",
            width: "1570px",
            display: "flex",
            flexDirection: "row",
            gap: "30px",
          }}
        >
          {testimonials.map((t, idx) => (
            <div
              key={idx}
              style={{
                width: "370px",
                height: "270px",
                borderRadius: "16px",
                backgroundColor: "#F8F8F8",
                boxSizing: "border-box",
                padding: "24px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                border: "1px solid #EAEAEA",
                flexShrink: 0,
              }}
            >
              <p
                style={{
                  margin: 0,
                  fontFamily: "'Urbanist', sans-serif",
                  fontSize: "15px",
                  fontWeight: 500,
                  lineHeight: "150%",
                  color: "#444444",
                }}
              >
                {t.quote}
              </p>

              {/* Author Box */}
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  gap: "12px",
                }}
              >
                <div
                  style={{
                    position: "relative",
                    width: "48px",
                    height: "48px",
                    borderRadius: "50%",
                    overflow: "hidden",
                    backgroundColor: "#111111",
                  }}
                >
                  <Image
                    src={t.avatar}
                    alt={t.author}
                    fill
                    sizes="48px"
                    style={{ objectFit: "cover" }}
                  />
                </div>
                <div>
                  <h4
                    style={{
                      margin: 0,
                      fontFamily: "'Urbanist', sans-serif",
                      fontSize: "16px",
                      fontWeight: 600,
                      color: "#000000",
                    }}
                  >
                    {t.author}
                  </h4>
                  <span
                    style={{
                      fontFamily: "'Urbanist', sans-serif",
                      fontSize: "13px",
                      color: "#777777",
                    }}
                  >
                    {t.role}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* =========================================================================
          SECTION 5: DRIVING INNOVATION THROUGH RESULTS (Node 1498:14404, x: 0, y: 3128, w: 1440, h: 426, bg: #000000)
          ========================================================================= */}
      <section
        style={{
          position: "relative",
          width: "1440px",
          height: "426px",
          backgroundColor: "#000000",
          color: "#FFFFFF",
        }}
      >
        {/* Title (Node 1498:14405, x: 135, y: 64, w: 664, h: 47) */}
        <div
          style={{
            position: "absolute",
            left: "135px",
            top: "64px",
            width: "664px",
            height: "47px",
          }}
        >
          <h2
            style={{
              margin: 0,
              fontFamily: "'Cal Sans', 'Outfit', sans-serif",
              fontSize: "36px",
              fontWeight: 400,
              textTransform: "uppercase",
              color: "#FFFFFF",
            }}
          >
            DRIVING INNOVATION THROUGH{" "}
            <span style={{ color: "#FF7018" }}>RESULTS</span>
          </h2>
        </div>

        {/* 4 Metrics Cards (Node 1498:14406 - 14418, y: 159, w: 270, h: 200, gap: 30px) */}
        <div
          style={{
            position: "absolute",
            left: "135px",
            top: "159px",
            width: "1170px",
            display: "flex",
            flexDirection: "row",
            gap: "30px",
          }}
        >
          {[
            {
              title: "Innovations Delivered",
              number: "15+",
              desc: "Turning bold ideas into real-world engineering solutions.",
            },
            {
              title: "Industry Sectors",
              number: "4",
              desc: "Delivering embedded solutions across diverse industries.",
            },
            {
              title: "Patents Filed",
              number: "2",
              desc: "Advancing innovation through proprietary technologies.",
            },
            {
              title: "Strategic Partnerships",
              number: "50",
              desc: "Collaborating with innovators to build the future.",
            },
          ].map((stat) => (
            <div
              key={stat.title}
              style={{
                width: "270px",
                height: "200px",
                borderRadius: "16px",
                backgroundColor: "rgba(255, 255, 255, 0.08)",
                border: "1px solid rgba(255, 255, 255, 0.12)",
                boxSizing: "border-box",
                padding: "24px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
              }}
            >
              <span
                style={{
                  fontFamily: "'Urbanist', sans-serif",
                  fontSize: "14px",
                  fontWeight: 600,
                  color: "#FFFFFF",
                }}
              >
                {stat.title}
              </span>

              <span
                style={{
                  fontFamily: "'Urbanist', sans-serif",
                  fontSize: "48px",
                  fontWeight: 700,
                  lineHeight: "1.1",
                  background:
                    "linear-gradient(135deg, #FF7018 0%, #FFBE03 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                {stat.number}
              </span>

              <p
                style={{
                  margin: 0,
                  fontFamily: "'Urbanist', sans-serif",
                  fontSize: "13px",
                  fontWeight: 400,
                  lineHeight: "140%",
                  color: "#AAAAAA",
                }}
              >
                {stat.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* =========================================================================
          SECTION 6: CTA GLASS BANNER (Node 1498:14351, x: 135, y: 3618, w: 1170, h: 400)
          ========================================================================= */}
      <section
        style={{
          position: "relative",
          width: "1440px",
          height: "464px",
          backgroundColor: "#000000",
          boxSizing: "border-box",
          paddingTop: "64px",
        }}
      >
        <div
          style={{
            margin: "0 auto",
            width: "1170px",
            height: "400px",
            borderRadius: "24px",
            background:
              "linear-gradient(135deg, rgba(255, 112, 24, 1) 26.9%, rgba(255, 190, 3, 1) 100%)",
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
            HAVE AN IDEA? LET&apos;S ENGINEER IT INTO A PRODUCT.
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
            Tell us about your project hardware, firmware, or both. We&apos;ll
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
            <svg
              width="12"
              height="12"
              viewBox="0 0 12 12"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M2.5 9.5L9.5 2.5M9.5 2.5H4M9.5 2.5V8"
                stroke="#FFFFFF"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </Link>
        </div>
      </section>

      {/* =========================================================================
          SECTION 7: FOOTER & CHAT WIDGET (Node 1498:14373, x: 0, y: 4082, w: 1440, h: 276, bg: #000000)
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
        {/* Floating Navbar Header (Node 1498:14384, x: 135, y: 64, w: 582, h: 68) */}
        <div
          style={{
            position: "absolute",
            left: "135px",
            top: "64px",
            zIndex: 30,
          }}
        >
                  </div>

        {/* Interactive Chat Widget (Node 1498:14397, x: 973, y: 39, w: 331, h: 141) */}
        <div
          style={{
            position: "absolute",
            left: "973px",
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

        {/* Bottom Copyright & Links Bar (Node 1498:14374, x: 135, y: 156, w: 1169, h: 56) */}
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
          <p
            style={{
              margin: 0,
              fontFamily: "'Urbanist', sans-serif",
              fontSize: "14px",
              fontWeight: 400,
              color: "rgba(255, 255, 255, 0.8)",
            }}
          >
            © 2026 Innosion All Rights Reserved
          </p>

          <div
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              gap: "24px",
            }}
          >
            {[
              { label: "Home", href: "/" },
              { label: "About Us", href: "/about" },
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

