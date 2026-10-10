import React from 'react';
import { ShieldAlert, Activity, Server, Database, CheckCircle2, AlertTriangle } from 'lucide-react';

export const SystemAudit = () => {
  return (
    <div className="h-full bg-surface text-primary overflow-y-auto pb-10">
      <div className="border-b border-border bg-surface-secondary p-6 backdrop-blur-xl sticky top-0 z-20">
        <h1 className="text-2xl font-bold text-primary flex items-center gap-3">
          <div className="p-2 bg-indigo-500/20 rounded-lg">
            <ShieldAlert className="w-6 h-6 text-indigo-400" />
          </div>
          System Audit & Health
        </h1>
        <p className="mt-1 text-sm text-secondary">
          Master logs, platform health monitoring, and system-wide security auditing.
        </p>
      </div>

      <div className="max-w-7xl mx-auto px-6 mt-8 space-y-6">
        
        {/* System Health */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-surface-secondary border border-border rounded-2xl p-6 relative overflow-hidden">
            <Server className="w-16 h-16 text-emerald-500/10 absolute -bottom-4 -right-4" />
            <h3 className="text-secondary font-medium mb-4 flex items-center gap-2">
              <Activity className="w-4 h-4 text-emerald-400" /> API Gateway Status
            </h3>
            <p className="text-2xl font-bold text-emerald-400 flex items-center gap-2">
              <CheckCircle2 className="w-6 h-6" /> 100% Operational
            </p>
            <p className="text-xs text-secondary mt-2">Latency: 42ms | Uptime: 99.99%</p>
          </div>

          <div className="bg-surface-secondary border border-border rounded-2xl p-6 relative overflow-hidden">
            <Database className="w-16 h-16 text-indigo-500/10 absolute -bottom-4 -right-4" />
            <h3 className="text-secondary font-medium mb-4 flex items-center gap-2">
              <Database className="w-4 h-4 text-indigo-400" /> Database Clusters
            </h3>
            <p className="text-2xl font-bold text-indigo-400 flex items-center gap-2">
              <CheckCircle2 className="w-6 h-6" /> Synced & Healthy
            </p>
            <p className="text-xs text-secondary mt-2">Load: 34% | Storage: 2.1 TB / 10 TB</p>
          </div>

          <div className="bg-surface-secondary border border-border rounded-2xl p-6 relative overflow-hidden border-rose-500/30 bg-rose-500/5">
            <AlertTriangle className="w-16 h-16 text-rose-500/10 absolute -bottom-4 -right-4" />
            <h3 className="text-rose-400 font-medium mb-4 flex items-center gap-2">
              <AlertTriangle className="w-4 h-4" /> Security Anomalies
            </h3>
            <p className="text-2xl font-bold text-primary">2 Flags</p>
            <p className="text-xs text-rose-400 mt-2">Multiple failed logins detected on Tenant T-1043</p>
          </div>
        </div>

        {/* Master Logs */}
        <div className="bg-surface-secondary border border-border rounded-2xl overflow-hidden mt-8">
          <div className="p-5 border-b border-border bg-surface-secondary">
            <h2 className="font-bold text-primary text-lg">Real-time Master Event Log</h2>
          </div>
          <div className="p-4 bg-black/50 font-mono text-xs h-96 overflow-y-auto space-y-2">
            <div className="text-emerald-400">[2026-10-05 13:21:44] INFO: API Request successful - GET /api/v1/tenants</div>
            <div className="text-secondary">[2026-10-05 13:21:50] DEBUG: Running garbage collection on Cluster A...</div>
            <div className="text-emerald-400">[2026-10-05 13:22:01] INFO: User authenticated - ID: 4992 (Role: Coordinator)</div>
            <div className="text-rose-400">[2026-10-05 13:22:15] WARN: Rate limit approaching for IP 192.168.1.14</div>
            <div className="text-secondary">[2026-10-05 13:22:20] DEBUG: Syncing ADP Payroll module webhook...</div>
            <div className="text-emerald-400">[2026-10-05 13:22:31] INFO: Webhook delivered successfully.</div>
            {/* Blinking cursor */}
            <div className="w-2 h-4 bg-secondary animate-pulse mt-4"></div>
          </div>
        </div>

      </div>
    </div>
  );
};
