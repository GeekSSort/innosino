"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import BackgroundVideo from "@/components/common/BackgroundVideo";
import FloatingNavbar from "@/components/navigation/FloatingNavbar";
import JsonLd from "@/components/seo/JsonLd";
import { breadcrumbSchema } from "@/content/schema";
import {
  applyHref,
  careerCta,
  careerHero,
  hiring,
  lifeStrip,
  openRoles,
  whyJoin,
} from "@/content/career";
import { chatWidget, copyright, footerLinks } from "@/content/site";

/**
 * The careers page. "Career" was a dead `#careers` anchor in the navbar's More
 * panel, so the site advertised hiring and then had nowhere to send anyone.
 *
 * There is no form here on purpose: this is a static export with no backend,
 * and a form that silently drops applications is worse than a mailto that
 * reaches a real inbox.
 */
export default function CareerPage() {
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
                <span className="breadcrumb__link">{careerHero.breadcrumb}</span>
              </div>

              <h1 className="page-hero__title">
                {careerHero.titleLead}
                <span className="brand-gradient-text">
                  {careerHero.titleAccent}
                </span>
              </h1>

              <p className="page-hero__sub">{careerHero.sub}</p>
            </div>

            <FloatingNavbar variant="inline" />
          </div>
        </div>
      </section>

      {/* Why engineers stay */}
      <section className="flow-section" style={{ backgroundColor: "#FFFFFF" }}>
        <div className="container">
          <h2
            className="section-heading"
            style={{
              color: "#000000",
              marginBlockEnd: "clamp(1.5rem, 3vw, 2.5rem)",
            }}
          >
            {whyJoin.heading.lead}
            <span className="section-heading__accent">
              {whyJoin.heading.accent}
            </span>
          </h2>

          <div className="svc-process svc-why">
            <div className="svc-grid">
              {whyJoin.cards.map((card, index) => (
                <div
                  key={card.title}
                  /* The settled frame rules only the first card. */
                  className={index === 0 ? "svc-card svc-card--lead" : "svc-card"}
                >
                  <div>
                    <h3 className="svc-card__title">{card.title}</h3>
                    <p className="svc-card__desc">{card.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Open roles. Each row is the application link itself. */}
      <section className="flow-section" style={{ backgroundColor: "#FFFFFF" }}>
        <div className="container">
          <h2 className="section-heading" style={{ color: "#000000" }}>
            OPEN <span className="section-heading__accent">ROLES</span>
          </h2>

          <div className="svc-list" style={{ marginBlockStart: "clamp(1.5rem, 3.3vw, 48px)" }}>
            {openRoles.map((role) => (
              <a
                key={role.num}
                href={applyHref(role.title)}
                className="svc-list__row"
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <span className="svc-list__num">{role.num}</span>
                <p className="svc-list__desc">{role.desc}</p>
                <h3 className="svc-list__title">
                  {role.title}
                  <span
                    style={{
                      display: "block",
                      marginBlockStart: "6px",
                      fontSize: "var(--fs-small)",
                      fontWeight: 500,
                      color: "#FF7018",
                    }}
                  >
                    {role.meta}
                  </span>
                </h3>
                <span className="svc-list__icon" aria-hidden="true">
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M7 17L17 7M17 7H7M17 7V17"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* How we hire */}
      <section className="flow-section" style={{ backgroundColor: "#F1F1F1" }}>
        <div className="container">
          <h2
            className="section-heading"
            style={{
              color: "#000000",
              marginBlockEnd: "clamp(1.5rem, 3vw, 2.5rem)",
            }}
          >
            {hiring.heading.lead}
            <span className="section-heading__accent">
              {hiring.heading.accent}
            </span>
          </h2>

          <div className="svc-process">
            <div className="svc-grid svc-grid--pair">
              {hiring.steps.map((step) => (
                <div key={step.num} className="svc-card">
                  <span className="svc-card__eyebrow">{step.num}</span>
                  <div>
                    <h3 className="svc-card__title">{step.title}</h3>
                    <p className="svc-card__desc">{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* The place you would work */}
      <section className="flow-section" style={{ backgroundColor: "#FFFFFF" }}>
        <div className="container">
          <h2
            className="section-heading"
            style={{
              color: "#000000",
              marginBlockEnd: "clamp(1.5rem, 3vw, 2.5rem)",
            }}
          >
            {lifeStrip.heading.lead}
            <span className="section-heading__accent">
              {lifeStrip.heading.accent}
            </span>
          </h2>

          <div className="pj-grid">
            {lifeStrip.photos.map((photo) => (
              <div key={photo.src} className="pj-card__media">
                <Image
                  src={photo.src}
                  alt={photo.alt}
                  fill
                  sizes="(max-width: 599px) 100vw, (max-width: 1023px) 50vw, 374px"
                  style={{ objectFit: "cover" }}
                />
              </div>
            ))}
          </div>

          <Link
            href={lifeStrip.link.href}
            className="pill-button"
            style={{ marginBlockStart: "clamp(1.5rem, 3vw, 2.5rem)" }}
          >
            {lifeStrip.link.label}
          </Link>
        </div>
      </section>

      {/* Open application */}
      <section className="flow-section" style={{ backgroundColor: "#FFFFFF" }}>
        <div className="container">
          <div className="cta-banner">
            <h2 className="cta-banner__title">{careerCta.title}</h2>

            <p className="cta-banner__body">{careerCta.body}</p>

            <a href={careerCta.action.href} className="cta-banner__button">
              <span>{careerCta.action.label}</span>
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
            </a>
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
          { name: "Career", path: "/career" },
        ])}
      />
    </main>
  );
}
