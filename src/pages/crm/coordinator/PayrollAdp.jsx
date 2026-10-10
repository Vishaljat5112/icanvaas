import React from 'react';
import { CreditCard, DollarSign, Download, ExternalLink, Filter, TrendingUp, CheckCircle, Clock } from 'lucide-react';

export const PayrollAdp = () => {
  const payrollRuns = [
    { id: 'PR-2026-42', period: 'Oct 01 - Oct 15', status: 'Processing', total: '$14,520.00', employees: 42, date: 'Oct 18, 2026' },
    { id: 'PR-2026-41', period: 'Sep 16 - Sep 30', status: 'Paid', total: '$18,240.50', employees: 45, date: 'Oct 03, 2026' },
    { id: 'PR-2026-40', period: 'Sep 01 - Sep 15', status: 'Paid', total: '$16,100.00', employees: 38, date: 'Sep 18, 2026' },
  ];

  return (
    <div className="h-full flex flex-col overflow-y-auto pb-10" style={{ backgroundColor: 'var(--background)', color: 'var(--text-primary)' }}>
      {/* Header */}
      <div className="p-6 sticky top-0 z-20 flex flex-col md:flex-row md:items-center justify-between gap-4 shrink-0" style={{ backgroundColor: 'var(--surface)', borderBottom: '1px solid var(--border)' }}>
        <div>
          <h1 className="text-2xl font-bold flex items-center gap-3 m-0" style={{ color: 'var(--text-primary)' }}>
            <div className="p-2 rounded-lg" style={{ backgroundColor: 'var(--info-light)' }}>
              <CreditCard className="w-6 h-6" style={{ color: 'var(--info)' }} />
            </div>
            Payroll Processing
            <span className="px-2 py-1 text-[10px] uppercase font-black rounded-md ml-2 border" style={{ backgroundColor: 'var(--info-light)', color: 'var(--info)', borderColor: 'var(--info-border)' }}>
              ADP Integration
            </span>
          </h1>
          <p className="mt-1 text-sm m-0" style={{ color: 'var(--text-secondary)' }}>
            Manage team compensation, review commission payouts, and sync directly with ADP Payroll.
          </p>
        </div>
        
        <button className="flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-bold transition-all shadow-lg cursor-pointer" style={{ backgroundColor: 'var(--info)', color: 'var(--text-on-primary)' }}>
          <ExternalLink className="w-5 h-5" />
          Open ADP Portal
        </button>
      </div>

      <div className="max-w-7xl mx-auto px-6 mt-8 space-y-6 w-full">
        
        {/* Top Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="rounded-2xl p-5" style={{ backgroundColor: 'var(--surface)', border: '1px solid var(--border)' }}>
            <div className="flex items-center gap-3 mb-2">
              <DollarSign className="w-5 h-5" style={{ color: 'var(--success)' }} />
              <h3 className="font-medium text-sm m-0" style={{ color: 'var(--text-secondary)' }}>Next Payout Estimate</h3>
            </div>
            <p className="text-3xl font-bold m-0" style={{ color: 'var(--text-primary)' }}>$14,520<span className="text-lg" style={{ color: 'var(--text-tertiary)' }}>.00</span></p>
          </div>
          <div className="rounded-2xl p-5" style={{ backgroundColor: 'var(--surface)', border: '1px solid var(--border)' }}>
            <div className="flex items-center gap-3 mb-2">
              <TrendingUp className="w-5 h-5" style={{ color: 'var(--info)' }} />
              <h3 className="font-medium text-sm m-0" style={{ color: 'var(--text-secondary)' }}>YTD Payroll</h3>
            </div>
            <p className="text-3xl font-bold m-0" style={{ color: 'var(--text-primary)' }}>$412,850<span className="text-lg" style={{ color: 'var(--text-tertiary)' }}>.00</span></p>
          </div>
          <div className="rounded-2xl p-5 md:col-span-2 flex items-center justify-between" style={{ backgroundColor: 'var(--surface)', border: '1px solid var(--border)' }}>
            <div>
              <h3 className="font-medium text-sm mb-1 m-0" style={{ color: 'var(--text-secondary)' }}>ADP Sync Status</h3>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5" style={{ color: 'var(--success)' }} />
                <span className="text-lg font-bold" style={{ color: 'var(--text-primary)' }}>Connected & Active</span>
              </div>
              <p className="text-xs mt-1 m-0" style={{ color: 'var(--text-tertiary)' }}>Last synced: Today, 08:30 AM</p>
            </div>
            <button className="px-4 py-2 rounded-lg text-sm font-medium transition-colors cursor-pointer" style={{ backgroundColor: 'var(--surface-secondary)', border: '1px solid var(--border)', color: 'var(--text-primary)' }}>
              Sync Now
            </button>
          </div>
        </div>

        {/* Payroll Runs Table */}
        <div className="rounded-2xl overflow-hidden mt-6" style={{ backgroundColor: 'var(--surface)', border: '1px solid var(--border)' }}>
          <div className="p-5 flex items-center justify-between" style={{ backgroundColor: 'var(--surface-secondary)', borderBottom: '1px solid var(--border)' }}>
            <h2 className="text-lg font-bold flex items-center gap-2 m-0" style={{ color: 'var(--text-primary)' }}>
              <Clock className="w-5 h-5" style={{ color: 'var(--info)' }} /> Recent Payroll Runs
            </h2>
            <button className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors cursor-pointer" style={{ backgroundColor: 'var(--surface)', border: '1px solid var(--border)', color: 'var(--text-primary)' }}>
              <Filter className="w-3 h-3" /> Filter
            </button>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full text-left" style={{ borderCollapse: 'collapse' }}>
              <thead style={{ backgroundColor: 'var(--surface)', borderBottom: '1px solid var(--border)' }}>
                <tr>
                  <th className="p-4 text-xs font-semibold uppercase tracking-wider" style={{ color: 'var(--text-secondary)' }}>Run ID</th>
                  <th className="p-4 text-xs font-semibold uppercase tracking-wider" style={{ color: 'var(--text-secondary)' }}>Pay Period</th>
                  <th className="p-4 text-xs font-semibold uppercase tracking-wider" style={{ color: 'var(--text-secondary)' }}>Employees</th>
                  <th className="p-4 text-xs font-semibold uppercase tracking-wider" style={{ color: 'var(--text-secondary)' }}>Total Amount</th>
                  <th className="p-4 text-xs font-semibold uppercase tracking-wider" style={{ color: 'var(--text-secondary)' }}>Status</th>
                  <th className="p-4 text-xs font-semibold uppercase tracking-wider" style={{ color: 'var(--text-secondary)' }}>Pay Date</th>
                  <th className="p-4 text-xs font-semibold uppercase tracking-wider text-right" style={{ color: 'var(--text-secondary)' }}>Actions</th>
                </tr>
              </thead>
              <tbody style={{ divideY: '1px solid var(--border)' }}>
                {payrollRuns.map((run) => (
                  <tr key={run.id} className="transition-colors hover-bg-surface-secondary" style={{ borderBottom: '1px solid var(--border)' }}>
                    <td className="p-4 font-mono text-sm font-semibold" style={{ color: 'var(--info)' }}>{run.id}</td>
                    <td className="p-4" style={{ color: 'var(--text-primary)' }}>{run.period}</td>
                    <td className="p-4" style={{ color: 'var(--text-secondary)' }}>{run.employees}</td>
                    <td className="p-4 font-bold" style={{ color: 'var(--text-primary)' }}>{run.total}</td>
                    <td className="p-4">
                      <span className="px-2 py-1 text-xs font-semibold rounded-md border" style={{
                        backgroundColor: run.status === 'Paid' ? 'var(--success-light)' : 'var(--warning-light)',
                        color: run.status === 'Paid' ? 'var(--success)' : 'var(--warning)',
                        borderColor: run.status === 'Paid' ? 'var(--success-border)' : 'var(--warning-border)'
                      }}>
                        {run.status}
                      </span>
                    </td>
                    <td className="p-4 text-sm" style={{ color: 'var(--text-secondary)' }}>{run.date}</td>
                    <td className="p-4 text-right">
                      <button className="p-2 transition-colors cursor-pointer" style={{ background: 'none', border: 'none', color: 'var(--text-tertiary)' }} title="Download Report">
                        <Download className="w-5 h-5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  );
};
