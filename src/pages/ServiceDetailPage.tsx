import { useEffect } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { ArrowLeft, Phone, CheckCircle2 } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Seo } from "@/components/seo/Seo";
import Navbar from "@/components/Navbar";
import FloatingCallButton from "@/components/FloatingCallButton";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import { useBlockBySlug, slugify, getColorForIndex } from "@/hooks/useBlocks";

/* ── Gradient palette (cycled per card index) ── */
const GRADIENTS = [
  "from-blue-500 to-cyan-400",
  "from-emerald-500 to-teal-400",
  "from-violet-500 to-purple-400",
  "from-orange-500 to-amber-400",
  "from-sky-500 to-blue-400",
  "from-pink-500 to-rose-400",
  "from-indigo-500 to-blue-400",
];

/* ─── Loading skeleton ─────────────────────────────────────────── */
function PageSkeleton() {
  return (
    <main className="svc-page min-h-screen">
      <Navbar lightTextOnTop={false} />
      <div className="container mx-auto px-4 sm:px-6 pt-32 pb-20">
        <div className="svc-hero-grid">
          <div className="svc-hero-text">
            <div className="svc-skel-pill" />
            <div className="svc-skel-title" />
            <div className="svc-skel-line w-3/4" />
            <div className="svc-skel-line w-full" />
            <div className="svc-skel-line w-5/6" />
            <div className="svc-skel-btn" />
          </div>
          <div className="svc-skel-img" />
        </div>
      </div>

      <style>{`
        .svc-skel-pill { width: 100px; height: 28px; border-radius: 999px; background: hsl(var(--muted)); animation: skel-shimmer 1.8s ease-in-out infinite; margin-bottom: 1rem; }
        .svc-skel-title { width: 70%; height: 48px; border-radius: 12px; background: hsl(var(--muted)); animation: skel-shimmer 1.8s ease-in-out infinite; animation-delay: 0.1s; margin-bottom: 1.5rem; }
        .svc-skel-line { height: 16px; border-radius: 999px; background: hsl(var(--muted)); animation: skel-shimmer 1.8s ease-in-out infinite; margin-bottom: 0.75rem; }
        .svc-skel-btn { width: 200px; height: 52px; border-radius: 50px; background: hsl(var(--muted)); animation: skel-shimmer 1.8s ease-in-out infinite; animation-delay: 0.3s; margin-top: 1rem; }
        .svc-skel-img { aspect-ratio: 16/9; border-radius: 24px; background: hsl(var(--muted)); animation: skel-shimmer 1.8s ease-in-out infinite; animation-delay: 0.2s; }
        @keyframes skel-shimmer { 0% { opacity: 0.4; } 50% { opacity: 0.75; } 100% { opacity: 0.4; } }
      `}</style>
    </main>
  );
}

