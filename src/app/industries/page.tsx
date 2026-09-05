"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import BackgroundVideo from "@/components/common/BackgroundVideo";
import FloatingNavbar from "@/components/navigation/FloatingNavbar";
import JsonLd from "@/components/seo/JsonLd";
import { breadcrumbSchema } from "@/content/schema";
import { industriesList } from "@/content/home";
import { industriesPage } from "@/content/industries";
import { chatWidget, copyright, ctaBanner, footerLinks } from "@/content/site";

/**
 * The industries index. "Industries" was a homepage anchor (/#industries) in
 * the navbar and the footer, so the nine sectors had no URL of their own and
 * nothing to say about any of them beyond a title in a marquee. This is that
 * page; the navbar and the footer now point at it instead of the anchor.
 */
export default function IndustriesPage() {
  const [chatOpen, setChatOpen] = useState(true);

  return (
    <main className="svc-page">
      <section className="page-hero">
        <div className="section-media">
          <BackgroundVideo
            src="/service_page/Service sevtion Hero.mp4"
            poster="/posters/service_page/Service sevtion Hero.webp"
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
              <Image
                src="/about_us/IS-Logo.webp"
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
                  &gt;
                </span>
                <span className="breadcrumb__link">
                  {industriesPage.breadcrumb}
                </span>
              </div>

              <h1 className="page-hero__title">
                {industriesPage.titleLead}
                <span className="brand-gradient-text">
                  {industriesPage.titleAccent}
                </span>
              </h1>

              <p className="page-hero__sub">{industriesPage.sub}</p>
            </div>

            <FloatingNavbar variant="inline" />
          </div>
        </div>
      </section>

      <section className="flow-section" style={{ backgroundColor: "#F1F1F1" }}>
        <div className="container">
          <h2
            className="section-heading"
            style={{
              color: "#000000",
              marginBlockEnd: "clamp(1.5rem, 3vw, 2.5rem)",
            }}
          >
            {industriesPage.gridHeading.lead}
            <span className="section-heading__accent">
              {industriesPage.gridHeading.accent}
            </span>
          </h2>

          <div className="pj-grid">
            {industriesList.map((item) => (
              <article key={item.id} className="pj-card">
                <div className="pj-card__media">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    sizes="(max-width: 599px) 100vw, (max-width: 1023px) 50vw, 374px"
                    style={{ objectFit: "cover" }}
                  />
                </div>

                <div
                  style={{ display: "flex", flexDirection: "column", gap: "6px" }}
                >
                  <h3 className="pj-card__title">{item.title}</h3>
                  <p className="pj-card__desc">{item.description}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="flow-section" style={{ backgroundColor: "#FFFFFF" }}>
        <div className="container">
          <div className="cta-banner">
            <h2 className="cta-banner__title">{ctaBanner.title}</h2>

            <p className="cta-banner__body">{ctaBanner.body}</p>

            <Link href={ctaBanner.action.href} className="cta-banner__button">
              <span>{ctaBanner.action.label}</span>
              <svg
                width="12"
                height="12"
                viewBox="0 0 12 12"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                style={{ flexShrink: 0 }}
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
        </div>
      </section>

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

      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Industries", path: "/industries" },
        ])}
      />
    </main>
  );
}
