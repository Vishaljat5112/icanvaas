import React, { useState } from 'react';
import { ShieldCheck, Users, Check, X, ShieldAlert, Save, Lock, ChevronRight, Settings2 } from 'lucide-react';
import { crmNavigation } from '../../../data/mockData';
import { CRM_ROLE_CONFIG } from '../../../utils/rbac';

export const GlobalSettings = () => {
  const [selectedRole, setSelectedRole] = useState('circulator');
  const [permissions, setPermissions] = useState(() => {
    // Initialize permissions based on rbac.js
    const initialPerms = {};
    Object.values(CRM_ROLE_CONFIG).forEach(role => {
      initialPerms[role.id] = role.allowedNavIds;
    });
    return initialPerms;
  });
  
  const [isSaved, setIsSaved] = useState(false);

  const handleToggleMenu = (menuId) => {
    // Prevent removing 'dashboard' for basic navigation safety
    if (menuId === 'dashboard' || menuId === 'executive-dashboard') return;
    
    setPermissions(prev => {
      const currentRolePerms = prev[selectedRole] || [];
      const hasAccess = currentRolePerms.includes(menuId);
      
      const newPerms = hasAccess 
        ? currentRolePerms.filter(id => id !== menuId)
        : [...currentRolePerms, menuId];
        
      return {
        ...prev,
        [selectedRole]: newPerms
      };
    });
    
    setIsSaved(false);
  };

  const handleSave = () => {
    // In a real app, this would be an API call to save to DB
    // For now, we simulate saving the permissions
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 3000);
  };

  const roles = Object.values(CRM_ROLE_CONFIG);
  const activeRoleConfig = roles.find(r => r.id === selectedRole);
  
  // Group navigation by section
  const navBySection = crmNavigation.reduce((acc, item) => {
    if (!acc[item.section]) acc[item.section] = [];
    acc[item.section].push(item);
    return acc;
  }, {});

  return (
    <div className="flex h-full flex-col overflow-hidden" style={{ backgroundColor: 'var(--background)', color: 'var(--text-primary)' }}>
      {/* Header */}
      <div className="p-6 shrink-0" style={{ backgroundColor: 'var(--surface)', borderBottom: '1px solid var(--border)' }}>
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight flex items-center gap-3 m-0" style={{ color: 'var(--text-primary)' }}>
              <div className="p-2 rounded-lg" style={{ backgroundColor: 'var(--info-light)' }}>
                <ShieldCheck className="w-6 h-6" style={{ color: 'var(--info)' }} />
              </div>
              Role-Based Access Control
            </h1>
            <p className="mt-2 text-sm m-0" style={{ color: 'var(--text-secondary)' }}>
              Manage system access and menu permissions for all iCanvass PDM roles.
            </p>
          </div>
          <button
            onClick={handleSave}
            className="flex items-center gap-2 px-6 py-2.5 rounded-xl font-medium transition-all duration-300 shadow-lg cursor-pointer border-none"
            style={{
              backgroundColor: isSaved ? 'var(--success-light)' : 'var(--info)',
              color: isSaved ? 'var(--success)' : 'var(--text-on-primary)',
              border: isSaved ? '1px solid var(--success-border)' : 'none'
            }}
          >
            {isSaved ? <Check className="w-5 h-5" /> : <Save className="w-5 h-5" />}
            {isSaved ? 'Permissions Saved' : 'Save Changes'}
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex flex-1 overflow-hidden">
        
        {/* Left Sidebar - Roles List */}
        <div className="w-80 overflow-y-auto p-4 space-y-2 shrink-0" style={{ backgroundColor: 'var(--surface-secondary)', borderRight: '1px solid var(--border)' }}>
          <div className="text-xs font-semibold uppercase tracking-wider mb-4 px-3 flex items-center gap-2 m-0" style={{ color: 'var(--text-tertiary)' }}>
            <Users className="w-4 h-4" /> User Roles
          </div>
          
          {roles.map(role => (
            <button
              key={role.id}
              onClick={() => setSelectedRole(role.id)}
              className="w-full flex flex-col items-start p-3 rounded-xl transition-all duration-200 cursor-pointer"
              style={{
                backgroundColor: selectedRole === role.id ? 'var(--surface)' : 'transparent',
                border: '1px solid',
                borderColor: selectedRole === role.id ? 'var(--info)' : 'transparent',
                boxShadow: selectedRole === role.id ? 'var(--shadow-sm)' : 'none'
              }}
            >
              <div className="flex items-center justify-between w-full">
                <span className="font-semibold m-0" style={{ color: selectedRole === role.id ? 'var(--info)' : 'var(--text-secondary)' }}>
                  {role.title}
                </span>
                {selectedRole === role.id && <ChevronRight className="w-4 h-4" style={{ color: 'var(--info)' }} />}
              </div>
              <span className="text-xs mt-1 m-0" style={{ color: 'var(--text-tertiary)' }}>{role.badge}</span>
            </button>
          ))}
        </div>

        {/* Right Content - Permissions Matrix */}
        <div className="flex-1 overflow-y-auto p-8" style={{ backgroundColor: 'var(--background)' }}>
          <div className="max-w-5xl mx-auto">
            
            <div className="flex items-center justify-between mb-8 pb-4" style={{ borderBottom: '1px solid var(--border)' }}>
              <div>
                <h2 className="text-xl font-semibold flex items-center gap-2 m-0" style={{ color: 'var(--text-primary)' }}>
                  <Settings2 className="w-5 h-5" style={{ color: 'var(--text-tertiary)' }} />
                  Menu Permissions: {activeRoleConfig?.title}
                </h2>
                <p className="text-sm mt-1 m-0" style={{ color: 'var(--text-secondary)' }}>Configure which features are visible to this role.</p>
              </div>
              
              <div className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm border" style={{ backgroundColor: 'var(--warning-light)', color: 'var(--warning)', borderColor: 'var(--warning-border)' }}>
                <ShieldAlert className="w-4 h-4" />
                Changes apply on next login
              </div>
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
              {Object.entries(navBySection).map(([section, items]) => (
                <div key={section} className="rounded-2xl overflow-hidden backdrop-blur-sm" style={{ backgroundColor: 'var(--surface-secondary)', border: '1px solid var(--border)' }}>
                  <div className="px-5 py-3" style={{ backgroundColor: 'var(--surface)', borderBottom: '1px solid var(--border)' }}>
                    <h3 className="font-semibold m-0" style={{ color: 'var(--text-primary)' }}>{section}</h3>
                  </div>
                  <div className="p-2">
                    {items.map(menu => {
                      const isDashboard = menu.id === 'dashboard' || menu.id === 'executive-dashboard';
                      const isAllowed = permissions[selectedRole]?.includes(menu.id) || isDashboard;
                      const Icon = menu.icon;
                      
                      return (
                        <div 
                          key={menu.id} 
                          onClick={() => handleToggleMenu(menu.id)}
                          className={`flex items-center justify-between p-3 rounded-xl mb-1 transition-colors ${
                            isDashboard ? 'opacity-70 cursor-not-allowed' : 'cursor-pointer hover-bg-surface'
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <div className="p-2 rounded-lg" style={{
                              backgroundColor: isAllowed ? 'var(--info-light)' : 'var(--surface)',
                              color: isAllowed ? 'var(--info)' : 'var(--text-tertiary)'
                            }}>
                              <Icon className="w-4 h-4" />
                            </div>
                            <div>
                              <p className="font-medium text-sm m-0" style={{ color: isAllowed ? 'var(--text-primary)' : 'var(--text-tertiary)' }}>
                                {menu.label}
                              </p>
                              {isDashboard && <p className="text-[10px] mt-0.5 m-0" style={{ color: 'var(--warning)' }}>Required module</p>}
                            </div>
                          </div>
                          
                          <div className="flex items-center">
                            {isDashboard ? (
                              <Lock className="w-4 h-4" style={{ color: 'var(--text-tertiary)' }} />
                            ) : (
                              <div className="w-10 h-5 rounded-full relative transition-colors duration-300" style={{ backgroundColor: isAllowed ? 'var(--info)' : 'var(--border)' }}>
                                <div className={`absolute top-0.5 left-0.5 w-4 h-4 rounded-full transition-transform duration-300 ${isAllowed ? 'translate-x-5' : 'translate-x-0'}`} style={{ backgroundColor: 'var(--background)' }} />
                              </div>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};
