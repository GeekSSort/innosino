"use client";

import React, { useState } from "react";
import Link from "next/link";
import type { SiteSettings } from "@/sanity/queries";

/**
 * The chat dock and footer bar that close every page.
 *
 * One component rather than the copy that used to sit in each page file: the
 * copies had already drifted — two were missing the Services link the others
 * carried, and the Expertise page had a fixed 1440px-wide footer that could
 * not respond below that width.
 *
 * This is the only reason most pages needed "use client" at all; with the
 * open/closed state of the bubble living here, the pages themselves are
 * Server Components that fetch their own content.
 */
export default function SiteFooter({ settings }: { settings: SiteSettings }) {
  const [chatOpen, setChatOpen] = useState(true);
  const { chatWidget, copyright, footerLinks } = settings;

  return (
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
  );
}
