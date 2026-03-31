import { useRef, useState, useEffect, useCallback } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectFade, Autoplay, Pagination } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";
import { Trophy, Star, Users } from "lucide-react";
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/pagination";

import MagneticButton from "./MagneticButton";

import heroAir from "@/assets/hero-air.jpg";
import heroRoad from "@/assets/hero-road.jpg";
import heroSea from "@/assets/hero-sea.jpg";

const slides = [
  {
    image: heroAir,
    title: "Air Freight",
    subtitle: "Fast Global Air Cargo",
    description: "Time-critical air freight solutions with secure handling, customs coordination, and reliable worldwide delivery.",
  },
  {
    image: heroRoad,
    title: "Road Transport",
    subtitle: "Reliable Overland Logistics",
    description: "Flexible road transport across local and cross-border routes with clear communication and on-time performance.",
  },
  {
    image: heroSea,
    title: "Sea Freight",
    subtitle: "Cost-Effective Ocean Shipping",
    description: "FCL and LCL sea freight services designed for dependable transit times and competitive international shipping costs.",
  },
];

const HeroCarousel = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
    setMousePos({ x, y });
  }, []);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    el.addEventListener("mousemove", handleMouseMove);
    return () => el.removeEventListener("mousemove", handleMouseMove);
  }, [handleMouseMove]);

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
        onSlideChange={(swiper: SwiperType) => setActiveIndex(swiper.realIndex)}
        className="w-full h-full pb-0 [&_.swiper-pagination]:bottom-8 lg:[&_.swiper-pagination]:bottom-12"
      >
        {slides.map((slide, i) => (
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
                  src={slide.image}
                  alt={slide.title}
                  className={`w-full h-full object-cover transition-transform [transition-duration:6000ms] ${activeIndex === i ? "scale-110" : "scale-100"
                    }`}
                  width={1920}
                  height={1080}
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
                  <div className="max-w-2xl mt-32 md:mt-40">
                    <p
                      className={`text-blue-400 font-semibold text-sm uppercase tracking-[0.3em] mb-4 transition-all duration-700 ${activeIndex === i ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                        }`}
                      style={{ transitionDelay: "200ms" }}
                    >
                      {slide.subtitle}
                    </p>
                    <div className="overflow-hidden mb-6 py-2 flex flex-wrap gap-x-4 md:gap-x-6 gap-y-2">
                      {slide.title.split(" ").map((word, wIdx) => (
                        <div key={wIdx} className="overflow-hidden">
                          <h2
                            className={`text-6xl md:text-8xl lg:text-[100px] font-black leading-[0.95] text-white transition-transform duration-[1000ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${activeIndex === i ? "translate-y-0 opacity-100" : "translate-y-[120%] opacity-0 rotate-[8deg]"
                              }`}
                            style={{ transitionDelay: activeIndex === i ? `${400 + wIdx * 150}ms` : "0ms" }}
                          >
                            <span className="block pb-2 -mb-2" style={{ background: "linear-gradient(135deg, #ffffff 0%, #a5d8ff 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
                              {word}
                            </span>
                          </h2>
                        </div>
                      ))}
                    </div>
                    <p
                      className={`text-lg text-white/80 max-w-lg mb-8 transition-all duration-700 ${activeIndex === i ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                        }`}
                      style={{ transitionDelay: "600ms" }}
                    >
                      {slide.description}
                    </p>
                    <div
                      className={`flex flex-col sm:flex-row gap-4 w-full max-w-sm sm:max-w-none transition-transform duration-[1000ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${activeIndex === i ? "translate-y-0 opacity-100" : "translate-y-[100%] opacity-0"
                        }`}
                      style={{ transitionDelay: activeIndex === i ? "700ms" : "0ms" }}
                    >
                      <MagneticButton
                        href="#contact"
                        className="w-full sm:w-auto text-center px-8 py-4 rounded-xl bg-primary text-primary-foreground font-bold text-lg glow-primary shadow-[0_0_20px_rgba(249,115,22,0.3)] z-20"
                      >
                        Get a Quote
                      </MagneticButton>
                      <MagneticButton
                        href="#services"
                        className="w-full sm:w-auto text-center whitespace-nowrap px-8 py-4 rounded-xl border border-white/40 text-white font-semibold text-base sm:text-lg hover:bg-white/10 transition-colors duration-300 backdrop-blur-sm shadow-md z-20"
                      >
                        Our Services
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
