import React, { useState, useEffect, useContext } from 'react';
import { Users, Building2, Image as ImageIcon, LayoutTemplate, Activity } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext';

export default function Dashboard() {
  const navigate = useNavigate();
  const { baseUrl, showToast } = useContext(AppContext);
  
  const [counts, setCounts] = useState({
    contacts: 0,
    offices: 0,
    sponsors: 0,
    contentBlocks: 0,
  });
  
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    
    const fetchDashboardData = async () => {
      setLoading(true);
      const url = baseUrl.replace(/\/$/, '');
      
      try {
        const [resContacts, resOffices, resSponsors, resContentBlocks] = await Promise.all([
          fetch(`${url}/contacts`).catch(() => ({ ok: false })),
          fetch(`${url}/offices`).catch(() => ({ ok: false })),
          fetch(`${url}/sponsors`).catch(() => ({ ok: false })),
          fetch(`${url}/content-blocks`).catch(() => ({ ok: false })),
        ]);
        
        const contactsData = resContacts.ok ? await resContacts.json() : [];
        const officesData = resOffices.ok ? await resOffices.json() : [];
        const sponsorsData = resSponsors.ok ? await resSponsors.json() : [];
        const contentBlocksData = resContentBlocks.ok ? await resContentBlocks.json() : [];
        
        if (isMounted) {
          setCounts({
            contacts: Array.isArray(contactsData) ? contactsData.length : 0,
            offices: Array.isArray(officesData) ? officesData.length : 0,
            sponsors: Array.isArray(sponsorsData) ? sponsorsData.length : 0,
            contentBlocks: Array.isArray(contentBlocksData) ? contentBlocksData.length : 0,
          });
          setLoading(false);
        }
      } catch (err) {
        if (isMounted) {
          setLoading(false);
          showToast(`Erreur lors du chargement des statistiques: ${err.message}`, false);
        }
      }
    };
    
    fetchDashboardData();
    
    return () => {
      isMounted = false;
    };
  }, [baseUrl, showToast]);

  const stats = [
    { title: 'Total Contacts', value: counts.contacts, icon: <Users size={24} />, route: '/da/contacts', color: '#8a2be2' },
    { title: 'Active Offices', value: counts.offices, icon: <Building2 size={24} />, route: '/da/offices', color: '#00d2ff' },
    { title: 'Sponsors', value: counts.sponsors, icon: <ImageIcon size={24} />, route: '/da/sponsors', color: '#10b981' },
    { title: 'Content Blocks', value: counts.contentBlocks, icon: <LayoutTemplate size={24} />, route: '/da/content-blocks', color: '#ef4444' }
  ];

  const currentDate = new Date().toLocaleDateString('fr-FR', {
    weekday: 'long', 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric'
  });

  return (
    <>
      <div className="card-hdr" style={{ marginBottom: '24px' }}>
        <div>
          <h1 className="title" style={{ fontSize: '24px', fontWeight: 900, color: 'var(--txt)' }}>Tableau de Bord</h1>
          <p style={{ color: 'var(--txt3)', marginTop: '4px', textTransform: 'capitalize' }}>
            {currentDate} — Bienvenue sur l'espace d'administration.
          </p>
        </div>
        <button className="btn btn-sm" onClick={() => navigate('/da/contacts')}>
          <Activity size={16} /> Aller aux Contacts
        </button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '24px' }}>
        {stats.map((stat, idx) => (
          <div 
            key={idx} 
            className="card" 
            style={{ 
              cursor: 'pointer', 
              transition: 'transform 0.2s ease, box-shadow 0.2s ease', 
              display: 'flex', 
              flexDirection: 'column', 
              gap: '16px' 
            }}
            onClick={() => navigate(stat.route)}
            onMouseEnter={e => {
              e.currentTarget.style.transform = 'translateY(-4px)';
              e.currentTarget.style.boxShadow = `0 12px 28px ${stat.color}33`;
            }}
            onMouseLeave={e => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.16)';
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ color: 'var(--txt2)', fontWeight: 600, letterSpacing: '0.3px' }}>{stat.title}</span>
              <div style={{ color: stat.color, background: `${stat.color}1A`, padding: '10px', borderRadius: '12px' }}>
                {stat.icon}
              </div>
            </div>
            
            <div style={{ fontSize: '2.4rem', fontWeight: 900, color: 'var(--txt)' }}>
              {loading ? (
                <div className="skeleton" style={{ width: '60px', height: '38px', borderRadius: '8px' }}></div>
              ) : (
                stat.value
              )}
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
