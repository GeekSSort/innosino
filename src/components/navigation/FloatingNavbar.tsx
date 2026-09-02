"use client";

import React, { useState } from "react";
import Link from "next/link";

interface NavItem {
  label: string;
  href: string;
  hasDropdown?: boolean;
}

const navItems: NavItem[] = [
  { label: "Services", href: "#services" },
  { label: "Industries", href: "#industries" },
  { label: "Projects", href: "#projects" },
  { label: "About Us", href: "#about" },
  { label: "More", href: "#more", hasDropdown: true },
];

interface FloatingNavbarProps {
  styleOverride?: React.CSSProperties;
}

export default function FloatingNavbar({ styleOverride }: FloatingNavbarProps) {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  return (
    <div
      style={{
        position: "absolute",
        left: "135px",
        top: "626px",
        width: "582px",
        height: "68px",
        boxSizing: "border-box",
        padding: "12px 16px 12px 20px",
        borderRadius: "200px",
        backgroundColor: "rgba(0, 0, 0, 1)",
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "flex-start",
        gap: "20px",
        zIndex: 30,
        border: "1.5px solid transparent",
        backgroundImage:
          "linear-gradient(rgba(0,0,0,1), rgba(0,0,0,1)), linear-gradient(90deg, rgba(255,112,24,1) 26.9%, rgba(255,190,3,1) 100%)",
        backgroundOrigin: "border-box",
        backgroundClip: "padding-box, border-box",
        boxShadow: "0 0 24px rgba(255, 112, 24, 0.25)",
        ...styleOverride,
      }}
    >
      {/* Navigation Items */}
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          gap: "20px",
        }}
      >
        {navItems.map((item) => {
          if (item.hasDropdown) {
            return (
              <div
                key={item.label}
                style={{
                  position: "relative",
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  gap: "4px",
                  height: "20px",
                }}
              >
                <button
                  type="button"
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    gap: "4px",
                    background: "none",
                    border: "none",
                    padding: 0,
                    cursor: "pointer",
                    fontFamily: "'Urbanist', sans-serif",
                    fontWeight: 500,
                    fontSize: "16px",
                    lineHeight: "19px",
                    color: "#FFFFFF",
                  }}
                >
                  <span>{item.label}</span>
                  {/* Chevron SVG */}
                  <div
                    style={{
                      width: "20px",
                      height: "20px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <svg
                      width="10"
                      height="5"
                      viewBox="0 0 10 5"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      style={{
                        transform: dropdownOpen ? "rotate(180deg)" : "none",
                        transition: "transform 0.2s ease",
                      }}
                    >
                      <path
                        d="M1 1L5 4L9 1"
                        stroke="#FFFFFF"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                </button>

                {/* Dropdown Menu */}
                {dropdownOpen && (
                  <div
                    style={{
                      position: "absolute",
                      bottom: "calc(100% + 12px)",
                      left: 0,
                      minWidth: "150px",
                      backgroundColor: "rgba(10, 10, 10, 0.95)",
                      backdropFilter: "blur(12px)",
                      border: "1px solid rgba(255, 112, 24, 0.3)",
                      borderRadius: "12px",
                      padding: "8px",
                      boxShadow: "0 10px 30px rgba(0,0,0,0.8)",
                      display: "flex",
                      flexDirection: "column",
                      gap: "4px",
                      zIndex: 100,
                    }}
                    onMouseLeave={() => setDropdownOpen(false)}
                  >
                    <Link
                      href="#team"
                      style={{
                        padding: "6px 12px",
                        fontSize: "13px",
                        fontFamily: "'Urbanist', sans-serif",
                        color: "#CCCCCC",
                        textDecoration: "none",
                        borderRadius: "6px",
                      }}
                    >
                      Our Team
                    </Link>
                    <Link
                      href="#careers"
                      style={{
                        padding: "6px 12px",
                        fontSize: "13px",
                        fontFamily: "'Urbanist', sans-serif",
                        color: "#CCCCCC",
                        textDecoration: "none",
                        borderRadius: "6px",
                      }}
                    >
                      Careers
                    </Link>
                    <Link
                      href="#blog"
                      style={{
                        padding: "6px 12px",
                        fontSize: "13px",
                        fontFamily: "'Urbanist', sans-serif",
                        color: "#CCCCCC",
                        textDecoration: "none",
                        borderRadius: "6px",
                      }}
                    >
                      Blog & Insights
                    </Link>
                  </div>
                )}
              </div>
            );
          }

          return (
            <Link
              key={item.label}
              href={item.href}
              style={{
                fontFamily: "'Urbanist', sans-serif",
                fontWeight: 500,
                fontSize: "16px",
                lineHeight: "19px",
                color: "#FFFFFF",
                textDecoration: "none",
                display: "inline-block",
              }}
            >
              {item.label}
            </Link>
          );
        })}
      </div>

      {/* Button: width 136px, height 44px, radius 100px */}
      <Link
        href="#contact"
        style={{
          width: "136px",
          height: "44px",
          borderRadius: "100px",
          background:
            "linear-gradient(90deg, rgba(214, 89, 0, 1) 0%, rgba(255, 190, 3, 1) 100%)",
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
          gap: "4px",
          padding: "12px 20px",
          boxSizing: "border-box",
          textDecoration: "none",
          marginLeft: "auto",
          cursor: "pointer",
        }}
      >
        <span
          style={{
            fontFamily: "'Urbanist', sans-serif",
            fontWeight: 500,
            fontSize: "16px",
            lineHeight: "20px",
            color: "#000000",
            whiteSpace: "nowrap",
          }}
        >
          Book a Call
        </span>
        {/* Arrow Vector (width: 12, height: 16, rotation: -45 deg) */}
        <div
          style={{
            width: "14px",
            height: "14px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <svg
            width="12"
            height="12"
            viewBox="0 0 12 12"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M2.5 9.5L9.5 2.5M9.5 2.5H4M9.5 2.5V8"
              stroke="#000000"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </Link>
    </div>
  );
}
