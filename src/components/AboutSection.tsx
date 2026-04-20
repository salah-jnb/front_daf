import { useEffect, useState } from "react";
import { BadgeCheck, CarFront, Headset, Ship, Truck, Umbrella, Warehouse } from "lucide-react";
import { useTranslation } from "react-i18next";
import { AnimatedCounter } from "@/components/AnimatedCounter";
import heroAir from "@/assets/hero-air.webp";
import heroRoad from "@/assets/hero-road.webp";
import heroSea from "@/assets/hero-sea.webp";

// Icon pool used to cycle through for dynamically loaded metrics
const metricIcons = [Umbrella, Warehouse, Ship, Truck, Headset, BadgeCheck];

const getHighlights = (t: any) => [
  {
    icon: Warehouse,
    title: t('about.highlights.storage.title', "Secure Storage Facilities"),
    desc: t('about.highlights.storage.desc', "Climate-controlled units monitored 24/7 to safeguard your most valuable assets and inventory."),
    image: heroSea,
  },
  {
    icon: Truck,
    title: t('about.highlights.movers.title', "Professional Movers"),
    desc: t('about.highlights.movers.desc', "A rigorously trained team devoted to handling your belongings with the utmost care and precision."),
    image: heroRoad,
  },
  {
    icon: Headset,
    title: t('about.highlights.coordinators.title', "Dedicated Coordinators"),
    desc: t('about.highlights.coordinators.desc', "Your personal moving assistant managing every detail from door to door for total peace of mind."),
    image: heroAir,
  },
  {
    icon: BadgeCheck,
    title: t('about.highlights.accreditation.title', "Worldwide Accreditation"),
    desc: t('about.highlights.accreditation.desc', "Certified by top global logistics networks, guaranteeing international quality standards."),
    image: heroSea,
  },
];

