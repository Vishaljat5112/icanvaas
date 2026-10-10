import React, { useState } from 'react';
import { Landmark, Settings2, ShieldAlert, SplitSquareHorizontal, Undo2, TrendingUp, Users, CheckCircle, X } from 'lucide-react';

export const CommissionMaker = () => {
  const [activeTab, setActiveTab] = useState('formulas');
  const [formulas, setFormulas] = useState([
    { id: 1, name: 'Standard Circulator Tier', base: '$3.00/sig', bonus: '+$0.50 after 500', status: 'Active' },
    { id: 2, name: 'Manager Override', base: '10% gross', bonus: 'None', status: 'Active' },
    { id: 3, name: 'Weekend Blitz', base: '$5.00/sig', bonus: 'Flat $100 for 50 sigs', status: 'Draft' },
  ]);
  // modal: { type: 'rule' | 'assign' | 'config', data }
  const [modal, setModal] = useState(null);
  const [form, setForm] = useState({});
  const [splits, setSplits] = useState([
    { id: 1, name: 'Standard Pair Split', value: '50/50', condition: 'Same Location' },
  ]);
  const [overrides, setOverrides] = useState([
    { id: 1, name: 'Team Leader Override', value: '10%', target: 'Total Revenue' },
  ]);
  const [toast, setToast] = useState('');

  const notify = (msg) => { setToast(msg); setTimeout(() => setToast(''), 2500); };
  const openRule = (f) => {
    setForm(f ? { ...f } : { name: '', base: '', bonus: '', status: 'Draft' });
    setModal({ type: 'rule', editing: !!f });
  };
  const openAssign = (f) => { setForm({ rule: f.name, target: 'All Circulators' }); setModal({ type: 'assign' }); };
  const openConfig = () => { setForm({ name: '', value: '' }); setModal({ type: 'config' }); };
  const closeModal = () => setModal(null);

  const submitModal = (e) => {
    e.preventDefault();
    if (modal.type === 'rule') {
      if (!form.name?.trim()) return;
      if (modal.editing) setFormulas((p) => p.map((x) => (x.id === form.id ? form : x)));
      else setFormulas((p) => [...p, { ...form, id: Date.now(), bonus: form.bonus || 'None' }]);
      notify(modal.editing ? 'Rule updated' : 'Rule created');
    } else if (modal.type === 'assign') {
      notify(`"${form.rule}" assigned to ${form.target}`);
    } else if (modal.type === 'config_override') {
      if (!form.name?.trim()) return;
      if (modal.editing) setOverrides(p => p.map(x => x.id === form.id ? form : x));
      else setOverrides(p => [...p, { ...form, id: Date.now() }]);
      notify(modal.editing ? 'Override updated' : 'Override added');
    } else if (modal.type === 'config_split') {
      if (!form.name?.trim()) return;
      if (modal.editing) setSplits(p => p.map(x => x.id === form.id ? form : x));
      else setSplits(p => [...p, { ...form, id: Date.now() }]);
      notify(modal.editing ? 'Split updated' : 'Split added');
    } else {
      notify('Configuration added');
    }
    closeModal();
  };

  const fieldStyle = { backgroundColor: 'var(--surface-secondary)', color: 'var(--text-primary)', border: '1px solid var(--border-strong)' };
  const Field = ({ label, k, placeholder }) => (
    <div>
      <label className="block text-sm mb-1" style={{ color: 'var(--text-secondary)' }}>{label}</label>
      <input value={form[k] || ''} onChange={(e) => setForm({ ...form, [k]: e.target.value })} placeholder={placeholder} className="w-full px-3 py-2 rounded-lg outline-none" style={fieldStyle} />
    </div>
  );

  return (
    <div className="h-full flex flex-col overflow-y-auto pb-10" style={{ backgroundColor: 'var(--background)', color: 'var(--text-primary)' }}>
      {/* Header */}
      <div className="p-6 sticky top-0 z-20" style={{ backgroundColor: 'var(--surface)', borderBottom: '1px solid var(--border)' }}>
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold flex items-center gap-3 text-primary">
              <div className="p-2 rounded-lg" style={{ backgroundColor: 'var(--info-light)' }}>
                <Landmark className="w-6 h-6" style={{ color: 'var(--info)' }} />
              </div>
              Commission Maker
            </h1>
            <p className="mt-1 text-sm text-secondary">
              Automate calculations, set custom tiered rates, handle manager overrides, and configure clawbacks.
            </p>
          </div>
          <button onClick={() => openRule(null)} className="px-6 py-3 rounded-xl font-bold transition-all shadow-lg" style={{ backgroundColor: 'var(--info)', color: 'var(--text-on-primary)' }}>
            Create New Rule
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 mt-8 space-y-6 w-full">
        
        {/* Navigation Tabs */}
        <div className="flex space-x-1 p-1 rounded-xl w-fit flex-wrap" style={{ backgroundColor: 'var(--surface-secondary)', border: '1px solid var(--border)' }}>
          {[
            { id: 'formulas', icon: Settings2, label: 'Formulas & Tiers' },
            { id: 'overrides', icon: TrendingUp, label: 'Manager Overrides' },
            { id: 'splits', icon: SplitSquareHorizontal, label: 'Deal Splits' },
            { id: 'clawbacks', icon: Undo2, label: 'Clawbacks & Rejects' },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-all"
                style={{
                  backgroundColor: isActive ? 'var(--surface)' : 'transparent',
                  color: isActive ? 'var(--text-primary)' : 'var(--text-secondary)',
                  boxShadow: isActive ? 'var(--shadow-sm)' : 'none'
                }}
              >
                <Icon className="w-4 h-4" /> {tab.label}
              </button>
            );
          })}
        </div>

        {/* Tab Content Area */}
        <div className="rounded-2xl p-6" style={{ backgroundColor: 'var(--surface)', border: '1px solid var(--border)' }}>
          
          {activeTab === 'formulas' && (
            <div className="space-y-6 animate-in fade-in duration-300">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold text-primary">Active Commission Structures</h2>
                <div className="text-sm text-secondary">Rules applied to Circulators</div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {formulas.map(f => (
                  <div key={f.id} className="rounded-xl p-5 transition-all group relative overflow-hidden" style={{ backgroundColor: 'var(--surface-secondary)', border: '1px solid var(--border)' }}>
                    {f.status === 'Active' && <div className="absolute top-0 right-0 w-16 h-16 rounded-bl-full" style={{ backgroundColor: 'var(--success-light)' }} />}
                    <div className="flex justify-between items-start mb-4 relative z-10">
                      <h3 className="font-bold text-lg text-primary m-0">{f.name}</h3>
                      <span className="px-2 py-1 text-[10px] uppercase font-bold rounded-md" style={{
                        backgroundColor: f.status === 'Active' ? 'var(--success-light)' : 'var(--background)',
                        color: f.status === 'Active' ? 'var(--success)' : 'var(--text-tertiary)'
                      }}>
                        {f.status}
                      </span>
                    </div>
                    
                    <div className="space-y-3 relative z-10">
                      <div>
                        <div className="text-xs mb-1 text-secondary">Base Rate</div>
                        <div className="font-mono font-bold text-xl" style={{ color: 'var(--info)' }}>{f.base}</div>
                      </div>
                      <div>
                        <div className="text-xs mb-1 text-secondary">Tier / Bonus</div>
                        <div className="text-sm font-medium text-primary">{f.bonus}</div>
                      </div>
                    </div>
                    
                    <div className="mt-6 flex gap-2 relative z-10">
                      <button onClick={() => openRule(f)} className="flex-1 py-2 text-sm font-semibold rounded-lg transition-colors cursor-pointer" style={{ backgroundColor: 'var(--surface)', color: 'var(--text-primary)', border: '1px solid var(--border)' }}>Edit</button>
                      <button onClick={() => openAssign(f)} className="flex-1 py-2 text-sm font-semibold rounded-lg transition-colors cursor-pointer" style={{ backgroundColor: 'var(--surface)', color: 'var(--text-primary)', border: '1px solid var(--border)' }}>Assign</button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'clawbacks' && (
            <div className="space-y-6 animate-in fade-in duration-300">
               <div className="flex items-center gap-3 mb-6">
                <ShieldAlert className="w-6 h-6" style={{ color: 'var(--error)' }} />
                <div>
                  <h2 className="text-xl font-bold text-primary m-0">Validation Rejects & Clawbacks</h2>
                  <p className="text-sm text-secondary m-0">Configure how invalid signatures affect payouts automatically.</p>
                </div>
              </div>

              <div className="rounded-xl p-6" style={{ backgroundColor: 'var(--surface-secondary)', border: '1px solid var(--border)' }}>
                <div className="flex items-center justify-between pb-4 mb-4" style={{ borderBottom: '1px solid var(--border)' }}>
                  <div>
                    <h4 className="font-bold text-lg text-primary m-0">Standard Reject Deduction</h4>
                    <p className="text-sm text-secondary m-0">Deduct standard rate for any signature invalidated by QA team.</p>
                  </div>
                  <div className="flex items-center gap-2">
                     <span className="font-bold text-sm px-3 py-1 rounded-full flex items-center gap-1" style={{ color: 'var(--success)', backgroundColor: 'var(--success-light)', border: '1px solid var(--success-border)' }}>
                        <CheckCircle className="w-4 h-4" /> Enabled
                     </span>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-primary">Reject Penalty Rate</label>
                    <select className="w-full rounded-xl px-4 py-3 focus:outline-none" style={{ backgroundColor: 'var(--surface)', color: 'var(--text-primary)', border: '1px solid var(--border)' }}>
                      <option>1x (Equal to base rate)</option>
                      <option>1.5x (Penalty multiplier)</option>
                      <option>Flat Fee ($5.00)</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-primary">Trigger Threshold</label>
                    <select className="w-full rounded-xl px-4 py-3 focus:outline-none" style={{ backgroundColor: 'var(--surface)', color: 'var(--text-primary)', border: '1px solid var(--border)' }}>
                      <option>Apply to ALL rejected signatures</option>
                      <option>Apply only if reject rate &gt; 15%</option>
                      <option>Apply only if reject rate &gt; 25%</option>
                    </select>
                  </div>
                </div>

                <div className="mt-6 flex justify-end">
                   <button onClick={() => notify('Clawback rules saved')} className="px-6 py-2 rounded-lg font-bold transition-all shadow-lg" style={{ backgroundColor: 'var(--info)', color: 'var(--text-on-primary)' }}>Save Clawback Rules</button>
                </div>
              </div>
            </div>
          )}
          
          {activeTab === 'overrides' && (
            <div className="space-y-6 animate-in fade-in duration-300">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold text-primary">Manager Override Rules</h2>
                <div className="text-sm text-secondary">Percentage overrides for Team Leaders</div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {overrides.map(o => (
                  <div key={o.id} className="rounded-xl p-5 transition-all group relative overflow-hidden" style={{ backgroundColor: 'var(--surface-secondary)', border: '1px solid var(--border)' }}>
                    <div className="flex justify-between items-start mb-4 relative z-10">
                      <h3 className="font-bold text-lg text-primary m-0">{o.name}</h3>
                      <span className="px-2 py-1 text-[10px] uppercase font-bold rounded-md" style={{
                        backgroundColor: 'var(--success-light)', color: 'var(--success)'
                      }}>
                        Active
                      </span>
                    </div>
                    <div className="space-y-3 relative z-10">
                      <div>
                        <div className="text-xs mb-1 text-secondary">Override Value</div>
                        <div className="font-mono font-bold text-xl" style={{ color: 'var(--info)' }}>{o.value}</div>
                      </div>
                      <div>
                        <div className="text-xs mb-1 text-secondary">Target</div>
                        <div className="text-sm font-medium text-primary">{o.target}</div>
                      </div>
                    </div>
                    <div className="mt-6 flex gap-2 relative z-10">
                      <button onClick={() => { setForm(o); setModal({ type: 'config_override', editing: true }); }} className="flex-1 py-2 text-sm font-semibold rounded-lg transition-colors cursor-pointer border-none" style={{ backgroundColor: 'var(--surface)', color: 'var(--text-primary)', border: '1px solid var(--border)' }}>Edit</button>
                      <button onClick={() => setOverrides(overrides.filter(x => x.id !== o.id))} className="flex-1 py-2 text-sm font-semibold rounded-lg transition-colors cursor-pointer border-none" style={{ backgroundColor: 'var(--error-light)', color: 'var(--error)' }}>Remove</button>
                    </div>
                  </div>
                ))}
                
                <div onClick={() => { setForm({ name: '', value: '', target: 'Total Revenue' }); setModal({ type: 'config_override' }); }} className="rounded-xl p-5 border-2 border-dashed flex flex-col items-center justify-center cursor-pointer hover:bg-surface transition-colors min-h-[200px]" style={{ borderColor: 'var(--border-strong)', color: 'var(--text-secondary)' }}>
                  <TrendingUp className="w-8 h-8 mb-2" />
                  <span className="font-semibold">Add Override Rule</span>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'splits' && (
            <div className="space-y-6 animate-in fade-in duration-300">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold text-primary">Deal Split Configurations</h2>
                <div className="text-sm text-secondary">Rules for splitting signatures between circulators</div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {splits.map(s => (
                  <div key={s.id} className="rounded-xl p-5 transition-all group relative overflow-hidden" style={{ backgroundColor: 'var(--surface-secondary)', border: '1px solid var(--border)' }}>
                    <div className="flex justify-between items-start mb-4 relative z-10">
                      <h3 className="font-bold text-lg text-primary m-0">{s.name}</h3>
                      <span className="px-2 py-1 text-[10px] uppercase font-bold rounded-md" style={{
                        backgroundColor: 'var(--success-light)', color: 'var(--success)'
                      }}>
                        Active
                      </span>
                    </div>
                    <div className="space-y-3 relative z-10">
                      <div>
                        <div className="text-xs mb-1 text-secondary">Split Ratio</div>
                        <div className="font-mono font-bold text-xl" style={{ color: 'var(--info)' }}>{s.value}</div>
                      </div>
                      <div>
                        <div className="text-xs mb-1 text-secondary">Condition</div>
                        <div className="text-sm font-medium text-primary">{s.condition}</div>
                      </div>
                    </div>
                    <div className="mt-6 flex gap-2 relative z-10">
                      <button onClick={() => { setForm(s); setModal({ type: 'config_split', editing: true }); }} className="flex-1 py-2 text-sm font-semibold rounded-lg transition-colors cursor-pointer border-none" style={{ backgroundColor: 'var(--surface)', color: 'var(--text-primary)', border: '1px solid var(--border)' }}>Edit</button>
                      <button onClick={() => setSplits(splits.filter(x => x.id !== s.id))} className="flex-1 py-2 text-sm font-semibold rounded-lg transition-colors cursor-pointer border-none" style={{ backgroundColor: 'var(--error-light)', color: 'var(--error)' }}>Remove</button>
                    </div>
                  </div>
                ))}
                
                <div onClick={() => { setForm({ name: '', value: '', condition: 'Same Location' }); setModal({ type: 'config_split' }); }} className="rounded-xl p-5 border-2 border-dashed flex flex-col items-center justify-center cursor-pointer hover:bg-surface transition-colors min-h-[200px]" style={{ borderColor: 'var(--border-strong)', color: 'var(--text-secondary)' }}>
                  <SplitSquareHorizontal className="w-8 h-8 mb-2" />
                  <span className="font-semibold">Add Split Rule</span>
                </div>
              </div>
            </div>
          )}

        </div>
      </div>

      {toast && (
        <div className="fixed bottom-6 right-6 z-[60] px-4 py-3 rounded-xl shadow-xl font-semibold" style={{ backgroundColor: 'var(--success)', color: '#fff' }}>{toast}</div>
      )}

      {modal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ backgroundColor: 'rgba(0,0,0,0.55)' }} onClick={closeModal}>
          <form onSubmit={submitModal} onClick={(e) => e.stopPropagation()} className="w-full max-w-md rounded-2xl p-6 space-y-4 shadow-2xl" style={{ backgroundColor: 'var(--surface)', border: '1px solid var(--border)', color: 'var(--text-primary)' }}>
            <div className="flex justify-between items-center">
              <h2 className="text-lg font-bold">{modal.type === 'rule' ? (modal.editing ? 'Edit Rule' : 'Create New Rule') : modal.type === 'assign' ? 'Assign Rule' : `Add ${activeTab === 'overrides' ? 'Override' : 'Split'} Configuration`}</h2>
              <button type="button" onClick={closeModal} style={{ color: 'var(--text-secondary)' }} aria-label="Close"><X className="w-5 h-5" /></button>
            </div>
            {modal.type === 'rule' && (
              <>
                {Field({ label: 'Rule Name', k: 'name', placeholder: 'e.g. Holiday Bonus' })}
                {Field({ label: 'Base Rate', k: 'base', placeholder: 'e.g. $3.00/sig' })}
                {Field({ label: 'Tier / Bonus', k: 'bonus', placeholder: 'e.g. +$0.50 after 500' })}
                <div>
                  <label className="block text-sm mb-1" style={{ color: 'var(--text-secondary)' }}>Status</label>
                  <select value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value })} className="w-full px-3 py-2 rounded-lg" style={fieldStyle}>
                    <option>Active</option><option>Draft</option>
                  </select>
                </div>
              </>
            )}
            {modal.type === 'assign' && (
              <>
                <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>Rule: <b style={{ color: 'var(--text-primary)' }}>{form.rule}</b></p>
                <select value={form.target} onChange={(e) => setForm({ ...form, target: e.target.value })} className="w-full px-3 py-2 rounded-lg" style={fieldStyle}>
                  <option>All Circulators</option><option>Team Managers</option><option>Sub Coordinators</option>
                </select>
              </>
            )}
            {modal.type === 'config_override' && (
              <>
                {Field({ label: 'Rule Name', k: 'name', placeholder: 'e.g. Master Override' })}
                {Field({ label: 'Percentage (%)', k: 'value', placeholder: 'e.g. 15%' })}
                <div>
                  <label className="block text-sm mb-1" style={{ color: 'var(--text-secondary)' }}>Target Metric</label>
                  <select value={form.target || 'Total Revenue'} onChange={(e) => setForm({ ...form, target: e.target.value })} className="w-full px-3 py-2 rounded-lg" style={fieldStyle}>
                    <option>Total Revenue</option><option>Total Signatures</option><option>Valid Signatures</option>
                  </select>
                </div>
              </>
            )}
            {modal.type === 'config_split' && (
              <>
                {Field({ label: 'Rule Name', k: 'name', placeholder: 'e.g. Team Split' })}
                {Field({ label: 'Split Ratio', k: 'value', placeholder: 'e.g. 60/40' })}
                <div>
                  <label className="block text-sm mb-1" style={{ color: 'var(--text-secondary)' }}>Condition</label>
                  <select value={form.condition || 'Same Location'} onChange={(e) => setForm({ ...form, condition: e.target.value })} className="w-full px-3 py-2 rounded-lg" style={fieldStyle}>
                    <option>Same Location</option><option>Trainer/Trainee</option><option>Special Event</option>
                  </select>
                </div>
              </>
            )}
            <div className="flex justify-end gap-3 pt-2">
              <button type="button" onClick={closeModal} className="px-4 py-2 rounded-lg" style={{ backgroundColor: 'var(--surface-secondary)', color: 'var(--text-primary)' }}>Cancel</button>
              <button type="submit" className="px-4 py-2 rounded-lg font-bold" style={{ backgroundColor: 'var(--info)', color: '#fff' }}>Save</button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};
