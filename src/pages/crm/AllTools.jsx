import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { crmNavigation } from '../../data/mockData';
import { getFilteredNavigation } from '../../utils/rbac';
import { ChevronRight, LogOut, User } from 'lucide-react';
import { useToast } from '../../context/ToastContext';

export const AllTools = () => {
  const navigate = useNavigate();
  const { crmUser, logout } = useAuth();
  const { addToast } = useToast();

  const permittedNavItems = getFilteredNavigation(crmNavigation, 'crm', crmUser);

  // Group navigation items by section
  const groupedSections = permittedNavItems.reduce((acc, item) => {
    const sec = item.section || 'General';
    if (!acc[sec]) acc[sec] = [];
    acc[sec].push(item);
    return acc;
  }, {});

  const handleLinkClick = (path) => {
    navigate(path);
  };

  const handleLogout = () => {
    logout('crm');
    addToast({
      title: 'Logged Out',
      message: 'Signed out of iCanvass PDM.',
      type: 'info',
    });
    navigate('/crm/login');
  };

  const displayName = crmUser?.name || crmUser?.role || 'Executive User';
  const displayRole = crmUser?.role || 'Business Owner';
  const initial = displayName.charAt(0).toUpperCase();

  return (
    <div style={{ padding: '16px', paddingBottom: '100px', backgroundColor: 'var(--background)', minHeight: '100vh' }}>
      {/* Profile Section */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          backgroundColor: 'var(--surface)',
          padding: '16px',
          borderRadius: '12px',
          border: '1px solid var(--border)',
          marginBottom: '24px',
        }}
      >
        <div
          style={{
            width: '48px',
            height: '48px',
            borderRadius: '12px',
            background: 'linear-gradient(135deg, #06b6d4 0%, #3b82f6 50%, #8b5cf6 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#ffffff',
            fontWeight: 900,
            fontSize: '18px',
          }}
        >
          {initial}
        </div>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: '15px', fontWeight: 800, color: 'var(--text-primary)' }}>
            {displayName}
          </div>
          <div style={{ fontSize: '12px', color: '#38bdf8', fontWeight: 700 }}>
            {displayRole}
          </div>
        </div>
      </div>

      {/* Navigation Sections */}
      {Object.entries(groupedSections).map(([sectionTitle, items]) => (
        <div key={sectionTitle} style={{ marginBottom: '24px' }}>
          <div
            style={{
              fontSize: '11px',
              fontWeight: 800,
              color: 'var(--text-tertiary)',
              paddingLeft: '4px',
              marginBottom: '8px',
              textTransform: 'uppercase',
              letterSpacing: '0.06em',
            }}
          >
            {sectionTitle}
          </div>
          
          <div
            style={{
              backgroundColor: 'var(--surface)',
              borderRadius: '12px',
              border: '1px solid var(--border)',
              overflow: 'hidden',
            }}
          >
            {items.map((item, index) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => handleLinkClick(item.path)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    width: '100%',
                    padding: '14px 16px',
                    borderBottom: index < items.length - 1 ? '1px solid var(--border)' : 'none',
                    backgroundColor: 'transparent',
                    borderLeft: 'none',
                    borderRight: 'none',
                    borderTop: 'none',
                    cursor: 'pointer',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <div
                      style={{
                        padding: '8px',
                        borderRadius: '8px',
                        backgroundColor: 'var(--surface-secondary)',
                      }}
                    >
                      <Icon size={18} color="var(--text-primary)" />
                    </div>
                    <span style={{ fontSize: '14px', fontWeight: 600, color: 'var(--text-primary)' }}>
                      {item.label}
                    </span>
                  </div>
                  <ChevronRight size={16} color="var(--text-tertiary)" />
                </button>
              );
            })}
          </div>
        </div>
      ))}

      {/* Bottom Actions */}
      <div style={{ display: 'flex', gap: '12px', marginTop: '32px' }}>
        <button
          type="button"
          onClick={() => navigate('/crm/login')}
          style={{
            flex: 1,
            padding: '14px',
            borderRadius: '12px',
            backgroundColor: 'var(--surface)',
            border: '1px solid var(--border)',
            color: 'var(--text-primary)',
            fontSize: '14px',
            fontWeight: 700,
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px',
          }}
        >
          <User size={16} color="#38bdf8" />
          Switch Persona
        </button>

        <button
          type="button"
          onClick={handleLogout}
          style={{
            flex: 1,
            padding: '14px',
            borderRadius: '12px',
            backgroundColor: 'rgba(239, 68, 68, 0.1)',
            border: '1px solid rgba(239, 68, 68, 0.25)',
            color: '#ef4444',
            fontSize: '14px',
            fontWeight: 700,
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px',
          }}
        >
          <LogOut size={16} />
          Logout
        </button>
      </div>
    </div>
  );
};

export default AllTools;
