import { Globe, PawPrint, Building2, Car, Truck, Palette, Package, Archive } from "lucide-react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useBlocks, slugify } from "@/hooks/useBlocks";

const GRADIENTS = [
  { grad: "from-blue-500 to-cyan-400", glow: "rgba(59,130,246,0.25)" },
  { grad: "from-emerald-500 to-teal-400", glow: "rgba(16,185,129,0.25)" },
  { grad: "from-violet-500 to-purple-400", glow: "rgba(139,92,246,0.25)" },
  { grad: "from-orange-500 to-amber-400", glow: "rgba(249,115,22,0.25)" },
  { grad: "from-sky-500 to-blue-400", glow: "rgba(14,165,233,0.25)" },
  { grad: "from-pink-500 to-rose-400", glow: "rgba(236,72,153,0.25)" },
  { grad: "from-indigo-500 to-blue-400", glow: "rgba(99,102,241,0.25)" },
];

const ICONS = [
  Globe,
  PawPrint,
  Building2,
  Car,
  Truck,
  Palette,
  Package,
];

const ServicesSection = () => {
  const { t } = useTranslation();
  const { blocks, loading } = useBlocks();

  return (
  <section id="services" className="services-section py-24 md:py-36 relative overflow-hidden">
    {/* Ambient background blobs */}
    <div className="services-bg-blob services-blob-1" aria-hidden="true" />
    <div className="services-bg-blob services-blob-2" aria-hidden="true" />

    <div className="container mx-auto px-4 sm:px-6 relative z-10">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto mb-16 md:mb-24">
        <div className="services-eyebrow-wrap">
          <span className="services-eyebrow">{t('services.eyebrow2')}</span>
        </div>
        <h2 className="text-3xl md:text-5xl font-extrabold mb-5 leading-tight tracking-tight">
          {t('services.complete')}{" "}
          <span className="gradient-text">{t('services.relocation')}</span>
        </h2>
        <p className="text-muted-foreground text-base sm:text-lg leading-relaxed">
          {t('services.desc2')}
        </p>
      </div>

      {/* Cards flex container */}
      <div className="flex flex-wrap justify-center gap-5 sm:gap-6">
        {loading ? (
          <div className="w-full text-center py-10 text-muted-foreground">Loading services...</div>
        ) : (
          blocks.map((block, i) => {
            const slug = slugify(block.titre);
            const style = GRADIENTS[i % GRADIENTS.length];
            const IconComponent = ICONS[i % ICONS.length];
            return (
              <Link
                key={block.id || i}
                to={`/services/${slug}`}
                className="service-card w-full sm:w-[calc(50%-0.75rem)] lg:w-[calc(33.333%-1rem)] xl:w-[calc(25%-1.125rem)] flex-shrink-0"
                style={{
                  animationDelay: `${i * 80}ms`,
                  "--card-glow": style.glow,
                } as React.CSSProperties}
              >
                {/* Animated border gradient */}
                <div className="service-card-border" aria-hidden="true" />

                {/* Inner content */}
                <div className="service-card-inner">
                  {/* Icon */}
                  <div className={`service-icon-wrap bg-gradient-to-br ${style.grad} overflow-hidden flex items-center justify-center`}>
                    <IconComponent className="w-6 h-6 text-white" strokeWidth={1.8} />
                  </div>

                  {/* Number badge */}
                  <span className="service-number">
                    {String(i + 1).padStart(2, "0")}
                  </span>

                  <h3 className="text-lg font-bold mt-4 mb-2 leading-snug">
                    {t('servicesData.' + slug + '.title', block.titre)}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed flex-1 line-clamp-3">
                    {t('servicesData.' + slug + '.description', block.description)}
                  </p>

                  {/* Bottom accent line */}
                  <div className={`service-card-line bg-gradient-to-r ${style.grad}`} />
                </div>
              </Link>
            );
          })
        )}
      </div>
    </div>

    <style>{`
      /* ── Section background ─────────────────────────── */
      .services-section {
        background: hsl(var(--background));
      }

      .services-bg-blob {
        position: absolute;
        border-radius: 50%;
        filter: blur(120px);
        pointer-events: none;
        opacity: 0.35;
      }
      .services-blob-1 {
        width: 600px; height: 600px;
        top: -160px; left: -180px;
        background: radial-gradient(circle, hsl(210 100% 55% / 0.18) 0%, transparent 70%);
      }
      .services-blob-2 {
        width: 500px; height: 500px;
        bottom: -100px; right: -140px;
        background: radial-gradient(circle, hsl(200 100% 60% / 0.14) 0%, transparent 70%);
      }

      /* ── Eyebrow pill ───────────────────────────────── */
      .services-eyebrow-wrap {
        display: inline-flex;
        margin-bottom: 1.25rem;
      }
      .services-eyebrow {
        display: inline-flex;
        align-items: center;
        gap: 0.5rem;
        padding: 0.35rem 1.1rem;
        border-radius: 999px;
        font-size: 0.7rem;
        font-weight: 700;
        letter-spacing: 0.22em;
        text-transform: uppercase;
        background: hsl(var(--primary) / 0.12);
        border: 1px solid hsl(var(--primary) / 0.25);
        color: hsl(var(--primary));
      }

      /* ── Card wrapper ───────────────────────────────── */
      .service-card {
        display: block;
        text-decoration: none;
        position: relative;
        border-radius: 20px;
        animation: svc-fade-up 0.55s ease both;
        transition: transform 0.35s cubic-bezier(.22,1,.36,1);
      }
      .service-card:hover {
        transform: translateY(-6px);
      }
      /* Glow on hover */
      .service-card:hover::after {
        content: '';
        position: absolute;
        inset: 0;
        border-radius: 20px;
        box-shadow: 0 0 40px 0 var(--card-glow, rgba(59,130,246,0.25));
        pointer-events: none;
        z-index: 0;
      }

      /* ── Animated gradient border ───────────────────── */
      .service-card-border {
        position: absolute;
        inset: 0;
        border-radius: 20px;
        padding: 1.5px;
        background: linear-gradient(135deg,
          hsl(var(--border) / 0.9) 0%,
          hsl(var(--primary) / 0.35) 50%,
          hsl(var(--border) / 0.9) 100%);
        -webkit-mask:
          linear-gradient(#fff 0 0) content-box,
          linear-gradient(#fff 0 0);
        -webkit-mask-composite: xor;
        mask-composite: exclude;
        background-size: 200% 200%;
        animation: border-rotate 4s linear infinite;
        opacity: 0;
        transition: opacity 0.3s ease;
        pointer-events: none;
        z-index: 1;
      }
      .service-card:hover .service-card-border {
        opacity: 1;
      }

      /* ── Card inner ─────────────────────────────────── */
      .service-card-inner {
        position: relative;
        z-index: 2;
        display: flex;
        flex-direction: column;
        height: 100%;
        padding: 1.75rem;
        border-radius: 20px;
        background: hsl(var(--card) / 0.7);
        backdrop-filter: blur(18px);
        -webkit-backdrop-filter: blur(18px);
        border: 1px solid hsl(var(--border) / 0.5);
        transition: border-color 0.35s ease, background 0.35s ease;
        overflow: hidden;
        min-height: 220px;
      }
      .service-card:hover .service-card-inner {
        border-color: hsl(var(--primary) / 0.25);
        background: hsl(var(--card) / 0.85);
      }

      /* ── Icon ───────────────────────────────────────── */
      .service-icon-wrap {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 48px;
        height: 48px;
        border-radius: 14px;
        box-shadow: 0 6px 20px -4px rgba(0,0,0,0.35);
        transition: transform 0.35s cubic-bezier(.22,1,.36,1), box-shadow 0.35s ease;
      }
      .service-card:hover .service-icon-wrap {
        transform: scale(1.12) rotate(-4deg);
        box-shadow: 0 10px 30px -6px rgba(0,0,0,0.45);
      }

      /* ── Number badge ───────────────────────────────── */
      .service-number {
        position: absolute;
        top: 1.25rem;
        right: 1.25rem;
        font-size: 0.7rem;
        font-weight: 800;
        letter-spacing: 0.05em;
        color: hsl(var(--muted-foreground) / 0.4);
        font-variant-numeric: tabular-nums;
        transition: color 0.3s ease;
      }
      .service-card:hover .service-number {
        color: hsl(var(--primary) / 0.6);
      }

      /* ── Bottom accent line ─────────────────────────── */
      .service-card-line {
        height: 2px;
        border-radius: 999px;
        margin-top: 1.25rem;
        transform: scaleX(0);
        transform-origin: left;
        transition: transform 0.4s cubic-bezier(.22,1,.36,1);
      }
      .service-card:hover .service-card-line {
        transform: scaleX(1);
      }

      /* ── Animations ─────────────────────────────────── */
      @keyframes svc-fade-up {
        from { opacity: 0; transform: translateY(28px); }
        to   { opacity: 1; transform: translateY(0); }
      }
      @keyframes border-rotate {
        0%   { background-position: 0% 50%; }
        50%  { background-position: 100% 50%; }
        100% { background-position: 0% 50%; }
      }
    `}</style>
  </section>
  );
};

export default ServicesSection;
