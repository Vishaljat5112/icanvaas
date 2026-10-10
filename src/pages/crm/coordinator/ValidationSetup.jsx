import React from 'react';
import { Settings, CheckSquare, FileText, UploadCloud, Save } from 'lucide-react';

export const ValidationSetup = () => {
  return (
    <div className="h-full flex flex-col overflow-y-auto pb-10" style={{ backgroundColor: 'var(--background)', color: 'var(--text-primary)' }}>
      <div className="p-6 sticky top-0 z-20 flex justify-between items-center shrink-0" style={{ backgroundColor: 'var(--surface)', borderBottom: '1px solid var(--border)' }}>
        <div>
          <h1 className="text-2xl font-bold flex items-center gap-3 m-0" style={{ color: 'var(--text-primary)' }}>
            <div className="p-2 rounded-lg" style={{ backgroundColor: 'var(--info-light)' }}>
              <Settings className="w-6 h-6" style={{ color: 'var(--info)' }} />
            </div>
            Validation Setup
          </h1>
          <p className="mt-1 text-sm m-0" style={{ color: 'var(--text-secondary)' }}>
            Define the structure, formatting, and required criteria for Validation Team reports.
          </p>
        </div>
        <button className="flex items-center gap-2 px-6 py-2 rounded-xl font-bold transition-all shadow-lg cursor-pointer border-none" style={{ backgroundColor: 'var(--info)', color: 'var(--text-on-primary)' }}>
          <Save className="w-5 h-5" /> Save Configuration
        </button>
      </div>

      <div className="max-w-5xl mx-auto px-6 mt-8 space-y-6 w-full">
        
        <div className="rounded-2xl p-6" style={{ backgroundColor: 'var(--surface-secondary)', border: '1px solid var(--border)' }}>
          <div className="flex items-center gap-3 mb-6 pb-4" style={{ borderBottom: '1px solid var(--border)' }}>
            <CheckSquare className="w-6 h-6" style={{ color: 'var(--success)' }} />
            <div>
              <h2 className="text-xl font-bold m-0" style={{ color: 'var(--text-primary)' }}>Validation Criteria</h2>
              <p className="text-sm m-0" style={{ color: 'var(--text-secondary)' }}>Select what the validation team must verify for every signature.</p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              { label: 'Address matches registered voter database', required: true },
              { label: 'Signature visually matches state records', required: true },
              { label: 'Name is printed clearly and legibly', required: true },
              { label: 'Date of signature is within campaign timeframe', required: true },
              { label: 'No visible cross-outs or modifications', required: false },
              { label: 'Phone number provided and active', required: false },
            ].map((item, idx) => (
              <label key={idx} className="flex items-start gap-3 p-4 rounded-xl transition-colors cursor-pointer" style={{ backgroundColor: 'var(--surface)', border: '1px solid var(--border)' }}>
                <input type="checkbox" defaultChecked={item.required} className="mt-1 w-4 h-4" />
                <div>
                  <span className="text-sm font-semibold block mb-0.5 m-0" style={{ color: 'var(--text-primary)' }}>{item.label}</span>
                  <span className="text-xs m-0" style={{ color: 'var(--text-tertiary)' }}>{item.required ? 'Mandatory for this campaign' : 'Optional criteria'}</span>
                </div>
              </label>
            ))}
          </div>
        </div>

        <div className="rounded-2xl p-6" style={{ backgroundColor: 'var(--surface-secondary)', border: '1px solid var(--border)' }}>
          <div className="flex items-center gap-3 mb-6 pb-4" style={{ borderBottom: '1px solid var(--border)' }}>
            <FileText className="w-6 h-6" style={{ color: 'var(--info)' }} />
            <div>
              <h2 className="text-xl font-bold m-0" style={{ color: 'var(--text-primary)' }}>Report Format</h2>
              <p className="text-sm m-0" style={{ color: 'var(--text-secondary)' }}>Configure how the Validation Team delivers their final data.</p>
            </div>
          </div>
          
          <div className="space-y-6">
             <div>
               <label className="block text-sm font-semibold mb-2 m-0" style={{ color: 'var(--text-secondary)' }}>Export Format</label>
               <select className="w-full md:w-1/2 rounded-xl px-4 py-3 focus:outline-none" style={{ backgroundColor: 'var(--surface)', border: '1px solid var(--border)', color: 'var(--text-primary)' }}>
                 <option>Standard CSV (Comma Separated)</option>
                 <option>Excel Worksheet (.xlsx)</option>
                 <option>State-compliant XML format</option>
               </select>
             </div>
             
             <div>
               <label className="block text-sm font-semibold mb-2 m-0" style={{ color: 'var(--text-secondary)' }}>Batch Report Frequency</label>
               <div className="flex gap-4">
                 {['Daily', 'Weekly', 'Bi-weekly'].map(freq => (
                   <label key={freq} className="flex items-center gap-2 cursor-pointer">
                     <input type="radio" name="freq" defaultChecked={freq === 'Daily'} />
                     <span className="text-sm m-0" style={{ color: 'var(--text-primary)' }}>{freq}</span>
                   </label>
                 ))}
               </div>
             </div>
          </div>
        </div>

      </div>
    </div>
  );
};
