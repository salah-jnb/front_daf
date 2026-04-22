import { createRoot } from "react-dom/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { ErrorBoundary } from "@/components/ErrorBoundary";
import { SpeedInsights } from "@vercel/speed-insights/react";

import App from "./App.tsx";
import "./index.css";
import { AppProvider } from "./context/AppContext";
import "./i18n"; // Import i18n configuration

const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
  <ErrorBoundary>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <AppProvider>
          <Toaster />
          <Sonner />
          <App />
          <SpeedInsights />
        </AppProvider>
      </TooltipProvider>
    </QueryClientProvider>
  </ErrorBoundary>,
);
