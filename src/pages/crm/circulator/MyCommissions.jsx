import React from 'react';
import { DollarSign, FileText, CheckCircle, Clock, TrendingUp, AlertCircle, Download, FileSpreadsheet } from 'lucide-react';

export const MyCommissions = () => {
  const currentPeriod = {
    totalEarned: '$1,245.50',
    pending: '$420.00',
    nextPayout: 'Oct 15, 2026',
    signatures: 350,
    validRate: '88%'
  };

  const payouts = [
    {
      id: 'PAY-1049',
      date: 'Oct 01, 2026',
      project: 'Prop 12 - Clean EiCanvass',
      signatures: 245,
      valid: 220,
      invalid: 25,
      rate: '$3.50/sig',
      total: '$770.00',
      status: 'Paid',
    },
    {
      id: 'PAY-1038',
      date: 'Sep 15, 2026',
      project: 'Local Mayor Petition',
      signatures: 180,
      valid: 162,
      invalid: 18,
      rate: '$2.00/sig',
      total: '$324.00',
      status: 'Paid',
    },
    {
      id: 'PAY-1055',
      date: 'Oct 10, 2026',
      project: 'Education Bond Measure',
      signatures: 120,
      valid: 105,
      invalid: 15,
      rate: '$4.00/sig',
      total: '$420.00',
      status: 'Pending Audit',
    }
  ];

  return (
    <div className="h-full bg-surface text-primary overflow-y-auto pb-10">
      
      {/* Header */}
      <div className="border-b border-border bg-surface-secondary p-6 backdrop-blur-xl sticky top-0 z-20">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-primary flex items-center gap-3">
              <div className="p-2 bg-emerald-500/20 rounded-lg">
                <DollarSign className="w-6 h-6 text-emerald-400" />
              </div>
              My Commissions
            </h1>
            <p className="mt-1 text-sm text-secondary">
              Track your earnings, view detailed payroll statements, and monitor validation audits.
            </p>
          </div>
          
          <button className="flex items-center gap-2 px-5 py-2.5 bg-surface-secondary hover:bg-surface-secondary text-primary rounded-xl font-medium transition-colors border border-border">
            <Download className="w-4 h-4" /> Download YTD Report
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 mt-8 space-y-8">
        
        {/* Earnings Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-gradient-to-br from-emerald-900/40 to-slate-800/40 border border-emerald-500/30 rounded-3xl p-6 relative overflow-hidden">
            <div className="absolute top-0 right-0 p-6 opacity-10">
              <DollarSign className="w-24 h-24 text-emerald-400" />
            </div>
            <p className="text-emerald-400 font-semibold mb-1">Total Earned (YTD)</p>
            <h2 className="text-4xl font-extrabold text-primary mb-4">{currentPeriod.totalEarned}</h2>
            <div className="flex items-center gap-2 text-sm text-emerald-400/80">
              <TrendingUp className="w-4 h-4" /> +15% from last month
            </div>
          </div>
          
          <div className="bg-surface-secondary border border-border rounded-3xl p-6">
            <p className="text-secondary font-semibold mb-1">Pending Validation</p>
            <h2 className="text-4xl font-extrabold text-primary mb-4">{currentPeriod.pending}</h2>
            <div className="flex items-center gap-2 text-sm text-amber-400">
              <Clock className="w-4 h-4" /> Awaiting Validation Team Audit
            </div>
          </div>

          <div className="bg-surface-secondary border border-border rounded-3xl p-6">
            <p className="text-secondary font-semibold mb-1">Next Expected Payout</p>
            <h2 className="text-3xl font-extrabold text-primary mb-2">{currentPeriod.nextPayout}</h2>
            <div className="mt-4 pt-4 border-t border-border flex justify-between text-sm">
              <span className="text-secondary">Avg. Valid Rate:</span>
              <span className="text-emerald-400 font-semibold">{currentPeriod.validRate}</span>
            </div>
          </div>
        </div>

        {/* Info Alert */}
        <div className="bg-blue-900/20 border border-blue-500/30 rounded-2xl p-4 flex gap-4 items-start">
          <AlertCircle className="w-6 h-6 text-blue-400 shrink-0" />
          <div>
            <h4 className="text-primary font-medium">How are commissions calculated?</h4>
            <p className="text-sm text-secondary mt-1">
              Your gross commission is based on the total signatures collected. The Validation Team audits a sample to determine your <strong>"Valid Rate"</strong>. Invalid or fraudulent signatures are deducted via Clawbacks before final payroll processing.
            </p>
          </div>
        </div>

        {/* Detailed Statements Table */}
        <div className="bg-surface-secondary border border-border rounded-3xl overflow-hidden">
          <div className="p-6 border-b border-border flex items-center justify-between">
            <h2 className="text-lg font-bold text-primary flex items-center gap-2">
              <FileSpreadsheet className="w-5 h-5 text-indigo-400" /> Rep-Facing Statements
            </h2>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-surface-secondary text-secondary uppercase text-xs font-semibold tracking-wider">
                <tr>
                  <th className="px-6 py-4">Payout ID</th>
                  <th className="px-6 py-4">Project</th>
                  <th className="px-6 py-4">Signatures (Valid / Total)</th>
                  <th className="px-6 py-4">Tiered Rate</th>
                  <th className="px-6 py-4 text-right">Net Payout</th>
                  <th className="px-6 py-4 text-center">Status</th>
                  <th className="px-6 py-4"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-700/50">
                {payouts.map((pay) => (
                  <tr key={pay.id} className="hover:bg-surface-secondary transition-colors">
                    <td className="px-6 py-4">
                      <div className="font-semibold text-primary">{pay.id}</div>
                      <div className="text-xs text-secondary">{pay.date}</div>
                    </td>
                    <td className="px-6 py-4 text-secondary font-medium">{pay.project}</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <span className="text-emerald-400 font-bold">{pay.valid}</span>
                        <span className="text-secondary">/ {pay.signatures}</span>
                      </div>
                      <div className="text-[10px] text-rose-400 mt-0.5">-{pay.invalid} invalid</div>
                    </td>
                    <td className="px-6 py-4 text-secondary">{pay.rate}</td>
                    <td className="px-6 py-4 text-right font-extrabold text-primary">{pay.total}</td>
                    <td className="px-6 py-4 text-center">
                      <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${
                        pay.status === 'Paid' 
                          ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                          : 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                      }`}>
                        {pay.status === 'Paid' ? <CheckCircle className="w-3 h-3" /> : <Clock className="w-3 h-3" />}
                        {pay.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button className="text-blue-400 hover:text-blue-300 font-medium text-sm flex items-center gap-1">
                        <FileText className="w-4 h-4" /> View PDF
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
