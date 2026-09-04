"use client";

import React, { useState } from "react";
import BackgroundVideo from "@/components/common/BackgroundVideo";
import Image from "next/image";
import Link from "next/link";
import FloatingNavbar from "@/components/navigation/FloatingNavbar";

// Testimonials data exactly from Figma geometry
const testimonials = [
  {
    quote:
      "“Working with this team was a game changer they truly understood our vision, solved key challenges, and delivered a production-ready solution on time.”",
    author: "Arif Rahman",
    role: "Founder & CEO, NexaTech Labs",
    avatar: "/homepage_assets/featured_project_images/white_moontype.png",
  },
  {
    quote:
      "“They brought deep technical expertise and a practical approach helping us move from idea to production faster than expected.”",
    author: "Tanvir Hossain",
    role: "CTO, VoltEdge Systems",
    avatar: "/homepage_assets/featured_project_images/guitar.png",
  },
  {
    quote:
      "“A reliable partner who understands both engineering and business delivering quality without compromise.”",
    author: "Nusrat Karim",
    role: "Co-Founder, Nexlify Tech",
    avatar: "/homepage_assets/featured_project_images/ai.png",
  },
  {
    quote:
      "“Strong communication, fast execution, and production ready outcomes exactly what we needed.”",
    author: "Fahim Rahman",
    role: "Founder, IoTWorks",
    avatar: "/homepage_assets/featured_project_images/blue and black image.png",
  },
];

const driveCards = [
  {
    title: "Precision first",
    desc: "Every trace and line of firmware is engineered with precision for reliable, production-ready performance.",
  },
  {
    title: "Built to ship",
    desc: "We design for manufacturing from day one, not as an afterthought once the prototype works.",
  },
  {
    title: "Honest partnership",
    desc: "Clear timelines, clear costs, and direct answers even when the answer is not yet.",
  },
  {
    title: "Relentless iteration",
    desc: "We treat every revision as a chance to make the product faster, cheaper, or more reliable.",
  },
];

const stats = [
  {
    title: "Innovations Delivered",
    number: "15+",
    desc: "Turning bold ideas into real-world engineering solutions.",
  },
  {
    title: "Industry Sectors",
    number: "4",
    desc: "Delivering embedded solutions across diverse industries.",
  },
  {
    title: "Patents Filed",
    number: "2",
    desc: "Advancing innovation through proprietary technologies.",
  },
  {
    title: "Strategic Partnerships",
    number: "50",
    desc: "Collaborating with innovators to build the future.",
  },
];

const footerLinks = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about" },
  { label: "Industries", href: "/#industries" },
  { label: "Blogs", href: "/blogs" },
  { label: "Privacy Policy", href: "/privacy-policy" },
  { label: "Terms & Condition", href: "#terms" },
  { label: "Contact Us", href: "/contact" },
];

