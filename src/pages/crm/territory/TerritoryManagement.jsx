import React, { useState } from 'react';
import { 
  MapPin, Users, Search, Plus, Target, BarChart2, Edit3, Navigation, Flag, ChevronRight, Compass, Shield
} from 'lucide-react';

export const TerritoryManagement = () => {
  const [selectedCounty, setSelectedCounty] = useState('Los Angeles County');
  const [territories, setTerritories] = useState([
    {
      id: 'TER-001',
      nickname: 'Downtown District 4',
      county: 'Los Angeles County',
      manager: 'Sarah Jenkins',
      activeCirculators: 12,
      registeredVoters: 150000,
      signedVoters: 24500,
      status: 'Active',
      color: 'bg-emerald-500',
    },
    {
      id: 'TER-002',
      nickname: 'Westside Coastal',
      county: 'Los Angeles County',
      manager: 'Marcus Sterling',
      activeCirculators: 8,
      registeredVoters: 85000,
      signedVoters: 12000,
      status: 'Active',
      color: 'bg-blue-500',
    },
    {
      id: 'TER-003',
      nickname: 'Northern Valley Sector',
      county: 'Orange County',
      manager: 'Unassigned',
      activeCirculators: 0,
      registeredVoters: 220000,
      signedVoters: 5000,
      status: 'Pending Assignment',
      color: 'bg-amber-500',
    }
  ]);

  const counties = ['Los Angeles County', 'Orange County', 'San Diego County', 'Riverside County'];

  return (
    <div className="h-full bg-surface text-primary overflow-y-auto pb-10">
      
      {/* Header */}
      <div className="border-b border-border bg-surface-secondary p-6 backdrop-blur-xl sticky top-0 z-20">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-primary flex items-center gap-3">
              <div className="p-2 bg-rose-500/20 rounded-lg">
                <MapPin className="w-6 h-6 text-rose-400" />
              </div>
              Territory Management
            </h1>
            <p className="mt-1 text-sm text-secondary">
              Assign territories, manage nicknames, and track voter signature penetration by county.
            </p>
          </div>
          
          <div className="flex items-center gap-3">
            <button className="flex items-center gap-2 px-5 py-2.5 bg-surface-secondary hover:bg-surface-secondary text-primary rounded-xl font-medium transition-colors border border-border">
              <Target className="w-4 h-4" /> View Statewide Map
            </button>
            <button className="flex items-center gap-2 px-5 py-2.5 bg-rose-600 hover:bg-rose-500 text-primary rounded-xl font-medium shadow-lg shadow-rose-500/20 transition-all">
              <Plus className="w-4 h-4" /> Define New Territory
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 mt-8 flex flex-col lg:flex-row gap-6">
        
        {/* Left Column - Map Interface */}
        <div className="lg:w-2/3 flex flex-col gap-6">
          
          {/* Interactive Map Mock */}
          <div className="bg-surface-secondary border border-border rounded-3xl overflow-hidden shadow-2xl relative flex flex-col h-[500px]">
            <div className="absolute top-4 left-4 z-10 flex items-center gap-2 bg-surface-secondary backdrop-blur-md border border-border rounded-xl p-2 px-4 shadow-lg">
              <Compass className="w-5 h-5 text-rose-400" />
              <select 
                value={selectedCounty}
                onChange={(e) => setSelectedCounty(e.target.value)}
                className="bg-transparent text-primary font-semibold focus:outline-none appearance-none"
              >
                {counties.map(c => <option key={c} className="bg-surface-secondary">{c}</option>)}
              </select>
            </div>
            
            <div className="absolute top-4 right-4 z-10">
              <div className="bg-surface-secondary backdrop-blur-md border border-border rounded-xl p-3 shadow-lg flex flex-col gap-2">
                <span className="text-[10px] font-semibold text-secondary uppercase tracking-wider">Map Legend</span>
                <div className="flex items-center gap-2 text-xs"><div className="w-3 h-3 rounded-full bg-emerald-500" /> Active (High Density)</div>
                <div className="flex items-center gap-2 text-xs"><div className="w-3 h-3 rounded-full bg-blue-500" /> Active (Normal)</div>
                <div className="flex items-center gap-2 text-xs"><div className="w-3 h-3 rounded-full bg-amber-500" /> Unassigned</div>
              </div>
            </div>

            {/* Map Grid Background */}
            <div 
              className="flex-1 bg-background relative overflow-hidden flex items-center justify-center cursor-crosshair"
              style={{
                backgroundImage: 'radial-gradient(rgba(244, 63, 94, 0.1) 1px, transparent 1px)',
                backgroundSize: '30px 30px',
              }}
            >
              {/* Mock Regions on Map */}
              <div className="absolute top-1/4 left-1/4 group">
                <div className="w-32 h-32 bg-emerald-500/20 border-2 border-emerald-500/50 rounded-3xl transform rotate-12 transition-transform group-hover:scale-105 flex items-center justify-center relative cursor-pointer">
                  <MapPin className="w-8 h-8 text-emerald-400 drop-shadow-[0_0_10px_rgba(16,185,129,0.8)]" />
                  <div className="absolute -bottom-8 bg-surface-secondary text-primary text-xs px-2 py-1 rounded-md opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap border border-border">
                    Downtown District 4
                  </div>
                </div>
              </div>

              <div className="absolute bottom-1/4 right-1/3 group">
                <div className="w-40 h-24 bg-blue-500/20 border-2 border-blue-500/50 rounded-full transform -rotate-6 transition-transform group-hover:scale-105 flex items-center justify-center relative cursor-pointer">
                  <MapPin className="w-8 h-8 text-blue-400 drop-shadow-[0_0_10px_rgba(59,130,246,0.8)]" />
                  <div className="absolute -bottom-8 bg-surface-secondary text-primary text-xs px-2 py-1 rounded-md opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap border border-border">
                    Westside Coastal
                  </div>
                </div>
              </div>
              
              <div className="absolute top-1/3 right-1/4 group">
                <div className="w-24 h-24 bg-amber-500/20 border-2 border-amber-500/50 rounded-tl-3xl rounded-br-3xl transition-transform group-hover:scale-105 flex items-center justify-center relative cursor-pointer">
                  <MapPin className="w-8 h-8 text-amber-400 drop-shadow-[0_0_10px_rgba(245,158,11,0.8)]" />
                  <div className="absolute -bottom-8 bg-surface-secondary text-primary text-xs px-2 py-1 rounded-md opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap border border-border">
                    Click to Assign Territory
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-surface-secondary p-3 border-t border-border flex justify-between items-center text-xs text-secondary">
              <span>Coordinates: 34.0522° N, 118.2437° W</span>
              <span className="flex items-center gap-1"><Navigation className="w-3 h-3" /> Live Tracking Active</span>
            </div>
          </div>
          
        </div>

        {/* Right Column - Directory & Stats */}
        <div className="lg:w-1/3 flex flex-col gap-6">
          
          {/* County Level Stats */}
          <div className="bg-gradient-to-br from-indigo-900/50 to-slate-800/40 border border-indigo-500/30 rounded-3xl p-6 relative overflow-hidden">
            <BarChart2 className="w-32 h-32 text-indigo-500/10 absolute -bottom-4 -right-4" />
            <h3 className="text-lg font-bold text-primary mb-6 relative z-10">Voter Penetration Stats</h3>
            
            <div className="space-y-5 relative z-10">
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-secondary">Total Registered Voters</span>
                  <span className="font-bold text-primary">455,000</span>
                </div>
              </div>
              
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-secondary">Total Signed</span>
                  <span className="font-bold text-emerald-400">41,500</span>
                </div>
                <div className="w-full h-2 bg-surface rounded-full overflow-hidden">
                  <div className="h-full bg-emerald-500 w-[9%]" />
                </div>
                <p className="text-[10px] text-secondary mt-1 text-right">9.1% Penetration Rate</p>
              </div>

              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-secondary">Remaining Unsigned</span>
                  <span className="font-bold text-amber-400">413,500</span>
                </div>
                <div className="w-full h-2 bg-surface rounded-full overflow-hidden">
                  <div className="h-full bg-amber-500 w-[91%]" />
                </div>
              </div>
            </div>
          </div>

          {/* Territory List */}
          <div className="bg-surface-secondary border border-border rounded-3xl overflow-hidden flex-1 flex flex-col">
            <div className="p-5 border-b border-border">
              <h3 className="font-bold text-primary flex items-center gap-2">
                <Flag className="w-5 h-5 text-rose-400" /> Active Zones
              </h3>
            </div>
            
            <div className="flex-1 overflow-y-auto p-3 space-y-3">
              {territories.map(t => {
                const percentSigned = ((t.signedVoters / t.registeredVoters) * 100).toFixed(1);
                
                return (
                  <div key={t.id} className="bg-surface-secondary border border-border rounded-xl p-4 hover:border-border transition-colors group cursor-pointer">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <div className={`w-3 h-3 rounded-full ${t.color}`} />
                        <h4 className="font-bold text-primary text-sm">{t.nickname}</h4>
                      </div>
                      <button className="text-secondary hover:text-primary opacity-0 group-hover:opacity-100 transition-opacity">
                        <Edit3 className="w-4 h-4" />
                      </button>
                    </div>
                    
                    <p className="text-xs text-secondary mb-3 flex items-center gap-1">
                      <Users className="w-3 h-3" /> {t.manager} ({t.activeCirculators} Reps)
                    </p>
                    
                    <div className="flex items-end justify-between">
                      <div>
                        <p className="text-[10px] text-secondary uppercase">Signed</p>
                        <p className="text-sm font-bold text-emerald-400">{t.signedVoters.toLocaleString()}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-[10px] text-secondary uppercase">Penetration</p>
                        <p className="text-sm font-bold text-primary">{percentSigned}%</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          
        </div>

      </div>
    </div>
  );
};
