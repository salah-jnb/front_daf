import { createContext, useEffect, useMemo, useRef, useState } from "react";

export type ThemeMode = "dark" | "light";

export type AppContextValue = {
  baseUrl: string;
  setBaseUrl: (v: string) => void;

  toastShow: boolean;
  toastMsg: string;
  toastOk: boolean;
  showToast: (msg: string, ok?: boolean) => void;

  actionTrigger: { action: string; ts: number } | null;
  triggerAction: (action: string) => void;

  theme: ThemeMode;
  toggleTheme: () => void;

  admin: any;
  setAdmin: (admin: any) => void;
  logout: () => void;
};

export const AppContext = createContext<AppContextValue>(null as any);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<ThemeMode>(
    (localStorage.getItem("tg_theme") as ThemeMode) || "dark",
  );
  const [toastShow, setToastShow] = useState(false);
  const [toastMsg, setToastMsg] = useState("");
  const [toastOk, setToastOk] = useState(true);

  const [baseUrl, setBaseUrl] = useState(() => {
    return localStorage.getItem('tg_api') || import.meta.env.VITE_API_URL || "";
  });
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
    const root = document.documentElement;
    root.setAttribute("data-theme", theme);
    if (theme === "dark") {
      root.classList.add("dark");
      root.classList.remove("light");
    } else {
      root.classList.remove("dark");
      root.classList.add("light");
    }
  }, [theme]);

  const toggleTheme = () => {
    const next: ThemeMode = theme === "dark" ? "light" : "dark";
    setTheme(next);
    localStorage.setItem("tg_theme", next);
  };

  const toastTimeoutRef = useRef<number | null>(null);
  const showToast = (msg: string, ok = true) => {
    setToastMsg(msg);
    setToastOk(ok);
    setToastShow(true);
    if (toastTimeoutRef.current) window.clearTimeout(toastTimeoutRef.current);
    toastTimeoutRef.current = window.setTimeout(() => setToastShow(false), 3500);
  };

  const triggerAction = (action: string) => setActionTrigger({ action, ts: Date.now() });

  const logout = () => {
    localStorage.removeItem("tg_admin");
    setAdmin(null);
  };

  const value = useMemo<AppContextValue>(
    () => ({
      baseUrl,
      setBaseUrl,
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
      logout,
    }),
    [baseUrl, toastShow, toastMsg, toastOk, actionTrigger, theme, admin],
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

