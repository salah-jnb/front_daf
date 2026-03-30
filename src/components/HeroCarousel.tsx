import { useRef, useState, useEffect, useCallback } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectFade, Autoplay, Pagination } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/pagination";

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
      <Swiper
        modules={[EffectFade, Autoplay, Pagination]}
        effect="fade"
        speed={1200}
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        pagination={{ clickable: true }}
        loop
        onSlideChange={(swiper: SwiperType) => setActiveIndex(swiper.realIndex)}
        className="w-full h-full [&_.swiper-pagination-bullet]:w-3 [&_.swiper-pagination-bullet]:h-3 [&_.swiper-pagination-bullet]:bg-foreground/40 [&_.swiper-pagination-bullet]:rounded-full [&_.swiper-pagination-bullet-active]:bg-primary [&_.swiper-pagination-bullet-active]:scale-125 [&_.swiper-pagination]:bottom-8"
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
                  className={`w-full h-full object-cover transition-transform [transition-duration:6000ms] ${
                    activeIndex === i ? "scale-110" : "scale-100"
                  }`}
                  width={1920}
                  height={1080}
                />
              </div>

              {/* Dark overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-background/30" />
              <div className="absolute inset-0 bg-gradient-to-r from-background/80 via-transparent to-transparent" />

              {/* Glow */}
              <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-[120px] animate-glow-pulse" />

              {/* Content */}
              <div className="absolute inset-0 flex items-center">
                <div className="container mx-auto px-6">
                  <div className="max-w-2xl">
                    <p
                      className={`text-primary font-semibold text-sm uppercase tracking-[0.3em] mb-4 transition-all duration-700 ${
                        activeIndex === i ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                      }`}
                      style={{ transitionDelay: "200ms" }}
                    >
                      {slide.subtitle}
                    </p>
                    <h2
                      className={`text-5xl md:text-7xl lg:text-8xl font-black leading-[0.9] mb-6 transition-all duration-700 ${
                        activeIndex === i ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                      }`}
                      style={{ transitionDelay: "400ms" }}
                    >
                      <span className="gradient-text">{slide.title}</span>
                    </h2>
                    <p
                      className={`text-lg text-muted-foreground max-w-lg mb-8 transition-all duration-700 ${
                        activeIndex === i ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                      }`}
                      style={{ transitionDelay: "600ms" }}
                    >
                      {slide.description}
                    </p>
                    <div
                      className={`flex flex-col sm:flex-row gap-3 sm:gap-4 w-full max-w-sm sm:max-w-none transition-all duration-700 ${
                        activeIndex === i ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                      }`}
                      style={{ transitionDelay: "800ms" }}
                    >
                      <a
                        href="#contact"
                        className="w-full sm:w-auto text-center px-6 sm:px-8 py-3.5 sm:py-4 rounded-xl bg-primary text-primary-foreground font-bold text-base sm:text-lg glow-primary hover:scale-105 transition-transform duration-300"
                      >
                        Get a Quote
                      </a>
                      <a
                        href="#services"
                        className="w-full sm:w-auto text-center whitespace-nowrap px-6 sm:px-8 py-3.5 sm:py-4 rounded-xl border border-border text-foreground font-semibold text-base sm:text-lg hover:bg-secondary transition-colors duration-300"
                      >
                        Our Services
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default HeroCarousel;
