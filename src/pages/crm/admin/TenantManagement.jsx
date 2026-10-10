import React from 'react';
import { Building2, Plus, Settings, Key, UserCheck } from 'lucide-react';

export const TenantManagement = () => {
  const tenants = [
    { id: 'T-1042', name: 'Liberty Campaigns LLC', status: 'Active', users: 1450, plan: 'Enterprise', created: 'Oct 2025' },
    { id: 'T-1043', name: 'Voter Choice Org', status: 'Active', users: 340, plan: 'Pro', created: 'Jan 2026' },
    { id: 'T-1044', name: 'Statewide Solutions', status: 'Pending Setup', users: 0, plan: 'Custom', created: 'Oct 2026' },
  ];

  return (
    <div className="h-full bg-surface text-primary overflow-y-auto pb-10">
      <div className="border-b border-border bg-surface-secondary p-6 backdrop-blur-xl sticky top-0 z-20 flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-primary flex items-center gap-3">
            <div className="p-2 bg-indigo-500/20 rounded-lg">
              <Building2 className="w-6 h-6 text-indigo-400" />
            </div>
            Tenant / White Label Management
          </h1>
          <p className="mt-1 text-sm text-secondary">
            Setup and manage isolated company workspaces (tenants) using the iCanvass platform.
          </p>
        </div>
        <button className="flex items-center gap-2 px-6 py-2 bg-indigo-600 hover:bg-indigo-500 text-primary rounded-xl font-bold transition-all shadow-lg shadow-indigo-500/20">
          <Plus className="w-5 h-5" /> New Tenant
        </button>
      </div>

      <div className="max-w-7xl mx-auto px-6 mt-8 space-y-6">
        <div className="bg-surface-secondary border border-border rounded-2xl overflow-hidden">
          <table className="w-full text-left">
            <thead className="bg-surface-secondary border-b border-border">
              <tr>
                <th className="p-4 text-xs font-semibold text-secondary uppercase">Tenant Name (ID)</th>
                <th className="p-4 text-xs font-semibold text-secondary uppercase">Status</th>
                <th className="p-4 text-xs font-semibold text-secondary uppercase">Registered Users</th>
                <th className="p-4 text-xs font-semibold text-secondary uppercase">Current Plan</th>
                <th className="p-4 text-xs font-semibold text-secondary uppercase text-right">Admin Access</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-700/50">
              {tenants.map(t => (
                <tr key={t.id} className="hover:bg-surface-secondary transition-colors">
                  <td className="p-4">
                    <div className="font-bold text-primary">{t.name}</div>
                    <div className="text-xs text-secondary font-mono">{t.id} &bull; Created {t.created}</div>
                  </td>
                  <td className="p-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                      t.status === 'Active' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                    }`}>
                      {t.status}
                    </span>
                  </td>
                  <td className="p-4 font-mono text-secondary">{t.users.toLocaleString()}</td>
                  <td className="p-4 text-secondary font-medium flex items-center gap-2 mt-2">
                    <Key className="w-4 h-4 text-indigo-400" /> {t.plan}
                  </td>
                  <td className="p-4 text-right space-x-2">
                    <button className="p-2 bg-surface-secondary/50 hover:bg-surface-hover rounded-lg text-secondary transition-colors tooltip-target" title="Configure White-Label Settings">
                      <Settings className="w-4 h-4" />
                    </button>
                    <button className="p-2 bg-surface-secondary/50 hover:bg-indigo-600 hover:text-primary rounded-lg text-secondary transition-colors tooltip-target" title="Impersonate Tenant Admin">
                      <UserCheck className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
