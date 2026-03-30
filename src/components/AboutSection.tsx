import { BadgeCheck, CarFront, Headset, Ship, Truck, Umbrella, Warehouse } from "lucide-react";
import heroAir from "@/assets/hero-air.jpg";
import heroRoad from "@/assets/hero-road.jpg";
import heroSea from "@/assets/hero-sea.jpg";

const metrics = [
  { icon: Umbrella, value: "+30000", label: "Moves performed" },
  { icon: Warehouse, value: "4500M2", label: "Storage Facilities" },
  { icon: Ship, value: "65", label: "Years in Business" },
];

const highlights = [
  {
    icon: Warehouse,
    title: "Secured Storage Facilities",
    image: heroSea,
  },
  {
    icon: Truck,
    title: "Professional Movers",
    image: heroRoad,
  },
  {
    icon: Headset,
    title: "Experienced Move Coordinators",
    image: heroAir,
  },
  {
    icon: BadgeCheck,
    title: "Worldwide Accreditation",
    image: heroSea,
  },
];

const AboutSection = () => (
  <section id="about" className="py-24 md:py-28 relative section-glow">
    <div className="mx-auto w-full max-w-[1320px] px-4 sm:px-6">
      <h2 className="text-center text-2xl md:text-[30px] font-extrabold tracking-wide mb-3">WHY CHOOSE US</h2>

      <div className="flex justify-center mb-8 md:mb-10">
        <div className="w-16 h-16 rounded-full bg-primary/10 border border-primary/30 flex items-center justify-center">
          <CarFront className="w-8 h-8 text-primary" strokeWidth={1.9} />
        </div>
      </div>

      <div className="flex justify-center mb-10 md:mb-12">
        <div className="grid grid-cols-1 sm:grid-cols-3 glass rounded-2xl border border-border/70 overflow-hidden">
          {metrics.map((metric, i) => (
            <div
              key={metric.label}
              className={`px-6 md:px-8 py-5 text-center sm:text-left sm:min-w-[220px] ${i < metrics.length - 1 ? "sm:border-r sm:border-border/70" : ""}`}
            >
              <div className="flex items-center justify-center sm:justify-start gap-2">
                <metric.icon className="w-4 h-4 text-primary" />
                <p className="text-[42px] leading-none font-black text-primary tracking-tight">{metric.value}</p>
              </div>
              <div className="w-10 h-0.5 bg-primary my-2 mx-auto sm:mx-0" />
              <p className="text-[11px] tracking-wide text-muted-foreground">{metric.label}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
        {highlights.map((item) => (
          <article
            key={item.title}
            className="relative min-h-[260px] md:min-h-[300px] overflow-hidden rounded-2xl border border-border/70"
            style={{
              backgroundImage: `linear-gradient(180deg, rgba(7, 22, 42, 0.58) 0%, rgba(3, 10, 22, 0.92) 100%), url(${item.image})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            <div className="absolute inset-0 bg-background/35" />
            <div className="relative z-10 h-full flex flex-col items-center justify-end px-6 pb-8 pt-8 text-center text-white">
              <div className="w-16 h-16 rounded-full bg-primary/15 border border-primary/40 flex items-center justify-center mb-6">
                <item.icon className="w-8 h-8 text-primary" strokeWidth={2} />
              </div>
              <h3 className="text-sm md:text-lg font-extrabold uppercase tracking-wide">{item.title}</h3>
              <div className="w-10 h-px bg-primary/90 mt-3" />
            </div>
          </article>
        ))}
      </div>
    </div>
  </section>
);

export default AboutSection;
