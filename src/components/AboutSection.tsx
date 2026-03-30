import { BadgeCheck, CarFront, Headset, Ship, Truck, Umbrella, Warehouse } from "lucide-react";
import heroAir from "@/assets/hero-air.jpg";
import heroRoad from "@/assets/hero-road.jpg";
import heroSea from "@/assets/hero-sea.jpg";

const metrics = [
  { icon: Umbrella, value: "+30000", label: "Moves Completed" },
  { icon: Warehouse, value: "4500 m2", label: "Secure Storage Space" },
  { icon: Ship, value: "65", label: "Years of Experience" },
];

const highlights = [
  {
    icon: Warehouse,
    title: "Secure Storage Facilities",
    image: heroSea,
  },
  {
    icon: Truck,
    title: "Professional Movers",
    image: heroRoad,
  },
  {
    icon: Headset,
    title: "Dedicated Move Coordinators",
    image: heroAir,
  },
  {
    icon: BadgeCheck,
    title: "Worldwide Accreditation",
    image: heroSea,
  },
];

const AboutSection = () => (
  <section id="about" className="py-20 md:py-28 relative section-glow">
    <div className="mx-auto w-full max-w-[1320px] px-4 sm:px-6">
      <h2 className="text-center text-xl sm:text-2xl md:text-[30px] font-extrabold tracking-[0.03em] sm:tracking-wide mb-3">
        WHY CHOOSE US
      </h2>

      <div className="flex justify-center mb-6 sm:mb-8 md:mb-10">
        <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-primary/10 border border-primary/30 flex items-center justify-center">
          <CarFront className="w-7 h-7 sm:w-8 sm:h-8 text-primary" strokeWidth={1.9} />
        </div>
      </div>

      <div className="flex justify-center mb-8 sm:mb-10 md:mb-12">
        <div className="grid grid-cols-1 sm:grid-cols-3 glass rounded-2xl border border-border/70 overflow-hidden">
          {metrics.map((metric, i) => (
            <div
              key={metric.label}
              className={`px-4 sm:px-6 md:px-8 py-4 sm:py-5 text-center sm:text-left sm:min-w-[220px] border-border/70 ${i < metrics.length - 1 ? "border-b sm:border-b-0 sm:border-r" : ""}`}
            >
              <div className="flex items-center justify-center sm:justify-start gap-2">
                <metric.icon className="w-4 h-4 text-primary" />
                <p className="text-[34px] sm:text-[42px] leading-none font-black text-primary tracking-tight">{metric.value}</p>
              </div>
              <div className="w-10 h-0.5 bg-primary my-2 mx-auto sm:mx-0" />
              <p className="text-xs sm:text-[11px] tracking-wide text-muted-foreground">{metric.label}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 sm:gap-6">
        {highlights.map((item) => (
          <article
            key={item.title}
            className="relative min-h-[220px] sm:min-h-[260px] md:min-h-[300px] overflow-hidden rounded-2xl border border-border/70"
            style={{
              backgroundImage: `linear-gradient(180deg, rgba(7, 22, 42, 0.58) 0%, rgba(3, 10, 22, 0.92) 100%), url(${item.image})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            <div className="absolute inset-0 bg-background/35" />
            <div className="relative z-10 h-full flex flex-col items-center justify-end px-5 sm:px-6 pb-6 sm:pb-8 pt-6 sm:pt-8 text-center text-white">
              <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-primary/15 border border-primary/40 flex items-center justify-center mb-4 sm:mb-6">
                <item.icon className="w-7 h-7 sm:w-8 sm:h-8 text-primary" strokeWidth={2} />
              </div>
              <h3 className="text-sm sm:text-base md:text-lg font-extrabold uppercase tracking-wide">{item.title}</h3>
              <div className="w-10 h-px bg-primary/90 mt-3" />
            </div>
          </article>
        ))}
      </div>
    </div>
  </section>
);

export default AboutSection;
