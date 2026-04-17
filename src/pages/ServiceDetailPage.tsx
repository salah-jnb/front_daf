import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { ArrowLeft, CheckCircle2, ChevronLeft, ChevronRight, Phone } from "lucide-react";
import { getServiceBySlug, SERVICES } from "@/data/servicesData";
import { Seo } from "@/components/seo/Seo";
import Navbar from "@/components/Navbar";
import FloatingCallButton from "@/components/FloatingCallButton";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

/* ─── Image gallery with crossfade transitions ───────────────────────────── */
function ImageGallery({ images, color }: { images: string[]; color: string }) {
  const [active, setActive] = useState(0);
  const [prev, setPrev] = useState<number | null>(null);
  const [dir, setDir] = useState<"next" | "prev">("next");
  const [animating, setAnimating] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const go = (targetIdx: number, direction: "next" | "prev") => {
    if (animating || targetIdx === active) return;
    setDir(direction);
    setPrev(active);
    setActive(targetIdx);
    setAnimating(true);
    setTimeout(() => { setPrev(null); setAnimating(false); }, 700);
  };

  const next = () => go((active + 1) % images.length, "next");
  const back = () => go((active - 1 + images.length) % images.length, "prev");

  // Auto-advance every 4 s
  useEffect(() => {
    timerRef.current = setTimeout(next, 4000);
    return () => { if (timerRef.current) clearTimeout(timerRef.current); };
  }, [active]); // eslint-disable-line

  return (
    <div className="svc-gallery">
      <style>{`
        .svc-gallery {
          position: relative;
          width: 100%;
          aspect-ratio: 16/9;
          border-radius: 24px;
          overflow: hidden;
          box-shadow: 0 30px 80px rgba(0,0,0,0.45);
        }

        /* each image layer */
        .svc-gallery-img {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: none;
        }
        /* the outgoing image fades out + slight scale */
        .svc-gallery-img.leaving {
          animation: gal-leave 0.7s ease forwards;
        }
        /* the incoming image fades in + scales in from slightly larger */
        .svc-gallery-img.entering {
          animation: gal-enter 0.7s ease forwards;
        }

        @keyframes gal-enter {
          from { opacity: 0; transform: scale(1.05); }
          to   { opacity: 1; transform: scale(1); }
        }
        @keyframes gal-leave {
          from { opacity: 1; transform: scale(1); }
          to   { opacity: 0; transform: scale(0.97); }
        }

        /* dots */
        .svc-gallery-dots {
          position: absolute;
          bottom: 16px;
          left: 50%;
          transform: translateX(-50%);
          display: flex;
          gap: 8px;
          z-index: 20;
        }
        .svc-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: rgba(255,255,255,0.5);
          border: none;
          cursor: pointer;
          transition: all 0.3s ease;
          padding: 0;
        }
        .svc-dot.active {
          width: 24px;
          border-radius: 4px;
          background: #fff;
        }

        /* arrows */
        .svc-gallery-arrow {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          z-index: 20;
          background: rgba(0,0,0,0.42);
          backdrop-filter: blur(6px);
          border: 1px solid rgba(255,255,255,0.18);
          border-radius: 50%;
          width: 44px;
          height: 44px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #fff;
          cursor: pointer;
          transition: background 0.25s ease, transform 0.25s ease;
        }
        .svc-gallery-arrow:hover {
          background: rgba(0,0,0,0.65);
          transform: translateY(-50%) scale(1.08);
        }
        .svc-gallery-arrow.left  { left:  16px; }
        .svc-gallery-arrow.right { right: 16px; }

        /* dark gradient at bottom for dots overlap */
        .svc-gallery::after {
          content: '';
          position: absolute;
          bottom: 0; left: 0; right: 0;
          height: 90px;
          background: linear-gradient(to top, rgba(0,0,0,0.55) 0%, transparent 100%);
          pointer-events: none;
          z-index: 10;
        }
      `}</style>

      {/* Outgoing image */}
      {prev !== null && (
        <img
          key={`prev-${prev}`}
          src={images[prev]}
          alt=""
          className="svc-gallery-img leaving"
          aria-hidden="true"
        />
      )}

      {/* Active / incoming image */}
      <img
        key={`active-${active}`}
        src={images[active]}
        alt={`Service image ${active + 1}`}
        className={`svc-gallery-img ${animating ? "entering" : ""}`}
      />

      {/* Arrows */}
      {images.length > 1 && (
        <>
          <button className="svc-gallery-arrow left" onClick={back} aria-label="Previous image">
            <ChevronLeft size={20} />
          </button>
          <button className="svc-gallery-arrow right" onClick={next} aria-label="Next image">
            <ChevronRight size={20} />
          </button>
        </>
      )}

      {/* Dots */}
      {images.length > 1 && (
        <div className="svc-gallery-dots">
          {images.map((_, i) => (
            <button
              key={i}
              className={`svc-dot ${i === active ? "active" : ""}`}
              onClick={() => go(i, i > active ? "next" : "prev")}
              aria-label={`Image ${i + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}

/* ─── Page component ─────────────────────────────────────────────────────── */
export default function ServiceDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const service = slug ? getServiceBySlug(slug) : undefined;

  // 404 redirect
  useEffect(() => {
    if (slug && !service) navigate("/", { replace: true });
  }, [slug, service, navigate]);

  // Scroll to top on navigation
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [slug]);

  if (!service) return null;

  // Other services (full list for carousel)
  const others = SERVICES.filter((s) => s.slug !== service.slug);

  return (
    <>
      <Seo
        title={service.seo.title}
        description={service.seo.description}
        path={`/services/${service.slug}`}
        image={service.images[0]}
      />

      <Navbar lightTextOnTop={false} />

      <main className="svc-page min-h-screen" style={{ "--svc-color": service.color } as React.CSSProperties}>
        {/* ── Hero banner ─────────────────────────────────────── */}
        <div className="svc-hero" style={{ background: `linear-gradient(135deg, ${service.color}22 0%, transparent 60%)` }}>
          <div className="container mx-auto px-4 sm:px-6 pt-32 pb-20">
            {/* Back link */}
            <Link
              to="/#services"
              className="svc-back"
              onClick={(e) => { e.preventDefault(); navigate(-1); }}
            >
              <ArrowLeft size={16} />
              <span>All Services</span>
            </Link>

            <div className="svc-hero-grid">
              {/* Text side */}
              <div className="svc-hero-text">
                <div className="svc-eyebrow">Service</div>
                <h1 className="svc-title"
                  style={{ "--svc-color": service.color } as React.CSSProperties}>
                  {service.title}
                </h1>
                <p className="svc-subtitle">{service.subtitle}</p>
                <p className="svc-body">{service.longDescription}</p>

                <a
                  href="tel:+21671906446"
                  className="svc-cta-btn"
                  style={{ background: `linear-gradient(135deg, ${service.color} 0%, ${service.color}cc 100%)` }}
                >
                  <Phone size={18} />
                  <span>Get a Free Quote — (+216) 71 906 446</span>
                </a>
              </div>

              {/* Gallery side */}
              <div className="svc-hero-gallery">
                <ImageGallery images={service.images} color={service.color} />
              </div>
            </div>
          </div>
        </div>

        {/* ── Features grid ───────────────────────────────────── */}
        <section className="svc-features-section">
          <div className="container mx-auto px-4 sm:px-6 py-20">
            <div className="svc-section-label">What's included</div>
            <h2 className="svc-section-title">Key Features</h2>

            <div className="svc-features-grid">
              {service.features.map((feat, i) => (
                <div key={i} className="svc-feature-card" style={{ animationDelay: `${i * 70}ms` }}>
                  <CheckCircle2
                    className="svc-feature-icon"
                    size={22}
                    style={{ color: service.color }}
                    strokeWidth={2.2}
                  />
                  <span>{feat}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── CTA strip ─────────────────────────────────────────── */}
        <section
          className="svc-cta-strip"
          style={{ background: `linear-gradient(135deg, ${service.color}18 0%, ${service.color}08 100%)` }}
        >
          <div className="container mx-auto px-4 sm:px-6 py-16 text-center">
            <h2 className="svc-cta-heading">Ready to get started?</h2>
            <p className="svc-cta-sub">Our team is available 6 days a week to answer your questions.</p>
            <a href="tel:+21671906446" className="svc-cta-btn inline-flex" style={{ background: `linear-gradient(135deg, ${service.color} 0%, ${service.color}cc 100%)` }}>
              <Phone size={18} />
              <span>(+216) 71 906 446 — Call us now</span>
            </a>
          </div>
        </section>

        {/* ── Other services ──────────────────────────────────── */}
        {others.length > 0 && (
          <section className="svc-others-section">
            <div className="container mx-auto px-4 sm:px-6 py-20">
              <div className="svc-section-label">Explore more</div>
              <h2 className="svc-section-title">Other Services</h2>

              <Swiper
                modules={[Autoplay, Navigation, Pagination]}
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
                {others.map((s) => (
                  <SwiperSlide key={s.slug}>
                    <Link
                      to={`/services/${s.slug}`}
                      className="svc-other-card"
                    >
                      <img
                        src={s.images[0]}
                        alt={s.title}
                        className="svc-other-img"
                        loading="lazy"
                      />
                      <div className="svc-other-overlay" />
                      <div className="svc-other-content">
                        <span
                          className="svc-other-dot"
                          style={{ background: s.color }}
                        />
                        <span className="svc-other-title">{s.title}</span>
                      </div>
                    </Link>
                  </SwiperSlide>
                ))}
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
        .svc-subtitle {
          font-size: 1.15rem;
          font-weight: 600;
          color: hsl(var(--muted-foreground));
          margin-bottom: 1.25rem;
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

        /* ── Features ── */
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
