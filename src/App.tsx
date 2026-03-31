import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { Suspense, lazy } from "react";
import { AnalyticsTracker } from "@/components/analytics/AnalyticsTracker";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import LoginRoute from "./Admin/LoginRoute";
import AdminLayout from "./Admin/AdminLayout";
import Dashboard from "./Admin/Dashboard";
import Contacts from "./Admin/Contacts";
import Offices from "./Admin/Offices";
import GeneralInfo from "./Admin/GeneralInfo";
import Sponsors from "./Admin/Sponsors";
import ContentBlocks from "./Admin/ContentBlocks";

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
        <Route path="/login" element={<LoginRoute />} />

        <Route path="/da" element={<AdminLayout />}>
          <Route index element={<Navigate to="/da/contacts" replace />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="contacts" element={<Contacts />} />
          <Route path="offices" element={<Offices />} />
          <Route path="general-info" element={<GeneralInfo />} />
          <Route path="sponsors" element={<Sponsors />} />
          <Route path="content-blocks" element={<ContentBlocks />} />
          <Route path="*" element={<NotFound />} />
        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}
