"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import BackgroundVideo from "@/components/common/BackgroundVideo";
import FloatingNavbar from "@/components/navigation/FloatingNavbar";
import { chatWidget, copyright, ctaBanner, footerLinks } from "@/content/site";
import {
  formatPostDate,
  postAuthor,
  postAuthorInitials,
  readTime,
  relatedPosts,
  type Post,
} from "@/content/posts";

/**
 * One article. Every post renders through this, so the twenty posts share a
 * template rather than the site carrying one hand-built page per article —
 * which is what /blogs/details was, for a single post, with nine cards
 * pointing at it.
 */
export default function BlogArticle({ post }: { post: Post }) {
  const [chatOpen, setChatOpen] = useState(true);
  const [copied, setCopied] = useState(false);

  const copyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const related = relatedPosts(post);

  return (
    <main className="pd-page">
      <section className="page-hero">
        <div className="section-media">
          <BackgroundVideo
            src="/about_us/About Us Hero Section.mp4"
            poster="/posters/about_us/About Us Hero Section.webp"
            loading="eager"
          />
          <div
            className="section-media__scrim"
            style={{ backgroundColor: "rgba(0, 0, 0, 0.65)" }}
          />
        </div>

        <div className="container page-hero__inner">
          <div className="page-hero__head">
            <Link href="/" aria-label="INNOSINO home" className="brand-logo-link">
              <Image
                src="/about_us/IS-Logo.webp"
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
                <Link href="/" className="breadcrumb__link">
                  HOME
                </Link>
                <span className="breadcrumb__link" aria-hidden="true">
                  &gt;
                </span>
                <Link href="/blogs" className="breadcrumb__link">
                  BLOG
                </Link>
              </div>

              <h1 className="page-hero__title">{post.title}</h1>

              <p className="page-hero__sub">{post.excerpt}</p>

              <div
                className="pd-hero__specs"
                style={{ marginBlockStart: "clamp(0.25rem, 0.6vw, 8px)" }}
              >
                <span className="blog-byline">
                  <span className="blog-byline__avatar">{postAuthorInitials}</span>
                  <span>
                    <span
                      className="blog-byline__name"
                      style={{ color: "#FFFFFF" }}
                    >
                      {postAuthor}
                    </span>
                    <span className="blog-byline__time">
                      {formatPostDate(post.date)} · {readTime(post)} read
                    </span>
                  </span>
                </span>

                <span className="pd-spec">{post.category}</span>
              </div>
            </div>

            <FloatingNavbar variant="inline" />
          </div>

          <div className="pd-hero__media">
            <Image
              src={post.image}
              alt={post.title}
              fill
              sizes="(max-width: 1023px) 100vw, 970px"
              style={{ objectFit: "cover" }}
              preload
            />
          </div>
        </div>
      </section>

      <section className="pd-body">
        <div className="container">
          <div className="post-layout">
            <aside className="post-rail">
              <h2 className="post-rail__title">Table of Content</h2>

              <ul className="post-rail__list">
                {post.sections.map((section) => (
                  <li key={section.id}>
                    <a href={`#${section.id}`} className="post-rail__link">
                      {section.heading}
                    </a>
                  </li>
                ))}
              </ul>

              <button
                type="button"
                onClick={copyLink}
                className="pill-button"
                style={{ alignSelf: "stretch", justifyContent: "center" }}
              >
                {copied ? "Link copied" : "Share this post"}
              </button>
            </aside>

            <article className="post-body">
              <p className="post-body__lede">{post.excerpt}</p>

              {post.sections.map((section, index) => (
                <React.Fragment key={section.id}>
                  <section className="post-section">
                    <h2 id={section.id}>{section.heading}</h2>
                    {section.body.map((paragraph, i) => (
                      <p key={i}>{paragraph}</p>
                    ))}
                  </section>

                  {/* The frame lifts the quote out between the second and
                      third headings, where the argument turns. */}
                  {post.pullQuote && index === 1 && (
                    <blockquote className="post-quote">
                      &ldquo;{post.pullQuote}&rdquo;
                    </blockquote>
                  )}
                </React.Fragment>
              ))}
            </article>
          </div>

          <div style={{ marginBlockStart: "clamp(3rem, 6vw, 5rem)" }}>
            <h2
              className="section-heading"
              style={{
                color: "#000000",
                marginBlockEnd: "clamp(1.25rem, 2.5vw, 2rem)",
              }}
            >
              READ <span className="section-heading__accent">NEXT</span>
            </h2>

            <div className="post-next">
              {related.map((other) => (
                <Link
                  key={other.slug}
                  href={`/blogs/${other.slug}`}
                  className="blog-card"
                >
                  <div className="blog-card__media">
                    <Image
                      src={other.image}
                      alt={other.title}
                      fill
                      sizes="(max-width: 899px) 100vw, 374px"
                      style={{ objectFit: "cover" }}
                    />
                  </div>

                  <div className="blog-card__meta">
                    <span>{other.category}</span>
                    <span className="blog-card__date">
                      {formatPostDate(other.date)}
                    </span>
                  </div>

                  <h3 className="blog-card__title">{other.title}</h3>

                  <p className="blog-card__desc">{other.excerpt}</p>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="flow-section" style={{ backgroundColor: "#FFFFFF" }}>
        <div className="container">
          <div className="cta-banner cta-banner--compact">
            <h2 className="cta-banner__title">{ctaBanner.title}</h2>

            <p className="cta-banner__body">{ctaBanner.body}</p>

            <Link href={ctaBanner.action.href} className="cta-banner__button">
              <span>{ctaBanner.action.label}</span>
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
