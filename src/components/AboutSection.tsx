import { useEffect, useState } from "react";
import { BadgeCheck, CarFront, Headset, Ship, Truck, Umbrella, Warehouse } from "lucide-react";
import heroAir from "@/assets/hero-air.webp";
import heroRoad from "@/assets/hero-road.webp";
import heroSea from "@/assets/hero-sea.webp";

// Icon pool used to cycle through for dynamically loaded metrics
const metricIcons = [Umbrella, Warehouse, Ship, Truck, Headset, BadgeCheck];

const highlights = [
  {
    icon: Warehouse,
    title: "Secure Storage Facilities",
    desc: "Climate-controlled units monitored 24/7 to safeguard your most valuable assets and inventory.",
    image: heroSea,
  },
  {
    icon: Truck,
    title: "Professional Movers",
    desc: "A rigorously trained team devoted to handling your belongings with the utmost care and precision.",
    image: heroRoad,
  },
  {
    icon: Headset,
    title: "Dedicated Coordinators",
    desc: "Your personal moving assistant managing every detail from door to door for total peace of mind.",
    image: heroAir,
  },
  {
    icon: BadgeCheck,
    title: "Worldwide Accreditation",
    desc: "Certified by top global logistics networks, guaranteeing international quality standards.",
    image: heroSea,
  },
];

