"use client";

import React, { useState } from "react";
import BrandLogo from "@/components/navigation/BrandLogo";
import { PortableText, type PortableTextComponents } from "next-sanity";
import SiteFooter from "@/components/common/SiteFooter";
import { formatPostDate } from "@/lib/post-format";
import type { PrivacyPageData, SiteSettings } from "@/sanity/queries";

/**
 * The policy is one rich-text field rather than a fixed run of heading and
 * paragraph slots, so a clause can be added or reordered without a code
 * change. These map its two styles onto the page's existing type.
 */
const POLICY_STYLES: PortableTextComponents = {
  block: {
    h3: ({ children }) => (
      <h2
        style={{
          margin: 0,
          marginBlockStart: "clamp(1.5rem, 3vw, 2.125rem)",
          fontFamily: "var(--font-cal-sans), sans-serif",
          fontSize: "clamp(1.375rem, 1rem + 1.5vw, 2.125rem)",
          fontWeight: 400,
          color: "#000000",
          letterSpacing: "-0.01em",
        }}
      >
        {children}
      </h2>
    ),
    normal: ({ children }) => (
      <p
        style={{
          margin: 0,
          marginBlockStart: "18px",
          fontFamily: "var(--font-urbanist), sans-serif",
          fontSize: "var(--fs-body, 1rem)",
          fontWeight: 400,
          lineHeight: "160%",
          color: "#666666",
        }}
      >
        {children}
      </p>
    ),
  },
  listItem: {
    bullet: ({ children }) => (
      <li
        style={{
          borderLeft: "3px solid #FF7018",
          paddingLeft: "16px",
          marginBlockStart: "12px",
          listStyle: "none",
          fontFamily: "var(--font-urbanist), sans-serif",
          fontSize: "16px",
          fontWeight: 400,
          lineHeight: "150%",
          color: "#444444",
        }}
      >
        {children}
      </li>
    ),
  },
  list: {
    bullet: ({ children }) => (
      <ul style={{ margin: 0, marginBlockStart: "18px", padding: 0 }}>{children}</ul>
    ),
  },
};
import BackgroundVideo from "@/components/common/BackgroundVideo";
import Link from "next/link";


/** The two type styles the policy body uses, shared with the Portable Text map. */
const POLICY_HEADING: React.CSSProperties = {
  margin: 0,
  fontFamily: "var(--font-cal-sans), sans-serif",
  fontSize: "clamp(1.375rem, 1rem + 1.5vw, 2.125rem)",
  fontWeight: 400,
  color: "#000000",
  letterSpacing: "-0.01em",
};

const POLICY_BODY: React.CSSProperties = {
  margin: 0,
  fontFamily: "var(--font-urbanist), sans-serif",
  fontSize: "var(--fs-body, 1rem)",
  fontWeight: 400,
  lineHeight: "160%",
  color: "#666666",
};

/** Declared outside the component so it is one type rather than a new one per render. */
const CopyGlyph = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M8 4V16C8 17.1046 8.89543 18 10 18H18C19.1046 18 20 17.1046 20 16V4C20 2.89543 19.1046 2 18 2H10C8.89543 2 8 2.89543 8 4Z"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M16 18V20C16 21.1046 15.1046 22 14 22H6C4.89543 22 4 21.1046 4 20V8C4 6.89543 4.89543 6 6 6H8"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default function PrivacyPolicy({
  page,
  settings,
}: {
  page: PrivacyPageData;
  settings: SiteSettings;
}) {
  const lastUpdatedLabel = `LAST UPDATED · ${formatPostDate(page.lastUpdated).toUpperCase()}`;
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(settings.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <main className="pd-page">
      {/* =====================================================================
          SECTION 1: HERO
          Built from the same .page-hero / .container primitives as every other
          inner page. It was previously a 1440px-wide block with the logo and
          title pinned at absolute pixel coordinates, which could not reflow
          below that width.
          ===================================================================== */}
      <section className="page-hero">
        <div className="section-media">
          <BackgroundVideo
            src="/about_us/About Us Hero Section.mp4"
            poster="/posters/about_us/About Us Hero Section.webp"
            loading="eager"
          />
          <div
            className="section-media__scrim"
            style={{ backgroundColor: "rgba(0, 0, 0, 0.65)" }}
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

              <p
                style={{
                  margin: 0,
                  fontFamily: "var(--font-urbanist), sans-serif",
                  fontSize: "var(--fs-small)",
                  fontWeight: 500,
                  color: "#CCCCCC",
                  letterSpacing: "0.05em",
                  textTransform: "uppercase",
                }}
              >
                {lastUpdatedLabel}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================================
          SECTION 2: THE POLICY
          ===================================================================== */}
      <section className="flow-section" style={{ backgroundColor: "#FFFFFF" }}>
        <div
          className="container"
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "clamp(1.75rem, 4vw, 2.75rem)",
          }}
        >
          <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
            <h2 style={POLICY_HEADING}>{page.hero.breadcrumb}</h2>
            <p style={POLICY_BODY}>{page.hero.sub}</p>
          </div>

          <PortableText value={page.body} components={POLICY_STYLES} />

          <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
            <h2 style={POLICY_HEADING}>{page.contactHeading}</h2>
            <p style={POLICY_BODY}>{page.contactBody}</p>

            <div
              style={{
                display: "flex",
                alignItems: "center",
                flexWrap: "wrap",
                gap: "8px",
                marginTop: "4px",
              }}
            >
              <span style={{ ...POLICY_BODY, fontWeight: 700, color: "#000000" }}>
                Email:
              </span>
              <span style={{ ...POLICY_BODY, color: "#000000" }}>{settings.email}</span>
              <button
                type="button"
                onClick={handleCopyEmail}
                title="Copy email address"
                style={{
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  padding: "4px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: copied ? "#FF7018" : "#444444",
                  transition: "color 0.2s ease",
                }}
              >
                {copied ? (
                  <span style={{ fontSize: "12px", color: "#FF7018", fontWeight: 600 }}>
                    Copied!
                  </span>
                ) : (
                  <CopyGlyph />
                )}
              </button>
            </div>
          </div>
        </div>
      </section>

      <SiteFooter settings={settings} />
    </main>
  );
}
