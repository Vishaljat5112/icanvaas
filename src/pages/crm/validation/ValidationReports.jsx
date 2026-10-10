import React, { useState } from 'react';
import {
  FileText,
  Send,
  AlertCircle,
  FileCheck2,
  Database,
  Printer,
  Share2,
  Search,
  Filter,
  CheckCircle,
  Clock,
  Eye,
  Download,
  X
} from 'lucide-react';
import { useToast } from '../../../context/ToastContext';

export const ValidationReports = () => {
  const { addToast } = useToast();

  const [search, setSearch] = useState('');
  const [projectFilter, setProjectFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedReport, setSelectedReport] = useState(null);

  // Form input state
  const [formData, setFormData] = useState({
    campaign: 'Prop 12 - Clean Energy Ballot',
    batchId: '',
    circulator: 'Tanya Sterling',
    goodSignatures: '',
    badSignatures: '',
    auditorNotes: ''
  });

  const [reports, setReports] = useState([
    {
      id: 'REP-2026-101',
      project: 'Prop 12 - Clean Energy Ballot',
      batchId: 'BATCH-8092',
      circulator: 'Samantha Ray',
      goodSigs: 132,
      badSigs: 13,
      total: 145,
      accuracy: '91.0%',
      auditorNotes: 'High quality batch. 13 addresses matched out-of-district voters.',
      submissionDate: 'Oct 05, 2026',
      status: 'Certified'
    },
    {
      id: 'REP-2026-100',
      project: 'Local Mayor Petition',
      batchId: 'BATCH-8091',
      circulator: 'Marcus Sterling',
      goodSigs: 78,
      badSigs: 4,
      total: 82,
      accuracy: '95.1%',
      auditorNotes: 'Signatures clean and legible. Notary seal intact.',
      submissionDate: 'Oct 04, 2026',
      status: 'Certified'
    },
    {
      id: 'REP-2026-099',
      project: 'Education Bond Measure',
      batchId: 'BATCH-8088',
      circulator: 'Eleanor Vance',
      goodSigs: 175,
      badSigs: 35,
      total: 210,
      accuracy: '83.3%',
      auditorNotes: 'Duplicate handwriting detected on sheet 4. Held for secondary review.',
      submissionDate: 'Oct 04, 2026',
      status: 'Under Review'
    }
  ]);

  const handleSubmitReport = (e) => {
    e.preventDefault();
    if (!formData.batchId.trim() || !formData.goodSignatures) {
      addToast({ title: 'Validation Error', message: 'Batch ID and Good Signatures count are required.', type: 'error' });
      return;
    }

    const good = parseInt(formData.goodSignatures) || 0;
    const bad = parseInt(formData.badSignatures) || 0;
    const total = good + bad;
    const accuracy = total > 0 ? `${Math.round((good / total) * 100)}%` : '0%';

    const newRep = {
      id: `REP-2026-${reports.length + 102}`,
      project: formData.campaign,
      batchId: formData.batchId.trim(),
      circulator: formData.circulator,
      goodSigs: good,
      badSigs: bad,
      total: total,
      accuracy: accuracy,
      auditorNotes: formData.auditorNotes || 'Standard audit completed.',
      submissionDate: 'Today',
      status: 'Certified'
    };

    setReports([newRep, ...reports]);
    setFormData({
      campaign: 'Prop 12 - Clean Energy Ballot',
      batchId: '',
      circulator: 'Tanya Sterling',
      goodSignatures: '',
      badSignatures: '',
      auditorNotes: ''
    });

    addToast({
      title: 'Report Logged',
      message: `Validation report ${newRep.id} has been recorded in the compliance database.`,
      type: 'success'
    });
  };

  const handlePrint = () => {
    window.print();
  };

  const handleExportCSV = () => {
    const headers = ['Report ID', 'Project', 'Batch ID', 'Circulator', 'Good Sigs', 'Bad Sigs', 'Total', 'Accuracy', 'Status', 'Date'];
    const rows = reports.map((r) => [
      r.id,
      `"${r.project}"`,
      r.batchId,
      `"${r.circulator}"`,
      r.goodSigs,
      r.badSigs,
      r.total,
      r.accuracy,
      r.status,
      r.submissionDate
    ]);
    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `validation_reports_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    addToast({
      title: 'Export Generated',
      message: `${reports.length} validation reports downloaded as CSV.`,
      type: 'success'
    });
  };

  const handleShare = (rep) => {
    const text = `Validation Report ${rep.id} | Batch ${rep.batchId} | Valid: ${rep.goodSigs}/${rep.total} (${rep.accuracy}) | Status: ${rep.status}`;
    if (navigator.clipboard) {
      navigator.clipboard.writeText(text);
    }
    addToast({
      title: 'Report Copied',
      message: `Summary for report ${rep.id} copied to clipboard.`,
      type: 'info'
    });
  };

  return (
    <div className="h-full flex flex-col overflow-y-auto pb-10" style={{ backgroundColor: 'var(--background)', color: 'var(--text-primary)' }}>
      {/* Header */}
      <div className="p-4 sm:p-6 sticky top-0 z-20 shrink-0 print:hidden" style={{ backgroundColor: 'var(--surface)', borderBottom: '1px solid var(--border)' }}>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-xl sm:text-2xl font-bold flex items-center gap-3 m-0" style={{ color: 'var(--text-primary)' }}>
              <div className="p-2 rounded-lg" style={{ backgroundColor: 'var(--info-light)', color: 'var(--info)' }}>
                <FileText className="w-6 h-6" />
              </div>
              Validation & Compliance Reports
            </h1>
            <p className="mt-1 text-xs sm:text-sm m-0" style={{ color: 'var(--text-secondary)' }}>
              Input verified signature audit results, generate official reports, and print certifications for coordinators.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleExportCSV}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold border cursor-pointer"
              style={{ backgroundColor: 'var(--surface-secondary)', borderColor: 'var(--border)', color: 'var(--text-primary)' }}
            >
              <Download className="w-4 h-4 text-info" /> Export CSV
            </button>
            <button
              onClick={handlePrint}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold border cursor-pointer"
              style={{ backgroundColor: 'var(--surface-secondary)', borderColor: 'var(--border)', color: 'var(--text-secondary)' }}
            >
              <Printer className="w-4 h-4" /> Print Reports
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 mt-6 space-y-6 w-full">
        {/* Reports Archive Table */}
        <div className="rounded-2xl border overflow-hidden shadow-sm" style={{ backgroundColor: 'var(--surface)', borderColor: 'var(--border)' }}>
          <div className="p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b print:hidden" style={{ borderColor: 'var(--border)', backgroundColor: 'var(--surface-secondary)' }}>
            <div>
              <h2 className="text-sm font-bold m-0" style={{ color: 'var(--text-primary)' }}>Audited Reports Archive</h2>
              <p className="text-xs text-secondary mt-0.5 m-0">Certified reports available for printing or team dispatch.</p>
            </div>

            <div className="flex items-center gap-3">
              <div className="relative">
                <Search className="w-4 h-4 absolute text-tertiary" style={{ left: 12, top: '50%', transform: 'translateY(-50%)' }} />
                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Filter reports..."
                  className="text-xs rounded-xl py-2 pl-9 pr-3 focus:outline-none"
                  style={{ backgroundColor: 'var(--surface)', color: 'var(--text-primary)', border: '1px solid var(--border)' }}
                />
              </div>

              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="text-xs rounded-xl px-3 py-2 focus:outline-none"
                style={{ backgroundColor: 'var(--surface)', color: 'var(--text-primary)', border: '1px solid var(--border)' }}
              >
                <option value="all">All Statuses</option>
                <option value="Certified">Certified</option>
                <option value="Under Review">Under Review</option>
              </select>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs" style={{ borderCollapse: 'collapse' }}>
              <thead style={{ backgroundColor: 'var(--surface-secondary)', borderBottom: '1px solid var(--border)' }}>
                <tr>
                  <th className="p-3.5 font-semibold text-secondary uppercase">Report ID</th>
                  <th className="p-3.5 font-semibold text-secondary uppercase">Project / Batch</th>
                  <th className="p-3.5 font-semibold text-secondary uppercase">Circulator</th>
                  <th className="p-3.5 font-semibold text-secondary uppercase">Valid / Total</th>
                  <th className="p-3.5 font-semibold text-secondary uppercase">Accuracy</th>
                  <th className="p-3.5 font-semibold text-secondary uppercase">Status</th>
                  <th className="p-3.5 font-semibold text-secondary uppercase text-right print:hidden">Actions</th>
                </tr>
              </thead>
              <tbody>
                {reports
                  .filter((r) => {
                    if (statusFilter !== 'all' && r.status !== statusFilter) return false;
                    if (search.trim()) {
                      const q = search.toLowerCase();
                      return r.id.toLowerCase().includes(q) || r.project.toLowerCase().includes(q) || r.circulator.toLowerCase().includes(q) || r.batchId.toLowerCase().includes(q);
                    }
                    return true;
                  })
                  .map((rep) => (
                    <tr key={rep.id} style={{ borderBottom: '1px solid var(--border)' }}>
                      <td className="p-3.5 font-mono font-bold" style={{ color: 'var(--info)' }}>{rep.id}</td>
                      <td className="p-3.5">
                        <div className="font-bold" style={{ color: 'var(--text-primary)' }}>{rep.project}</div>
                        <span className="text-[10px] text-tertiary">Ref: {rep.batchId} • {rep.submissionDate}</span>
                      </td>
                      <td className="p-3.5 font-semibold">{rep.circulator}</td>
                      <td className="p-3.5">
                        <span className="font-bold text-success">{rep.goodSigs}</span> / {rep.total}
                        <span className="text-[10px] text-error block">-{rep.badSigs} invalid</span>
                      </td>
                      <td className="p-3.5 font-bold text-info">{rep.accuracy}</td>
                      <td className="p-3.5">
                        <span
                          className="px-2.5 py-0.5 rounded-full text-[10px] font-bold border"
                          style={{
                            backgroundColor: rep.status === 'Certified' ? 'var(--success-light)' : 'var(--warning-light)',
                            borderColor: rep.status === 'Certified' ? 'var(--success-border)' : 'var(--warning-border)',
                            color: rep.status === 'Certified' ? 'var(--success)' : 'var(--warning)'
                          }}
                        >
                          {rep.status}
                        </span>
                      </td>
                      <td className="p-3.5 text-right print:hidden">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => setSelectedReport(rep)}
                            className="p-1.5 rounded-lg border text-secondary hover:text-primary cursor-pointer"
                            title="Inspect Details"
                          >
                            <Eye className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => handleShare(rep)}
                            className="p-1.5 rounded-lg border text-secondary hover:text-primary cursor-pointer"
                            title="Share Summary"
                          >
                            <Share2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Data Entry Form for Validation Desk */}
        <div className="rounded-2xl overflow-hidden border shadow-sm print:hidden" style={{ backgroundColor: 'var(--surface)', borderColor: 'var(--border)' }}>
          <div className="p-4 sm:p-5 flex items-center gap-3 border-b" style={{ borderColor: 'var(--border)', backgroundColor: 'var(--surface-secondary)' }}>
            <Database className="w-5 h-5" style={{ color: 'var(--info)' }} />
            <div>
              <h2 className="font-bold text-sm m-0" style={{ color: 'var(--text-primary)' }}>Batch Result Data Entry</h2>
              <p className="text-xs text-secondary mt-0.5 m-0">Input physical audit counts to commit official compliance record.</p>
            </div>
          </div>

          <form onSubmit={handleSubmitReport} className="p-4 sm:p-6 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-semibold mb-1" style={{ color: 'var(--text-secondary)' }}>Campaign / Project</label>
                <select
                  value={formData.campaign}
                  onChange={(e) => setFormData({ ...formData, campaign: e.target.value })}
                  className="w-full text-xs rounded-xl px-3 py-2.5 focus:outline-none"
                  style={{ backgroundColor: 'var(--surface-secondary)', color: 'var(--text-primary)', border: '1px solid var(--border)' }}
                >
                  <option value="Prop 12 - Clean Energy Ballot">Prop 12 - Clean Energy Ballot</option>
                  <option value="Local Mayor Petition (District 4)">Local Mayor Petition (District 4)</option>
                  <option value="Education Bond Measure">Education Bond Measure</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold mb-1" style={{ color: 'var(--text-secondary)' }}>Batch ID Reference *</label>
                <input
                  type="text"
                  required
                  value={formData.batchId}
                  onChange={(e) => setFormData({ ...formData, batchId: e.target.value })}
                  placeholder="e.g. BATCH-8912"
                  className="w-full text-xs rounded-xl px-3 py-2.5 focus:outline-none"
                  style={{ backgroundColor: 'var(--surface-secondary)', color: 'var(--text-primary)', border: '1px solid var(--border)' }}
                />
              </div>

              <div>
                <label className="block text-xs font-semibold mb-1" style={{ color: 'var(--text-secondary)' }}>Circulator (Gatherer)</label>
                <select
                  value={formData.circulator}
                  onChange={(e) => setFormData({ ...formData, circulator: e.target.value })}
                  className="w-full text-xs rounded-xl px-3 py-2.5 focus:outline-none"
                  style={{ backgroundColor: 'var(--surface-secondary)', color: 'var(--text-primary)', border: '1px solid var(--border)' }}
                >
                  <option value="Samantha Ray">Samantha Ray</option>
                  <option value="Marcus Sterling">Marcus Sterling</option>
                  <option value="Eleanor Vance">Eleanor Vance</option>
                  <option value="David Ross">David Ross</option>
                  <option value="Tanya Sterling">Tanya Sterling</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
              <div className="p-4 rounded-xl border space-y-2" style={{ backgroundColor: 'var(--success-light)', borderColor: 'var(--success-border)' }}>
                <span className="text-xs font-bold flex items-center gap-1.5" style={{ color: 'var(--success)' }}>
                  <FileCheck2 className="w-4 h-4" /> Good (Valid) Signatures *
                </span>
                <input
                  type="number"
                  required
                  min="0"
                  value={formData.goodSignatures}
                  onChange={(e) => setFormData({ ...formData, goodSignatures: e.target.value })}
                  placeholder="0"
                  className="w-full text-xl font-bold rounded-xl px-3 py-2 focus:outline-none"
                  style={{ backgroundColor: 'var(--surface)', border: '1px solid var(--border)', color: 'var(--success)' }}
                />
              </div>

              <div className="p-4 rounded-xl border space-y-2" style={{ backgroundColor: 'var(--error-light)', borderColor: 'var(--error-border)' }}>
                <span className="text-xs font-bold flex items-center gap-1.5" style={{ color: 'var(--error)' }}>
                  <AlertCircle className="w-4 h-4" /> Bad / Rejected Signatures
                </span>
                <input
                  type="number"
                  min="0"
                  value={formData.badSignatures}
                  onChange={(e) => setFormData({ ...formData, badSignatures: e.target.value })}
                  placeholder="0"
                  className="w-full text-xl font-bold rounded-xl px-3 py-2 focus:outline-none"
                  style={{ backgroundColor: 'var(--surface)', border: '1px solid var(--border)', color: 'var(--error)' }}
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold mb-1" style={{ color: 'var(--text-secondary)' }}>Auditor Notes & Finding Reasons</label>
              <textarea
                rows={3}
                value={formData.auditorNotes}
                onChange={(e) => setFormData({ ...formData, auditorNotes: e.target.value })}
                placeholder="State reasons for invalid signatures (e.g. out of district, duplicate, illegible)..."
                className="w-full text-xs rounded-xl p-3 focus:outline-none"
                style={{ backgroundColor: 'var(--surface-secondary)', color: 'var(--text-primary)', border: '1px solid var(--border)' }}
              />
            </div>

            <div className="flex justify-end pt-2">
              <button
                type="submit"
                className="flex items-center gap-2 px-6 py-2.5 rounded-xl font-bold text-xs shadow-md transition-all cursor-pointer border-none"
                style={{ backgroundColor: 'var(--info)', color: 'var(--text-on-primary)' }}
              >
                <Send className="w-4 h-4" /> Finalize & Submit Report
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Modal: Report Details */}
      {selectedReport && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
          onClick={() => setSelectedReport(null)}
        >
          <div
            className="w-full max-w-lg rounded-2xl p-6 border shadow-2xl space-y-4"
            style={{ backgroundColor: 'var(--surface)', borderColor: 'var(--border)', color: 'var(--text-primary)' }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-3 border-b" style={{ borderColor: 'var(--border)' }}>
              <div>
                <h3 className="text-base font-bold m-0">{selectedReport.id} Details</h3>
                <span className="text-xs text-secondary">{selectedReport.project}</span>
              </div>
              <button
                onClick={() => setSelectedReport(null)}
                className="p-1 rounded-lg text-secondary border-none bg-transparent cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-2 text-xs">
              <div className="flex justify-between py-1 border-b" style={{ borderColor: 'var(--border)' }}>
                <span className="text-secondary">Batch Reference:</span>
                <span className="font-mono font-bold">{selectedReport.batchId}</span>
              </div>
              <div className="flex justify-between py-1 border-b" style={{ borderColor: 'var(--border)' }}>
                <span className="text-secondary">Circulator:</span>
                <span className="font-semibold">{selectedReport.circulator}</span>
              </div>
              <div className="flex justify-between py-1 border-b" style={{ borderColor: 'var(--border)' }}>
                <span className="text-secondary">Verified Signatures:</span>
                <span className="font-bold text-success">{selectedReport.goodSigs} ({selectedReport.accuracy})</span>
              </div>
              <div className="flex justify-between py-1 border-b" style={{ borderColor: 'var(--border)' }}>
                <span className="text-secondary">Rejected / Invalid:</span>
                <span className="font-bold text-error">{selectedReport.badSigs}</span>
              </div>
              <div className="py-2">
                <span className="text-secondary font-bold block mb-1">Auditor Remarks:</span>
                <p className="p-2.5 rounded-lg border text-xs m-0" style={{ backgroundColor: 'var(--surface-secondary)', borderColor: 'var(--border)' }}>
                  {selectedReport.auditorNotes}
                </p>
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-3 border-t" style={{ borderColor: 'var(--border)' }}>
              <button
                onClick={() => {
                  handleShare(selectedReport);
                  setSelectedReport(null);
                }}
                className="px-4 py-2 rounded-xl text-xs font-semibold border flex items-center gap-1.5 cursor-pointer"
                style={{ backgroundColor: 'var(--surface-secondary)', color: 'var(--text-primary)', borderColor: 'var(--border)' }}
              >
                <Share2 className="w-3.5 h-3.5" /> Share Summary
              </button>
              <button
                onClick={() => setSelectedReport(null)}
                className="px-5 py-2 rounded-xl text-xs font-bold border-none cursor-pointer"
                style={{ backgroundColor: 'var(--info)', color: 'var(--text-on-primary)' }}
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
