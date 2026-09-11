import React from "react";
import BrandLogo from "@/components/navigation/BrandLogo";
import SiteFooter from "@/components/common/SiteFooter";
import { applyHref } from "@/lib/apply-href";
import { client } from "@/sanity/client";
import {
  CAREER_PAGE_QUERY,
  OPEN_ROLES_QUERY,
  SITE_SETTINGS_QUERY,
  type CareerPageData,
  type OpenRole,
  type SiteSettings,
} from "@/sanity/queries";
import Image from "next/image";
import Link from "next/link";
import BackgroundVideo from "@/components/common/BackgroundVideo";
import FloatingNavbar from "@/components/navigation/FloatingNavbar";
import JsonLd from "@/components/seo/JsonLd";
import { breadcrumbSchema } from "@/content/schema";

/**
 * The careers page. "Career" was a dead `#careers` anchor in the navbar's More
 * panel, so the site advertised hiring and then had nowhere to send anyone.
 *
 * There is no form here on purpose: this is a static export with no backend,
 * and a form that silently drops applications is worse than a mailto that
 * reaches a real inbox.
 */
export default async function CareerPage() {
  const [page, openRoles, settings] = await Promise.all([
    client.fetch<CareerPageData>(CAREER_PAGE_QUERY),
    client.fetch<OpenRole[]>(OPEN_ROLES_QUERY),
    client.fetch<SiteSettings>(SITE_SETTINGS_QUERY),
  ]);


  return (
    <main className="svc-page">
      <section className="page-hero">
        <div className="section-media">
          <BackgroundVideo
            src="/service_page/Service section Hero.mp4"
            poster="/posters/service_page/Service section Hero.webp"
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
              <BrandLogo />
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
                <span className="breadcrumb__link">{page.hero.breadcrumb}</span>
              </div>

              <h1 className="page-hero__title">
                {page.hero.titleLead}
                <span className="brand-gradient-text">
                  {page.hero.titleAccent}
                </span>
              </h1>

              <p className="page-hero__sub">{page.hero.sub}</p>
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
            {page.whyJoinHeading.lead}
            <span className="section-heading__accent">
              {page.whyJoinHeading.accent}
            </span>
          </h2>

          <div className="svc-process svc-why">
            <div className="svc-grid">
              {page.whyJoinCards.map((card, index) => (
                <div
                  key={card.title}
                  /* The settled frame rules only the first card. */
                  className={index === 0 ? "svc-card svc-card--lead" : "svc-card"}
                >
                  <div>
                    <h3 className="svc-card__title">{card.title}</h3>
                    <p className="svc-card__desc">{card.description}</p>
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
                key={role.number}
                href={applyHref(settings.email, role.title)}
                className="svc-list__row"
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <span className="svc-list__num">{role.number}</span>
                <p className="svc-list__desc">{role.description}</p>
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
            {page.hiringHeading.lead}
            <span className="section-heading__accent">
              {page.hiringHeading.accent}
            </span>
          </h2>

          <div className="svc-process">
            <div className="svc-grid svc-grid--pair">
              {page.hiringSteps.map((step) => (
                <div key={step.number} className="svc-card">
                  <span className="svc-card__eyebrow">{step.number}</span>
                  <div>
                    <h3 className="svc-card__title">{step.title}</h3>
                    <p className="svc-card__desc">{step.description}</p>
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
            {page.lifeHeading.lead}
            <span className="section-heading__accent">
              {page.lifeHeading.accent}
            </span>
          </h2>

          <div className="pj-grid">
            {page.lifePhotos.map((photo) => (
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
            href={page.lifeLink.href}
            className="pill-button"
            style={{ marginBlockStart: "clamp(1.5rem, 3vw, 2.5rem)" }}
          >
            {page.lifeLink.label}
          </Link>
        </div>
      </section>

      {/* Open application */}
      <section className="flow-section" style={{ backgroundColor: "#FFFFFF" }}>
        <div className="container">
          <div className="cta-banner">
            <h2 className="cta-banner__title">{page.cta.title}</h2>

            <p className="cta-banner__body">{page.cta.body}</p>

            <a href={page.cta.action.href} className="cta-banner__button">
              <span>{page.cta.action.label}</span>
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
      <SiteFooter settings={settings} />

      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Career", path: "/career" },
        ])}
      />
    </main>
  );
}
