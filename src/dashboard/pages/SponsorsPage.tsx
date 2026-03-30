import React, { useState, useEffect, useCallback, useRef } from 'react';
import { useDashboard } from '../DashboardContext';
import { apiClient } from '@/lib/api';

interface Sponsor {
  id: number;
  logoUrl: string;
  [key: string]: any;
}

const INFORMATION_ID = 1;

export const SponsorsPage: React.FC = () => {
  const { showToast } = useDashboard();
  const [sponsors, setSponsors] = useState<Sponsor[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [dragOver, setDragOver] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState<Sponsor | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const loadSponsors = useCallback(async () => {
    setLoading(true);
    try {
      const data = await apiClient.sponsors.getAll();
      setSponsors(Array.isArray(data) ? data : []);
    } catch (error) {
      showToast(`Failed to load sponsors: ${error instanceof Error ? error.message : 'Unknown error'}`, false);
      setSponsors([]);
    } finally {
      setLoading(false);
    }
  }, [showToast]);

  useEffect(() => {
    loadSponsors();
  }, [loadSponsors]);

  const handleFileSelect = async (file: File | null) => {
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      showToast('Invalid image format', false);
      return;
    }

    setUploading(true);
    try {
      await apiClient.sponsors.upload(INFORMATION_ID, file);
      showToast('Sponsor logo added successfully!');
      await loadSponsors();
    } catch (error) {
      showToast(`Upload failed: ${error instanceof Error ? error.message : 'Unknown error'}`, false);
    } finally {
      setUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  const handleDelete = async (sponsor: Sponsor) => {
    try {
      await apiClient.sponsors.delete(sponsor.id);
      showToast('Sponsor deleted successfully!');
      setDeleteConfirm(null);
      await loadSponsors();
    } catch (error) {
      showToast(`Delete failed: ${error instanceof Error ? error.message : 'Unknown error'}`, false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-white rounded-lg p-6 border border-slate-200">
          <div className="text-sm text-slate-600 font-medium">Total Sponsors</div>
          <div className="text-3xl font-bold text-slate-900 mt-2">
            {loading ? '—' : sponsors.length}
          </div>
        </div>
        <div className="bg-white rounded-lg p-6 border border-slate-200">
          <div className="text-sm text-slate-600 font-medium">Status</div>
          <div className="text-lg font-bold text-green-600 mt-2">Active</div>
        </div>
      </div>

      {/* Upload Area */}
      <div className="bg-white rounded-lg border-2 border-dashed border-slate-300 hover:border-blue-500 transition-colors">
        <label
          onDragOver={(e) => {
            e.preventDefault();
            setDragOver(true);
          }}
          onDragLeave={() => setDragOver(false)}
          onDrop={(e) => {
            e.preventDefault();
            setDragOver(false);
            const file = e.dataTransfer.files[0];
            if (file) handleFileSelect(file);
          }}
          className={`block p-8 cursor-pointer text-center transition-colors ${
            dragOver ? 'bg-blue-50' : ''
          }`}
        >
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={(e) => handleFileSelect(e.target.files?.[0] || null)}
            className="hidden"
          />
          <svg
            width="48"
            height="48"
            fill="none"
            viewBox="0 0 24 24"
            className="mx-auto text-slate-400 mb-4"
          >
            <path
              d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5-5 5 5M12 15V5"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <div className="text-slate-900 font-semibold mb-1">
            {uploading ? 'Uploading...' : 'Drag and drop your logo here'}
          </div>
          <div className="text-sm text-slate-600">or click to select an image</div>
        </label>
      </div>

      {/* Grid */}
      <div>
        <h3 className="text-lg font-bold text-slate-900 mb-4">Sponsors</h3>
        {loading ? (
          <div className="text-center text-slate-600">Loading sponsors...</div>
        ) : sponsors.length === 0 ? (
          <div className="text-center text-slate-600 bg-slate-50 rounded-lg p-12">
            No sponsors yet. Upload your first logo to get started.
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {sponsors.map((sponsor) => (
              <div
                key={sponsor.id}
                className="relative group bg-white rounded-lg border border-slate-200 overflow-hidden"
              >
                <div className="aspect-square bg-slate-100 flex items-center justify-center">
                  {sponsor.logoUrl ? (
                    <img
                      src={sponsor.logoUrl}
                      alt={`Sponsor logo #${sponsor.id}`}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        (e.target as HTMLImageElement).style.display = 'none';
                      }}
                    />
                  ) : (
                    <svg width="32" height="32" fill="none" viewBox="0 0 24 24" className="text-slate-400">
                      <rect x="3" y="3" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="1.5" />
                      <circle cx="8.5" cy="8.5" r="1.5" fill="currentColor" />
                      <path d="M21 15l-5-5L5 21" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                    </svg>
                  )}
                </div>
                <button
                  onClick={() => setDeleteConfirm(sponsor)}
                  className="absolute top-2 right-2 p-2 bg-red-600 text-white rounded opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <svg width="16" height="16" fill="none" viewBox="0 0 24 24">
                    <path
                      d="M6 18L18 6M6 6l12 12"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                    />
                  </svg>
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Confirmation Modal */}
      {deleteConfirm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-sm w-full">
            <div className="p-6">
              <h3 className="text-lg font-bold text-slate-900 mb-4">Delete Sponsor?</h3>
              <p className="text-slate-600 mb-6">This action cannot be undone.</p>
              <div className="flex gap-3">
                <button
                  onClick={() => setDeleteConfirm(null)}
                  className="flex-1 px-4 py-2 border border-slate-300 rounded-lg text-slate-700 hover:bg-slate-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={() => handleDelete(deleteConfirm)}
                  className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
