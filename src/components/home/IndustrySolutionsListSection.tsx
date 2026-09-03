"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";

interface IndustryItem {
  id: string;
  title: string;
  image: string;
}

const industriesList: IndustryItem[] = [
  {
    id: "1",
    title: "Consumer Electronics",
    image: "/homepage_assets/industries/Consumer Electronics.jpg",
  },
  {
    id: "2",
    title: "Renewable Energy",
    image: "/homepage_assets/industries/Renewable Energy.jpg",
  },
  {
    id: "3",
    title: "Industrial Automation",
    image: "/homepage_assets/industries/Industrial Automation.png",
  },
  {
    id: "4",
    title: "Smart IOT",
    image: "/homepage_assets/industries/Smart IOT.png",
  },
  {
    id: "5",
    title: "Engineering Education",
    image: "/homepage_assets/industries/Engineering Education.png",
  },
  {
    id: "6",
    title: "Digital Musical Instruments",
    image: "/homepage_assets/industries/Digital Musical Instruments.png",
  },
  {
    id: "7",
    title: "Biomedical Electronics",
    image: "/homepage_assets/industries/Biomedical Electronics.png",
  },
  {
    id: "8",
    title: "NFC and RFID Technology",
    image: "/homepage_assets/industries/NFC and RFID Technology.png",
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

export default function IndustrySolutionsListSection() {
  const [chatOpen, setChatOpen] = useState(true);
  const trackRef = useRef<HTMLDivElement>(null);

  /**
   * Continuous marquee. The scroll distance is measured from the rendered
   * track rather than assumed from a fixed 400px card pitch, so the loop stays
   * seamless when the card width changes with the viewport.
   */
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let offset = 0;
    let frameId = 0;

    const step = () => {
      // One third of the track = one full copy of the list (it is tripled).
      const loopWidth = track.scrollWidth / 3;
      if (loopWidth > 0) {
        offset = (offset + 0.8) % loopWidth;
        track.style.transform = `translateX(-${offset}px)`;
      }
      frameId = requestAnimationFrame(step);
    };

    frameId = requestAnimationFrame(step);
    return () => cancelAnimationFrame(frameId);
  }, []);

  // Tripled for a seamless loop.
  const displayItems = [
    ...industriesList,
    ...industriesList,
    ...industriesList,
  ];

  return (
    <section
      className="flow-section"
      style={{
        backgroundColor: "#000000",
        /* Clearance so the floating nav pill never lands on the footer. */
        paddingBottom: "var(--nav-safe)",
      }}
    >
      <div className="container">
        <h2 className="section-lede">
          Discover the industries we serve with innovative technology and smart
          engineering solutions for real-world challenges.
        </h2>
      </div>

      {/* Full-bleed marquee: its left edge lines up with the content container
          while the track itself is free to run past the right edge. */}
      <div
        className="marquee"
        style={{ marginBlock: "clamp(2rem, 3.9vw, 3rem)" }}
        aria-label="Industries we serve"
      >
        <div className="marquee__track" ref={trackRef}>
          {displayItems.map((item, index) => (
            <div
              key={`${item.id}-${index}`}
              className="marquee__item"
              aria-hidden={index >= industriesList.length}
            >
              <div className="marquee__thumb">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  sizes="(max-width: 768px) 60vw, 370px"
                  style={{ objectFit: "cover" }}
                />
              </div>
              <h3
                style={{
                  margin: 0,
                  fontSize: "var(--fs-h4)",
                  fontWeight: 600,
                  lineHeight: 1.2,
                  color: "#FFFFFF",
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                }}
              >
                {item.title}
              </h3>
            </div>
          ))}
        </div>
      </div>

      <div className="container">
        {/* Chat widget sits at the container's right edge, above the footer. */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-end",
            gap: "12px",
            marginBottom: "clamp(1.5rem, 3vw, 2.5rem)",
          }}
        >
          {chatOpen && (
            <div
              style={{
                width: "min(100%, 331px)",
                boxSizing: "border-box",
                backgroundColor: "#FFFFFF",
                borderRadius: "8px",
                padding: "9px 12px",
                display: "flex",
                alignItems: "flex-start",
                justifyContent: "space-between",
                gap: "8px",
                boxShadow: "0 10px 30px rgba(0,0,0,0.5)",
              }}
            >
              <p
                style={{
                  margin: 0,
                  fontSize: "var(--fs-small)",
                  fontWeight: 400,
                  lineHeight: 1.2,
                  color: "#666666",
                }}
              >
                Welcome to Innosino! Need help? Just reply to this message—we&rsquo;re
                online and ready to assist you.
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
                aria-label="Close message"
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
            style={{
              width: "48px",
              height: "48px",
              flexShrink: 0,
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

        <footer className="footer-bar">
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
        </footer>
      </div>
    </section>
  );
}
