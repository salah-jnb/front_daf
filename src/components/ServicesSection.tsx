import {
  Archive,
  Building2,
  CarFront,
  Globe2,
  Palette,
  PawPrint,
  Truck,
} from "lucide-react";

const services = [
  {
    icon: Globe2,
    title: "International Moving",
    description: "Cross-border household and corporate relocations handled from packing to final delivery.",
  },
  {
    icon: PawPrint,
    title: "Pet Relocation",
    description: "Safe pet transport services with route planning, documentation support, and welfare-first care.",
  },
  {
    icon: Building2,
    title: "Office Moving",
    description: "Business relocation tailored to minimize downtime and keep your operations running smoothly.",
  },
  {
    icon: CarFront,
    title: "Car Shipping",
    description: "Door-to-door vehicle transport with secure handling for local, national, and international routes.",
  },
  {
    icon: Truck,
    title: "National Moving",
    description: "Reliable domestic moving solutions for apartments, houses, and corporate spaces.",
  },
  {
    icon: Palette,
    title: "Fine Art",
    description: "Specialized packing, handling, and transportation for artworks and fragile high-value pieces.",
  },
  {
    icon: Archive,
    title: "Storage Solutions",
    description: "Flexible short and long-term storage options in secure and monitored facilities.",
  },
];

const ServicesSection = () => (
  <section id="services" className="py-32 relative section-glow">
    <div className="container mx-auto px-6">
      <div className="text-center max-w-2xl mx-auto mb-20">
        <p className="text-primary font-semibold text-sm uppercase tracking-[0.3em] mb-4">
          What We Offer
        </p>
        <h2 className="text-4xl md:text-5xl font-bold mb-6">
          Comprehensive <span className="gradient-text">Moving Services</span>
        </h2>
        <p className="text-muted-foreground text-lg">
          From local moves to international relocation, our team delivers secure and tailored services for every need.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {services.map((service, i) => (
          <div
            key={i}
            className="group glass rounded-2xl p-8 hover:border-primary/30 transition-all duration-500 hover:-translate-y-1"
          >
            <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors duration-300">
              <service.icon className="w-7 h-7 text-primary" />
            </div>
            <h3 className="text-xl font-bold mb-3">{service.title}</h3>
            <p className="text-muted-foreground leading-relaxed">{service.description}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default ServicesSection;
