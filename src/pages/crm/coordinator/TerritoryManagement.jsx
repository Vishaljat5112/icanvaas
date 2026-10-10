import React, { useState } from 'react';
import { Map, MapPin, Search, Layers, Edit3, Save, Plus, X } from 'lucide-react';

export const TerritoryManagement = () => {
  const [territories, setTerritories] = useState([
    { id: 1, nickname: 'Downtown District 4', assignedTo: 'Team Alpha', status: 'Active', color: 'var(--success)', top: '25%', left: '15%', w: '12rem', h: '8rem', shape: 'rect' },
    { id: 2, nickname: 'Westside Mall Area', assignedTo: 'Emma Wilson', status: 'Pending', color: 'var(--warning)', top: '40%', right: '15%', w: '10rem', h: '10rem', shape: 'circle' },
    { id: 3, nickname: 'North Metro Station', assignedTo: 'Unassigned', status: 'Available', color: 'var(--info)', top: '70%', left: '40%', w: '15rem', h: '6rem', shape: 'rect' },
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({ nickname: '', assignedTo: 'Unassigned', shape: 'rect' });
  const [toast, setToast] = useState('');

  const notify = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(''), 3000);
  };

  const handleSaveMap = () => {
    notify('Map configuration saved successfully!');
  };

  const handleAddTerritory = (e) => {
    e.preventDefault();
    if (!formData.nickname) return;
    const newTerr = {
      id: Date.now(),
      nickname: formData.nickname,
      assignedTo: formData.assignedTo,
      status: formData.assignedTo === 'Unassigned' ? 'Available' : 'Pending',
      color: 'var(--info)',
      top: Math.floor(Math.random() * 60 + 10) + '%',
      left: Math.floor(Math.random() * 60 + 10) + '%',
      w: '10rem',
      h: '8rem',
      shape: formData.shape
    };
    setTerritories([...territories, newTerr]);
    setIsModalOpen(false);
    setFormData({ nickname: '', assignedTo: 'Unassigned', shape: 'rect' });
    notify('Territory added to map.');
  };

  return (
    <div className="h-full flex flex-col overflow-hidden" style={{ backgroundColor: 'var(--background)', color: 'var(--text-primary)' }}>
      {/* Header */}
      <div className="p-6 flex-shrink-0" style={{ backgroundColor: 'var(--surface)', borderBottom: '1px solid var(--border)' }}>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <h1 className="text-2xl font-bold flex items-center gap-3 text-primary m-0">
              <div className="p-2 rounded-lg" style={{ backgroundColor: 'var(--info-light)' }}>
                <Map className="w-6 h-6" style={{ color: 'var(--info)' }} />
              </div>
              Territory Management
            </h1>
            <p className="mt-1 text-sm text-secondary m-0">
              Click on map areas to assign territories and manage nicknames for your signature gatherers.
            </p>
          </div>
          <button onClick={handleSaveMap} className="flex items-center gap-2 rounded-xl font-bold transition-all shadow-lg cursor-pointer border-none hover:scale-105" style={{ padding: '0.75rem 1.5rem', backgroundColor: 'var(--info)', color: 'var(--text-on-primary)' }}>
            <Save className="w-4 h-4" /> Save Map
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-hidden relative" style={{ display: 'flex', flexWrap: 'wrap' }}>
        
        {/* Left Sidebar - Territory List */}
        <div className="flex flex-col flex-shrink-0 z-10 h-full" style={{ flex: '1 1 350px', maxWidth: '100%', borderRight: '1px solid var(--border)', backgroundColor: 'var(--surface-secondary)' }}>
          <div className="p-4" style={{ borderBottom: '1px solid var(--border)' }}>
            <button onClick={() => setIsModalOpen(true)} className="w-full flex items-center justify-center gap-2 px-4 py-3 border border-dashed rounded-xl transition-colors font-semibold text-sm cursor-pointer hover:bg-surface" style={{ borderColor: 'var(--info)', color: 'var(--info)', backgroundColor: 'transparent' }}>
              <Plus className="w-4 h-4" /> Add New Territory Zone
            </button>
          </div>
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {territories.map(t => (
              <div key={t.id} className="rounded-xl p-4 transition-colors cursor-pointer hover:border-info group" style={{ backgroundColor: 'var(--surface)', border: '1px solid var(--border)' }}>
                <div className="flex justify-between items-start mb-2">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full shadow-sm" style={{ backgroundColor: t.color }} />
                    <h3 className="font-bold text-primary m-0">{t.nickname}</h3>
                  </div>
                  <button onClick={(e) => { e.stopPropagation(); setTerritories(territories.filter(x => x.id !== t.id)); }} className="transition-colors text-tertiary hover:text-error border-none bg-transparent cursor-pointer opacity-0 group-hover:opacity-100">
                    <X className="w-4 h-4" />
                  </button>
                </div>
                <div className="text-sm flex items-center gap-2 mb-1 text-secondary">
                  <MapPin className="w-4 h-4" /> Assigned: {t.assignedTo}
                </div>
                <div className="text-xs font-semibold inline-block px-2 py-1 rounded mt-2 border" style={{ backgroundColor: 'var(--background)', color: 'var(--text-secondary)', borderColor: 'var(--border)' }}>
                  Status: {t.status}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Area - The Map Container */}
        <div className="relative flex flex-col min-h-[400px]" style={{ flex: '2 1 500px', backgroundColor: 'var(--background)' }}>
          {/* Mock Interactive Map UI Background */}
          <div className="absolute inset-0 opacity-10 z-0 pointer-events-none" style={{ backgroundImage: "url('https://www.transparenttextures.com/patterns/grid-me.png')" }} />
          
          {/* Map Controls */}
          <div className="absolute top-4 right-4 z-20 flex flex-col gap-2">
            <button className="w-10 h-10 rounded-lg flex items-center justify-center shadow-lg transition-colors cursor-pointer border-none hover:bg-surface-secondary" style={{ backgroundColor: 'var(--surface)', border: '1px solid var(--border)', color: 'var(--text-secondary)' }}>
              <Layers className="w-5 h-5" />
            </button>
            <div className="rounded-lg shadow-lg flex flex-col overflow-hidden" style={{ backgroundColor: 'var(--surface)', border: '1px solid var(--border)' }}>
              <button className="w-10 h-10 flex items-center justify-center font-bold text-xl transition-colors cursor-pointer border-none bg-transparent hover:bg-surface-secondary" style={{ color: 'var(--text-secondary)', borderBottom: '1px solid var(--border)' }}>+</button>
              <button className="w-10 h-10 flex items-center justify-center font-bold text-xl transition-colors cursor-pointer border-none bg-transparent hover:bg-surface-secondary" style={{ color: 'var(--text-secondary)' }}>−</button>
            </div>
          </div>

          <div className="absolute top-4 left-4 z-20" style={{ width: '100%', maxWidth: '320px' }}>
            <div className="relative">
              <Search className="w-5 h-5 absolute text-tertiary" style={{ left: '0.75rem', top: '50%', transform: 'translateY(-50%)' }} />
              <input 
                type="text" 
                placeholder="Search city, county, or zip code..." 
                className="w-full rounded-xl text-sm focus:outline-none shadow-xl"
                style={{ padding: '0.75rem 1rem 0.75rem 2.5rem', backgroundColor: 'var(--surface)', border: '1px solid var(--border)', color: 'var(--text-primary)' }}
              />
            </div>
          </div>

          {/* Map Visuals */}
          <div className="flex-1 flex items-center justify-center relative z-10 w-full h-full min-h-[400px]">
            {territories.map((t) => (
              <div 
                key={t.id} 
                className="absolute flex items-center justify-center cursor-pointer transition-all hover:scale-105 shadow-md hover:shadow-xl group" 
                style={{ 
                  top: t.top, 
                  left: t.left, 
                  right: t.right,
                  width: t.w, 
                  height: t.h, 
                  backgroundColor: `${t.color}33`, // 20% opacity using hex rough approx, but we'll use a hack or assume variables
                  border: `2px solid ${t.color}`, 
                  borderRadius: t.shape === 'circle' ? '50%' : '1rem' 
                }}
              >
                {/* Fallback inline style for background opacity since variables might not compute in hex */}
                <div className="absolute inset-0 opacity-20 rounded-[inherit]" style={{ backgroundColor: t.color }}></div>
                <div className="px-3 py-1.5 rounded-lg text-xs font-bold shadow-lg flex flex-col items-center text-center relative z-10 transition-transform group-hover:-translate-y-1" style={{ backgroundColor: 'var(--surface)', border: '1px solid var(--border)' }}>
                  <span style={{ color: t.color }}>{t.nickname}</span>
                  <span className="text-[10px] font-normal mt-0.5" style={{ color: 'var(--text-secondary)' }}>{t.assignedTo}</span>
                </div>
              </div>
            ))}
            
             {/* Center marker */}
             <div className="absolute flex flex-col items-center animate-bounce" style={{ top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}>
                <MapPin className="w-8 h-8" style={{ color: 'var(--info)' }} />
                <div className="w-2 h-1 rounded-full blur-sm mt-1" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }} />
             </div>
          </div>
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4" style={{ backgroundColor: 'rgba(0,0,0,0.6)' }} onClick={() => setIsModalOpen(false)}>
          <form onSubmit={handleAddTerritory} onClick={(e) => e.stopPropagation()} className="w-full max-w-sm rounded-2xl p-6 shadow-2xl animate-in zoom-in-95 duration-200" style={{ backgroundColor: 'var(--surface)', border: '1px solid var(--border)' }}>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold m-0" style={{ color: 'var(--text-primary)' }}>New Territory</h2>
              <button type="button" onClick={() => setIsModalOpen(false)} className="p-1 rounded-lg border-none bg-transparent cursor-pointer hover:bg-surface-secondary">
                <X className="w-5 h-5" style={{ color: 'var(--text-secondary)' }} />
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold mb-1" style={{ color: 'var(--text-secondary)' }}>Territory Nickname</label>
                <input required value={formData.nickname} onChange={e => setFormData({...formData, nickname: e.target.value})} type="text" placeholder="e.g. South Sector" className="w-full rounded-xl px-4 py-2.5 focus:outline-none" style={{ backgroundColor: 'var(--surface-secondary)', border: '1px solid var(--border-strong)', color: 'var(--text-primary)' }} />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-1" style={{ color: 'var(--text-secondary)' }}>Assign To Team/Person</label>
                <select value={formData.assignedTo} onChange={e => setFormData({...formData, assignedTo: e.target.value})} className="w-full rounded-xl px-4 py-2.5 focus:outline-none" style={{ backgroundColor: 'var(--surface-secondary)', border: '1px solid var(--border-strong)', color: 'var(--text-primary)' }}>
                  <option>Unassigned</option>
                  <option>Team Alpha</option>
                  <option>Team Bravo</option>
                  <option>Emma Wilson</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold mb-1" style={{ color: 'var(--text-secondary)' }}>Zone Shape</label>
                <select value={formData.shape} onChange={e => setFormData({...formData, shape: e.target.value})} className="w-full rounded-xl px-4 py-2.5 focus:outline-none" style={{ backgroundColor: 'var(--surface-secondary)', border: '1px solid var(--border-strong)', color: 'var(--text-primary)' }}>
                  <option value="rect">Rectangle / Block</option>
                  <option value="circle">Radius / Circle</option>
                </select>
              </div>
            </div>
            <div className="mt-8 flex justify-end gap-3">
              <button type="button" onClick={() => setIsModalOpen(false)} className="px-5 py-2.5 rounded-xl font-medium cursor-pointer border-none bg-transparent hover:bg-surface-secondary transition-colors" style={{ color: 'var(--text-secondary)' }}>Cancel</button>
              <button type="submit" className="px-6 py-2.5 rounded-xl font-medium shadow-lg cursor-pointer border-none hover:scale-105 transition-all" style={{ backgroundColor: 'var(--info)', color: 'var(--text-on-primary)' }}>
                Draw Zone
              </button>
            </div>
          </form>
        </div>
      )}

      {toast && (
        <div className="fixed bottom-6 right-6 z-[120] px-6 py-3 rounded-xl shadow-xl font-bold animate-in slide-in-from-bottom-4" style={{ backgroundColor: 'var(--success)', color: 'var(--text-on-primary)' }}>
          {toast}
        </div>
      )}
    </div>
  );
};

