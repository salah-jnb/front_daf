import Navbar from "@/components/Navbar";
import HeroCarousel from "@/components/HeroCarousel";
import ServicesSection from "@/components/ServicesSection";
import AboutSection from "@/components/AboutSection";
import ProcessSection from "@/components/ProcessSection";
import ServicesBentoSection from "@/components/ServicesBentoSection";
import AccreditationsSection from "@/components/AccreditationsSection";
import ContactSection from "@/components/ContactSection";
import SponsorSection from "@/components/SponsorSection";
import Footer from "@/components/Footer";

const Index = () => (
  <div className="min-h-screen">
    <Navbar />
    <HeroCarousel />
    <ServicesSection />
    <AboutSection />
    <ProcessSection />
    <ServicesBentoSection />
    <ContactSection />
    <AccreditationsSection />
    <SponsorSection />
    <Footer />
  </div>
);

export default Index;
