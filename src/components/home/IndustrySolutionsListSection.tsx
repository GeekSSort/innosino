"use client";

import React, { useState, useEffect } from "react";
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

export default function IndustrySolutionsListSection() {
  const [chatOpen, setChatOpen] = useState(true);
  const [scrollX, setScrollX] = useState(0);

  // Smooth continuous auto-sliding effect
  useEffect(() => {
    let animationFrameId: number;
    const itemWidth = 400; // 370 card + 30 gap
    const totalWidth = industriesList.length * itemWidth;

    const animate = () => {
      setScrollX((prev) => (prev + 0.8) % totalWidth);
      animationFrameId = requestAnimationFrame(animate);
    };

    animationFrameId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrameId);
  }, []);

  // Triple items for seamless looping
  const displayItems = [...industriesList, ...industriesList, ...industriesList];

  return (
    <section
      style={{
        position: "relative",
        width: "1440px",
        height: "838px",
        overflow: "hidden",
        backgroundColor: "#000000",
        margin: "0 auto",
      }}
    >
      {/* Section Header Text: Node 1498:14242 (x: 135, y: 64, w: 1170, h: 96) */}
      <div
        style={{
          position: "absolute",
          left: "135px",
          top: "64px",
          width: "1170px",
          height: "96px",
          display: "flex",
          alignItems: "flex-start",
        }}
      >
        <h2
          style={{
            margin: 0,
            width: "1170px",
            fontFamily: "'Urbanist', sans-serif",
            fontSize: "32px",
            fontWeight: 600,
            lineHeight: "150%",
            color: "#FFFFFF",
            textAlign: "left",
          }}
        >
          Discover the industries we serve with innovative technology and smart
          engineering solutions for real-world challenges.
        </h2>
      </div>

      {/* Auto-sliding Carousel Track: Component 9 (x: 135, y: 208, w: 1440 - 135, h: 318) */}
      <div
        style={{
          position: "absolute",
          left: 0,
          top: "208px",
          width: "1440px",
          height: "318px",
          overflow: "hidden",
          paddingLeft: "135px",
          boxSizing: "border-box",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            gap: "30px",
            transform: `translateX(-${scrollX}px)`,
            willChange: "transform",
          }}
        >
          {displayItems.map((item, index) => (
            <div
              key={`${item.id}-${index}`}
              style={{
                width: "370px",
                height: "318px",
                flexShrink: 0,
                display: "flex",
                flexDirection: "column",
                gap: "16px",
              }}
            >
              {/* Card Image Container: 370 x 270, radius 16px */}
              <div
                style={{
                  position: "relative",
                  width: "370px",
                  height: "270px",
                  borderRadius: "16px",
                  overflow: "hidden",
                  backgroundColor: "#111111",
                }}
              >
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  sizes="370px"
                  style={{
                    objectFit: "cover",
                  }}
                />
              </div>

              {/* Title: Urbanist SemiBold 24px, #FFFFFF */}
              <h3
                style={{
                  margin: 0,
                  fontFamily: "'Urbanist', sans-serif",
                  fontSize: "24px",
                  fontWeight: 600,
                  lineHeight: "1.2",
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

      {/* Floating Navbar (Header): Node 1498:14244 (x: 136.5, y: 586, w: 582, h: 68) */}
      <div
        style={{
          position: "absolute",
          left: "136.5px",
          top: "586px",
          zIndex: 30,
        }}
      >
              </div>

      {/* Interactive Chat Widget: Node 1498:14255 (x: 974, y: 594, w: 331, h: 141) */}
      <div
        style={{
          position: "absolute",
          left: "974px",
          top: "594px",
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
        {/* Chat Tooltip Bubble: 331 x 81, radius 8px, bg #FFFFFF */}
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
              Welcome to Innosino! Need help? Just reply to this message—we’re
              online and ready to assist you.
            </p>

            {/* Close Cross button */}
            <button
              type="button"
              onClick={() => setChatOpen(false)}
              style={{
                background: "none",
                border: "none",
                padding: "2px",
                cursor: "pointer",
                color: "#999999",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
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

        {/* Orange Circular Chat Avatar Button: 48 x 48 */}
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
          {/* Chat Icon */}
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

      {/* Footer Navigation Bar: Frame 1618873740 (x: 136, y: 718, w: 1169, h: 56) */}
      <div
        style={{
          position: "absolute",
          left: "136px",
          top: "718px",
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
        {/* Copyright Text */}
        <p
          style={{
            margin: 0,
            fontFamily: "'Urbanist', sans-serif",
            fontSize: "14px",
            fontWeight: 400,
            color: "rgba(255, 255, 255, 0.8)",
          }}
        >
          © 2026 Innosion All Rights Reserved
        </p>

        {/* Footer Links (Frame 1618873739: w: 661px, h: 19px) */}
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            gap: "24px",
          }}
        >
          {[
            { label: "Home", href: "#" },
            { label: "About Us", href: "#about" },
            { label: "Industries", href: "#industries" },
            { label: "Blogs", href: "#blogs" },
            { label: "Privacy Policy", href: "#privacy" },
            { label: "Terms & Condition", href: "#terms" },
            { label: "Contact Us", href: "#contact" },
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
    </section>
  );
}

