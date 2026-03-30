import React, { useState, useEffect, useCallback } from 'react';
import { useDashboard } from '../DashboardContext';
import { apiClient } from '@/lib/api';

interface Office {
  id: number;
  officeName: string;
  [key: string]: any;
}

export const OfficesPage: React.FC = () => {
  const { showToast, actionTrigger } = useDashboard();
  const [offices, setOffices] = useState<Office[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [editId, setEditId] = useState<number | null>(null);
  const [officeName, setOfficeName] = useState('');
  const [deleteConfirm, setDeleteConfirm] = useState<Office | null>(null);

  const loadOffices = useCallback(async () => {
    setLoading(true);
    try {
      const data = await apiClient.offices.getAll();
      setOffices(Array.isArray(data) ? data : []);
    } catch (error) {
      showToast(`Failed to load offices: ${error instanceof Error ? error.message : 'Unknown error'}`, false);
      setOffices([]);
    } finally {
      setLoading(false);
    }
  }, [showToast]);

  useEffect(() => {
    loadOffices();
  }, [loadOffices]);

  useEffect(() => {
    if (actionTrigger?.action === 'new-office') {
      setEditId(null);
      setOfficeName('');
      setModalOpen(true);
    }
  }, [actionTrigger]);

  const handleSave = async () => {
    if (!officeName.trim()) {
      showToast('Office name is required', false);
      return;
    }

    setSaving(true);
    try {
      if (editId) {
        await apiClient.offices.update(editId, { id: editId, officeName: officeName.trim() });
        showToast('Office updated successfully!');
      } else {
        await apiClient.offices.create({ officeName: officeName.trim() });
        showToast('Office created successfully!');
      }
      setModalOpen(false);
      setEditId(null);
      setOfficeName('');
      await loadOffices();
    } catch (error) {
      showToast(`Save failed: ${error instanceof Error ? error.message : 'Unknown error'}`, false);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (office: Office) => {
    try {
      await apiClient.offices.delete(office.id);
      showToast('Office deleted successfully!');
      setDeleteConfirm(null);
      await loadOffices();
    } catch (error) {
      showToast(`Delete failed: ${error instanceof Error ? error.message : 'Unknown error'}`, false);
    }
  };

  const openEdit = (office: Office) => {
    setEditId(office.id);
    setOfficeName(office.officeName);
    setModalOpen(true);
  };

  return (
    <div className="space-y-6">
      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white rounded-lg p-6 border border-slate-200">
          <div className="text-sm text-slate-600 font-medium">Total Offices</div>
          <div className="text-3xl font-bold text-slate-900 mt-2">
            {loading ? '—' : offices.length}
          </div>
        </div>
        <div className="bg-white rounded-lg p-6 border border-slate-200">
          <div className="text-sm text-slate-600 font-medium">Active</div>
          <div className="text-3xl font-bold text-slate-900 mt-2">
            {loading ? '—' : offices.length}
          </div>
        </div>
        <div className="bg-white rounded-lg p-6 border border-slate-200">
          <div className="text-sm text-slate-600 font-medium">Last Updated</div>
          <div className="text-lg font-bold text-slate-900 mt-2">Today</div>
        </div>
      </div>

      {/* List */}
      <div className="bg-white rounded-lg border border-slate-200 overflow-hidden">
        <div className="p-6 border-b border-slate-200">
          <h3 className="text-lg font-bold text-slate-900">Offices</h3>
        </div>

        {loading ? (
          <div className="p-6 text-center text-slate-600">Loading offices...</div>
        ) : offices.length === 0 ? (
          <div className="p-6 text-center text-slate-600">No offices yet. Create one to get started.</div>
        ) : (
          <div className="divide-y divide-slate-200">
            {offices.map((office) => (
              <div key={office.id} className="p-6 flex items-center justify-between hover:bg-slate-50">
                <div>
                  <h4 className="font-semibold text-slate-900">{office.officeName}</h4>
                  <p className="text-sm text-slate-600">ID: {office.id}</p>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => openEdit(office)}
                    className="px-3 py-1 text-sm bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => setDeleteConfirm(office)}
                    className="px-3 py-1 text-sm bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Modal - New/Edit */}
      {modalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full">
            <div className="p-6 border-b border-slate-200">
              <h3 className="text-lg font-bold text-slate-900">
                {editId ? 'Edit Office' : 'New Office'}
              </h3>
            </div>
            <div className="p-6 space-y-4">
              <input
                type="text"
                placeholder="Office name"
                value={officeName}
                onChange={(e) => setOfficeName(e.target.value)}
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="p-6 border-t border-slate-200 flex gap-3">
              <button
                onClick={() => setModalOpen(false)}
                className="flex-1 px-4 py-2 border border-slate-300 rounded-lg text-slate-700 hover:bg-slate-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                disabled={saving}
                className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
              >
                {saving ? 'Saving...' : editId ? 'Update' : 'Create'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Confirmation Modal */}
      {deleteConfirm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-sm w-full">
            <div className="p-6">
              <h3 className="text-lg font-bold text-slate-900 mb-4">Delete Office?</h3>
              <p className="text-slate-600 mb-2">
                Are you sure you want to delete <strong>{deleteConfirm.officeName}</strong>?
              </p>
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
