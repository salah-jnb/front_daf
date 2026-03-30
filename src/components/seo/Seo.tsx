import { Helmet } from "react-helmet-async";

type SeoProps = {
  title: string;
  description: string;
  path?: string;
  image?: string;
};

const siteName = import.meta.env.VITE_SITE_NAME || "JAF Logistics";
const siteUrl = import.meta.env.VITE_SITE_URL || "https://example.com";
const defaultImage = import.meta.env.VITE_OG_IMAGE || "/brand/jaf-logo.png";
const googleVerification = import.meta.env.VITE_GSC_VERIFICATION;

export const Seo = ({ title, description, path = "/", image = defaultImage }: SeoProps) => {
  const canonical = new URL(path, siteUrl).toString();
  const fullTitle = `${title} | ${siteName}`;
  const ogImage = image.startsWith("http") ? image : new URL(image, siteUrl).toString();

  return (
    <Helmet prioritizeSeoTags>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta name="robots" content="index, follow, max-image-preview:large" />
      <link rel="canonical" href={canonical} />

      <meta property="og:type" content="website" />
      <meta property="og:site_name" content={siteName} />
      <meta property="og:locale" content="en_US" />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={canonical} />
      <meta property="og:image" content={ogImage} />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />

      {googleVerification ? <meta name="google-site-verification" content={googleVerification} /> : null}
    </Helmet>
  );
};
