import React, { useState, useContext, useEffect, useCallback } from 'react';
import { AppContext } from '../context/AppContext';

export default function WhyChooseUs() {
  const { showToast, baseUrl } = useContext(AppContext);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState(null);
  const [saving, setSaving] = useState(false);

  const [formData, setFormData] = useState({
    id: null,
    movesCompleted: '',
    secureStorageSpace: '',
    yearsOfExperience: ''
  });

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

  const loadData = useCallback(async () => {
    setLoading(true);
    setLoadError(null);
    try {
      const res = await api('/why-choose-us');
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();
      
      if (Array.isArray(data) && data.length > 0) {
        setFormData({
          id: data[0].id,
          movesCompleted: data[0].movesCompleted || '',
          secureStorageSpace: data[0].secureStorageSpace || '',
          yearsOfExperience: data[0].yearsOfExperience || ''
        });
      }
    } catch (e) {
      setLoadError(e.message || 'Erreur réseau');
      showToast(`Chargement impossible : ${e.message || 'erreur'}`, false);
    } finally {
      setLoading(false);
    }
  }, [api, showToast]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const saveItem = async () => {
    if (!formData.movesCompleted || !formData.secureStorageSpace || !formData.yearsOfExperience) {
      showToast('Tous les champs sont requis.', false);
      return;
    }
    setSaving(true);
    try {
      const body = { 
        movesCompleted: parseInt(formData.movesCompleted, 10), 
        secureStorageSpace: parseInt(formData.secureStorageSpace, 10), 
        yearsOfExperience: parseInt(formData.yearsOfExperience, 10) 
      };

      if (formData.id) {
        const res = await api(`/why-choose-us/${formData.id}`, {
          method: 'PUT',
          body: JSON.stringify({ id: formData.id, ...body }),
        });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        showToast('Métriques mises à jour avec succès !');
      } else {
        const res = await api('/why-choose-us', {
          method: 'POST',
          body: JSON.stringify(body),
        });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        showToast('Métriques créées avec succès !');
        // Reload to get the new ID
        await loadData();
      }
    } catch (e) {
      showToast(`Enregistrement impossible : ${e.message || 'erreur'}`, false);
    } finally {
      setSaving(false);
    }
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  if (loading) {
     return (
        <div className="cb-card" style={{ maxWidth: '800px', margin: '0 auto', gridTemplateRows: 'auto', display: 'block' }}>
            <div className="skeleton" style={{ width: '200px', height: '24px', marginBottom: '16px' }} />
            <div className="skeleton" style={{ width: '100%', height: '300px', borderRadius: '16px' }} />
        </div>
     );
  }

  return (
    <>
      {loadError && (
        <div className="empty" style={{ marginBottom: '14px', padding: '12px', background: 'rgba(239, 68, 68, 0.1)', border: '1px solid rgba(239, 68, 68, 0.2)', borderRadius: '8px', color: '#ef4444' }}>
          <p style={{ margin: 0 }}>API : {baseUrl}/why-choose-us — {loadError}</p>
        </div>
      )}

      <div className="cb-card" style={{ maxWidth: '700px', margin: '20px auto 40px', gridTemplateRows: 'auto', display: 'block' }}>
        <div className="card-hdr" style={{ marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div className="logo-mark" style={{ width: '48px', height: '48px', borderRadius: '14px', flexShrink: 0 }}>
            <svg width="24" height="24" fill="none" viewBox="0 0 24 24">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87L18.18 22 12 18.27 5.82 22 7 14.14l-5-4.87 6.91-1.01L12 2z" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <div>
            <h2 className="card-title" style={{ fontSize: '20px', margin: 0 }}>Configuration "Pourquoi nous"</h2>
            <p className="card-sub" style={{ fontSize: '13px', marginTop: '4px' }}>Ces métriques clés sont mises en avant sur la page d'accueil pour rassurer vos clients.</p>
          </div>
        </div>

        <div style={{ background: 'var(--bg2)', padding: '24px', borderRadius: '16px', border: '1px solid var(--bdr)' }}>
          {formData.id && (
            <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '16px' }}>
              <span className="badge bp" style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#22c55e', display: 'inline-block' }}></span>
                Configuration active (ID: {formData.id})
              </span>
            </div>
          )}

          <div className="fg" style={{ marginBottom: '20px' }}>
            <label style={{ fontSize: '13px', fontWeight: 600, color: 'var(--txt)', marginBottom: '8px' }}>
              Déménagements complétés <span style={{ color: 'var(--txt3)', fontWeight: 400, marginLeft: '6px' }}>/ Objectif dépassé</span>
            </label>
            <div style={{ position: 'relative' }}>
              <input 
                type="number" 
                value={formData.movesCompleted} 
                onChange={(e) => handleInputChange('movesCompleted', e.target.value)} 
                placeholder="Ex: 30000" 
                style={{ width: '100%', boxSizing: 'border-box', paddingLeft: '46px', fontSize: '16px', padding: '14px 14px 14px 46px' }} 
              />
              <div style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', opacity: 0.6, fontSize: '18px' }}>📦</div>
            </div>
          </div>

          <div className="fg" style={{ marginBottom: '20px' }}>
            <label style={{ fontSize: '13px', fontWeight: 600, color: 'var(--txt)', marginBottom: '8px' }}>
              Espace de stockage sécurisé <span style={{ color: 'var(--txt3)', fontWeight: 400, marginLeft: '6px' }}>(en m²)</span>
            </label>
            <div style={{ position: 'relative' }}>
              <input 
                type="number" 
                value={formData.secureStorageSpace} 
                onChange={(e) => handleInputChange('secureStorageSpace', e.target.value)} 
                placeholder="Ex: 4500" 
                style={{ width: '100%', boxSizing: 'border-box', paddingLeft: '46px', fontSize: '16px', padding: '14px 14px 14px 46px' }} 
              />
              <div style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', opacity: 0.6, fontSize: '18px' }}>🛡️</div>
            </div>
          </div>

          <div className="fg" style={{ marginBottom: '8px' }}>
            <label style={{ fontSize: '13px', fontWeight: 600, color: 'var(--txt)', marginBottom: '8px' }}>
              Années d'expérience cumulées
            </label>
            <div style={{ position: 'relative' }}>
              <input 
                type="number" 
                value={formData.yearsOfExperience} 
                onChange={(e) => handleInputChange('yearsOfExperience', e.target.value)} 
                placeholder="Ex: 15" 
                style={{ width: '100%', boxSizing: 'border-box', paddingLeft: '46px', fontSize: '16px', padding: '14px 14px 14px 46px' }} 
              />
              <div style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', opacity: 0.6, fontSize: '18px' }}>⭐</div>
            </div>
          </div>
        </div>

        <div style={{ marginTop: '24px', display: 'flex', justifyContent: 'flex-end', borderTop: '1px solid var(--bdr)', paddingTop: '20px' }}>
          <button 
            className="btn btn-p" 
            onClick={saveItem} 
            disabled={saving} 
            style={{ padding: '12px 28px', fontSize: '14px', fontWeight: 700, letterSpacing: '0.5px' }}
          >
            {saving ? (
              <>
                <svg width="15" height="15" viewBox="0 0 24 24" style={{ animation: 'spin 1s linear infinite' }}>
                  <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2.5" fill="none" strokeDasharray="31.4 31.4" strokeLinecap="round" />
                </svg>
                Sauvegarde...
              </>
            ) : (
              <>
                <svg width="16" height="16" fill="none" viewBox="0 0 24 24">
                  <path d="M19 21H5a2 2 0 01-2-2V5a2 2 0 012-2h11l5 5v11a2 2 0 01-2 2z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                  <polyline points="17,21 17,13 7,13 7,21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                </svg>
                {formData.id ? 'Mettre à jour les métriques' : 'Créer la configuration'}
              </>
            )}
          </button>
        </div>
      </div>
    </>
  );
}
