"use client";

import React, { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import BackgroundVideo from "@/components/common/BackgroundVideo";
import Image from "next/image";
import Link from "next/link";
import FloatingNavbar from "@/components/navigation/FloatingNavbar";
import type { Service } from "@/content/services";

gsap.registerPlugin(ScrollTrigger, useGSAP);

/**
 * The hero card's two states, from the Service Hero Section set (Figma node
 * 1057:8832). Variant 01 rests it centred and hanging below the hero at
 * (234.7, 548.7), 970.6x546.6, 18px radius; variant 02 has it at (944, -856),
 * turned 45deg and dissolved out.
 *
 * The move is expressed against the card's own size rather than the 1440 frame
 * -- 709/970.6 across and 1405/546.6 up -- so it travels the same way at any
 * width.
 */
const CARD_EXIT = { xPercent: 73, yPercent: -257, rotation: 45 };






// Industries for auto-slider
const industriesList = [
  { title: "Consumer Electronics", image: "/homepage_assets/industries/Consumer Electronics.jpg" },
  { title: "Renewable Energy", image: "/homepage_assets/industries/Renewable Energy.jpg" },
  { title: "Industrial Automation", image: "/homepage_assets/industries/Industrial Automation.png" },
  { title: "Smart IOT", image: "/homepage_assets/industries/Smart IOT.png" },
  { title: "Engineering Education", image: "/homepage_assets/industries/Engineering Education.png" },
  { title: "Digital Musical Instruments", image: "/homepage_assets/industries/Digital Musical Instruments.png" },
  { title: "Biomedical Electronics", image: "/homepage_assets/industries/Biomedical Electronics.png" },
  { title: "NFC and RFID Technology", image: "/homepage_assets/industries/NFC and RFID Technology.png" },
];

// Partner Logos for continuous right-to-left sliding marquee
const partnerLogos = [
  { name: "Adobe", color: "#FA0F00", symbol: "A" },
  { name: "GitLab", color: "#FC6D26", symbol: "🦊" },
  { name: "pendo", color: "#FF3366", symbol: "✦" },
  { name: "hotjar", color: "#FD3A00", symbol: "🔥" },
  { name: "Fivetran", color: "#006BFF", symbol: "彡" },
  { name: "Airwallex", color: "#000000", symbol: "❖" },
  { name: "ROS", color: "#FF4A00", symbol: "●" },
  { name: "Matter", color: "#000000", symbol: "⬡" },
  { name: "FreeRTOS", color: "#0083D7", symbol: "▲" },
  { name: "Altium", color: "#A87A24", symbol: "✦" },
];

export default function ServiceDetail({ service }: { service: Service }) {
  const [openFaq, setOpenFaq] = useState<number | null>(2); // Default open: index 2
  const [chatOpen, setChatOpen] = useState(true);
  const [sliderX, setSliderX] = useState(0);
  const [partnersSliderX, setPartnersSliderX] = useState(0);


  // Continuous auto-sliding for industry carousel
  useEffect(() => {
    let animId: number;
    const itemWidth = 400;
    const totalWidth = industriesList.length * itemWidth;

    const animate = () => {
      setSliderX((prev) => (prev + 0.8) % totalWidth);
      animId = requestAnimationFrame(animate);
    };

    animId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animId);
  }, []);

  // Continuous auto-sliding for partner logos (right to left)
  useEffect(() => {
    let animId: number;
    const itemWidth = 260;
    const totalWidth = partnerLogos.length * itemWidth;

    const animate = () => {
      setPartnersSliderX((prev) => (prev + 0.6) % totalWidth);
      animId = requestAnimationFrame(animate);
    };

    animId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animId);
  }, []);

  const heroMediaRef = useRef<HTMLDivElement>(null);

  /**
   * The card turns out of the hero as you scroll it away: 45deg, up and to the
   * right, corners opening from 18 to 0, dissolving as it goes. Figma states it
   * as a 1600ms variant change with no trigger recorded, and scrubbing it on the
   * hero's own scroll is what keeps variant 01 -- the card centred, which is the
   * page at rest -- as what you actually land on.
   */
  useGSAP(() => {
    const el = heroMediaRef.current;
    if (!el) return;
    const mm = gsap.matchMedia();
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      gsap.to(el, {
        ...CARD_EXIT,
        opacity: 0,
        borderRadius: 0,
        // Figma's own ease on the transition.
        ease: "power1.inOut",
        scrollTrigger: {
          trigger: ".page-hero",
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });
    });
    return () => mm.revert();
  }, []);

  const displayIndustries = [...industriesList, ...industriesList, ...industriesList];
  const displayPartners = [...partnerLogos, ...partnerLogos, ...partnerLogos, ...partnerLogos];

  return (
    <main className="svc-page">
      {/* =====================================================================
          SECTION 1: SERVICE HERO (Node 1498:14571)
          The PCB video card (Node 1498:14585) is the hero's last flow child and
          hangs into the white band below it by --page-hero-hang.
          ===================================================================== */}
      <section className="page-hero">
        <div className="section-media">
          <BackgroundVideo
            src="/service_page/Service sevtion Hero.mp4"
            poster="/posters/service_page/Service sevtion Hero.webp"
            webmSrc="/service_page/Service sevtion Hero.webm"
            loading="eager"
          />
          <div
            className="section-media__scrim"
            style={{ backgroundColor: "rgba(0, 0, 0, 0.4)" }}
          />
        </div>

        <div className="container page-hero__inner">
          <div className="page-hero__head">
            {/* Logo: Node 1498:14573 */}
            <Link href="/" aria-label="INNOSINO home" className="brand-logo-link">
              <Image
                src="/about_us/IS-Logo.png"
                alt="INNOSINO"
                width={340}
                height={128}
                className="brand-logo"
                preload
              />
            </Link>

            {/* Hero Content Frame: Node 1498:14574 */}
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
                <Link href="/services" className="breadcrumb__link">
                  SERVICES
                </Link>
                <span className="breadcrumb__link" aria-hidden="true">
                  ›
                </span>
                <span className="breadcrumb__link">{service.title}</span>
              </div>

              <h1 className="page-hero__title">{service.title}</h1>

              <p className="page-hero__sub">
                {service.description}
              </p>
            </div>
          </div>

          {/* Header pill (Node 1498:14584) — composed in the hero's flow, then
              floats once it scrolls away. */}
          <FloatingNavbar variant="inline" />

          {/* Overlapping PCB video card (Node 1498:14585) */}
          <div className="page-hero__media" ref={heroMediaRef}>
            <BackgroundVideo
              src="/service_page/Service -Video.mp4"
              poster="/posters/service_page/Service -Video.webp"
              loading="lazy"
            />
          </div>
        </div>
      </section>

      {/* =====================================================================
          SECTION 2: TRUSTED BY & PARTNERS (Node 1498:14587)
          ===================================================================== */}
      <section className="hero-follow">
        <div className="container">
          <h2 className="svc-partners__title">
            TRUSTED BY 30+ Global Partners &amp; Collaborations
          </h2>
        </div>

        <div className="svc-partners__rows">
          <div className="svc-partners__fade svc-partners__fade--left" />
          <div className="svc-partners__fade svc-partners__fade--right" />

          {[0, 1].map((row) => (
            <div
              key={row}
              className="svc-partners__row"
              style={{
                transform: `translateX(-${
                  row === 0
                    ? partnersSliderX
                    : (partnersSliderX * 1.15 + 180) % (partnerLogos.length * 260)
                }px)`,
              }}
            >
              {displayPartners.map((brand, bIdx) => (
                <div
                  key={`r${row}-${bIdx}`}
                  className="svc-partner"
                  style={{ color: brand.color }}
                >
                  <span
                    style={{
                      fontSize: brand.name === "Adobe" ? "1.1em" : "0.85em",
                      fontWeight: 900,
                    }}
                  >
                    {brand.symbol}
                  </span>
                  <span>{brand.name}</span>
                </div>
              ))}
            </div>
          ))}
        </div>
      </section>

      {/* =====================================================================
          SECTION 3: OUR HARDWARE & PCB DESIGN PROCESS (Node 1498:14592)
          ===================================================================== */}
      <section className="flow-section" style={{ backgroundColor: "#F1F1F1" }}>
        <div className="container">
          <h2 className="section-heading" style={{ color: "#000000" }}>
            OUR {service.title}{" "}
            <span className="brand-gradient-text">PROCESS</span>
          </h2>

          <div className="svc-process">
            <div className="svc-grid">
              {service.processStages.slice(0, 3).map((item, index) => (
                <div
                  key={item.stage}
                  /* The frame gives only the opening stage the gradient rule. */
                  className={index === 0 ? "svc-card svc-card--lead" : "svc-card"}
                >
                  <span className="svc-card__eyebrow">{item.stage}</span>
                  <div>
                    <h3 className="svc-card__title">{item.title}</h3>
                    <p className="svc-card__desc">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="svc-grid svc-grid--pair">
              {service.processStages.slice(3, 5).map((item) => (
                <div key={item.stage} className="svc-card">
                  <span className="svc-card__eyebrow">{item.stage}</span>
                  <div>
                    <h3 className="svc-card__title">{item.title}</h3>
                    <p className="svc-card__desc">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================================
          SECTION 4: OUR ON-DEMAND HARDWARE SERVICES (Node 1498:14628)
          ===================================================================== */}
      <section className="flow-section" style={{ backgroundColor: "#FFFFFF" }}>
        <div className="container">
          <h2 className="section-heading" style={{ color: "#000000" }}>
            OUR ON-DEMAND HARDWARE{" "}
            <span className="brand-gradient-text">SERVICES</span>
          </h2>

          <div
            className="svc-list"
            style={{ marginBlockStart: "clamp(1.5rem, 3.3vw, 48px)" }}
          >
            {service.onDemandServices.map((item) => (
              <div key={item.num} className="svc-list__row">
                <span className="svc-list__num">{item.num}</span>
                <p className="svc-list__desc">{item.desc}</p>
                <h3 className="svc-list__title">{item.title}</h3>
                <span className="svc-list__icon">
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
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 5: REPRESENTATIVE WORK (Node 1498:14674). Only shown for
          disciplines that have photographed work; the rest
          drop the section rather than carry invented case studies. */}
      {service.projects && service.projects.length > 0 && (
        <section className="flow-section" style={{ backgroundColor: "#000000" }}>
          <div className="container">
            <h2 className="section-heading" style={{ color: "#FFFFFF" }}>
              REPRESENTATIVE <span style={{ color: "#FF7018" }}>WORK</span>
            </h2>

            <div
              style={{
                marginBlockStart: "clamp(1.5rem, 3.3vw, 48px)",
                display: "flex",
                flexDirection: "column",
                gap: "clamp(1.5rem, 2.8vw, 40px)",
              }}
            >
              {service.projects.map((proj) => (
                <article key={proj.title} className="svc-work">
                  <div className="svc-work__body">
                    <div>
                      <span className="svc-work__eyebrow">● {proj.category}</span>
                      <h3 className="svc-work__title">{proj.title}</h3>
                      <p className="svc-work__desc">{proj.desc}</p>
                    </div>

                    <Link href="/contact" className="svc-work__cta">
                      <span>Book a Call</span>
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
                          stroke="#000000"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </Link>
                  </div>

                  <div className="svc-work__media">
                    <Image
                      src={proj.image}
                      alt={proj.title}
                      fill
                      sizes="(max-width: 899px) 100vw, 520px"
                      style={{ objectFit: "cover" }}
                    />
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* =====================================================================
          SECTION 6: WHY IS INNOSINO THE RIGHT PARTNER (Node 1498:14733)
          ===================================================================== */}
      <section className="flow-section" style={{ backgroundColor: "#F6F6F6" }}>
        <div className="container">
          <h2 className="section-heading" style={{ color: "#000000" }}>
            WHY IS INNOSINO THE RIGHT {service.title}{" "}
            <span className="brand-gradient-text">PARTNER?</span>
          </h2>

          <div
            className="svc-grid"
            style={{ marginBlockStart: "clamp(1.5rem, 3.3vw, 48px)" }}
          >
            {service.whyUsPoints.map((item) => (
              <div key={item.num} className="svc-card">
                <span className="svc-card__eyebrow">● {item.num}</span>
                <div>
                  <h3 className="svc-card__title">{item.title}</h3>
                  <p className="svc-card__desc">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =====================================================================
          SECTION 7: FREQUENTLY ASKED QUESTIONS (Node 1498:14775)
          ===================================================================== */}
      <section className="flow-section" style={{ backgroundColor: "#FFFFFF" }}>
        <div className="container">
          <h2 className="section-heading" style={{ color: "#000000" }}>
            HAVE <span style={{ color: "#FF7018" }}>QUESTIONS?</span>
          </h2>

          <div
            className="faq"
            style={{ marginBlockStart: "clamp(1.5rem, 3.3vw, 48px)" }}
          >
            {service.faqs.map((faq, fIdx) => {
              const isOpen = openFaq === fIdx;
              return (
                <div key={faq.q} className="faq__item">
                  <button
                    type="button"
                    onClick={() => setOpenFaq(isOpen ? null : fIdx)}
                    className="faq__button"
                    aria-expanded={isOpen}
                  >
                    <span>{faq.q}</span>
                    <span
                      style={{
                        fontSize: "20px",
                        color: "#999999",
                        flexShrink: 0,
                        transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
                        transition: "transform 0.2s ease",
                      }}
                    >
                      ▾
                    </span>
                  </button>
                  {isOpen && <div className="faq__answer">{faq.a}</div>}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* =====================================================================
          SECTION 8: INDUSTRY SOLUTIONS (Node 1498:14806)
          ===================================================================== */}
      <section className="flow-section" style={{ backgroundColor: "#000000" }}>
        <div className="container">
          <h2
            className="section-lede"
            style={{ fontFamily: "'Cal Sans', 'Outfit', sans-serif", fontWeight: 400 }}
          >
            Discover the industries we serve with innovative technology and smart
            engineering solutions for real-world challenges.
          </h2>
        </div>

        <div
          className="marquee"
          style={{ marginBlockStart: "clamp(1.5rem, 3.9vw, 3rem)" }}
        >
          <div
            className="marquee__track"
            style={{ transform: `translateX(-${sliderX}px)` }}
          >
            {displayIndustries.map((item, idx) => (
              <div key={idx} className="svc-industry">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  sizes="(max-width: 768px) 60vw, 370px"
                  style={{ objectFit: "cover" }}
                />
                <div className="svc-industry__scrim" />
                <h3 className="svc-industry__title">{item.title}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =====================================================================
          SECTION 9: CTA GLASS BANNER (Node 1498:14815)
          ===================================================================== */}
      <section className="flow-section" style={{ backgroundColor: "#FFFFFF" }}>
        <div className="container">
          <div className="cta-banner">
            <h2 className="cta-banner__title">
              HAVE AN IDEA? LET&apos;S ENGINEER IT INTO A PRODUCT.
            </h2>

            <p className="cta-banner__body">
              Tell us about your project hardware, firmware, or both. We&apos;ll
              come back with a clear path from concept to production.
            </p>

            <Link href="/contact" className="cta-banner__button">
              <span>Book a Call</span>
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

      {/* =====================================================================
          SECTION 10: FOOTER & CHAT WIDGET (Node 1498:14837)
          ===================================================================== */}
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
                  Welcome to Innosino! Need help? Just reply to this
                  message&mdash;we&rsquo;re online and ready to assist you.
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
              className="chat-dock__toggle"
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

          <div className="footer-bar">
            <p
              style={{
                margin: 0,
                fontSize: "var(--fs-small)",
                fontWeight: 400,
                color: "rgba(255, 255, 255, 0.8)",
              }}
            >
              © 2026 Innosion All Rights Reserved
            </p>

            <div className="footer-bar__links">
              {[
                { label: "Home", href: "/" },
                { label: "About Us", href: "/about" },
                { label: "Services", href: "/services" },
                { label: "Industries", href: "/#industries" },
                { label: "Blogs", href: "/blogs" },
                { label: "Privacy Policy", href: "/privacy-policy" },
                { label: "Terms & Condition", href: "#terms" },
                { label: "Contact Us", href: "/contact" },
              ].map((link) => (
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
    </main>
  );
}
