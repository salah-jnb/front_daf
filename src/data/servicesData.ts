// ─── Asset imports ────────────────────────────────────────────────────────────
import carShipping from "@/assets/CarShipping.jpeg";
import officeMove from "@/assets/OfficeMove.jpeg";
import fineArt from "@/assets/finArt.jpeg";
import heroAir from "@/assets/hero-air.jpg";
import heroRoad from "@/assets/hero-road.jpg";
import heroSea from "@/assets/hero-sea.jpg";
import intlMoving from "@/assets/internationalmoving.png";
import moving from "@/assets/moving.jpeg";
import petReloc from "@/assets/petRelocation.webp";
import petReloc2 from "@/assets/petrelocatio.png";
import storage from "@/assets/storage.jpeg";
import carShipping2 from "@/assets/carshiping.jpeg";


export type ServiceData = {
  slug: string;
  title: string;
  subtitle: string;
  description: string;           // short card text
  longDescription: string;       // full page body
  gradient: string;              // tailwind gradient classes
  glow: string;                  // rgba glow for card
  color: string;                 // accent hex used on detail page
  images: string[];              // gallery images
  features: string[];
  seo: {
    title: string;
    description: string;
    keywords: string;
  };
};

export const SERVICES: ServiceData[] = [
  {
    slug: "international-moving",
    title: "International Moving",
    subtitle: "Door-to-door relocation across borders",
    description:
      "End-to-end international relocation for households and companies, from export packing to final delivery.",
    longDescription:
      "JAF Logistics provides comprehensive international moving services tailored to households, expatriates, and corporations. We handle customs clearance, export packing, volume estimations, and door-to-door delivery across more than 50 countries. Our team of certified move managers coordinates every step so you can focus on your new beginning.",
    gradient: "from-blue-500 to-cyan-400",
    glow: "rgba(59,130,246,0.25)",
    color: "#3b82f6",
    images: [intlMoving, heroSea, moving],
    features: [
      "Full-service packing & crating",
      "Customs documentation & clearance",
      "Real-time shipment tracking",
      "Marine & transit insurance",
      "Destination agent network in 50+ countries",
      "Dedicated move coordinator",
    ],
    seo: {
      title: "International Moving Services | JAF Logistics",
      description:
        "Professional international moving and relocation services for households and businesses. JAF Logistics offers door-to-door service, customs clearance, and expert packing across 50+ countries.",
      keywords:
        "international moving, overseas relocation, household moving, corporate relocation, customs clearance, JAF Logistics",
    },
  },
  {
    slug: "pet-relocation",
    title: "Pet Relocation",
    subtitle: "Safe, stress-free moves for your furry family",
    description:
      "Safe pet moving services with documentation support, route planning, and welfare-first handling.",
    longDescription:
      "Moving your pet internationally requires specialized knowledge of veterinary entry requirements, airline regulations, and quarantine rules. JAF Logistics coordinates health certificates, CITES permits when needed, approved crate sizing, and door-to-door care so your animals travel as safely and comfortably as possible.",
    gradient: "from-emerald-500 to-teal-400",
    glow: "rgba(16,185,129,0.25)",
    color: "#10b981",
    images: [petReloc, petReloc2, heroRoad],
    features: [
      "Veterinary health certificate assistance",
      "Airline-approved crate supply",
      "Quarantine & import permit management",
      "Microchip & vaccination coordination",
      "Door-to-door pet delivery",
      "24/7 welfare monitoring",
    ],
    seo: {
      title: "Pet Relocation Services | JAF Logistics",
      description:
        "Stress-free international pet relocation services. JAF Logistics handles health certificates, permits, crates, and airline coordination so your pets arrive safe and happy.",
      keywords:
        "pet relocation, animal transport, international pet moving, dog shipping, cat relocation, pet import export, JAF Logistics",
    },
  },
  {
    slug: "office-moving",
    title: "Office Moving",
    subtitle: "Minimise downtime, maximise efficiency",
    description:
      "Professional office relocation planned to reduce downtime and keep business operations running smoothly.",
    longDescription:
      "JAF Logistics plans and executes office relocations with minimal disruption to your business. Our project managers produce a detailed room-by-room move plan, IT equipment labelling system, and phased execution schedule. We move everything from workstations and servers to artwork and filing systems — reassembled and operational at destination.",
    gradient: "from-violet-500 to-purple-400",
    glow: "rgba(139,92,246,0.25)",
    color: "#8b5cf6",
    images: [officeMove, heroAir, heroRoad],
    features: [
      "Project management & move planning",
      "IT equipment dismantling & reassembly",
      "Furniture installation at destination",
      "After-hours & weekend moves available",
      "Secure document shredding & archiving",
      "Space planning consultancy",
    ],
    seo: {
      title: "Office Moving & Corporate Relocation | JAF Logistics",
      description:
        "Expert office moving services that minimise business downtime. JAF Logistics provides full project management, IT equipment handling, and after-hours relocation across Tunisia and internationally.",
      keywords:
        "office moving, corporate relocation, business moving, IT relocation, commercial moving, JAF Logistics",
    },
  },
  {
    slug: "car-shipping",
    title: "Car Shipping",
    subtitle: "Your vehicle delivered safely, wherever you go",
    description:
      "Door-to-door vehicle shipping with secure handling for domestic and international routes.",
    longDescription:
      "Whether you are relocating a single family car or a full fleet, JAF Logistics offers RoRo (Roll-on Roll-off) and container vehicle shipping on all major trade lanes. We handle customs paperwork, pre-shipment inspection, and final delivery with comprehensive insurance coverage at every stage.",
    gradient: "from-orange-500 to-amber-400",
    glow: "rgba(249,115,22,0.25)",
    color: "#f97316",
    images: [carShipping, carShipping2, heroRoad, heroSea],
    features: [
      "RoRo & container car shipping",
      "Pre-shipment vehicle condition report",
      "Customs export & import handling",
      "Comprehensive vehicle insurance",
      "Enclosed transport for luxury & classic cars",
      "Port-to-port or door-to-door delivery",
    ],
    seo: {
      title: "Car Shipping & Vehicle Transport | JAF Logistics",
      description:
        "Safe and insured car shipping services for international and domestic routes. JAF Logistics offers RoRo and container transport with full customs handling and door-to-door delivery.",
      keywords:
        "car shipping, vehicle transport, auto shipping, international car transport, RoRo shipping, vehicle export, JAF Logistics",
    },
  },
  {
    slug: "national-moving",
    title: "National Moving",
    subtitle: "Reliable domestic relocation across Tunisia",
    description:
      "Reliable domestic moving services for apartments, houses, and corporate spaces.",
    longDescription:
      "JAF Logistics covers the full length of Tunisia with same-day and next-day domestic moving services. Our trained crews handle furniture disassembly, protective wrapping, loading, secure transport, and in-home placement at destination. Flexible scheduling, including evenings and weekends, ensures your move fits your life.",
    gradient: "from-sky-500 to-blue-400",
    glow: "rgba(14,165,233,0.25)",
    color: "#0ea5e9",
    images: [moving, heroRoad, officeMove],
    features: [
      "Same-city & cross-country moves",
      "Furniture disassembly & reassembly",
      "Protective blanket wrapping",
      "Piano & heavy item specialists",
      "Weekend & evening availability",
      "Fixed-price quotes with no hidden fees",
    ],
    seo: {
      title: "National Moving Services in Tunisia | JAF Logistics",
      description:
        "Professional domestic moving services across all of Tunisia. JAF Logistics offers apartment, villa, and corporate moves with trained crews and affordable fixed rates.",
      keywords:
        "national moving Tunisia, domestic moving, house removal, furniture moving Tunis, JAF Logistics",
    },
  },
  {
    slug: "fine-art",
    title: "Fine Art Logistics",
    subtitle: "Expert handling for your most precious pieces",
    description:
      "Specialized packing and transport for artworks, antiques, and fragile high-value items.",
    longDescription:
      "JAF Logistics applies museum-grade packing techniques and climate-controlled transport to safeguard paintings, sculptures, antiques, and high-value collectibles. Our team is trained in ISPM-15 compliant wooden crating, acid-free archival materials, and bespoke foam fitting — ensuring your artwork arrives in perfect condition.",
    gradient: "from-pink-500 to-rose-400",
    glow: "rgba(236,72,153,0.25)",
    color: "#ec4899",
    images: [fineArt, heroAir, intlMoving],
    features: [
      "ISPM-15 certified wooden crating",
      "Acid-free & climate-stable packing materials",
      "Climate-controlled transport vehicles",
      "High-value art insurance brokerage",
      "Gallery installation services",
      "Customs ATA Carnet for temporary imports",
    ],
    seo: {
      title: "Fine Art Shipping & Logistics | JAF Logistics",
      description:
        "Specialist fine art and antique moving services with museum-grade packing, climate-controlled transport, and full insurance. JAF Logistics safeguards your most precious pieces globally.",
      keywords:
        "fine art shipping, art logistics, antique transport, museum crating, fragile item moving, high value goods, JAF Logistics",
    },
  },
  {
    slug: "storage-solutions",
    title: "Storage Solutions",
    subtitle: "Secure, monitored facilities for any duration",
    description:
      "Flexible short and long-term storage in secure, monitored facilities.",
    longDescription:
      "JAF Logistics operates secure, CCTV-monitored warehouses with 4 500 m² of racking and bulk storage space. Our facilities are climate-controlled, fire-protected, and fully insured. Whether you need short-term bridging storage during a move or long-term business inventory management, we offer flexible plans with easy access.",
    gradient: "from-indigo-500 to-blue-400",
    glow: "rgba(99,102,241,0.25)",
    color: "#6366f1",
    images: [storage, heroSea, officeMove],
    features: [
      "4 500 m² of racking & bulk storage",
      "24/7 CCTV monitoring & security",
      "Climate-controlled environment",
      "Fire suppression systems",
      "Inventory management system",
      "Flexible short-term & long-term contracts",
    ],
    seo: {
      title: "Storage Solutions & Warehouse Services | JAF Logistics",
      description:
        "Secure short and long-term storage solutions in monitored, climate-controlled facilities. JAF Logistics offers 4,500 m² of warehouse space with flexible contracts and inventory management.",
      keywords:
        "storage solutions, warehouse storage, secure storage, self storage Tunisia, commercial storage, inventory management, JAF Logistics",
    },
  },
];

export function getServiceBySlug(slug: string): ServiceData | undefined {
  return SERVICES.find((s) => s.slug === slug);
}
