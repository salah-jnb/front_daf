import { useContext, useEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import { AppContext } from "../context/AppContext";
import { ChevronLeft, ChevronRight, ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

type ServiceItem = {
  title: string;
  description: string;
  image: string;
  slug?: string;
  keywords?: string[];
};

type Block = {
  id?: string | number;
  titre?: string;
  title?: string;
  description?: string;
  image?: string;
  motcle?: string[];
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
const ServiceSlideCard = ({ title, description, image, slug, onClick }: ServiceItem & { onClick: () => void }) => {
  const [imgError, setImgError] = useState(false);
  const { t } = useTranslation();

  return (
    <div onClick={onClick} className="sbs-card" style={{ textDecoration: 'none' }} role="button" tabIndex={0}>
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
        <div className="sbs-card-tag">{t('services.serviceTag', 'Service')}</div>
        <h3 className="sbs-card-title">{t('servicesData.' + slug + '.title', title)}</h3>
        <p className="sbs-card-desc">{t('servicesData.' + slug + '.description', description)}</p>
        <div className="sbs-card-cta">
          <span>{t('services.learnMore', 'Voir plus')}</span>
          <ArrowUpRight className="sbs-cta-icon" size={15} strokeWidth={2.2} />
        </div>
      </div>

      {/* Corner accent */}
      <div className="sbs-card-corner" aria-hidden="true" />
    </div>
  );
};

/* ─── Main section ──────────────────────────────────────────── */
const ServicesBentoSection = () => {
  const { t } = useTranslation();
  return (
  <section id="services-bento" className="sbs-section py-24 md:py-36 relative overflow-hidden">
    {/* Ambient blobs */}
    <div className="sbs-blob sbs-blob-a" aria-hidden="true" />
    <div className="sbs-blob sbs-blob-b" aria-hidden="true" />

    <div className="container mx-auto px-4 sm:px-6 relative z-10">
      {/* Section header */}
      <div className="sbs-header">
        <div className="sbs-eyebrow-wrap">
          <span className="sbs-eyebrow">{t('services.eyebrow', 'Featured Services')}</span>
        </div>
        <h2 className="text-4xl md:text-5xl font-extrabold mb-5 tracking-tight leading-tight">
          {t('services.discover', 'Discover Our ')}
          <span className="gradient-text">{t('services.expertise', 'Moving Expertise')}</span>
        </h2>
        <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
          {t('services.desc', 'Explore our key services: household moving, office relocation, car shipping, secure storage, fine art logistics, and pet relocation.')}
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
        filter: blur(120px);
        pointer-events: none;
        opacity: 0.25;
      }
      .sbs-blob-a {
        width: 600px; height: 600px;
        top: -150px; right: -100px;
        background: radial-gradient(circle, hsl(var(--primary) / 0.5) 0%, transparent 70%);
      }
      .sbs-blob-b {
        width: 600px; height: 600px;
        bottom: -200px; left: -100px;
        background: radial-gradient(circle, hsl(var(--accent) / 0.4) 0%, transparent 70%);
      }

      /* ── Header ── */
      .sbs-header {
        text-align: center;
        max-width: 720px;
        margin: 0 auto 4rem;
      }

      /* ── Eyebrow pill ── */
      .sbs-eyebrow-wrap {
        display: inline-flex;
        margin-bottom: 1.5rem;
      }
      .sbs-eyebrow {
        display: inline-flex;
        align-items: center;
        padding: 0.4rem 1.2rem;
        border-radius: 999px;
        font-size: 0.75rem;
        font-weight: 800;
        letter-spacing: 0.25em;
        text-transform: uppercase;
        background: hsl(var(--primary) / 0.1);
        border: 1px solid hsl(var(--primary) / 0.3);
        color: hsl(var(--primary));
        box-shadow: 0 0 20px hsl(var(--primary) / 0.15);
      }

      /* ── Card ── */
      .sbs-card {
        position: relative;
        border-radius: 28px;
        overflow: hidden;
        min-height: 340px;
        display: flex;
        flex-direction: column;
        justify-content: flex-end;
        cursor: pointer;
        background: hsl(var(--card));
        border: 1px solid hsl(var(--border) / 0.3);
        transition:
          transform 0.5s cubic-bezier(.19,1,.22,1),
          box-shadow 0.5s ease,
          border-color 0.4s ease;
      }
      .sbs-card:hover {
        transform: translateY(-8px) scale(1.02);
        box-shadow:
          0 40px 80px -15px rgba(0,0,0,0.5),
          0 0 0 1px hsl(var(--primary) / 0.3);
        border-color: hsl(var(--primary) / 0.5);
      }

      /* ── Media ── */
      .sbs-card-media {
        position: absolute;
        inset: 0;
        overflow: hidden;
        border-radius: 28px;
        z-index: 1;
      }
      .sbs-card-img {
        width: 100%; height: 100%;
        object-fit: cover;
        transition: transform 0.8s cubic-bezier(.19,1,.22,1), filter 0.8s ease;
        filter: brightness(0.9) contrast(1.1);
      }
      .sbs-card:hover .sbs-card-img {
        transform: scale(1.12);
        filter: brightness(1) contrast(1.1) saturate(1.1);
      }
      .sbs-card-img-fallback {
        width: 100%; height: 100%;
        background: linear-gradient(135deg, hsl(var(--card)) 0%, hsl(var(--secondary)) 100%);
      }

      /* ── Overlay ── */
      .sbs-card-overlay {
        position: absolute;
        inset: 0;
        background: linear-gradient(
          to top,
          rgba(0,0,0,0.95) 0%,
          rgba(0,0,0,0.6) 40%,
          rgba(0,0,0,0) 80%
        );
        z-index: 2;
        transition: opacity 0.5s ease;
        pointer-events: none;
      }
      .sbs-card:hover .sbs-card-overlay {
        opacity: 0.8;
      }

      /* ── Content ── */
      .sbs-card-content {
        position: relative;
        z-index: 10;
        padding: 1.5rem;
        display: flex;
        flex-direction: column;
        gap: 0.5rem;
        transform: translateY(8px);
        transition: transform 0.5s cubic-bezier(.19,1,.22,1);
      }
      .sbs-card:hover .sbs-card-content {
        transform: translateY(0);
      }

      /* ── Tag ── */
      .sbs-card-tag {
        display: inline-flex;
        width: fit-content;
        padding: 0.35rem 0.85rem;
        border-radius: 8px;
        font-size: 0.65rem;
        font-weight: 800;
        letter-spacing: 0.2em;
        text-transform: uppercase;
        background: hsl(var(--primary));
        color: #fff;
        box-shadow: 0 4px 12px hsl(var(--primary) / 0.4);
        margin-bottom: 0.25rem;
      }

      /* ── Title ── */
      .sbs-card-title {
        font-size: clamp(1.1rem, 2vw, 1.3rem);
        font-weight: 700;
        line-height: 1.3;
        color: #ffffff;
        text-shadow: 0 2px 8px rgba(0,0,0,0.5);
      }

      /* ── Description ── */
      .sbs-card-desc {
        font-size: 0.9rem;
        color: rgba(255,255,255,0.85);
        line-height: 1.6;
        max-width: 52ch;
        display: -webkit-box;
        -webkit-line-clamp: 1;
        -webkit-box-orient: vertical;
        overflow: hidden;
        text-shadow: 0 1px 4px rgba(0,0,0,0.5);
      }

      /* ── CTA ── */
      .sbs-card-cta {
        display: inline-flex;
        align-items: center;
        gap: 0.4rem;
        font-size: 0.85rem;
        font-weight: 800;
        color: hsl(var(--primary));
        letter-spacing: 0.05em;
        text-transform: uppercase;
        margin-top: 0.25rem;
      }
      .sbs-cta-icon {
        color: hsl(var(--primary));
        transition: transform 0.3s cubic-bezier(.19,1,.22,1);
      }
      .sbs-card:hover .sbs-cta-icon {
        transform: translate(3px, -3px) scale(1.1);
      }

      /* ── Corner accent ── */
      .sbs-card-corner {
        position: absolute;
        top: 1.5rem;
        right: 1.5rem;
        width: 12px;
        height: 12px;
        border-radius: 50%;
        background: hsl(var(--primary));
        box-shadow: 0 0 20px 6px hsl(var(--primary) / 0.6);
        opacity: 0;
        transform: scale(0);
        transition: opacity 0.3s ease, transform 0.5s cubic-bezier(.19,1,.22,1);
        z-index: 10;
      }
      .sbs-card:hover .sbs-card-corner {
        opacity: 1;
        transform: scale(1);
      }

      /* ── Swiper overrides ── */
      .sbs-swiper {
        padding-bottom: 4.5rem !important;
        overflow: visible !important;
      }
      .sbs-swiper .swiper-wrapper {
        align-items: stretch;
      }
      .sbs-swiper .swiper-slide {
        height: auto;
      }
      .sbs-swiper .swiper-pagination {
        bottom: 0rem;
      }
      .sbs-swiper .swiper-pagination-bullet {
        width: 8px;
        height: 8px;
        background: hsl(var(--muted-foreground) / 0.5);
        opacity: 1;
        transition: all 0.4s cubic-bezier(.19,1,.22,1);
      }
      .sbs-swiper .swiper-pagination-bullet-active {
        background: hsl(var(--primary));
        width: 32px;
        border-radius: 999px;
        box-shadow: 0 0 12px hsl(var(--primary) / 0.6);
      }

      /* ── Custom nav buttons ── */
      .sbs-nav-row {
        display: flex;
        justify-content: center;
        gap: 1rem;
        margin-top: 1.5rem;
        position: relative;
        z-index: 20;
      }
      .sbs-nav-btn {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 48px;
        height: 48px;
        border-radius: 50%;
        border: 1px solid hsl(var(--border) / 0.8);
        background: hsl(var(--card) / 0.6);
        backdrop-filter: blur(12px);
        color: hsl(var(--foreground));
        cursor: pointer;
        transition:
          all 0.3s cubic-bezier(.19,1,.22,1);
      }
      .sbs-nav-btn:hover {
        background: hsl(var(--primary) / 0.1);
        border-color: hsl(var(--primary) / 0.4);
        color: hsl(var(--primary));
        transform: scale(1.1);
        box-shadow: 0 8px 24px hsl(var(--primary) / 0.2);
      }
      .sbs-nav-btn:active {
        transform: scale(0.95);
      }
      .sbs-nav-btn:disabled {
        opacity: 0.3;
        pointer-events: none;
      }

      /* ── Skeleton loader ── */
      .sbs-skeleton {
        border-radius: 28px;
        min-height: 340px;
        overflow: hidden;
        background: hsl(var(--card));
        border: 1px solid hsl(var(--border) / 0.3);
      }
      .sbs-skeleton-img {
        height: 300px;
        background: hsl(var(--muted));
        animation: sbs-shimmer 2s ease-in-out infinite;
      }
      .sbs-skeleton-body {
        padding: 1.75rem;
        display: flex;
        flex-direction: column;
        gap: 1rem;
      }
      .sbs-skeleton-line {
        height: 16px;
        border-radius: 999px;
        background: hsl(var(--muted));
        animation: sbs-shimmer 2s ease-in-out infinite;
      }
      .sbs-line-title  { width: 65%; height: 22px; animation-delay: 0.1s; }
      .sbs-line-sub    { width: 90%; animation-delay: 0.2s; }
      .sbs-line-sub2   { width: 60%; animation-delay: 0.3s; }

      @keyframes sbs-shimmer {
        0%   { opacity: 0.4; }
        50%  { opacity: 0.8; }
        100% { opacity: 0.4; }
      }
    `}</style>
  </section>
  );
};

export default ServicesBentoSection;

/* ─── Swiper inner component ────────────────────────────────── */
function ServicesBentoSwiper() {
  const { baseUrl } = useContext(AppContext);
  const swiperRef = useRef<SwiperType | null>(null);

  const [blocks, setBlocks] = useState<Block[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [selectedService, setSelectedService] = useState<ServiceItem | null>(null);
  const { t } = useTranslation();

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
      // Keys should be lowercase and without accents for easier matching
      "international moving": "international-moving",
      "demenagement international": "international-moving",
      "pet relocation": "pet-relocation",
      "demenagement d'animaux": "pet-relocation",
      "demenagement danimaux": "pet-relocation",
      "office moving": "office-moving",
      "transfert d'entreprise": "office-moving",
      "transfert dentreprise": "office-moving",
      "car shipping": "car-shipping",
      "transport de vehicules": "car-shipping",
      "national moving": "national-moving",
      "demenagement national": "national-moving",
      "fine art": "fine-art",
      "fine art logistics": "fine-art",
      "logistique oeuvres d'art": "fine-art",
      "logistique oeuvres dart": "fine-art",
      "storage solutions": "storage-solutions",
      "garde-meubles": "storage-solutions",
      "garde meubles": "storage-solutions",
      
      // Legacy highlight keys
      "secure storage facilities": "storage-solutions",
      "professional movers": "national-moving",
      "dedicated move coordinators": "office-moving",
      "worldwide accreditation": "international-moving",
    };

    const getTitle = (b: Block) => b.titre || b.title || "";
    return blocks
      .map((b) => {
        const title = getTitle(b);
        const lowerTitle = title.toLowerCase().trim()
            .normalize("NFD").replace(/[\u0300-\u036f]/g, ""); // remove accents

        return {
          title,
          description: b.description ?? "",
          image: normalizeImageUrl(b.image || "", root),
          slug: slugMap[lowerTitle] || lowerTitle.replace(/\s+/g, '-'),
          keywords: b.motcle || [],
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
            <ServiceSlideCard {...service} onClick={() => setSelectedService(service)} />
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Details Modal via Portal */}
      {selectedService && createPortal(
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 sm:p-6" style={{ background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(8px)' }}>
          <div className="bg-background border border-border/50 rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl relative" style={{ animation: 'sbs-scale-in 0.3s ease-out' }}>
            <button onClick={() => setSelectedService(null)} className="absolute top-4 right-4 z-[110] w-10 h-10 bg-black/50 text-white rounded-full flex items-center justify-center border border-white/20 hover:bg-black/80 transition shadow-lg">
              ✕
            </button>
            <div className="h-56 sm:h-72 w-full relative">
              <img src={selectedService.image} alt={selectedService.title} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent" />
            </div>
            <div className="px-6 sm:px-8 pb-8 -mt-16 relative z-10">
              <div className="inline-block px-3 py-1 mb-4 text-xs font-bold uppercase tracking-wider text-primary bg-primary/10 rounded-full border border-primary/20 backdrop-blur-md">
                {t('services.serviceTag', 'Service')}
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold mb-4">{t('servicesData.' + selectedService.slug + '.title', selectedService.title)}</h2>
              
              {selectedService.keywords && selectedService.keywords.length > 0 && (
                <div className="mb-6 flex flex-wrap gap-2">
                  {selectedService.keywords.map((kw, i) => (
                    <span key={i} className="px-3 py-1 bg-secondary text-secondary-foreground text-xs font-semibold uppercase tracking-wider rounded-lg border border-border/50">
                      {kw}
                    </span>
                  ))}
                </div>
              )}

              <p className="text-muted-foreground leading-relaxed whitespace-pre-wrap text-lg">
                {t('servicesData.' + selectedService.slug + '.description', selectedService.description)}
              </p>
              
              <div className="mt-8 flex justify-end">
                <button onClick={() => setSelectedService(null)} className="px-6 py-3 bg-primary text-primary-foreground font-bold rounded-xl shadow-lg shadow-primary/25 hover:-translate-y-1 transition-transform">
                  Fermer les détails
                </button>
              </div>
            </div>
          </div>
          <style>{`
            @keyframes sbs-scale-in {
              0% { opacity: 0; transform: scale(0.95) translateY(10px); }
              100% { opacity: 1; transform: scale(1) translateY(0); }
            }
          `}</style>
        </div>,
        document.body
      )}

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
