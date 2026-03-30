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
    description: "End-to-end international relocation for households and companies, from export packing to final delivery.",
  },
  {
    icon: PawPrint,
    title: "Pet Relocation",
    description: "Safe pet moving services with documentation support, route planning, and welfare-first handling.",
  },
  {
    icon: Building2,
    title: "Office Moving",
    description: "Professional office relocation planned to reduce downtime and keep business operations running smoothly.",
  },
  {
    icon: CarFront,
    title: "Car Shipping",
    description: "Door-to-door vehicle shipping with secure handling for domestic and international routes.",
  },
  {
    icon: Truck,
    title: "National Moving",
    description: "Reliable domestic moving services for apartments, houses, and corporate spaces.",
  },
  {
    icon: Palette,
    title: "Fine Art",
    description: "Specialized packing and transport for artworks, antiques, and fragile high-value items.",
  },
  {
    icon: Archive,
    title: "Storage Solutions",
    description: "Flexible short and long-term storage in secure, monitored facilities.",
  },
];

const ServicesSection = () => (
  <section id="services" className="py-20 md:py-32 relative section-glow">
    <div className="container mx-auto px-4 sm:px-6">
      <div className="text-center max-w-2xl mx-auto mb-12 md:mb-20">
        <p className="text-primary font-semibold text-xs sm:text-sm uppercase tracking-[0.24em] sm:tracking-[0.3em] mb-3 sm:mb-4">
          Moving and Freight Services
        </p>
        <h2 className="text-3xl md:text-5xl font-bold mb-4 sm:mb-6 leading-tight">
          Complete <span className="gradient-text">Relocation Solutions</span>
        </h2>
        <p className="text-muted-foreground text-base sm:text-lg">
          From local moving to global freight, we deliver secure, tailored logistics for homes, offices, and specialized cargo.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {services.map((service, i) => (
          <div
            key={i}
            className="group glass rounded-2xl p-5 sm:p-8 hover:border-primary/30 transition-all duration-500 hover:-translate-y-1"
          >
            <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-4 sm:mb-6 group-hover:bg-primary/20 transition-colors duration-300">
              <service.icon className="w-6 h-6 sm:w-7 sm:h-7 text-primary" />
            </div>
            <h3 className="text-lg sm:text-xl font-bold mb-2 sm:mb-3">{service.title}</h3>
            <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">{service.description}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default ServicesSection;
