import { lazy, Suspense } from "react";
import Navbar from "@/components/Navbar";
import HeroCarousel from "@/components/HeroCarousel";
import { Seo } from "@/components/seo/Seo";
import { StructuredData } from "@/components/seo/StructuredData";
import FloatingCallButton from "@/components/FloatingCallButton";

const ServicesSection = lazy(() => import("@/components/ServicesSection"));
const AboutSection = lazy(() => import("@/components/AboutSection"));
const ProcessSection = lazy(() => import("@/components/ProcessSection"));
const ServicesBentoSection = lazy(() => import("@/components/ServicesBentoSection"));
const AccreditationsSection = lazy(() => import("@/components/AccreditationsSection"));

const Footer = lazy(() => import("@/components/Footer"));

const SectionFallback = () => <div className="h-24" aria-hidden="true" />;

const Index = () => (
  <>
    <Seo
      title="International Moving and Freight Services"
      description="JAF Logistics is an international moving company offering air freight, sea freight, road transport, office relocation, and secure storage solutions."
      path="/"
      image="/brand/jaf-logo.png"
    />
    <StructuredData />
    <Navbar />
    <main className="min-h-screen">
      <h1 className="sr-only">JAF Logistics international moving, relocation, and freight services</h1>
      <HeroCarousel />
      <Suspense fallback={<SectionFallback />}>
        <ServicesSection />
        <AboutSection />
        <ProcessSection />
        <ServicesBentoSection />
        <AccreditationsSection />

        <Footer />
      </Suspense>
    </main>
    <FloatingCallButton />
  </>
);

export default Index;
