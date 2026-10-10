import React, { useState } from 'react';
import { Target, TrendingUp, Filter, BarChart3 } from 'lucide-react';

const card = { backgroundColor: 'var(--surface)', border: '1px solid var(--border)', boxShadow: 'var(--shadow-sm)' };
const sub = { color: 'var(--text-secondary)' };
const inner = { backgroundColor: 'var(--surface-secondary)', border: '1px solid var(--border)' };

const CAMPAIGNS = {
  'Prop 12 - Clean iCanvass Ballot': { collected: 125430, target: 250000, rate: 1240, days: 102 },
  'Local Measure A': { collected: 48200, target: 60000, rate: 640, days: 18 },
};

const TEAMS = [
  { name: 'Leo Fontaine (Team Alpha)', count: 65200, pct: 52 },
  { name: 'Sarah Jenkins (Team Beta)', count: 42100, pct: 33 },
  { name: 'Unassigned / Direct', count: 18130, pct: 15 },
];

export const ProgressTrack = () => {
  const [campaign, setCampaign] = useState(Object.keys(CAMPAIGNS)[0]);
  const [open, setOpen] = useState(false);
  const c = CAMPAIGNS[campaign];
  const pct = Math.min(100, (c.collected / c.target) * 100);
  const projected = c.collected + c.rate * c.days >= c.target;

  return (
    <div className="h-full overflow-y-auto pb-10" style={{ backgroundColor: 'var(--background)', color: 'var(--text-primary)' }}>
      <div className="p-4 sm:p-6 sticky top-0 z-20 flex flex-col sm:flex-row sm:items-center justify-between gap-4" style={{ backgroundColor: 'var(--surface)', borderBottom: '1px solid var(--border)' }}>
        <div>
          <h1 className="text-xl sm:text-2xl font-bold flex items-center gap-3" style={{ color: 'var(--text-primary)' }}>
            <div className="p-2 rounded-lg" style={{ backgroundColor: 'var(--info-light)' }}>
              <Target className="w-6 h-6" style={{ color: 'var(--info)' }} />
            </div>
            Progress Tracking
          </h1>
          <p className="mt-1 text-sm" style={sub}>Monitor signature collection rates against legally mandated campaign goals.</p>
        </div>
        <div className="relative">
          <button onClick={() => setOpen((o) => !o)} className="w-full sm:w-auto flex items-center justify-center gap-2 px-4 py-2 rounded-xl font-bold" style={{ ...inner, color: 'var(--text-primary)' }}>
            <Filter className="w-4 h-4" /> Filter by Campaign
          </button>
          {open && (
            <div className="absolute right-0 mt-2 w-64 rounded-xl py-1 shadow-xl z-30" style={{ backgroundColor: 'var(--surface)', border: '1px solid var(--border-strong)' }}>
              {Object.keys(CAMPAIGNS).map((name) => (
                <button key={name} onClick={() => { setCampaign(name); setOpen(false); }} className="w-full text-left px-4 py-2 text-sm" style={{ color: name === campaign ? 'var(--info)' : 'var(--text-primary)', fontWeight: name === campaign ? 700 : 400 }}>
                  {name}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 mt-8 space-y-8">
        <div className="rounded-2xl p-4 sm:p-6" style={card}>
          <h2 className="text-xl font-bold mb-6" style={{ color: 'var(--text-primary)' }}>{campaign}</h2>
          <div className="flex flex-col md:flex-row gap-8 items-stretch">
            <div className="w-full md:w-2/3 space-y-4">
              <div className="flex justify-between items-end">
                <div>
                  <div className="text-sm font-medium" style={sub}>Total Collected</div>
                  <div className="text-3xl sm:text-4xl font-black" style={{ color: 'var(--success)' }}>{c.collected.toLocaleString()}</div>
                </div>
                <div className="text-right">
                  <div className="text-sm font-medium" style={sub}>Legal Target</div>
                  <div className="text-2xl font-bold" style={{ color: 'var(--text-primary)' }}>{c.target.toLocaleString()}</div>
                </div>
              </div>
              <div className="w-full rounded-full relative overflow-hidden" style={{ height: 16, backgroundColor: 'var(--surface-hover)', border: '1px solid var(--border)' }}>
                <div className="rounded-full" style={{ height: 16, width: `${pct}%`, backgroundColor: 'var(--success)' }} />
                <div style={{ position: 'absolute', top: 0, bottom: 0, left: '75%', borderLeft: '2px dashed var(--error)' }} title="Safe Buffer Line" />
              </div>
              <div className="flex justify-between text-xs font-semibold uppercase" style={{ color: 'var(--text-tertiary)' }}>
                <span>0%</span>
                <span style={{ color: 'var(--info)' }}>Current: {pct.toFixed(1)}%</span>
                <span style={{ color: 'var(--error)' }}>Safe Goal: 75%</span>
                <span>100%</span>
              </div>
            </div>

            <div className="w-full md:w-1/3 grid grid-cols-2 gap-4">
              <div className="p-4 rounded-xl" style={inner}>
                <div className="text-xs mb-1" style={sub}>Daily Run Rate</div>
                <div className="text-xl font-bold flex items-center gap-2" style={{ color: 'var(--text-primary)' }}>
                  <TrendingUp className="w-4 h-4" style={{ color: 'var(--success)' }} /> {c.rate.toLocaleString()}
                </div>
              </div>
              <div className="p-4 rounded-xl" style={inner}>
                <div className="text-xs mb-1" style={sub}>Days Remaining</div>
                <div className="text-xl font-bold" style={{ color: 'var(--text-primary)' }}>{c.days}</div>
              </div>
              <div className="p-4 rounded-xl col-span-2" style={inner}>
                <div className="text-xs mb-1" style={sub}>Projected Outcome</div>
                <div className="text-lg font-bold" style={{ color: projected ? 'var(--success)' : 'var(--error)' }}>
                  {projected ? 'On Track to Surpass Goal' : 'At Risk of Missing Goal'}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="rounded-2xl p-4 sm:p-6" style={card}>
          <div className="flex items-center gap-3 mb-6">
            <BarChart3 className="w-5 h-5" style={{ color: 'var(--info)' }} />
            <h3 className="font-bold text-lg" style={{ color: 'var(--text-primary)' }}>Contribution by Manager</h3>
          </div>
          <div className="space-y-4">
            {TEAMS.map((team) => (
              <div key={team.name} className="flex flex-wrap sm:flex-nowrap items-center gap-2 sm:gap-4">
                <div className="w-full sm:w-48 text-sm font-semibold truncate" style={{ color: 'var(--text-primary)' }}>{team.name}</div>
                <div className="flex-1 rounded-full" style={{ height: 8, backgroundColor: 'var(--surface-hover)', minWidth: 100 }}>
                  <div className="rounded-full" style={{ height: 8, width: `${team.pct}%`, backgroundColor: 'var(--info)' }} />
                </div>
                <div className="w-24 text-right text-sm font-mono" style={{ color: 'var(--text-primary)' }}>{team.count.toLocaleString()}</div>
                <div className="w-12 text-right text-xs" style={{ color: 'var(--text-tertiary)' }}>{team.pct}%</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
