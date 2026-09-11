import React from "react";
import BrandLogo from "@/components/navigation/BrandLogo";
import Link from "next/link";
import BackgroundVideo from "@/components/common/BackgroundVideo";
import FloatingNavbar from "@/components/navigation/FloatingNavbar";
import JsonLd from "@/components/seo/JsonLd";
import { breadcrumbSchema } from "@/content/schema";
import { client } from "@/sanity/client";
import {
  SERVICES_QUERY,
  SERVICES_PAGE_QUERY,
  type PageHero,
  type Service,
} from "@/sanity/queries";

/**
 * The services index. This URL used to be the Hardware & PCB Design page
 * itself, which is why the nav's six discipline links had nowhere to point:
 * the detail content now lives under /services/[slug] and this lists it.
 */
export default async function ServicesIndexPage() {
  const [services, page] = await Promise.all([
    client.fetch<Service[]>(SERVICES_QUERY),
    client.fetch<{ hero: PageHero }>(SERVICES_PAGE_QUERY),
  ]);
  const { hero } = page;

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
                <span className="breadcrumb__link">{hero.breadcrumb}</span>
              </div>

              <h1 className="page-hero__title">
                {hero.titleLead}
                <span className="brand-gradient-text">
                  {hero.titleAccent}
                </span>
              </h1>

              <p className="page-hero__sub">{hero.sub}</p>
            </div>

            <FloatingNavbar variant="inline" />
          </div>
        </div>
      </section>

      <section className="flow-section" style={{ backgroundColor: "#F1F1F1" }}>
        <div className="container">
          <div className="svc-process">
            <div className="svc-grid">
              {services.map((service, index) => (
                <Link
                  key={service.slug}
                  href={`/services/${service.slug}`}
                  className={
                    index === 0 ? "svc-card svc-card--lead" : "svc-card"
                  }
                >
                  <span className="svc-card__eyebrow">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <h2 className="svc-card__title">{service.title}</h2>
                    <p className="svc-card__desc">{service.description}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>
      <JsonLd
        data={breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Services", path: "/services" },
        ])}
      />

    </main>
  );
}
