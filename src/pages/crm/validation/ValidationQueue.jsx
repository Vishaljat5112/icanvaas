import React, { useState } from 'react';
import { 
  CheckSquare, Search, Filter, ShieldCheck, AlertCircle, CheckCircle, 
  XCircle, FileText, User, Calculator, Save, AlertTriangle
} from 'lucide-react';

export const ValidationQueue = () => {
  const [selectedBatch, setSelectedBatch] = useState(null);
  const [validInput, setValidInput] = useState('');
  
  const [batches, setBatches] = useState([
    {
      id: 'BATCH-8092',
      circulator: 'Samantha Ray',
      project: 'Prop 12 - Clean EiCanvass',
      submittedDate: 'Oct 05, 2026 - 10:30 AM',
      claimedSignatures: 145,
      status: 'Pending Review',
      priority: 'High',
      territory: 'Downtown Metro'
    },
    {
      id: 'BATCH-8091',
      circulator: 'Marcus Sterling',
      project: 'Local Mayor Petition',
      submittedDate: 'Oct 04, 2026 - 04:15 PM',
      claimedSignatures: 82,
      status: 'Pending Review',
      priority: 'Normal',
      territory: 'City Park'
    },
    {
      id: 'BATCH-8088',
      circulator: 'Eleanor Vance',
      project: 'Education Bond',
      submittedDate: 'Oct 04, 2026 - 11:00 AM',
      claimedSignatures: 210,
      status: 'In Progress',
      priority: 'High',
      territory: 'Westside Mall'
    }
  ]);

  const handleProcessValidation = () => {
    if (!selectedBatch || !validInput) return;
    
    // In real app, this would update the database and trigger the Commission Maker webhook
    const validCount = parseInt(validInput);
    const total = selectedBatch.claimedSignatures;
    const invalidCount = total - validCount;
    const percentage = Math.round((validCount / total) * 100);

    alert(`Validation Complete!\nValid: ${validCount} (${percentage}%)\nInvalid: ${invalidCount}\nCommission Maker has been updated.`);
    
    setSelectedBatch(null);
    setValidInput('');
  };

  return (
    <div className="h-full flex flex-col overflow-hidden" style={{ backgroundColor: 'var(--background)', color: 'var(--text-primary)' }}>
      
      {/* Header */}
      <div className="p-6 shrink-0" style={{ backgroundColor: 'var(--surface)', borderBottom: '1px solid var(--border)' }}>
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold flex items-center gap-3 text-primary m-0">
              <div className="p-2 rounded-lg" style={{ backgroundColor: 'var(--success-light)' }}>
                <ShieldCheck className="w-6 h-6" style={{ color: 'var(--success)' }} />
              </div>
              Validation & Compliance Queue
            </h1>
            <p className="mt-1 text-sm text-secondary m-0">
              Audit signature batches, verify against voter databases, and authorize final commission payouts.
            </p>
          </div>
          
          <div className="flex items-center gap-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-tertiary" />
              <input 
                type="text" 
                placeholder="Search batch ID..." 
                className="rounded-xl pl-10 pr-4 py-2.5 text-sm focus:outline-none w-64 transition-colors text-primary"
                style={{ backgroundColor: 'var(--surface-secondary)', border: '1px solid var(--border)' }}
              />
            </div>
            <button className="p-2.5 rounded-xl transition-colors cursor-pointer" style={{ backgroundColor: 'var(--surface-secondary)', border: '1px solid var(--border)', color: 'var(--text-secondary)' }}>
              <Filter className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      <div className="flex-1 flex overflow-hidden">
        
        {/* Left Side - Queue List */}
        <div className="w-full md:w-1/2 lg:w-1/3 overflow-y-auto flex flex-col" style={{ backgroundColor: 'var(--surface-secondary)', borderRight: '1px solid var(--border)' }}>
          <div className="p-4 flex justify-between items-center shrink-0" style={{ backgroundColor: 'var(--surface)', borderBottom: '1px solid var(--border)' }}>
            <h3 className="font-semibold text-primary m-0">Pending Audits</h3>
            <span className="text-xs font-bold px-2.5 py-1 rounded-full" style={{ backgroundColor: 'var(--success-light)', color: 'var(--success)' }}>{batches.length}</span>
          </div>
          
          <div className="p-4 space-y-3 flex-1 overflow-y-auto">
            {batches.map((batch) => (
              <div 
                key={batch.id}
                onClick={() => setSelectedBatch(batch)}
                className="p-4 rounded-xl border transition-all cursor-pointer"
                style={{
                  backgroundColor: 'var(--surface)',
                  borderColor: selectedBatch?.id === batch.id ? 'var(--success)' : 'var(--border)',
                  boxShadow: selectedBatch?.id === batch.id ? 'var(--shadow-md)' : 'none'
                }}
              >
                <div className="flex justify-between items-start mb-2">
                  <span className="text-xs font-mono text-tertiary">{batch.id}</span>
                  {batch.priority === 'High' && (
                    <span className="flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded" style={{ color: 'var(--error)', backgroundColor: 'var(--error-light)' }}>
                      <AlertCircle className="w-3 h-3" /> HIGH PRIORITY
                    </span>
                  )}
                </div>
                <h4 className="font-semibold flex items-center gap-2 mb-1 text-primary">
                  <User className="w-4 h-4" style={{ color: 'var(--success)' }} /> {batch.circulator}
                </h4>
                <p className="text-sm truncate mb-3 text-secondary m-0">{batch.project}</p>
                <div className="flex items-center justify-between mt-2 pt-3" style={{ borderTop: '1px solid var(--border)' }}>
                  <div className="flex flex-col">
                    <span className="text-[10px] uppercase tracking-wider text-tertiary">Claimed Sigs</span>
                    <span className="text-lg font-bold text-primary">{batch.claimedSignatures}</span>
                  </div>
                  <span className="text-xs font-medium px-2 py-1 rounded-md" style={{ color: 'var(--warning)', backgroundColor: 'var(--warning-light)' }}>
                    {batch.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Side - Validation Workspace */}
        <div className="hidden md:flex flex-1 overflow-y-auto relative" style={{ backgroundColor: 'var(--background)' }}>
          {selectedBatch ? (
            <div className="w-full max-w-3xl mx-auto p-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
              
              <div className="flex items-start justify-between mb-8">
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <h2 className="text-3xl font-extrabold text-primary m-0">Validation Workspace</h2>
                    <span className="text-xs font-bold px-3 py-1 rounded-full border" style={{ backgroundColor: 'var(--success-light)', color: 'var(--success)', borderColor: 'var(--success-border)' }}>
                      Active Audit
                    </span>
                  </div>
                  <p className="text-secondary m-0">Processing Batch ID: <span className="font-mono text-primary">{selectedBatch.id}</span></p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-6 mb-8">
                <div className="rounded-2xl p-5" style={{ backgroundColor: 'var(--surface)', border: '1px solid var(--border)' }}>
                  <p className="text-xs uppercase tracking-wider font-semibold mb-4 text-tertiary">Circulator Details</p>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-secondary">Name:</span>
                      <span className="text-sm font-semibold text-primary">{selectedBatch.circulator}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-secondary">Project:</span>
                      <span className="text-sm font-semibold truncate max-w-[150px] text-primary">{selectedBatch.project}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-secondary">Territory:</span>
                      <span className="text-sm font-semibold text-primary">{selectedBatch.territory}</span>
                    </div>
                  </div>
                </div>

                <div className="rounded-2xl p-5 relative overflow-hidden" style={{ backgroundColor: 'var(--surface)', border: '1px solid var(--border)' }}>
                  <div className="absolute -right-4 -bottom-4 opacity-10">
                    <FileText className="w-32 h-32" style={{ color: 'var(--info)' }} />
                  </div>
                  <p className="text-xs uppercase tracking-wider font-semibold mb-1 text-tertiary">Total Claimed Signatures</p>
                  <h3 className="text-5xl font-extrabold mb-2 m-0" style={{ color: 'var(--info)' }}>{selectedBatch.claimedSignatures}</h3>
                  <p className="text-xs text-secondary m-0">Physical sheets scanned and uploaded on {selectedBatch.submittedDate}</p>
                </div>
              </div>

              {/* Commission Maker Validation Form */}
              <div className="rounded-3xl p-8 relative shadow-2xl" style={{ backgroundColor: 'var(--surface-secondary)', border: '1px solid var(--success-border)' }}>
                <div className="flex items-center justify-between mb-6 pb-6" style={{ borderBottom: '1px solid var(--border)' }}>
                  <div className="flex items-center gap-3">
                    <div className="p-3 rounded-xl" style={{ backgroundColor: 'var(--success-light)', color: 'var(--success)' }}><Calculator className="w-6 h-6" /></div>
                    <div>
                      <h3 className="text-xl font-bold text-primary m-0">Commission Maker Sync</h3>
                      <p className="text-sm text-secondary m-0">Determine qualified signatures for final payout</p>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-8 mb-8">
                  <div>
                    <label className="block text-sm font-semibold mb-2 flex items-center gap-2 text-primary">
                      <CheckCircle className="w-4 h-4" style={{ color: 'var(--success)' }} /> Qualified (Valid) Signatures
                    </label>
                    <input 
                      type="number"
                      value={validInput}
                      onChange={(e) => setValidInput(e.target.value)}
                      max={selectedBatch.claimedSignatures}
                      min="0"
                      className="w-full text-3xl font-bold border-2 rounded-xl px-4 py-4 focus:outline-none transition-colors text-primary"
                      style={{ backgroundColor: 'var(--surface)', borderColor: 'var(--border)' }}
                      placeholder="0"
                    />
                  </div>
                  
                  <div className="opacity-80">
                    <label className="block text-sm font-semibold mb-2 flex items-center gap-2 text-secondary">
                      <XCircle className="w-4 h-4" style={{ color: 'var(--error)' }} /> Disqualified (Bad) Signatures
                    </label>
                    <div className="w-full text-3xl font-bold border-2 rounded-xl px-4 py-4 cursor-not-allowed flex items-center h-[76px]" style={{ backgroundColor: 'transparent', borderColor: 'var(--border)', color: 'var(--error)' }}>
                      {validInput ? selectedBatch.claimedSignatures - parseInt(validInput) : '-'}
                    </div>
                  </div>
                </div>

                {/* Auto Calculated Stats */}
                {validInput && (
                  <div className="rounded-xl p-4 flex items-center justify-between mb-8 animate-in fade-in" style={{ backgroundColor: 'var(--surface)', border: '1px solid var(--border)' }}>
                    <div>
                      <p className="text-xs uppercase text-tertiary m-0">Qualification Rate</p>
                      <p className="text-xl font-bold text-primary m-0">
                        {Math.round((parseInt(validInput) / selectedBatch.claimedSignatures) * 100)}%
                      </p>
                    </div>
                    {Math.round((parseInt(validInput) / selectedBatch.claimedSignatures) * 100) < 60 && (
                      <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-medium" style={{ color: 'var(--error)', backgroundColor: 'var(--error-light)' }}>
                        <AlertTriangle className="w-4 h-4" /> High Fraud Risk Detected
                      </div>
                    )}
                  </div>
                )}

                <div className="flex items-center justify-end gap-4">
                  <button onClick={() => setSelectedBatch(null)} className="px-6 py-3 font-medium transition-colors cursor-pointer" style={{ background: 'none', border: 'none', color: 'var(--text-secondary)' }}>
                    Cancel Audit
                  </button>
                  <button 
                    onClick={handleProcessValidation}
                    disabled={!validInput}
                    className="flex items-center gap-2 px-8 py-3 rounded-xl font-bold transition-all shadow-lg cursor-pointer"
                    style={{
                      backgroundColor: validInput ? 'var(--success)' : 'var(--surface)',
                      color: validInput ? 'var(--text-on-primary)' : 'var(--text-tertiary)',
                      border: validInput ? 'none' : '1px solid var(--border)',
                      boxShadow: validInput ? 'var(--shadow-md)' : 'none'
                    }}
                  >
                    <Save className="w-5 h-5" /> Finalize Validation
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="absolute inset-0 flex flex-col items-center justify-center text-tertiary">
              <CheckSquare className="w-16 h-16 mb-4 opacity-20" />
              <p className="text-lg font-medium text-secondary m-0">No Batch Selected</p>
              <p className="text-sm mt-1 m-0">Select a pending audit from the queue to begin validation.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
