import React, { useState } from 'react';
import { TrendingUp, BarChart2, PieChart, Activity, Filter, Download, ArrowUp, ArrowDown } from 'lucide-react';

export const AdvancedReports = () => {
  const [toast, setToast] = useState('');

  const notify = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(''), 3000);
  };

  const cities = [
    { name: 'San Francisco', target: 10000, current: 8500, status: 'Active', trend: '+5%' },
    { name: 'Los Angeles', target: 25000, current: 28000, status: 'Completed', trend: '+12%' },
    { name: 'San Diego', target: 15000, current: 12000, status: 'Active', trend: '-2%' },
    { name: 'Sacramento', target: 12000, current: 6000, status: 'Behind', trend: '-8%' }
  ];

  const demographics = [
    { label: '18-24', percentage: 15, color: 'bg-indigo-400' },
    { label: '25-34', percentage: 35, color: 'bg-blue-400' },
    { label: '35-44', percentage: 25, color: 'bg-emerald-400' },
    { label: '45-54', percentage: 15, color: 'bg-amber-400' },
    { label: '55+', percentage: 10, color: 'bg-rose-400' }
  ];

  return (
    <div className="h-full overflow-y-auto pb-10" style={{ backgroundColor: 'var(--background)', color: 'var(--text-primary)' }}>
      
      {/* Header */}
      <div className="border-b p-6 sticky top-0 z-20 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4" style={{ backgroundColor: 'var(--surface)', borderColor: 'var(--border)' }}>
        <div>
          <h1 className="text-2xl font-bold flex items-center gap-3 m-0">
            <div className="p-2 rounded-lg" style={{ backgroundColor: 'var(--info-light)' }}>
              <TrendingUp className="w-6 h-6" style={{ color: 'var(--info)' }} />
            </div>
            Advanced Reporting
          </h1>
          <p className="mt-1 text-sm m-0" style={{ color: 'var(--text-secondary)' }}>
            Breakdown of signatures by State, County, City, and demographics.
          </p>
        </div>
        <div className="flex flex-wrap gap-3 w-full sm:w-auto">
          <button onClick={() => notify('Filter panel opened (mock)')} className="flex-1 sm:flex-none items-center justify-center gap-2 px-4 py-2 rounded-lg font-semibold transition-colors border cursor-pointer hover:bg-surface-secondary" style={{ backgroundColor: 'var(--surface)', borderColor: 'var(--border)', color: 'var(--text-primary)' }}>
            <Filter className="w-4 h-4 inline-block mr-2" /> Filters
          </button>
          <button onClick={() => notify('Report export started...')} className="flex-1 sm:flex-none items-center justify-center gap-2 px-4 py-2 rounded-lg font-semibold transition-all shadow-lg cursor-pointer hover:scale-105 border-none" style={{ backgroundColor: 'var(--info)', color: 'var(--text-on-primary)' }}>
            <Download className="w-4 h-4 inline-block mr-2" /> Export
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 mt-8 space-y-6">
        
        {/* Charts Area */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          
          {/* Bar Chart Mock */}
          <div className="rounded-2xl p-6 h-[400px] flex flex-col relative" style={{ backgroundColor: 'var(--surface)', border: '1px solid var(--border)' }}>
             <div className="flex items-center justify-between mb-6">
                <h3 className="font-bold text-lg m-0 flex items-center gap-2"><BarChart2 className="w-5 h-5 text-info" style={{ color: 'var(--info)' }} /> State vs County Performance</h3>
             </div>
             
             <div className="flex-1 flex items-end justify-between gap-2 sm:gap-4 mt-auto">
                {[45, 80, 60, 95, 50, 75, 40].map((height, i) => (
                  <div key={i} className="w-full flex flex-col items-center gap-2 group cursor-pointer">
                    <div className="opacity-0 group-hover:opacity-100 absolute bottom-full mb-2 bg-surface-secondary border border-border px-3 py-2 rounded-lg shadow-xl text-xs whitespace-nowrap transition-opacity z-10">
                      Region {i+1}: {height}k signatures
                    </div>
                    <div className="w-full rounded-t-lg transition-all duration-500 group-hover:opacity-80" style={{ height: `${height}%`, backgroundColor: i % 2 === 0 ? 'var(--info)' : 'var(--info-light)', opacity: i % 2 === 0 ? 1 : 0.6 }}></div>
                    <span className="text-[10px] sm:text-xs font-semibold" style={{ color: 'var(--text-secondary)' }}>R{i+1}</span>
                  </div>
                ))}
             </div>
          </div>
          
          {/* Pie Chart / Demographics Mock */}
          <div className="rounded-2xl p-6 h-[400px] flex flex-col relative" style={{ backgroundColor: 'var(--surface)', border: '1px solid var(--border)' }}>
             <h3 className="font-bold text-lg m-0 flex items-center gap-2 mb-6"><PieChart className="w-5 h-5" style={{ color: 'var(--success)' }} /> Demographic Breakdown</h3>
             
             <div className="flex-1 flex flex-col md:flex-row items-center justify-center gap-8">
                {/* CSS circle trick for a pie chart look */}
                <div className="relative w-48 h-48 rounded-full shadow-inner border-4 border-surface" style={{ background: 'conic-gradient(var(--info) 0% 35%, var(--success) 35% 60%, var(--warning) 60% 75%, var(--error) 75% 85%, var(--text-tertiary) 85% 100%)' }}>
                  <div className="absolute inset-0 m-auto w-24 h-24 rounded-full shadow-lg" style={{ backgroundColor: 'var(--surface)' }}></div>
                </div>
                
                <div className="flex flex-col gap-3 w-full md:w-auto">
                  {demographics.map((dem) => (
                    <div key={dem.label} className="flex items-center justify-between gap-4">
                      <div className="flex items-center gap-2">
                        <div className={`w-3 h-3 rounded-full ${dem.color}`}></div>
                        <span className="text-sm font-semibold">{dem.label}</span>
                      </div>
                      <span className="text-sm font-bold">{dem.percentage}%</span>
                    </div>
                  ))}
                </div>
             </div>
          </div>
        </div>

        {/* City Level Performance */}
        <div className="rounded-2xl p-6" style={{ backgroundColor: 'var(--surface)', border: '1px solid var(--border)' }}>
           <div className="flex items-center justify-between mb-6 border-b pb-4" style={{ borderColor: 'var(--border)' }}>
              <div className="flex items-center gap-2">
                <Activity className="w-5 h-5" style={{ color: 'var(--info)' }} />
                <h2 className="text-lg font-bold m-0">City-Level Performance Metrics</h2>
              </div>
           </div>
           
           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {cities.map((city, idx) => {
                const progress = Math.min((city.current / city.target) * 100, 100);
                const isPositive = city.trend.startsWith('+');
                
                return (
                  <div key={idx} className="rounded-xl p-5 hover:-translate-y-1 transition-transform cursor-pointer shadow-sm hover:shadow-md" style={{ backgroundColor: 'var(--surface-secondary)', border: '1px solid var(--border)' }} onClick={() => notify(`View detailed metrics for ${city.name}`)}>
                    <div className="flex justify-between items-start mb-4">
                      <h4 className="font-bold m-0 text-base">{city.name}</h4>
                      <span className={`flex items-center text-xs font-bold ${isPositive ? 'text-emerald-500' : 'text-rose-500'}`}>
                        {isPositive ? <ArrowUp className="w-3 h-3 mr-0.5" /> : <ArrowDown className="w-3 h-3 mr-0.5" />} {city.trend}
                      </span>
                    </div>
                    
                    <div className="w-full rounded-full h-2 mb-3 overflow-hidden" style={{ backgroundColor: 'var(--border)' }}>
                       <div className="h-full rounded-full transition-all duration-1000" style={{ width: `${progress}%`, backgroundColor: city.status === 'Completed' ? 'var(--success)' : city.status === 'Behind' ? 'var(--warning)' : 'var(--info)' }}></div>
                    </div>
                    
                    <div className="flex justify-between text-xs font-medium" style={{ color: 'var(--text-secondary)' }}>
                      <span>{city.current.toLocaleString()} / {city.target.toLocaleString()}</span>
                      <span style={{ 
                        color: city.status === 'Completed' ? 'var(--success)' : city.status === 'Behind' ? 'var(--warning)' : 'var(--info)'
                      }}>{city.status}</span>
                    </div>
                  </div>
                );
              })}
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

