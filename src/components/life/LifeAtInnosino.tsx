"use client";

import React, { useState } from "react";
import BrandLogo from "@/components/navigation/BrandLogo";
import SiteFooter from "@/components/common/SiteFooter";
import type { LifePageData, SiteSettings } from "@/sanity/queries";
import BackgroundVideo from "@/components/common/BackgroundVideo";
import Image from "next/image";
import Link from "next/link";

export default function LifeAtInnosino({
  page,
  settings,
}: {
  page: LifePageData;
  settings: SiteSettings;
}) {
  const [carouselIndex, setCarouselIndex] = useState(1);

  // Carousel images
  const heroImages = page.gallery;

  const handlePrev = () => {
    setCarouselIndex((prev) => (prev === 0 ? heroImages.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCarouselIndex((prev) => (prev === heroImages.length - 1 ? 0 : prev + 1));
  };

  const getPrevIndex = () => (carouselIndex === 0 ? heroImages.length - 1 : carouselIndex - 1);
  const getNextIndex = () => (carouselIndex === heroImages.length - 1 ? 0 : carouselIndex + 1);

  return (
    <main
      /* body is a flex column, so a main sized by its content will not shrink
         below the widest child. width/minWidth pin it to the viewport instead. */
      style={{
        position: "relative",
        width: "100%",
        minWidth: 0,
        overflowX: "clip",
        backgroundColor: "#FFFFFF",
      }}
    >
      {/* =========================================================================
          SECTION 1: HERO & OVERLAPPING CAROUSEL CARDS
          Video: /service_page/Service section Hero.mp4
          ========================================================================= */}
      <section className="page-hero">
        <div className="section-media">
          <BackgroundVideo
            src="/about_us/About Us Hero Section.mp4"
            poster="/posters/about_us/About Us Hero Section.webp"
            loading="eager"
          />
          <div
            className="section-media__scrim"
            style={{ backgroundColor: "rgba(0, 0, 0, 0.55)" }}
          />
        </div>

        <div className="container page-hero__inner">
          <div className="page-hero__head">
            <Link href="/" aria-label="INNOSINO home" className="brand-logo-link">
              <BrandLogo size="small" />
            </Link>

            <div className="page-hero__copy">
              <div className="breadcrumb">
                <span className="breadcrumb__link" aria-hidden="true">
                  ✦
                </span>
                <Link href="/" className="breadcrumb__link">
                  HOME
                </Link>
                <span className="breadcrumb__link" aria-hidden="true">
                  &gt;
                </span>
                <span className="breadcrumb__link">{page.hero.breadcrumb}</span>
              </div>

              <h1 className="page-hero__title">
                {page.hero.titleLead}
                <span className="brand-gradient-text">{page.hero.titleAccent}</span>
              </h1>

              <p className="page-hero__sub">{page.hero.sub}</p>
            </div>
          </div>

          {/* The carousel is the hero's last flow child and hangs into the
              white band below it, the same way the other page heroes do. */}
          <div className="life-carousel">
            <div
              className="life-carousel__card life-carousel__card--side"
              onClick={handlePrev}
              role="button"
              tabIndex={-1}
              aria-hidden="true"
            >
              <Image
                src={heroImages[getPrevIndex()].src}
                alt=""
                fill
                sizes="770px"
                style={{ objectFit: "cover" }}
              />
            </div>

            <div className="life-carousel__card">
              <Image
                src={heroImages[carouselIndex].src}
                alt={heroImages[carouselIndex].alt}
                fill
                sizes="(max-width: 1023px) 100vw, 770px"
                style={{ objectFit: "cover" }}
                preload
              />
            </div>

            <div
              className="life-carousel__card life-carousel__card--side"
              onClick={handleNext}
              role="button"
              tabIndex={-1}
              aria-hidden="true"
            >
              <Image
                src={heroImages[getNextIndex()].src}
                alt=""
                fill
                sizes="770px"
                style={{ objectFit: "cover" }}
              />
            </div>

            <button
              type="button"
              onClick={handlePrev}
              aria-label="Previous slide"
              className="life-carousel__nav life-carousel__nav--prev"
            >
              <svg width="12" height="20" viewBox="0 0 12 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M10 2L2 10L10 18" stroke="#FF7018" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>

            <button
              type="button"
              onClick={handleNext}
              aria-label="Next slide"
              className="life-carousel__nav life-carousel__nav--next"
            >
              <svg width="12" height="20" viewBox="0 0 12 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M2 2L10 10L2 18" stroke="#FFFFFF" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 2: AMBITION STATEMENT (y: 1083, Background: #FFFFFF)
          ========================================================================= */}
      <section className="hero-follow">
        <div className="container">
        <p
          style={{
            margin: 0,
            fontFamily: "var(--font-urbanist), sans-serif",
            fontSize: "clamp(1.125rem, 0.8rem + 1.4vw, 1.875rem)",
            fontWeight: 500,
            lineHeight: "140%",
            color: "#333333",
            letterSpacing: "-0.01em",
          }}
        >
          {page.ambition}
        </p>
        </div>
      </section>

      {/* =========================================================================
          SECTION 3: PHOTO GALLERY GRID (y: 1291 to 1881, Background: #FFFFFF)
          ========================================================================= */}
      <section
        style={{
          position: "relative",
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
            flexWrap: "wrap",
            gap: "16px",
            width: "min(100%, var(--container-max))",
            marginInline: "auto",
            marginBottom: "16px",
          }}
        >
          {/* Card 1 (270 x 287) */}
          <div style={{ position: "relative", flex: "1 1 260px", minWidth: "min(100%, 260px)", aspectRatio: "270 / 287", borderRadius: "14px", overflow: "hidden" }}>
            <Image src={page.photoMosaic[0]?.src} alt={page.photoMosaic[0]?.alt ?? ""} fill sizes="270px" style={{ objectFit: "cover" }} />
          </div>
          {/* Card 2 (270 x 287) */}
          <div style={{ position: "relative", flex: "1 1 260px", minWidth: "min(100%, 260px)", aspectRatio: "270 / 287", borderRadius: "14px", overflow: "hidden" }}>
            <Image src={page.photoMosaic[1]?.src} alt={page.photoMosaic[1]?.alt ?? ""} fill sizes="270px" style={{ objectFit: "cover" }} />
          </div>
          {/* Card 3 (470 x 287) */}
          <div style={{ position: "relative", flex: "1 1 260px", minWidth: "min(100%, 260px)", aspectRatio: "470 / 287", borderRadius: "14px", overflow: "hidden" }}>
            <Image src={page.photoMosaic[2]?.src} alt={page.photoMosaic[2]?.alt ?? ""} fill sizes="470px" style={{ objectFit: "cover" }} />
          </div>
          {/* Card 4 (270 x 287) */}
          <div style={{ position: "relative", flex: "1 1 260px", minWidth: "min(100%, 260px)", aspectRatio: "270 / 287", borderRadius: "14px", overflow: "hidden" }}>
            <Image src={page.photoMosaic[3]?.src} alt={page.photoMosaic[3]?.alt ?? ""} fill sizes="270px" style={{ objectFit: "cover" }} />
          </div>
          {/* Card 5 (270 x 287) */}
          <div style={{ position: "relative", flex: "1 1 260px", minWidth: "min(100%, 260px)", aspectRatio: "270 / 287", borderRadius: "14px", overflow: "hidden" }}>
            <Image src={page.photoMosaic[4]?.src} alt={page.photoMosaic[4]?.alt ?? ""} fill sizes="270px" style={{ objectFit: "cover" }} />
          </div>
        </div>

        {/* Row 2 (y: 1594, height: 287px) */}
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            flexWrap: "wrap",
            gap: "16px",
            width: "min(100%, var(--container-max))",
            marginInline: "auto",
          }}
        >
          {/* Card 1 (270 x 287) */}
          <div style={{ position: "relative", flex: "1 1 260px", minWidth: "min(100%, 260px)", aspectRatio: "270 / 287", borderRadius: "14px", overflow: "hidden" }}>
            <Image src={page.photoMosaic[5]?.src} alt={page.photoMosaic[5]?.alt ?? ""} fill sizes="270px" style={{ objectFit: "cover" }} />
          </div>
          {/* Card 2 (470 x 287) */}
          <div style={{ position: "relative", flex: "1 1 260px", minWidth: "min(100%, 260px)", aspectRatio: "470 / 287", borderRadius: "14px", overflow: "hidden" }}>
            <Image src={page.photoMosaic[6]?.src} alt={page.photoMosaic[6]?.alt ?? ""} fill sizes="470px" style={{ objectFit: "cover" }} />
          </div>
          {/* Card 3 (270 x 287) */}
          <div style={{ position: "relative", flex: "1 1 260px", minWidth: "min(100%, 260px)", aspectRatio: "270 / 287", borderRadius: "14px", overflow: "hidden" }}>
            <Image src={page.photoMosaic[7]?.src} alt={page.photoMosaic[7]?.alt ?? ""} fill sizes="270px" style={{ objectFit: "cover" }} />
          </div>
          {/* Card 4 (398 x 287) */}
          <div style={{ position: "relative", flex: "1 1 260px", minWidth: "min(100%, 260px)", aspectRatio: "398 / 287", borderRadius: "14px", overflow: "hidden" }}>
            <Image src={page.photoMosaic[8]?.src} alt={page.photoMosaic[8]?.alt ?? ""} fill sizes="398px" style={{ objectFit: "cover" }} />
          </div>
          {/* Card 5 (270 x 287) */}
          <div style={{ position: "relative", flex: "1 1 260px", minWidth: "min(100%, 260px)", aspectRatio: "270 / 287", borderRadius: "14px", overflow: "hidden" }}>
            <Image src={page.photoMosaic[9]?.src} alt={page.photoMosaic[9]?.alt ?? ""} fill sizes="270px" style={{ objectFit: "cover" }} />
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 4: NEWS & INSIGHTS
          ========================================================================= */}
      <section
        style={{
          position: "relative",
          boxSizing: "border-box",
          backgroundColor: "#FFFFFF",
        }}
        className="flow-section"
      >
        <div
          className="container"
          style={{display: "flex", flexDirection: "column", gap: "clamp(1.5rem, 3vw, 2.5rem)"}}
        >
        {/* Heading */}
        <h2
          style={{
            margin: 0,
            fontFamily: "var(--font-cal-sans), sans-serif",
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
            flexWrap: "wrap",
            justifyContent: "space-between",
            width: "100%",
            gap: "30px",
          }}
        >
          {/* Left Large Card (w: 568px) */}
          <div
            style={{
              flex: "1 1 min(100%, 420px)",
              display: "flex",
              flexDirection: "column",
              gap: "24px",
            }}
          >
            {/* Visual Box */}
            <div
              style={{
                position: "relative",
                flex: "1 1 min(100%, 420px)",
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
                src="/homepage_assets/featured_project_images/white_moontype.webp"
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
                  fontFamily: "var(--font-urbanist), sans-serif",
                  fontSize: "24px",
                  fontWeight: 700,
                  color: "#000000",
                  lineHeight: "1.3",
                }}
              >
                {page.highlights[0]?.title}
              </h3>
              <p
                style={{
                  margin: 0,
                  fontFamily: "var(--font-urbanist), sans-serif",
                  fontSize: "16px",
                  fontWeight: 400,
                  color: "#666666",
                  lineHeight: "150%",
                }}
              >
                {page.highlights[0]?.body}
              </p>
            </div>

            {/* Button */}
            <div>
              <Link
                href="/blogs"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "8px",
                  padding: "12px 24px",
                  borderRadius: "100px",
                  backgroundColor: "#000000",
                  color: "#FFFFFF",
                  fontFamily: "var(--font-urbanist), sans-serif",
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
                  src="/blog_assets/B-01.webp"
                  alt="16 Projects Shipped This Month"
                  fill
                  sizes="256px"
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
                      fontFamily: "var(--font-urbanist), sans-serif",
                      fontSize: "18px",
                      fontWeight: 700,
                      color: "#000000",
                      lineHeight: "1.3",
                    }}
                  >
                    {page.highlights[1]?.title}
                  </h4>
                  <p
                    style={{
                      margin: 0,
                      fontFamily: "var(--font-urbanist), sans-serif",
                      fontSize: "14px",
                      fontWeight: 400,
                      color: "#666666",
                      lineHeight: "150%",
                    }}
                  >
                    {page.highlights[1]?.body}
                  </p>
                </div>

                <div>
                  <Link
                    href="/blogs"
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "6px",
                      padding: "10px 20px",
                      borderRadius: "100px",
                      backgroundColor: "#000000",
                      color: "#FFFFFF",
                      fontFamily: "var(--font-urbanist), sans-serif",
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
                  src="/blog_assets/B-02.webp"
                  alt="BLE MIDI Latency Under 8ms"
                  fill
                  sizes="256px"
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
                      fontFamily: "var(--font-urbanist), sans-serif",
                      fontSize: "18px",
                      fontWeight: 700,
                      color: "#000000",
                      lineHeight: "1.3",
                    }}
                  >
                    {page.highlights[2]?.title}
                  </h4>
                  <p
                    style={{
                      margin: 0,
                      fontFamily: "var(--font-urbanist), sans-serif",
                      fontSize: "14px",
                      fontWeight: 400,
                      color: "#666666",
                      lineHeight: "150%",
                    }}
                  >
                    {page.highlights[2]?.body}
                  </p>
                </div>

                <div>
                  <Link
                    href="/blogs/getting-ble-midi-latency-under-10ms"
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "6px",
                      padding: "10px 20px",
                      borderRadius: "100px",
                      backgroundColor: "#000000",
                      color: "#FFFFFF",
                      fontFamily: "var(--font-urbanist), sans-serif",
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
                  fontFamily: "var(--font-urbanist), sans-serif",
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
        </div>
      </section>

      {/* =========================================================================
          SECTION 5: CTA BANNER
          ========================================================================= */}
      <section
        style={{
          position: "relative",
          backgroundColor: "#FFFFFF",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          boxSizing: "border-box",
        }}
      >
        <div
          style={{
            width: "100%",
            minHeight: "400px",
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
              fontFamily: "var(--font-cal-sans), sans-serif",
              fontSize: "44px",
              fontWeight: 400,
              color: "#FFFFFF",
              textTransform: "uppercase",
              lineHeight: "1.2",
              zIndex: 2,
            }}
          >
            {settings.ctaBanner.title}
          </h2>
          <p
            style={{
              margin: 0,
              width: "min(100%, 640px)",
              fontFamily: "var(--font-urbanist), sans-serif",
              fontSize: "16px",
              fontWeight: 500,
              color: "#FFFFFF",
              lineHeight: "150%",
              zIndex: 2,
            }}
          >
            {settings.ctaBanner.body}
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
          ========================================================================= */}
      <SiteFooter settings={settings} />
    </main>
  );
}
