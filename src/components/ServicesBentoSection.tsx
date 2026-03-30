import { useContext, useEffect, useMemo, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import { AppContext } from "../context/AppContext";

type ServiceItem = {
  title: string;
  description: string;
  image: string;
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

const ServiceSlideCard = ({ title, description, image }: ServiceItem) => (
  <article
    className="group relative overflow-hidden rounded-3xl border border-border/70 min-h-[430px]"
  >
    <img
      className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
      src={image}
      alt={title}
      loading="lazy"
      decoding="async"
      onError={(e) => {
        // Hide broken image while keeping layout stable
        (e.currentTarget as HTMLImageElement).style.display = "none";
      }}
    />
    <div className="absolute inset-0 bg-gradient-to-t from-background via-background/75 to-background/25" />

    <div className="relative z-10 h-full p-6 md:p-7 flex flex-col justify-end">
      <h3 className="text-2xl md:text-3xl font-extrabold text-foreground mb-3">{title}</h3>
      <p className="text-sm md:text-base text-muted-foreground leading-relaxed max-w-[58ch]">{description}</p>
    </div>
  </article>
);

const ServicesBentoSection = () => (
  <section id="services-bento" className="py-24 relative section-glow">
    <div className="container mx-auto px-6">
      <div className="text-center max-w-3xl mx-auto mb-14">
        <p className="text-primary font-semibold text-sm uppercase tracking-[0.3em] mb-4">Featured Services</p>
        <h2 className="text-4xl md:text-5xl font-bold mb-5">
          Discover Our <span className="gradient-text">Moving Expertise</span>
        </h2>
        <p className="text-muted-foreground text-lg">
          Explore our key services: household moving, office relocation, car shipping, secure storage,
          fine art logistics, and pet relocation.
        </p>
      </div>
      <ServicesBentoSwiper />
    </div>
  </section>
);

export default ServicesBentoSection;

function ServicesBentoSwiper() {
  const { baseUrl } = useContext(AppContext);

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

    return () => {
      cancelled = true;
    };
  }, [root]);

  const services: ServiceItem[] = useMemo(() => {
    const getTitle = (b: Block) => b.titre || b.title || "";
    return blocks
      .map((b) => ({
        title: getTitle(b),
        description: b.description ?? "",
        image: normalizeImageUrl(b.image || "", root),
      }))
      .filter((s) => s.title && s.image);
  }, [blocks, root]);

  if (loading) {
    return <div className="h-[430px] flex items-center justify-center text-muted-foreground">Loading...</div>;
  }

  if (loadError || services.length === 0) {
    return (
      <div className="h-[430px] flex flex-col items-center justify-center text-center text-muted-foreground">
        <div className="font-bold mb-2">No services found</div>
        {loadError ? <div className="text-sm">{loadError}</div> : null}
      </div>
    );
  }

  return (
    <Swiper
      modules={[Autoplay, Navigation, Pagination]}
      autoplay={{ delay: 3500, disableOnInteraction: false }}
      navigation
      pagination={{ clickable: true }}
      spaceBetween={24}
      breakpoints={{
        0: { slidesPerView: 1 },
        768: { slidesPerView: 2 },
        1280: { slidesPerView: 3 },
      }}
      className="[&_.swiper-button-next]:text-primary [&_.swiper-button-prev]:text-primary [&_.swiper-button-next]:scale-75 [&_.swiper-button-prev]:scale-75 [&_.swiper-pagination-bullet]:bg-muted-foreground [&_.swiper-pagination-bullet-active]:bg-primary [&_.swiper-pagination]:mt-8"
    >
      {services.map((service, idx) => (
        <SwiperSlide key={`${service.title}-${idx}`}>
          <ServiceSlideCard {...service} />
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
