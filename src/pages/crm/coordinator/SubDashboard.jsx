import React from 'react';
import { LayoutDashboard, Target, Network, ShieldAlert } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const card = { backgroundColor: 'var(--surface)', border: '1px solid var(--border)', boxShadow: 'var(--shadow-sm)', textAlign: 'left', cursor: 'pointer' };
const label = { color: 'var(--text-secondary)' };

export const SubDashboard = () => {
  const navigate = useNavigate();
  return (
    <div className="h-full overflow-y-auto pb-10" style={{ backgroundColor: 'var(--background)', color: 'var(--text-primary)' }}>
      <div className="p-4 sm:p-6 sticky top-0 z-20" style={{ backgroundColor: 'var(--surface)', borderBottom: '1px solid var(--border)' }}>
        <h1 className="text-xl sm:text-2xl font-bold flex items-center gap-3" style={{ color: 'var(--text-primary)' }}>
          <div className="p-2 rounded-lg" style={{ backgroundColor: 'var(--info-light)' }}>
            <LayoutDashboard className="w-6 h-6" style={{ color: 'var(--info)' }} />
          </div>
          Sub Coordinator Dashboard
        </h1>
        <p className="mt-1 text-sm" style={label}>
          Overview of entire field operations, hierarchy performance, and compliance metrics.
        </p>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 mt-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button onClick={() => navigate('/crm/hierarchy')} className="text-left rounded-2xl p-5" style={card}>
            <div className="flex items-center gap-3 mb-2">
              <Network className="w-5 h-5" style={{ color: 'var(--info)' }} />
              <h3 className="font-medium" style={label}>Active Managers</h3>
            </div>
            <p className="text-3xl font-bold" style={{ color: 'var(--text-primary)' }}>12</p>
            <p className="text-xs mt-1" style={{ color: 'var(--info)' }}>Managing 140+ circulators</p>
          </button>

          <button onClick={() => navigate('/crm/progress')} className="text-left rounded-2xl p-5" style={card}>
            <div className="flex items-center gap-3 mb-2">
              <Target className="w-5 h-5" style={{ color: 'var(--success)' }} />
              <h3 className="font-medium" style={label}>Field Operations Progress</h3>
            </div>
            <p className="text-3xl font-bold" style={{ color: 'var(--text-primary)' }}>
              125k <span className="text-sm font-normal" style={{ color: 'var(--text-tertiary)' }}>/ 250k Goal</span>
            </p>
            <div className="w-full rounded-full mt-2" style={{ height: 6, backgroundColor: 'var(--surface-hover)' }}>
              <div className="rounded-full" style={{ height: 6, width: '50%', backgroundColor: 'var(--success)' }} />
            </div>
          </button>

          <button onClick={() => navigate('/crm/compliance')} className="text-left rounded-2xl p-5" style={card}>
            <div className="flex items-center gap-3 mb-2">
              <ShieldAlert className="w-5 h-5" style={{ color: 'var(--error)' }} />
              <h3 className="font-medium" style={label}>Compliance Flags</h3>
            </div>
            <p className="text-3xl font-bold" style={{ color: 'var(--text-primary)' }}>3</p>
            <p className="text-xs mt-1" style={{ color: 'var(--error)' }}>Require immediate review</p>
          </button>
        </div>
      </div>
    </div>
  );
};
