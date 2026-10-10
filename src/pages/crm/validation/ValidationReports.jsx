import React from 'react';
import { FileText, Send, AlertCircle, FileCheck2, Database } from 'lucide-react';

export const ValidationReports = () => {
  return (
    <div className="h-full flex flex-col overflow-y-auto pb-10" style={{ backgroundColor: 'var(--background)', color: 'var(--text-primary)' }}>
      <div className="p-6 sticky top-0 z-20 shrink-0" style={{ backgroundColor: 'var(--surface)', borderBottom: '1px solid var(--border)' }}>
        <h1 className="text-2xl font-bold flex items-center gap-3 text-primary m-0">
          <div className="p-2 rounded-lg" style={{ backgroundColor: 'var(--info-light)' }}>
            <FileText className="w-6 h-6" style={{ color: 'var(--info)' }} />
          </div>
          Compliance Reports
        </h1>
        <p className="mt-1 text-sm text-secondary m-0">
          Input the results of verified signatures and export structured reports for Coordinators.
        </p>
      </div>

      <div className="max-w-6xl mx-auto px-6 mt-8 space-y-6 w-full">
        
        {/* Report Input Form */}
        <div className="rounded-2xl overflow-hidden" style={{ backgroundColor: 'var(--surface-secondary)', border: '1px solid var(--border)' }}>
          <div className="p-5 flex items-center gap-3" style={{ backgroundColor: 'var(--surface)', borderBottom: '1px solid var(--border)' }}>
            <Database className="w-5 h-5" style={{ color: 'var(--info)' }} />
            <h2 className="font-bold text-lg text-primary m-0">Batch Result Data Entry</h2>
          </div>
          
          <div className="p-6 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-semibold text-primary">Campaign / Project</label>
                <select className="w-full rounded-xl px-4 py-3 focus:outline-none transition-colors" style={{ backgroundColor: 'var(--surface)', border: '1px solid var(--border)', color: 'var(--text-primary)' }}>
                  <option>Prop 12 - Clean EiCanvass Ballot</option>
                  <option>Local Mayor Petition (District 4)</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold text-primary">Batch ID Reference</label>
                <input type="text" placeholder="e.g. BATCH-8912" className="w-full rounded-xl px-4 py-3 focus:outline-none transition-colors" style={{ backgroundColor: 'var(--surface)', border: '1px solid var(--border)', color: 'var(--text-primary)' }} />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold text-primary">Circulator (Gatherer)</label>
                <select className="w-full rounded-xl px-4 py-3 focus:outline-none transition-colors" style={{ backgroundColor: 'var(--surface)', border: '1px solid var(--border)', color: 'var(--text-primary)' }}>
                  <option>Tanya Sterling</option>
                  <option>David Ross</option>
                  <option>Emma Wilson</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4" style={{ borderTop: '1px solid var(--border)' }}>
              <div className="rounded-xl p-5 space-y-3" style={{ backgroundColor: 'var(--success-light)', border: '1px solid var(--success-border)' }}>
                 <h4 className="font-bold flex items-center gap-2 m-0" style={{ color: 'var(--success)' }}><FileCheck2 className="w-4 h-4" /> Good Signatures</h4>
                 <p className="text-xs text-secondary m-0">Total valid signatures meeting Coordinator's criteria.</p>
                 <input type="number" placeholder="0" className="w-full font-bold text-lg rounded-xl px-4 py-3 focus:outline-none transition-colors" style={{ backgroundColor: 'var(--surface)', border: '1px solid var(--border)', color: 'var(--success)' }} />
              </div>
              
              <div className="rounded-xl p-5 space-y-3" style={{ backgroundColor: 'var(--error-light)', border: '1px solid var(--error-border)' }}>
                 <h4 className="font-bold flex items-center gap-2 m-0" style={{ color: 'var(--error)' }}><AlertCircle className="w-4 h-4" /> Bad / Invalid Signatures</h4>
                 <p className="text-xs text-secondary m-0">Count of rejected signatures due to illegibility or mismatches.</p>
                 <input type="number" placeholder="0" className="w-full font-bold text-lg rounded-xl px-4 py-3 focus:outline-none transition-colors" style={{ backgroundColor: 'var(--surface)', border: '1px solid var(--border)', color: 'var(--error)' }} />
              </div>
            </div>
            
            <div className="pt-4 space-y-2">
              <label className="text-sm font-semibold text-primary">Auditor Notes / Compliance Flag Reasons</label>
              <textarea placeholder="Provide detailed reasoning for rejected signatures..." className="w-full h-24 rounded-xl px-4 py-3 focus:outline-none resize-none transition-colors" style={{ backgroundColor: 'var(--surface)', border: '1px solid var(--border)', color: 'var(--text-primary)' }}></textarea>
            </div>
            
            <div className="pt-4 flex justify-end">
              <button className="flex items-center gap-2 px-8 py-3 rounded-xl font-bold shadow-lg transition-all cursor-pointer" style={{ backgroundColor: 'var(--info)', color: 'var(--text-on-primary)' }}>
                <Send className="w-4 h-4" /> Finalize & Submit Report
              </button>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
