"use client";

import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

export default function LifeAtInnosinoPage() {
  const [chatOpen, setChatOpen] = useState(true);
  const heroVideoRef = useRef<HTMLVideoElement>(null);
  const [carouselIndex, setCarouselIndex] = useState(1);

  // Carousel images
  const heroImages = [
    { src: "/lifeininnosino/12.jpg", alt: "Team collaboration" },
    { src: "/lifeininnosino/13.jpg", alt: "INNOSINO bright open office" },
    { src: "/lifeininnosino/14.jpg", alt: "Engineering brainstorming room" },
    { src: "/lifeininnosino/2.jpg", alt: "Electronics workbench" },
    { src: "/lifeininnosino/3.jpg", alt: "Team scrum & review" },
  ];

  const handlePrev = () => {
    setCarouselIndex((prev) => (prev === 0 ? heroImages.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCarouselIndex((prev) => (prev === heroImages.length - 1 ? 0 : prev + 1));
  };

  const getPrevIndex = () => (carouselIndex === 0 ? heroImages.length - 1 : carouselIndex - 1);
  const getNextIndex = () => (carouselIndex === heroImages.length - 1 ? 0 : carouselIndex + 1);

  useEffect(() => {
    if (heroVideoRef.current) {
      heroVideoRef.current.play().catch(() => {});
    }
  }, []);

  return (
    <main
      style={{
        position: "relative",
        width: "1440px",
        minHeight: "3451px",
        overflow: "hidden",
        backgroundColor: "#FFFFFF",
        margin: "0 auto",
      }}
    >
      {/* =========================================================================
          SECTION 1: HERO SECTION & OVERLAPPING CAROUSEL CARDS (Height: 684px)
          Video: /service_page/Service sevtion Hero.mp4
          ========================================================================= */}
      <section
        style={{
          position: "relative",
          width: "1440px",
          height: "684px",
          backgroundColor: "#CCCCCC",
          overflow: "visible",
        }}
      >
        {/* Hero Background Video */}
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
          {/* Breadcrumb: HOME > LIFE AT INNOSINO */}
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
                Life at Innosino
              </span>
            </div>
          </div>

          {/* Heading: LIFE AT INNOSINO */}
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
            LIFE AT INNOSINO
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
            Get a glimpse of life at INNOSINO—from team moments and office events to behind-the-scenes innovation and everyday collaboration.
          </p>
        </div>

        {/* Floating Navbar at (134, 401) */}
        <div style={{ position: "absolute", left: "134px", top: "401px", zIndex: 30 }}>
                  </div>

        {/* =========================================================================
            OVERLAPPING CAROUSEL (Left: -451, Center: 335, Right: 1121)
            ========================================================================= */}
        {/* Left Side Inactive Card (x: -451, y: 594, w: 770, h: 380) */}
        <div
          onClick={handlePrev}
          style={{
            position: "absolute",
            left: "-451px",
            top: "594px",
            width: "770px",
            height: "380px",
            borderRadius: "18px",
            backgroundColor: "#F1F1F1",
            overflow: "hidden",
            zIndex: 15,
            cursor: "pointer",
            opacity: 0.85,
            transition: "all 0.4s ease",
          }}
        >
          <Image
            src={heroImages[getPrevIndex()].src}
            alt={heroImages[getPrevIndex()].alt}
            fill
            style={{ objectFit: "cover" }}
          />
        </div>

        {/* Center Active Card (x: 335, y: 549, w: 770, h: 470) */}
        <div
          style={{
            position: "absolute",
            left: "335px",
            top: "549px",
            width: "770px",
            height: "470px",
            borderRadius: "18px",
            boxSizing: "border-box",
            zIndex: 25,
            border: "1.5px solid transparent",
            backgroundImage:
              "linear-gradient(rgba(255,255,255,1), rgba(255,255,255,1)), linear-gradient(90deg, rgba(255,112,24,1) 26.9%, rgba(255,190,3,1) 100%)",
            backgroundOrigin: "border-box",
            backgroundClip: "padding-box, border-box",
            overflow: "hidden",
            boxShadow: "0 30px 60px rgba(30, 30, 30, 0.2)",
            backgroundColor: "#FFFFFF",
            transition: "all 0.4s ease",
          }}
        >
          <Image
            src={heroImages[carouselIndex].src}
            alt={heroImages[carouselIndex].alt}
            fill
            style={{ objectFit: "cover" }}
            priority
          />
        </div>

        {/* Right Side Inactive Card (x: 1121, y: 594, w: 770, h: 380) */}
        <div
          onClick={handleNext}
          style={{
            position: "absolute",
            left: "1121px",
            top: "594px",
            width: "770px",
            height: "380px",
            borderRadius: "18px",
            backgroundColor: "#F1F1F1",
            overflow: "hidden",
            zIndex: 15,
            cursor: "pointer",
            opacity: 0.85,
            transition: "all 0.4s ease",
          }}
        >
          <Image
            src={heroImages[getNextIndex()].src}
            alt={heroImages[getNextIndex()].alt}
            fill
            style={{ objectFit: "cover" }}
          />
        </div>

        {/* Carousel Navigation Arrow Button - Left (White circle at x: 208, y: 744) */}
        <button
          type="button"
          onClick={handlePrev}
          aria-label="Previous slide"
          style={{
            position: "absolute",
            left: "208px",
            top: "744px",
            width: "56px",
            height: "56px",
            borderRadius: "50%",
            backgroundColor: "#FFFFFF",
            border: "2px solid #EEEEEE",
            boxShadow: "0 10px 30px rgba(0,0,0,0.15)",
            zIndex: 35,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            transition: "transform 0.2s ease",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.08)")}
          onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
        >
          <svg width="12" height="20" viewBox="0 0 12 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M10 2L2 10L10 18" stroke="#FF7018" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>

        {/* Carousel Navigation Arrow Button - Right (Orange circle at x: 1081, y: 744) */}
        <button
          type="button"
          onClick={handleNext}
          aria-label="Next slide"
          style={{
            position: "absolute",
            left: "1081px",
            top: "744px",
            width: "56px",
            height: "56px",
            borderRadius: "50%",
            backgroundColor: "#FF7018",
            border: "3px solid #FFFFFF",
            boxShadow: "0 10px 30px rgba(255,112,24,0.35)",
            zIndex: 35,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            transition: "transform 0.2s ease",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.08)")}
          onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
        >
          <svg width="12" height="20" viewBox="0 0 12 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M2 2L10 10L2 18" stroke="#FFFFFF" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </section>

      {/* =========================================================================
          SECTION 2: AMBITION STATEMENT (y: 1083, Background: #FFFFFF)
          ========================================================================= */}
      <section
        style={{
          position: "relative",
          width: "1440px",
          boxSizing: "border-box",
          paddingTop: "390px",
          paddingLeft: "135px",
          paddingRight: "135px",
          paddingBottom: "64px",
          backgroundColor: "#FFFFFF",
        }}
      >
        <p
          style={{
            margin: 0,
            width: "1170px",
            fontFamily: "'Urbanist', sans-serif",
            fontSize: "30px",
            fontWeight: 500,
            lineHeight: "140%",
            color: "#333333",
            letterSpacing: "-0.01em",
          }}
        >
          Our ambition is to create intelligent technologies that solve real-world challenges, empower businesses, and shape a smarter, more connected future through engineering excellence.
        </p>
      </section>

      {/* =========================================================================
          SECTION 3: PHOTO GALLERY GRID (y: 1291 to 1881, Background: #FFFFFF)
          ========================================================================= */}
      <section
        style={{
          position: "relative",
          width: "1440px",
          boxSizing: "border-box",
          overflow: "hidden",
          paddingBottom: "70px",
          backgroundColor: "#FFFFFF",
        }}
      >
        {/* Row 1 (y: 1291, height: 287px) */}
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            gap: "16px",
            width: "1600px",
            marginLeft: "-80px",
            marginBottom: "16px",
          }}
        >
          {/* Card 1 (270 x 287) */}
          <div style={{ position: "relative", width: "270px", height: "287px", borderRadius: "14px", overflow: "hidden", flexShrink: 0 }}>
            <Image src="/lifeininnosino/8.jpg" alt="Office moments" fill style={{ objectFit: "cover" }} />
          </div>
          {/* Card 2 (270 x 287) */}
          <div style={{ position: "relative", width: "270px", height: "287px", borderRadius: "14px", overflow: "hidden", flexShrink: 0 }}>
            <Image src="/lifeininnosino/2.jpg" alt="Team collaboration" fill style={{ objectFit: "cover" }} />
          </div>
          {/* Card 3 (470 x 287) */}
          <div style={{ position: "relative", width: "470px", height: "287px", borderRadius: "14px", overflow: "hidden", flexShrink: 0 }}>
            <Image src="/lifeininnosino/3.jpg" alt="Group discussion" fill style={{ objectFit: "cover" }} />
          </div>
          {/* Card 4 (270 x 287) */}
          <div style={{ position: "relative", width: "270px", height: "287px", borderRadius: "14px", overflow: "hidden", flexShrink: 0 }}>
            <Image src="/lifeininnosino/4.jpg" alt="Breakout space" fill style={{ objectFit: "cover" }} />
          </div>
          {/* Card 5 (270 x 287) */}
          <div style={{ position: "relative", width: "270px", height: "287px", borderRadius: "14px", overflow: "hidden", flexShrink: 0 }}>
            <Image src="/lifeininnosino/5.jpg" alt="Coding in flow" fill style={{ objectFit: "cover" }} />
          </div>
        </div>

        {/* Row 2 (y: 1594, height: 287px) */}
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            gap: "16px",
            width: "1600px",
            marginLeft: "-80px",
          }}
        >
          {/* Card 1 (270 x 287) */}
          <div style={{ position: "relative", width: "270px", height: "287px", borderRadius: "14px", overflow: "hidden", flexShrink: 0 }}>
            <Image src="/lifeininnosino/9.jpg" alt="Innosino Headquarters" fill style={{ objectFit: "cover" }} />
          </div>
          {/* Card 2 (470 x 287) */}
          <div style={{ position: "relative", width: "470px", height: "287px", borderRadius: "14px", overflow: "hidden", flexShrink: 0 }}>
            <Image src="/lifeininnosino/6.jpg" alt="Modern workspace" fill style={{ objectFit: "cover" }} />
          </div>
          {/* Card 3 (270 x 287) */}
          <div style={{ position: "relative", width: "270px", height: "287px", borderRadius: "14px", overflow: "hidden", flexShrink: 0 }}>
            <Image src="/lifeininnosino/7.jpg" alt="Coffee chat" fill style={{ objectFit: "cover" }} />
          </div>
          {/* Card 4 (398 x 287) */}
          <div style={{ position: "relative", width: "398px", height: "287px", borderRadius: "14px", overflow: "hidden", flexShrink: 0 }}>
            <Image src="/lifeininnosino/10.jpg" alt="Peer review" fill style={{ objectFit: "cover" }} />
          </div>
          {/* Card 5 (270 x 287) */}
          <div style={{ position: "relative", width: "270px", height: "287px", borderRadius: "14px", overflow: "hidden", flexShrink: 0 }}>
            <Image src="/lifeininnosino/11.jpg" alt="Focused engineering" fill style={{ objectFit: "cover" }} />
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 4: NEWS & INSIGHTS (y: 1945, w: 1169, h: 703)
          ========================================================================= */}
      <section
        style={{
          position: "relative",
          width: "1440px",
          boxSizing: "border-box",
          padding: "0 135px 80px 135px",
          backgroundColor: "#FFFFFF",
          display: "flex",
          flexDirection: "column",
          gap: "40px",
        }}
      >
        {/* Heading */}
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
          NEWS & <span style={{ color: "#FF7018" }}>INSIGHTS</span>
        </h2>

        {/* 2-Column News Layout */}
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            width: "1170px",
            gap: "30px",
          }}
        >
          {/* Left Large Card (w: 568px) */}
          <div
            style={{
              width: "568px",
              display: "flex",
              flexDirection: "column",
              gap: "24px",
            }}
          >
            {/* Visual Box */}
            <div
              style={{
                position: "relative",
                width: "568px",
                height: "400px",
                backgroundColor: "#000000",
                borderRadius: "16px",
                overflow: "hidden",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Image
                src="/homepage_assets/featured_project_images/white_moontype.png"
                alt="Rev C PolyPan Board"
                width={324}
                height={318}
                style={{ objectFit: "contain" }}
              />
            </div>

            {/* Content */}
            <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
              <h3
                style={{
                  margin: 0,
                  fontFamily: "'Urbanist', sans-serif",
                  fontSize: "24px",
                  fontWeight: 700,
                  color: "#000000",
                  lineHeight: "1.3",
                }}
              >
                Rev C Bring-Up Succeeded on the First Try.
              </h3>
              <p
                style={{
                  margin: 0,
                  fontFamily: "'Urbanist', sans-serif",
                  fontSize: "16px",
                  fontWeight: 400,
                  color: "#666666",
                  lineHeight: "150%",
                }}
              >
                The entire PolyPan board powered up cleanly on the very first flash—a proud milestone and a big high-five moment for the whole team.
              </p>
            </div>

            {/* Button */}
            <div>
              <Link
                href="/blogs/details"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "8px",
                  padding: "12px 24px",
                  borderRadius: "100px",
                  backgroundColor: "#000000",
                  color: "#FFFFFF",
                  fontFamily: "'Urbanist', sans-serif",
                  fontSize: "15px",
                  fontWeight: 600,
                  textDecoration: "none",
                }}
              >
                <span>Read Details</span>
                <span style={{ fontSize: "12px" }}>↗</span>
              </Link>
            </div>
          </div>

          {/* Right Side Stacked News (w: 570px) */}
          <div
            style={{
              width: "570px",
              display: "flex",
              flexDirection: "column",
              gap: "30px",
            }}
          >
            {/* Card 1 */}
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                gap: "20px",
                alignItems: "flex-start",
              }}
            >
              <div
                style={{
                  position: "relative",
                  width: "256px",
                  height: "244px",
                  borderRadius: "14px",
                  overflow: "hidden",
                  flexShrink: 0,
                }}
              >
                <Image
                  src="/blog_assets/B-01.png"
                  alt="16 Projects Shipped This Month"
                  fill
                  style={{ objectFit: "cover" }}
                />
              </div>

              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  height: "244px",
                }}
              >
                <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                  <h4
                    style={{
                      margin: 0,
                      fontFamily: "'Urbanist', sans-serif",
                      fontSize: "18px",
                      fontWeight: 700,
                      color: "#000000",
                      lineHeight: "1.3",
                    }}
                  >
                    16 Projects Shipped This Month Successfully
                  </h4>
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
                    This month, we successfully shipped 16 projects, from smart instruments to the Logic IC Trainer Kit. Every delivery reflects our commitment to quality engineering.
                  </p>
                </div>

                <div>
                  <Link
                    href="/blogs/details"
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "6px",
                      padding: "10px 20px",
                      borderRadius: "100px",
                      backgroundColor: "#000000",
                      color: "#FFFFFF",
                      fontFamily: "'Urbanist', sans-serif",
                      fontSize: "14px",
                      fontWeight: 600,
                      textDecoration: "none",
                    }}
                  >
                    <span>Read Details</span>
                    <span style={{ fontSize: "11px" }}>↗</span>
                  </Link>
                </div>
              </div>
            </div>

            {/* Card 2 */}
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                gap: "20px",
                alignItems: "flex-start",
              }}
            >
              <div
                style={{
                  position: "relative",
                  width: "256px",
                  height: "244px",
                  borderRadius: "14px",
                  overflow: "hidden",
                  flexShrink: 0,
                }}
              >
                <Image
                  src="/blog_assets/B-02.jpg"
                  alt="BLE MIDI Latency Under 8ms"
                  fill
                  style={{ objectFit: "cover" }}
                />
              </div>

              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  height: "244px",
                }}
              >
                <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                  <h4
                    style={{
                      margin: 0,
                      fontFamily: "'Urbanist', sans-serif",
                      fontSize: "18px",
                      fontWeight: 700,
                      color: "#000000",
                      lineHeight: "1.3",
                    }}
                  >
                    BLE MIDI Latency Now Under 8 ms Our Cleanest Performance Yet.
                  </h4>
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
                    After extensive testing and optimization, we reduced BLE MIDI latency to under 8 ms. The latest measurements delivered our cleanest signal trace yet.
                  </p>
                </div>

                <div>
                  <Link
                    href="/blogs/details"
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "6px",
                      padding: "10px 20px",
                      borderRadius: "100px",
                      backgroundColor: "#000000",
                      color: "#FFFFFF",
                      fontFamily: "'Urbanist', sans-serif",
                      fontSize: "14px",
                      fontWeight: 600,
                      textDecoration: "none",
                    }}
                  >
                    <span>Read Details</span>
                    <span style={{ fontSize: "11px" }}>↗</span>
                  </Link>
                </div>
              </div>
            </div>

            {/* Load More Button */}
            <div>
              <Link
                href="/blogs"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "8px",
                  padding: "12px 28px",
                  borderRadius: "100px",
                  background: "linear-gradient(90deg, #FF7018 0%, #FFBE03 100%)",
                  color: "#FFFFFF",
                  fontFamily: "'Urbanist', sans-serif",
                  fontSize: "15px",
                  fontWeight: 600,
                  textDecoration: "none",
                  boxShadow: "0 4px 15px rgba(255, 112, 24, 0.3)",
                }}
              >
                <span>Load More</span>
                <span style={{ fontSize: "12px" }}>↗</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 5: CTA BANNER (x: 135, y: 2712, w: 1170, h: 400)
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
            height: "400px",
            borderRadius: "24px",
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
          SECTION 6: FOOTER & INTERACTIVE CHAT (y: 3176, Height: 275px)
          ========================================================================= */}
      <footer
        style={{
          position: "relative",
          width: "1440px",
          height: "275px",
          backgroundColor: "#000000",
          boxSizing: "border-box",
        }}
      >
        <div style={{ position: "absolute", left: "135px", top: "63.5px", zIndex: 30 }}>
                  </div>

        {/* Interactive Chat Widget */}
        <div
          style={{
            position: "absolute",
            left: "973px",
            top: "38.5px",
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

        {/* Footer Bottom Line & Links */}
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
