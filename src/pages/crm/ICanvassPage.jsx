import React from 'react';
import { useLocation } from 'react-router-dom';
import { Layers } from 'lucide-react';

export const ICanvassPage = () => {
  const location = useLocation();
  const pathParts = location.pathname.split('/').filter(Boolean);
  const pageName = pathParts[pathParts.length - 1]
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');

  return (
    <div style={{ padding: '2rem', color: '#f8fafc', height: '100%', display: 'flex', flexDirection: 'column' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem' }}>
        <div style={{ padding: '0.5rem', background: 'rgba(56, 189, 248, 0.1)', borderRadius: '8px' }}>
          <Layers size={24} color="#38bdf8" />
        </div>
        <div>
          <h1 style={{ fontSize: '24px', fontWeight: 800, margin: 0, letterSpacing: '-0.02em' }}>{pageName}</h1>
          <p style={{ color: '#94a3b8', margin: '0.25rem 0 0 0', fontSize: '13px' }}>
            iCanvass PDM Module - This feature is currently being developed.
          </p>
        </div>
      </div>
      
      <div style={{ 
        flex: 1, 
        border: '1px dashed rgba(148, 163, 184, 0.3)', 
        borderRadius: '12px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(15, 23, 42, 0.4)'
      }}>
        <div style={{ textAlign: 'center', color: '#64748b' }}>
          <Layers size={48} style={{ opacity: 0.2, margin: '0 auto 1rem auto' }} />
          <p style={{ fontWeight: 600 }}>Construction Zone</p>
          <p style={{ fontSize: '12px' }}>The UI for <strong>{pageName}</strong> will be implemented here.</p>
        </div>
      </div>
    </div>
  );
};
