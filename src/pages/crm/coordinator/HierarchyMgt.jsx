import React, { useState } from 'react';
import { Network, UserPlus, Key, MoreVertical, X, Trash2, Edit3 } from 'lucide-react';

const ACCESS_OPTIONS = ['None', 'White-Label Basic', 'White-Label Pro'];

export const HierarchyMgt = () => {
  const [managers, setManagers] = useState([
    { id: 1, name: 'Leo Fontaine', role: 'Team Manager', teamSize: 42, access: 'White-Label Pro' },
    { id: 2, name: 'Sarah Jenkins', role: 'Team Manager', teamSize: 38, access: 'White-Label Basic' },
    { id: 3, name: 'Michael Chen', role: 'Recruit (Pending)', teamSize: 0, access: 'None' },
  ]);
  const [showModal, setShowModal] = useState(false);
  const [openMenu, setOpenMenu] = useState(null);
  const [form, setForm] = useState({ name: '', role: 'Team Manager', access: 'None' });

  const addManager = (e) => {
    e.preventDefault();
    if (!form.name.trim()) return;
    setManagers((prev) => [...prev, { id: Date.now(), name: form.name.trim(), role: form.role, teamSize: 0, access: form.access }]);
    setForm({ name: '', role: 'Team Manager', access: 'None' });
    setShowModal(false);
  };

  const cycleAccess = (id) => {
    setManagers((prev) => prev.map((m) => m.id === id
      ? { ...m, access: ACCESS_OPTIONS[(ACCESS_OPTIONS.indexOf(m.access) + 1) % ACCESS_OPTIONS.length] }
      : m));
    setOpenMenu(null);
  };

  const removeManager = (id) => {
    setManagers((prev) => prev.filter((m) => m.id !== id));
    setOpenMenu(null);
  };

  const th = { color: 'var(--text-secondary)' };
  const inputStyle = {
    backgroundColor: 'var(--surface-secondary)',
    color: 'var(--text-primary)',
    border: '1px solid var(--border-strong)',
  };

  return (
    <div className="h-full overflow-y-auto pb-10" style={{ backgroundColor: 'var(--background)', color: 'var(--text-primary)' }}>
      <div
        className="p-4 sm:p-6 sticky top-0 z-20 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4"
        style={{ backgroundColor: 'var(--surface)', borderBottom: '1px solid var(--border)' }}
      >
        <div>
          <h1 className="text-xl sm:text-2xl font-bold flex items-center gap-3" style={{ color: 'var(--text-primary)' }}>
            <div className="p-2 rounded-lg" style={{ backgroundColor: 'var(--primary-light)' }}>
              <Network className="w-6 h-6" style={{ color: 'var(--info)' }} />
            </div>
            Hierarchy Management
          </h1>
          <p className="mt-1 text-sm" style={{ color: 'var(--text-secondary)' }}>
            Recruit Managers, grant white-label platform access, and structure your teams.
          </p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="flex items-center justify-center gap-2 px-6 py-2 rounded-xl font-bold transition-all shadow-lg hover:opacity-90"
          style={{ backgroundColor: 'var(--info)', color: '#ffffff' }}
        >
          <UserPlus className="w-5 h-5" /> Recruit Manager
        </button>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 mt-8">
        <div className="rounded-2xl overflow-x-auto" style={{ backgroundColor: 'var(--surface)', border: '1px solid var(--border)' }}>
          <table className="w-full text-left min-w-[640px]">
            <thead style={{ backgroundColor: 'var(--surface-secondary)', borderBottom: '1px solid var(--border)' }}>
              <tr>
                <th className="p-4 text-xs font-semibold uppercase" style={th}>Manager Name</th>
                <th className="p-4 text-xs font-semibold uppercase" style={th}>Role</th>
                <th className="p-4 text-xs font-semibold uppercase" style={th}>Team Size</th>
                <th className="p-4 text-xs font-semibold uppercase" style={th}>White-Label Access</th>
                <th className="p-4 text-xs font-semibold uppercase text-right" style={th}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {managers.map((m) => (
                <tr key={m.id} style={{ borderBottom: '1px solid var(--border)' }}>
                  <td className="p-4 font-bold" style={{ color: 'var(--text-primary)' }}>{m.name}</td>
                  <td className="p-4" style={{ color: 'var(--text-secondary)' }}>{m.role}</td>
                  <td className="p-4" style={{ color: 'var(--text-secondary)' }}>{m.teamSize}</td>
                  <td className="p-4">
                    <span
                      className="flex items-center gap-2 font-semibold px-3 py-1 rounded-full w-max"
                      style={{ backgroundColor: 'var(--info-light)', color: 'var(--info)', border: '1px solid var(--info-border)' }}
                    >
                      <Key className="w-3 h-3" /> {m.access}
                    </span>
                  </td>
                  <td className="p-4 text-right relative">
                    <button
                      onClick={() => setOpenMenu(openMenu === m.id ? null : m.id)}
                      className="p-2 rounded-lg transition-colors"
                      style={{ color: 'var(--text-secondary)' }}
                      aria-label="Actions"
                    >
                      <MoreVertical className="w-5 h-5" />
                    </button>
                    {openMenu === m.id && (
                      <div
                        className="absolute right-4 top-12 z-30 w-48 rounded-xl py-1 text-left shadow-xl"
                        style={{ backgroundColor: 'var(--surface)', border: '1px solid var(--border-strong)' }}
                      >
                        <button
                          onClick={() => cycleAccess(m.id)}
                          className="w-full flex items-center gap-2 px-4 py-2 text-sm"
                          style={{ color: 'var(--text-primary)' }}
                        >
                          <Edit3 className="w-4 h-4" /> Change Access
                        </button>
                        <button
                          onClick={() => removeManager(m.id)}
                          className="w-full flex items-center gap-2 px-4 py-2 text-sm"
                          style={{ color: 'var(--error)' }}
                        >
                          <Trash2 className="w-4 h-4" /> Remove
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {showModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{ backgroundColor: 'rgba(0,0,0,0.55)' }}
          onClick={() => setShowModal(false)}
        >
          <form
            onSubmit={addManager}
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-md rounded-2xl p-6 space-y-4 shadow-2xl"
            style={{ backgroundColor: 'var(--surface)', border: '1px solid var(--border)', color: 'var(--text-primary)' }}
          >
            <div className="flex justify-between items-center">
              <h2 className="text-lg font-bold">Recruit Manager</h2>
              <button type="button" onClick={() => setShowModal(false)} style={{ color: 'var(--text-secondary)' }} aria-label="Close">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div>
              <label className="block text-sm mb-1" style={{ color: 'var(--text-secondary)' }}>Full Name</label>
              <input
                autoFocus
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                placeholder="e.g. Jane Doe"
                className="w-full px-3 py-2 rounded-lg outline-none"
                style={inputStyle}
              />
            </div>
            <div>
              <label className="block text-sm mb-1" style={{ color: 'var(--text-secondary)' }}>Role</label>
              <select value={form.role} onChange={(e) => setForm({ ...form, role: e.target.value })} className="w-full px-3 py-2 rounded-lg" style={inputStyle}>
                <option>Team Manager</option>
                <option>Recruit (Pending)</option>
              </select>
            </div>
            <div>
              <label className="block text-sm mb-1" style={{ color: 'var(--text-secondary)' }}>White-Label Access</label>
              <select value={form.access} onChange={(e) => setForm({ ...form, access: e.target.value })} className="w-full px-3 py-2 rounded-lg" style={inputStyle}>
                {ACCESS_OPTIONS.map((o) => <option key={o}>{o}</option>)}
              </select>
            </div>
            <div className="flex justify-end gap-3 pt-2">
              <button type="button" onClick={() => setShowModal(false)} className="px-4 py-2 rounded-lg" style={{ backgroundColor: 'var(--surface-secondary)', color: 'var(--text-primary)' }}>
                Cancel
              </button>
              <button type="submit" className="px-4 py-2 rounded-lg font-bold" style={{ backgroundColor: 'var(--info)', color: '#ffffff' }}>
                Add
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};
