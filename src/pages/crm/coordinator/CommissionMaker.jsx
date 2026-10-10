import React, { useState } from 'react';
import {
  Landmark,
  Settings2,
  ShieldAlert,
  SplitSquareHorizontal,
  Undo2,
  TrendingUp,
  Users,
  CheckCircle,
  X,
  Award,
  Plus,
  DollarSign
} from 'lucide-react';

export const CommissionMaker = () => {
  const [activeTab, setActiveTab] = useState('formulas');
  const [formulas, setFormulas] = useState([
    { id: 1, name: 'Standard Circulator Tier', base: '$3.00/sig', bonus: '+$0.50 after 500', status: 'Active' },
    { id: 2, name: 'Manager Override', base: '10% gross', bonus: 'None', status: 'Active' },
    { id: 3, name: 'Weekend Blitz', base: '$5.00/sig', bonus: 'Flat $100 for 50 sigs', status: 'Draft' },
  ]);
  const [splits, setSplits] = useState([
    { id: 1, name: 'Standard Pair Split', value: '50/50', condition: 'Same Location' },
  ]);
  const [overrides, setOverrides] = useState([
    { id: 1, name: 'Team Leader Override', value: '10%', target: 'Total Revenue' },
  ]);
  const [bonuses, setBonuses] = useState([
    { id: 1, name: '1,000 Signature Milestone', amount: '$250.00', condition: '1,000 valid sigs in calendar month', status: 'Active' },
    { id: 2, name: 'High Quality 95%+ Accuracy Streak', amount: '$150.00', condition: '3 consecutive 95%+ batches', status: 'Active' },
  ]);

  const [modal, setModal] = useState(null);
  const [form, setForm] = useState({});
  const [toast, setToast] = useState('');

  const notify = (msg) => { setToast(msg); setTimeout(() => setToast(''), 2500); };
  const openRule = (f) => {
    setForm(f ? { ...f } : { name: '', base: '', bonus: '', status: 'Draft' });
    setModal({ type: 'rule', editing: !!f });
  };
  const openAssign = (f) => { setForm({ rule: f.name, target: 'All Circulators' }); setModal({ type: 'assign' }); };
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
    } else if (modal.type === 'config_bonus') {
      if (!form.name?.trim()) return;
      if (modal.editing) setBonuses(p => p.map(x => x.id === form.id ? form : x));
      else setBonuses(p => [...p, { ...form, id: Date.now(), status: 'Active' }]);
      notify(modal.editing ? 'Bonus updated' : 'Bonus incentive added');
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
            <h1 className="text-2xl font-bold flex items-center gap-3 text-primary m-0">
              <div className="p-2 rounded-lg" style={{ backgroundColor: 'var(--info-light)' }}>
                <Landmark className="w-6 h-6" style={{ color: 'var(--info)' }} />
              </div>
              Commission Maker
            </h1>
            <p className="mt-1 text-sm text-secondary m-0">
              Automate calculations, set custom tiered rates, handle manager overrides, configure clawbacks, and publish bonuses.
            </p>
          </div>
          <button onClick={() => openRule(null)} className="px-6 py-3 rounded-xl font-bold transition-all shadow-lg cursor-pointer border-none" style={{ backgroundColor: 'var(--info)', color: 'var(--text-on-primary)' }}>
            Create New Plan
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
            { id: 'bonuses', icon: Award, label: 'Performance Bonuses' },
            { id: 'clawbacks', icon: Undo2, label: 'Clawbacks & Rejects' },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-all cursor-pointer border-none"
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
            <div className="space-y-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold text-primary m-0">Active Commission Structures</h2>
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
                      <button onClick={() => openRule(f)} className="flex-1 py-2 text-sm font-semibold rounded-lg transition-colors cursor-pointer border" style={{ backgroundColor: 'var(--surface)', color: 'var(--text-primary)', borderColor: 'var(--border)' }}>Edit</button>
                      <button onClick={() => openAssign(f)} className="flex-1 py-2 text-sm font-semibold rounded-lg transition-colors cursor-pointer border-none" style={{ backgroundColor: 'var(--info-light)', color: 'var(--info)' }}>Assign</button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'overrides' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold text-primary m-0">Manager Override Rules</h2>
                <div className="text-sm text-secondary">Tiered team percentages</div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {overrides.map(o => (
                  <div key={o.id} className="rounded-xl p-5 border" style={{ backgroundColor: 'var(--surface-secondary)', borderColor: 'var(--border)' }}>
                    <h3 className="font-bold text-base m-0 mb-1">{o.name}</h3>
                    <div className="text-2xl font-black text-info my-2">{o.value}</div>
                    <span className="text-xs text-secondary">Target: {o.target}</span>
                  </div>
                ))}
                <div onClick={() => { setForm({ name: '', value: '', target: 'Total Revenue' }); setModal({ type: 'config_override' }); }} className="rounded-xl p-5 border-2 border-dashed flex flex-col items-center justify-center cursor-pointer min-h-[160px]" style={{ borderColor: 'var(--border-strong)', color: 'var(--text-secondary)' }}>
                  <Plus className="w-8 h-8 mb-2" />
                  <span className="font-semibold text-sm">Add Override Rule</span>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'splits' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold text-primary m-0">Deal Split Configurations</h2>
                <div className="text-sm text-secondary">Rules for splitting signatures between circulators</div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {splits.map(s => (
                  <div key={s.id} className="rounded-xl p-5 border" style={{ backgroundColor: 'var(--surface-secondary)', borderColor: 'var(--border)' }}>
                    <h3 className="font-bold text-base m-0 mb-1">{s.name}</h3>
                    <div className="text-2xl font-black text-info my-2">{s.value}</div>
                    <span className="text-xs text-secondary">Condition: {s.condition}</span>
                  </div>
                ))}
                <div onClick={() => { setForm({ name: '', value: '', condition: 'Same Location' }); setModal({ type: 'config_split' }); }} className="rounded-xl p-5 border-2 border-dashed flex flex-col items-center justify-center cursor-pointer min-h-[160px]" style={{ borderColor: 'var(--border-strong)', color: 'var(--text-secondary)' }}>
                  <SplitSquareHorizontal className="w-8 h-8 mb-2" />
                  <span className="font-semibold text-sm">Add Split Rule</span>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'bonuses' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold text-primary m-0">Performance Bonus Plans</h2>
                <div className="text-sm text-secondary">Campaign volume and accuracy rewards</div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {bonuses.map(b => (
                  <div key={b.id} className="rounded-xl p-5 border" style={{ backgroundColor: 'var(--surface-secondary)', borderColor: 'var(--border)' }}>
                    <div className="flex items-center justify-between mb-1">
                      <h3 className="font-bold text-base m-0">{b.name}</h3>
                      <span className="text-[10px] px-2 py-0.5 rounded font-bold bg-emerald-500/10 text-emerald-500">{b.status}</span>
                    </div>
                    <div className="text-2xl font-black text-success my-2">{b.amount}</div>
                    <p className="text-xs text-secondary m-0">{b.condition}</p>
                  </div>
                ))}
                <div onClick={() => { setForm({ name: '', amount: '', condition: '' }); setModal({ type: 'config_bonus' }); }} className="rounded-xl p-5 border-2 border-dashed flex flex-col items-center justify-center cursor-pointer min-h-[160px]" style={{ borderColor: 'var(--border-strong)', color: 'var(--text-secondary)' }}>
                  <Award className="w-8 h-8 mb-2" />
                  <span className="font-semibold text-sm">Add Bonus Incentive</span>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'clawbacks' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold text-primary m-0">Clawback & Rejection Penalties</h2>
                <div className="text-sm text-secondary">Rules governing invalid signatures</div>
              </div>

              <div className="p-4 rounded-xl border space-y-3" style={{ backgroundColor: 'var(--error-light)', borderColor: 'var(--error-border)' }}>
                <span className="text-xs font-bold text-error flex items-center gap-1.5">
                  <ShieldAlert className="w-4 h-4" /> Fraud & Defect Quality Rule
                </span>
                <p className="text-xs text-secondary leading-relaxed m-0">
                  Batches falling below 85% voter match trigger automatic manual review. Invalid signatures are deducted at $3.00/sig clawback from shift compensation.
                </p>
              </div>
            </div>
          )}

        </div>
      </div>

      {toast && (
        <div className="fixed bottom-6 right-6 z-[60] px-4 py-3 rounded-xl shadow-xl font-semibold" style={{ backgroundColor: 'var(--success)', color: '#fff' }}>{toast}</div>
      )}

      {/* Modal */}
      {modal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm" onClick={closeModal}>
          <form onSubmit={submitModal} onClick={(e) => e.stopPropagation()} className="w-full max-w-md rounded-2xl p-6 space-y-4 shadow-2xl border" style={{ backgroundColor: 'var(--surface)', borderColor: 'var(--border)', color: 'var(--text-primary)' }}>
            <div className="flex justify-between items-center pb-2 border-b" style={{ borderColor: 'var(--border)' }}>
              <h2 className="text-base font-bold m-0">
                {modal.type === 'rule' ? (modal.editing ? 'Edit Rule' : 'Create Commission Rule') : modal.type === 'assign' ? 'Assign Rule' : modal.type === 'config_bonus' ? 'Add Bonus Incentive' : `Add ${activeTab === 'overrides' ? 'Override' : 'Split'} Configuration`}
              </h2>
              <button type="button" onClick={closeModal} className="border-none bg-transparent cursor-pointer" style={{ color: 'var(--text-secondary)' }}><X className="w-5 h-5" /></button>
            </div>

            {modal.type === 'rule' && (
              <>
                {Field({ label: 'Rule Name', k: 'name', placeholder: 'e.g. Holiday Tier' })}
                {Field({ label: 'Base Rate ($/sig)', k: 'base', placeholder: 'e.g. $3.50/sig' })}
                {Field({ label: 'Tier / Bonus', k: 'bonus', placeholder: 'e.g. +$0.50 after 500' })}
                <div>
                  <label className="block text-xs font-semibold mb-1" style={{ color: 'var(--text-secondary)' }}>Status</label>
                  <select value={form.status || 'Active'} onChange={(e) => setForm({ ...form, status: e.target.value })} className="w-full text-xs px-3 py-2 rounded-lg" style={fieldStyle}>
                    <option value="Active">Active</option>
                    <option value="Draft">Draft</option>
                  </select>
                </div>
              </>
            )}

            {modal.type === 'config_bonus' && (
              <>
                {Field({ label: 'Bonus Name', k: 'name', placeholder: 'e.g. 500 Sig Surge' })}
                {Field({ label: 'Amount ($)', k: 'amount', placeholder: 'e.g. $150.00' })}
                {Field({ label: 'Eligibility Condition', k: 'condition', placeholder: 'e.g. 500 valid sigs in 7 days' })}
              </>
            )}

            {modal.type === 'config_override' && (
              <>
                {Field({ label: 'Rule Name', k: 'name', placeholder: 'e.g. Master Override' })}
                {Field({ label: 'Percentage (%)', k: 'value', placeholder: 'e.g. 15%' })}
              </>
            )}

            {modal.type === 'config_split' && (
              <>
                {Field({ label: 'Rule Name', k: 'name', placeholder: 'e.g. Team Split' })}
                {Field({ label: 'Split Ratio', k: 'value', placeholder: 'e.g. 60/40' })}
              </>
            )}

            <div className="flex justify-end gap-2 pt-2 border-t" style={{ borderColor: 'var(--border)' }}>
              <button type="button" onClick={closeModal} className="px-4 py-2 rounded-lg text-xs font-semibold border cursor-pointer" style={{ backgroundColor: 'var(--surface-secondary)', color: 'var(--text-primary)', borderColor: 'var(--border)' }}>Cancel</button>
              <button type="submit" className="px-5 py-2 rounded-lg text-xs font-bold border-none shadow-md cursor-pointer" style={{ backgroundColor: 'var(--info)', color: '#fff' }}>Save</button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};
