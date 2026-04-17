import { useEffect } from "react";
import jafLogo from "@/assets/logo_jaf-566x412.webp";

type SeoProps = {
  title: string;
  description: string;
  path?: string;
  image?: string;
};

const siteName = import.meta.env.VITE_SITE_NAME || "JAF Logistics";
const siteUrl = import.meta.env.VITE_SITE_URL || "https://example.com";
const defaultImage = import.meta.env.VITE_OG_IMAGE || jafLogo;
const googleVerification = import.meta.env.VITE_GSC_VERIFICATION;

export const Seo = ({ title, description, path = "/", image = defaultImage }: SeoProps) => {
  const canonical = new URL(path, siteUrl).toString();
  const fullTitle = `${title} | ${siteName}`;
  const ogImage = image.startsWith("http") ? image : new URL(image, siteUrl).toString();

  useEffect(() => {
    document.title = fullTitle;

    const upsertMeta = (attr: { name?: string; property?: string }, content: string) => {
      const selector =
        attr.name != null ? `meta[name="${attr.name}"]` : `meta[property="${attr.property}"]`;
      const el = document.querySelector(selector) as HTMLMetaElement | null;
      if (el) el.content = content;
      else {
        const m = document.createElement("meta");
        if (attr.name) m.setAttribute("name", attr.name);
        if (attr.property) m.setAttribute("property", attr.property);
        m.content = content;
        document.head.appendChild(m);
      }
    };

    const upsertLink = (href: string) => {
      let link = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
      if (!link) {
        link = document.createElement("link");
        link.rel = "canonical";
        document.head.appendChild(link);
      }
      link.href = href;
    };

    upsertMeta({ name: "description" }, description);
    upsertMeta({ name: "robots" }, "index, follow, max-image-preview:large");
    upsertLink(canonical);

    upsertMeta({ property: "og:type" }, "website");
    upsertMeta({ property: "og:site_name" }, siteName);
    upsertMeta({ property: "og:locale" }, "en_US");
    upsertMeta({ property: "og:title" }, fullTitle);
    upsertMeta({ property: "og:description" }, description);
    upsertMeta({ property: "og:url" }, canonical);
    upsertMeta({ property: "og:image" }, ogImage);

    upsertMeta({ name: "twitter:card" }, "summary_large_image");
    upsertMeta({ name: "twitter:title" }, fullTitle);
    upsertMeta({ name: "twitter:description" }, description);
    upsertMeta({ name: "twitter:image" }, ogImage);

    if (googleVerification) {
      const sel = `meta[name="google-site-verification"]`;
      const el = document.querySelector(sel) as HTMLMetaElement | null;
      if (el) el.content = googleVerification;
      else {
        const m = document.createElement("meta");
        m.setAttribute("name", "google-site-verification");
        m.content = googleVerification;
        document.head.appendChild(m);
      }
    }
  }, [canonical, description, fullTitle, googleVerification, ogImage]);

  return null;
};
