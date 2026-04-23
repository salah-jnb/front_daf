import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { Suspense, lazy } from "react";
import { AnalyticsTracker } from "@/components/analytics/AnalyticsTracker";
import Index from "./pages/Index";

// Lazy load all non-critical routes to reduce initial bundle size
const NotFound = lazy(() => import("./pages/NotFound"));
const LoginRoute = lazy(() => import("./Admin/LoginRoute"));
const AdminLayout = lazy(() => import("./Admin/AdminLayout"));
const Dashboard = lazy(() => import("./Admin/Dashboard"));
const Contacts = lazy(() => import("./Admin/Contacts"));
const Offices = lazy(() => import("./Admin/Offices"));
const GeneralInfo = lazy(() => import("./Admin/GeneralInfo"));
const Sponsors = lazy(() => import("./Admin/Sponsors"));
const ContentBlocks = lazy(() => import("./Admin/ContentBlocks"));
const WhyChooseUs = lazy(() => import("./Admin/WhyChooseUs"));
const BlockNews = lazy(() => import("./Admin/BlockNews"));
const ServiceDetailPage = lazy(() => import("@/pages/ServiceDetailPage"));
const ContactPage = lazy(() => import("@/pages/ContactPage"));
const HowWeWorkPage = lazy(() => import("@/pages/HowWeWorkPage"));

const SectionFallback = () => <div className="h-24" aria-hidden="true" />;

export default function App() {
  return (
    <BrowserRouter>
      <AnalyticsTracker />
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/services/:slug" element={<Suspense fallback={<SectionFallback />}><ServiceDetailPage /></Suspense>} />
        <Route path="/how-we-work" element={<Suspense fallback={<SectionFallback />}><HowWeWorkPage /></Suspense>} />
        <Route path="/contact" element={<Suspense fallback={<SectionFallback />}><ContactPage /></Suspense>} />
        <Route path="/login" element={<Suspense fallback={<SectionFallback />}><LoginRoute /></Suspense>} />

        <Route path="/da" element={<Suspense fallback={<SectionFallback />}><AdminLayout /></Suspense>}>
          <Route index element={<Navigate to="/da/contacts" replace />} />
          <Route path="dashboard" element={<Suspense fallback={<SectionFallback />}><Dashboard /></Suspense>} />
          <Route path="contacts" element={<Suspense fallback={<SectionFallback />}><Contacts /></Suspense>} />
          <Route path="offices" element={<Suspense fallback={<SectionFallback />}><Offices /></Suspense>} />
          <Route path="general-info" element={<Suspense fallback={<SectionFallback />}><GeneralInfo /></Suspense>} />
          <Route path="sponsors" element={<Suspense fallback={<SectionFallback />}><Sponsors /></Suspense>} />
          <Route path="content-blocks" element={<Suspense fallback={<SectionFallback />}><ContentBlocks /></Suspense>} />
          <Route path="why-choose-us" element={<Suspense fallback={<SectionFallback />}><WhyChooseUs /></Suspense>} />
          <Route path="block-news" element={<Suspense fallback={<SectionFallback />}><BlockNews /></Suspense>} />
          <Route path="*" element={<Suspense fallback={<SectionFallback />}><NotFound /></Suspense>} />
        </Route>

        <Route path="*" element={<Suspense fallback={<SectionFallback />}><NotFound /></Suspense>} />
      </Routes>
    </BrowserRouter>
  );
}