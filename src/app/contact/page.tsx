"use client";

import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

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

  const heroVideoRef = useRef<HTMLVideoElement>(null);
  const formCardVideoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (heroVideoRef.current) {
      heroVideoRef.current.play().catch(() => {});
    }
    if (formCardVideoRef.current) {
      formCardVideoRef.current.play().catch(() => {});
    }
  }, []);

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

  return (
    <main
      style={{
        position: "relative",
        width: "1440px",
        minHeight: "2571px",
        overflow: "hidden",
        backgroundColor: "#000000",
        margin: "0 auto",
      }}
    >
      {/* =========================================================================
          SECTION 1: HERO & CONTACT FORM OVERLAP (Height 684px + Form Height 776px)
          Top background: Hero section Contact us.mp4
          ========================================================================= */}
      <section
        style={{
          position: "relative",
          width: "1440px",
          height: "684px",
          backgroundColor: "#000000",
          overflow: "visible",
        }}
      >
        {/* Background Video */}
        <div
          style={{
            position: "absolute",
            left: 0,
            top: 0,
            width: "1440px",
            height: "684px",
            overflow: "hidden",
            pointerEvents: "none",
            zIndex: 1,
          }}
        >
          <video
            ref={heroVideoRef}
            autoPlay
            loop
            muted
            playsInline
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              display: "block",
            }}
          >
            <source
              src="/contact_us asset/Hero section Contact us.mp4"
              type="video/mp4"
            />
          </video>
          <div
            style={{
              position: "absolute",
              inset: 0,
              backgroundColor: "rgba(0, 0, 0, 0.45)",
              pointerEvents: "none",
            }}
          />
        </div>

        {/* Logo */}
        <div
          style={{
            position: "absolute",
            left: "135px",
            top: "60px",
            width: "236px",
            height: "32px",
            zIndex: 20,
            display: "flex",
            alignItems: "center",
          }}
        >
          <Image
            src="/about_us/IS-Logo.png"
            alt="INNOSINO"
            width={236}
            height={32}
            style={{ objectFit: "contain", height: "32px", width: "auto" }}
            priority
          />
        </div>

        {/* Hero Title & Subtitle Frame */}
        <div
          style={{
            position: "absolute",
            left: "134px",
            top: "112px",
            width: "1171px",
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            gap: "16px",
            zIndex: 20,
          }}
        >
          {/* Breadcrumb / Tag: CONTACT US */}
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              gap: "10px",
              height: "24px",
            }}
          >
            <span style={{ fontSize: "14px", color: "#FF7018" }}>✦</span>
            <span
              style={{
                fontFamily: "'Urbanist', sans-serif",
                fontSize: "16px",
                fontWeight: 600,
                color: "#FF7018",
                textTransform: "uppercase",
                letterSpacing: "0.08em",
              }}
            >
              CONTACT US
            </span>
          </div>

          {/* Title */}
          <h1
            style={{
              margin: 0,
              fontFamily: "'Cal Sans', 'Outfit', sans-serif",
              fontSize: "64px",
              fontWeight: 400,
              lineHeight: "1.1",
              color: "#FFFFFF",
              textTransform: "uppercase",
            }}
          >
            LET'S BUILD BETTER HARDWARE.
          </h1>

          {/* Subtitle */}
          <p
            style={{
              margin: 0,
              width: "1171px",
              fontFamily: "'Urbanist', sans-serif",
              fontSize: "20px",
              fontWeight: 400,
              lineHeight: "150%",
              color: "#FFFFFF",
            }}
          >
            Turn your hardware concept into a production-ready product with expert engineering, precision PCB design, and end-to-end development support.
          </p>
        </div>

        {/* Overlapping Contact Form Card (Node 1498:14425, x: 234, y: 342, w: 966, h: 776) */}
        <div
          style={{
            position: "absolute",
            left: "234px",
            top: "342px",
            width: "966px",
            height: "776px",
            borderRadius: "18px",
            backgroundColor: "#FFFFFF",
            boxShadow: "0 0 30px rgba(30, 30, 30, 0.10)",
            zIndex: 25,
            boxSizing: "border-box",
            padding: "36px",
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "flex-start",
            overflow: "hidden",
          }}
        >
          {/* Left Column of Card (Width: 435px, Height: 704px) */}
          <div
            style={{
              width: "435px",
              height: "704px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
            }}
          >
            {/* Top Text & Contact details block (Height: 363px) */}
            <div
              style={{
                width: "435px",
                display: "flex",
                flexDirection: "column",
                gap: "44px",
              }}
            >
              {/* Title & Features Frame */}
              <div
                style={{
                  width: "435px",
                  display: "flex",
                  flexDirection: "column",
                  gap: "24px",
                }}
              >
                {/* Heading & Paragraph Frame (gap 16px) */}
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "16px",
                  }}
                >
                  <h2
                    style={{
                      margin: 0,
                      fontFamily: "'Urbanist', sans-serif",
                      fontSize: "36px",
                      fontWeight: 600,
                      color: "#000000",
                      lineHeight: "1.2",
                    }}
                  >
                    Tell us what you're building
                  </h2>
                  <p
                    style={{
                      margin: 0,
                      fontFamily: "'Urbanist', sans-serif",
                      fontSize: "16px",
                      fontWeight: 500,
                      lineHeight: "150%",
                      color: "#666666",
                    }}
                  >
                    The more context you give us up front, the faster we can scope the engineering work and get back to you with a real answer.
                  </p>
                </div>

                {/* Features list (itemSpacing: 16px) */}
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "16px",
                  }}
                >
                  {[
                    "Expect a response from us within 24 hours.",
                    "We're happy to sign an NDA upon request.",
                    "Dedicated Hardware Experts.",
                  ].map((item, idx) => (
                    <div
                      key={idx}
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                        gap: "10px",
                        height: "19px",
                      }}
                    >
                      <svg
                        width="18"
                        height="18"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        style={{ transform: "rotate(-90deg)", flexShrink: 0 }}
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
                      <span
                        style={{
                          fontFamily: "'Urbanist', sans-serif",
                          fontSize: "16px",
                          fontWeight: 500,
                          color: "#000000",
                          lineHeight: "19px",
                        }}
                      >
                        {item}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Direct Contacts List (itemSpacing: 8px) */}
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "8px",
                  width: "273px",
                }}
              >
                {/* WhatsApp */}
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "flex-start",
                    gap: "8px",
                    height: "20px",
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
                    <span
                      style={{
                        fontFamily: "'Urbanist', sans-serif",
                        fontSize: "16px",
                        fontWeight: 600,
                        color: "#515151",
                      }}
                    >
                      what’s app:
                    </span>
                    <span
                      style={{
                        fontFamily: "'Urbanist', sans-serif",
                        fontSize: "16px",
                        fontWeight: 400,
                        color: "#515151",
                      }}
                    >
                      +86 13262237839
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleCopy("+86 13262237839", "wa")}
                    style={{
                      background: "none",
                      border: "none",
                      cursor: "pointer",
                      padding: 0,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      width: "20px",
                      height: "20px",
                    }}
                    title="Copy WhatsApp"
                  >
                    {copiedItem === "wa" ? (
                      <span style={{ fontSize: "12px", color: "#FF7018", fontWeight: 700 }}>✓</span>
                    ) : (
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <rect x="8" y="8" width="12" height="12" rx="2" stroke="#515151" strokeWidth="2" />
                        <path d="M16 8V6C16 4.89543 15.1046 4 14 4H6C4.89543 4 4 4.89543 4 6V14C4 15.1046 4.89543 16 6 16H8" stroke="#515151" strokeWidth="2" />
                      </svg>
                    )}
                  </button>
                </div>

                {/* Email */}
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "flex-start",
                    gap: "8px",
                    height: "20px",
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
                    <span
                      style={{
                        fontFamily: "'Urbanist', sans-serif",
                        fontSize: "16px",
                        fontWeight: 600,
                        color: "#515151",
                      }}
                    >
                      Email:
                    </span>
                    <span
                      style={{
                        fontFamily: "'Urbanist', sans-serif",
                        fontSize: "16px",
                        fontWeight: 400,
                        color: "#515151",
                      }}
                    >
                      ceo@innosino.com
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleCopy("ceo@innosino.com", "email")}
                    style={{
                      background: "none",
                      border: "none",
                      cursor: "pointer",
                      padding: 0,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      width: "20px",
                      height: "20px",
                    }}
                    title="Copy Email"
                  >
                    {copiedItem === "email" ? (
                      <span style={{ fontSize: "12px", color: "#FF7018", fontWeight: 700 }}>✓</span>
                    ) : (
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <rect x="8" y="8" width="12" height="12" rx="2" stroke="#515151" strokeWidth="2" />
                        <path d="M16 8V6C16 4.89543 15.1046 4 14 4H6C4.89543 4 4 4.89543 4 6V14C4 15.1046 4.89543 16 6 16H8" stroke="#515151" strokeWidth="2" />
                      </svg>
                    )}
                  </button>
                </div>

                {/* WeChat */}
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "flex-start",
                    gap: "8px",
                    height: "19px",
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
                    <span
                      style={{
                        fontFamily: "'Urbanist', sans-serif",
                        fontSize: "16px",
                        fontWeight: 600,
                        color: "#515151",
                      }}
                    >
                      We Chat:
                    </span>
                    <span
                      style={{
                        fontFamily: "'Urbanist', sans-serif",
                        fontSize: "16px",
                        fontWeight: 400,
                        color: "#515151",
                      }}
                    >
                      Innosinno
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Microchips Video (Width: 435px, Height: 310px, radius: 10px) */}
            <div
              style={{
                width: "435px",
                height: "310px",
                borderRadius: "10px",
                overflow: "hidden",
                backgroundColor: "#000000",
                boxSizing: "border-box",
              }}
            >
              <video
                ref={formCardVideoRef}
                autoPlay
                loop
                muted
                playsInline
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  display: "block",
                }}
              >
                <source
                  src="/contact_us asset/Section.mp4"
                  type="video/mp4"
                />
              </video>
            </div>
          </div>

          {/* Right Column of Card (Form Container: Width 435px, Height 704px, Radius 10px, Background #F2F2F2) */}
          <div
            style={{
              width: "435px",
              height: "704px",
              borderRadius: "10px",
              backgroundColor: "#F2F2F2",
              boxSizing: "border-box",
              padding: "24px 20px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
            }}
          >
            {submitted ? (
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", height: "100%", textAlign: "center", gap: "12px" }}>
                <div style={{ width: "56px", height: "56px", borderRadius: "50%", background: "linear-gradient(135deg, #FF7018 0%, #FFBE03 100%)", display: "flex", alignItems: "center", justifyContent: "center", color: "#000", fontSize: "24px", fontWeight: "bold" }}>
                  ✓
                </div>
                <h3 style={{ margin: 0, fontFamily: "'Urbanist', sans-serif", fontSize: "22px", fontWeight: 700, color: "#000" }}>
                  Thank you!
                </h3>
                <p style={{ margin: 0, fontFamily: "'Urbanist', sans-serif", fontSize: "14px", color: "#666" }}>
                  We've received your request and our engineers will get back to you within 24 hours.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "16px", height: "100%", justifyContent: "space-between" }}>
                {/* Full Name */}
                <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                  <label style={{ fontFamily: "'Urbanist', sans-serif", fontSize: "14px", fontWeight: 600, color: "#000000" }}>
                    Full Name
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Enter Full name"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    style={{
                      height: "44px",
                      borderRadius: "8px",
                      border: "1px solid #D1D1D1",
                      backgroundColor: "#FFFFFF",
                      padding: "0 14px",
                      fontFamily: "'Urbanist', sans-serif",
                      fontSize: "14px",
                      color: "#000",
                      outline: "none",
                    }}
                  />
                </div>

                {/* Company Name */}
                <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                  <label style={{ fontFamily: "'Urbanist', sans-serif", fontSize: "14px", fontWeight: 600, color: "#000000" }}>
                    Company Name
                  </label>
                  <input
                    type="text"
                    placeholder="Enter company name"
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                    style={{
                      height: "44px",
                      borderRadius: "8px",
                      border: "1px solid #D1D1D1",
                      backgroundColor: "#FFFFFF",
                      padding: "0 14px",
                      fontFamily: "'Urbanist', sans-serif",
                      fontSize: "14px",
                      color: "#000",
                      outline: "none",
                    }}
                  />
                </div>

                {/* Email */}
                <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                  <label style={{ fontFamily: "'Urbanist', sans-serif", fontSize: "14px", fontWeight: 600, color: "#000000" }}>
                    Email
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="Enter email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    style={{
                      height: "44px",
                      borderRadius: "8px",
                      border: "1px solid #D1D1D1",
                      backgroundColor: "#FFFFFF",
                      padding: "0 14px",
                      fontFamily: "'Urbanist', sans-serif",
                      fontSize: "14px",
                      color: "#000",
                      outline: "none",
                    }}
                  />
                </div>

                {/* Phone with Country Code dropdown */}
                <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                  <label style={{ fontFamily: "'Urbanist', sans-serif", fontSize: "14px", fontWeight: 600, color: "#000000" }}>
                    Phone
                  </label>
                  <div style={{ display: "flex", gap: "8px" }}>
                    <select
                      value={countryCode}
                      onChange={(e) => setCountryCode(e.target.value)}
                      style={{
                        width: "90px",
                        height: "44px",
                        borderRadius: "8px",
                        border: "1px solid #D1D1D1",
                        backgroundColor: "#FFFFFF",
                        padding: "0 8px",
                        fontFamily: "'Urbanist', sans-serif",
                        fontSize: "14px",
                        color: "#000",
                        outline: "none",
                        cursor: "pointer",
                      }}
                    >
                      <option value="+880">+880</option>
                      <option value="+86">+86</option>
                      <option value="+1">+1</option>
                      <option value="+44">+44</option>
                      <option value="+49">+49</option>
                    </select>
                    <input
                      type="tel"
                      placeholder="Phone number"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      style={{
                        flex: 1,
                        height: "44px",
                        borderRadius: "8px",
                        border: "1px solid #D1D1D1",
                        backgroundColor: "#FFFFFF",
                        padding: "0 14px",
                        fontFamily: "'Urbanist', sans-serif",
                        fontSize: "14px",
                        color: "#000",
                        outline: "none",
                      }}
                    />
                  </div>
                </div>

                {/* Service Needed (if any) */}
                <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                  <label style={{ fontFamily: "'Urbanist', sans-serif", fontSize: "14px", fontWeight: 600, color: "#000000" }}>
                    Service needed ( if any)
                  </label>
                  <select
                    value={serviceNeeded}
                    onChange={(e) => setServiceNeeded(e.target.value)}
                    style={{
                      height: "44px",
                      borderRadius: "8px",
                      border: "1px solid #D1D1D1",
                      backgroundColor: "#FFFFFF",
                      padding: "0 14px",
                      fontFamily: "'Urbanist', sans-serif",
                      fontSize: "14px",
                      color: serviceNeeded ? "#000" : "#888",
                      outline: "none",
                      cursor: "pointer",
                    }}
                  >
                    <option value="">Select service</option>
                    <option value="Hardware & PCB Design">Hardware & PCB Design</option>
                    <option value="Embedded System Design">Embedded System Design</option>
                    <option value="Product Development">Product Development</option>
                    <option value="Industrial Automation">Industrial Automation</option>
                  </select>
                </div>

                {/* Project Brief */}
                <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                  <label style={{ fontFamily: "'Urbanist', sans-serif", fontSize: "14px", fontWeight: 600, color: "#000000" }}>
                    Project brief
                  </label>
                  <textarea
                    rows={3}
                    placeholder="Describe your project goals, timelines, or specifications..."
                    value={projectBrief}
                    onChange={(e) => setProjectBrief(e.target.value)}
                    style={{
                      borderRadius: "8px",
                      border: "1px solid #D1D1D1",
                      backgroundColor: "#FFFFFF",
                      padding: "10px 14px",
                      fontFamily: "'Urbanist', sans-serif",
                      fontSize: "14px",
                      color: "#000",
                      outline: "none",
                      resize: "none",
                    }}
                  />
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  style={{
                    height: "44px",
                    borderRadius: "100px",
                    background: "linear-gradient(135deg, #FF7018 0%, #FFBE03 100%)",
                    border: "none",
                    color: "#FFFFFF",
                    fontFamily: "'Urbanist', sans-serif",
                    fontSize: "15px",
                    fontWeight: 700,
                    letterSpacing: "0.04em",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "8px",
                    boxShadow: "0 4px 16px rgba(255, 112, 24, 0.35)",
                  }}
                >
                  <span>SEND TO INNOSINO</span>
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M2.5 9.5L9.5 2.5M9.5 2.5H4M9.5 2.5V8" stroke="#FFFFFF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 2: GLOBAL HUBS (SHANGHAI & DHAKA)
          White section with subtitle + 2 location cards
          ========================================================================= */}
      <section
        style={{
          position: "relative",
          width: "1440px",
          minHeight: "660px",
          backgroundColor: "#FFFFFF",
          boxSizing: "border-box",
          paddingTop: "480px", // Gives room for the 776px overlapping card from Section 1
          paddingLeft: "135px",
          paddingRight: "135px",
          paddingBottom: "64px",
          display: "flex",
          flexDirection: "column",
          gap: "40px",
        }}
      >
        {/* Mission / Capabilities statement */}
        <div style={{ width: "1170px" }}>
          <h2
            style={{
              margin: 0,
              fontFamily: "'Urbanist', sans-serif",
              fontSize: "24px",
              fontWeight: 500,
              color: "#444444",
              lineHeight: "150%",
            }}
          >
            From concept to production, INNOSINO delivers embedded systems, hardware, PCB design, software integration, and industrial automation.
          </h2>
        </div>

        {/* 2 Location Cards: Shanghai & Dhaka */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "24px", width: "1170px" }}>
          {/* Shanghai Card */}
          <div
            style={{
              height: "180px",
              borderRadius: "16px",
              backgroundColor: "#F2F2F2",
              border: "1.5px solid #FF7018",
              boxSizing: "border-box",
              padding: "24px 28px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <span style={{ fontSize: "18px" }}>☀️</span>
                <span style={{ fontFamily: "'Urbanist', sans-serif", fontSize: "18px", fontWeight: 700, color: "#000000" }}>
                  {shanghaiTime}
                </span>
              </div>

              <Link
                href="https://maps.google.com/?q=Shanghai"
                target="_blank"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "6px",
                  padding: "8px 18px",
                  borderRadius: "100px",
                  background: "linear-gradient(135deg, #FF7018 0%, #FFBE03 100%)",
                  color: "#FFFFFF",
                  fontFamily: "'Urbanist', sans-serif",
                  fontSize: "13px",
                  fontWeight: 600,
                  textDecoration: "none",
                }}
              >
                <span>View Map</span>
                <span style={{ fontSize: "11px" }}>↗</span>
              </Link>
            </div>

            <div>
              <h3 style={{ margin: "0 0 6px 0", fontFamily: "'Urbanist', sans-serif", fontSize: "22px", fontWeight: 700, color: "#000000", textTransform: "uppercase" }}>
                SHANGHAI
              </h3>
              <p style={{ margin: 0, fontFamily: "'Urbanist', sans-serif", fontSize: "14px", fontWeight: 500, color: "#666666" }}>
                INNOSINO (上海) Technology Co., Ltd. — Headquarters, Shanghai, China
              </p>
            </div>
          </div>

          {/* Dhaka Card */}
          <div
            style={{
              height: "180px",
              borderRadius: "16px",
              backgroundColor: "#F2F2F2",
              boxSizing: "border-box",
              padding: "24px 28px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <span style={{ fontSize: "18px" }}>☀️</span>
                <span style={{ fontFamily: "'Urbanist', sans-serif", fontSize: "18px", fontWeight: 700, color: "#000000" }}>
                  {dhakaTime}
                </span>
              </div>

              <Link
                href="https://maps.google.com/?q=Dhaka"
                target="_blank"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "6px",
                  padding: "8px 18px",
                  borderRadius: "100px",
                  background: "linear-gradient(135deg, #FF7018 0%, #FFBE03 100%)",
                  color: "#FFFFFF",
                  fontFamily: "'Urbanist', sans-serif",
                  fontSize: "13px",
                  fontWeight: 600,
                  textDecoration: "none",
                }}
              >
                <span>View Map</span>
                <span style={{ fontSize: "11px" }}>↗</span>
              </Link>
            </div>

            <div>
              <h3 style={{ margin: "0 0 6px 0", fontFamily: "'Urbanist', sans-serif", fontSize: "22px", fontWeight: 700, color: "#000000", textTransform: "uppercase" }}>
                DHAKA
              </h3>
              <p style={{ margin: 0, fontFamily: "'Urbanist', sans-serif", fontSize: "14px", fontWeight: 500, color: "#666666" }}>
                DBTECH Technology Co. Ltd. — Partner Office, Dhaka, Bangladesh
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 3: HOW LONG UNTIL I HEAR BACK? (FAQS)
          Soft grey #F6F6F6 background with accordion questions
          ========================================================================= */}
      <section
        style={{
          position: "relative",
          width: "1440px",
          minHeight: "650px",
          backgroundColor: "#F6F6F6",
          boxSizing: "border-box",
          padding: "64px 135px 80px 135px",
          display: "flex",
          flexDirection: "column",
          gap: "40px",
        }}
      >
        <h2
          style={{
            margin: 0,
            fontFamily: "'Cal Sans', 'Outfit', sans-serif",
            fontSize: "36px",
            fontWeight: 400,
            color: "#000000",
            textTransform: "uppercase",
          }}
        >
          HOW LONG UNTIL I HEAR <span style={{ color: "#FF7018" }}>BACK?</span>
        </h2>

        <div style={{ display: "flex", flexDirection: "column", gap: "16px", width: "1170px" }}>
          {contactFaqs.map((faq, fIdx) => {
            const isOpen = openFaq === fIdx;
            return (
              <div
                key={faq.q}
                style={{
                  borderRadius: "12px",
                  backgroundColor: "#FFFFFF",
                  boxShadow: "0 2px 12px rgba(0,0,0,0.03)",
                  overflow: "hidden",
                  transition: "all 0.2s ease",
                }}
              >
                <button
                  type="button"
                  onClick={() => setOpenFaq(isOpen ? null : fIdx)}
                  style={{
                    width: "100%",
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                    padding: "24px 28px",
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    textAlign: "left",
                  }}
                >
                  <span style={{ fontFamily: "'Urbanist', sans-serif", fontSize: "18px", fontWeight: 600, color: "#000000" }}>
                    {faq.q}
                  </span>
                  <span
                    style={{
                      fontSize: "22px",
                      color: "#444444",
                      transform: isOpen ? "rotate(45deg)" : "rotate(0deg)",
                      transition: "transform 0.2s ease",
                    }}
                  >
                    +
                  </span>
                </button>
                {isOpen && (
                  <div
                    style={{
                      padding: "0 28px 24px 28px",
                      fontFamily: "'Urbanist', sans-serif",
                      fontSize: "15px",
                      fontWeight: 400,
                      lineHeight: "150%",
                      color: "#666666",
                    }}
                  >
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* =========================================================================
          SECTION 4: FOOTER & INTERACTIVE CHAT WIDGET
          Black #000000 background
          ========================================================================= */}
      <footer
        style={{
          position: "relative",
          width: "1440px",
          height: "276px",
          backgroundColor: "#000000",
          boxSizing: "border-box",
        }}
      >
        <div style={{ position: "absolute", left: "135px", top: "64px", zIndex: 30 }}>
                  </div>

        {/* Interactive Chat Widget */}
        <div
          style={{
            position: "absolute",
            left: "974px",
            top: "39px",
            width: "331px",
            height: "141px",
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-end",
            justifyContent: "flex-end",
            gap: "12px",
            zIndex: 40,
          }}
        >
          {chatOpen && (
            <div
              style={{
                position: "relative",
                width: "331px",
                height: "81px",
                backgroundColor: "#FFFFFF",
                borderRadius: "8px",
                boxSizing: "border-box",
                padding: "9px 12px",
                display: "flex",
                flexDirection: "row",
                alignItems: "flex-start",
                justifyContent: "space-between",
                boxShadow: "0 10px 30px rgba(0,0,0,0.5)",
              }}
            >
              <p
                style={{
                  margin: 0,
                  width: "280px",
                  fontFamily: "'Urbanist', sans-serif",
                  fontSize: "14px",
                  fontWeight: 400,
                  lineHeight: "120%",
                  color: "#666666",
                }}
              >
                Welcome to Innosino! Need help? Just reply to this message—we’re online and ready to assist you.
              </p>
              <button
                type="button"
                onClick={() => setChatOpen(false)}
                style={{
                  background: "none",
                  border: "none",
                  padding: "2px",
                  cursor: "pointer",
                  color: "#999999",
                }}
                aria-label="Close chat bubble"
              >
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M3.5 3.5L10.5 10.5M10.5 3.5L3.5 10.5" stroke="#888888" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
              </button>
            </div>
          )}

          <button
            type="button"
            onClick={() => setChatOpen(!chatOpen)}
            style={{
              width: "48px",
              height: "48px",
              borderRadius: "50%",
              backgroundColor: "#FF6A00",
              border: "none",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              boxShadow: "0 4px 20px rgba(255, 106, 0, 0.4)",
            }}
            aria-label="Toggle chat"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M20 2H4C2.9 2 2 2.9 2 4V22L6 18H20C21.1 18 22 17.1 22 16V4C22 2.9 21.1 2 20 2Z" fill="#000000" />
              <rect x="6" y="7" width="12" height="2" rx="1" fill="#FF6A00" />
              <rect x="6" y="11" width="8" height="2" rx="1" fill="#FF6A00" />
            </svg>
          </button>
        </div>

        {/* Footer Bottom Links & Copyright */}
        <div
          style={{
            position: "absolute",
            left: "135px",
            top: "156px",
            width: "1169px",
            height: "56px",
            borderTop: "1px solid rgba(255, 255, 255, 0.2)",
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            boxSizing: "border-box",
          }}
        >
          <p style={{ margin: 0, fontFamily: "'Urbanist', sans-serif", fontSize: "14px", fontWeight: 400, color: "rgba(255, 255, 255, 0.8)" }}>
            © 2026 Innosion All Rights Reserved
          </p>

          <div style={{ display: "flex", flexDirection: "row", alignItems: "center", gap: "24px" }}>
            {[
              { label: "Home", href: "/" },
              { label: "About Us", href: "/about" },
              { label: "Services", href: "/services" },
              { label: "Industries", href: "/#industries" },
              { label: "Blogs", href: "#blogs" },
              { label: "Privacy Policy", href: "#privacy" },
              { label: "Terms & Condition", href: "#terms" },
              { label: "Contact Us", href: "/contact" },
            ].map((link) => (
              <Link
                key={link.label}
                href={link.href}
                style={{
                  fontFamily: "'Urbanist', sans-serif",
                  fontSize: "16px",
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
      </footer>
    </main>
  );
}
