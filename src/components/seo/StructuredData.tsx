import { Helmet } from "react-helmet-async";

const siteUrl = import.meta.env.VITE_SITE_URL || "https://example.com";

const structuredData = {
  "@context": "https://schema.org",
  "@type": "MovingCompany",
  name: "JAF Logistics",
  url: siteUrl,
  description:
    "International moving company providing relocation, air freight, sea freight, road transport, and secure storage services.",
  areaServed: "Worldwide",
  sameAs: [],
};

export const StructuredData = () => (
  <Helmet>
    <script type="application/ld+json">{JSON.stringify(structuredData)}</script>
  </Helmet>
);