const AboutSection = () => {
  const [metrics, setMetrics] = useState<{ id: number; value: string; label: string }[]>([]);
  const [metricsLoading, setMetricsLoading] = useState(true);

  useEffect(() => {
    const apiUrl = import.meta.env.VITE_API_URL || "";
    fetch(`${apiUrl.replace(/\/$/, "")}/why-choose-us`)
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json();
      })
      .then((data) => {
        setMetrics(Array.isArray(data) ? data : []);
      })
      .catch(() => {
        // Fallback to empty — the section metrics simply won't display
        setMetrics([]);
      })
      .finally(() => setMetricsLoading(false));
  }, []);

  return (
  <section id="about" className="py-20 md:py-32 relative section-glow overflow-hidden">
    {/* Abstract background blobs for extra interactivity feel */}
    <div className="absolute top-1/4 left-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl opacity-50 mix-blend-multiply pointer-events-none" />
    <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl opacity-50 mix-blend-multiply pointer-events-none" />

    <div className="relative z-10 mx-auto w-full max-w-[1320px] px-4 sm:px-6">
      <div className="flex flex-col items-center justify-center text-center mb-16">
        <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-gradient-to-br from-primary/20 to-primary/5 border border-primary/30 flex items-center justify-center mb-6 shadow-[0_0_30px_rgba(249,115,22,0.15)] ring-1 ring-white/10 relative group cursor-default">
          <CarFront className="w-8 h-8 sm:w-10 sm:h-10 text-primary transition-transform duration-700 ease-out group-hover:scale-110 group-hover:rotate-12" strokeWidth={1.8} />
          <div className="absolute inset-0 rounded-2xl animate-ping opacity-20 bg-primary/40" style={{ animationDuration: '3s' }}/>
        </div>
        
        <h2 className="text-xl sm:text-2xl md:text-[34px] font-extrabold tracking-[0.2em] uppercase text-transparent bg-clip-text bg-gradient-to-r from-foreground via-foreground/80 to-foreground relative inline-block">
          WHY CHOOSE US
          <div className="absolute bottom-[-10px] left-1/2 -translate-x-1/2 w-12 h-1 bg-primary rounded-full" />
        </h2>
      </div>

      <div className="flex justify-center mb-16 md:mb-20">
        <div className="grid grid-cols-1 sm:grid-cols-3 glass rounded-3xl border border-border/70 overflow-hidden shadow-xl">
          {metricsLoading ? (
            // Skeleton loader while fetching backend data
            [...Array(3)].map((_, i) => (
              <div
                key={`skel-${i}`}
                className={`relative overflow-hidden px-6 md:px-10 py-8 sm:py-10 text-center sm:text-left sm:min-w-[260px] border-border/70 ${i < 2 ? "border-b sm:border-b-0 sm:border-r" : ""}`}
              >
                <div className="flex items-center justify-center sm:justify-start gap-4">
                  <div className="w-7 h-7 rounded bg-muted/40 animate-pulse" />
                  <div className="h-10 w-32 rounded bg-muted/40 animate-pulse" />
                </div>
                <div className="w-12 h-1 bg-muted/40 my-4 mx-auto sm:mx-0 rounded-full animate-pulse" />
                <div className="h-4 w-40 rounded bg-muted/40 animate-pulse" />
              </div>
            ))
          ) : metrics.length > 0 ? (
            metrics.map((metric, i) => {
              const IconComp = metricIcons[i % metricIcons.length];
              return (
              <div
                key={metric.id}
                className={`group/metric relative overflow-hidden px-6 md:px-10 py-8 sm:py-10 text-center sm:text-left sm:min-w-[260px] border-border/70 transition-all duration-300 hover:bg-muted/30 ${i < metrics.length - 1 ? "border-b sm:border-b-0 sm:border-r" : ""}`}
              >
                {/* Metric Hover Glow */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/5 to-transparent -translate-x-full group-hover/metric:translate-x-full transition-transform duration-1000 ease-in-out" />
                
                <div className="relative z-10 flex items-center justify-center sm:justify-start gap-4 transition-transform duration-500 group-hover/metric:translate-x-2">
                  <IconComp className="w-7 h-7 text-primary transition-all duration-500 group-hover/metric:-translate-y-1 group-hover/metric:scale-110 group-hover/metric:drop-shadow-md" />
                  <p className="text-[36px] md:text-[46px] leading-none font-black text-primary tracking-tighter drop-shadow-sm">{metric.value}</p>
                </div>
                <div className="relative z-10 w-12 h-1 bg-primary/60 my-4 mx-auto sm:mx-0 transition-all duration-500 group-hover/metric:w-20 group-hover/metric:bg-primary rounded-full" />
                <p className="relative z-10 text-xs sm:text-sm tracking-widest text-muted-foreground uppercase font-semibold transition-colors duration-300 group-hover/metric:text-foreground">{metric.label}</p>
              </div>
              );
            })
          ) : null}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 sm:gap-8">
        {highlights.map((item) => (
          <article
            key={item.title}
            className="group relative h-[320px] sm:h-[380px] overflow-hidden rounded-3xl border border-border/40 cursor-default shadow-lg"
          >
            {/* Animated Background Image */}
            <div 
              className="absolute inset-0 transition-transform duration-1000 ease-out group-hover:scale-110"
              style={{
                backgroundImage: `url(${item.image})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            />
            
            {/* Dark gradient overlay that shifts on hover */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/50 to-black/10 transition-opacity duration-700 group-hover:opacity-90" />

            {/* Content Container - slides up slightly on hover */}
            <div className="absolute inset-0 z-10 p-6 md:p-8 flex flex-col justify-end items-center text-center transition-transform duration-700 ease-out group-hover:-translate-y-2">
              
              {/* Icon Bubble - floats up and glows */}
              <div className="w-16 h-16 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center mb-6 transition-all duration-700 ease-out group-hover:-translate-y-4 group-hover:bg-primary/30 group-hover:border-primary/50 group-hover:shadow-[0_0_25px_rgba(249,115,22,0.4)]">
                <item.icon className="w-8 h-8 text-white transition-transform duration-700 group-hover:scale-110 group-hover:text-primary" strokeWidth={1.5} />
              </div>

              {/* Title */}
              <h3 className="text-lg md:text-xl font-extrabold uppercase tracking-widest text-white mb-2 leading-tight transition-transform duration-500">{item.title}</h3>
              
              {/* Animated Underline */}
              <div className="w-12 h-[3px] bg-primary transition-all duration-500 group-hover:w-24 group-hover:bg-amber-400 rounded-full" />
              
              {/* Hidden Description (Expands seamlessly) */}
              <div className="grid grid-rows-[0fr] group-hover:grid-rows-[1fr] transition-[grid-template-rows] duration-700 ease-in-out w-full">
                <div className="overflow-hidden">
                  <p className="text-sm font-medium text-gray-300 leading-relaxed pt-5 opacity-0 group-hover:opacity-100 transition-opacity duration-700 delay-100">
                    {item.desc}
                  </p>
                </div>
              </div>
            </div>
            
            {/* Quick sweeping light effect on initial hover */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-10 pointer-events-none transition-opacity duration-1000 bg-gradient-to-tr from-transparent via-white to-transparent -translate-x-full group-hover:translate-x-full ease-in-out" style={{ transitionDuration: '1.5s' }} />
          </article>
        ))}
      </div>
    </div>
  </section>
  );
};

export default AboutSection;
