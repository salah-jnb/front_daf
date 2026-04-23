import { useContext, useState, useEffect } from "react";
import { NavLink, Navigate, Outlet, useLocation } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import "./admin.css";
const routeMeta: Record<string, [string, string]> = {
  "/da/dashboard": ["Dashboard", "Vue d'ensemble"],
  "/da/contacts": ["Contacts", "Gestion des demandes de contact entrantes"],
  "/da/offices": ["Agences", "Gérer les bureaux et agences régionales"],
  "/da/general-info": ["Infos Générales", "Paramètres et informations de l'entreprise"],
  "/da/sponsors": ["Sponsors", "Gestion des logos partenaires et sponsors"],
  "/da/content-blocks": ["Blocs de Contenu", "Titre · Description · Image — Gestion modulaire"],
  "/da/why-choose-us": ["Pourquoi Nous", "Gérer les chiffres clés affichés sur le site"],
  "/da/block-news": ["Block News", "Gestion des actualités avec image, date et pays"],
};

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
          <NavLink to="/da/why-choose-us" onClick={() => setOpen(false)} className={({ isActive }) => `ni ${isActive ? "active" : ""}`}>
            Pourquoi Nous
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
          <NavLink
            to="/da/block-news"
            onClick={() => setOpen(false)}
            className={({ isActive }) => `ni ${isActive ? "active" : ""}`}
          >
            Block News
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

function ApiBar() {
  const { theme, toggleTheme } = useContext(AppContext);
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

function Toast() {
  const { toastMsg, toastShow, toastOk } = useContext(AppContext);
  return (
    <div className={`toast ${toastShow ? "show" : ""}`}>
      <div className="td" style={{ background: toastOk ? "var(--ok)" : "var(--err)" }} />
      <span>{toastMsg}</span>
    </div>
  );
}

function Topbar({ setSidebarOpen }: { setSidebarOpen: (v: boolean) => void }) {
  const location = useLocation();
  const meta = routeMeta[location.pathname] || ["Admin", ""];
  const { triggerAction } = useContext(AppContext);

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
        {location.pathname === "/da/why-choose-us" && (
          <button className="btn btn-p" onClick={() => triggerAction("new-why-choose-us")}>
            + Nouvelle Entrée
          </button>
        )}
        {location.pathname === "/da/block-news" && (
          <button className="btn btn-p" onClick={() => triggerAction("new-block-news")}>
            + Nouvelle News
          </button>
        )}
      </div>
    </div>
  );
}

export default function AdminLayout() {
  const { admin, logout, setTheme } = useContext(AppContext);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    setTheme("dark");
    localStorage.setItem("tg_theme", "dark");
  }, [setTheme]);

  if (!admin) return <Navigate to="/login" replace />;

  return (
    <>
      <Sidebar isOpen={sidebarOpen} setOpen={setSidebarOpen} onLogout={logout} />
      <main className="main">
        <ApiBar />
        <Topbar setSidebarOpen={setSidebarOpen} />
        <div className="content">
          <Outlet />
        </div>
      </main>
      <Toast />
    </>
  );
}

