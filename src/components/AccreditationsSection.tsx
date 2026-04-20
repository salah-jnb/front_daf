import { useEffect, useMemo, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import { useTranslation } from "react-i18next";
import "swiper/css";

type Sponsor = { id?: number; image?: string };

const AccreditationsSection = () => {
  const { t } = useTranslation();
  const apiBaseUrl = useMemo(
    () =>
      (localStorage.getItem("tg_api") || import.meta.env.VITE_API_URL || "").replace(
        /\/$/,
        "",
      ),
    [],
  );
  const [sponsors, setSponsors] = useState<Sponsor[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        setLoading(true);
        const res = await fetch(`${apiBaseUrl}/sponsors`);
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = await res.json();
        if (cancelled) return;
        const list = Array.isArray(data) ? data : [];
        setSponsors(list);
      } catch {
        if (!cancelled) setSponsors([]);
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [apiBaseUrl]);

  // Combine fetched logos with static default logos if none exist, so the swiper always looks good
  const apiLogos = sponsors
    .map((s) => s?.image)
    .filter((u): u is string => typeof u === "string" && u.trim().startsWith("http"));

  const defaultLogos = ["/partners/iamx.png", "/partners/iam.png"];
  
  const logos = apiLogos.length > 0 ? apiLogos : defaultLogos;

  return (
    <section id="accreditations" className="py-16 md:py-24 relative section-glow overflow-hidden bg-background">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-[800px] h-[300px] bg-primary/5 blur-[100px] rounded-full pointer-events-none" />

      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <div className="max-w-4xl mx-auto mb-10 sm:mb-16 flex flex-col items-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold uppercase tracking-widest mb-6 shadow-[0_0_15px_rgba(59,130,246,0.1)]">
            <span>{t('accreditations.globalTrust', 'Global Trust')}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-[42px] font-extrabold tracking-tight text-foreground text-center mb-4">
            {t('accreditations.our', 'Our ')}<span className="gradient-text">{t('accreditations.accrs', 'Accreditations')}</span>
          </h2>
          <p className="text-center text-muted-foreground max-w-2xl text-base sm:text-lg">
            {t('accreditations.desc', 'We are proudly certified and recognized by the most prestigious international moving and logistics organizations across the globe.')}
          </p>
        </div>

        <div className="max-w-7xl mx-auto px-2">
          {loading ? (
            <div className="flex justify-center flex-wrap gap-4 md:gap-8">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="w-[180px] h-[140px] bg-card/60 border border-border/40 rounded-3xl animate-pulse" />
              ))}
            </div>
          ) : (
            <Swiper
              modules={[Autoplay]}
              autoplay={{ 
                delay: 2500, 
                disableOnInteraction: false,
                pauseOnMouseEnter: true
              }}
              loop={false}
              grabCursor={true}
              slidesPerView={"auto"}
              spaceBetween={20}
              centerInsufficientSlides={true}
              breakpoints={{
                480: { spaceBetween: 24 },
                768: { spaceBetween: 32 },
                1024: { spaceBetween: 40 },
                1280: { spaceBetween: 48 },
              }}
              className="accreditations-swiper !pb-10 !pt-4"
            >
              {logos.map((src, idx) => (
                <SwiperSlide key={`${src}-${idx}`} style={{ width: 'auto' }} className="flex justify-center h-auto group">
                  <article
                    className="w-[200px] sm:w-[240px] bg-card/40 backdrop-blur-md border border-border/60 rounded-3xl p-6 sm:p-8 flex items-center justify-center min-h-[160px] hover:border-primary/50 transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_15px_30px_-5px_rgba(0,0,0,0.1)] hover:bg-card/80 h-full"
                    style={{ boxShadow: "inset 0 1px 0 0 rgba(255,255,255,0.05), 0 2px 8px rgba(0,0,0,0.03)" }}
                  >
                    <img
                      src={src}
                      alt={`Accreditation Partner ${idx + 1}`}
                      className="w-full h-full max-h-[90px] object-contain transition-all duration-500 group-hover:scale-110"
                      style={{ filter: "drop-shadow(0 4px 10px rgba(0,0,0,0.08))" }}
                      loading="lazy"
                      decoding="async"
                    />
                  </article>
                </SwiperSlide>
              ))}
            </Swiper>
          )}
        </div>
      </div>
      
      <style>{`
        .accreditations-swiper .swiper-wrapper {
          align-items: center;
        }
      `}</style>
    </section>
  );
};

export default AccreditationsSection;
