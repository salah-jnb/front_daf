import { useContext, useEffect, useMemo, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import { AppContext } from "../context/AppContext";
import { ChevronLeft, ChevronRight, ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";

type ServiceItem = {
  title: string;
  description: string;
  image: string;
  slug?: string;
};

type Block = {
  id?: string | number;
  titre?: string;
  title?: string;
  description?: string;
  image?: string;
};

function normalizeImageUrl(image: string, baseUrl: string) {
  const img = image?.trim();
  if (!img) return "";
  if (img.startsWith("http://") || img.startsWith("https://")) return img;
  const root = baseUrl.replace(/\/$/, "");
  if (img.startsWith("/")) return `${root}${img}`;
  return `${root}/${img}`;
}

/* ─── Shimmer skeleton placeholder ─────────────────────────── */
const SkeletonCard = () => (
  <div className="sbs-skeleton">
    <div className="sbs-skeleton-img" />
    <div className="sbs-skeleton-body">
      <div className="sbs-skeleton-line sbs-line-title" />
      <div className="sbs-skeleton-line sbs-line-sub" />
      <div className="sbs-skeleton-line sbs-line-sub2" />
    </div>
  </div>
);

/* ─── Single service slide card ────────────────────────────── */
const ServiceSlideCard = ({ title, description, image, slug }: ServiceItem) => {
  const [imgError, setImgError] = useState(false);

  return (
    <Link to={`/services/${slug}`} className="sbs-card" style={{ textDecoration: 'none' }}>
      {/* Image layer */}
      <div className="sbs-card-media">
        {!imgError ? (
          <img
            className="sbs-card-img"
            src={image}
            alt={title}
            loading="lazy"
            decoding="async"
            onError={() => setImgError(true)}
          />
        ) : (
          <div className="sbs-card-img-fallback" aria-hidden="true" />
        )}
      </div>

      {/* Gradient overlay */}
      <div className="sbs-card-overlay" aria-hidden="true" />

      {/* Content */}
      <div className="sbs-card-content">
        <div className="sbs-card-tag">Service</div>
        <h3 className="sbs-card-title">{title}</h3>
        <p className="sbs-card-desc">{description}</p>
        <div className="sbs-card-cta">
          <span>Learn more</span>
          <ArrowUpRight className="sbs-cta-icon" size={15} strokeWidth={2.2} />
        </div>
      </div>

      {/* Corner accent */}
      <div className="sbs-card-corner" aria-hidden="true" />
    </Link>
  );
};

/* ─── Main section ──────────────────────────────────────────── */
const ServicesBentoSection = () => (
  <section id="services-bento" className="sbs-section py-24 md:py-36 relative overflow-hidden">
    {/* Ambient blobs */}
    <div className="sbs-blob sbs-blob-a" aria-hidden="true" />
    <div className="sbs-blob sbs-blob-b" aria-hidden="true" />

    <div className="container mx-auto px-4 sm:px-6 relative z-10">
      {/* Section header */}
      <div className="sbs-header">
        <div className="sbs-eyebrow-wrap">
          <span className="sbs-eyebrow">Featured Services</span>
        </div>
        <h2 className="text-4xl md:text-5xl font-extrabold mb-5 tracking-tight leading-tight">
          Discover Our{" "}
          <span className="gradient-text">Moving Expertise</span>
        </h2>
        <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
          Explore our key services: household moving, office relocation, car
          shipping, secure storage, fine art logistics, and pet relocation.
        </p>
      </div>

      <ServicesBentoSwiper />
    </div>

    <style>{`
      /* ── Section ── */
      .sbs-section { background: hsl(var(--background)); }

      /* ── Ambient blobs ── */
      .sbs-blob {
        position: absolute;
        border-radius: 50%;
        filter: blur(130px);
        pointer-events: none;
        opacity: 0.3;
      }
      .sbs-blob-a {
        width: 700px; height: 700px;
        top: -200px; right: -200px;
        background: radial-gradient(circle, hsl(210 100% 55% / 0.2) 0%, transparent 70%);
      }
      .sbs-blob-b {
        width: 500px; height: 500px;
        bottom: -150px; left: -160px;
        background: radial-gradient(circle, hsl(200 100% 60% / 0.15) 0%, transparent 70%);
      }

      /* ── Header ── */
      .sbs-header {
        text-align: center;
        max-width: 680px;
        margin: 0 auto 4rem;
      }

      /* ── Eyebrow pill ── */
      .sbs-eyebrow-wrap {
        display: inline-flex;
        margin-bottom: 1.25rem;
      }
      .sbs-eyebrow {
        display: inline-flex;
        align-items: center;
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

      /* ── Card ── */
      .sbs-card {
        position: relative;
        border-radius: 24px;
        overflow: hidden;
        min-height: 460px;
        display: flex;
        flex-direction: column;
        justify-content: flex-end;
        cursor: pointer;
        background: hsl(var(--card));
        border: 1px solid hsl(var(--border) / 0.6);
        transition:
          transform 0.42s cubic-bezier(.22,1,.36,1),
          box-shadow 0.42s ease,
          border-color 0.3s ease;
      }
      .sbs-card:hover {
        transform: translateY(-8px) scale(1.012);
        box-shadow:
          0 30px 60px -12px rgba(0,0,0,0.55),
          0 0 0 1px hsl(var(--primary) / 0.2);
        border-color: hsl(var(--primary) / 0.3);
      }

      /* ── Media ── */
      .sbs-card-media {
        position: absolute;
        inset: 0;
        overflow: hidden;
      }
      .sbs-card-img {
        width: 100%; height: 100%;
        object-fit: cover;
        transition: transform 0.65s cubic-bezier(.22,1,.36,1);
      }
      .sbs-card:hover .sbs-card-img {
        transform: scale(1.08);
      }
      .sbs-card-img-fallback {
        width: 100%; height: 100%;
        background: linear-gradient(135deg,
          hsl(var(--card)) 0%,
          hsl(var(--secondary)) 100%);
      }

      /* ── Overlay ── */
      .sbs-card-overlay {
        position: absolute;
        inset: 0;
        background: linear-gradient(
          to top,
          rgba(0,0,0,0.92) 0%,
          rgba(0,0,0,0.65) 40%,
          rgba(0,0,0,0.15) 70%,
          transparent 100%
        );
        transition: background 0.4s ease;
      }
      .sbs-card:hover .sbs-card-overlay {
        background: linear-gradient(
          to top,
          rgba(0,0,0,0.96) 0%,
          rgba(0,0,0,0.72) 45%,
          rgba(0,0,0,0.20) 75%,
          transparent 100%
        );
      }

      /* ── Content ── */
      .sbs-card-content {
        position: relative;
        z-index: 10;
        padding: 1.75rem;
        display: flex;
        flex-direction: column;
        gap: 0.5rem;
        transform: translateY(8px);
        transition: transform 0.42s cubic-bezier(.22,1,.36,1);
      }
      .sbs-card:hover .sbs-card-content {
        transform: translateY(0);
      }

      /* ── Tag ── */
      .sbs-card-tag {
        display: inline-flex;
        width: fit-content;
        padding: 0.2rem 0.75rem;
        border-radius: 999px;
        font-size: 0.65rem;
        font-weight: 700;
        letter-spacing: 0.18em;
        text-transform: uppercase;
        background: hsl(var(--primary) / 0.18);
        border: 1px solid hsl(var(--primary) / 0.3);
        color: hsl(var(--primary));
        opacity: 0;
        transform: translateY(6px);
        transition: opacity 0.35s ease 0.05s, transform 0.35s ease 0.05s;
      }
      .sbs-card:hover .sbs-card-tag {
        opacity: 1;
        transform: translateY(0);
      }

      /* ── Title ── */
      .sbs-card-title {
        font-size: clamp(1.3rem, 2.5vw, 1.75rem);
        font-weight: 800;
        line-height: 1.2;
        color: #ffffff;
        letter-spacing: -0.01em;
      }

      /* ── Description ── */
      .sbs-card-desc {
        font-size: 0.875rem;
        color: rgba(255,255,255,0.75);
        line-height: 1.65;
        max-width: 52ch;
        display: -webkit-box;
        -webkit-line-clamp: 3;
        -webkit-box-orient: vertical;
        overflow: hidden;
        opacity: 0;
        transform: translateY(8px);
        transition: opacity 0.35s ease 0.08s, transform 0.35s ease 0.08s;
      }
      .sbs-card:hover .sbs-card-desc {
        opacity: 1;
        transform: translateY(0);
      }

      /* ── CTA ── */
      .sbs-card-cta {
        display: inline-flex;
        align-items: center;
        gap: 0.35rem;
        font-size: 0.8rem;
        font-weight: 700;
        color: hsl(var(--primary));
        letter-spacing: 0.04em;
        opacity: 0;
        transform: translateY(8px);
        transition: opacity 0.35s ease 0.12s, transform 0.35s ease 0.12s;
        margin-top: 0.25rem;
      }
      .sbs-card:hover .sbs-card-cta {
        opacity: 1;
        transform: translateY(0);
      }
      .sbs-cta-icon {
        transition: transform 0.25s ease;
      }
      .sbs-card:hover .sbs-cta-icon {
        transform: translate(2px, -2px);
      }

      /* ── Corner accent ── */
      .sbs-card-corner {
        position: absolute;
        top: 1.25rem;
        right: 1.25rem;
        width: 10px;
        height: 10px;
        border-radius: 50%;
        background: hsl(var(--primary));
        box-shadow: 0 0 14px 4px hsl(var(--primary) / 0.5);
        opacity: 0;
        transform: scale(0);
        transition: opacity 0.3s ease, transform 0.35s cubic-bezier(.22,1,.36,1);
        z-index: 10;
      }
      .sbs-card:hover .sbs-card-corner {
        opacity: 1;
        transform: scale(1);
      }

      /* ── Swiper overrides ── */
      .sbs-swiper {
        padding-bottom: 4rem !important;
        overflow: visible !important;
      }
      .sbs-swiper .swiper-wrapper {
        align-items: stretch;
      }
      .sbs-swiper .swiper-slide {
        height: auto;
      }
      .sbs-swiper .swiper-pagination {
        bottom: 0.5rem;
      }
      .sbs-swiper .swiper-pagination-bullet {
        width: 6px;
        height: 6px;
        background: hsl(var(--muted-foreground) / 0.4);
        opacity: 1;
        transition: all 0.3s ease;
      }
      .sbs-swiper .swiper-pagination-bullet-active {
        background: hsl(var(--primary));
        width: 22px;
        border-radius: 999px;
        box-shadow: 0 0 8px hsl(var(--primary) / 0.5);
      }

      /* ── Custom nav buttons ── */
      .sbs-nav-row {
        display: flex;
        justify-content: center;
        gap: 0.75rem;
        margin-top: 2rem;
      }
      .sbs-nav-btn {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 44px;
        height: 44px;
        border-radius: 50%;
        border: 1.5px solid hsl(var(--border));
        background: hsl(var(--card) / 0.7);
        backdrop-filter: blur(12px);
        color: hsl(var(--muted-foreground));
        cursor: pointer;
        transition:
          background 0.25s ease,
          border-color 0.25s ease,
          color 0.25s ease,
          transform 0.2s ease,
          box-shadow 0.25s ease;
      }
      .sbs-nav-btn:hover {
        background: hsl(var(--primary) / 0.15);
        border-color: hsl(var(--primary) / 0.5);
        color: hsl(var(--primary));
        transform: scale(1.08);
        box-shadow: 0 0 16px hsl(var(--primary) / 0.2);
      }
      .sbs-nav-btn:active {
        transform: scale(0.96);
      }
      .sbs-nav-btn:disabled {
        opacity: 0.3;
        pointer-events: none;
      }

      /* ── Skeleton loader ── */
      .sbs-skeleton {
        border-radius: 24px;
        min-height: 460px;
        overflow: hidden;
        background: hsl(var(--card));
        border: 1px solid hsl(var(--border) / 0.5);
      }
      .sbs-skeleton-img {
        height: 270px;
        background: hsl(var(--muted));
        animation: sbs-shimmer 1.6s ease-in-out infinite;
      }
      .sbs-skeleton-body {
        padding: 1.5rem;
        display: flex;
        flex-direction: column;
        gap: 0.75rem;
      }
      .sbs-skeleton-line {
        height: 14px;
        border-radius: 999px;
        background: hsl(var(--muted));
        animation: sbs-shimmer 1.6s ease-in-out infinite;
      }
      .sbs-line-title  { width: 60%; height: 18px; animation-delay: 0.1s; }
      .sbs-line-sub    { width: 85%; animation-delay: 0.2s; }
      .sbs-line-sub2   { width: 55%; animation-delay: 0.3s; }

      @keyframes sbs-shimmer {
        0%   { opacity: 0.5; }
        50%  { opacity: 1;   }
        100% { opacity: 0.5; }
      }
    `}</style>
  </section>
);

export default ServicesBentoSection;

/* ─── Swiper inner component ────────────────────────────────── */
function ServicesBentoSwiper() {
  const { baseUrl } = useContext(AppContext);
  const swiperRef = useRef<SwiperType | null>(null);

  const [blocks, setBlocks] = useState<Block[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState<string | null>(null);

  const root = useMemo(() => baseUrl.replace(/\/$/, ""), [baseUrl]);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        setLoading(true);
        setLoadError(null);
        const res = await fetch(`${root}/blocks`);
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = await res.json();
        if (cancelled) return;
        setBlocks(Array.isArray(data) ? data : []);
      } catch (e: any) {
        if (cancelled) return;
        setLoadError(e?.message || "Failed to load blocks.");
        setBlocks([]);
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => { cancelled = true; };
  }, [root]);

  const services: ServiceItem[] = useMemo(() => {
    const slugMap: Record<string, string> = {
      "secure storage facilities": "storage-solutions",
      "professional movers": "national-moving",
      "dedicated move coordinators": "office-moving",
      "worldwide accreditation": "international-moving",
    };

    const getTitle = (b: Block) => b.titre || b.title || "";
    return blocks
      .map((b) => {
        const title = getTitle(b);
        const lowerTitle = title.toLowerCase().trim();
        return {
          title,
          description: b.description ?? "",
          image: normalizeImageUrl(b.image || "", root),
          slug: slugMap[lowerTitle] || lowerTitle.replace(/\s+/g, '-'),
        };
      })
      .filter((s) => s.title && s.image);
  }, [blocks, root]);

  /* ── Loading skeleton ── */
  if (loading) {
    return (
      <div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "1.5rem" }}>
          {[0, 1, 2].map((i) => <SkeletonCard key={i} />)}
        </div>
      </div>
    );
  }

  /* ── Error / empty state ── */
  if (loadError || services.length === 0) {
    return (
      <div
        style={{
          minHeight: 420,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: "0.5rem",
          color: "hsl(var(--muted-foreground))",
          borderRadius: 24,
          border: "1px dashed hsl(var(--border))",
          padding: "2rem",
        }}
      >
        <span style={{ fontSize: "2rem" }}>📦</span>
        <span style={{ fontWeight: 700, fontSize: "1rem", color: "hsl(var(--foreground))" }}>
          No services found
        </span>
        {loadError && (
          <span style={{ fontSize: "0.8rem", opacity: 0.6 }}>{loadError}</span>
        )}
      </div>
    );
  }

  return (
    <div>
      <Swiper
        onSwiper={(sw) => { swiperRef.current = sw; }}
        modules={[Autoplay, Navigation, Pagination]}
        autoplay={{ delay: 3800, disableOnInteraction: false, pauseOnMouseEnter: true }}
        pagination={{ clickable: true }}
        spaceBetween={24}
        breakpoints={{
          0:    { slidesPerView: 1 },
          640:  { slidesPerView: 1.3 },
          768:  { slidesPerView: 2 },
          1280: { slidesPerView: 3 },
        }}
        className="sbs-swiper"
      >
        {services.map((service, idx) => (
          <SwiperSlide key={`${service.title}-${idx}`}>
            <ServiceSlideCard {...service} />
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Custom nav row */}
      <div className="sbs-nav-row">
        <button
          className="sbs-nav-btn"
          aria-label="Previous service"
          onClick={() => swiperRef.current?.slidePrev()}
        >
          <ChevronLeft size={18} strokeWidth={2.2} />
        </button>
        <button
          className="sbs-nav-btn"
          aria-label="Next service"
          onClick={() => swiperRef.current?.slideNext()}
        >
          <ChevronRight size={18} strokeWidth={2.2} />
        </button>
      </div>
    </div>
  );
}
