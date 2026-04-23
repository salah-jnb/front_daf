import React, { useState, useContext, useEffect, useRef, useCallback } from 'react';
import { AppContext } from '../context/AppContext';

export default function BlockNews() {
  const { actionTrigger, showToast, baseUrl } = useContext(AppContext);

  const [news, setNews]           = useState([]);
  const [loading, setLoading]     = useState(true);
  const [saving, setSaving]       = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [editId, setEditId]       = useState(null);
  const [deleteData, setDeleteData] = useState(null);
  const [viewNews, setViewNews]   = useState(null);
  const [dragOver, setDragOver]   = useState(false);

  const fileInputRef = useRef();

  const emptyForm = () => ({
    titre: '',
    description: '',
    pays: '',
    date: new Date().toISOString().slice(0, 10), // yyyy-MM-dd
    image: null,
    imagePreview: null,
  });
  const [form, setForm] = useState(emptyForm());

  const root = useCallback(() => baseUrl.replace(/\/$/, ''), [baseUrl]);

  /* ─── Chargement ─── */
  const loadNews = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch(`${root()}/block-news`);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();
      setNews(Array.isArray(data) ? data : []);
    } catch (e) {
      showToast(`Chargement impossible : ${e.message || 'erreur'}`, false);
      setNews([]);
    } finally {
      setLoading(false);
    }
  }, [root, showToast]);

  useEffect(() => { loadNews(); }, [loadNews]);

  /* ─── Topbar button "+ Nouvelle News" ─── */
  useEffect(() => {
    if (actionTrigger?.action === 'new-block-news') {
      setEditId(null);
      setForm(emptyForm());
      setModalOpen(true);
    }
  }, [actionTrigger]);

  /* ─── Ouvrir le formulaire en création ─── */
  const openCreate = () => {
    setEditId(null);
    setForm(emptyForm());
    setModalOpen(true);
  };

  /* ─── Ouvrir le formulaire en édition ─── */
  const openEdit = (item) => {
    setEditId(item.id);
    setForm({
      titre:        item.titre || '',
      description:  item.description || '',
      pays:         item.pays || '',
      date:         item.date || new Date().toISOString().slice(0, 10),
      image:        item.image,   // URL existante (string)
      imagePreview: item.image,
    });
    setModalOpen(true);
  };

  /* ─── Gestion de l'image ─── */
  const processFile = (file) => {
    if (!file) return;
    if (!file.type.startsWith('image/')) {
      showToast("Format d'image invalide", false);
      return;
    }
    setForm(prev => ({ ...prev, image: file, imagePreview: URL.createObjectURL(file) }));
  };
  const handleFileChange = (e) => { processFile(e.target.files[0]); e.target.value = ''; };
  const handleDrop = (e) => {
    e.preventDefault(); setDragOver(false);
    if (e.dataTransfer.files?.length > 0) processFile(e.dataTransfer.files[0]);
  };
  const removeImage = () => setForm(prev => ({ ...prev, image: null, imagePreview: null }));

  /* ─── Sauvegarde (POST / PUT) ─── */
  const saveNews = async () => {
    if (!form.titre.trim())         { showToast('Le titre est requis.', false); return; }
    if (!form.date)                 { showToast('La date est requise.', false); return; }
    if (!editId && !(form.image instanceof File)) {
      showToast("L'image est requise pour créer une news.", false); return;
    }

    setSaving(true);
    try {
      const fd = new FormData();
      fd.append('titre',       form.titre.trim());
      if (form.description)   fd.append('description', form.description);
      if (form.pays)          fd.append('pays',        form.pays.trim());
      fd.append('date',        form.date);
      if (form.image instanceof File) fd.append('file', form.image);

      const url    = editId ? `${root()}/block-news/${editId}` : `${root()}/block-news`;
      const method = editId ? 'PUT' : 'POST';

      const res = await fetch(url, { method, body: fd });
      if (!res.ok) {
        const text = await res.text().catch(() => '');
        throw new Error(text || `HTTP ${res.status}`);
      }

      showToast(editId ? 'News mise à jour !' : 'News créée avec succès !');
      setModalOpen(false);
      setEditId(null);
      setForm(emptyForm());
      await loadNews();
    } catch (e) {
      showToast(`Erreur : ${e.message || 'Impossible de sauvegarder'}`, false);
    } finally {
      setSaving(false);
    }
  };

  /* ─── Suppression ─── */
  const handleDelete = async () => {
    if (!deleteData) return;
    try {
      const res = await fetch(`${root()}/block-news/${deleteData.id}`, { method: 'DELETE' });
      // 204 No Content est OK
      if (!res.ok && res.status !== 204) throw new Error(`HTTP ${res.status}`);
      showToast('News supprimée avec succès.');
      setDeleteData(null);
      await loadNews();
    } catch (e) {
      showToast(`Suppression impossible : ${e.message || 'erreur'}`, false);
    }
  };

  /* ─── Rendu ─── */
  const formatDate = (d) => {
    if (!d) return '—';
    try {
      return new Intl.DateTimeFormat('fr-FR', { day: '2-digit', month: 'short', year: 'numeric' }).format(new Date(d));
    } catch { return d; }
  };

  return (
    <>
      {/* ── Stats header ── */}
      <div className="stats-row">
        <div className="stat-c">
          <div className="stat-l">Total News</div>
          <div className="stat-v">
            {loading ? <div className="skeleton" style={{ width: '40px' }} /> : news.length}
          </div>
        </div>
        <div className="stat-c">
          <div className="stat-l">Avec Pays</div>
          <div className="stat-v">
            {loading ? <div className="skeleton" style={{ width: '40px' }} /> : news.filter(n => n.pays).length}
          </div>
        </div>
        <div className="stat-c">
          <div className="stat-l">Dernière date</div>
          <div className="stat-v" style={{ fontSize: '13px' }}>
            {loading
              ? <div className="skeleton" style={{ width: '80px' }} />
              : news.length ? formatDate(news[0]?.date) : '—'
            }
          </div>
        </div>
      </div>

      {/* ── Bouton créer ── */}
      <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '20px' }}>
        <button className="btn btn-p" onClick={openCreate}>
          <svg width="13" height="13" fill="none" viewBox="0 0 24 24">
            <path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
          </svg>
          Ajouter une News
        </button>
      </div>

      {/* ── Grille des news ── */}
      <div className="cb-grid">
        {loading
          ? [...Array(3)].map((_, i) => (
            <div className="cb-card" key={i}>
              <div className="skeleton" style={{ width: '100%', height: '180px', borderRadius: 0 }} />
              <div className="cb-body">
                <div className="skeleton" style={{ width: '70%', height: '20px', marginBottom: '12px' }} />
                <div className="skeleton" style={{ width: '100%', height: '14px', marginBottom: '6px' }} />
                <div className="skeleton" style={{ width: '60%', height: '14px' }} />
              </div>
            </div>
          ))
          : news.length === 0
            ? (
              <div className="empty" style={{ gridColumn: '1/-1' }}>
                <svg width="48" height="48" fill="none" viewBox="0 0 24 24">
                  <rect x="3" y="3" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="1.2" />
                  <path d="M8 10h8M8 14h5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
                </svg>
                <p style={{ fontWeight: 500, fontSize: '15px', color: 'var(--txt2)' }}>Aucune block news</p>
                <p style={{ fontSize: '13px' }}>Créez votre première block news avec un titre, une date et une image.</p>
                <button className="btn btn-p" onClick={openCreate} style={{ marginTop: '8px' }}>
                  <svg width="13" height="13" fill="none" viewBox="0 0 24 24">
                    <path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
                  </svg>
                  Créer ma première news
                </button>
              </div>
            )
            : news.map((item, idx) => (
              <div className="cb-card" key={item.id} style={{ animationDelay: `${idx * 80}ms` }}>
                {/* Image */}
                <div className="cb-img-wrap">
                  {item.image
                    ? <img className="cb-img" src={item.image} alt={item.titre} onError={e => { e.target.style.display = 'none'; }} />
                    : (
                      <div className="cb-img-placeholder">
                        <svg width="32" height="32" fill="none" viewBox="0 0 24 24">
                          <rect x="3" y="3" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="1.3" />
                          <circle cx="8.5" cy="8.5" r="1.5" stroke="currentColor" strokeWidth="1.3" />
                          <path d="M21 15l-5-5L5 21" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        <span>Pas d'image</span>
                      </div>
                    )
                  }
                  {/* Hover overlay */}
                  <div className="cb-overlay">
                    <button className="btn btn-sm" onClick={() => setViewNews(item)}
                      style={{ background: 'rgba(0,0,0,0.6)', borderColor: 'transparent', color: '#fff', backdropFilter: 'blur(4px)' }}>
                      <svg width="12" height="12" fill="none" viewBox="0 0 24 24">
                        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" stroke="currentColor" strokeWidth="1.8" />
                        <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.8" />
                      </svg>
                    </button>
                    <button className="btn btn-sm" onClick={() => openEdit(item)}
                      style={{ background: 'rgba(0,0,0,0.6)', borderColor: 'transparent', color: '#fff', backdropFilter: 'blur(4px)' }}>
                      <svg width="12" height="12" fill="none" viewBox="0 0 24 24">
                        <path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z" stroke="currentColor" strokeWidth="1.8" />
                      </svg>
                    </button>
                    <button className="btn btn-sm btn-d" onClick={() => setDeleteData({ id: item.id, label: item.titre })}
                      style={{ background: 'rgba(248,113,113,0.2)', borderColor: 'transparent', color: '#fff', backdropFilter: 'blur(4px)' }}>
                      <svg width="12" height="12" fill="none" viewBox="0 0 24 24">
                        <polyline points="3,6 5,6 21,6" stroke="currentColor" strokeWidth="1.8" />
                        <path d="M19 6l-1 14H6L5 6M9 6V4h6v2" stroke="currentColor" strokeWidth="1.8" />
                      </svg>
                    </button>
                  </div>
                </div>

                {/* Body */}
                <div className="cb-body">
                  <div className="cb-title">{item.titre}</div>
                  {item.pays && (
                    <div style={{ display: 'flex', alignItems: 'center', gap: '4px', marginBottom: '4px' }}>
                      <span style={{ fontSize: '11px', opacity: 0.6 }}>🌍</span>
                      <span style={{ fontSize: '12px', color: 'var(--txt2)', fontWeight: 500 }}>{item.pays}</span>
                    </div>
                  )}
                  <div className="cb-desc">{item.description}</div>
                </div>

                {/* Footer */}
                <div className="cb-footer">
                  <span className="badge bb" style={{ fontSize: '10px' }}>ID: {item.id}</span>
                  <span className="badge bp" style={{ fontSize: '10px' }}>📅 {formatDate(item.date)}</span>
                </div>
              </div>
            ))
        }
      </div>

      {/* ══════════════════════════════════════════════════
          Modal Détail (lecture)
      ══════════════════════════════════════════════════ */}
      <div className={`mo ${viewNews ? 'open' : ''}`}>
        <div className="md" style={{ width: '600px' }}>
          <div className="mh">
            <div className="mt">Détail de la News</div>
            <button className="mc" onClick={() => setViewNews(null)}>✕</button>
          </div>
          {viewNews && (
            <>
              {viewNews.image && (
                <div className="img-preview-wrap" style={{ marginBottom: '20px', height: '240px' }}>
                  <img src={viewNews.image} alt={viewNews.titre} />
                </div>
              )}
              <div className="fg" style={{ marginBottom: '12px' }}>
                <label>Titre</label>
                <input value={viewNews.titre} readOnly style={{ opacity: 0.8 }} />
              </div>
              <div style={{ display: 'flex', gap: '12px', marginBottom: '12px' }}>
                <div className="fg" style={{ flex: 1 }}>
                  <label>Date</label>
                  <input value={formatDate(viewNews.date)} readOnly style={{ opacity: 0.8 }} />
                </div>
                <div className="fg" style={{ flex: 1 }}>
                  <label>Pays</label>
                  <input value={viewNews.pays || '—'} readOnly style={{ opacity: 0.8 }} />
                </div>
              </div>
              <div className="fg" style={{ marginBottom: '16px' }}>
                <label>Description</label>
                <textarea value={viewNews.description || ''} readOnly style={{ opacity: 0.8, minHeight: '100px' }} />
              </div>
              <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                <span className="badge bb">ID: {viewNews.id}</span>
                <span className="badge bp">📅 {viewNews.date}</span>
                {viewNews.pays && <span className="badge" style={{ background: 'var(--bdr)', color: 'var(--txt)' }}>🌍 {viewNews.pays}</span>}
              </div>
              <div style={{ marginTop: '18px', paddingTop: '18px', borderTop: '1px solid var(--bdr)', display: 'flex', justifyContent: 'flex-end', gap: '8px' }}>
                <button className="btn btn-sm" onClick={() => { setViewNews(null); openEdit(viewNews); }}>Modifier</button>
                <button className="btn btn-sm btn-d" onClick={() => { setViewNews(null); setDeleteData({ id: viewNews.id, label: viewNews.titre }); }}>Supprimer</button>
                <button className="btn btn-sm" onClick={() => setViewNews(null)}>Fermer</button>
              </div>
            </>
          )}
        </div>
      </div>

      {/* ══════════════════════════════════════════════════
          Modal Créer / Modifier
      ══════════════════════════════════════════════════ */}
      <div className={`mo ${modalOpen ? 'open' : ''}`}>
        <div className="md" style={{ width: '560px' }}>
          <div className="mh">
            <div className="mt">{editId ? 'Modifier la News' : 'Nouvelle Block News'}</div>
            <button className="mc" onClick={() => { setModalOpen(false); setEditId(null); }}>✕</button>
          </div>

          {/* Upload image */}
          {form.imagePreview ? (
            <div className="img-preview-wrap">
              <img src={form.imagePreview} alt="Preview" />
              <button className="img-preview-remove" onClick={removeImage} title="Supprimer l'image">✕</button>
            </div>
          ) : (
            <div
              className={`cb-upload ${dragOver ? 'drag-over' : ''}`}
              style={{ marginBottom: '20px' }}
              onClick={() => fileInputRef.current.click()}
              onDrop={handleDrop}
              onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
              onDragLeave={(e) => { e.preventDefault(); setDragOver(false); }}
            >
              <input type="file" ref={fileInputRef} accept="image/*" style={{ display: 'none' }} onChange={handleFileChange} />
              <svg width="36" height="36" fill="none" viewBox="0 0 24 24" style={{ margin: '0 auto', display: 'block', opacity: 0.3 }}>
                <rect x="3" y="3" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="1.3" />
                <circle cx="8.5" cy="8.5" r="1.5" stroke="currentColor" strokeWidth="1.3" />
                <path d="M21 15l-5-5L5 21" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <p>{dragOver ? 'Relâchez pour uploader...' : 'Cliquez ou glissez une image ici'}</p>
              <small>PNG, JPG, WebP · {editId ? 'Optionnel (conserver l\'image actuelle)' : 'Requis'}</small>
            </div>
          )}

          {/* Titre */}
          <div className="fg" style={{ marginBottom: '14px' }}>
            <label>Titre <code className="f">titre</code></label>
            <input
              type="text"
              value={form.titre}
              onChange={e => setForm(p => ({ ...p, titre: e.target.value }))}
              placeholder="Ex : Nouveau partenariat signé"
            />
          </div>

          {/* Date + Pays */}
          <div style={{ display: 'flex', gap: '12px', marginBottom: '14px' }}>
            <div className="fg" style={{ flex: 1 }}>
              <label>Date <code className="f">date</code></label>
              <input
                type="date"
                value={form.date}
                onChange={e => setForm(p => ({ ...p, date: e.target.value }))}
              />
            </div>
            <div className="fg" style={{ flex: 1 }}>
              <label>Pays <code className="f">pays</code> <span style={{ opacity: 0.5 }}>(optionnel)</span></label>
              <input
                type="text"
                value={form.pays}
                onChange={e => setForm(p => ({ ...p, pays: e.target.value }))}
                placeholder="Ex : Maroc, Algérie…"
              />
            </div>
          </div>

          {/* Description */}
          <div className="fg" style={{ marginBottom: '16px' }}>
            <label>Description <code className="f">description</code> <span style={{ opacity: 0.5 }}>(optionnel)</span></label>
            <textarea
              value={form.description}
              onChange={e => setForm(p => ({ ...p, description: e.target.value }))}
              placeholder="Décrivez le contenu de cette news…"
              style={{ minHeight: '110px' }}
            />
          </div>

          <div className="f-acts">
            <button className="btn" onClick={() => { setModalOpen(false); setEditId(null); }} disabled={saving}>Annuler</button>
            <button className="btn btn-p" onClick={saveNews} disabled={saving}>
              {saving ? (
                <>
                  <svg width="13" height="13" viewBox="0 0 24 24" style={{ animation: 'spin 1s linear infinite' }}>
                    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2.5" fill="none" strokeDasharray="31.4 31.4" strokeLinecap="round" />
                  </svg>
                  Envoi…
                </>
              ) : (
                <>
                  <svg width="13" height="13" fill="none" viewBox="0 0 24 24">
                    <path d="M19 21H5a2 2 0 01-2-2V5a2 2 0 012-2h11l5 5v11a2 2 0 01-2 2z" stroke="currentColor" strokeWidth="1.8" />
                    <polyline points="17,21 17,13 7,13 7,21" stroke="currentColor" strokeWidth="1.8" />
                  </svg>
                  {editId ? 'Mettre à jour' : 'Créer la News'}
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* ══════════════════════════════════════════════════
          Modal Confirmation de suppression
      ══════════════════════════════════════════════════ */}
      <div className={`mo ${deleteData ? 'open' : ''}`}>
        <div className="md cmw">
          <div className="ci">
            <svg width="24" height="24" fill="none" viewBox="0 0 24 24">
              <path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0zM12 9v4M12 17h.01"
                stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <div className="mt" style={{ marginBottom: '8px' }}>Confirmer la suppression</div>
          <div className="ct">
            La news "<strong>{deleteData?.label}</strong>" sera supprimée définitivement.<br />
            L'image associée sera aussi effacée du stockage.<br />
            Cette action est irréversible.
          </div>
          <div style={{ display: 'flex', gap: '10px', justifyContent: 'center' }}>
            <button className="btn" onClick={() => setDeleteData(null)}>Annuler</button>
            <button className="btn btn-d" onClick={handleDelete}>
              <svg width="12" height="12" fill="none" viewBox="0 0 24 24">
                <polyline points="3,6 5,6 21,6" stroke="currentColor" strokeWidth="1.8" />
                <path d="M19 6l-1 14H6L5 6" stroke="currentColor" strokeWidth="1.8" />
              </svg>
              Supprimer
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
