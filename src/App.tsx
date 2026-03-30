import React, { createContext, useEffect, useMemo, useRef, useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  BrowserRouter,
  Navigate,
  Route,
  Routes,
  useLocation,
  useNavigate,
  Outlet,
  NavLink,
} from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ErrorBoundary } from "@/components/ErrorBoundary";
import { AnalyticsTracker } from "@/components/analytics/AnalyticsTracker";

import "./Admin/admin.css";

import LoginPage from "./Admin/Login";
import Contacts from "./Admin/Contacts";
import Offices from "./Admin/Offices";
import GeneralInfo from "./Admin/GeneralInfo";
import Sponsors from "./Admin/Sponsors";
import ContentBlocks from "./Admin/ContentBlocks";
import Dashboard from "./Admin/Dashboard";

import Index from "./pages/Index";
import NotFound from "./pages/NotFound";

export const AppContext = createContext<any>(null as any);

const queryClient = new QueryClient();

function Sidebar({
  isOpen,
  setOpen,
  onLogout,
}: {
  isOpen: boolean;
  setOpen: (v: boolean) => void;
  onLogout: () => void;
}) {
  return (
    <>
      <div className={`mob-overlay ${isOpen ? "open" : ""}`} onClick={() => setOpen(false)} />
      <aside className={`sidebar ${isOpen ? "open" : ""}`}>
        <div className="s-logo">
          <div className="logo-mark">
            <svg width="20" height="20" fill="none" viewBox="0 0 24 24">
              <path
                d="M3 12L12 3l9 9M5 10v9a1 1 0 001 1h4v-5h4v5h4a1 1 0 001-1v-9"
                stroke="#fff"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <div>
            <h1>TransGlobal</h1>
            <p>Panneau Admin</p>
          </div>
        </div>

        <nav className="s-nav">
          <div className="nlabel">Navigation</div>

          <NavLink to="/da/dashboard" onClick={() => setOpen(false)} className={({ isActive }) => `ni ${isActive ? "active" : ""}`}>
            Dashboard
          </NavLink>
          <NavLink to="/da/contacts" onClick={() => setOpen(false)} className={({ isActive }) => `ni ${isActive ? "active" : ""}`}>
            Contacts
          </NavLink>
          <NavLink to="/da/offices" onClick={() => setOpen(false)} className={({ isActive }) => `ni ${isActive ? "active" : ""}`}>
            Agences
          </NavLink>
          <NavLink to="/da/general-info" onClick={() => setOpen(false)} className={({ isActive }) => `ni ${isActive ? "active" : ""}`}>
            Infos Générales
          </NavLink>
          <NavLink to="/da/sponsors" onClick={() => setOpen(false)} className={({ isActive }) => `ni ${isActive ? "active" : ""}`}>
            Sponsors
          </NavLink>

          <div className="nlabel" style={{ marginTop: "8px" }}>
            Contenu
          </div>
          <NavLink
            to="/da/content-blocks"
            onClick={() => setOpen(false)}
            className={({ isActive }) => `ni ${isActive ? "active" : ""}`}
          >
            Blocs de Contenu
          </NavLink>
        </nav>

        <div className="s-foot">
          <div className="s-user">
            <div className="avatar">AD</div>
            <div style={{ flex: 1 }}>
              <div className="u-name">Admin</div>
              <div className="u-role">Super-admin</div>
            </div>
            <button
              className="btn btn-sm"
              onClick={onLogout}
              title="Déconnexion"
              style={{ padding: "6px", border: "1px solid var(--bdr2)" }}
            >
              Déconnexion
            </button>
          </div>
        </div>
      </aside>
    </>
  );
}

function Toast() {
  const { toastMsg, toastShow, toastOk } = React.useContext(AppContext);
  return (
    <div className={`toast ${toastShow ? "show" : ""}`}>
      <div className="td" style={{ background: toastOk ? "var(--ok)" : "var(--err)" }} />
      <span>{toastMsg}</span>
    </div>
  );
}

function ApiBar() {
  const { theme, toggleTheme } = React.useContext(AppContext);
  return (
    <div className="api-bar">
      <div className="api-bar-r" style={{ marginLeft: "auto" }}>
        <button
          className="api-cfg-btn"
          onClick={toggleTheme}
          title="Basculer le thème"
          style={{ display: "flex", alignItems: "center", gap: "4px" }}
        >
          {theme === "dark" ? "☀️ Clair" : "🌙 Sombre"}
        </button>
      </div>
    </div>
  );
}

const routeMeta: Record<string, [string, string]> = {
  "/da/contacts": ["Contacts", "Gestion des demandes de contact entrantes"],
  "/da/offices": ["Agences", "Gérer les bureaux et agences régionales"],
  "/da/general-info": ["Infos Générales", "Paramètres et informations de l'entreprise"],
  "/da/sponsors": ["Sponsors", "Gestion des logos partenaires et sponsors"],
  "/da/content-blocks": ["Blocs de Contenu", "Titre · Description · Image — Gestion modulaire"],
  "/da/dashboard": ["Dashboard", "Vue d'ensemble"],
};

