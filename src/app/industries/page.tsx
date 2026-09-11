import React from "react";
import BrandLogo from "@/components/navigation/BrandLogo";
import SiteFooter from "@/components/common/SiteFooter";
import { client } from "@/sanity/client";
import {
  INDUSTRIES_PAGE_QUERY,
  INDUSTRIES_QUERY,
  SITE_SETTINGS_QUERY,
  type Industry,
  type IndustriesPageData,
  type SiteSettings,
} from "@/sanity/queries";
import Image from "next/image";
import Link from "next/link";
import BackgroundVideo from "@/components/common/BackgroundVideo";
import FloatingNavbar from "@/components/navigation/FloatingNavbar";
import JsonLd from "@/components/seo/JsonLd";
import { breadcrumbSchema } from "@/content/schema";

/**
 * The industries index. "Industries" was a homepage anchor (/#industries) in
 * the navbar and the footer, so the nine sectors had no URL of their own and
 * nothing to say about any of them beyond a title in a marquee. This is that
 * page; the navbar and the footer now point at it instead of the anchor.
 */
export default async function IndustriesPage() {
  const [page, industriesList, settings] = await Promise.all([
    client.fetch<IndustriesPageData>(INDUSTRIES_PAGE_QUERY),
    client.fetch<Industry[]>(INDUSTRIES_QUERY),
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
                <span className="breadcrumb__link">
                  {page.hero.breadcrumb}
                </span>
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

      <section className="flow-section" style={{ backgroundColor: "#F1F1F1" }}>
        <div className="container">
          <h2
            className="section-heading"
            style={{
              color: "#000000",
              marginBlockEnd: "clamp(1.5rem, 3vw, 2.5rem)",
            }}
          >
            {page.gridHeading.lead}
            <span className="section-heading__accent">
              {page.gridHeading.accent}
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
            <h2 className="cta-banner__title">{settings.ctaBanner.title}</h2>

            <p className="cta-banner__body">{settings.ctaBanner.body}</p>

            <Link href={settings.ctaBanner.action.href} className="cta-banner__button">
              <span>{settings.ctaBanner.action.label}</span>
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
      <SiteFooter settings={settings} />

      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Industries", path: "/industries" },
        ])}
      />
    </main>
  );
}
