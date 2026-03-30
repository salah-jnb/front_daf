import React, { useState, useEffect, useCallback } from 'react';
import { useDashboard } from '../DashboardContext';
import { apiClient } from '@/lib/api';

interface GeneralInfo {
  id: number;
  moveProfetionelle: string;
  storageSolution: string;
  yearsExperience: number | null;
  phone1: string;
  phone2: string;
  email: string;
}

const INFORMATION_ID = 1;

export const GeneralInfoPage: React.FC = () => {
  const { showToast } = useDashboard();
  const [info, setInfo] = useState<GeneralInfo | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const loadInfo = useCallback(async () => {
    setLoading(true);
    try {
      const data = await apiClient.information.getById(INFORMATION_ID);
      setInfo({
        id: data.id,
        moveProfetionelle: data.moveProfetionelle ?? '',
        storageSolution: data.storageSolution ?? '',
        yearsExperience: data.yearsExperience ?? null,
        phone1: data.phone1 ?? '',
        phone2: data.phone2 ?? '',
        email: data.email ?? '',
      });
    } catch (error) {
      showToast(`Failed to load information: ${error instanceof Error ? error.message : 'Unknown error'}`, false);
      setInfo(null);
    } finally {
      setLoading(false);
    }
  }, [showToast]);

  useEffect(() => {
    loadInfo();
  }, [loadInfo]);

  const handleChange = (field: keyof GeneralInfo, value: any) => {
    setInfo((prev) => {
      if (!prev) return prev;
      return {
        ...prev,
        [field]: value,
      };
    });
  };

  const handleSave = async () => {
    if (!info) return;
    setSaving(true);
    try {
      const body = {
        id: info.id,
        moveProfetionelle: info.moveProfetionelle,
        storageSolution: info.storageSolution,
        yearsExperience:
          info.yearsExperience === null
            ? null
            : Number(info.yearsExperience),
        phone1: info.phone1,
        phone2: info.phone2,
        email: info.email,
      };

      const updated = await apiClient.information.update(INFORMATION_ID, body);
      setInfo({
        id: updated.id,
        moveProfetionelle: updated.moveProfetionelle ?? '',
        storageSolution: updated.storageSolution ?? '',
        yearsExperience: updated.yearsExperience ?? null,
        phone1: updated.phone1 ?? '',
        phone2: updated.phone2 ?? '',
        email: updated.email ?? '',
      });
      showToast('Information saved successfully!');
    } catch (error) {
      showToast(`Save failed: ${error instanceof Error ? error.message : 'Unknown error'}`, false);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <div className="flex items-center justify-center h-96">Loading...</div>;
  }

  if (!info) {
    return <div className="text-center text-slate-600">No information found.</div>;
  }

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg border border-slate-200 p-6">
        <h3 className="text-lg font-bold text-slate-900 mb-6">General Information</h3>

        <div className="space-y-6">
          {/* Professional Movement */}
          <div>
            <label className="block text-sm font-semibold text-slate-900 mb-2">
              Professional Movement
            </label>
            <textarea
              value={info.moveProfetionelle}
              onChange={(e) => handleChange('moveProfetionelle', e.target.value)}
              placeholder="Describe your professional movement"
              rows={4}
              className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Storage Solution */}
          <div>
            <label className="block text-sm font-semibold text-slate-900 mb-2">
              Storage Solution
            </label>
            <textarea
              value={info.storageSolution}
              onChange={(e) => handleChange('storageSolution', e.target.value)}
              placeholder="Describe your storage solution"
              rows={4}
              className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Years of Experience */}
          <div>
            <label className="block text-sm font-semibold text-slate-900 mb-2">
              Years of Experience
            </label>
            <input
              type="number"
              value={info.yearsExperience ?? ''}
              onChange={(e) =>
                handleChange(
                  'yearsExperience',
                  e.target.value === '' ? null : Number(e.target.value)
                )
              }
              placeholder="Enter years of experience"
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Contact Information */}
          <div className="pt-4 border-t border-slate-200">
            <h4 className="text-md font-semibold text-slate-900 mb-4">Contact Information</h4>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-slate-900 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  value={info.email}
                  onChange={(e) => handleChange('email', e.target.value)}
                  placeholder="Enter email"
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-900 mb-2">
                  Phone 1
                </label>
                <input
                  type="tel"
                  value={info.phone1}
                  onChange={(e) => handleChange('phone1', e.target.value)}
                  placeholder="Enter primary phone"
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-900 mb-2">
                  Phone 2
                </label>
                <input
                  type="tel"
                  value={info.phone2}
                  onChange={(e) => handleChange('phone2', e.target.value)}
                  placeholder="Enter secondary phone"
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 flex gap-3">
          <button
            onClick={handleSave}
            disabled={saving}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
          >
            {saving ? 'Saving...' : 'Save Changes'}
          </button>
        </div>
      </div>
    </div>
  );
};
