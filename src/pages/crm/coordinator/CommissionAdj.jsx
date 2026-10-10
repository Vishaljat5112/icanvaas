import React, { useState } from 'react';
import { Landmark, Edit3, Search, CheckCircle2, X } from 'lucide-react';

const card = { backgroundColor: 'var(--surface)', border: '1px solid var(--border)', boxShadow: 'var(--shadow-sm)' };
const th = { color: 'var(--text-secondary)' };
const money = (n) => `${n < 0 ? '-' : ''}$${Math.abs(n).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

export const CommissionAdj = () => {
  const [rows, setRows] = useState([
    { id: 'CM-492', manager: 'Leo Fontaine', team: 'Team Alpha', gross: 14500, adj: -500, approved: false },
    { id: 'CM-493', manager: 'Sarah Jenkins', team: 'Team Beta', gross: 8200, adj: 0, approved: false },
  ]);
  const [query, setQuery] = useState('');
  const [editing, setEditing] = useState(null);
  const [adjValue, setAdjValue] = useState('');

  const filtered = rows.filter((r) => `${r.manager} ${r.team}`.toLowerCase().includes(query.toLowerCase()));

  const openEdit = (r) => { setEditing(r); setAdjValue(String(r.adj)); };
  const saveEdit = (e) => {
    e.preventDefault();
    const v = parseFloat(adjValue);
    if (Number.isNaN(v)) return;
    setRows((p) => p.map((r) => (r.id === editing.id ? { ...r, adj: v } : r)));
    setEditing(null);
  };
  const approve = (id) => setRows((p) => p.map((r) => (r.id === id ? { ...r, approved: true } : r)));

  return (
    <div className="h-full overflow-y-auto pb-10" style={{ backgroundColor: 'var(--background)', color: 'var(--text-primary)' }}>
      <div className="p-4 sm:p-6 sticky top-0 z-20" style={{ backgroundColor: 'var(--surface)', borderBottom: '1px solid var(--border)' }}>
        <h1 className="text-xl sm:text-2xl font-bold flex items-center gap-3" style={{ color: 'var(--text-primary)' }}>
          <div className="p-2 rounded-lg" style={{ backgroundColor: 'var(--info-light)' }}>
            <Landmark className="w-6 h-6" style={{ color: 'var(--info)' }} />
          </div>
          Commission Adjustments
        </h1>
        <p className="mt-1 text-sm" style={th}>Review, edit, and finalize commissions for your hierarchy before submitting to payroll.</p>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 mt-8">
        <div className="rounded-2xl overflow-hidden" style={card}>
          <div className="p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3" style={{ borderBottom: '1px solid var(--border)', backgroundColor: 'var(--surface-secondary)' }}>
            <h2 className="font-bold text-lg" style={{ color: 'var(--text-primary)' }}>Hierarchy Payroll Review</h2>
            <div className="relative w-full sm:w-64">
              <Search className="w-4 h-4 absolute" style={{ left: 12, top: '50%', transform: 'translateY(-50%)', color: 'var(--text-tertiary)' }} />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                type="text"
                placeholder="Search manager or team..."
                className="w-full rounded-lg py-2 pr-4 text-sm focus:outline-none"
                style={{ paddingLeft: 36, backgroundColor: 'var(--surface)', color: 'var(--text-primary)', border: '1px solid var(--border-strong)' }}
              />
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left" style={{ minWidth: 720 }}>
              <thead style={{ backgroundColor: 'var(--surface-secondary)', borderBottom: '1px solid var(--border)' }}>
                <tr>
                  <th className="p-4 text-xs font-semibold uppercase" style={th}>Batch ID</th>
                  <th className="p-4 text-xs font-semibold uppercase" style={th}>Manager (Team)</th>
                  <th className="p-4 text-xs font-semibold uppercase" style={th}>Gross Calc</th>
                  <th className="p-4 text-xs font-semibold uppercase" style={th}>Manual Adjs</th>
                  <th className="p-4 text-xs font-semibold uppercase" style={th}>Final Payout</th>
                  <th className="p-4 text-xs font-semibold uppercase text-right" style={th}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.length === 0 && <tr><td colSpan={6} className="p-6 text-center text-sm" style={th}>No results.</td></tr>}
                {filtered.map((r) => (
                  <tr key={r.id} style={{ borderBottom: '1px solid var(--border)' }}>
                    <td className="p-4 font-mono text-xs font-bold" style={{ color: 'var(--info)' }}>{r.id}</td>
                    <td className="p-4">
                      <div className="font-bold" style={{ color: 'var(--text-primary)' }}>{r.manager}</div>
                      <div className="text-xs" style={{ color: 'var(--text-tertiary)' }}>{r.team}</div>
                    </td>
                    <td className="p-4 font-medium" style={{ color: 'var(--text-primary)' }}>{money(r.gross)}</td>
                    <td className="p-4">
                      <span className="inline-flex items-center gap-2 font-medium" style={{ color: r.adj < 0 ? 'var(--error)' : 'var(--text-secondary)' }}>
                        {money(r.adj)}
                        <button onClick={() => openEdit(r)} disabled={r.approved} aria-label="Edit adjustment" style={{ color: 'var(--text-secondary)' }}>
                          <Edit3 className="w-3 h-3" />
                        </button>
                      </span>
                    </td>
                    <td className="p-4 font-bold text-lg" style={{ color: 'var(--success)' }}>{money(r.gross + r.adj)}</td>
                    <td className="p-4 text-right">
                      <button
                        onClick={() => approve(r.id)}
                        disabled={r.approved}
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-bold disabled:opacity-60"
                        style={{ backgroundColor: 'var(--success)', color: '#fff' }}
                      >
                        <CheckCircle2 className="w-4 h-4" /> {r.approved ? 'Approved' : 'Approve'}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {editing && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ backgroundColor: 'rgba(0,0,0,0.55)' }} onClick={() => setEditing(null)}>
          <form onSubmit={saveEdit} onClick={(e) => e.stopPropagation()} className="w-full max-w-sm rounded-2xl p-6 space-y-4 shadow-2xl" style={{ backgroundColor: 'var(--surface)', border: '1px solid var(--border)', color: 'var(--text-primary)' }}>
            <div className="flex justify-between items-center">
              <h2 className="text-lg font-bold">Edit Adjustment</h2>
              <button type="button" onClick={() => setEditing(null)} style={th} aria-label="Close"><X className="w-5 h-5" /></button>
            </div>
            <p className="text-sm" style={th}>{editing.manager} ({editing.id})</p>
            <input
              autoFocus
              type="number"
              step="0.01"
              value={adjValue}
              onChange={(e) => setAdjValue(e.target.value)}
              className="w-full px-3 py-2 rounded-lg focus:outline-none"
              style={{ backgroundColor: 'var(--surface-secondary)', color: 'var(--text-primary)', border: '1px solid var(--border-strong)' }}
            />
            <div className="flex justify-end gap-3">
              <button type="button" onClick={() => setEditing(null)} className="px-4 py-2 rounded-lg" style={{ backgroundColor: 'var(--surface-secondary)', color: 'var(--text-primary)' }}>Cancel</button>
              <button type="submit" className="px-4 py-2 rounded-lg font-bold" style={{ backgroundColor: 'var(--info)', color: '#fff' }}>Save</button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};
