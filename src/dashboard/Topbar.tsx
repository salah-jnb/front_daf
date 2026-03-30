import React from 'react';
import { useLocation } from 'react-router-dom';
import { useDashboard } from './DashboardContext';

const routeMeta: Record<string, [string, string]> = {
  '/da/contacts': ['Contacts', 'Manage incoming contact requests'],
  '/da/offices': ['Offices', 'Manage regional offices and branches'],
  '/da/general-info': ['General Information', 'Company settings and information'],
  '/da/sponsors': ['Sponsors', 'Manage partner and sponsor logos'],
  '/da/content-blocks': ['Content Blocks', 'Manage title, description, and images'],
};

interface TopbarProps {
  onMenuClick: () => void;
}

export const Topbar: React.FC<TopbarProps> = ({ onMenuClick }) => {
  const location = useLocation();
  const meta = routeMeta[location.pathname] || ['Dashboard', 'Overview'];
  const { triggerAction } = useDashboard();

  return (
    <div className="bg-white border-b border-slate-200 px-6 py-4 flex items-center justify-between">
      <div className="flex items-center gap-4">
        <button
          onClick={onMenuClick}
          className="lg:hidden p-2 hover:bg-slate-100 rounded-lg transition-colors"
        >
          <svg
            width="24"
            height="24"
            fill="none"
            viewBox="0 0 24 24"
            className="text-slate-600"
          >
            <path
              d="M4 6h16M4 12h16M4 18h16"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
        </button>
        <div>
          <h2 className="text-xl font-bold text-slate-900">{meta[0]}</h2>
          <p className="text-sm text-slate-600">{meta[1]}</p>
        </div>
      </div>

      <div className="flex gap-2">
        {location.pathname === '/da/offices' && (
          <button
            onClick={() => triggerAction('new-office')}
            className="hidden sm:flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <svg width="16" height="16" fill="none" viewBox="0 0 24 24">
              <path
                d="M12 5v14M5 12h14"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
              />
            </svg>
            New Office
          </button>
        )}
        {location.pathname === '/da/content-blocks' && (
          <button
            onClick={() => triggerAction('new-block')}
            className="hidden sm:flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <svg width="16" height="16" fill="none" viewBox="0 0 24 24">
              <path
                d="M12 5v14M5 12h14"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
              />
            </svg>
            New Block
          </button>
        )}
        {(location.pathname === '/da/offices' || location.pathname === '/da/content-blocks') && (
          <button
            onClick={() =>
              triggerAction(
                location.pathname === '/da/offices' ? 'new-office' : 'new-block'
              )
            }
            className="sm:hidden flex items-center gap-2 px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <svg width="16" height="16" fill="none" viewBox="0 0 24 24">
              <path
                d="M12 5v14M5 12h14"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
              />
            </svg>
          </button>
        )}
      </div>
    </div>
  );
};
