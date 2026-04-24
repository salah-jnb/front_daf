import { useEffect } from "react";
import { useLocation } from "react-router-dom";

declare global {
  interface Window {
    dataLayer: unknown[];
    gtag: (...args: unknown[]) => void;
  }
}

const measurementId = import.meta.env.VITE_GA_MEASUREMENT_ID;

const initAnalytics = () => {
  if (!measurementId || typeof window === "undefined") {
    return;
  }

  // Setup the global queue immediately so events can be recorded
  window.dataLayer = window.dataLayer || [];
  window.gtag = function (...args: unknown[]) {
    // Note: GTAG officially expects 'arguments', so we must use a regular function,
    // but pushing 'arguments' in TS requires a workaround or using the spread args as an array.
    // The standard snippet does: dataLayer.push(arguments);
    // Since we use TypeScript, we can push arguments directly if we ignore the type,
    // or keep the existing array push which may or may not be perfectly compatible.
    // Let's use the exact standard GA4 implementation:
    window.dataLayer.push(arguments);
  };

  window.gtag("js", new Date());
  window.gtag("config", measurementId, {
    send_page_view: false,
  });

  // Delay downloading the heavy Google script until user interaction or 5 seconds
  // This drastically improves mobile PageSpeed Insights (LCP/FCP)
  const loadScript = () => {
    if (document.getElementById("ga4-script")) return;
    const script = document.createElement("script");
    script.id = "ga4-script";
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`;
    document.head.appendChild(script);
  };

  const timer = setTimeout(loadScript, 8000);
  const handleInteraction = () => {
    loadScript();
    clearTimeout(timer);
    ['scroll', 'mousemove', 'touchstart', 'click', 'keydown'].forEach(event => {
      window.removeEventListener(event, handleInteraction);
    });
  };

  ['scroll', 'mousemove', 'touchstart', 'click', 'keydown'].forEach(event => {
    window.addEventListener(event, handleInteraction, { once: true, passive: true });
  });
};

export const AnalyticsTracker = () => {
  const location = useLocation();

  useEffect(() => {
    initAnalytics();
  }, []);

  useEffect(() => {
    if (!measurementId || typeof window.gtag !== "function") {
      return;
    }

    window.gtag("event", "page_view", {
      page_path: location.pathname + location.search,
      page_title: document.title,
      page_location: window.location.href,
    });
  }, [location.pathname, location.search]);

  return null;
};
