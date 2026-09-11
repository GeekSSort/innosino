"use client";

import React, { useState } from "react";

/**
 * The application form on a job page.
 *
 * Posts to /api/apply, a Cloudflare Worker that writes the application into
 * the Content Lake, where it shows up in the Studio under Job applications.
 * The token that write needs lives as a Worker secret — a write token shipped
 * in this bundle would let anyone edit or empty the dataset.
 *
 * If that call fails for any reason, the form falls back to the applicant's
 * own mail client rather than reporting a success it cannot back up. An
 * application that quietly disappears is the one outcome worth writing extra
 * code to avoid.
 *
 * A CV is still asked for as an attachment: files would need multipart upload
 * and asset storage, which is worth doing only once someone is actually
 * hiring through this.
 */
export default function ApplyForm({
  role,
  email,
  roleSlug,
}: {
  role: string;
  roleSlug: string;
  /** Where applications go if the endpoint cannot be reached. */
  email: string;
}) {
  const [name, setName] = useState("");
  const [from, setFrom] = useState("");
  const [phone, setPhone] = useState("");
  const [links, setLinks] = useState("");
  const [message, setMessage] = useState("");
  const [state, setState] = useState<"editing" | "sending" | "sent" | "mail">(
    "editing",
  );
  const [error, setError] = useState<string | null>(null);
  /** Filled only by bots; a real applicant never sees this field. */
  const [company, setCompany] = useState("");

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setState("sending");
    setError(null);

    try {
      const res = await fetch("/api/apply", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          roleTitle: role,
          roleSlug,
          name,
          email: from,
          phone,
          links,
          message,
          company,
        }),
      });

      if (!res.ok) throw new Error(`apply endpoint returned ${res.status}`);
      setState("sent");
      return;
    } catch (cause) {
      /*
       * Running `next dev` there is no Worker, and a deploy could always fail.
       * Either way the applicant gets a route that works rather than a tick
       * over a lost application.
       */
      console.error("Application POST failed, falling back to email", cause);
      setError(
        "We could not submit that directly, so your email app should open instead.",
      );
      window.location.href = buildMailto();
      setState("mail");
    }
  };

  return (
    <div className="apply-form-card">
      <h2 className="job-detail__heading">Apply for this role</h2>

      {state === "sent" ? (
        <div className="apply-form__done">
          <p>
            <strong>Thanks — we have your application.</strong> Someone on the
            engineering team reads these; expect a reply within a week either way.
          </p>
          <p>
            One thing left: send your CV to{" "}
            <a href={`mailto:${email}?subject=${encodeURIComponent(`CV — ${role} — ${name}`)}`}>
              {email}
            </a>
            . A web form cannot take a file attachment.
          </p>
        </div>
      ) : state === "mail" ? (
        <div className="apply-form__done">
          <p>
            {error} <strong>Attach your CV and hit send</strong> — it is not with us
            until you do.
          </p>
          <p>
            Nothing happened? Email{" "}
            <a href={`mailto:${email}?subject=${encodeURIComponent(`Application — ${role}`)}`}>
              {email}
            </a>{" "}
            directly.
          </p>
          <button type="button" className="pill-button" onClick={() => setState("editing")}>
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

          {/* Hidden from people and from screen readers; bots fill it anyway. */}
          <div className="apply-form__trap" aria-hidden="true">
            <label htmlFor="apply-company">Company</label>
            <input
              id="apply-company"
              type="text"
              tabIndex={-1}
              autoComplete="off"
              value={company}
              onChange={(e) => setCompany(e.target.value)}
            />
          </div>

          <p className="apply-form__note">
            Send your CV separately to {email} — a web form cannot take a file
            attachment.
          </p>

          <button
            type="submit"
            className="cta-banner__button job-detail__apply"
            disabled={state === "sending"}
          >
            <span>{state === "sending" ? "Sending…" : "Send application"}</span>
            <span style={{ fontSize: "0.75em" }} aria-hidden="true">
              ↗
            </span>
          </button>
        </form>
      )}
    </div>
  );
}
