import { useRef, useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectFade, Autoplay, Pagination } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";
import { Trophy, Star, Users } from "lucide-react";
import { useTranslation } from "react-i18next";
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/pagination";

import MagneticButton from "./MagneticButton";

import heroAir from "@/assets/hero-air.webp";
import heroRoad from "@/assets/hero-road.webp";
import heroSea from "@/assets/hero-sea.webp";

const slideImages = [heroAir, heroRoad, heroSea];

const HeroCarousel = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);
  const rectRef = useRef<DOMRect | null>(null);
  const rafRef = useRef<number | null>(null);

  const updateRect = useCallback(() => {
    if (containerRef.current) {
      rectRef.current = containerRef.current.getBoundingClientRect();
    }
  }, []);

  useEffect(() => {
    updateRect();
    window.addEventListener('resize', updateRect, { passive: true });
    window.addEventListener('scroll', updateRect, { passive: true });
    return () => {
      window.removeEventListener('resize', updateRect);
      window.removeEventListener('scroll', updateRect);
    };
  }, [updateRect]);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!rectRef.current) return;
    
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    
    rafRef.current = requestAnimationFrame(() => {
      const rect = rectRef.current!;
      const x = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
      const y = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
      setMousePos({ x, y });
    });
  }, []);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    el.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => el.removeEventListener("mousemove", handleMouseMove);
  }, [handleMouseMove]);

  // Removed isFirstRender effect

  return (
    <section id="home" ref={containerRef} className="relative w-full h-screen overflow-hidden">
      <style>{`
        .progress-bullet {
          width: 48px;
          height: 4px;
          background: rgba(255,255,255,0.2) !important;
          border-radius: 4px;
          position: relative;
          overflow: hidden;
          opacity: 1 !important;
          margin: 0 6px !important;
          transition: width 0.3s ease;
          cursor: pointer;
        }
        @media (min-width: 768px) {
          .progress-bullet { width: 64px; }
        }
        .swiper-pagination-bullet-active.progress-bullet::after {
          content: '';
          position: absolute;
          inset: 0;
          background: #38d9f5;
          animation: cinematic-loader 5s linear forwards;
          transform-origin: left;
        }
        @keyframes cinematic-loader {
          0% { transform: scaleX(0); }
          100% { transform: scaleX(1); }
        }

        /* Hero Animations using native Swiper classes (zero React state updates) */
        .swiper-slide .hero-anim-img {
          transform: scale(1);
          transition: transform 6000ms ease-out;
        }
        .swiper-slide-active .hero-anim-img {
          transform: scale(1.1);
        }

        .swiper-slide .hero-anim-subtitle {
          opacity: 0;
          transform: translateY(1rem);
          transition: opacity 700ms ease-out, transform 700ms ease-out;
          transition-delay: 0ms !important;
        }
        .swiper-slide-active .hero-anim-subtitle {
          opacity: 1;
          transform: translateY(0);
        }

        .swiper-slide .hero-anim-title {
          opacity: 0;
          transform: translateY(120%) rotate(8deg);
          transition: transform 1000ms ease-out, opacity 1000ms ease-out;
          transition-delay: 0ms !important;
        }
        .swiper-slide-active .hero-anim-title {
          opacity: 1;
          transform: translateY(0) rotate(0deg);
        }

        .swiper-slide .hero-anim-desc {
          opacity: 0;
          transform: translateY(2rem);
          transition: opacity 700ms ease-out, transform 700ms ease-out;
          transition-delay: 0ms !important;
        }
        .swiper-slide-active .hero-anim-desc {
          opacity: 1;
          transform: translateY(0);
        }

        .swiper-slide .hero-anim-btns {
          opacity: 0;
          transform: translateY(100%);
          transition: transform 1000ms ease-out, opacity 1000ms ease-out;
          transition-delay: 0ms !important;
        }
        .swiper-slide-active .hero-anim-btns {
          opacity: 1;
          transform: translateY(0);
        }
      `}</style>

      <Swiper
        modules={[EffectFade, Autoplay, Pagination]}
        effect="fade"
        speed={1200}
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        pagination={{
          clickable: true,
          renderBullet: function (index, className) {
            return `<span class="${className} progress-bullet"></span>`;
          }
        }}
        loop
        className="w-full h-full pb-0 [&_.swiper-pagination]:bottom-8 lg:[&_.swiper-pagination]:bottom-12"
      >
        {slideImages.map((image, i) => (
          <SwiperSlide key={i}>
            <div className="relative w-full h-full">
              {/* Image with parallax */}
              <div
                className="absolute inset-0 transition-transform [transition-duration:2000ms] ease-out"
                style={{
                  transform: `scale(1.1) translate(${mousePos.x * -15}px, ${mousePos.y * -15}px)`,
                }}
              >
                <img
                  src={image}
                  alt={t(`hero.slide${i + 1}.title`, '')}
                  className="hero-anim-img w-full h-full object-cover"
                  width={1920}
                  height={1080}
                  fetchPriority={i === 0 ? "high" : "auto"}
                />
              </div>

              {/* Dark overlay – always dark so images stay vivid in both themes */}
              <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.55) 40%, rgba(0,0,0,0.18) 75%, transparent 100%)" }} />
              <div className="absolute inset-0" style={{ background: "linear-gradient(to right, rgba(0,0,0,0.75) 0%, rgba(0,0,0,0.3) 50%, transparent 100%)" }} />

              {/* Navbar Protection Scrim (Top Shadow) */}
              <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-black/70 to-transparent pointer-events-none z-[5]" />

              {/* Glow */}
              <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-[120px] animate-glow-pulse" />

              {/* Content */}
              <div className="absolute inset-0 flex items-center z-10">
                <div className="container mx-auto px-6">
                  <div className="max-w-2xl mt-32 md:mt-40">                    <p
                      className="hero-anim-subtitle text-blue-400 font-semibold text-sm uppercase tracking-[0.3em] mb-4"
                      style={{ transitionDelay: "200ms" }}
                    >
                      {t(`hero.slide${i + 1}.subtitle`, '')}
                    </p>
                    <div className="overflow-hidden mb-6 py-2 flex flex-wrap gap-x-4 md:gap-x-6 gap-y-2">
                      {t(`hero.slide${i + 1}.title`, '').split(" ").map((word: string, wIdx: number) => (
                        <div key={wIdx} className="overflow-hidden pb-[0.4em] -mb-[0.4em]">
                          <h2
                            className="hero-anim-title text-4xl sm:text-5xl md:text-6xl lg:text-[70px] font-black leading-[0.95] text-white"
                            style={{ transitionDelay: `${400 + wIdx * 150}ms` }}
                          >
                            <span className="block pb-[0.3em]" style={{ background: "linear-gradient(135deg, #ffffff 0%, #a5d8ff 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
                              {word}
                            </span>
                          </h2>
                        </div>
                      ))}
                    </div>
                    <p
                      className="hero-anim-desc text-lg text-white/80 max-w-lg mb-8"
                      style={{ transitionDelay: "600ms" }}
                    >
                      {t(`hero.slide${i + 1}.description`, '')}
                    </p>
                    <div
                      className="hero-anim-btns flex flex-col sm:flex-row gap-4 w-full max-w-sm sm:max-w-none"
                      style={{ transitionDelay: "700ms" }}
                    >
                      <MagneticButton
                        onClick={() => navigate('/contact')}
                        className="w-full sm:w-auto text-center px-8 py-4 rounded-xl bg-primary text-primary-foreground font-bold text-lg glow-primary shadow-[0_0_20px_rgba(249,115,22,0.3)] z-20"
                      >
                        {t('navbar.getQuote', 'Get a Quote')}
                      </MagneticButton>
                      <MagneticButton
                        href="#services"
                        className="w-full sm:w-auto text-center whitespace-nowrap px-8 py-4 rounded-xl border border-white/40 text-white font-semibold text-base sm:text-lg hover:bg-white/10 transition-colors duration-300 backdrop-blur-sm shadow-md z-20"
                      >
                        {t('hero.ourServices', 'Our Services')}
                      </MagneticButton>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Floating Trust Cards */}
      <div className="absolute inset-0 z-20 pointer-events-none flex items-center justify-end px-6 sm:px-12 xl:px-32">
        <div className="hidden lg:flex flex-col gap-6 opacity-0 translate-x-12" style={{ animation: 'contact-fade-up 1.5s cubic-bezier(0.2, 0.8, 0.2, 1) forwards 1s' }}>

          {/* Card 1: Completed Moves */}
          <div
            className="flex items-center gap-5 p-5 bg-black/20 backdrop-blur-xl border border-white/20 rounded-2xl shadow-2xl transition-transform duration-700 ease-out will-change-transform pointer-events-auto group"
            style={{ transform: `rotateY(${mousePos.x * -12}deg) rotateX(${mousePos.y * 12}deg) translateZ(20px)`, transformStyle: 'preserve-3d' }}
          >
            <div className="w-14 h-14 rounded-full bg-primary/20 flex items-center justify-center border border-primary/40 group-hover:scale-110 group-hover:-rotate-12 transition-all duration-500 shadow-inner">
              <Trophy className="w-7 h-7 text-primary" strokeWidth={1.5} />
            </div>
            <div style={{ transform: "translateZ(15px)" }}>
              <p className="text-2xl font-black text-white leading-none mb-1">30,000+</p>
              <p className="text-[11px] text-blue-200 uppercase tracking-widest font-bold">Moves Completed</p>
            </div>
          </div>

          {/* Card 2: Highest Rated */}
          <div
            className="flex items-center gap-5 p-5 bg-black/20 backdrop-blur-xl border border-white/20 rounded-2xl shadow-2xl transition-transform duration-700 ease-out will-change-transform pointer-events-auto group xl:-translate-x-12"
            style={{ transform: `rotateY(${mousePos.x * -16}deg) rotateX(${mousePos.y * 16}deg) translateZ(40px)`, transformStyle: 'preserve-3d' }}
          >
            <div className="w-14 h-14 rounded-full bg-amber-400/20 flex items-center justify-center border border-amber-400/40 group-hover:scale-110 group-hover:rotate-[20deg] transition-all duration-500 shadow-inner">
              <Star className="w-7 h-7 text-amber-400 fill-amber-400" strokeWidth={1.5} />
            </div>
            <div style={{ transform: "translateZ(20px)" }}>
              <p className="text-2xl font-black text-white leading-none mb-1 shadow-sm">Top Rated</p>
              <p className="text-[11px] text-blue-200 uppercase tracking-widest font-bold flex items-center gap-1.5 drop-shadow-sm">
                <Users className="w-3 h-3 text-white" /> Excellence Awards
              </p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default HeroCarousel;
