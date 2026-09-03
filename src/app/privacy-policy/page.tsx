"use client";

import React, { useState } from "react";
import BackgroundVideo from "@/components/common/BackgroundVideo";
import Image from "next/image";
import Link from "next/link";

export default function PrivacyPolicyPage() {
  const [chatOpen, setChatOpen] = useState(true);
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText("ceo@innosino.com");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <main
      style={{
        position: "relative",
        width: "1440px",
        minHeight: "2400px",
        overflow: "hidden",
        backgroundColor: "#FFFFFF",
        margin: "0 auto",
      }}
    >
      {/* =========================================================================
          SECTION 1: HERO SECTION (Height: 520px)
          Video: /about_us/About Us Hero Section.mp4
          ========================================================================= */}
      <section
        style={{
          position: "relative",
          width: "1440px",
          height: "520px",
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
            height: "520px",
            overflow: "hidden",
            pointerEvents: "none",
            zIndex: 1,
          }}
        >
          <BackgroundVideo
            src="/about_us/About Us Hero Section.mp4"
            poster="/posters/about_us/About Us Hero Section.webp"
            loading="eager"
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              display: "block",
            }}
          />
          <div
            style={{
              position: "absolute",
              inset: 0,
              backgroundColor: "rgba(0, 0, 0, 0.65)",
              pointerEvents: "none",
            }}
          />
        </div>

        {/* Logo at (135, 60) */}
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
            preload
          />
        </div>

        {/* Hero Title & Breadcrumb Block (x: 134, y: 112) */}
        <div
          style={{
            position: "absolute",
            left: "134px",
            top: "112px",
            width: "1171px",
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            gap: "14px",
            zIndex: 20,
          }}
        >
          {/* Breadcrumb: FOOTER > PRIVACY POLICY */}
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              gap: "8px",
              height: "24px",
            }}
          >
            <span style={{ fontSize: "14px", color: "#FF7018" }}>✦</span>
            <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
              <span
                style={{
                  fontFamily: "'Urbanist', sans-serif",
                  fontSize: "16px",
                  fontWeight: 600,
                  color: "#FF7018",
                  textTransform: "uppercase",
                }}
              >
                Footer
              </span>
              <span style={{ color: "#FF7018", fontSize: "14px" }}>&gt;</span>
              <span
                style={{
                  fontFamily: "'Urbanist', sans-serif",
                  fontSize: "16px",
                  fontWeight: 600,
                  color: "#FF7018",
                  textTransform: "uppercase",
                }}
              >
                Privacy Policy
              </span>
            </div>
          </div>

          {/* Heading: PRIVACY POLICY ✦ */}
          <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
            <h1
              style={{
                margin: 0,
                fontFamily: "'Cal Sans', 'Outfit', sans-serif",
                fontSize: "64px",
                fontWeight: 400,
                lineHeight: "1.1",
                color: "#FFFFFF",
                textTransform: "uppercase",
                letterSpacing: "-0.01em",
              }}
            >
              PRIVACY POLICY
            </h1>
            <span style={{ fontSize: "32px", color: "#FFFFFF", opacity: 0.85 }}>✦</span>
          </div>

          {/* Sub-line: LAST UPDATED · JULY 1, 2026 */}
          <p
            style={{
              margin: 0,
              fontFamily: "'Urbanist', sans-serif",
              fontSize: "16px",
              fontWeight: 500,
              color: "#CCCCCC",
              letterSpacing: "0.05em",
              textTransform: "uppercase",
            }}
          >
            LAST UPDATED · JULY 1, 2026
          </p>
        </div>

        {/* Floating Navbar at (134, 380) */}
        <div style={{ position: "absolute", left: "134px", top: "380px", zIndex: 30 }}>
                  </div>
      </section>

      {/* =========================================================================
          SECTION 2: PRIVACY POLICY CONTENT (Background: #FFFFFF)
          ========================================================================= */}
      <section
        style={{
          position: "relative",
          width: "1440px",
          backgroundColor: "#FFFFFF",
          boxSizing: "border-box",
          padding: "80px 135px 120px 135px",
          display: "flex",
          flexDirection: "column",
          gap: "44px",
        }}
      >
        {/* 1. Privacy Policy */}
        <div style={{ display: "flex", flexDirection: "column", gap: "14px", width: "1170px" }}>
          <h2
            style={{
              margin: 0,
              fontFamily: "'Cal Sans', 'Outfit', sans-serif",
              fontSize: "34px",
              fontWeight: 400,
              color: "#000000",
              letterSpacing: "-0.01em",
            }}
          >
            Privacy Policy
          </h2>
          <p
            style={{
              margin: 0,
              fontFamily: "'Urbanist', sans-serif",
              fontSize: "16px",
              fontWeight: 400,
              lineHeight: "160%",
              color: "#666666",
            }}
          >
            INNOSINO builds hardware and embedded systems. This policy explains what information we collect through our website and how we use it. By using this site, you agree to what’s described below.
          </p>
        </div>

        {/* 2. Information We Collect */}
        <div style={{ display: "flex", flexDirection: "column", gap: "18px", width: "1170px" }}>
          <h2
            style={{
              margin: 0,
              fontFamily: "'Cal Sans', 'Outfit', sans-serif",
              fontSize: "34px",
              fontWeight: 400,
              color: "#000000",
              letterSpacing: "-0.01em",
            }}
          >
            Information We Collect
          </h2>

          <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
            {/* Item 1 */}
            <div
              style={{
                borderLeft: "3px solid #FF7018",
                paddingLeft: "16px",
                display: "flex",
                alignItems: "center",
              }}
            >
              <p
                style={{
                  margin: 0,
                  fontFamily: "'Urbanist', sans-serif",
                  fontSize: "16px",
                  fontWeight: 400,
                  lineHeight: "150%",
                  color: "#444444",
                }}
              >
                <strong style={{ color: "#000000", fontWeight: 600 }}>Contact details :</strong> Name, email, and company, when you reach out or request a quote.
              </p>
            </div>

            {/* Item 2 */}
            <div
              style={{
                borderLeft: "3px solid #FF7018",
                paddingLeft: "16px",
                display: "flex",
                alignItems: "center",
              }}
            >
              <p
                style={{
                  margin: 0,
                  fontFamily: "'Urbanist', sans-serif",
                  fontSize: "16px",
                  fontWeight: 400,
                  lineHeight: "150%",
                  color: "#444444",
                }}
              >
                <strong style={{ color: "#000000", fontWeight: 600 }}>Usage data :</strong> Pages visited, browser type, and general device info, collected automatically.
              </p>
            </div>

            {/* Item 3 */}
            <div
              style={{
                borderLeft: "3px solid #FF7018",
                paddingLeft: "16px",
                display: "flex",
                alignItems: "center",
              }}
            >
              <p
                style={{
                  margin: 0,
                  fontFamily: "'Urbanist', sans-serif",
                  fontSize: "16px",
                  fontWeight: 400,
                  lineHeight: "150%",
                  color: "#444444",
                }}
              >
                <strong style={{ color: "#000000", fontWeight: 600 }}>Cookies :</strong> Small files used to remember preferences and understand site usage.
              </p>
            </div>
          </div>
        </div>

        {/* 3. How We Use It */}
        <div style={{ display: "flex", flexDirection: "column", gap: "18px", width: "1170px" }}>
          <h2
            style={{
              margin: 0,
              fontFamily: "'Cal Sans', 'Outfit', sans-serif",
              fontSize: "34px",
              fontWeight: 400,
              color: "#000000",
              letterSpacing: "-0.01em",
            }}
          >
            How We Use It
          </h2>

          <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
            {/* Item 1 */}
            <div
              style={{
                borderLeft: "3px solid #FF7018",
                paddingLeft: "16px",
                display: "flex",
                alignItems: "center",
              }}
            >
              <p
                style={{
                  margin: 0,
                  fontFamily: "'Urbanist', sans-serif",
                  fontSize: "16px",
                  fontWeight: 400,
                  lineHeight: "150%",
                  color: "#444444",
                }}
              >
                Respond to project inquiries and provide support.
              </p>
            </div>

            {/* Item 2 */}
            <div
              style={{
                borderLeft: "3px solid #FF7018",
                paddingLeft: "16px",
                display: "flex",
                alignItems: "center",
              }}
            >
              <p
                style={{
                  margin: 0,
                  fontFamily: "'Urbanist', sans-serif",
                  fontSize: "16px",
                  fontWeight: 400,
                  lineHeight: "150%",
                  color: "#444444",
                }}
              >
                Improve the website and understand how it’s used.
              </p>
            </div>

            {/* Item 3 */}
            <div
              style={{
                borderLeft: "3px solid #FF7018",
                paddingLeft: "16px",
                display: "flex",
                alignItems: "center",
              }}
            >
              <p
                style={{
                  margin: 0,
                  fontFamily: "'Urbanist', sans-serif",
                  fontSize: "16px",
                  fontWeight: 400,
                  lineHeight: "150%",
                  color: "#444444",
                }}
              >
                Send updates only if you’ve opted in—never sold to third parties.
              </p>
            </div>
          </div>
        </div>

        {/* 4. Data Sharing */}
        <div style={{ display: "flex", flexDirection: "column", gap: "14px", width: "1170px" }}>
          <h2
            style={{
              margin: 0,
              fontFamily: "'Cal Sans', 'Outfit', sans-serif",
              fontSize: "34px",
              fontWeight: 400,
              color: "#000000",
              letterSpacing: "-0.01em",
            }}
          >
            Data Sharing
          </h2>
          <p
            style={{
              margin: 0,
              fontFamily: "'Urbanist', sans-serif",
              fontSize: "16px",
              fontWeight: 400,
              lineHeight: "160%",
              color: "#666666",
            }}
          >
            We don’t sell your data. We may share it with service providers who help us run the site (e.g. hosting, analytics), bound by confidentiality, or when required by law.
          </p>
        </div>

        {/* 5. Data Retention & Security */}
        <div style={{ display: "flex", flexDirection: "column", gap: "14px", width: "1170px" }}>
          <h2
            style={{
              margin: 0,
              fontFamily: "'Cal Sans', 'Outfit', sans-serif",
              fontSize: "34px",
              fontWeight: 400,
              color: "#000000",
              letterSpacing: "-0.01em",
            }}
          >
            Data Retention & Security
          </h2>
          <p
            style={{
              margin: 0,
              fontFamily: "'Urbanist', sans-serif",
              fontSize: "16px",
              fontWeight: 400,
              lineHeight: "160%",
              color: "#666666",
            }}
          >
            We keep personal data only as long as needed for the purposes above, and use reasonable technical safeguards to protect it. No method of transmission is 100% secure, so we can’t guarantee absolute security.
          </p>
        </div>

        {/* 6. Your Rights */}
        <div style={{ display: "flex", flexDirection: "column", gap: "14px", width: "1170px" }}>
          <h2
            style={{
              margin: 0,
              fontFamily: "'Cal Sans', 'Outfit', sans-serif",
              fontSize: "34px",
              fontWeight: 400,
              color: "#000000",
              letterSpacing: "-0.01em",
            }}
          >
            Your Rights
          </h2>
          <p
            style={{
              margin: 0,
              fontFamily: "'Urbanist', sans-serif",
              fontSize: "16px",
              fontWeight: 400,
              lineHeight: "160%",
              color: "#666666",
            }}
          >
            You can request access to, correction of, or deletion of your personal data at any time by contacting us below.
          </p>
        </div>

        {/* 7. Children's Privacy */}
        <div style={{ display: "flex", flexDirection: "column", gap: "14px", width: "1170px" }}>
          <h2
            style={{
              margin: 0,
              fontFamily: "'Cal Sans', 'Outfit', sans-serif",
              fontSize: "34px",
              fontWeight: 400,
              color: "#000000",
              letterSpacing: "-0.01em",
            }}
          >
            Children’s Privacy
          </h2>
          <p
            style={{
              margin: 0,
              fontFamily: "'Urbanist', sans-serif",
              fontSize: "16px",
              fontWeight: 400,
              lineHeight: "160%",
              color: "#666666",
            }}
          >
            Our site isn’t directed at children under 13, and we don’t knowingly collect data from them.
          </p>
        </div>

        {/* 8. Changes To This Policy */}
        <div style={{ display: "flex", flexDirection: "column", gap: "14px", width: "1170px" }}>
          <h2
            style={{
              margin: 0,
              fontFamily: "'Cal Sans', 'Outfit', sans-serif",
              fontSize: "34px",
              fontWeight: 400,
              color: "#000000",
              letterSpacing: "-0.01em",
            }}
          >
            Changes To This Policy
          </h2>
          <p
            style={{
              margin: 0,
              fontFamily: "'Urbanist', sans-serif",
              fontSize: "16px",
              fontWeight: 400,
              lineHeight: "160%",
              color: "#666666",
            }}
          >
            Questions about this policy? Reach out any time.
          </p>
        </div>

        {/* 9. Contact Us */}
        <div style={{ display: "flex", flexDirection: "column", gap: "14px", width: "1170px" }}>
          <h2
            style={{
              margin: 0,
              fontFamily: "'Cal Sans', 'Outfit', sans-serif",
              fontSize: "34px",
              fontWeight: 400,
              color: "#000000",
              letterSpacing: "-0.01em",
            }}
          >
            Contact Us
          </h2>
          <p
            style={{
              margin: 0,
              fontFamily: "'Urbanist', sans-serif",
              fontSize: "16px",
              fontWeight: 400,
              lineHeight: "160%",
              color: "#666666",
            }}
          >
            Questions about this policy? Reach out any time.
          </p>

          {/* Email row with Copy Button */}
          <div style={{ display: "flex", alignItems: "center", gap: "8px", marginTop: "4px" }}>
            <span
              style={{
                fontFamily: "'Urbanist', sans-serif",
                fontSize: "16px",
                fontWeight: 700,
                color: "#000000",
              }}
            >
              Email:
            </span>
            <span
              style={{
                fontFamily: "'Urbanist', sans-serif",
                fontSize: "16px",
                fontWeight: 400,
                color: "#000000",
              }}
            >
              ceo@innosino.com
            </span>
            <button
              type="button"
              onClick={handleCopyEmail}
              title="Copy email address"
              style={{
                background: "none",
                border: "none",
                cursor: "pointer",
                padding: "4px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: copied ? "#FF7018" : "#444444",
                transition: "color 0.2s ease",
              }}
            >
              {copied ? (
                <span style={{ fontSize: "12px", color: "#FF7018", fontWeight: 600 }}>Copied!</span>
              ) : (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M8 4V16C8 17.1046 8.89543 18 10 18H18C19.1046 18 20 17.1046 20 16V4C20 2.89543 19.1046 2 18 2H10C8.89543 2 8 2.89543 8 4Z"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M16 18V20C16 21.1046 15.1046 22 14 22H6C4.89543 22 4 21.1046 4 20V8C4 6.89543 4.89543 6 6 6H8"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 3: FOOTER & INTERACTIVE CHAT (Height: 275px, Background: #000000)
          ========================================================================= */}
      <footer
        style={{
          position: "relative",
          width: "1440px",
          height: "275px",
          backgroundColor: "#000000",
          boxSizing: "border-box",
        }}
      >
        <div style={{ position: "absolute", left: "135px", top: "63.5px", zIndex: 30 }}>
                  </div>

        {/* Interactive Chat Widget */}
        <div
          style={{
            position: "absolute",
            left: "973px",
            top: "38.5px",
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

        {/* Footer Bottom */}
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
