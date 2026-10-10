import React, { useState } from 'react';
import { ShieldAlert, AlertTriangle, FileCheck, Search, X } from 'lucide-react';

const card = { backgroundColor: 'var(--surface)', border: '1px solid var(--border)', boxShadow: 'var(--shadow-sm)' };
const th = { color: 'var(--text-secondary)' };

export const ComplianceMonitor = () => {
  const [alerts, setAlerts] = useState([
    { id: 1, manager: 'Leo Fontaine', issue: 'Missing W9 Forms for 3 new circulators', severity: 'High', date: 'Today' },
    { id: 2, manager: 'Sarah Jenkins', issue: 'Territory overlap reported in District 4', severity: 'Medium', date: 'Yesterday' },
  ]);
  const [query, setQuery] = useState('');
  const [selected, setSelected] = useState(null);
  const [note, setNote] = useState('');

  const filtered = alerts.filter((a) => (a.manager + a.issue).toLowerCase().includes(query.toLowerCase()));
  const health = Math.min(100, 92 + (2 - alerts.length) * 4);

  const resolve = (e) => {
    e.preventDefault();
    setAlerts((p) => p.filter((a) => a.id !== selected.id));
    setSelected(null);
    setNote('');
  };

  return (
    <div className="h-full overflow-y-auto pb-10" style={{ backgroundColor: 'var(--background)', color: 'var(--text-primary)' }}>
      <div className="p-4 sm:p-6 sticky top-0 z-20" style={{ backgroundColor: 'var(--surface)', borderBottom: '1px solid var(--border)' }}>
        <h1 className="text-xl sm:text-2xl font-bold flex items-center gap-3" style={{ color: 'var(--text-primary)' }}>
          <div className="p-2 rounded-lg" style={{ backgroundColor: 'var(--info-light)' }}>
            <ShieldAlert className="w-6 h-6" style={{ color: 'var(--info)' }} />
          </div>
          Compliance Monitoring
        </h1>
        <p className="mt-1 text-sm" style={{ color: 'var(--text-secondary)' }}>
          Track legal requirements, employment documents, and flag compliance issues across your hierarchy.
        </p>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 mt-8 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="rounded-2xl p-6" style={card}>
            <div className="flex items-center gap-2 mb-2">
              <FileCheck className="w-5 h-5" style={{ color: 'var(--success)' }} />
              <h3 className="font-medium" style={{ color: 'var(--text-secondary)' }}>Overall Compliance Health</h3>
            </div>
            <p className="text-4xl font-bold" style={{ color: 'var(--text-primary)' }}>{health}%</p>
            <div className="w-full rounded-full mt-4" style={{ height: 8, backgroundColor: 'var(--surface-hover)' }}>
              <div className="rounded-full" style={{ height: 8, width: `${health}%`, backgroundColor: 'var(--success)' }} />
            </div>
          </div>
          <div className="rounded-2xl p-6" style={{ ...card, backgroundColor: 'var(--error-light)', border: '1px solid var(--error-border)' }}>
            <div className="flex items-center gap-2 mb-2">
              <AlertTriangle className="w-5 h-5" style={{ color: 'var(--error)' }} />
              <h3 className="font-medium" style={{ color: 'var(--error)' }}>Active Flags</h3>
            </div>
            <p className="text-4xl font-bold" style={{ color: 'var(--text-primary)' }}>{alerts.length}</p>
            <button
              onClick={() => alerts[0] && setSelected(alerts[0])}
              className="mt-4 text-sm font-bold"
              style={{ color: 'var(--error)' }}
            >
              Review Now &rarr;
            </button>
          </div>
        </div>

        <div className="rounded-2xl overflow-hidden" style={card}>
          <div className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3" style={{ borderBottom: '1px solid var(--border)' }}>
            <h2 className="font-bold" style={{ color: 'var(--text-primary)' }}>Compliance Log</h2>
            <div className="relative">
              <Search className="w-4 h-4 absolute" style={{ left: 12, top: '50%', transform: 'translateY(-50%)', color: 'var(--text-tertiary)' }} />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                type="text"
                placeholder="Search issues..."
                className="w-full rounded-lg py-1.5 pr-4 text-sm focus:outline-none"
                style={{ paddingLeft: 36, backgroundColor: 'var(--surface-secondary)', color: 'var(--text-primary)', border: '1px solid var(--border-strong)' }}
              />
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left" style={{ minWidth: 640 }}>
              <thead style={{ backgroundColor: 'var(--surface-secondary)', borderBottom: '1px solid var(--border)' }}>
                <tr>
                  <th className="p-4 text-xs font-semibold uppercase" style={th}>Manager / Team</th>
                  <th className="p-4 text-xs font-semibold uppercase" style={th}>Issue Description</th>
                  <th className="p-4 text-xs font-semibold uppercase" style={th}>Severity</th>
                  <th className="p-4 text-xs font-semibold uppercase" style={th}>Date Logged</th>
                  <th className="p-4 text-xs font-semibold uppercase text-right" style={th}>Action</th>
                </tr>
              </thead>
              <tbody>
                {filtered.length === 0 && (
                  <tr><td colSpan={5} className="p-6 text-center text-sm" style={th}>No issues found.</td></tr>
                )}
                {filtered.map((a) => (
                  <tr key={a.id} style={{ borderBottom: '1px solid var(--border)' }}>
                    <td className="p-4 font-bold" style={{ color: 'var(--text-primary)' }}>{a.manager}</td>
                    <td className="p-4" style={{ color: 'var(--text-primary)' }}>{a.issue}</td>
                    <td className="p-4">
                      <span
                        className="px-2 py-1 text-xs font-semibold rounded-md"
                        style={a.severity === 'High'
                          ? { backgroundColor: 'var(--error-light)', color: 'var(--error)', border: '1px solid var(--error-border)' }
                          : { backgroundColor: 'var(--warning-light)', color: 'var(--warning)', border: '1px solid var(--warning-border)' }}
                      >{a.severity}</span>
                    </td>
                    <td className="p-4 text-sm" style={th}>{a.date}</td>
                    <td className="p-4 text-right">
                      <button onClick={() => setSelected(a)} className="px-3 py-1 rounded text-xs font-bold" style={{ backgroundColor: 'var(--info)', color: '#fff' }}>Resolve</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {selected && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ backgroundColor: 'rgba(0,0,0,0.55)' }} onClick={() => setSelected(null)}>
          <form onSubmit={resolve} onClick={(e) => e.stopPropagation()} className="w-full max-w-md rounded-2xl p-6 space-y-4 shadow-2xl" style={{ backgroundColor: 'var(--surface)', border: '1px solid var(--border)', color: 'var(--text-primary)' }}>
            <div className="flex justify-between items-center">
              <h2 className="text-lg font-bold">Resolve Issue</h2>
              <button type="button" onClick={() => setSelected(null)} style={{ color: 'var(--text-secondary)' }} aria-label="Close"><X className="w-5 h-5" /></button>
            </div>
            <p className="text-sm" style={{ color: 'var(--text-secondary)' }}><b style={{ color: 'var(--text-primary)' }}>{selected.manager}</b> — {selected.issue}</p>
            <textarea
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="Resolution notes (optional)"
              className="w-full rounded-lg p-2 min-h-[80px] focus:outline-none"
              style={{ backgroundColor: 'var(--surface-secondary)', color: 'var(--text-primary)', border: '1px solid var(--border-strong)' }}
            />
            <div className="flex justify-end gap-3">
              <button type="button" onClick={() => setSelected(null)} className="px-4 py-2 rounded-lg" style={{ backgroundColor: 'var(--surface-secondary)', color: 'var(--text-primary)' }}>Cancel</button>
              <button type="submit" className="px-4 py-2 rounded-lg font-bold" style={{ backgroundColor: 'var(--success)', color: '#fff' }}>Mark Resolved</button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};
