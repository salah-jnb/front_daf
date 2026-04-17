const siteUrl = import.meta.env.VITE_SITE_URL || "https://jaf-logistics.com";

const structuredData = {
  "@context": "https://schema.org",
  "@type": "MovingCompany",
  "name": "JAF Logistics",
  "url": siteUrl,
  "logo": `${siteUrl}/brand/jaf-logo.webp`,
  "image": `${siteUrl}/brand/jaf-logo.webp`,
  "description": "JAF Logistics is a premium international moving company providing global relocation, air freight, sea freight, road transport, and secure storage solutions.",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "37, Rue Idriss Al Akbar N 3, Hassan",
    "addressLocality": "Rabat",
    "postalCode": "10020",
    "addressCountry": "MA"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": "34.0208",
    "longitude": "-6.8361"
  },
  "telephone": "+21612345678",
  "openingHoursSpecification": [
    {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday"
      ],
      "opens": "08:00",
      "closes": "18:00"
    }
  ],
  "areaServed": [
    {
      "@type": "Country",
      "name": "Tunisia"
    },
    {
      "@type": "Country",
      "name": "Morocco"
    },
    {
      "@type": "Country",
      "name": "Worldwide"
    }
  ],
  "hasOfferCatalog": {
    "@type": "OfferCatalog",
    "name": "Moving and Logistics Services",
    "itemListElement": [
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "International Moving"
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Office Relocation"
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Car Shipping"
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Pet Relocation"
        }
      }
    ]
  }
};

export const StructuredData = () => (
  <script
    type="application/ld+json"
    dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
  />
);
