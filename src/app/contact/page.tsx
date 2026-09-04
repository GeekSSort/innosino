"use client";

import React, { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";
import { CustomEase } from "gsap/CustomEase";
import { useGSAP } from "@gsap/react";
import BackgroundVideo from "@/components/common/BackgroundVideo";
import Image from "next/image";
import Link from "next/link";
import FloatingNavbar from "@/components/navigation/FloatingNavbar";
import { chatWidget, copyright, footerLinks } from "@/content/site";
import {
  contactFaqs,
  contactForm,
  contactHeadings,
  contactHero,
  contactHubs,
  hubsLede,
} from "@/content/contact";

gsap.registerPlugin(CustomEase, useGSAP);

/** The transition's own easing, cubic-bezier(.42, 0, .58, 1). */
const CARD_EASE = CustomEase.create("ctCardInOut", "M0,0 C0.42,0 0.58,1 1,1");

/**
 * Where each hub card starts, by column. The set's first variant parks
 * Shanghai off the left edge at (-285, 278) against a resting (135, 646) and
 * Dhaka past the bottom right at (1026, 826) against (735, 646), so they close
 * on the row from opposite corners. Taken against the 570x270 card so they
 * hold at any width.
 */
const HUB_ENTRY = [
  { x: -73.7, y: -136.3 },
  { x: 51.05, y: 66.7 },
];


export default function ContactPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [chatOpen, setChatOpen] = useState(true);
  const [copiedItem, setCopiedItem] = useState<string | null>(null);

  // Form states
  const [fullName, setFullName] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [countryCode, setCountryCode] = useState("+880");
  const [serviceNeeded, setServiceNeeded] = useState("");
  const [projectBrief, setProjectBrief] = useState("");
  const [submitted, setSubmitted] = useState(false);

  // Live clocks for Shanghai and Dhaka
  const [shanghaiTime, setShanghaiTime] = useState("12:24 AM");
  const [dhakaTime, setDhakaTime] = useState("10:24 AM");

  const cardRef = useRef<HTMLDivElement>(null);

  /**
   * The form card arrives, which is the difference between the set's two
   * variants: the hero alone, then the hero with the card over it. The
   * transition carries the card from (-507.05, 1558.64) at 0.81 rad to its
   * resting (234, 342) upright, so it swings up from below and to the left,
   * unwinding a 46deg tilt over 1600ms. Figma measures rotation
   * counter-clockwise, so its 0.81 rad is -46.4 in CSS, and the offsets are
   * taken against the 966x776 card so they hold at any width.
   *
   * The card is the reason anyone is on this page, so it plays on load rather
   * than on scroll -- it sits above the fold -- and below 1024px, where the
   * card is nearly the full viewport width, it just rises: a 46deg tilt there
   * would swing most of it outside the hero's clip.
   */
  const hubsRef = useRef<HTMLDivElement>(null);

  /**
   * The hub row closes in, which is the difference between this set's two
   * variants: the two cards arrive from opposite corners while the lede above
   * them rises the 141px between its two positions, all over the transition's
   * own 1600ms and easing.
   *
   * Below 900px the cards are near the full container width and the frame's
   * vectors would sling them most of a viewport away, so they just rise. The
   * page already clips (see .ct-page), which is what keeps Dhaka's arc down
   * and to the right from touching the scroll range.
   */
  useGSAP(
    () => {
      const root = hubsRef.current;
      if (!root) return;
      const mm = gsap.matchMedia();

      mm.add(
        {
          wide: "(min-width: 900px) and (prefers-reduced-motion: no-preference)",
          narrow: "(max-width: 899px) and (prefers-reduced-motion: no-preference)",
        },
        (context) => {
          const wide = context.conditions?.wide;
          const trigger = { trigger: root, start: "top 85%", once: true };

          const lede = root.querySelector(".ct-lede");
          if (lede) {
            gsap.from(lede, {
              y: wide ? 141 : 24,
              opacity: 0,
              duration: 1.6,
              ease: CARD_EASE,
              scrollTrigger: trigger,
            });
          }

          gsap.utils
            .toArray<HTMLElement>(root.querySelectorAll(".ct-hub"))
            .forEach((hub, i) => {
              const from = wide ? HUB_ENTRY[i % HUB_ENTRY.length] : undefined;
              gsap.from(hub, {
                xPercent: from?.x ?? 0,
                yPercent: from?.y ?? 0,
                y: from ? 0 : 24,
                opacity: 0,
                duration: 1.6,
                ease: CARD_EASE,
                scrollTrigger: trigger,
              });
            });
        },
      );
      return () => mm.revert();
    },
    { scope: hubsRef },
  );

  useGSAP(
    () => {
      const card = cardRef.current;
      if (!card) return;
      const mm = gsap.matchMedia();

      mm.add(
        {
          wide: "(min-width: 1024px) and (prefers-reduced-motion: no-preference)",
          narrow: "(max-width: 1023px) and (prefers-reduced-motion: no-preference)",
        },
        (context) => {
          const wide = context.conditions?.wide;
          gsap.from(card, {
            xPercent: wide ? -76.7 : 0,
            yPercent: wide ? 156.8 : 6,
            rotation: wide ? -46.4 : 0,
            opacity: 0,
            duration: 1.6,
            ease: CARD_EASE,
          });
        },
      );
      return () => mm.revert();
    },
    { scope: cardRef },
  );


  // Update live times
  useEffect(() => {
    const updateClocks = () => {
      const now = new Date();
      try {
        const sh = new Intl.DateTimeFormat("en-US", {
          timeZone: "Asia/Shanghai",
          hour: "numeric",
          minute: "numeric",
          hour12: true,
        }).format(now);
        setShanghaiTime(sh);

        const dh = new Intl.DateTimeFormat("en-US", {
          timeZone: "Asia/Dhaka",
          hour: "numeric",
          minute: "numeric",
          hour12: true,
        }).format(now);
        setDhakaTime(dh);
      } catch (e) {}
    };

    updateClocks();
    const interval = setInterval(updateClocks, 30000);
    return () => clearInterval(interval);
  }, []);

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedItem(id);
    setTimeout(() => setCopiedItem(null), 2000);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const CopyIcon = () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="8" y="8" width="12" height="12" rx="2" stroke="#515151" strokeWidth="2" />
      <path
        d="M16 8V6C16 4.89543 15.1046 4 14 4H6C4.89543 4 4 4.89543 4 6V14C4 15.1046 4.89543 16 6 16H8"
        stroke="#515151"
        strokeWidth="2"
      />
    </svg>
  );

  return (
    <main className="ct-page">
      {/* =====================================================================
          SECTION 1: HERO & OVERLAPPING CONTACT FORM (Node 1498:14425)
          The form card is the hero's last flow child and hangs into the white
          band below it by --page-hero-hang.
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
            style={{ backgroundColor: "rgba(0, 0, 0, 0.45)" }}
          />
        </div>

        <div className="container page-hero__inner">
          <div className="page-hero__head">
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
                <span
                  className="breadcrumb__link"
                  style={{ letterSpacing: "0.08em" }}
                >
                  CONTACT US
                </span>
              </div>

              <h1 className="page-hero__title">{contactHero.title}</h1>

              <p className="page-hero__sub">{contactHero.sub}</p>
            </div>
          </div>

          {/* Header pill — composed in the hero's flow, then floats once it
              scrolls away (same behaviour as the services page). */}
          <FloatingNavbar variant="inline" />

          {/* Overlapping Contact Form Card (Node 1498:14425) */}
          <div className="ct-card" ref={cardRef}>
            {/* Left column */}
            <div className="ct-card__col">
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "clamp(1rem, 1.7vw, 24px)",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "clamp(0.75rem, 1.1vw, 16px)",
                  }}
                >
                  <h2 className="ct-card__title">{contactForm.title}</h2>
                  <p className="ct-card__lede">{contactForm.lede}</p>
                </div>

                <div className="ct-points">
                  {contactForm.points.map((item) => (
                    <div key={item} className="ct-point">
                      <svg
                        width="18"
                        height="18"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        style={{ transform: "rotate(-90deg)", flexShrink: 0 }}
                        aria-hidden="true"
                      >
                        <path
                          d="M12 4L12 20M12 4L5 11M12 4L19 11"
                          stroke="url(#arrow-grad)"
                          strokeWidth="2.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <defs>
                          <linearGradient id="arrow-grad" x1="0" y1="0" x2="1" y2="0">
                            <stop offset="26.9%" stopColor="#FF7018" />
                            <stop offset="100%" stopColor="#FFBE03" />
                          </linearGradient>
                        </defs>
                      </svg>
                      <span>{item}</span>
                    </div>
                  ))}
                </div>

                <div className="ct-contacts">
                  <div className="ct-contact">
                    <span>
                      <span className="ct-contact__label">what&rsquo;s app: </span>
                      +86 13262237839
                    </span>
                    <button
                      type="button"
                      onClick={() => handleCopy("+86 13262237839", "wa")}
                      className="ct-copy-button"
                      title="Copy WhatsApp"
                    >
                      {copiedItem === "wa" ? (
                        <span style={{ fontSize: "12px", color: "#FF7018", fontWeight: 700 }}>
                          ✓
                        </span>
                      ) : (
                        <CopyIcon />
                      )}
                    </button>
                  </div>

                  <div className="ct-contact">
                    <span>
                      <span className="ct-contact__label">Email: </span>
                      ceo@innosino.com
                    </span>
                    <button
                      type="button"
                      onClick={() => handleCopy("ceo@innosino.com", "email")}
                      className="ct-copy-button"
                      title="Copy Email"
                    >
                      {copiedItem === "email" ? (
                        <span style={{ fontSize: "12px", color: "#FF7018", fontWeight: 700 }}>
                          ✓
                        </span>
                      ) : (
                        <CopyIcon />
                      )}
                    </button>
                  </div>

                  <div className="ct-contact">
                    <span>
                      <span className="ct-contact__label">We Chat: </span>
                      Innosinno
                    </span>
                  </div>
                </div>
              </div>

              <div className="ct-card__video">
                <BackgroundVideo
                  src="/contact_us asset/Section.mp4"
                  poster="/posters/contact_us asset/Section.webp"
                  webmSrc="/contact_us asset/Section.webm"
                  loading="lazy"
                />
              </div>
            </div>

            {/* Right column: form */}
            <div className="ct-card__col ct-form-panel">
              {submitted ? (
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    height: "100%",
                    textAlign: "center",
                    gap: "12px",
                  }}
                >
                  <div
                    style={{
                      width: "56px",
                      height: "56px",
                      borderRadius: "50%",
                      background: "linear-gradient(135deg, #FF7018 0%, #FFBE03 100%)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "#000",
                      fontSize: "24px",
                      fontWeight: "bold",
                    }}
                  >
                    ✓
                  </div>
                  <h3 style={{ margin: 0, fontSize: "var(--fs-h4)", fontWeight: 700, color: "#000" }}>
                    Thank you!
                  </h3>
                  <p style={{ margin: 0, fontSize: "var(--fs-small)", color: "#666" }}>
                    We&apos;ve received your request and our engineers will get
                    back to you within 24 hours.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="ct-form">
                  <div className="ct-field">
                    <label className="ct-label" htmlFor="ct-fullname">
                      Full Name
                    </label>
                    <input
                      id="ct-fullname"
                      className="ct-input"
                      type="text"
                      required
                      placeholder="Enter Full name"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                    />
                  </div>

                  <div className="ct-field">
                    <label className="ct-label" htmlFor="ct-company">
                      Company Name
                    </label>
                    <input
                      id="ct-company"
                      className="ct-input"
                      type="text"
                      placeholder="Enter company name"
                      value={companyName}
                      onChange={(e) => setCompanyName(e.target.value)}
                    />
                  </div>

                  <div className="ct-field">
                    <label className="ct-label" htmlFor="ct-email">
                      Email
                    </label>
                    <input
                      id="ct-email"
                      className="ct-input"
                      type="email"
                      required
                      placeholder="Enter email address"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>

                  <div className="ct-field">
                    <label className="ct-label" htmlFor="ct-phone">
                      Phone
                    </label>
                    <div className="ct-phone">
                      <select
                        aria-label="Country code"
                        className="ct-input ct-input--select ct-phone__code"
                        value={countryCode}
                        onChange={(e) => setCountryCode(e.target.value)}
                      >
                        <option value="+880">+880</option>
                        <option value="+86">+86</option>
                        <option value="+1">+1</option>
                        <option value="+44">+44</option>
                        <option value="+49">+49</option>
                      </select>
                      <input
                        id="ct-phone"
                        className="ct-input ct-phone__number"
                        type="tel"
                        placeholder="Phone number"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="ct-field">
                    <label className="ct-label" htmlFor="ct-service">
                      Service needed ( if any)
                    </label>
                    <select
                      id="ct-service"
                      className="ct-input ct-input--select"
                      value={serviceNeeded}
                      onChange={(e) => setServiceNeeded(e.target.value)}
                      style={{ color: serviceNeeded ? "#000" : "#888" }}
                    >
                      <option value="">Select service</option>
                      <option value="Hardware & PCB Design">Hardware &amp; PCB Design</option>
                      <option value="Embedded System Design">Embedded System Design</option>
                      <option value="Product Development">Product Development</option>
                      <option value="Industrial Automation">Industrial Automation</option>
                    </select>
                  </div>

                  <div className="ct-field">
                    <label className="ct-label" htmlFor="ct-brief">
                      Project brief
                    </label>
                    <textarea
                      id="ct-brief"
                      className="ct-input ct-input--area"
                      rows={3}
                      placeholder="Describe your project goals, timelines, or specifications..."
                      value={projectBrief}
                      onChange={(e) => setProjectBrief(e.target.value)}
                    />
                  </div>

                  <button type="submit" className="ct-submit">
                    <span>SEND TO INNOSINO</span>
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
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================================
          SECTION 2: GLOBAL HUBS (SHANGHAI & DHAKA)
          ===================================================================== */}
      <section
        className="hero-follow"
        style={{ paddingBlockEnd: "clamp(2.5rem, 5.6vw, 64px)" }}
      >
        <div
          className="container"
          ref={hubsRef}
          style={{
            display: "flex",
            flexDirection: "column",
            /* Figma: lede ends 594, cards start 646. */
            gap: "clamp(24px, 13.76px + 2.732vw, 52px)",
          }}
        >
          <h2
            className="ct-lede"
            style={{
              margin: 0,
              fontSize: "clamp(1.25rem, 0.976rem + 1.171vw, 2rem)",
              fontWeight: 600,
              color: "#666666",
              lineHeight: 1.5,
              textWrap: "pretty",
            }}
          >
            {hubsLede}
          </h2>

          <div className="ct-hubs">
            {contactHubs.map((hub, hubIdx) => (
              <div key={hub.city} className="ct-hub">
                <div className="ct-hub__head">
                  <span className="ct-hub__clock">
                    {/* The frame's 32px mark: a plain black sun, not the
                        colour emoji the platform substitutes. */}
                    <svg viewBox="0 0 32 32" aria-hidden="true" fill="none">
                      <circle cx="16" cy="16" r="6" fill="currentColor" />
                      <g
                        stroke="currentColor"
                        strokeWidth="1.6"
                        strokeLinecap="round"
                      >
                        <path d="M16 3v4M16 25v4M3 16h4M25 16h4" />
                        <path d="M6.8 6.8l2.8 2.8M22.4 22.4l2.8 2.8M25.2 6.8l-2.8 2.8M9.6 22.4l-2.8 2.8" />
                      </g>
                    </svg>
                    <span>{hubIdx === 0 ? shanghaiTime : dhakaTime}</span>
                  </span>

                  <Link href={hub.map} target="_blank" className="ct-hub__map">
                    <span>View Map</span>
                    <span style={{ fontSize: "0.8em" }} aria-hidden="true">
                      ↗
                    </span>
                  </Link>
                </div>

                <h3 className="ct-hub__name">{hub.city}</h3>
                <p className="ct-hub__address">{hub.address}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =====================================================================
          SECTION 3: HOW LONG UNTIL I HEAR BACK? (FAQS)
          ===================================================================== */}
      <section className="flow-section" style={{ backgroundColor: "#F6F6F6" }}>
        <div className="container">
          <h2 className="section-heading" style={{ color: "#000000" }}>
            {contactHeadings.faq.lead}
            <span style={{ color: "#FF7018" }}>{contactHeadings.faq.accent}</span>
          </h2>

          <div
            className="faq faq--elevated"
            style={{ marginBlockStart: "clamp(1.5rem, 2.8vw, 40px)" }}
          >
            {contactFaqs.map((faq, fIdx) => {
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
                        fontSize: "22px",
                        color: "#444444",
                        flexShrink: 0,
                        transform: isOpen ? "rotate(45deg)" : "rotate(0deg)",
                        transition: "transform 0.2s ease",
                      }}
                    >
                      +
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
          SECTION 4: FOOTER & INTERACTIVE CHAT WIDGET
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
    </main>
  );
}
