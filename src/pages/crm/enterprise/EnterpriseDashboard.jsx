import React, { useState } from 'react';
import { 
  Building2, BarChart3, PieChart, Filter, Download, ArrowUpRight, ArrowDownRight, 
  Map, Users, TrendingUp, Calendar, CheckCircle2, AlertTriangle, Activity
} from 'lucide-react';

export const EnterpriseDashboard = () => {
  const [timeframe, setTimeframe] = useState('This Month');
  const [filterRegion, setFilterRegion] = useState('All Regions');
  const [toast, setToast] = useState('');

  const notify = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(''), 3000);
  };

  const stats = [
    { label: 'Total Signatures', value: '142,500', change: '+12.5%', isPositive: true },
    { label: 'Validation Rate', value: '88.4%', change: '+2.1%', isPositive: true },
    { label: 'Campaign Budget Spent', value: '$498,750', change: '45% of Total', isPositive: null },
    { label: 'Active Field Agents', value: '412', change: '-4', isPositive: false },
  ];

  const chartData = [
    { day: 'Mon', count: 4200, valid: 3800 },
    { day: 'Tue', count: 5100, valid: 4600 },
    { day: 'Wed', count: 4800, valid: 4300 },
    { day: 'Thu', count: 6200, valid: 5700 },
    { day: 'Fri', count: 7100, valid: 6300 },
    { day: 'Sat', count: 8500, valid: 7200 },
    { day: 'Sun', count: 7800, valid: 6900 },
  ];
  
  const maxCount = Math.max(...chartData.map(d => d.count));

  const topRegions = [
    { name: 'Los Angeles, CA', sigs: 45200, progress: 85 },
    { name: 'San Diego, CA', sigs: 32100, progress: 68 },
    { name: 'Orange County, CA', sigs: 28400, progress: 72 },
    { name: 'Riverside, CA', sigs: 18500, progress: 45 },
  ];

  return (
    <div className="h-full bg-background text-primary overflow-y-auto pb-10">
      
      {/* Header */}
      <div className="border-b border-border bg-surface-secondary p-6 backdrop-blur-xl sticky top-0 z-30">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-semibold uppercase tracking-wider mb-2">
              <Building2 className="w-3 h-3" /> Campaign Manager Portal
            </div>
            <h1 className="text-3xl font-extrabold text-primary tracking-tight">Enterprise Analytics</h1>
            <p className="mt-1 text-sm text-secondary">
              Advanced statistical reporting and real-time campaign performance tracking.
            </p>
          </div>
          
          <div className="flex flex-wrap items-center gap-3">
            <div className="flex bg-surface border border-border rounded-xl p-1">
              {['Today', 'This Week', 'This Month'].map(t => (
                <button
                  key={t}
                  onClick={() => setTimeframe(t)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    timeframe === t 
                      ? 'bg-surface-secondary text-primary shadow-sm' 
                      : 'text-secondary hover:text-primary hover:bg-surface-secondary'
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>
            
            <button onClick={() => notify('Filter options opened')} className="flex items-center gap-2 px-4 py-2.5 rounded-xl font-medium transition-colors cursor-pointer border hover:bg-surface-secondary" style={{ backgroundColor: 'var(--surface-secondary)', borderColor: 'var(--border)', color: 'var(--text-primary)' }}>
              <Filter className="w-4 h-4" /> Filters
            </button>
            <button onClick={() => notify('Report export started...')} className="flex items-center gap-2 px-4 py-2.5 rounded-xl font-medium shadow-lg transition-all cursor-pointer border-none hover:scale-105" style={{ backgroundColor: 'var(--info)', color: 'var(--text-on-primary)' }}>
              <Download className="w-4 h-4" /> Export Report
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-[1400px] mx-auto px-6 mt-8 space-y-6">
        
        {/* Top KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
          {stats.map((stat, i) => (
            <div key={i} className="bg-surface border border-border rounded-2xl p-6 relative overflow-hidden group hover:border-border transition-colors">
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-indigo-500/5 to-transparent rounded-bl-full pointer-events-none" />
              <p className="text-sm font-semibold text-secondary mb-2">{stat.label}</p>
              <h3 className="text-3xl font-extrabold text-primary mb-2">{stat.value}</h3>
              
              <div className="flex items-center gap-2 text-sm">
                {stat.isPositive === true ? (
                  <span className="flex items-center gap-1 text-emerald-400 font-medium bg-emerald-500/10 px-2 py-0.5 rounded-md">
                    <ArrowUpRight className="w-3 h-3" /> {stat.change}
                  </span>
                ) : stat.isPositive === false ? (
                  <span className="flex items-center gap-1 text-rose-400 font-medium bg-rose-500/10 px-2 py-0.5 rounded-md">
                    <ArrowDownRight className="w-3 h-3" /> {stat.change}
                  </span>
                ) : (
                  <span className="text-secondary">{stat.change}</span>
                )}
                {stat.isPositive !== null && <span className="text-secondary text-xs">vs last period</span>}
              </div>
            </div>
          ))}
        </div>

        {/* Main Analytics Grid */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
          
          {/* Main Chart */}
          <div className="xl:col-span-2 bg-surface border border-border rounded-2xl p-6">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h3 className="text-lg font-bold text-primary flex items-center gap-2">
                  <BarChart3 className="w-5 h-5 text-indigo-400" /> Signature Collection Velocity
                </h3>
                <p className="text-sm text-secondary mt-1">Total vs Validated signatures over the last 7 days</p>
              </div>
              <div className="flex items-center gap-4 text-xs font-medium">
                <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-indigo-500" /> Total Collected</div>
                <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-emerald-400" /> Validated</div>
              </div>
            </div>
            
            {/* Custom Bar Chart Mock Fixed */}
            <div className="h-64 flex items-end justify-between gap-2 sm:gap-4 mt-8 px-2 sm:px-6">
              {chartData.map((d, i) => {
                const totalHeight = Math.max((d.count / maxCount) * 100, 5); // Ensure minimum height
                const validHeight = Math.max((d.valid / maxCount) * 100, 5); // Relative to chart, not the bar!
                
                return (
                  <div key={i} className="flex flex-col items-center gap-2 w-full max-w-[50px] cursor-pointer group relative">
                    {/* Tooltip */}
                    <div className="absolute bottom-full mb-2 bg-surface-secondary border border-border px-3 py-2 rounded-lg shadow-xl text-xs whitespace-nowrap transition-all opacity-0 group-hover:opacity-100 group-hover:-translate-y-1 pointer-events-none z-10 hidden sm:block">
                      <p className="font-bold mb-1 text-primary">{d.day}</p>
                      <p className="text-indigo-400">{d.count.toLocaleString()} Total</p>
                      <p className="text-emerald-400">{d.valid.toLocaleString()} Valid</p>
                    </div>
                    
                    {/* Bar container */}
                    <div className="w-full flex justify-center items-end gap-1" style={{ height: '200px' }}>
                      {/* Total Bar */}
                      <div className="w-1/2 rounded-t-sm transition-all duration-1000 group-hover:opacity-80" style={{ height: `${totalHeight}%`, backgroundColor: 'var(--info)' }}></div>
                      {/* Valid Bar */}
                      <div className="w-1/2 rounded-t-sm transition-all duration-1000 group-hover:opacity-80" style={{ height: `${validHeight}%`, backgroundColor: 'var(--success)' }}></div>
                    </div>
                    
                    <span className="text-[10px] sm:text-xs font-semibold uppercase mt-2 text-secondary">{d.day}</span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right Sidebar - Geographic Performance */}
          <div className="bg-surface border border-border rounded-2xl p-6 flex flex-col">
            <h3 className="text-lg font-bold text-primary flex items-center gap-2 mb-6">
              <Map className="w-5 h-5 text-rose-400" /> Top Performing Regions
            </h3>
            
            <div className="space-y-6 flex-1">
              {topRegions.map((region, i) => (
                <div key={i}>
                  <div className="flex items-end justify-between mb-2">
                    <div>
                      <h4 className="text-sm font-semibold text-primary">{region.name}</h4>
                      <p className="text-xs text-secondary mt-0.5">{region.sigs.toLocaleString()} signatures</p>
                    </div>
                    <span className="text-sm font-bold text-primary">{region.progress}%</span>
                  </div>
                  <div className="w-full h-2 bg-surface-secondary rounded-full overflow-hidden">
                    <div 
                      className={`h-full rounded-full ${
                        i === 0 ? 'bg-rose-500' : 
                        i === 1 ? 'bg-amber-500' : 
                        i === 2 ? 'bg-blue-500' : 'bg-secondary'
                      }`} 
                      style={{ width: `${region.progress}%` }} 
                    />
                  </div>
                </div>
              ))}
            </div>

            <button className="w-full mt-6 py-3 border border-border hover:bg-surface-secondary text-secondary text-sm font-medium rounded-xl transition-colors">
              View Detailed Heatmap
            </button>
          </div>
        </div>

        {/* Bottom Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-surface border border-border rounded-2xl p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2.5 bg-blue-500/10 rounded-xl text-blue-400"><Users className="w-5 h-5" /></div>
              <h4 className="font-semibold text-primary">Demographics</h4>
            </div>
            <div className="space-y-4">
              <div className="flex items-center justify-between text-sm">
                <span className="text-secondary">Registered Democrats</span>
                <span className="font-medium text-primary">52%</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-secondary">Registered Republicans</span>
                <span className="font-medium text-primary">31%</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-secondary">Independents/Other</span>
                <span className="font-medium text-primary">17%</span>
              </div>
            </div>
          </div>

          <div className="bg-surface border border-border rounded-2xl p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2.5 bg-emerald-500/10 rounded-xl text-emerald-400"><CheckCircle2 className="w-5 h-5" /></div>
              <h4 className="font-semibold text-primary">Compliance Metrics</h4>
            </div>
            <div className="space-y-4">
              <div className="flex items-center justify-between text-sm">
                <span className="text-secondary">Total Validated</span>
                <span className="font-bold text-emerald-400">125,970</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-secondary">Rejected (Duplicate)</span>
                <span className="font-medium text-rose-400">12,100</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-secondary">Rejected (Not Reg.)</span>
                <span className="font-medium text-rose-400">4,430</span>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-indigo-900/40 to-slate-900 border border-indigo-500/20 rounded-2xl p-6 flex flex-col justify-center items-center text-center">
            <Activity className="w-12 h-12 text-indigo-400 mb-4" />
            <h4 className="text-xl font-bold text-primary mb-2">Campaign is on track</h4>
            <p className="text-sm text-secondary">Based on the current velocity, you are projected to hit the 250,000 signature goal 14 days ahead of schedule.</p>
          </div>
        </div>
      </div>

      {toast && (
        <div className="fixed bottom-6 right-6 z-[120] px-6 py-3 rounded-xl shadow-xl font-bold animate-in slide-in-from-bottom-4" style={{ backgroundColor: 'var(--success)', color: 'var(--text-on-primary)' }}>
          {toast}
        </div>
      )}
    </div>
  );
};
