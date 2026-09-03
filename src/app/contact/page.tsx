"use client";

import React, { useState, useEffect } from "react";
import BackgroundVideo from "@/components/common/BackgroundVideo";
import Image from "next/image";
import Link from "next/link";
import FloatingNavbar from "@/components/navigation/FloatingNavbar";

const contactFaqs = [
  {
    q: "How long until I hear back?",
    a: "We review inquiries as they come in and respond within 24 hours on business days. If you provide schematics or a project brief upfront, our engineers can often return initial feasibility notes in the very first response.",
  },
  {
    q: "Do I need a finished spec before reaching out?",
    a: "Not at all. Whether you have a rough block diagram, a BOM draft, or just a concept napkin sketch, our engineering team can help formalize specifications, select viable architectures, and scope the development roadmap.",
  },
  {
    q: "Can you sign an NDA before reviewing project details?",
    a: "Yes. We regularly execute non-disclosure agreements before reviewing confidential schematics, proprietary firmware requirements, or industrial designs.",
  },
  {
    q: "Do you work with clients outside Bangladesh?",
    a: "Yes! We work with global clients across North America, Europe, East Asia, and Australia. Our headquarters in Shanghai and partner office in Dhaka enable direct coordination with global supply chains and fabrication facilities.",
  },
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
            <Image
              src="/about_us/IS-Logo.png"
              alt="INNOSINO"
              width={340}
              height={128}
              className="brand-logo"
              preload
            />

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

              <h1 className="page-hero__title">
                LET&apos;S BUILD BETTER HARDWARE.
              </h1>

              <p className="page-hero__sub">
                Turn your hardware concept into a production-ready product with
                expert engineering, precision PCB design, and end-to-end
                development support.
              </p>
            </div>
          </div>

          {/* Header pill — composed in the hero's flow, then floats once it
              scrolls away (same behaviour as the services page). */}
          <FloatingNavbar variant="inline" />

          {/* Overlapping Contact Form Card (Node 1498:14425) */}
          <div className="ct-card">
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
                  <h2 className="ct-card__title">
                    Tell us what you&apos;re building
                  </h2>
                  <p className="ct-card__lede">
                    The more context you give us up front, the faster we can
                    scope the engineering work and get back to you with a real
                    answer.
                  </p>
                </div>

                <div className="ct-points">
                  {[
                    "Expect a response from us within 24 hours.",
                    "We're happy to sign an NDA upon request.",
                    "Dedicated Hardware Experts.",
                  ].map((item) => (
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
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "clamp(1.5rem, 2.8vw, 40px)",
          }}
        >
          <h2
            style={{
              margin: 0,
              fontSize: "var(--fs-h4)",
              fontWeight: 500,
              color: "#444444",
              lineHeight: 1.5,
              textWrap: "pretty",
            }}
          >
            From concept to production, INNOSINO delivers embedded systems,
            hardware, PCB design, software integration, and industrial
            automation.
          </h2>

          <div className="ct-hubs">
            {[
              {
                city: "SHANGHAI",
                time: shanghaiTime,
                address:
                  "INNOSINO (上海) Technology Co., Ltd. — Headquarters, Shanghai, China",
                map: "https://maps.google.com/?q=Shanghai",
                primary: true,
              },
              {
                city: "DHAKA",
                time: dhakaTime,
                address:
                  "DBTECH Technology Co. Ltd. — Partner Office, Dhaka, Bangladesh",
                map: "https://maps.google.com/?q=Dhaka",
                primary: false,
              },
            ].map((hub) => (
              <div
                key={hub.city}
                className={hub.primary ? "ct-hub ct-hub--primary" : "ct-hub"}
              >
                <div className="ct-hub__head">
                  <span className="ct-hub__clock">
                    <span aria-hidden="true">☀️</span>
                    <span>{hub.time}</span>
                  </span>

                  <Link href={hub.map} target="_blank" className="ct-hub__map">
                    <span>View Map</span>
                    <span style={{ fontSize: "0.8em" }} aria-hidden="true">
                      ↗
                    </span>
                  </Link>
                </div>

                <div>
                  <h3 className="ct-hub__name">{hub.city}</h3>
                  <p className="ct-hub__address">{hub.address}</p>
                </div>
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
            HOW LONG UNTIL I HEAR{" "}
            <span style={{ color: "#FF7018" }}>BACK?</span>
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
