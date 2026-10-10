import React, { useState } from 'react';
import { MapPin, TrendingUp, Users, FileText, CheckCircle, Search } from 'lucide-react';

export const VoterStats = () => {
  const [toast, setToast] = useState('');
  
  const notify = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(''), 3000);
  };

  const countyData = [
    { id: 1, county: 'Los Angeles County', registered: '5.8M', signed: '14,500', percentage: '0.25%', status: 'On Track' },
    { id: 2, county: 'San Diego County', registered: '1.9M', signed: '8,200', percentage: '0.43%', status: 'Ahead' },
    { id: 3, county: 'Orange County', registered: '1.8M', signed: '3,100', percentage: '0.17%', status: 'Behind' },
    { id: 4, county: 'Riverside County', registered: '1.3M', signed: '4,600', percentage: '0.35%', status: 'On Track' },
  ];

  return (
    <div className="h-full bg-surface text-primary overflow-y-auto pb-10">
      <div className="border-b border-border bg-surface-secondary p-6 backdrop-blur-xl sticky top-0 z-20">
        <div>
          <h1 className="text-2xl font-bold text-primary flex items-center gap-3">
            <div className="p-2 bg-indigo-500/20 rounded-lg">
              <MapPin className="w-6 h-6 text-indigo-400" />
            </div>
            Voter Stats
          </h1>
          <p className="mt-1 text-sm text-secondary">
            Track total registered voters vs signed voters per county to analyze petition penetration.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 mt-8 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-surface-secondary border border-border rounded-2xl p-5">
             <div className="flex items-center gap-3 mb-2"><Users className="w-5 h-5 text-blue-400" /><h3 className="text-secondary font-medium">Total Registered Voters</h3></div>
             <p className="text-3xl font-bold text-primary">22.4M</p>
          </div>
          <div className="bg-surface-secondary border border-border rounded-2xl p-5">
             <div className="flex items-center gap-3 mb-2"><FileText className="w-5 h-5 text-emerald-400" /><h3 className="text-secondary font-medium">Total Signatures</h3></div>
             <p className="text-3xl font-bold text-primary">45,820</p>
          </div>
          <div className="bg-surface-secondary border border-border rounded-2xl p-5">
             <div className="flex items-center gap-3 mb-2"><TrendingUp className="w-5 h-5 text-amber-400" /><h3 className="text-secondary font-medium">Global Penetration</h3></div>
             <p className="text-3xl font-bold text-primary">0.20%</p>
          </div>
        </div>

        <div className="bg-surface-secondary border border-border rounded-2xl overflow-hidden mt-6">
          <div className="p-5 border-b border-border flex items-center justify-between">
            <h2 className="text-lg font-bold text-primary flex items-center gap-2"><MapPin className="w-5 h-5 text-indigo-400" /> County Breakdown</h2>
            <div className="relative">
              <Search className="w-4 h-4 text-secondary absolute left-3 top-1/2 -translate-y-1/2" />
              <input type="text" onChange={() => notify('Searching county database...')} placeholder="Search county..." className="w-full sm:w-64 bg-surface border border-border rounded-xl py-2 pl-9 pr-4 text-sm text-primary focus:outline-none focus:border-indigo-500" />
            </div>
          </div>
          <table className="w-full text-left">
            <thead className="bg-surface-secondary border-b border-border">
              <tr>
                <th className="p-4 text-xs font-semibold text-secondary uppercase tracking-wider">County Name</th>
                <th className="p-4 text-xs font-semibold text-secondary uppercase tracking-wider">Registered Voters</th>
                <th className="p-4 text-xs font-semibold text-secondary uppercase tracking-wider">Signatures Collected</th>
                <th className="p-4 text-xs font-semibold text-secondary uppercase tracking-wider">% Penetration</th>
                <th className="p-4 text-xs font-semibold text-secondary uppercase tracking-wider">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-700/50">
              {countyData.map((row) => (
                <tr key={row.id} className="hover:bg-surface-secondary transition-colors">
                  <td className="p-4 font-bold text-primary">{row.county}</td>
                  <td className="p-4 text-secondary">{row.registered}</td>
                  <td className="p-4 text-secondary font-semibold">{row.signed}</td>
                  <td className="p-4 text-indigo-400 font-bold">{row.percentage}</td>
                  <td className="p-4">
                     <span className={`px-2 py-1 text-xs font-semibold rounded-md ${
                        row.status === 'Ahead' ? 'bg-emerald-500/10 text-emerald-400' : row.status === 'On Track' ? 'bg-blue-500/10 text-blue-400' : 'bg-rose-500/10 text-rose-400'
                      }`}>{row.status}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {toast && (
        <div className="fixed bottom-6 right-6 z-[120] px-6 py-3 rounded-xl shadow-xl font-bold animate-in slide-in-from-bottom-4" style={{ backgroundColor: 'var(--success)', color: 'var(--text-on-primary)' }}>
          {toast}
        </div>
      )}
    </div>
  );
};
