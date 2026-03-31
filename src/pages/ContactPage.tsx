import { lazy, Suspense } from "react";
import Navbar from "@/components/Navbar";
import { Seo } from "@/components/seo/Seo";
import FloatingCallButton from "@/components/FloatingCallButton";

const ContactSection = lazy(() => import("@/components/ContactSection"));
const Footer = lazy(() => import("@/components/Footer"));

const SectionFallback = () => <div className="h-24" aria-hidden="true" />;

const ContactPage = () => (
  <>
    <Seo
      title="Contact Us | JAF Logistics"
      description="Get in touch with JAF Logistics for international moving, relocation, and freight services. Request a free quote today."
      path="/contact"
      image="/brand/jaf-logo.png"
    />
    <Navbar />
    <main className="min-h-screen pt-24" style={{ background: "hsl(var(--background))" }}>
      <Suspense fallback={<SectionFallback />}>
        <ContactSection />
        <Footer />
      </Suspense>
    </main>
    <FloatingCallButton />
  </>
);

export default ContactPage;
