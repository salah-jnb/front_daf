import { useState, useEffect, useContext, useRef } from "react";
import { Menu, X, Sun, Moon, ChevronDown } from "lucide-react";
import { Link } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import { useTranslation } from "react-i18next";
import jafLogo from "@/assets/logo_jaf-566x412.webp";

const navLinks = [
  { key: "home", href: "/#home" },
  { key: "services", href: "/#services" },
  { key: "about", href: "/#about" },
  { key: "howWeWork", href: "/how-we-work" },
  { key: "contact", href: "/contact" },
];

interface NavbarProps {
  lightTextOnTop?: boolean;
}

const Navbar = ({ lightTextOnTop = true }: NavbarProps) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { theme, toggleTheme } = useContext(AppContext);
  const { t, i18n } = useTranslation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const isDark = theme === "dark";

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? "glass py-3 shadow-sm border-b border-border/40" : "bg-transparent py-5"
        }`}
    >
      <div className="container mx-auto flex items-center justify-between px-6">
        {/* Logo */}
        <a href="/#home" className="inline-flex items-center">
          <img
            src={jafLogo}
            alt="JAF Demenagements"
            className="h-16 md:h-20 w-auto object-contain"
            loading="eager"
            width={115}
            height={84}
          />
        </a>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => {
            const isHash = link.href.startsWith("/#");
            const classes = `text-sm font-semibold transition-colors duration-300 relative after:content-[''] after:absolute after:bottom-[-4px] after:left-0 after:w-0 after:h-[2px] after:bg-primary after:transition-all after:duration-300 hover:after:w-full ${scrolled
              ? "text-muted-foreground hover:text-foreground"
              : lightTextOnTop
                ? "text-white/95 hover:text-white drop-shadow-md"
                : "text-foreground/80 hover:text-foreground"
              }`;

            return isHash ? (
              <a key={link.href} href={link.href} className={classes}>
                {t(`navbar.${link.key}`, link.key)}
              </a>
            ) : (
              <Link key={link.href} to={link.href} className={classes}>
                {t(`navbar.${link.key}`, link.key)}
              </Link>
            );
          })}

          <div className="flex items-center gap-3">
            {/* Language selector */}
            <LanguageSelector
              currentLang={i18n.language}
              onChange={(lang) => i18n.changeLanguage(lang)}
            />

            {/* Theme toggle */}
            <ThemeToggle isDark={isDark} onToggle={toggleTheme} />
          </div>

          <Link
            to="/contact"
            className="px-5 py-2.5 rounded-lg bg-primary text-primary-foreground text-sm font-semibold glow-primary hover:scale-105 transition-transform duration-300"
          >
            {t('navbar.getQuote', 'Get a Quote')}
          </Link>
        </div>

        {/* Mobile controls */}
        <div className="md:hidden flex items-center gap-3">
          <LanguageSelector
            currentLang={i18n.language}
            onChange={(lang) => i18n.changeLanguage(lang)}
          />
          <ThemeToggle isDark={isDark} onToggle={toggleTheme} />
          <button
            className={`transition-colors ${scrolled ? "text-foreground" : (lightTextOnTop ? "text-white drop-shadow-md" : "text-foreground")}`}
            onClick={() => setMobileOpen(!mobileOpen)}
            type="button"
            aria-label={mobileOpen ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={mobileOpen}
            aria-controls="mobile-navigation"
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile dropdown */}
      {mobileOpen && (
        <div id="mobile-navigation" className="md:hidden glass mt-2 mx-4 rounded-xl p-6 animate-fade-in">
          {navLinks.map((link) => (
            link.href.startsWith("/#") ? (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="block py-3 text-foreground font-medium border-b border-border/30 last:border-0"
              >
                {t(`navbar.${link.key}`, link.key)}
              </a>
            ) : (
              <Link
                key={link.href}
                to={link.href}
                onClick={() => setMobileOpen(false)}
                className="block py-3 text-foreground font-medium border-b border-border/30 last:border-0"
              >
                {t(`navbar.${link.key}`, link.key)}
              </Link>
            )
          ))}
          <Link
            to="/contact"
            onClick={() => setMobileOpen(false)}
            className="block mt-4 text-center px-5 py-3 rounded-lg bg-primary text-primary-foreground font-semibold"
          >
            {t('navbar.getQuote', 'Get a Quote')}
          </Link>
        </div>
      )}
    </nav>
  );
};

/* ── Flag SVG components ────────────────────────────────── */
const FlagFR = () => (
  <svg width="20" height="14" viewBox="0 0 30 20" style={{ borderRadius: 2, flexShrink: 0, boxShadow: '0 0 0 0.5px rgba(0,0,0,0.1)' }}>
    <rect width="10" height="20" fill="#002395" />
    <rect x="10" width="10" height="20" fill="#fff" />
    <rect x="20" width="10" height="20" fill="#ED2939" />
  </svg>
);

const FlagEN = () => (
  <svg width="20" height="14" viewBox="0 0 60 40" style={{ borderRadius: 2, flexShrink: 0, boxShadow: '0 0 0 0.5px rgba(0,0,0,0.1)' }}>
    <rect width="60" height="40" fill="#012169" />
    <path d="M0,0 L60,40 M60,0 L0,40" stroke="#fff" strokeWidth="6" />
    <path d="M0,0 L60,40 M60,0 L0,40" stroke="#C8102E" strokeWidth="4" />
    <path d="M30,0 V40 M0,20 H60" stroke="#fff" strokeWidth="8" />
    <path d="M30,0 V40 M0,20 H60" stroke="#C8102E" strokeWidth="5" />
  </svg>
);

const LANGUAGES = [
  { code: "en", label: "En", Flag: FlagEN },
  { code: "fr", label: "Fr", Flag: FlagFR },
];

/* ── Language Selector Dropdown ─────────────────────────── */
const LanguageSelector = ({
  currentLang,
  onChange,
}: {
  currentLang: string;
  onChange: (lang: string) => void;
}) => {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const current = LANGUAGES.find((l) => currentLang?.startsWith(l.code)) || LANGUAGES[0];

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <div className="lang-select" ref={ref}>
      <button
        type="button"
        className="lang-select__btn"
        onClick={() => setOpen((v) => !v)}
        aria-label="Select language"
        aria-expanded={open}
        aria-haspopup="listbox"
      >
        <current.Flag />
        <span className="lang-select__label">{current.label}</span>
        <ChevronDown size={14} className={`lang-select__arrow ${open ? "lang-select__arrow--up" : ""}`} />
      </button>

      {open && (
        <ul className="lang-select__list" role="listbox">
          {LANGUAGES.map((lang) => (
            <li
              key={lang.code}
              role="option"
              aria-selected={current.code === lang.code}
              className={`lang-select__item ${current.code === lang.code ? "lang-select__item--active" : ""}`}
              onClick={() => { onChange(lang.code); setOpen(false); }}
            >
              <lang.Flag />
              <span>{lang.label}</span>
            </li>
          ))}
        </ul>
      )}

      <style>{`
        .lang-select {
          position: relative;
          z-index: 100;
          flex-shrink: 0;
        }
        .lang-select__btn {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 6px 10px;
          border-radius: 8px;
          border: 1.5px solid hsl(var(--border) / 0.5);
          background: hsl(var(--card) / 0.75);
          backdrop-filter: blur(10px);
          color: hsl(var(--foreground));
          cursor: pointer;
          font-size: 13px;
          font-weight: 500;
          line-height: 1.2;
          transition: background .2s, border-color .2s, box-shadow .2s;
        }
        .lang-select__btn:hover {
          background: hsl(var(--primary) / 0.1);
          border-color: hsl(var(--primary) / 0.4);
          box-shadow: 0 0 10px hsl(var(--primary) / 0.15);
        }
        .lang-select__label { white-space: nowrap; }
        .lang-select__arrow {
          opacity: 0.5;
          transition: transform .2s ease;
        }
        .lang-select__arrow--up { transform: rotate(180deg); }
        .lang-select__list {
          position: absolute;
          top: calc(100% + 6px);
          right: 0;
          min-width: 155px;
          padding: 4px;
          margin: 0;
          list-style: none;
          border-radius: 10px;
          border: 1px solid hsl(var(--border) / 0.4);
          background: hsl(var(--card));
          box-shadow: 0 10px 40px rgba(0,0,0,0.12), 0 2px 10px rgba(0,0,0,0.06);
          animation: langFadeIn .18s ease-out;
        }
        @keyframes langFadeIn {
          from { opacity: 0; transform: translateY(-4px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .lang-select__item {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 9px 12px;
          border-radius: 7px;
          cursor: pointer;
          font-size: 14px;
          font-weight: 400;
          color: hsl(var(--foreground));
          transition: background .12s;
        }
        .lang-select__item:hover {
          background: hsl(var(--muted));
        }
        .lang-select__item--active {
          font-weight: 600;
          color: hsl(var(--primary));
        }
      `}</style>
    </div>
  );
};

/* ── Animated theme toggle button ───────────────────────── */
const ThemeToggle = ({
  isDark,
  onToggle,
}: {
  isDark: boolean;
  onToggle: () => void;
}) => (
  <button
    onClick={onToggle}
    type="button"
    aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
    className="theme-toggle-btn"
    title={isDark ? "Switch to light mode" : "Switch to dark mode"}
  >
    <span className={`theme-icon ${isDark ? "theme-icon-show" : "theme-icon-hide"}`}>
      <Moon size={16} strokeWidth={2} />
    </span>
    <span className={`theme-icon ${!isDark ? "theme-icon-show" : "theme-icon-hide"}`}>
      <Sun size={16} strokeWidth={2} />
    </span>

    <style>{`
      .theme-toggle-btn {
        position: relative;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        width: 36px;
        height: 36px;
        border-radius: 50%;
        border: 1.5px solid hsl(var(--border) / 0.5);
        background: hsl(var(--card) / 0.7);
        backdrop-filter: blur(10px);
        color: hsl(var(--foreground));
        cursor: pointer;
        overflow: hidden;
        flex-shrink: 0;
        transition:
          background 0.25s ease,
          border-color 0.25s ease,
          color 0.25s ease,
          box-shadow 0.25s ease,
          transform 0.2s ease !important;
      }
      .theme-toggle-btn:hover {
        background: hsl(var(--primary) / 0.15);
        border-color: hsl(var(--primary) / 0.5);
        color: hsl(var(--primary));
        box-shadow: 0 0 14px hsl(var(--primary) / 0.25);
        transform: scale(1.1);
      }
      .theme-toggle-btn:active {
        transform: scale(0.94);
      }
      .theme-icon {
        position: absolute;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: opacity 0.2s ease, transform 0.3s cubic-bezier(.22,1,.36,1) !important;
      }
      .theme-icon-show {
        opacity: 1;
        transform: rotate(0deg) scale(1);
      }
      .theme-icon-hide {
        opacity: 0;
        transform: rotate(90deg) scale(0.6);
        pointer-events: none;
      }
    `}</style>
  </button>
);

export default Navbar;
