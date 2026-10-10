import React from 'react';
import { LayoutDashboard, Users, MapPin, Target, TrendingUp, CheckCircle, Clock } from 'lucide-react';

export const ProDashboard = () => {
  return (
    <div className="h-full bg-surface text-primary overflow-y-auto pb-10">
      <div className="border-b border-border bg-surface-secondary p-6 backdrop-blur-xl sticky top-0 z-20">
        <h1 className="text-2xl font-bold text-primary flex items-center gap-3">
          <div className="p-2 bg-indigo-500/20 rounded-lg">
            <LayoutDashboard className="w-6 h-6 text-indigo-400" />
          </div>
          Manager Dashboard
        </h1>
        <p className="mt-1 text-sm text-secondary">
          Overview of your team's performance, total signatures, and active campaigns.
        </p>
      </div>

      <div className="max-w-7xl mx-auto px-6 mt-8 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-surface-secondary border border-border rounded-2xl p-5">
            <div className="flex items-center gap-3 mb-2">
              <Users className="w-5 h-5 text-indigo-400" />
              <h3 className="text-secondary font-medium">Active Team</h3>
            </div>
            <p className="text-3xl font-bold text-primary">42</p>
            <p className="text-xs text-emerald-400 mt-1 flex items-center gap-1"><TrendingUp className="w-3 h-3"/> +3 this week</p>
          </div>
          <div className="bg-surface-secondary border border-border rounded-2xl p-5">
            <div className="flex items-center gap-3 mb-2">
              <Target className="w-5 h-5 text-emerald-400" />
              <h3 className="text-secondary font-medium">Total Signatures</h3>
            </div>
            <p className="text-3xl font-bold text-primary">12,450</p>
            <p className="text-xs text-emerald-400 mt-1 flex items-center gap-1"><CheckCircle className="w-3 h-3"/> 98% validity</p>
          </div>
          <div className="bg-surface-secondary border border-border rounded-2xl p-5 md:col-span-2 relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/10 to-transparent pointer-events-none" />
            <div className="relative z-10">
              <h3 className="text-secondary font-medium mb-1">Today's Focus Territory</h3>
              <p className="text-2xl font-bold text-primary flex items-center gap-2 mb-2">
                <MapPin className="w-5 h-5 text-rose-400" /> Downtown District 4
              </p>
              <div className="flex gap-4 text-sm">
                <span className="text-secondary">Goal: 500</span>
                <span className="text-emerald-400 font-semibold">Current: 312</span>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-surface-secondary border border-border rounded-2xl p-6 mt-6">
          <h2 className="text-lg font-bold text-primary mb-4">Recent Team Activity</h2>
          <div className="space-y-4">
            {[1, 2, 3].map(i => (
              <div key={i} className="flex items-start gap-4 p-4 bg-surface-secondary rounded-xl border border-border">
                <div className="w-10 h-10 rounded-full bg-indigo-500/20 text-indigo-400 flex items-center justify-center font-bold">
                  {i === 1 ? 'SJ' : i === 2 ? 'MC' : 'EW'}
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-baseline mb-1">
                    <h4 className="font-bold text-primary">{i === 1 ? 'Sarah Jenkins' : i === 2 ? 'Michael Chen' : 'Emma Wilson'}</h4>
                    <span className="text-xs text-secondary flex items-center gap-1"><Clock className="w-3 h-3"/> {i * 15} mins ago</span>
                  </div>
                  <p className="text-sm text-secondary">Just checked in at {i === 1 ? 'Westside Mall' : 'City Hall'} and logged {i * 20} new signatures.</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
