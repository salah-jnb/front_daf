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
  const [movesCompleted, setMovesCompleted] = useState('');
  const [secureStorageSpace, setSecureStorageSpace] = useState('');
  const [yearsOfExperience, setYearsOfExperience] = useState('');

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
      if (items.length > 0) {
         showToast("Une configuration existe déjà, veuillez la modifier.", false);
         return;
      }
      setEditId(null);
      setMovesCompleted('');
      setSecureStorageSpace('');
      setYearsOfExperience('');
      setModalOpen(true);
    }
  }, [actionTrigger, items]);

  const openEdit = (item) => {
    setEditId(item.id);
    setMovesCompleted(item.movesCompleted || '');
    setSecureStorageSpace(item.secureStorageSpace || '');
    setYearsOfExperience(item.yearsOfExperience || '');
    setModalOpen(true);
  };

  const saveItem = async () => {
    if (!movesCompleted || !secureStorageSpace || !yearsOfExperience) {
      showToast('Tous les champs sont requis.', false);
      return;
    }
    setSaving(true);
    try {
      const body = { 
        movesCompleted: parseInt(movesCompleted, 10), 
        secureStorageSpace: parseInt(secureStorageSpace, 10), 
        yearsOfExperience: parseInt(yearsOfExperience, 10) 
      };

      if (editId) {
        const res = await api(`/why-choose-us/${editId}`, {
          method: 'PUT',
          body: JSON.stringify({ id: editId, ...body }),
        });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        showToast('Métriques mises à jour !');
      } else {
        const res = await api('/why-choose-us', {
          method: 'POST',
          body: JSON.stringify(body),
        });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        showToast('Métriques créées !');
      }
      setModalOpen(false);
      await loadItems();
    } catch (e) {
      showToast(`Enregistrement impossible : ${e.message || 'erreur'}`, false);
    } finally {
      setSaving(false);
    }
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
          <div className="oc">
            <div className="skeleton" style={{ width: '36px', height: '36px', borderRadius: '9px', marginBottom: '8px' }} />
            <div className="skeleton" style={{ width: '120px', marginBottom: '14px' }} />
            <div className="skeleton" style={{ width: '100%', height: '30px', borderRadius: '6px' }} />
          </div>
        ) : items.length === 0 ? (
          <div className="empty" style={{ gridColumn: '1/-1' }}>
            <svg width="34" height="34" fill="none" viewBox="0 0 24 24">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87L18.18 22 12 18.27 5.82 22 7 14.14l-5-4.87 6.91-1.01L12 2z" stroke="currentColor" strokeWidth="1.5" />
            </svg>
            <p>Aucune configuration « Pourquoi nous choisir » enregistrée.</p>
            <button
              className="btn btn-p"
              onClick={() => { setEditId(null); setMovesCompleted(''); setSecureStorageSpace(''); setYearsOfExperience(''); setModalOpen(true); }}
              style={{ marginTop: '12px' }}
            >
              Créer la configuration
            </button>
          </div>
        ) : (
          items.map((item) => (
            <div className="oc" key={item.id} style={{ minWidth: '100%' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '18px' }}>
                <div className="oc-ico" style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                  <svg width="24" height="24" fill="none" viewBox="0 0 24 24">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87L18.18 22 12 18.27 5.82 22 7 14.14l-5-4.87 6.91-1.01L12 2z" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                  </svg>
                  <span style={{ fontWeight: 'bold' }}>Chiffres Clés (Métriques)</span>
                </div>
                <span className="badge bb" style={{ fontSize: '10px' }}>ID {item.id}</span>
              </div>
              
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '12px', marginBottom: '24px' }}>
                <div style={{ background: 'var(--bg2)', padding: '12px', borderRadius: '8px', textAlign: 'center' }}>
                    <div style={{ fontSize: '11px', textTransform: 'uppercase', color: 'var(--txt3)' }}>Déménagements</div>
                    <div style={{ fontSize: '24px', fontWeight: 800, color: 'var(--primary)' }}>+{item.movesCompleted}</div>
                </div>
                <div style={{ background: 'var(--bg2)', padding: '12px', borderRadius: '8px', textAlign: 'center' }}>
                    <div style={{ fontSize: '11px', textTransform: 'uppercase', color: 'var(--txt3)' }}>Stockage Securisé</div>
                    <div style={{ fontSize: '24px', fontWeight: 800, color: 'var(--primary)' }}>{item.secureStorageSpace} m2</div>
                </div>
                <div style={{ background: 'var(--bg2)', padding: '12px', borderRadius: '8px', textAlign: 'center' }}>
                    <div style={{ fontSize: '11px', textTransform: 'uppercase', color: 'var(--txt3)' }}>Années d'expérience</div>
                    <div style={{ fontSize: '24px', fontWeight: 800, color: 'var(--primary)' }}>{item.yearsOfExperience}</div>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '6px' }}>
                <button className="btn btn-p" style={{ flex: 1, justifyContent: 'center' }} onClick={() => openEdit(item)}>Modifier les valeurs</button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Create / Edit Modal */}
      <div className={`mo ${modalOpen ? 'open' : ''}`}>
        <div className="md">
          <div className="mh">
            <div className="mt">{editId ? "Modifier les métriques" : "Nouvelles métriques"}</div>
            <button className="mc" onClick={() => setModalOpen(false)}>✕</button>
          </div>
          <div className="fg">
            <label>Déménagements complétés (+)</label>
            <input type="number" value={movesCompleted} onChange={(e) => setMovesCompleted(e.target.value)} placeholder="Ex: 30000" />
          </div>
          <div className="fg">
            <label>Espace de stockage (m2)</label>
            <input type="number" value={secureStorageSpace} onChange={(e) => setSecureStorageSpace(e.target.value)} placeholder="Ex: 4500" />
          </div>
          <div className="fg">
            <label>Années d'expérience</label>
            <input type="number" value={yearsOfExperience} onChange={(e) => setYearsOfExperience(e.target.value)} placeholder="Ex: 65" />
          </div>
          <div className="f-acts">
            <button className="btn" onClick={() => setModalOpen(false)} disabled={saving}>Annuler</button>
            <button className="btn btn-p" onClick={saveItem} disabled={saving}>{saving ? '…' : 'Enregistrer'}</button>
          </div>
        </div>
      </div>
    </>
  );
}
