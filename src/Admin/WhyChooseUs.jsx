import React, { useState, useContext, useEffect, useCallback } from 'react';
import { AppContext } from '../context/AppContext';

export default function WhyChooseUs() {
  const { actionTrigger, showToast, baseUrl } = useContext(AppContext);
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState(null);
  const [saving, setSaving] = useState(false);

  const [modalOpen, setModalOpen] = useState(false);
  const [editId, setEditId] = useState(null);
  const [formValue, setFormValue] = useState('');
  const [formLabel, setFormLabel] = useState('');

  const [deleteData, setDeleteData] = useState(null);
  const [deleteConfirmText, setDeleteConfirmText] = useState('');

  const api = useCallback(
    (path, options = {}) => {
      const url = `${baseUrl.replace(/\/$/, '')}${path}`;
      return fetch(url, {
        headers: { 'Content-Type': 'application/json', ...options.headers },
        ...options,
      });
    },
    [baseUrl]
  );

  const loadItems = useCallback(async () => {
    setLoading(true);
    setLoadError(null);
    try {
      const res = await api('/why-choose-us');
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();
      setItems(Array.isArray(data) ? data : []);
    } catch (e) {
      setLoadError(e.message || 'Erreur réseau');
      setItems([]);
      showToast(`Chargement impossible : ${e.message || 'erreur'}`, false);
    } finally {
      setLoading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [api]);

  useEffect(() => {
    loadItems();
  }, [loadItems]);

  useEffect(() => {
    if (actionTrigger?.action === 'new-why-choose-us') {
      setEditId(null);
      setFormValue('');
      setFormLabel('');
      setModalOpen(true);
    }
  }, [actionTrigger]);

  const openEdit = (item) => {
    setEditId(item.id);
    setFormValue(item.value || '');
    setFormLabel(item.label || '');
    setModalOpen(true);
  };

  const saveItem = async () => {
    if (!formValue.trim() || !formLabel.trim()) {
      showToast('Tous les champs sont requis.', false);
      return;
    }
    setSaving(true);
    try {
      const body = { value: formValue.trim(), label: formLabel.trim() };
      if (editId) {
        const res = await api(`/why-choose-us/${editId}`, {
          method: 'PUT',
          body: JSON.stringify({ id: editId, ...body }),
        });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        showToast('Entrée mise à jour !');
      } else {
        const res = await api('/why-choose-us', {
          method: 'POST',
          body: JSON.stringify(body),
        });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        showToast('Entrée créée !');
      }
      setModalOpen(false);
      await loadItems();
    } catch (e) {
      showToast(`Enregistrement impossible : ${e.message || 'erreur'}`, false);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (deleteConfirmText !== deleteData.label) {
      showToast('Texte de confirmation incorrect.', false);
      return;
    }
    try {
      const res = await api(`/why-choose-us/${deleteData.id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      showToast('Entrée supprimée.');
      setDeleteData(null);
      setDeleteConfirmText('');
      await loadItems();
    } catch (e) {
      showToast(`Suppression impossible : ${e.message || 'erreur'}`, false);
    }
  };

  const triggerDeleteModal = (item) => {
    setDeleteData({ id: item.id, label: item.label });
    setDeleteConfirmText('');
  };

  return (
    <>
      {loadError && (
        <div className="empty" style={{ marginBottom: '14px', padding: '12px', background: 'var(--bg4)', borderRadius: '8px' }}>
          <p style={{ margin: 0 }}>API : {baseUrl}/why-choose-us — {loadError}</p>
        </div>
      )}

      <div className="og">
        {loading ? (
          [...Array(3)].map((_, i) => (
            <div className="oc" key={i}>
              <div className="skeleton" style={{ width: '36px', height: '36px', borderRadius: '9px', marginBottom: '8px' }} />
              <div className="skeleton" style={{ width: '120px', marginBottom: '14px' }} />
              <div className="skeleton" style={{ width: '100%', height: '30px', borderRadius: '6px' }} />
            </div>
          ))
        ) : items.length === 0 ? (
          <div className="empty" style={{ gridColumn: '1/-1' }}>
            <svg width="34" height="34" fill="none" viewBox="0 0 24 24">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87L18.18 22 12 18.27 5.82 22 7 14.14l-5-4.87 6.91-1.01L12 2z" stroke="currentColor" strokeWidth="1.5" />
            </svg>
            <p>Aucune entrée « Pourquoi nous choisir » enregistrée.</p>
            <button
              className="btn btn-p"
              onClick={() => { setEditId(null); setFormValue(''); setFormLabel(''); setModalOpen(true); }}
              style={{ marginTop: '12px' }}
            >
              Créer la première entrée
            </button>
          </div>
        ) : (
          items.map((item) => (
            <div className="oc" key={item.id}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '4px' }}>
                <div className="oc-ico">
                  <svg width="18" height="18" fill="none" viewBox="0 0 24 24">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87L18.18 22 12 18.27 5.82 22 7 14.14l-5-4.87 6.91-1.01L12 2z" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                  </svg>
                </div>
                <span className="badge bb" style={{ fontSize: '10px' }}>ID {item.id}</span>
              </div>
              <div className="oc-n" style={{ fontSize: '28px', fontWeight: 800, color: 'var(--primary, #f97316)' }}>{item.value}</div>
              <div style={{ fontSize: '12px', color: 'var(--txt3)', marginBottom: '14px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{item.label}</div>
              <div style={{ display: 'flex', gap: '6px' }}>
                <button className="btn btn-sm" style={{ flex: 1, justifyContent: 'center' }} onClick={() => openEdit(item)}>Modifier</button>
                <button className="btn btn-sm btn-d" onClick={() => triggerDeleteModal(item)} title="Supprimer">
                  <svg width="11" height="11" fill="none" viewBox="0 0 24 24">
                    <polyline points="3,6 5,6 21,6" stroke="currentColor" strokeWidth="1.8" />
                    <path d="M19 6l-1 14H6L5 6" stroke="currentColor" strokeWidth="1.8" />
                  </svg>
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Create / Edit Modal */}
      <div className={`mo ${modalOpen ? 'open' : ''}`}>
        <div className="md">
          <div className="mh">
            <div className="mt">{editId ? "Modifier l'entrée" : "Nouvelle entrée"}</div>
            <button className="mc" onClick={() => setModalOpen(false)}>✕</button>
          </div>
          <div className="fg">
            <label>Valeur (ex: +30000, 4500 m2, 65)</label>
            <input type="text" value={formValue} onChange={(e) => setFormValue(e.target.value)} placeholder="Ex: +30000" />
          </div>
          <div className="fg">
            <label>Libellé (ex: Moves Completed)</label>
            <input type="text" value={formLabel} onChange={(e) => setFormLabel(e.target.value)} placeholder="Ex: Moves Completed" />
          </div>
          <div className="f-acts">
            <button className="btn" onClick={() => setModalOpen(false)} disabled={saving}>Annuler</button>
            <button className="btn btn-p" onClick={saveItem} disabled={saving}>{saving ? '…' : 'Enregistrer'}</button>
          </div>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      <div className={`mo ${deleteData ? 'open' : ''}`}>
        <div className="md cmw" style={{ width: '420px' }}>
          <div className="ci">
            <svg width="22" height="22" fill="none" viewBox="0 0 24 24">
              <path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0zM12 9v4M12 17h.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <div className="mt" style={{ marginBottom: '8px' }}>Suppression Critique</div>
          <div className="ct">
            La suppression de <strong>{deleteData?.label}</strong> est irréversible.<br /><br />
            Veuillez saisir <strong style={{ color: 'var(--err)', userSelect: 'none' }}>{deleteData?.label}</strong> pour confirmer.
          </div>
          <div className="fg" style={{ marginBottom: '20px', textAlign: 'left' }}>
            <input type="text" value={deleteConfirmText} onChange={(e) => setDeleteConfirmText(e.target.value)} placeholder={deleteData?.label} />
          </div>
          <div style={{ display: 'flex', gap: '9px', justifyContent: 'center' }}>
            <button className="btn" onClick={() => setDeleteData(null)}>Annuler</button>
            <button
              className="btn btn-p"
              style={{ background: 'var(--err)', borderColor: 'var(--err)' }}
              onClick={handleDelete}
              disabled={deleteConfirmText !== deleteData?.label}
            >
              Supprimer définitivement
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