/* ─── Page component ─────────────────────────────────────────── */
export default function ServiceDetailPage() {
  const { t } = useTranslation();
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const { block, others, index, loading } = useBlockBySlug(slug);

  const color = getColorForIndex(index);
  const grad = GRADIENTS[index % GRADIENTS.length];

  // 404 redirect (only after loading finishes)
  useEffect(() => {
    if (!loading && slug && !block) navigate("/", { replace: true });
  }, [slug, block, loading, navigate]);

  // Scroll to top on navigation
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [slug]);

  if (loading) return <PageSkeleton />;
  if (!block) return null;

  return (
    <>
      <Seo
        title={`${block.titre} | JAF Logistics`}
        description={block.description}
        path={`/services/${slugify(block.titre)}`}
        image={block.imageUrl}
      />

      <Navbar lightTextOnTop={false} />

      <main className="svc-page min-h-screen" style={{ "--svc-color": color } as React.CSSProperties}>
        {/* ── Hero banner ─────────────────────────────────────── */}
        <div className="svc-hero" style={{ background: `linear-gradient(135deg, ${color}22 0%, transparent 60%)` }}>
          <div className="container mx-auto px-4 sm:px-6 pt-32 pb-20">
            {/* Back link */}
            <Link
              to="/#services"
              className="svc-back"
              onClick={(e) => { e.preventDefault(); navigate(-1); }}
            >
              <ArrowLeft size={16} />
              <span>{t('svcDetails.back')}</span>
            </Link>

            <div className="svc-hero-grid">
              {/* Text side */}
              <div className="svc-hero-text">
                <div className="svc-eyebrow">{t('svcDetails.service')}</div>
                <h1 className="svc-title" style={{ "--svc-color": color } as React.CSSProperties}>
                  {block.titre}
                </h1>
                <p className="svc-body">{block.description}</p>

                <a
                  href="tel:+21671906446"
                  className="svc-cta-btn"
                  style={{ background: `linear-gradient(135deg, ${color} 0%, ${color}cc 100%)` }}
                >
                  <Phone size={18} />
                  <span>{t('svcDetails.quote')}</span>
                </a>
              </div>

              {/* Image side */}
              <div className="svc-hero-gallery">
                {block.imageUrl ? (
                  <div className="svc-single-img-wrap">
                    <img
                      src={block.imageUrl}
                      alt={block.titre}
                      className="svc-single-img"
                    />
                  </div>
                ) : (
                  <div className="svc-img-placeholder">
                    <span>📦</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* ── Mots-clés / Caractéristiques Clés ──────────────── */}
        {block.motcle && block.motcle.length > 0 && (
          <section className="svc-features-section">
            <div className="container mx-auto px-4 sm:px-6 py-20">
              <div className="svc-section-label">{t('svcDetails.included', 'Au programme')}</div>
              <h2 className="svc-section-title">{t('svcDetails.features', 'Caractéristiques Clés')}</h2>

              <div className="svc-features-grid">
                {block.motcle.map((kw, i) => (
                  <div
                    key={i}
                    className="svc-feature-card"
                    style={{ animationDelay: `${i * 70}ms` }}
                  >
                    <CheckCircle2
                      className="svc-feature-icon"
                      size={22}
                      style={{ color }}
                      strokeWidth={2.2}
                    />
                    <span>{kw}</span>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* ── CTA strip ─────────────────────────────────────────── */}
        <section
          className="svc-cta-strip"
          style={{ background: `linear-gradient(135deg, ${color}18 0%, ${color}08 100%)` }}
        >
          <div className="container mx-auto px-4 sm:px-6 py-16 text-center">
            <h2 className="svc-cta-heading">{t('svcDetails.ctaHeading')}</h2>
            <p className="svc-cta-sub">{t('svcDetails.ctaSub')}</p>
            <a href="tel:+21671906446" className="svc-cta-btn inline-flex" style={{ background: `linear-gradient(135deg, ${color} 0%, ${color}cc 100%)` }}>
              <Phone size={18} />
              <span>{t('svcDetails.ctaBtn')}</span>
            </a>
          </div>
        </section>

        {/* ── Other services carousel ──────────────────────────── */}
        {others.length > 0 && (
          <section className="svc-others-section">
            <div className="container mx-auto px-4 sm:px-6 py-20">
              <div className="svc-section-label">{t('svcDetails.more')}</div>
              <h2 className="svc-section-title">{t('svcDetails.otherSvc')}</h2>

              <Swiper
                modules={[Autoplay, Pagination]}
                autoplay={{ delay: 3500, disableOnInteraction: false, pauseOnMouseEnter: true }}
                pagination={{ clickable: true, el: '.svc-swiper-pagination' }}
                spaceBetween={24}
                breakpoints={{
                  0: { slidesPerView: 1 },
                  640: { slidesPerView: 2 },
                  1024: { slidesPerView: 3 },
                }}
                className="svc-others-swiper pb-10"
              >
                {others.map((s, i) => {
                  const otherSlug = slugify(s.titre);
                  const otherColor = getColorForIndex(i);
                  return (
                    <SwiperSlide key={s.id || i}>
                      <Link
                        to={`/services/${otherSlug}`}
                        className="svc-other-card"
                      >
                        {s.imageUrl ? (
                          <img
                            src={s.imageUrl}
                            alt={s.titre}
                            className="svc-other-img"
                            loading="lazy"
                          />
                        ) : (
                          <div className="svc-other-img-fallback" />
                        )}
                        <div className="svc-other-overlay" />
                        <div className="svc-other-content">
                          <span
                            className="svc-other-dot"
                            style={{ background: otherColor }}
                          />
                          <span className="svc-other-title">{s.titre}</span>
                        </div>
                      </Link>
                    </SwiperSlide>
                  );
                })}
              </Swiper>
              <div className="svc-swiper-pagination text-center mt-6" />
            </div>
          </section>
        )}

        <FloatingCallButton />
      </main>

      <style>{`
        /* ── Page base ── */
        .svc-page {
          background: hsl(var(--background));
        }

        /* ── Hero ── */
        .svc-hero {
          border-bottom: 1px solid hsl(var(--border) / 0.5);
        }
        .svc-back {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          font-size: 0.82rem;
          font-weight: 600;
          color: hsl(var(--muted-foreground));
          text-decoration: none;
          margin-bottom: 2rem;
          padding: 6px 14px 6px 10px;
          border: 1px solid hsl(var(--border));
          border-radius: 999px;
          background: hsl(var(--card) / 0.6);
          backdrop-filter: blur(8px);
          transition: all 0.25s ease;
          cursor: pointer;
        }
        .svc-back:hover {
          color: hsl(var(--foreground));
          background: hsl(var(--card));
          border-color: hsl(var(--primary) / 0.4);
          transform: translateX(-3px);
        }
        .svc-hero-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 3rem;
          align-items: center;
        }
        @media (min-width: 1024px) {
          .svc-hero-grid {
            grid-template-columns: 1fr 1fr;
            gap: 4rem;
          }
        }
        .svc-eyebrow {
          display: inline-block;
          font-size: 0.68rem;
          font-weight: 800;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          padding: 0.3rem 0.9rem;
          border-radius: 999px;
          background: hsl(var(--primary) / 0.12);
          border: 1px solid hsl(var(--primary) / 0.25);
          color: hsl(var(--primary));
          margin-bottom: 1rem;
        }
        .svc-title {
          font-size: clamp(2.4rem, 5vw, 4rem);
          font-weight: 900;
          line-height: 1.05;
          letter-spacing: -0.02em;
          margin-bottom: 0.75rem;
          background: linear-gradient(135deg, var(--svc-color) 0%, hsl(var(--foreground)) 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        .svc-body {
          font-size: 1rem;
          line-height: 1.75;
          color: hsl(var(--muted-foreground));
          margin-bottom: 2rem;
          max-width: 60ch;
        }
        .svc-cta-btn {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          padding: 14px 28px;
          border-radius: 50px;
          color: #fff;
          font-size: 0.95rem;
          font-weight: 700;
          text-decoration: none;
          border: none;
          cursor: pointer;
          box-shadow: 0 8px 30px rgba(0,0,0,0.25);
          transition: transform 0.25s ease, box-shadow 0.25s ease;
        }
        .svc-cta-btn:hover {
          transform: translateY(-3px);
          box-shadow: 0 14px 40px rgba(0,0,0,0.35);
        }

        /* ── Single image display ── */
        .svc-single-img-wrap {
          position: relative;
          width: 100%;
          aspect-ratio: 16/9;
          border-radius: 24px;
          overflow: hidden;
          box-shadow: 0 30px 80px rgba(0,0,0,0.45);
        }
        .svc-single-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.6s ease;
        }
        .svc-single-img-wrap:hover .svc-single-img {
          transform: scale(1.04);
        }
        .svc-img-placeholder {
          width: 100%;
          aspect-ratio: 16/9;
          border-radius: 24px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 4rem;
          background: hsl(var(--muted));
          border: 1px dashed hsl(var(--border));
        }

        /* ── Features / Caractéristiques Clés ── */
        .svc-features-section {
          border-bottom: 1px solid hsl(var(--border) / 0.4);
        }
        .svc-section-label {
          font-size: 0.68rem;
          font-weight: 800;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          color: hsl(var(--primary));
          margin-bottom: 0.5rem;
        }
        .svc-section-title {
          font-size: clamp(1.6rem, 3vw, 2.4rem);
          font-weight: 800;
          letter-spacing: -0.02em;
          margin-bottom: 3rem;
          color: hsl(var(--foreground));
        }
        .svc-features-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 1rem;
        }
        @media (min-width: 640px)  { .svc-features-grid { grid-template-columns: repeat(2, 1fr); } }
        @media (min-width: 1024px) { .svc-features-grid { grid-template-columns: repeat(3, 1fr); } }

        .svc-feature-card {
          display: flex;
          align-items: flex-start;
          gap: 12px;
          padding: 1.25rem 1.4rem;
          border-radius: 16px;
          background: hsl(var(--card) / 0.65);
          border: 1px solid hsl(var(--border) / 0.5);
          backdrop-filter: blur(12px);
          font-size: 0.93rem;
          font-weight: 600;
          color: hsl(var(--foreground));
          animation: svc-fade-up 0.5s ease both;
          transition: transform 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease;
        }
        .svc-feature-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 12px 30px rgba(0,0,0,0.1);
          border-color: hsl(var(--primary) / 0.3);
        }
        .svc-feature-icon {
          flex-shrink: 0;
          margin-top: 2px;
        }

        /* ── CTA strip ── */
        .svc-cta-strip {
          border-top: 1px solid hsl(var(--border) / 0.4);
        }
        .svc-cta-heading {
          font-size: clamp(1.8rem, 3vw, 2.6rem);
          font-weight: 900;
          letter-spacing: -0.02em;
          margin-bottom: 0.6rem;
          color: hsl(var(--foreground));
        }
        .svc-cta-sub {
          font-size: 1rem;
          color: hsl(var(--muted-foreground));
          margin-bottom: 2rem;
        }

        /* ── Other services row ── */
        .svc-others-section {
          border-top: 1px solid hsl(var(--border) / 0.4);
          overflow: hidden;
        }
        .svc-swiper-pagination .swiper-pagination-bullet {
          width: 8px;
          height: 8px;
          background: hsl(var(--foreground));
          opacity: 0.2;
          transition: all 0.3s ease;
        }
        .svc-swiper-pagination .swiper-pagination-bullet-active {
          opacity: 1;
          background: hsl(var(--primary));
          width: 24px;
          border-radius: 4px;
        }
        
        .svc-other-card {
          position: relative;
          border-radius: 20px;
          overflow: hidden;
          height: 200px;
          display: flex;
          text-decoration: none;
          cursor: pointer;
          box-shadow: 0 4px 20px rgba(0,0,0,0.15);
          transition: transform 0.35s cubic-bezier(.22,1,.36,1), box-shadow 0.35s ease;
        }
        .svc-other-card:hover {
          transform: translateY(-6px);
          box-shadow: 0 16px 40px rgba(0,0,0,0.28);
        }
        .svc-other-img {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.6s ease;
        }
        .svc-other-card:hover .svc-other-img {
          transform: scale(1.07);
        }
        .svc-other-img-fallback {
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, hsl(var(--card)) 0%, hsl(var(--muted)) 100%);
        }
        .svc-other-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(to top, rgba(0,0,0,0.82) 0%, rgba(0,0,0,0.1) 100%);
        }
        .svc-other-content {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          padding: 1.25rem 1.5rem;
          display: flex;
          align-items: center;
          gap: 10px;
          z-index: 10;
        }
        .svc-other-dot {
          width: 10px;
          height: 10px;
          border-radius: 50%;
          flex-shrink: 0;
        }
        .svc-other-title {
          font-size: 1rem;
          font-weight: 700;
          color: #fff;
        }

        /* ── Animation ── */
        @keyframes svc-fade-up {
          from { opacity: 0; transform: translateY(20px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </>
  );
}
