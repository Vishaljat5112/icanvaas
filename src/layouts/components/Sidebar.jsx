import React from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { LogOut, Shield, User } from 'lucide-react';
import { crmNavigation, oalNavigation } from '../../data/mockData';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../context/ToastContext';
import { getFilteredNavigation, getRoleConfig, normalizeRoleId } from '../../utils/rbac';

export const Sidebar = ({
  isCollapsed = false,
  product = 'crm',
  onCloseMobile,
}) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { logout, crmUser, oalUser } = useAuth();
  const { addToast } = useToast();

  const currentUser = product === 'crm' ? crmUser : oalUser;
  const roleConfig = getRoleConfig(currentUser, product);
  const rawNavItems = product === 'crm' ? crmNavigation : oalNavigation;

  const getProfilePath = () => {
    if (product === 'crm') {
      const crmRoleId = normalizeRoleId(crmUser, 'crm');
      if (crmRoleId === 'circulator') return '/crm/profile';
      return '/crm/settings';
    }
    const roleId = normalizeRoleId(oalUser, 'oal');
    if (roleId === 'rep') return '/oal/rep/profile';
    if (roleId === 'lender') return '/oal/lender/profile';
    if (roleId === 'admin') return '/oal/admin/profile';
    return '/oal/borrower/profile';
  };

  // Filter items permitted for the active role
  const permittedNavItems = getFilteredNavigation(rawNavItems, product, currentUser);

  // Group filtered items by section
  const groupedSections = permittedNavItems.reduce((acc, item) => {
    const sec = item.section || 'General';
    if (!acc[sec]) acc[sec] = [];
    acc[sec].push(item);
    return acc;
  }, {});

  const handleLogout = () => {
    logout(product);
    addToast({
      title: 'Logged Out',
      message: `Signed out of ${product === 'crm' ? 'iCanvass PDM' : 'OAL Network'}.`,
      type: 'info',
    });
    if (onCloseMobile) onCloseMobile();
    navigate(product === 'crm' ? '/crm/login' : '/oal/login');
  };

  return (
    <aside
      style={{
        width: isCollapsed ? 'var(--sidebar-collapsed-width)' : 'var(--sidebar-width)',
        backgroundColor: 'var(--surface)',
        borderRight: '1px solid var(--border)',
        height: '100%',
        maxHeight: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        flexShrink: 0,
        transition: 'width var(--transition-normal)',
        overflow: 'hidden',
        zIndex: 10,
        boxSizing: 'border-box',
      }}
    >
      {/* Navigation Scrollable Body */}
      <div className="flex flex-col gap-4 p-3" style={{ overflowY: 'auto', flex: 1 }}>
        {Object.entries(groupedSections).map(([sectionTitle, items]) => (
          <div key={sectionTitle} className="flex flex-col gap-1">
            {!isCollapsed && (
              <div
                style={{
                  fontSize: '11px',
                  fontWeight: 700,
                  color: 'var(--text-tertiary)',
                  padding: '0.5rem 0.5rem 0.25rem 0.5rem',
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em',
                }}
              >
                {sectionTitle}
              </div>
            )}

            {items.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path || (item.path !== '/crm/dashboard' && item.path !== '/oal/borrower/dashboard' && location.pathname.startsWith(item.path));

              return (
                <NavLink
                  key={item.id}
                  to={item.path}
                  onClick={onCloseMobile}
                  title={isCollapsed ? item.label : undefined}
                  style={({ isActive: isLinkActive }) => {
                    const currentActive = isLinkActive || isActive;
                    return {
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.75rem',
                      padding: isCollapsed ? '0.65rem 0' : '0.65rem 0.95rem',
                      justifyContent: isCollapsed ? 'center' : 'flex-start',
                      borderRadius: '14px',
                      fontSize: '13px',
                      fontWeight: currentActive ? 700 : 500,
                      color: currentActive ? '#ffffff' : 'var(--text-secondary, #475569)',
                      background: currentActive
                        ? 'linear-gradient(90deg, #6366f1 0%, #8b5cf6 30%, #ec4899 70%, #f97316 100%)'
                        : 'transparent',
                      boxShadow: currentActive
                        ? '0 8px 20px -4px rgba(124, 58, 237, 0.45), 0 4px 12px -2px rgba(249, 115, 22, 0.35)'
                        : 'none',
                      textDecoration: 'none',
                      whiteSpace: 'nowrap',
                      transition: 'all 0.2s cubic-bezier(0.16, 1, 0.3, 1)',
                      marginBottom: '2px',
                    };
                  }}
                  onMouseEnter={(e) => {
                    if (!isActive && location.pathname !== item.path) {
                      e.currentTarget.style.color = '#6366f1';
                      e.currentTarget.style.backgroundColor = 'rgba(99, 102, 241, 0.08)';
                      const iconEl = e.currentTarget.querySelector('svg');
                      if (iconEl) iconEl.style.color = '#6366f1';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!isActive && location.pathname !== item.path) {
                      e.currentTarget.style.color = 'var(--text-secondary, #475569)';
                      e.currentTarget.style.backgroundColor = 'transparent';
                      const iconEl = e.currentTarget.querySelector('svg');
                      if (iconEl) iconEl.style.color = '#64748b';
                    }
                  }}
                >
                  <Icon
                    size={18}
                    className="flex-shrink-0"
                    style={{
                      color: (isActive || location.pathname === item.path) ? '#ffffff' : '#64748b',
                      transition: 'color 200ms ease',
                    }}
                  />
                  {!isCollapsed && <span>{item.label}</span>}
                </NavLink>
              );
            })}
          </div>
        ))}
      </div>

      {/* Sidebar Footer — PROFILE & SIGN OUT */}
      <div
        className="p-3 flex flex-col gap-1 flex-shrink-0"
        style={{ borderTop: '1px solid var(--border)', backgroundColor: 'var(--surface-secondary)' }}
      >
        <button
          type="button"
          onClick={() => {
            if (onCloseMobile) onCloseMobile();
            navigate(getProfilePath());
          }}
          className="w-full flex items-center gap-3 px-3 py-2.5 text-xs font-semibold cursor-pointer transition-colors"
          style={{
            background: (location.pathname.includes('/profile') || location.pathname.includes('/settings'))
              ? 'linear-gradient(90deg, #6366f1 0%, #8b5cf6 30%, #ec4899 70%, #f97316 100%)'
              : 'transparent',
            color: (location.pathname.includes('/profile') || location.pathname.includes('/settings'))
              ? '#ffffff'
              : 'var(--text-secondary, #475569)',
            boxShadow: (location.pathname.includes('/profile') || location.pathname.includes('/settings'))
              ? '0 6px 16px -3px rgba(124, 58, 237, 0.4), 0 3px 10px -2px rgba(249, 115, 22, 0.3)'
              : 'none',
            borderRadius: '12px',
            border: 'none',
            textAlign: 'left',
          }}
          onMouseEnter={(e) => {
            if (!location.pathname.includes('/profile') && !location.pathname.includes('/settings')) {
              e.currentTarget.style.backgroundColor = 'rgba(99, 102, 241, 0.08)';
              e.currentTarget.style.color = '#6366f1';
            }
          }}
          onMouseLeave={(e) => {
            if (!location.pathname.includes('/profile') && !location.pathname.includes('/settings')) {
              e.currentTarget.style.backgroundColor = 'transparent';
              e.currentTarget.style.color = 'var(--text-secondary, #475569)';
            }
          }}
          title={isCollapsed ? 'My Profile' : undefined}
        >
          <User
            size={16}
            className="flex-shrink-0"
            style={{
              color: (location.pathname.includes('/profile') || location.pathname.includes('/settings'))
                ? '#ffffff'
                : 'currentColor',
            }}
          />
          {!isCollapsed && <span>My Profile</span>}
        </button>

        <button
          type="button"
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-3 py-2.5 text-xs font-semibold cursor-pointer transition-colors"
          style={{
            backgroundColor: 'transparent',
            color: 'var(--error)',
            borderRadius: '12px',
            border: 'none',
            textAlign: 'left',
          }}
          onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = 'var(--error-light)'; }}
          onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = 'transparent'; }}
          title={isCollapsed ? `Sign Out (${product.toUpperCase()})` : undefined}
        >
          <LogOut size={16} className="flex-shrink-0" />
          {!isCollapsed && <span>Sign Out ({product.toUpperCase()})</span>}
        </button>
      </div>
    </aside>
  );
};
