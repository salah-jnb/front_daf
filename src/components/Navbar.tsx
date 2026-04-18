import { useState, useEffect, useContext } from "react";
import { Menu, X, Sun, Moon } from "lucide-react";
import { Link } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import jafLogo from "@/assets/logo_jaf-small.webp";

const navLinks = [
  { label: "Home", href: "/#home" },
  { label: "Services", href: "/#services" },
  { label: "About", href: "/#about" },
  { label: "How We Work", href: "/how-we-work" },
  { label: "Contact", href: "/contact" },
];

interface NavbarProps {
  lightTextOnTop?: boolean;
}

const Navbar = ({ lightTextOnTop = true }: NavbarProps) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { theme, toggleTheme } = useContext(AppContext);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const isDark = theme === "dark";

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? "glass py-3 shadow-sm border-b border-border/40" : "bg-transparent py-5"
      }`}
    >
      <div className="container mx-auto flex items-center justify-between px-6">
        {/* Logo */}
        <a href="#home" className="inline-flex items-center">
          <img
            src={jafLogo}
            alt="JAF Demenagements"
            className="h-12 md:h-14 w-auto object-contain"
            loading="eager"
            width={115}
            height={84}
          />
        </a>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            link.href.startsWith("/#") ? (
              <a
                key={link.href}
                href={link.href}
                className={`text-sm font-semibold transition-colors duration-300 relative after:content-[''] after:absolute after:bottom-[-4px] after:left-0 after:w-0 after:h-[2px] after:bg-primary after:transition-all after:duration-300 hover:after:w-full ${
                  scrolled 
                    ? "text-muted-foreground hover:text-foreground" 
                    : lightTextOnTop 
                      ? "text-white/95 hover:text-white drop-shadow-md" 
                      : "text-foreground/80 hover:text-foreground"
                }`}
              >
                {link.label}
              </a>
            ) : (
              <Link
                key={link.href}
                to={link.href}
                className={`text-sm font-semibold transition-colors duration-300 relative after:content-[''] after:absolute after:bottom-[-4px] after:left-0 after:w-0 after:h-[2px] after:bg-primary after:transition-all after:duration-300 hover:after:w-full ${
                  scrolled 
                    ? "text-muted-foreground hover:text-foreground" 
                    : lightTextOnTop 
                      ? "text-white/95 hover:text-white drop-shadow-md" 
                      : "text-foreground/80 hover:text-foreground"
                }`}
              >
                {link.label}
              </Link>
            )
          ))}

          {/* Theme toggle */}
          <ThemeToggle isDark={isDark} onToggle={toggleTheme} />

          <Link
            to="/contact"
            className="px-5 py-2.5 rounded-lg bg-primary text-primary-foreground text-sm font-semibold glow-primary hover:scale-105 transition-transform duration-300"
          >
            Get a Quote
          </Link>
        </div>

        {/* Mobile controls */}
        <div className="md:hidden flex items-center gap-3">
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
                {link.label}
              </a>
            ) : (
              <Link
                key={link.href}
                to={link.href}
                onClick={() => setMobileOpen(false)}
                className="block py-3 text-foreground font-medium border-b border-border/30 last:border-0"
              >
                {link.label}
              </Link>
            )
          ))}
          <Link
            to="/contact"
            onClick={() => setMobileOpen(false)}
            className="block mt-4 text-center px-5 py-3 rounded-lg bg-primary text-primary-foreground font-semibold"
          >
            Get a Quote
          </Link>
        </div>
      )}
    </nav>
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
        border: 1.5px solid hsl(var(--border));
        background: hsl(var(--card) / 0.7);
        backdrop-filter: blur(10px);
        color: hsl(var(--muted-foreground));
        cursor: pointer;
        overflow: hidden;
        flex-shrink: 0;
        /* override global transition for fast icon swap */
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
      /* Icon layers */
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
