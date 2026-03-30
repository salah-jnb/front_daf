import React from 'react';
import { useDashboard } from './DashboardContext';

export const DashboardToast: React.FC = () => {
  const { toastShow, toastMsg, toastOk } = useDashboard();

  return (
    <div
      className={`fixed bottom-4 right-4 flex items-center gap-3 px-4 py-3 rounded-lg shadow-lg transform transition-all ${
        toastShow ? 'translate-x-0 opacity-100' : 'translate-x-96 opacity-0'
      } ${toastOk ? 'bg-green-500' : 'bg-red-500'} text-white`}
    >
      <div className="flex-shrink-0">
        {toastOk ? (
          <svg width="20" height="20" fill="none" viewBox="0 0 24 24">
            <path
              d="M20 6L9 17l-5-5"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        ) : (
          <svg width="20" height="20" fill="none" viewBox="0 0 24 24">
            <path
              d="M6 18L18 6M6 6l12 12"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        )}
      </div>
      <span className="text-sm font-medium">{toastMsg}</span>
    </div>
  );
};
