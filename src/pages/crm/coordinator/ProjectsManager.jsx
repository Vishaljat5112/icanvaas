import React, { useState } from 'react';
import { Target, Plus, Search, FolderOpen, Users, DollarSign, Settings, MoreVertical, Edit3, Save, X, Building2 } from 'lucide-react';

export const ProjectsManager = () => {
  const [projects, setProjects] = useState([
    {
      id: 'PRJ-101',
      title: 'Prop 12 - Clean EiCanvass Ballot',
      category: 'Statewide Initiative',
      description: 'Collect signatures to mandate 100% clean eiCanvass usage by 2035 in the state of California.',
      baseRate: 3.50,
      activeCirculators: 42,
      totalCollected: 14500,
      target: 25000,
      status: 'Active',
      allowSubManagersEdit: true,
    },
    {
      id: 'PRJ-102',
      title: 'Local Mayor Petition (District 4)',
      category: 'Municipal Election',
      description: 'Signature gathering for the upcoming mayoral candidate in District 4.',
      baseRate: 2.00,
      activeCirculators: 15,
      totalCollected: 3200,
      target: 5000,
      status: 'Active',
      allowSubManagersEdit: false,
    },
    {
      id: 'PRJ-103',
      title: 'Education Bond Measure C',
      category: 'County Bond',
      description: 'Funding for public school infrastructure and technology upgrades.',
      baseRate: 4.00,
      activeCirculators: 28,
      totalCollected: 8900,
      target: 10000,
      status: 'Nearing Goal',
      allowSubManagersEdit: true,
    }
  ]);

  const [isCreating, setIsCreating] = useState(false);
  
  const [formData, setFormData] = useState({
    title: '',
    category: 'Statewide Initiative',
    description: '',
    baseRate: '',
    target: '',
    allowSubManagersEdit: true,
  });

  const handleCreateProject = (e) => {
    e.preventDefault();
    const newProject = {
      id: `PRJ-${Math.floor(Math.random() * 900) + 100}`, // Mock ID generation
      title: formData.title,
      category: formData.category,
      description: formData.description,
      baseRate: parseFloat(formData.baseRate) || 0,
      activeCirculators: 0,
      totalCollected: 0,
      target: parseInt(formData.target) || 0,
      status: 'Active',
      allowSubManagersEdit: formData.allowSubManagersEdit,
    };
    
    setProjects([newProject, ...projects]);
    setIsCreating(false);
    
    // Reset form
    setFormData({
      title: '',
      category: 'Statewide Initiative',
      description: '',
      baseRate: '',
      target: '',
      allowSubManagersEdit: true,
    });
  };

  return (
    <div className="h-full flex flex-col overflow-y-auto pb-10" style={{ backgroundColor: 'var(--background)', color: 'var(--text-primary)' }}>
      
      {/* Header */}
      <div className="p-6 sticky top-0 z-20 shrink-0" style={{ backgroundColor: 'var(--surface)', borderBottom: '1px solid var(--border)' }}>
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold flex items-center gap-3 m-0" style={{ color: 'var(--text-primary)' }}>
              <div className="p-2 rounded-lg" style={{ backgroundColor: 'var(--info-light)' }}>
                <Target className="w-6 h-6" style={{ color: 'var(--info)' }} />
              </div>
              Projects & Campaigns
            </h1>
            <p className="mt-1 text-sm m-0" style={{ color: 'var(--text-secondary)' }}>
              Create and manage signature gathering campaigns, set category prices, and delegate sub-manager permissions.
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full md:w-auto mt-4 md:mt-0">
            <div className="relative w-full sm:w-auto">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4" style={{ color: 'var(--text-tertiary)' }} />
              <input 
                type="text" 
                placeholder="Search projects..." 
                className="rounded-xl pl-10 pr-4 py-2.5 text-sm focus:outline-none w-full sm:w-64 transition-colors"
                style={{ backgroundColor: 'var(--surface-secondary)', border: '1px solid var(--border)', color: 'var(--text-primary)' }}
              />
            </div>
            <button 
              onClick={() => setIsCreating(true)}
              className="flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl font-medium shadow-lg transition-all cursor-pointer border-none w-full sm:w-auto"
              style={{ backgroundColor: 'var(--info)', color: 'var(--text-on-primary)' }}
            >
              <Plus className="w-4 h-4" /> New Project
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 mt-8 w-full">

        {/* Create Project Modal / Inline Form */}
        {isCreating && (
          <div className="animate-in fade-in slide-in-from-top-4 mb-8 border rounded-2xl p-6 backdrop-blur-sm relative overflow-hidden" style={{ backgroundColor: 'var(--surface-secondary)', borderColor: 'var(--info-border)' }}>
            <div className="absolute top-0 left-0 w-1 h-full" style={{ backgroundColor: 'var(--info)' }}></div>
            
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold flex items-center gap-2 m-0" style={{ color: 'var(--text-primary)' }}>
                <FolderOpen className="w-5 h-5" style={{ color: 'var(--info)' }} /> Create New Campaign Project
              </h2>
              <button onClick={() => setIsCreating(false)} className="p-2 rounded-lg transition-colors cursor-pointer border-none" style={{ background: 'none' }}>
                <X className="w-5 h-5" style={{ color: 'var(--text-tertiary)' }} />
              </button>
            </div>

            <form onSubmit={handleCreateProject}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-1">
                  <label className="text-xs font-semibold uppercase tracking-wider m-0" style={{ color: 'var(--text-tertiary)' }}>Project Title Name</label>
                  <input required value={formData.title} onChange={(e) => setFormData({...formData, title: e.target.value})} type="text" className="w-full rounded-xl px-4 py-2.5 focus:outline-none transition-colors" placeholder="e.g. Healthcare Initiative 2026" style={{ backgroundColor: 'var(--surface)', border: '1px solid var(--border)', color: 'var(--text-primary)' }} />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-semibold uppercase tracking-wider m-0" style={{ color: 'var(--text-tertiary)' }}>Project Category</label>
                  <select value={formData.category} onChange={(e) => setFormData({...formData, category: e.target.value})} className="w-full rounded-xl px-4 py-2.5 focus:outline-none transition-colors appearance-none" style={{ backgroundColor: 'var(--surface)', border: '1px solid var(--border)', color: 'var(--text-primary)' }}>
                    <option>Statewide Initiative</option>
                    <option>Municipal Election</option>
                    <option>County Bond</option>
                    <option>Referendum</option>
                  </select>
                </div>
                <div className="space-y-1 md:col-span-2">
                  <label className="text-xs font-semibold uppercase tracking-wider m-0" style={{ color: 'var(--text-tertiary)' }}>Project Description</label>
                  <textarea required value={formData.description} onChange={(e) => setFormData({...formData, description: e.target.value})} rows={3} className="w-full rounded-xl px-4 py-3 focus:outline-none transition-colors resize-none" placeholder="Describe the initiative and goals for the circulators..." style={{ backgroundColor: 'var(--surface)', border: '1px solid var(--border)', color: 'var(--text-primary)' }} />
                </div>
                
                <div className="space-y-1">
                  <label className="text-xs font-semibold uppercase tracking-wider m-0" style={{ color: 'var(--text-tertiary)' }}>Base Price / Commission Rate (Per Sig)</label>
                  <div className="relative">
                    <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4" style={{ color: 'var(--text-tertiary)' }} />
                    <input required value={formData.baseRate} onChange={(e) => setFormData({...formData, baseRate: e.target.value})} type="number" step="0.01" className="w-full rounded-xl pl-9 pr-4 py-2.5 focus:outline-none transition-colors" placeholder="3.50" style={{ backgroundColor: 'var(--surface)', border: '1px solid var(--border)', color: 'var(--text-primary)' }} />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold uppercase tracking-wider m-0" style={{ color: 'var(--text-tertiary)' }}>Target Signatures (Goal)</label>
                  <input required value={formData.target} onChange={(e) => setFormData({...formData, target: e.target.value})} type="number" className="w-full rounded-xl px-4 py-2.5 focus:outline-none transition-colors" placeholder="50000" style={{ backgroundColor: 'var(--surface)', border: '1px solid var(--border)', color: 'var(--text-primary)' }} />
                </div>
              </div>

              <div className="mt-6 p-4 rounded-xl flex items-center justify-between" style={{ backgroundColor: 'var(--surface)', border: '1px solid var(--border)' }}>
                <div>
                  <h4 className="font-medium flex items-center gap-2 m-0" style={{ color: 'var(--text-primary)' }}>
                    <Building2 className="w-4 h-4" style={{ color: 'var(--success)' }} /> Allow Sub-Manager Overrides
                  </h4>
                  <p className="text-xs mt-1 m-0" style={{ color: 'var(--text-secondary)' }}>Allow Sub-Coordinators & Managers to edit final commissions and split credits for this project.</p>
                </div>
                
                {/* Toggle Switch */}
                <div onClick={() => setFormData({...formData, allowSubManagersEdit: !formData.allowSubManagersEdit})} className={`w-12 h-6 rounded-full relative cursor-pointer transition-colors`} style={{ backgroundColor: formData.allowSubManagersEdit ? 'var(--success)' : 'var(--border-strong)' }}>
                  <div className={`absolute top-1 left-1 w-4 h-4 rounded-full transition-transform ${formData.allowSubManagersEdit ? 'translate-x-6' : 'translate-x-0'}`} style={{ backgroundColor: 'var(--background)' }} />
                </div>
              </div>

              <div className="mt-6 flex justify-end gap-3">
                <button type="button" onClick={() => setIsCreating(false)} className="px-5 py-2.5 font-medium cursor-pointer border-none transition-colors" style={{ background: 'none', color: 'var(--text-secondary)' }}>Cancel</button>
                <button type="submit" className="px-6 py-2.5 rounded-xl font-medium shadow-lg flex items-center gap-2 cursor-pointer border-none transition-colors hover:scale-105" style={{ backgroundColor: 'var(--info)', color: 'var(--text-on-primary)' }}>
                  <Save className="w-4 h-4" /> Save Project
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Projects Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {projects.map((proj) => {
            const progress = (proj.totalCollected / proj.target) * 100;
            
            return (
              <div key={proj.id} className="rounded-2xl p-6 transition-colors flex flex-col group relative overflow-hidden" style={{ backgroundColor: 'var(--surface)', border: '1px solid var(--border)' }}>
                
                {/* Status Badge */}
                <div className="absolute top-6 right-6">
                  <span className="text-xs font-semibold px-2.5 py-1 rounded-full border" style={{
                    backgroundColor: proj.status === 'Active' ? 'var(--success-light)' : 'var(--warning-light)',
                    color: proj.status === 'Active' ? 'var(--success)' : 'var(--warning)',
                    borderColor: proj.status === 'Active' ? 'var(--success-border)' : 'var(--warning-border)'
                  }}>
                    {proj.status}
                  </span>
                </div>

                <div className="flex items-start gap-4 mb-4 pr-24">
                  <div className="p-3 rounded-xl shrink-0" style={{ backgroundColor: 'var(--info-light)', color: 'var(--info)' }}>
                    <FolderOpen className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold leading-tight m-0" style={{ color: 'var(--text-primary)' }}>{proj.title}</h3>
                    <p className="text-xs font-medium mt-1 uppercase tracking-wider m-0" style={{ color: 'var(--info)' }}>{proj.category}</p>
                  </div>
                </div>

                <p className="text-sm mb-6 line-clamp-2 min-h-[40px] m-0" style={{ color: 'var(--text-secondary)' }}>
                  {proj.description}
                </p>

                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="rounded-xl p-3" style={{ backgroundColor: 'var(--surface-secondary)', border: '1px solid var(--border)' }}>
                    <p className="text-xs font-medium mb-1 m-0" style={{ color: 'var(--text-tertiary)' }}>Base Rate / Sig</p>
                    <p className="text-xl font-bold flex items-center gap-1 m-0" style={{ color: 'var(--success)' }}>
                      <DollarSign className="w-5 h-5" />{proj.baseRate.toFixed(2)}
                    </p>
                  </div>
                  <div className="rounded-xl p-3" style={{ backgroundColor: 'var(--surface-secondary)', border: '1px solid var(--border)' }}>
                    <p className="text-xs font-medium mb-1 m-0" style={{ color: 'var(--text-tertiary)' }}>Active Team</p>
                    <p className="text-xl font-bold flex items-center gap-2 m-0" style={{ color: 'var(--text-primary)' }}>
                      <Users className="w-5 h-5" style={{ color: 'var(--info)' }} /> {proj.activeCirculators}
                    </p>
                  </div>
                </div>

                <div className="mb-6">
                  <div className="flex items-end justify-between mb-2">
                    <span className="text-sm font-semibold m-0" style={{ color: 'var(--text-primary)' }}>Signatures Collected</span>
                    <span className="text-xs m-0" style={{ color: 'var(--text-secondary)' }}>{proj.totalCollected.toLocaleString()} / {proj.target.toLocaleString()}</span>
                  </div>
                  <div className="w-full h-2 rounded-full overflow-hidden" style={{ backgroundColor: 'var(--surface-secondary)' }}>
                    <div 
                      className="h-full rounded-full relative"
                      style={{ width: `${progress}%`, backgroundColor: 'var(--info)' }}
                    >
                      <div className="absolute top-0 right-0 bottom-0 w-20" style={{ background: 'linear-gradient(to right, transparent, rgba(255,255,255,0.2))' }} />
                    </div>
                  </div>
                </div>

                {/* Footer Controls */}
                <div className="mt-auto pt-4 flex items-center justify-between" style={{ borderTop: '1px solid var(--border)' }}>
                  <div className="flex items-center gap-2">
                    <span className="text-xs m-0" style={{ color: 'var(--text-tertiary)' }}>Sub-Manager Overrides:</span>
                    {proj.allowSubManagersEdit ? (
                      <span className="text-xs font-semibold m-0" style={{ color: 'var(--success)' }}>Enabled</span>
                    ) : (
                      <span className="text-xs font-semibold m-0" style={{ color: 'var(--error)' }}>Locked</span>
                    )}
                  </div>
                  
                  <div className="flex gap-2">
                    <button className="p-2 rounded-lg transition-colors cursor-pointer border-none" style={{ background: 'none', color: 'var(--text-tertiary)' }} title="Settings">
                      <Settings className="w-4 h-4" />
                    </button>
                    <button className="p-2 rounded-lg transition-colors cursor-pointer border-none" style={{ background: 'none', color: 'var(--text-tertiary)' }} title="Edit Prices">
                      <Edit3 className="w-4 h-4" />
                    </button>
                    <button className="p-2 rounded-lg transition-colors cursor-pointer border-none" style={{ background: 'none', color: 'var(--text-tertiary)' }} title="More">
                      <MoreVertical className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </div>
  );
};