export default function AboutPage() {
  const [chatOpen, setChatOpen] = useState(true);

  return (
    <main className="about-page">
      {/* =====================================================================
          SECTION 1: HERO (Node 1498:14274)
          Full-bleed video behind a constrained content container. The gradient
          quote card is the hero's last flow child and hangs into the white
          section below it by --about-quote-hang.
          ===================================================================== */}
      <section className="about-hero">
        <div className="section-media">
          <BackgroundVideo
            src="/about_us/About Us Hero Section.mp4"
            poster="/posters/about_us/About Us Hero Section.webp"
            loading="eager"
          />
          <div
            className="section-media__scrim"
            style={{ backgroundColor: "rgba(0, 0, 0, 0.32)" }}
          />
        </div>

        <div className="container about-hero__inner">
          <div className="about-hero__head">
            {/* Brand Logo (Node 1498:14274 Logo) */}
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

            {/* Breadcrumb & Main Heading (Node 1498:14276) */}
            <div className="about-hero__copy">
              <div className="breadcrumb">
                {/* Sparkle mark from the reference */}
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
                  ›
                </span>
                <span className="breadcrumb__link">ABOUT US</span>
              </div>

              <h1 className="about-hero__title">
                We are an innovation-driven engineering company that transforms
                ideas into high-performance, market-ready products across
                embedded systems, electronics, smart energy, and industrial
                technologies.
              </h1>
            </div>
          </div>

          {/* Header pill (Node 1498:14285) — composed in the hero's flow, so it
              sits directly under the headline as in the Figma frame. */}
          <FloatingNavbar variant="inline" />

          {/* Floating Gradient Banner (Node 1498:14298) */}
          <blockquote className="about-quote">
            <svg
              className="about-quote__mark"
              viewBox="0 0 48 36"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <path
                d="M0 36V19.8C0 13.6 1.4 8.7 4.2 5.2C7 1.7 11.2 0 16.6 0V7.6C13.6 7.6 11.4 8.5 10 10.2C8.6 12 7.9 14.6 7.9 18.1H16.6V36H0ZM31.4 36V19.8C31.4 13.6 32.8 8.7 35.6 5.2C38.4 1.7 42.6 0 48 0V7.6C45 7.6 42.8 8.5 41.4 10.2C40 12 39.3 14.6 39.3 18.1H48V36H31.4Z"
                fill="currentColor"
              />
            </svg>

            <p className="about-quote__text">
              With over 20 years in electronics R&amp;D, INNOSINO is built on a
              passion for true problem-solving and innovation. We identify
              problems, learn deeply, and engineer better solutions from the
              ground up. Our goal is to empower inventors and entrepreneurs to
              turn ideas into real, manufacturable, and impactful products.
            </p>

            <footer className="about-quote__author">
              <span className="about-quote__avatar" />
              <span>
                <span className="about-quote__name">Shah Jaman</span>
                <span className="about-quote__role">Founder &amp; CEO</span>
              </span>
            </footer>
          </blockquote>
        </div>
      </section>

      {/* =====================================================================
          SECTION 2: VISION & MISSION (Node 1498:14263)
          ===================================================================== */}
      <section className="about-vision">
        <div className="container">
          {/* Row 1: VISION (Node 1498:14264) */}
          <div className="about-row">
            <h2 className="about-row__label">VISION</h2>
            <p className="about-row__desc">
              To become a globally trusted innovation partner the team companies
              call when an idea needs to become a real, working product.
            </p>
          </div>
        </div>

        <div className="container">
          {/* Row 2: MISSION (Node 1498:14268) */}
          <div className="about-row about-row--reverse">
            <p className="about-row__desc">
              We transform ideas into products, deliver engineering solutions,
              bridge R&amp;D and manufacturing, and build lasting partnerships.
            </p>
            <h2 className="about-row__label">MISSION</h2>
          </div>
        </div>

        <div className="container">
          {/* Architecture / Building Image Card (Node 1498:14272) */}
          <div className="about-figure">
            <Image
              src="/about_us/imageundervisionmission.png"
              alt="Innosino Building Architecture"
              fill
              sizes="(max-width: 1023px) 100vw, 970px"
              style={{ objectFit: "cover" }}
            />
          </div>
        </div>
      </section>

      {/* =====================================================================
          SECTION 3: WHAT DRIVES US (Node 1498:14300)
          ===================================================================== */}
      <section
        className="flow-section"
        style={{ backgroundColor: "#F2F2F2", color: "#000000" }}
      >
        <div className="container about-split">
          <h2 className="section-heading" style={{ color: "#000000" }}>
            What Drives <span style={{ color: "#FF7018" }}>Us</span>
          </h2>

          {/* 4 Feature Cards Vertical Stack (Node 1498:14302) */}
          <div className="about-cards">
            {driveCards.map((card, idx) => (
              <div
                key={card.title}
                className={idx === 0 ? "about-card about-card--featured" : "about-card"}
              >
                <h3 className="about-card__title">{card.title}</h3>
                <p className="about-card__desc">{card.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =====================================================================
          SECTION 4: WHAT OUR CLIENTS SAY (Node 1498:14320)
          ===================================================================== */}
      <section className="flow-section" style={{ backgroundColor: "#FFFFFF" }}>
        <div className="container">
          <h2 className="section-heading" style={{ color: "#000000" }}>
            WHAT OUR CLIENTS <span className="section-heading__accent">SAY</span>
          </h2>
        </div>

        {/* Carousel / Cards Track (Node 1498:14321) */}
        <div
          className="about-scroller"
          style={{ marginBlockStart: "clamp(1.5rem, 4.4vw, 64px)" }}
        >
          <div className="about-scroller__track">
            {testimonials.map((t, idx) => (
              <figure key={idx} className="about-testimonial">
                <blockquote className="about-testimonial__quote">
                  {t.quote}
                </blockquote>

                {/* Author Box */}
                <figcaption className="about-testimonial__author">
                  <span className="about-testimonial__avatar">
                    <Image
                      src={t.avatar}
                      alt={t.author}
                      fill
                      sizes="48px"
                      style={{ objectFit: "cover" }}
                    />
                  </span>
                  <span>
                    <span
                      style={{
                        display: "block",
                        fontSize: "var(--fs-lead)",
                        fontWeight: 600,
                        color: "#000000",
                      }}
                    >
                      {t.author}
                    </span>
                    <span
                      style={{
                        fontSize: "0.75rem",
                        fontWeight: 500,
                        color: "#666666",
                      }}
                    >
                      {t.role}
                    </span>
                  </span>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* =====================================================================
          SECTION 5: DRIVING INNOVATION THROUGH RESULTS (Node 1498:14404)
          ===================================================================== */}
      <section
        className="flow-section"
        style={{ backgroundColor: "#000000", color: "#FFFFFF" }}
      >
        <div className="container">
          <h2 className="section-heading" style={{ color: "#FFFFFF" }}>
            DRIVING INNOVATION THROUGH{" "}
            <span className="section-heading__accent">RESULTS</span>
          </h2>

          {/* 4 Metrics Cards (Node 1498:14406 - 14418) */}
          <div
            className="about-stats"
            style={{ marginBlockStart: "clamp(1.5rem, 4.4vw, 64px)" }}
          >
            {stats.map((stat, idx) => (
              <div
                key={stat.title}
                className={idx === 0 ? "about-stat about-stat--featured" : "about-stat"}
              >
                <span className="about-stat__label">{stat.title}</span>
                <span className="about-stat__number">{stat.number}</span>
                <p className="about-stat__desc">{stat.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =====================================================================
          SECTION 6: CTA GLASS BANNER (Node 1498:14351)
          ===================================================================== */}
      <section
        className="flow-section"
        style={{ backgroundColor: "#ffffff" }}
      >
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
          SECTION 7: FOOTER & CHAT WIDGET (Node 1498:14373)
          ===================================================================== */}
      <footer
        className="flow-section"
        style={{ backgroundColor: "#000000", paddingBlockStart: 0 }}
      >
        <div className="container">
          {/* Interactive Chat Widget (Node 1498:14397) */}
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

          {/* Bottom Copyright & Links Bar (Node 1498:14374) */}
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
    </main>
  );
}
