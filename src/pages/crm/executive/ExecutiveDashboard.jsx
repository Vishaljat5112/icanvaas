import React from 'react';
import { LayoutDashboard, DollarSign, Users, Briefcase, TrendingUp, BarChart2 } from 'lucide-react';

export const ExecutiveDashboard = () => {
  return (
    <div className="h-full bg-surface text-primary overflow-y-auto pb-10">
      <div className="border-b border-border bg-surface-secondary p-6 backdrop-blur-xl sticky top-0 z-20">
        <h1 className="text-2xl font-bold text-primary flex items-center gap-3">
          <div className="p-2 bg-indigo-500/20 rounded-lg">
            <LayoutDashboard className="w-6 h-6 text-indigo-400" />
          </div>
          Executive Dashboard
        </h1>
        <p className="mt-1 text-sm text-secondary">
          High-level overview of revenue, payroll, and company-wide operations.
        </p>
      </div>

      <div className="max-w-7xl mx-auto px-6 mt-8 space-y-6">
        
        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-surface-secondary border border-border rounded-2xl p-5">
             <div className="flex items-center gap-3 mb-2"><DollarSign className="w-5 h-5 text-emerald-400" /><h3 className="text-secondary font-medium">Gross Revenue</h3></div>
             <p className="text-3xl font-bold text-primary">$1.2M</p>
             <p className="text-xs text-emerald-400 mt-1 flex items-center gap-1"><TrendingUp className="w-3 h-3"/> +15% this month</p>
          </div>
          <div className="bg-surface-secondary border border-border rounded-2xl p-5">
             <div className="flex items-center gap-3 mb-2"><Briefcase className="w-5 h-5 text-rose-400" /><h3 className="text-secondary font-medium">Payroll Liability</h3></div>
             <p className="text-3xl font-bold text-primary">$450K</p>
             <p className="text-xs text-secondary mt-1">Pending payout this cycle</p>
          </div>
          <div className="bg-surface-secondary border border-border rounded-2xl p-5">
             <div className="flex items-center gap-3 mb-2"><Users className="w-5 h-5 text-indigo-400" /><h3 className="text-secondary font-medium">Total Field Agents</h3></div>
             <p className="text-3xl font-bold text-primary">342</p>
             <p className="text-xs text-indigo-400 mt-1">Across 12 campaigns</p>
          </div>
          <div className="bg-surface-secondary border border-border rounded-2xl p-5">
             <div className="flex items-center gap-3 mb-2"><BarChart2 className="w-5 h-5 text-blue-400" /><h3 className="text-secondary font-medium">Active Campaigns</h3></div>
             <p className="text-3xl font-bold text-primary">4</p>
             <p className="text-xs text-secondary mt-1">2 closing soon</p>
          </div>
        </div>

        {/* Financial Overview */}
        <div className="bg-surface-secondary border border-border rounded-2xl p-6">
          <h2 className="text-lg font-bold text-primary mb-6">Financial & Operations Snapshot</h2>
          <div className="h-64 flex items-center justify-center border border-border rounded-xl bg-surface-secondary">
             <p className="text-secondary font-medium flex items-center gap-2">
               <BarChart2 className="w-5 h-5" /> Executive Graph Rendering Engine Initializing...
             </p>
          </div>
        </div>

      </div>
    </div>
  );
};
