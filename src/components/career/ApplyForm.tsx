"use client";

import React, { useState } from "react";

/**
 * The application form on a job page.
 *
 * The site is a static export with no server, so there is nothing here to POST
 * to. Rather than show a tick and drop the application, this composes the
 * message and hands it to the applicant's own mail client, which is the one
 * route that genuinely delivers without a backend. The CV is asked for as an
 * attachment because a mailto: cannot carry a file.
 *
 * Swap `buildMailto` for a fetch to a form endpoint the day there is a server
 * to receive one; nothing else here needs to change.
 */
export default function ApplyForm({
  role,
  email,
}: {
  role: string;
  /** Where applications go — the one address the site already publishes. */
  email: string;
}) {
  const [name, setName] = useState("");
  const [from, setFrom] = useState("");
  const [phone, setPhone] = useState("");
  const [links, setLinks] = useState("");
  const [message, setMessage] = useState("");
  const [opened, setOpened] = useState(false);

  const buildMailto = () => {
    /* null drops the line; an empty string is a deliberate blank one. */
    const body = [
      `Role: ${role}`,
      "",
      `Name: ${name}`,
      `Email: ${from}`,
      phone ? `Phone: ${phone}` : null,
      links ? `Links: ${links}` : null,
      "",
      message,
      "",
      "--",
      "Please attach your CV before sending.",
    ]
      .filter((line): line is string => line !== null)
      .join("\n");

    return `mailto:${email}?subject=${encodeURIComponent(
      `Application — ${role}`,
    )}&body=${encodeURIComponent(body)}`;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    window.location.href = buildMailto();
    setOpened(true);
  };

  return (
    <div className="apply-form-card">
      <h2 className="job-detail__heading">Apply for this role</h2>

      {opened ? (
        <div className="apply-form__done">
          <p>
            Your email app should have opened with this application ready to send.
            <strong> Attach your CV and hit send</strong> — it is not with us until
            you do.
          </p>
          <p>
            Nothing happened? Email{" "}
            <a href={`mailto:${email}?subject=${encodeURIComponent(`Application — ${role}`)}`}>
              {email}
            </a>{" "}
            directly.
          </p>
          <button type="button" className="pill-button" onClick={() => setOpened(false)}>
            Edit the application
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="ct-form">
          <div className="ct-field">
            <label className="ct-label" htmlFor="apply-name">
              Full name
            </label>
            <input
              id="apply-name"
              className="ct-input"
              type="text"
              required
              placeholder="Enter your full name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className="ct-field">
            <label className="ct-label" htmlFor="apply-email">
              Email
            </label>
            <input
              id="apply-email"
              className="ct-input"
              type="email"
              required
              placeholder="Enter your email address"
              value={from}
              onChange={(e) => setFrom(e.target.value)}
            />
          </div>

          <div className="ct-field">
            <label className="ct-label" htmlFor="apply-phone">
              Phone <span className="ct-optional">(optional)</span>
            </label>
            <input
              id="apply-phone"
              className="ct-input"
              type="tel"
              placeholder="Phone number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>

          <div className="ct-field">
            <label className="ct-label" htmlFor="apply-links">
              Portfolio, GitHub or LinkedIn <span className="ct-optional">(optional)</span>
            </label>
            <input
              id="apply-links"
              className="ct-input"
              type="text"
              placeholder="A repo, a board file, anything you have built"
              value={links}
              onChange={(e) => setLinks(e.target.value)}
            />
          </div>

          <div className="ct-field ct-field--wide">
            <label className="ct-label" htmlFor="apply-message">
              Why this role?
            </label>
            <textarea
              id="apply-message"
              className="ct-input ct-textarea"
              required
              rows={5}
              placeholder="What you have worked on, and what you want to work on next."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
          </div>

          <p className="apply-form__note">
            Submitting opens your email app with this filled in. Attach your CV there
            — we cannot receive a file from this page.
          </p>

          <button type="submit" className="cta-banner__button job-detail__apply">
            <span>Continue to email</span>
            <span style={{ fontSize: "0.75em" }} aria-hidden="true">
              ↗
            </span>
          </button>
        </form>
      )}
    </div>
  );
}
