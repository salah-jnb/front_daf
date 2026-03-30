import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import movingImage from "@/assets/moving.jpeg";
import officeMoveImage from "@/assets/OfficeMove.jpeg";
import carShippingImage from "@/assets/CarShipping.jpeg";
import storageImage from "@/assets/storage.jpeg";
import fineArtImage from "@/assets/finArt.jpeg";
import petRelocationImage from "@/assets/petRelocation.webp";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

type ServiceItem = {
  title: string;
  description: string;
  image: string;
};

const services: ServiceItem[] = [
  {
    title: "Moving",
    description:
      "From first contact to unloading, JAF plans every detail: no-cost estimate, careful packing, labeling, transport, unpacking, and debris removal for a stress-free move.",
    image: movingImage,
  },
  {
    title: "Office Move",
    description:
      "Dedicated supervisors and trained teams handle full office relocation, IT disconnect/reconnect, asset tracking, furniture setup, and space planning with minimal downtime.",
    image: officeMoveImage,
  },
  {
    title: "Car Shipping",
    description:
      "Door-to-door vehicle shipping with direct home pickup and delivery, pre-move condition checks, and optional storage when needed.",
    image: carShippingImage,
  },
  {
    title: "Storage",
    description:
      "Flexible short and long-term storage options in monitored facilities, with organized handling to keep goods accessible and secure.",
    image: storageImage,
  },
  {
    title: "Fine Art",
    description:
      "Specialized Fine Art crews use object-specific packing techniques and continuous training to protect fragile pieces by nature, age, and transport mode.",
    image: fineArtImage,
  },
  {
    title: "Pet Relocation",
    description:
      "Worldwide pet moves with boarding coordination, export permits, vet support, customs assistance, and high-quality kennels to reduce stress.",
    image: petRelocationImage,
  },
];

const ServiceSlideCard = ({ title, description, image }: ServiceItem) => (
  <article
    className="group relative overflow-hidden rounded-3xl border border-border/70 min-h-[430px]"
  >
    <div
      className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
      style={{ backgroundImage: `url(${image})` }}
    />
    <div className="absolute inset-0 bg-gradient-to-t from-background via-background/75 to-background/25" />

    <div className="relative z-10 h-full p-6 md:p-7 flex flex-col justify-end">
      <h3 className="text-2xl md:text-3xl font-extrabold text-foreground mb-3">{title}</h3>
      <p className="text-sm md:text-base text-muted-foreground leading-relaxed max-w-[58ch]">{description}</p>
    </div>
  </article>
);

const ServicesBentoSection = () => (
  <section id="services-bento" className="py-24 relative section-glow">
    <div className="container mx-auto px-6">
      <div className="text-center max-w-3xl mx-auto mb-14">
        <p className="text-primary font-semibold text-sm uppercase tracking-[0.3em] mb-4">Service Overview</p>
        <h2 className="text-4xl md:text-5xl font-bold mb-5">
          Explore Our <span className="gradient-text">Relocation Expertise</span>
        </h2>
        <p className="text-muted-foreground text-lg">
          A visual snapshot of JAF services across household moving, office relocation, vehicle transport, storage,
          fine art handling, and pet relocation.
        </p>
      </div>

      <Swiper
        modules={[Autoplay, Navigation, Pagination]}
        autoplay={{ delay: 3500, disableOnInteraction: false }}
        navigation
        pagination={{ clickable: true }}
        spaceBetween={24}
        breakpoints={{
          0: { slidesPerView: 1 },
          768: { slidesPerView: 2 },
          1280: { slidesPerView: 3 },
        }}
        className="[&_.swiper-button-next]:text-primary [&_.swiper-button-prev]:text-primary [&_.swiper-button-next]:scale-75 [&_.swiper-button-prev]:scale-75 [&_.swiper-pagination-bullet]:bg-muted-foreground [&_.swiper-pagination-bullet-active]:bg-primary [&_.swiper-pagination]:mt-8"
      >
        {services.map((service) => (
          <SwiperSlide key={service.title}>
            <ServiceSlideCard {...service} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  </section>
);

export default ServicesBentoSection;
