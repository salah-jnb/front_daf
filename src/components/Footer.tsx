import { useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  Download,
  Globe,
  Mail,
  MapPin,
  Phone,
  ArrowUpRight,
  ChevronRight,
} from "lucide-react";
import signatureImg from "@/assets/signature-1-600x400.webp";
import mimcLogo from "@/assets/partners/mimc.webp";
import jafLogo from "@/assets/logo_jaf-small.webp";

/* ── Static data ──────────────────────────────────────────── */
const quickLinks = [
  { label: "Home", href: "#home" },
  { label: "Services", href: "#services" },
  { label: "About Us", href: "#about" },
  { label: "Process", href: "#process" },
  { label: "Accreditations", href: "#accreditations" },
  { label: "Contact", href: "#contact" },
];

const policyLinks = [
  {
    label: "Anti-Corruption & Bribery Statement",
    href: "/documents/anti-corruption-bribery.pdf",
    download: "Anti corruption & bribery.pdf",
  },
  {
    label: "Data Protection Policy",
    href: "/documents/data-protection-policy.pdf",
    download: "Data protection policy.pdf",
  },
  {
    label: "Code of Ethics",
    href: "/documents/code-of-ethics.pdf",
    download: "Code of ethics.pdf",
  },
];

/* ── Footer component ─────────────────────────────────────── */
const Footer = () => {
  const { t, i18n } = useTranslation();
  const apiBaseUrl = useMemo(
    () =>
      (
        localStorage.getItem("tg_api") ||
        import.meta.env.VITE_API_URL ||
        ""
      ).replace(/\/$/, ""),
    [],
  );

  const [info, setInfo] = useState<{
    id?: number;
    moveProfetionelle?: string;
    storageSolution?: string;
    phone1?: string;
    phone2?: string;
    email?: string;
    yearsExperience?: number;
    offices?: unknown[];
    sponsors?: unknown[];
    contacts?: unknown[];
  } | null>(null);

  const [offices, setOffices] = useState<any[]>([]);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const [resInfo, resOffices] = await Promise.all([
          fetch(`${apiBaseUrl}/informations/1`),
          fetch(`${apiBaseUrl}/offices`)
        ]);

        if (resInfo.ok) {
          const data = await resInfo.json();
          if (!cancelled) setInfo(data);
        }

        if (resOffices.ok) {
          const dataOffices = await resOffices.json();
          if (!cancelled) setOffices(dataOffices);
        }
      } catch {
        if (!cancelled) {
          setInfo(null);
          setOffices([]);
        }
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [apiBaseUrl]);

  const line = (v?: string | null) => (v && v.trim() ? v.trim() : "—");

  return (
    <footer className="ft-root">
      {/* ── Partner Network Banner ───────────────────────────── */}
      <div className="ft-partner-banner">
        <div className="ft-partner-glow" aria-hidden="true" />
        <div className="container mx-auto px-4 sm:px-6">
          <div className="ft-partner-inner">
            {/* Left: text */}
            <div className="ft-partner-text">
              <div className="ft-eyebrow-wrap">
                <Globe size={13} strokeWidth={2.2} />
                <span>{t('footer.partnerEyebrow')}</span>
              </div>
              <h2 className="ft-partner-title">
                {t('footer.trustedPartner')}{" "}
                <span className="gradient-text">{t('footer.morocco')}</span>
              </h2>
              <p className="ft-partner-company">
                Moumene International Moving Company
              </p>

              <div className="ft-partner-contacts">
                {offices.map((office) => (
                  <div key={office.id} className="ft-contact-row">
                    <MapPin size={14} className="ft-contact-icon" />
                    <span>{office.officeName}</span>
                  </div>
                ))}
                <div className="ft-contact-row">
                  <Mail size={14} className="ft-contact-icon" />
                  <a href="mailto:mimc@moumene.com" className="ft-link">
                    mimc@moumene.com
                  </a>
                </div>
                <div className="ft-contact-row">
                  <Globe size={14} className="ft-contact-icon" />
                  <a
                    href="https://www.moumene.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="ft-link ft-link-external"
                  >
                    www.moumene.com
                    <ArrowUpRight size={11} />
                  </a>
                </div>
                <div className="ft-contact-row">
                  <Phone size={14} className="ft-contact-icon" />
                  <span>(+212) 537 26 20 46 / 26 31 57 · GSM: (+212) 661 37 41 66</span>
                </div>
              </div>
            </div>

            {/* Right: logo card */}
            <div className="ft-partner-logo-wrap">
              <div className="ft-partner-logo-card">
                <img
                  src={mimcLogo}
                  alt="MIMC – Moumene International Moving Company logo"
                  className="ft-partner-logo-img"
                  loading="lazy"
                />
              </div>
              <div className="ft-partner-badge">
                <span className="ft-partner-badge-dot" />
                Verified Partner
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Divider ───────────────────────────────────────────── */}
      <div className="ft-divider" aria-hidden="true" />

      {/* ── Main footer grid ──────────────────────────────────── */}
      <div className="container mx-auto px-4 sm:px-6 pt-14 pb-10">
        <div className="ft-grid">
          {/* Col 1: Brand + Contact */}
          <div className="ft-col ft-col-brand">
            <a href="#home" className="ft-logo-link" aria-label="JAF Logistics home">
              <img
                src={jafLogo}
                alt="JAF Demenagements"
                className="ft-logo"
                loading="lazy"
              />
            </a>
            <p className="ft-tagline">
              {t('footer.tagline')}
            </p>

            {/* Founder/CEO Signature */}
            <div className="mb-8">
              <img
                src={signatureImg}
                alt="Founder Signature"
                className="w-40 h-auto opacity-70 drop-shadow-sm dark:invert transition-opacity duration-300 hover:opacity-100"
                loading="lazy"
              />
            </div>

            {/* Contact info */}
            <div className="ft-info-list">
              {info?.phone1 && (
                <a href={`tel:${info.phone1}`} className="ft-info-row">
                  <div className="ft-info-icon-wrap">
                    <Phone size={14} />
                  </div>
                  <span>{line(info.phone1)}</span>
                </a>
              )}
              {info?.phone2 && (
                <a href={`tel:${info.phone2}`} className="ft-info-row">
                  <div className="ft-info-icon-wrap">
                    <Phone size={14} />
                  </div>
                  <span>{line(info.phone2)}</span>
                </a>
              )}
              {info?.email && (
                <a href={`mailto:${info.email}`} className="ft-info-row">
                  <div className="ft-info-icon-wrap">
                    <Mail size={14} />
                  </div>
                  <span>{line(info.email)}</span>
                </a>
              )}
              {!info && (
                <>
                  <div className="ft-info-row">
                    <div className="ft-info-icon-wrap"><Phone size={14} /></div>
                    <span className="text-muted-foreground">—</span>
                  </div>
                  <div className="ft-info-row">
                    <div className="ft-info-icon-wrap"><Mail size={14} /></div>
                    <span className="text-muted-foreground">—</span>
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div className="ft-col">
            <h3 className="ft-col-heading">{t('footer.quickLinks')}</h3>
            <ul className="ft-link-list">
              {quickLinks.map((l) => {
                const camelCase = l.label.toLowerCase().replace(/[^a-zA-Z0-9]+(.)/g, (_, char) => char.toUpperCase());
                return (
                <li key={l.href}>
                  <a href={l.href} className="ft-nav-link">
                    <ChevronRight size={13} className="ft-nav-arrow" />
                    {t('navbar.' + camelCase, l.label)}
                  </a>
                </li>
              )})}
            </ul>
          </div>

          {/* Col 3: Policies */}
          <div className="ft-col">
            <h3 className="ft-col-heading">{t('footer.policies')}</h3>
            <ul className="ft-link-list">
              {policyLinks.map((item) => (
                <li key={item.label}>
                  <a
                    href={item.href}
                    download={item.download}
                    className="ft-nav-link"
                  >
                    <Download size={13} className="ft-nav-arrow" />
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>

            {/* Stats strip */}
            {info && (
              <div className="ft-stats-strip">
                <div className="ft-stat">
                  <span className="ft-stat-val">
                    {Array.isArray(info.offices) ? info.offices.length : "—"}
                  </span>
                  <span className="ft-stat-label">{t('footer.offices')}</span>
                </div>
                <div className="ft-stat-sep" />
                <div className="ft-stat">
                  <span className="ft-stat-val">
                    {typeof info.yearsExperience === "number"
                      ? `${info.yearsExperience}+`
                      : "65+"}
                  </span>
                  <span className="ft-stat-label">{t('footer.yearsExp')}</span>
                </div>
                <div className="ft-stat-sep" />
                <div className="ft-stat">
                  <span className="ft-stat-val">
                    {Array.isArray(info.sponsors) ? info.sponsors.length : "—"}
                  </span>
                  <span className="ft-stat-label">{t('footer.sponsors', 'Sponsors')}</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ── Bottom bar ── */}
      <div className="ft-bottom">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 py-2">
            <div className="ft-bottom-inner text-center md:text-left flex-wrap justify-center md:justify-start !w-auto">
              <span>
                © {new Date().getFullYear()} JAF Logistics.{" "}
                <a
                  href="/polices.txt"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-primary transition-colors hover:underline"
                >
                  {t('footer.rights', 'All rights reserved.')}
                </a>
              </span>
              <span className="ft-bottom-sep" aria-hidden="true">·</span>
              <span>{t('footer.international', 'International Moving & Freight Services')}</span>
            </div>

            {/* Footer Language Toggle */}
            <button
              onClick={() => i18n.changeLanguage(i18n.language?.startsWith('fr') ? 'en' : 'fr')}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-xs font-bold uppercase tracking-[0.1em] text-[#cbd5e1] hover:bg-white/10 hover:text-white transition-colors"
              title="Change Language"
            >
              <span>{i18n.language?.startsWith('fr') ? '🌍 Français' : '🌍 English'}</span>
              <span className="opacity-40 text-[10px] ml-1">({i18n.language?.startsWith('fr') ? 'EN' : 'FR'})</span>
            </button>
          </div>
        </div>
      </div>

      {/* ── Scoped styles ─────────────────────────────────────── */}
      <style>{`
        /* Root */
        .ft-root {
          position: relative;
          background: #0f2044;
          border-top: 1px solid rgba(255,255,255,0.08);
          overflow: hidden;
          color: #cbd5e1;
        }

        /* ── Partner banner ── */
        .ft-partner-banner {
          position: relative;
          padding: 5rem 0 4.5rem;
          overflow: hidden;
        }
        .ft-partner-glow {
          position: absolute;
          width: 700px; height: 500px;
          top: -180px; right: -180px;
          background: radial-gradient(
            ellipse,
            rgba(59,130,246,0.15) 0%,
            transparent 65%
          );
          pointer-events: none;
          filter: blur(60px);
        }
        .ft-partner-inner {
          display: flex;
          flex-wrap: wrap;
          gap: 3rem;
          align-items: center;
          justify-content: space-between;
        }
        .ft-partner-text {
          flex: 1 1 340px;
          max-width: 560px;
        }

        /* Eyebrow */
        .ft-eyebrow-wrap {
          display: inline-flex;
          align-items: center;
          gap: 0.4rem;
          padding: 0.3rem 0.9rem;
          border-radius: 999px;
          font-size: 0.65rem;
          font-weight: 700;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          background: rgba(59,130,246,0.15);
          border: 1px solid rgba(59,130,246,0.3);
          color: #60a5fa;
          margin-bottom: 1.1rem;
        }

        /* Title */
        .ft-partner-title {
          font-size: clamp(1.8rem, 3vw, 2.8rem);
          font-weight: 800;
          line-height: 1.15;
          letter-spacing: -0.02em;
          margin-bottom: 0.5rem;
          color: #f1f5f9;
        }
        .ft-partner-company {
          font-size: 1.05rem;
          font-weight: 600;
          color: #94a3b8;
          margin-bottom: 1.5rem;
        }

        /* Contact rows */
        .ft-partner-contacts {
          display: flex;
          flex-direction: column;
          gap: 0.6rem;
        }
        .ft-contact-row {
          display: flex;
          align-items: flex-start;
          gap: 0.6rem;
          font-size: 0.85rem;
          color: #94a3b8;
          line-height: 1.5;
        }
        .ft-contact-icon {
          color: #60a5fa;
          flex-shrink: 0;
          margin-top: 2px;
        }
        .ft-link {
          color: #60a5fa;
          text-decoration: none;
          font-weight: 500;
          transition: opacity 0.2s ease;
        }
        .ft-link:hover { opacity: 0.75; }
        .ft-link-external {
          display: inline-flex;
          align-items: center;
          gap: 0.25rem;
        }

        /* Partner logo card */
        .ft-partner-logo-wrap {
          flex: 0 0 auto;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.75rem;
        }
        .ft-partner-logo-card {
          width: 300px;
          max-width: 90vw;
          border-radius: 20px;
          border: 1px solid rgba(255,255,255,0.1);
          background: rgba(255,255,255,0.05);
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
          padding: 1.5rem;
          box-shadow:
            0 4px 24px rgba(59,130,246,0.1),
            0 1px 0 rgba(255,255,255,0.05) inset;
          transition: box-shadow 0.3s ease, transform 0.3s ease;
        }
        .ft-partner-logo-card:hover {
          box-shadow: 0 8px 40px rgba(59,130,246,0.2);
          transform: translateY(-3px);
        }
        .ft-partner-logo-img {
          width: 100%;
          height: auto;
          object-fit: contain;
          border-radius: 10px;
        }
        .ft-partner-badge {
          display: inline-flex;
          align-items: center;
          gap: 0.4rem;
          padding: 0.25rem 0.8rem;
          border-radius: 999px;
          font-size: 0.7rem;
          font-weight: 600;
          background: rgba(59,130,246,0.12);
          border: 1px solid rgba(59,130,246,0.3);
          color: #60a5fa;
        }
        .ft-partner-badge-dot {
          width: 6px; height: 6px;
          border-radius: 50%;
          background: #60a5fa;
          box-shadow: 0 0 6px rgba(96,165,250,0.6);
          animation: ft-pulse 2s ease-in-out infinite;
        }
        @keyframes ft-pulse {
          0%,100% { opacity: 1; transform: scale(1); }
          50%      { opacity: 0.6; transform: scale(1.3); }
        }

        /* ── Gradient divider ── */
        .ft-divider {
          height: 1px;
          background: linear-gradient(
            90deg,
            transparent 0%,
            rgba(59,130,246,0.4) 30%,
            rgba(56,189,248,0.4) 70%,
            transparent 100%
          );
          margin: 0 1.5rem;
        }

        /* ── Main footer grid ── */
        .ft-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 2.5rem;
        }
        @media (min-width: 640px) {
          .ft-grid { grid-template-columns: repeat(2, 1fr); }
        }
        @media (min-width: 1024px) {
          .ft-grid { grid-template-columns: 1.5fr 1fr 1.4fr; }
        }

        .ft-col { display: flex; flex-direction: column; gap: 0; }
        .ft-col-brand {}

        /* Logo */
        .ft-logo-link { display: inline-block; margin-bottom: 1.25rem; }
        .ft-logo { height: 60px; width: auto; object-fit: contain; }

        /* Tagline */
        .ft-tagline {
          font-size: 0.875rem;
          color: #94a3b8;
          line-height: 1.7;
          max-width: 36ch;
          margin-bottom: 1.5rem;
        }

        /* Info list */
        .ft-info-list { display: flex; flex-direction: column; gap: 0.6rem; }
        .ft-info-row {
          display: inline-flex;
          align-items: center;
          gap: 0.6rem;
          font-size: 0.85rem;
          color: #94a3b8;
          text-decoration: none;
          transition: color 0.2s ease;
        }
        .ft-info-row:hover { color: #f1f5f9; }
        .ft-info-icon-wrap {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 28px; height: 28px;
          border-radius: 8px;
          background: rgba(59,130,246,0.12);
          border: 1px solid rgba(59,130,246,0.25);
          color: #60a5fa;
          flex-shrink: 0;
        }

        /* Col heading */
        .ft-col-heading {
          font-size: 0.75rem;
          font-weight: 700;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: #f1f5f9;
          margin-bottom: 1.1rem;
          padding-bottom: 0.6rem;
          border-bottom: 1px solid rgba(255,255,255,0.1);
        }

        /* Nav links list */
        .ft-link-list {
          list-style: none;
          padding: 0;
          margin: 0;
          display: flex;
          flex-direction: column;
          gap: 0.05rem;
        }
        .ft-nav-link {
          display: inline-flex;
          align-items: center;
          gap: 0.4rem;
          padding: 0.45rem 0;
          font-size: 0.875rem;
          color: #94a3b8;
          text-decoration: none;
          border-bottom: 1px solid rgba(255,255,255,0.06);
          width: 100%;
          transition: color 0.2s ease, padding-left 0.2s ease;
        }
        .ft-nav-link:last-child { border-bottom: none; }
        .ft-nav-link:hover {
          color: #60a5fa;
          padding-left: 0.35rem;
        }
        .ft-nav-arrow {
          color: rgba(96,165,250,0.5);
          flex-shrink: 0;
          transition: color 0.2s ease, transform 0.2s ease;
        }
        .ft-nav-link:hover .ft-nav-arrow {
          color: #60a5fa;
          transform: translateX(2px);
        }

        /* Stats strip */
        .ft-stats-strip {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          margin-top: 1.5rem;
          padding: 0.75rem 1rem;
          border-radius: 12px;
          background: rgba(59,130,246,0.08);
          border: 1px solid rgba(59,130,246,0.18);
        }
        .ft-stat {
          flex: 1;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.1rem;
        }
        .ft-stat-val {
          font-size: 1.1rem;
          font-weight: 800;
          color: #60a5fa;
          line-height: 1;
        }
        .ft-stat-label {
          font-size: 0.6rem;
          font-weight: 600;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: #94a3b8;
        }
        .ft-stat-sep {
          width: 1px;
          height: 28px;
          background: rgba(255,255,255,0.1);
          flex-shrink: 0;
        }

        /* ── Bottom bar ── */
        .ft-bottom {
          border-top: 1px solid rgba(255,255,255,0.08);
          padding: 1.25rem 0;
        }
        .ft-bottom-inner {
          display: flex;
          align-items: center;
          justify-content: center;
          flex-wrap: wrap;
          gap: 0.5rem 1rem;
          font-size: 0.78rem;
          color: #64748b;
          text-align: center;
        }
        .ft-bottom-sep { opacity: 0.4; }
      `}</style>
    </footer>
  );
};

export default Footer;
