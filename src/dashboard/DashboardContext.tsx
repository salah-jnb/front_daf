import React, { createContext, useState, useCallback } from 'react';

export interface DashboardContextType {
  toastShow: boolean;
  toastMsg: string;
  toastOk: boolean;
  showToast: (msg: string, ok?: boolean) => void;
  theme: 'light' | 'dark';
  toggleTheme: () => void;
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
  actionTrigger: { action: string; ts: number } | null;
  triggerAction: (action: string) => void;
  isAuthenticated: boolean;
  setIsAuthenticated: (auth: boolean) => void;
}

export const DashboardContext = createContext<DashboardContextType | undefined>(undefined);

export const DashboardProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setTheme] = useState<'light' | 'dark'>(
    (localStorage.getItem('dash_theme') as 'light' | 'dark') || 'dark'
  );
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [toastShow, setToastShow] = useState(false);
  const [toastMsg, setToastMsg] = useState('');
  const [toastOk, setToastOk] = useState(true);
  const [actionTrigger, setActionTrigger] = useState<{ action: string; ts: number } | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(
    localStorage.getItem('dash_authenticated') === 'true'
  );

  const showToast = useCallback((msg: string, ok = true) => {
    setToastMsg(msg);
    setToastOk(ok);
    setToastShow(true);
    setTimeout(() => setToastShow(false), 3500);
  }, []);

  const toggleTheme = useCallback(() => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    localStorage.setItem('dash_theme', newTheme);
  }, [theme]);

  const triggerAction = useCallback((action: string) => {
    setActionTrigger({ action, ts: Date.now() });
  }, []);

  const handleSetIsAuthenticated = useCallback((auth: boolean) => {
    setIsAuthenticated(auth);
    localStorage.setItem('dash_authenticated', auth.toString());
  }, []);

  return (
    <DashboardContext.Provider
      value={{
        toastShow,
        toastMsg,
        toastOk,
        showToast,
        theme,
        toggleTheme,
        sidebarOpen,
        setSidebarOpen,
        actionTrigger,
        triggerAction,
        isAuthenticated,
        setIsAuthenticated: handleSetIsAuthenticated,
      }}
    >
      {children}
    </DashboardContext.Provider>
  );
};

export const useDashboard = () => {
  const context = React.useContext(DashboardContext);
  if (undefined === context) {
    throw new Error('useDashboard must be used within DashboardProvider');
  }
  return context;
};
