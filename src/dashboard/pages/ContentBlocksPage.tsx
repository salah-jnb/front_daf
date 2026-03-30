import React, { useState, useEffect, useCallback, useRef } from 'react';
import { useDashboard } from '../DashboardContext';
import { apiClient } from '@/lib/api';

interface Block {
  id: number;
  titre: string;
  title?: string;
  description: string;
  image: string;
  [key: string]: any;
}

export const ContentBlocksPage: React.FC = () => {
  const { showToast, actionTrigger } = useDashboard();
  const [blocks, setBlocks] = useState<Block[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [editId, setEditId] = useState<number | null>(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [dragOver, setDragOver] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState<Block | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const loadBlocks = useCallback(async () => {
    setLoading(true);
    try {
      const data = await apiClient.blocks.getAll();
      setBlocks(Array.isArray(data) ? data : []);
    } catch (error) {
      showToast(`Failed to load blocks: ${error instanceof Error ? error.message : 'Unknown error'}`, false);
      setBlocks([]);
    } finally {
      setLoading(false);
    }
  }, [showToast]);

  useEffect(() => {
    loadBlocks();
  }, [loadBlocks]);

  useEffect(() => {
    if (actionTrigger?.action === 'new-block') {
      setEditId(null);
      setTitle('');
      setDescription('');
      setImageFile(null);
      setImagePreview(null);
      setModalOpen(true);
    }
  }, [actionTrigger]);

  const processFile = (file: File) => {
    if (!file.type.startsWith('image/')) {
      showToast('Invalid image format', false);
      return;
    }
    setImageFile(file);
    const url = URL.createObjectURL(file);
    setImagePreview(url);
  };

  const handleSave = async () => {
    if (!title.trim()) {
      showToast('Title is required', false);
      return;
    }

    setSaving(true);
    try {
      if (editId) {
        await apiClient.blocks.update(editId, title.trim(), description, imageFile || undefined);
        showToast('Block updated successfully!');
      } else {
        if (!imageFile) {
          showToast('Image is required for new blocks', false);
          setSaving(false);
          return;
        }
        await apiClient.blocks.create(title.trim(), description, imageFile);
        showToast('Block created successfully!');
      }

      setModalOpen(false);
      setEditId(null);
      setTitle('');
      setDescription('');
      setImageFile(null);
      setImagePreview(null);
      await loadBlocks();
    } catch (error) {
      showToast(`Save failed: ${error instanceof Error ? error.message : 'Unknown error'}`, false);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (block: Block) => {
    try {
      await apiClient.blocks.delete(block.id);
      showToast('Block deleted successfully!');
      setDeleteConfirm(null);
      await loadBlocks();
    } catch (error) {
      showToast(`Delete failed: ${error instanceof Error ? error.message : 'Unknown error'}`, false);
    }
  };

  const openEdit = (block: Block) => {
    setEditId(block.id);
    setTitle(block.titre || block.title || '');
    setDescription(block.description || '');
    setImagePreview(block.image || null);
    setImageFile(null);
    setModalOpen(true);
  };

  const removeImage = () => {
    setImageFile(null);
    setImagePreview(null);
  };

  return (
    <div className="space-y-6">
      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white rounded-lg p-6 border border-slate-200">
          <div className="text-sm text-slate-600 font-medium">Total Blocks</div>
          <div className="text-3xl font-bold text-slate-900 mt-2">
            {loading ? '—' : blocks.length}
          </div>
        </div>
        <div className="bg-white rounded-lg p-6 border border-slate-200">
          <div className="text-sm text-slate-600 font-medium">With Images</div>
          <div className="text-3xl font-bold text-slate-900 mt-2">
            {loading ? '—' : blocks.filter((b) => b.image).length}
          </div>
        </div>
        <div className="bg-white rounded-lg p-6 border border-slate-200">
          <div className="text-sm text-slate-600 font-medium">Without Images</div>
          <div className="text-3xl font-bold text-slate-900 mt-2">
            {loading ? '—' : blocks.filter((b) => !b.image).length}
          </div>
        </div>
      </div>

      {/* Grid */}
      <div>
        <h3 className="text-lg font-bold text-slate-900 mb-4">Content Blocks</h3>
        {loading ? (
          <div className="text-center text-slate-600">Loading blocks...</div>
        ) : blocks.length === 0 ? (
          <div className="text-center text-slate-600 bg-slate-50 rounded-lg p-12">
            No content blocks yet. Create one to get started.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {blocks.map((block) => (
              <div key={block.id} className="bg-white rounded-lg border border-slate-200 overflow-hidden">
                {block.image && (
                  <div className="w-full h-48 bg-slate-100 overflow-hidden">
                    <img
                      src={block.image}
                      alt={block.titre || block.title}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        (e.target as HTMLImageElement).style.display = 'none';
                      }}
                    />
                  </div>
                )}
                <div className="p-4">
                  <h4 className="font-semibold text-slate-900 mb-2 line-clamp-2">
                    {block.titre || block.title}
                  </h4>
                  <p className="text-sm text-slate-600 mb-4 line-clamp-3">
                    {block.description || 'No description'}
                  </p>
                  <div className="flex gap-2">
                    <button
                      onClick={() => openEdit(block)}
                      className="flex-1 px-3 py-1 text-sm bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => setDeleteConfirm(block)}
                      className="flex-1 px-3 py-1 text-sm bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Modal - New/Edit */}
      {modalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50 overflow-y-auto">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full my-8">
            <div className="p-6 border-b border-slate-200">
              <h3 className="text-lg font-bold text-slate-900">
                {editId ? 'Edit Block' : 'New Content Block'}
              </h3>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-semibold text-slate-900 mb-2">Title</label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Block title"
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-900 mb-2">Description</label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Block description"
                  rows={4}
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-900 mb-2">Image</label>
                {imagePreview ? (
                  <div className="relative">
                    <img
                      src={imagePreview}
                      alt="Preview"
                      className="w-full max-h-48 object-cover rounded-lg"
                    />
                    <button
                      onClick={removeImage}
                      className="absolute top-2 right-2 p-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
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
                ) : (
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
                      if (file) processFile(file);
                    }}
                    className={`block border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors ${
                      dragOver
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-slate-300 hover:border-blue-500'
                    }`}
                  >
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      onChange={(e) => processFile(e.target.files?.[0] || new File([], ''))}
                      className="hidden"
                    />
                    <svg
                      width="32"
                      height="32"
                      fill="none"
                      viewBox="0 0 24 24"
                      className="mx-auto text-slate-400 mb-2"
                    >
                      <path
                        d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5-5 5 5M12 15V5"
                        stroke="currentColor"
                        strokeWidth="1.8"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    <div className="text-sm text-slate-600">Drag and drop or click to select</div>
                  </label>
                )}
              </div>
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
              <h3 className="text-lg font-bold text-slate-900 mb-4">Delete Block?</h3>
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
