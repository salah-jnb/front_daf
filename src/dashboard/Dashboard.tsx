import React, { Suspense, lazy } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { DashboardProvider, useDashboard } from './DashboardContext';
import { Sidebar } from './Sidebar';
import { Topbar } from './Topbar';
import { DashboardToast } from './DashboardToast';

const ContactsPage = lazy(() => import('./pages/ContactsPage').then((module) => ({ default: module.ContactsPage })));
const OfficesPage = lazy(() => import('./pages/OfficesPage').then((module) => ({ default: module.OfficesPage })));
const GeneralInfoPage = lazy(() =>
  import('./pages/GeneralInfoPage').then((module) => ({ default: module.GeneralInfoPage })),
);
const SponsorsPage = lazy(() => import('./pages/SponsorsPage').then((module) => ({ default: module.SponsorsPage })));
const ContentBlocksPage = lazy(() =>
  import('./pages/ContentBlocksPage').then((module) => ({ default: module.ContentBlocksPage })),
);

const DashboardFallback: React.FC = () => (
  <div className="min-h-[280px] flex items-center justify-center text-slate-600">Loading dashboard page...</div>
);

const DashboardLayout: React.FC = () => {
  const { sidebarOpen, setSidebarOpen, isAuthenticated, setIsAuthenticated } = useDashboard();

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-600 to-blue-800 flex items-center justify-center p-4">
        <div className="bg-white rounded-lg shadow-xl p-8 w-full max-w-md">
          <h1 className="text-2xl font-bold text-slate-900 mb-6 text-center">Admin Dashboard</h1>
          <div className="space-y-4">
            <input
              type="password"
              placeholder="Enter admin password"
              onKeyPress={(e) => {
                if (e.key === 'Enter') {
                  setIsAuthenticated(true);
                }
              }}
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              onClick={() => setIsAuthenticated(true)}
              className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Login
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-slate-100">
      <Sidebar onLogout={() => setIsAuthenticated(false)} />

      <div className="flex-1 flex flex-col overflow-hidden lg:ml-0">
        <Topbar onMenuClick={() => setSidebarOpen(true)} />

        <main className="flex-1 overflow-auto">
          <div className="p-6 max-w-7xl mx-auto">
            <Suspense fallback={<DashboardFallback />}>
              <Routes>
                <Route path="/" element={<Navigate to="/da/contacts" replace />} />
                <Route path="/contacts" element={<ContactsPage />} />
                <Route path="/offices" element={<OfficesPage />} />
                <Route path="/general-info" element={<GeneralInfoPage />} />
                <Route path="/sponsors" element={<SponsorsPage />} />
                <Route path="/content-blocks" element={<ContentBlocksPage />} />
                <Route path="*" element={<Navigate to="/da/contacts" replace />} />
              </Routes>
            </Suspense>
          </div>
        </main>
      </div>

      <DashboardToast />
    </div>
  );
};

export const Dashboard: React.FC = () => {
  return (
    <DashboardProvider>
      <DashboardLayout />
    </DashboardProvider>
  );
};