function Topbar({ setSidebarOpen }: { setSidebarOpen: (v: boolean) => void }) {
  const location = useLocation();
  const meta = routeMeta[location.pathname] || ["Dashboard", "Vue d'ensemble"];
  const { triggerAction } = React.useContext(AppContext);

  return (
    <div className="topbar">
      <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
        <button className="menu-btn" onClick={() => setSidebarOpen(true)}>
          <svg width="24" height="24" fill="none" viewBox="0 0 24 24">
            <path d="M4 6h16M4 12h16M4 18h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </button>
        <div>
          <div className="tb-title">{meta[0]}</div>
          <div className="tb-sub">{meta[1]}</div>
        </div>
      </div>

      <div id="tb-acts">
        {location.pathname === "/da/offices" && (
          <button className="btn btn-p" onClick={() => triggerAction("new-office")}>
            + Nouvelle Agence
          </button>
        )}
        {location.pathname === "/da/content-blocks" && (
          <button className="btn btn-p" onClick={() => triggerAction("new-block")}>
            + Nouveau Bloc
          </button>
        )}
      </div>
    </div>
  );
}

function ProtectedLayout() {
  const { admin, setAdmin } = React.useContext(AppContext);
  const [sidebarOpen, setSidebarOpen] = React.useState(false);
  const navigate = useNavigate();

  const onLogout = () => {
    localStorage.removeItem("tg_admin");
    setAdmin(null);
    navigate("/login", { replace: true });
  };

  if (!admin) return <Navigate to="/login" replace />;

  return (
    <>
      <Sidebar isOpen={sidebarOpen} setOpen={setSidebarOpen} onLogout={onLogout} />
      <main className="main">
        <ApiBar />
        <Topbar setSidebarOpen={setSidebarOpen} />
        <div className="content">
          <Outlet />
        </div>
      </main>
    </>
  );
}

function LoginRoute({ onLogin }: { onLogin: (adminData: any) => void }) {
  const navigate = useNavigate();
  const { admin } = React.useContext(AppContext);

  if (admin) return <Navigate to="/da/contacts" replace />;

  return (
    <LoginPage
      onLogin={(adminData: any) => {
        onLogin(adminData);
        navigate("/da/contacts", { replace: true });
      }}
    />
  );
}

function AppShell() {
  const [theme, setTheme] = useState(localStorage.getItem("tg_theme") || "dark");
  const [toastShow, setToastShow] = useState(false);
  const [toastMsg, setToastMsg] = useState("");
  const [toastOk, setToastOk] = useState(true);

  const [baseUrl, setBaseUrl] = useState(
    localStorage.getItem("tg_api") || import.meta.env.VITE_API_URL || "http://localhost:9090",
  );
  const [actionTrigger, setActionTrigger] = useState<{ action: string; ts: number } | null>(null);

  const [admin, setAdmin] = useState(() => {
    try {
      const stored = localStorage.getItem("tg_admin");
      return stored ? JSON.parse(stored) : null;
    } catch {
      return null;
    }
  });

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark";
    setTheme(newTheme);
    localStorage.setItem("tg_theme", newTheme);
  };

  const toastTimeoutRef = useRef<number | null>(null);
  const showToast = (msg: string, ok = true) => {
    setToastMsg(msg);
    setToastOk(ok);
    setToastShow(true);
    if (toastTimeoutRef.current) window.clearTimeout(toastTimeoutRef.current);
    toastTimeoutRef.current = window.setTimeout(() => setToastShow(false), 3500);
  };

  const pingUrl = async (_url: string) => {};
  const triggerAction = (action: string) => setActionTrigger({ action, ts: Date.now() });

  const ctxValue = useMemo(
    () => ({
      baseUrl,
      setBaseUrl,
      pingUrl,
      toastShow,
      toastMsg,
      toastOk,
      showToast,
      actionTrigger,
      triggerAction,
      theme,
      toggleTheme,
      admin,
      setAdmin,
    }),
    [baseUrl, toastShow, toastMsg, toastOk, actionTrigger, theme, admin],
  );

  const handleLogin = (adminData: any) => {
    localStorage.setItem("tg_admin", JSON.stringify(adminData));
    setAdmin(adminData);
  };

  return (
    <AppContext.Provider value={ctxValue}>
      <BrowserRouter>
        <AnalyticsTracker />
        <Routes>
          {/* Site public */}
          <Route path="/" element={<Index />} />
          <Route path="/login" element={<LoginRoute onLogin={handleLogin} />} />

          {/* Admin */}
            <Route path="/da" element={<ProtectedLayout />}>
              <Route index element={<Navigate to="/da/contacts" replace />} />
              <Route path="dashboard" element={<Dashboard />} />
              <Route path="contacts" element={<Contacts />} />
              <Route path="offices" element={<Offices />} />
              <Route path="general-info" element={<GeneralInfo />} />
              <Route path="sponsors" element={<Sponsors />} />
              <Route path="content-blocks" element={<ContentBlocks />} />
              <Route path="*" element={<NotFound />} />
            </Route>

          {/* Fallback */}
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Toast />
      </BrowserRouter>
    </AppContext.Provider>
  );
}

export default function App() {
  return (
    <ErrorBoundary>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <AppShell />
        </TooltipProvider>
      </QueryClientProvider>
    </ErrorBoundary>
  );
}