const AboutSection = () => {
  const { t } = useTranslation();
  const [metrics, setMetrics] = useState<{ id: number; value: string; label: string; icon: any }[]>([]);
  const [metricsLoading, setMetricsLoading] = useState(true);

  useEffect(() => {
    const apiUrl = import.meta.env.VITE_API_URL || "";
    fetch(`${apiUrl.replace(/\/$/, "")}/why-choose-us`)
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json();
      })
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          const stats = data[0];
          setMetrics([
            { id: 1, icon: Umbrella, value: `+${stats.movesCompleted || 30000}`, label: "Moves Completed" },
            { id: 2, icon: Warehouse, value: `${stats.secureStorageSpace || 4500} m2`, label: "Secure Storage Space" },
            { id: 3, icon: Ship, value: `${stats.yearsOfExperience || 65}`, label: "Years of Experience" },
          ]);
        } else {
          setMetrics([
            { id: 1, icon: Umbrella, value: "+30000", label: "Moves Completed" },
            { id: 2, icon: Warehouse, value: "4500 m2", label: "Secure Storage Space" },
            { id: 3, icon: Ship, value: "65", label: "Years of Experience" },
          ]);
        }
      })
      .catch(() => {
        // Fallback to default if there is a network error
        setMetrics([
          { id: 1, icon: Umbrella, value: "+30000", label: "Moves Completed" },
          { id: 2, icon: Warehouse, value: "4500 m2", label: "Secure Storage Space" },
          { id: 3, icon: Ship, value: "65", label: "Years of Experience" },
        ]);
      })
      .finally(() => setMetricsLoading(false));
  }, []);

  return (
  <section id="about" className="py-12 md:py-16 relative overflow-hidden bg-[#0f2044] text-[#cbd5e1] border-y border-white/5">
    {/* Abstract background blobs for extra interactivity feel */}
    <div className="absolute top-1/4 left-0 w-96 h-96 bg-primary/20 rounded-full blur-[120px] mix-blend-screen pointer-events-none" />
    <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-blue-500/20 rounded-full blur-[120px] mix-blend-screen pointer-events-none" />

    <div className="relative z-10 mx-auto w-full max-w-[1320px] px-4 sm:px-6">
      <div className="flex flex-col items-center justify-center text-center mb-8 md:mb-12">
        <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-[#0f2044] border border-blue-400/30 flex items-center justify-center mb-6 shadow-lg shadow-blue-900/40 ring-1 ring-white/10 relative group cursor-default">
          <CarFront className="w-8 h-8 sm:w-10 sm:h-10 text-blue-400 transition-transform duration-700 ease-out group-hover:scale-110 group-hover:-rotate-6" strokeWidth={1.8} />
          <div className="absolute inset-0 rounded-2xl animate-ping opacity-20 bg-blue-400" style={{ animationDuration: '3s' }}/>
        </div>
        
        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold tracking-widest uppercase text-white relative inline-block drop-shadow-md">
          {t('about.whyChooseUs', 'WHY CHOOSE US')}
          <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-16 h-1 bg-gradient-to-r from-blue-400 to-primary rounded-full shadow-sm" />
        </h2>
      </div>

      <div className="flex justify-center mb-8 md:mb-12 relative">
        <div className="grid grid-cols-1 sm:grid-cols-3 bg-white/5 backdrop-blur-3xl rounded-[2rem] border border-white/10 overflow-hidden shadow-2xl shadow-black/40 w-full max-w-5xl">
          {metricsLoading ? (
            // Skeleton loader while fetching backend data
            [...Array(3)].map((_, i) => (
              <div
                key={`skel-${i}`}
                className={`relative overflow-hidden px-4 md:px-8 py-6 sm:py-8 text-center sm:text-left sm:min-w-[260px] border-white/10 ${i < 2 ? "border-b sm:border-b-0 sm:border-r" : ""}`}
              >
                <div className="flex items-center justify-center sm:justify-start gap-4">
                  <div className="w-8 h-8 rounded-full bg-white/10 animate-pulse" />
                  <div className="h-12 w-32 rounded bg-white/10 animate-pulse" />
                </div>
                <div className="w-12 h-1.5 bg-white/10 my-4 mx-auto sm:mx-0 rounded-full animate-pulse" />
                <div className="h-4 w-40 rounded bg-white/10 mx-auto sm:mx-0 animate-pulse" />
              </div>
            ))
          ) : metrics.map((metric, i) => {
              const IconComp = metric.icon;
              return (
              <div
                key={metric.id}
                className={`group/metric relative overflow-hidden px-4 md:px-8 py-6 sm:py-8 text-center sm:text-left border-white/10 transition-all duration-500 hover:bg-white/5 ${i < metrics.length - 1 ? "border-b sm:border-b-0 sm:border-r" : ""}`}
              >
                {/* Metric Hover Glow */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-blue-400/10 to-transparent -translate-x-full group-hover/metric:translate-x-full transition-transform duration-1000 ease-in-out" />
                
                <div className="relative z-10 flex flex-col sm:flex-row items-center justify-center sm:justify-start gap-4 transition-transform duration-500 group-hover/metric:translate-x-2">
                  <div className="p-3 bg-blue-900/30 rounded-xl mb-2 sm:mb-0 shadow-sm border border-blue-400/20 transition-all duration-500 group-hover/metric:bg-blue-600/60 group-hover/metric:border-blue-400/50">
                    <IconComp className="w-6 h-6 text-blue-300 transition-all duration-500 group-hover/metric:text-white group-hover/metric:scale-110" />
                  </div>
                  <p className="text-[24px] md:text-[32px] leading-none font-extrabold font-['Outfit'] text-white tracking-tight drop-shadow-sm">
                    <AnimatedCounter value={metric.value} duration={3000} />
                  </p>
                </div>
                <div className="relative z-10 w-12 h-1.5 bg-white/10 my-4 mx-auto sm:mx-0 transition-all duration-500 group-hover/metric:w-24 group-hover/metric:bg-blue-400 rounded-full" />
                <p className="relative z-10 text-[13px] sm:text-[15px] tracking-[0.1em] text-blue-200 uppercase font-bold transition-colors duration-300 group-hover/metric:text-white">
                  {metric.id === 1 ? t('about.metrics.moves', metric.label) : 
                   metric.id === 2 ? t('about.metrics.space', metric.label) : 
                   metric.id === 3 ? t('about.metrics.years', metric.label) : 
                   metric.label}
                </p>
              </div>
              );
            })}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 sm:gap-8">
        {getHighlights(t).map((item) => (
          <article
            key={item.title}
            className="group relative h-[260px] sm:h-[300px] overflow-hidden rounded-3xl border border-border/40 cursor-default shadow-lg"
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
              <h3 className="text-base md:text-lg font-bold uppercase tracking-wider text-white mb-2 leading-tight transition-transform duration-500">{item.title}</h3>
              
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
