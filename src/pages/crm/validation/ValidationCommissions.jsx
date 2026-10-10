import React from 'react';
import { Settings, ShieldCheck, Percent, FileCheck2, AlertTriangle } from 'lucide-react';

export const ValidationCommissions = () => {
  return (
    <div className="h-full flex flex-col overflow-y-auto pb-10" style={{ backgroundColor: 'var(--background)', color: 'var(--text-primary)' }}>
      <div className="p-6 sticky top-0 z-20 shrink-0" style={{ backgroundColor: 'var(--surface)', borderBottom: '1px solid var(--border)' }}>
        <div>
          <h1 className="text-2xl font-bold flex items-center gap-3 text-primary m-0">
            <div className="p-2 rounded-lg" style={{ backgroundColor: 'var(--info-light)' }}>
              <Settings className="w-6 h-6" style={{ color: 'var(--info)' }} />
            </div>
            Commission Maker (Validation)
          </h1>
          <p className="mt-1 text-sm text-secondary m-0">
            Define qualified signature percentage metrics to determine final pay for circulators.
          </p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 mt-8 space-y-6 w-full">
        <div className="rounded-2xl p-6 shadow-lg" style={{ backgroundColor: 'var(--surface)', border: '1px solid var(--border)' }}>
          <div className="flex items-center gap-3 mb-6 pb-4" style={{ borderBottom: '1px solid var(--border)' }}>
            <ShieldCheck className="w-6 h-6" style={{ color: 'var(--success)' }} />
            <div>
              <h2 className="text-xl font-bold text-primary m-0">Quality Thresholds</h2>
              <p className="text-sm text-secondary m-0">Set the baseline for good vs bad signatures.</p>
            </div>
          </div>
          
          <div className="space-y-8">
            <div className="space-y-3">
              <div className="flex justify-between items-end">
                <label className="text-sm font-bold text-primary flex items-center gap-2">
                  <Percent className="w-4 h-4" style={{ color: 'var(--info)' }} /> Minimum Validity Required
                </label>
                <span className="text-2xl font-black" style={{ color: 'var(--info)' }}>85%</span>
              </div>
              <input type="range" min="50" max="100" defaultValue="85" className="w-full h-2 rounded-lg appearance-none cursor-pointer" style={{ backgroundColor: 'var(--border)', accentColor: 'var(--info)' }} />
              <p className="text-xs text-secondary m-0">Circulators falling below this threshold will trigger a manual compliance review before commission payout.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4" style={{ borderTop: '1px solid var(--border)' }}>
               <div className="rounded-xl p-5 relative overflow-hidden" style={{ backgroundColor: 'var(--surface-secondary)', border: '1px solid var(--border)' }}>
                 <div className="absolute top-0 right-0 w-16 h-16 rounded-bl-full" style={{ backgroundColor: 'var(--success-light)' }}></div>
                 <FileCheck2 className="w-6 h-6 mb-3" style={{ color: 'var(--success)' }} />
                 <h4 className="font-bold text-primary m-0">Qualified Payout Rate</h4>
                 <p className="text-sm text-secondary mt-1 mb-4">Percentage of total collected signatures to approve for payroll.</p>
                 <select className="w-full rounded-lg px-3 py-2 focus:outline-none transition-colors" style={{ backgroundColor: 'var(--surface)', border: '1px solid var(--border)', color: 'var(--text-primary)' }}>
                   <option>Auto-pay 100% of Validated</option>
                   <option>Hold 10% Reserve</option>
                 </select>
               </div>
               
               <div className="rounded-xl p-5 relative overflow-hidden" style={{ backgroundColor: 'var(--surface-secondary)', border: '1px solid var(--border)' }}>
                 <div className="absolute top-0 right-0 w-16 h-16 rounded-bl-full" style={{ backgroundColor: 'var(--error-light)' }}></div>
                 <AlertTriangle className="w-6 h-6 mb-3" style={{ color: 'var(--error)' }} />
                 <h4 className="font-bold text-primary m-0">Fraud / Reject Penalty</h4>
                 <p className="text-sm text-secondary mt-1 mb-4">Determine how bad signatures affect the final circulator pay.</p>
                 <select className="w-full rounded-lg px-3 py-2 focus:outline-none transition-colors" style={{ backgroundColor: 'var(--surface)', border: '1px solid var(--border)', color: 'var(--text-primary)' }}>
                   <option>No Penalty (Pay valid only)</option>
                   <option>Deduct 1x Base Rate</option>
                   <option>Nullify Shift if &gt; 25% Bad</option>
                 </select>
               </div>
            </div>
            
            <div className="flex justify-end pt-4">
               <button className="px-6 py-3 rounded-xl font-bold shadow-lg transition-all cursor-pointer" style={{ backgroundColor: 'var(--info)', color: 'var(--text-on-primary)' }}>
                 Apply Rules to Pending Payroll
               </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
