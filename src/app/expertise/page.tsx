import React from "react";
import BrandLogo from "@/components/navigation/BrandLogo";
import SiteFooter from "@/components/common/SiteFooter";
import { client } from "@/sanity/client";
import {
  EXPERTISE_PAGE_QUERY,
  SITE_SETTINGS_QUERY,
  type ExpertisePageData,
  type SiteSettings,
} from "@/sanity/queries";
import BackgroundVideo from "@/components/common/BackgroundVideo";
import Link from "next/link";

export default async function ExpertisePage() {
  const [page, settings] = await Promise.all([
    client.fetch<ExpertisePageData>(EXPERTISE_PAGE_QUERY),
    client.fetch<SiteSettings>(SITE_SETTINGS_QUERY),
  ]);

  /* The rail renders in two rows. The split is worked out here rather than
     stored as two arrays, so adding a stage in the Studio does not need a
     second field deciding which row it belongs to. */
  const row1 = page.processStages.slice(0, Math.ceil(page.processStages.length / 2));
  const row2 = page.processStages.slice(row1.length);


  return (
    <main
      /* body is a flex column: without an explicit width this sizes to its
         widest child rather than to the viewport. */
      style={{position: "relative", width: "100%", minWidth: 0, backgroundColor: "#000000"}}
    >
      {/* =========================================================================
          SECTION 1: HERO SECTION & OVERLAPPING HARDWARE CARD (Height: 684px)
          Video: /expertise_page_assets/Expertise.mp4
          ========================================================================= */}
      <section className="page-hero" style={{backgroundColor: "#F1F1F1"}}>
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

              <h1 className="page-hero__title" style={{color: "#000000"}}>
                {page.hero.titleLead}
                <span className="brand-gradient-text">{page.hero.titleAccent}</span>
              </h1>

              <p className="page-hero__sub" style={{color: "#444444"}}>
                {page.hero.sub}
              </p>
            </div>
          </div>

          {/*
            The video card is the hero's last flow child and hangs into the
            white band below it by --page-hero-hang, the same mechanism the
            Projects and Blog heroes use. It was previously pinned at
            (235, 549) inside a 1440px box, so below that width it sat off the
            side of the screen.
          */}
          <div className="page-hero__media">
            <BackgroundVideo
              src="/expertise_page_assets/Expertise.mp4"
              poster="/posters/expertise_page_assets/Expertise.webp"
              loading="lazy"
            />
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 2: WHY IS INNOSINO THE RIGHT HARDWARE & PCB DESIGN PARTNER?
          Height: 939px | y: 684 | paddingTop: 459px | Background: #FFFFFF
          ========================================================================= */}
      <section className="hero-follow">
        <div
          className="container"
          style={{display: "flex", flexDirection: "column", gap: "clamp(1.75rem, 4vw, 3rem)"}}
        >
        {/* Section Heading */}
        <h2
          style={{
            margin: 0,
            fontFamily: "var(--font-cal-sans), sans-serif",
            fontSize: "36px",
            fontWeight: 400,
            color: "#000000",
            textTransform: "uppercase",
            lineHeight: "1.2",
          }}
        >
          {page.whyHeading.lead}
          <span style={{ color: "#FF7018" }}>{page.whyHeading.accent}</span>
        </h2>

        {/* 3x2 Feature Cards Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 280px), 1fr))",
            columnGap: "30px",
            rowGap: "30px",
            width: "100%",
          }}
        >
          {page.featureCards.map((card, idx) => (
            <div
              key={idx}
              style={{
                minHeight: "113px",
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
                  fontFamily: "var(--font-urbanist), sans-serif",
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
                  fontFamily: "var(--font-urbanist), sans-serif",
                  fontSize: "16px",
                  fontWeight: 500,
                  color: "#666666",
                  lineHeight: "150%",
                }}
              >
                {card.description}
              </p>
            </div>
          ))}
        </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 3: TOOLS & TECHNOLOGIES
          Height: 1028px | y: 1623 | Background: #F1F1F1
          ========================================================================= */}
      <section
        className="flow-section"
        style={{backgroundColor: "#F1F1F1"}}
      >
        <div
          className="container"
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "space-between",
            alignItems: "flex-start",
            gap: "clamp(1.5rem, 4vw, 3rem)",
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
              fontFamily: "var(--font-cal-sans), sans-serif",
              fontSize: "48px",
              fontWeight: 400,
              color: "#000000",
              textTransform: "uppercase",
              lineHeight: "1.2",
            }}
          >
            {page.toolsHeading.lead}
            <span style={{ color: "#FF7018" }}>{page.toolsHeading.accent}</span>
          </h2>
        </div>

        {/* Right Side: 6 Tool Cards Stack */}
        <div
          style={{
            width: "min(100%, 570px)",
            display: "flex",
            flexDirection: "column",
            gap: "24px",
          }}
        >
          {page.toolsAndTech.map((item, idx) => (
            <div
              key={idx}
              style={{
                width: "min(100%, 570px)",
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
                  fontFamily: "var(--font-urbanist), sans-serif",
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
                  fontFamily: "var(--font-urbanist), sans-serif",
                  fontSize: "16px",
                  fontWeight: 500,
                  color: "#666666",
                  lineHeight: "150%",
                }}
              >
                {item.description}
              </p>
            </div>
          ))}
        </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 4: OUR HARDWARE & PCB DESIGN PROCESS
          Height: 777px | y: 2651 | Background: #FFFFFF
          ========================================================================= */}
      <section
        className="flow-section"
        style={{backgroundColor: "#FFFFFF"}}
      >
        <div
          className="container"
          style={{display: "flex", flexDirection: "column", gap: "clamp(1.75rem, 4vw, 3rem)"}}
        >
        {/* Section Heading */}
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
          {page.processHeading.lead}
          <span style={{ color: "#FF7018" }}>{page.processHeading.accent}</span>
        </h2>

        {/* Process Cards Rows */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "30px",
            width: "100%",
          }}
        >
          {/* Row 1: Stages 01, 02, 03 (3 x 370px) */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 280px), 1fr))",
              gap: "30px",
              width: "100%",
            }}
          >
            {row1.map((item, idx) => (
              <div
                key={idx}
                style={{
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
                    fontFamily: "var(--font-urbanist), sans-serif",
                    fontSize: "16px",
                    fontWeight: 700,
                    color: "#FF7018",
                  }}
                >
                  {item.label}
                </span>

                <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                  <h3
                    style={{
                      margin: 0,
                      fontFamily: "var(--font-urbanist), sans-serif",
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
                      fontFamily: "var(--font-urbanist), sans-serif",
                      fontSize: "14px",
                      fontWeight: 400,
                      color: "#666666",
                      lineHeight: "150%",
                    }}
                  >
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Row 2: Stages 04, 05 (2 x 570px) */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 280px), 1fr))",
              gap: "30px",
              width: "100%",
            }}
          >
            {row2.map((item, idx) => (
              <div
                key={idx}
                style={{
                  minHeight: "262px",
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
                    fontFamily: "var(--font-urbanist), sans-serif",
                    fontSize: "16px",
                    fontWeight: 700,
                    color: "#FF7018",
                  }}
                >
                  {item.label}
                </span>

                <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                  <h3
                    style={{
                      margin: 0,
                      fontFamily: "var(--font-urbanist), sans-serif",
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
                      fontFamily: "var(--font-urbanist), sans-serif",
                      fontSize: "14px",
                      fontWeight: 400,
                      color: "#666666",
                      lineHeight: "150%",
                    }}
                  >
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 5: CTA CARD BANNER
          Height: 488px | y: 3492 | Background: #FFFFFF
          ========================================================================= */}
      <section
        className="flow-section"
        style={{
          backgroundColor: "#FFFFFF",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            width: "100%",
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
          Height: 276px | Background: #000000
          ========================================================================= */}
      <SiteFooter settings={settings} />
    </main>
  );
}
