import Link from "next/link";
import { PortableText } from "next-sanity";
import BackgroundVideo from "@/components/common/BackgroundVideo";
import BrandLogo from "@/components/navigation/BrandLogo";
import FloatingNavbar from "@/components/navigation/FloatingNavbar";
import SiteFooter from "@/components/common/SiteFooter";
import ApplyForm from "@/components/career/ApplyForm";
import type { OpenRole, SiteSettings } from "@/sanity/queries";

/** A titled list of bullets, dropped entirely when the Studio field is empty. */
function BulletSection({ title, items }: { title: string; items: string[] }) {
  if (!items.length) return null;

  return (
    <section style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
      <h2 className="job-detail__heading">{title}</h2>
      <ul className="job-detail__list">
        {items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </section>
  );
}

/**
 * One job opening. Every role renders through this, so a new listing is a
 * document in the Studio rather than a new page in the codebase.
 */
export default function JobDetail({
  role,
  otherRoles,
  settings,
}: {
  role: OpenRole;
  /** The rest of the open roles, for the list at the bottom. */
  otherRoles: OpenRole[];
  settings: SiteSettings;
}) {
  return (
    <main className="job-detail">
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
              <BrandLogo />
            </Link>

            <div className="page-hero__copy">
              <div className="breadcrumb">
                <span className="breadcrumb__link" aria-hidden="true">
                  ✦
                </span>
                <Link href="/" className="breadcrumb__link">
                  HOME
                </Link>
                <span className="breadcrumb__link" aria-hidden="true">
                  &gt;
                </span>
                <Link href="/career" className="breadcrumb__link">
                  CAREER
                </Link>
              </div>

              <h1 className="page-hero__title">{role.title}</h1>

              <div className="job-detail__facts">
                <span>{role.location}</span>
                <span aria-hidden="true">·</span>
                <span>{role.employmentType}</span>
              </div>

              <p className="page-hero__sub">{role.description}</p>

              <a href="#apply" className="cta-banner__button job-detail__apply">
                <span>Apply for this role</span>
                <span style={{ fontSize: "0.75em" }} aria-hidden="true">
                  ↓
                </span>
              </a>
            </div>
          </div>

          <FloatingNavbar variant="inline" />
        </div>
      </section>

      <section className="flow-section" style={{ backgroundColor: "#FFFFFF" }}>
        <div
          className="container"
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "clamp(1.75rem, 4vw, 3rem)",
          }}
        >
          {role.intro && role.intro.length > 0 && (
            <div className="job-detail__intro">
              <PortableText value={role.intro} />
            </div>
          )}

          <BulletSection title="What you would do" items={role.responsibilities} />
          <BulletSection title="What we are looking for" items={role.requirements} />
          <BulletSection title="Nice to have" items={role.niceToHave} />

          {/* The form is the page's real call to action, so it sits inline
              rather than behind another click. */}
          <div id="apply" style={{ scrollMarginBlockStart: "clamp(2rem, 8vw, 6rem)" }}>
            <ApplyForm role={role.title} roleSlug={role.slug} email={settings.email} />
          </div>

          {otherRoles.length > 0 && (
            <section style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              <h2 className="job-detail__heading">Other open roles</h2>
              <div className="job-detail__others">
                {otherRoles.map((other) => (
                  <Link key={other.slug} href={`/career/${other.slug}`}>
                    <span>{other.title}</span>
                    <span>
                      {other.location} · {other.employmentType}
                    </span>
                  </Link>
                ))}
              </div>
            </section>
          )}
        </div>
      </section>

      <SiteFooter settings={settings} />
    </main>
  );
}
