import React, { useState, useEffect, useCallback } from 'react';
import { useDashboard } from '../DashboardContext';
import { apiClient } from '@/lib/api';

interface Contact {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  originCity: string;
  distnationCity: string;
  date: string;
  [key: string]: any;
}

export const ContactsPage: React.FC = () => {
  const { showToast } = useDashboard();
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);
  const [deleteConfirm, setDeleteConfirm] = useState<number | null>(null);

  const loadContacts = useCallback(async () => {
    setLoading(true);
    try {
      const data = await apiClient.contacts.getAll();
      setContacts(Array.isArray(data) ? data : []);
    } catch (error) {
      showToast(`Failed to load contacts: ${error instanceof Error ? error.message : 'Unknown error'}`, false);
      setContacts([]);
    } finally {
      setLoading(false);
    }
  }, [showToast]);

  useEffect(() => {
    loadContacts();
  }, [loadContacts]);

  const handleDelete = async (id: number) => {
    try {
      await apiClient.contacts.delete(id);
      showToast('Contact deleted successfully!');
      setDeleteConfirm(null);
      setSelectedContact(null);
      await loadContacts();
    } catch (error) {
      showToast(`Delete failed: ${error instanceof Error ? error.message : 'Unknown error'}`, false);
    }
  };

  const filteredContacts = contacts.filter((c) =>
    `${c.firstName} ${c.lastName} ${c.email} ${c.originCity} ${c.distnationCity}`
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white rounded-lg p-6 border border-slate-200">
          <div className="text-sm text-slate-600 font-medium">Total Contacts</div>
          <div className="text-3xl font-bold text-slate-900 mt-2">
            {loading ? '—' : contacts.length}
          </div>
        </div>
        <div className="bg-white rounded-lg p-6 border border-slate-200">
          <div className="text-sm text-slate-600 font-medium">Unique Cities</div>
          <div className="text-3xl font-bold text-slate-900 mt-2">
            {loading ? '—' : new Set(contacts.map((c) => c.originCity)).size}
          </div>
        </div>
        <div className="bg-white rounded-lg p-6 border border-slate-200">
          <div className="text-sm text-slate-600 font-medium">Latest</div>
          <div className="text-xl font-bold text-slate-900 mt-2">
            {loading ? '—' : contacts[0]?.date || '—'}
          </div>
        </div>
      </div>

      {/* Search and List */}
      <div className="bg-white rounded-lg border border-slate-200">
        <div className="p-6 border-b border-slate-200">
          <h3 className="text-lg font-bold text-slate-900 mb-4">Contacts List</h3>
          <input
            type="text"
            placeholder="Search by name, email, or city..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {loading ? (
          <div className="p-6 text-center text-slate-600">Loading contacts...</div>
        ) : filteredContacts.length === 0 ? (
          <div className="p-6 text-center text-slate-600">
            {searchTerm ? 'No contacts found matching your search.' : 'No contacts yet.'}
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-slate-50 border-b border-slate-200">
                <tr>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-slate-900">Name</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-slate-900">Email</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-slate-900">Origin</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-slate-900">Destination</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-slate-900">Date</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-slate-900">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {filteredContacts.map((contact) => (
                  <tr key={contact.id} className="hover:bg-slate-50">
                    <td className="px-6 py-4 text-sm text-slate-900">
                      {contact.firstName} {contact.lastName}
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-600">{contact.email}</td>
                    <td className="px-6 py-4 text-sm text-slate-600">{contact.originCity}</td>
                    <td className="px-6 py-4 text-sm text-slate-600">{contact.distnationCity}</td>
                    <td className="px-6 py-4 text-sm text-slate-600">{contact.date}</td>
                    <td className="px-6 py-4 text-sm">
                      <button
                        onClick={() => setSelectedContact(contact)}
                        className="text-blue-600 hover:text-blue-700 font-medium"
                      >
                        View
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Modal - View/Delete */}
      {selectedContact && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full">
            <div className="p-6 border-b border-slate-200">
              <h3 className="text-lg font-bold text-slate-900">
                {selectedContact.firstName} {selectedContact.lastName}
              </h3>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <div className="text-sm text-slate-600">Email</div>
                <div className="font-medium text-slate-900">{selectedContact.email}</div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="text-sm text-slate-600">From</div>
                  <div className="font-medium text-slate-900">{selectedContact.originCity}</div>
                </div>
                <div>
                  <div className="text-sm text-slate-600">To</div>
                  <div className="font-medium text-slate-900">{selectedContact.distnationCity}</div>
                </div>
              </div>
              <div>
                <div className="text-sm text-slate-600">Date</div>
                <div className="font-medium text-slate-900">{selectedContact.date}</div>
              </div>
            </div>
            <div className="p-6 border-t border-slate-200 flex gap-3">
              <button
                onClick={() => setSelectedContact(null)}
                className="flex-1 px-4 py-2 border border-slate-300 rounded-lg text-slate-700 hover:bg-slate-50 transition-colors"
              >
                Close
              </button>
              <button
                onClick={() => setDeleteConfirm(selectedContact.id)}
                className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Confirmation Modal */}
      {deleteConfirm !== null && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-sm w-full">
            <div className="p-6">
              <h3 className="text-lg font-bold text-slate-900 mb-4">Delete Contact?</h3>
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
