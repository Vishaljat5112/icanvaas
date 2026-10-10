import React, { useState } from 'react';
import {
  ShieldCheck,
  ShieldAlert,
  FileCheck,
  Search,
  Filter,
  CheckCircle,
  XCircle,
  AlertTriangle,
  FileText,
  Printer,
  Share2,
  TrendingUp,
  Award,
  Users,
  ChevronRight,
  Download,
  Calendar,
  Lock,
  Unlock,
  Eye,
  CheckSquare,
  DollarSign,
  AlertCircle,
  ExternalLink,
  Info,
  Clock,
  X
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '../../../context/ToastContext';
import { useAuth } from '../../../context/AuthContext';

export const ComplianceMonitor = () => {
  const navigate = useNavigate();
  const { addToast } = useToast();
  const { crmUser } = useAuth();

  // Active Main Tab
  const [activeTab, setActiveTab] = useState('overview'); // 'overview' | 'verification' | 'legal' | 'commissions' | 'reports' | 'rankings' | 'turnin'

  // Restricted Access simulation for Turn In Results (Requirement 4.9)
  const [isTurnInAuthorized, setIsTurnInAuthorized] = useState(true);

  // ----------------------------------------------------
  // 4.1 OVERVIEW DASHBOARD DATA & STATE
  // ----------------------------------------------------
  const overviewStats = {
    totalSignatures: '34,820',
    pendingVerification: '3,410',
    verifiedSignatures: '29,840',
    rejectedSignatures: '1,570',
    overallValidRate: '95.0%',
    recentActivityCount: 18
  };

  // ----------------------------------------------------
  // 4.2 SIGNATURE VERIFICATION QUEUE STATE
  // ----------------------------------------------------
  const [verificationSearch, setVerificationSearch] = useState('');
  const [verificationStatusFilter, setVerificationStatusFilter] = useState('all');
  const [selectedRecordForReview, setSelectedRecordForReview] = useState(null);
  const [reviewNote, setReviewNote] = useState('');

  const [signatureBatches, setSignatureBatches] = useState([
    {
      id: 'SIG-901',
      batchNumber: 'BATCH-8092',
      circulator: 'Samantha Ray',
      circulatorId: 'CIR-441',
      project: 'Prop 12 - Clean Energy',
      submissionDate: 'Oct 05, 2026 - 10:30 AM',
      territory: 'Downtown Metro (District 4)',
      claimedSigs: 145,
      verifiedSigs: 132,
      rejectedSigs: 13,
      status: 'Pending Review',
      authenticityStatus: 'Authentic',
      affidavitValid: true,
      eligibility: 'Eligible (Full Pay)',
      priority: 'High'
    },
    {
      id: 'SIG-902',
      batchNumber: 'BATCH-8091',
      circulator: 'Marcus Sterling',
      circulatorId: 'CIR-108',
      project: 'Local Mayor Petition',
      submissionDate: 'Oct 04, 2026 - 04:15 PM',
      territory: 'City Park Plaza',
      claimedSigs: 82,
      verifiedSigs: 78,
      rejectedSigs: 4,
      status: 'Verified',
      authenticityStatus: 'Authentic',
      affidavitValid: true,
      eligibility: 'Eligible (Full Pay)',
      priority: 'Normal'
    },
    {
      id: 'SIG-903',
      batchNumber: 'BATCH-8088',
      circulator: 'Eleanor Vance',
      circulatorId: 'CIR-219',
      project: 'Education Bond Measure',
      submissionDate: 'Oct 04, 2026 - 11:00 AM',
      territory: 'Westside Mall North Plaza',
      claimedSigs: 210,
      verifiedSigs: 175,
      rejectedSigs: 35,
      status: 'Pending Review',
      authenticityStatus: 'Suspected Duplicate',
      affidavitValid: true,
      eligibility: 'Conditional Hold',
      priority: 'High'
    },
    {
      id: 'SIG-904',
      batchNumber: 'BATCH-8084',
      circulator: 'David Ross',
      circulatorId: 'CIR-312',
      project: 'Prop 12 - Clean Energy',
      submissionDate: 'Oct 03, 2026 - 02:20 PM',
      territory: 'Transit Center Terminal',
      claimedSigs: 95,
      verifiedSigs: 90,
      rejectedSigs: 5,
      status: 'Verified',
      authenticityStatus: 'Authentic',
      affidavitValid: true,
      eligibility: 'Eligible (Full Pay)',
      priority: 'Normal'
    },
    {
      id: 'SIG-905',
      batchNumber: 'BATCH-8079',
      circulator: 'Tanya Sterling',
      circulatorId: 'CIR-550',
      project: 'Housing Initiative Measure',
      submissionDate: 'Oct 02, 2026 - 09:45 AM',
      territory: 'Southside Campus',
      claimedSigs: 160,
      verifiedSigs: 110,
      rejectedSigs: 50,
      status: 'Rejected',
      authenticityStatus: 'Non-Resident Signers',
      affidavitValid: false,
      eligibility: 'Disqualified (Clawback)',
      priority: 'High'
    }
  ]);

  // ----------------------------------------------------
  // 4.3 LEGAL COMPLIANCE & 4.4 AUTHENTICITY STATE
  // ----------------------------------------------------
  const legalChecklist = [
    {
      id: 'chk-1',
      title: 'Circulator State Residency & Affidavit Sign-off',
      description: 'Circulator must be a registered state voter and notarize affidavit page upon sheet completion.',
      status: 'Compliant',
      lawCode: 'Elections Code § 102 / 9022'
    },
    {
      id: 'chk-2',
      title: 'Voter Registration Cross-Check & County Verification',
      description: 'Signers must reside within petition jurisdictional boundary at the time of signing.',
      status: 'Compliant',
      lawCode: 'State Sec. of State Guidelines'
    },
    {
      id: 'chk-3',
      title: 'Valid Date Range & No Future/Back-dated Entries',
      description: 'Signatures collected outside official campaign circulation window are invalidated.',
      status: 'Compliant',
      lawCode: 'Prop Filing Deadlines 2026'
    },
    {
      id: 'chk-4',
      title: 'Duplicate Signature Prevention & Voter Registry Hash',
      description: 'Automated deduplication flagging duplicate addresses or duplicate voter ID numbers.',
      status: 'Pending Review',
      lawCode: 'Sec. 9020 Forensic Check'
    },
    {
      id: 'chk-5',
      title: 'Paid Circulator Disclosure Header & Badging',
      description: 'Petition clipboard must visibly display official state disclosures.',
      status: 'Compliant',
      lawCode: 'AB-1451 Disclosure Requirement'
    }
  ];

  const [complianceLogs, setComplianceLogs] = useState([
    {
      id: 1,
      circulator: 'Eleanor Vance (CIR-219)',
      issue: 'Sheet #4 shows 3 consecutive identical handwriting signatures in District 4.',
      severity: 'Medium',
      status: 'Investigating',
      date: 'Today at 09:15 AM'
    },
    {
      id: 2,
      circulator: 'Tanya Sterling (CIR-550)',
      issue: 'Circulator affidavit date missing on Batch #8079 header.',
      severity: 'High',
      status: 'Flagged for Resubmission',
      date: 'Oct 02, 2026'
    }
  ]);

  // ----------------------------------------------------
  // 4.6 VALIDATION REPORTS STATE (4.7 Display, Share, Print)
  // ----------------------------------------------------
  const [reportDateFilter, setReportDateFilter] = useState('All Dates');
  const [reportSearch, setReportSearch] = useState('');
  const [selectedReportView, setSelectedReportView] = useState(null);

  const validationReports = [
    {
      id: 'REP-2026-101',
      project: 'Prop 12 - Clean Energy',
      batchRef: 'BATCH-8092',
      auditor: 'Compliance Desk / Lead Auditor Vance',
      claimed: 145,
      valid: 132,
      invalid: 13,
      validRate: '91.0%',
      payoutApproved: '$462.00',
      date: 'Oct 05, 2026',
      status: 'Audited & Certified'
    },
    {
      id: 'REP-2026-100',
      project: 'Local Mayor Petition',
      batchRef: 'BATCH-8091',
      auditor: 'Auditor Team Beta',
      claimed: 82,
      valid: 78,
      invalid: 4,
      validRate: '95.1%',
      payoutApproved: '$156.00',
      date: 'Oct 04, 2026',
      status: 'Audited & Certified'
    },
    {
      id: 'REP-2026-099',
      project: 'Education Bond Measure',
      batchRef: 'BATCH-8088',
      auditor: 'Forensic Audit Desk',
      claimed: 210,
      valid: 175,
      invalid: 35,
      validRate: '83.3%',
      payoutApproved: 'On Hold',
      date: 'Oct 04, 2026',
      status: 'Conditional Hold'
    },
    {
      id: 'REP-2026-098',
      project: 'Prop 12 - Clean Energy',
      batchRef: 'BATCH-8084',
      auditor: 'Compliance Desk',
      claimed: 95,
      valid: 90,
      invalid: 5,
      validRate: '94.7%',
      payoutApproved: '$315.00',
      date: 'Oct 03, 2026',
      status: 'Audited & Certified'
    }
  ];

  // ----------------------------------------------------
  // 4.8 AI SIGNATURE GATHER RANKINGS (TRANSPARENT METRICS)
  // ----------------------------------------------------
  const [rankingsSearch, setRankingsSearch] = useState('');
  const [rankingsSort, setRankingsSort] = useState('validSigs'); // 'validSigs' | 'validRate' | 'totalClaimed'

  const circulatorRankings = [
    {
      rank: 1,
      name: 'Samantha Ray',
      id: 'CIR-441',
      territory: 'Downtown Metro',
      totalClaimed: 2450,
      validSigs: 2315,
      validRate: 94.5,
      efficiencyTier: 'Top Tier (Master Gatherer)',
      badgeColor: '#eab308'
    },
    {
      rank: 2,
      name: 'David Ross',
      id: 'CIR-312',
      territory: 'Transit Center Terminal',
      totalClaimed: 2180,
      validSigs: 2045,
      validRate: 93.8,
      efficiencyTier: 'High Efficiency',
      badgeColor: '#94a3b8'
    },
    {
      rank: 3,
      name: 'Marcus Sterling',
      id: 'CIR-108',
      territory: 'City Park Plaza',
      totalClaimed: 1940,
      validSigs: 1860,
      validRate: 95.8,
      efficiencyTier: 'Highest Accuracy',
      badgeColor: '#b45309'
    },
    {
      rank: 4,
      name: 'Emma Wilson',
      id: 'CIR-290',
      territory: 'Farmers Market / District 4',
      totalClaimed: 1720,
      validSigs: 1590,
      validRate: 92.4,
      efficiencyTier: 'Steady Performer',
      badgeColor: '#64748b'
    },
    {
      rank: 5,
      name: 'Eleanor Vance',
      id: 'CIR-219',
      territory: 'Westside Mall North Plaza',
      totalClaimed: 1550,
      validSigs: 1380,
      validRate: 89.0,
      efficiencyTier: 'Under Audit Review',
      badgeColor: '#ef4444'
    }
  ];

  // ----------------------------------------------------
  // 4.9 TURN IN RESULTS DATA
  // ----------------------------------------------------
  const turnInSubmissions = [
    {
      turnInId: 'TI-881',
      circulator: 'Samantha Ray',
      project: 'Prop 12 - Clean Energy',
      sheetsCount: 15,
      totalSignatures: 150,
      verifiedCount: 142,
      pendingCount: 0,
      rejectedCount: 8,
      turnInTimestamp: 'Oct 05, 2026 - 06:30 PM',
      status: 'Turn In Verified',
      receiptIssued: 'RC-2026-992'
    },
    {
      turnInId: 'TI-880',
      circulator: 'David Ross',
      project: 'Prop 12 - Clean Energy',
      sheetsCount: 10,
      totalSignatures: 100,
      verifiedCount: 94,
      pendingCount: 0,
      rejectedCount: 6,
      turnInTimestamp: 'Oct 04, 2026 - 07:15 PM',
      status: 'Turn In Verified',
      receiptIssued: 'RC-2026-988'
    },
    {
      turnInId: 'TI-879',
      circulator: 'Eleanor Vance',
      project: 'Education Bond Measure',
      sheetsCount: 21,
      totalSignatures: 210,
      verifiedCount: 0,
      pendingCount: 210,
      rejectedCount: 0,
      turnInTimestamp: 'Oct 04, 2026 - 08:00 PM',
      status: 'Awaiting Audit Intake',
      receiptIssued: 'RC-2026-981'
    }
  ];

  // ----------------------------------------------------
  // ACTIONS & HANDLERS
  // ----------------------------------------------------
  const handleApproveBatch = (batchId) => {
    setSignatureBatches((prev) =>
      prev.map((b) =>
        b.id === batchId
          ? { ...b, status: 'Verified', eligibility: 'Eligible (Full Pay)' }
          : b
      )
    );
    setSelectedRecordForReview(null);
    setReviewNote('');
    addToast({
      title: 'Batch Audit Approved',
      message: `Batch record ${batchId} marked as Verified and cleared for commission sync.`,
      type: 'success'
    });
  };

  const handleRejectBatch = (batchId) => {
    setSignatureBatches((prev) =>
      prev.map((b) =>
        b.id === batchId
          ? { ...b, status: 'Rejected', eligibility: 'Disqualified (Clawback)' }
          : b
      )
    );
    setSelectedRecordForReview(null);
    setReviewNote('');
    addToast({
      title: 'Batch Audit Rejected',
      message: `Batch record ${batchId} flagged for compliance defect.`,
      type: 'warning'
    });
  };

  const handlePrintReport = () => {
    window.print();
  };

  const handleShareReport = (rep) => {
    const textToCopy = `iCanvass Compliance Report ${rep.id} | Project: ${rep.project} | Valid Rate: ${rep.validRate} | Status: ${rep.status}`;
    if (navigator.clipboard) {
      navigator.clipboard.writeText(textToCopy);
    }
    addToast({
      title: 'Report Summary Copied',
      message: `Compliance report ${rep.id} details copied to clipboard for sharing.`,
      type: 'info'
    });
  };

  return (
    <div className="h-full flex flex-col overflow-hidden" style={{ backgroundColor: 'var(--background)', color: 'var(--text-primary)' }}>
      {/* ---------------------------------------------------- */}
      {/* HEADER & PORTAL TABS */}
      {/* ---------------------------------------------------- */}
      <div className="p-4 sm:p-6 shrink-0 print:hidden" style={{ backgroundColor: 'var(--surface)', borderBottom: '1px solid var(--border)' }}>
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl shadow-sm" style={{ backgroundColor: 'var(--success-light)', color: 'var(--success)' }}>
                <ShieldCheck className="w-6 h-6" />
              </div>
              <div>
                <h1 className="text-xl sm:text-2xl font-extrabold m-0" style={{ color: 'var(--text-primary)' }}>
                  Compliance Portal Dashboard
                </h1>
                <p className="mt-0.5 text-xs sm:text-sm m-0" style={{ color: 'var(--text-secondary)' }}>
                  Signature verification, legal affidavits, authenticity forensics, audit reports, rankings & Turn In Results.
                </p>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => handlePrintReport()}
              className="flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold border cursor-pointer transition-colors"
              style={{ backgroundColor: 'var(--surface-secondary)', borderColor: 'var(--border)', color: 'var(--text-secondary)' }}
            >
              <Printer className="w-4 h-4" /> Print View
            </button>
            <button
              onClick={() => navigate('/crm/commissions')}
              className="flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold transition-all shadow-sm cursor-pointer border-none"
              style={{ backgroundColor: 'var(--info)', color: 'var(--text-on-primary)' }}
            >
              <DollarSign className="w-4 h-4" /> View My Pay Portal
            </button>
          </div>
        </div>

        {/* Tab Strip */}
        <div className="flex items-center gap-2 mt-4 pt-4 overflow-x-auto" style={{ borderTop: '1px solid var(--border)' }}>
          {[
            { id: 'overview', label: 'Compliance Overview', icon: FileCheck },
            { id: 'verification', label: 'Signature Verification', icon: CheckSquare, badge: signatureBatches.filter(b => b.status === 'Pending Review').length },
            { id: 'legal', label: 'Legal & Authenticity', icon: ShieldAlert },
            { id: 'commissions', label: 'Commission Extension', icon: DollarSign },
            { id: 'reports', label: 'Validation Reports', icon: FileText },
            { id: 'rankings', label: 'Gatherer Rankings', icon: Award },
            { id: 'turnin', label: 'Turn In Results', icon: CheckCircle }
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className="flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all whitespace-nowrap cursor-pointer border"
                style={{
                  backgroundColor: isActive ? 'var(--primary)' : 'var(--surface-secondary)',
                  color: isActive ? 'var(--text-on-primary)' : 'var(--text-secondary)',
                  borderColor: isActive ? 'var(--primary)' : 'var(--border)'
                }}
              >
                <Icon className="w-4 h-4" />
                <span>{tab.label}</span>
                {tab.badge !== undefined && tab.badge > 0 && (
                  <span
                    className="px-1.5 py-0.2 rounded-full text-[10px] font-bold"
                    style={{
                      backgroundColor: isActive ? 'rgba(255,255,255,0.25)' : 'var(--warning-light)',
                      color: isActive ? '#fff' : 'var(--warning)'
                    }}
                  >
                    {tab.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* ---------------------------------------------------- */}
      {/* 4.1 COMPLIANCE DASHBOARD OVERVIEW */}
      {/* ---------------------------------------------------- */}
      {activeTab === 'overview' && (
        <div className="flex-1 overflow-y-auto p-4 sm:p-6">
          <div className="max-w-7xl mx-auto space-y-6">
            {/* KPI Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="p-5 rounded-2xl border shadow-sm" style={{ backgroundColor: 'var(--surface)', borderColor: 'var(--border)' }}>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs uppercase font-bold tracking-wider" style={{ color: 'var(--text-secondary)' }}>Total Signatures</span>
                  <div className="p-2 rounded-lg" style={{ backgroundColor: 'var(--info-light)', color: 'var(--info)' }}>
                    <FileText className="w-4 h-4" />
                  </div>
                </div>
                <h3 className="text-2xl font-black m-0" style={{ color: 'var(--text-primary)' }}>{overviewStats.totalSignatures}</h3>
                <span className="text-[11px] text-tertiary mt-1 block">Physical signatures audited YTD</span>
              </div>

              <div className="p-5 rounded-2xl border shadow-sm" style={{ backgroundColor: 'var(--surface)', borderColor: 'var(--border)' }}>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs uppercase font-bold tracking-wider" style={{ color: 'var(--text-secondary)' }}>Verified Signatures</span>
                  <div className="p-2 rounded-lg" style={{ backgroundColor: 'var(--success-light)', color: 'var(--success)' }}>
                    <CheckCircle className="w-4 h-4" />
                  </div>
                </div>
                <h3 className="text-2xl font-black m-0" style={{ color: 'var(--success)' }}>{overviewStats.verifiedSignatures}</h3>
                <span className="text-[11px] text-tertiary mt-1 block">Voter database match: {overviewStats.overallValidRate}</span>
              </div>

              <div className="p-5 rounded-2xl border shadow-sm" style={{ backgroundColor: 'var(--surface)', borderColor: 'var(--border)' }}>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs uppercase font-bold tracking-wider" style={{ color: 'var(--text-secondary)' }}>Pending Verification</span>
                  <div className="p-2 rounded-lg" style={{ backgroundColor: 'var(--warning-light)', color: 'var(--warning)' }}>
                    <Clock className="w-4 h-4" />
                  </div>
                </div>
                <h3 className="text-2xl font-black m-0" style={{ color: 'var(--warning)' }}>{overviewStats.pendingVerification}</h3>
                <span className="text-[11px] text-tertiary mt-1 block">In queue for validation review</span>
              </div>

              <div className="p-5 rounded-2xl border shadow-sm" style={{ backgroundColor: 'var(--surface)', borderColor: 'var(--border)' }}>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs uppercase font-bold tracking-wider" style={{ color: 'var(--text-secondary)' }}>Rejected Signatures</span>
                  <div className="p-2 rounded-lg" style={{ backgroundColor: 'var(--error-light)', color: 'var(--error)' }}>
                    <XCircle className="w-4 h-4" />
                  </div>
                </div>
                <h3 className="text-2xl font-black m-0" style={{ color: 'var(--error)' }}>{overviewStats.rejectedSignatures}</h3>
                <span className="text-[11px] text-tertiary mt-1 block">Non-resident or illegible entries</span>
              </div>
            </div>

            {/* Recent Activity Table */}
            <div className="rounded-2xl border shadow-sm overflow-hidden" style={{ backgroundColor: 'var(--surface)', borderColor: 'var(--border)' }}>
              <div className="p-4 sm:p-5 flex items-center justify-between border-b" style={{ borderColor: 'var(--border)', backgroundColor: 'var(--surface-secondary)' }}>
                <div>
                  <h3 className="text-sm font-bold m-0" style={{ color: 'var(--text-primary)' }}>Recent Validation & Audit Activity</h3>
                  <p className="text-xs text-secondary mt-0.5 m-0">Live audit queue entries cross-referenced against official voter files.</p>
                </div>
                <button
                  onClick={() => setActiveTab('verification')}
                  className="text-xs font-bold flex items-center gap-1 cursor-pointer border-none bg-transparent"
                  style={{ color: 'var(--info)' }}
                >
                  View Full Verification Queue &rarr;
                </button>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs" style={{ borderCollapse: 'collapse' }}>
                  <thead style={{ backgroundColor: 'var(--surface-secondary)', borderBottom: '1px solid var(--border)' }}>
                    <tr>
                      <th className="p-3.5 font-semibold text-secondary uppercase">Batch ID</th>
                      <th className="p-3.5 font-semibold text-secondary uppercase">Circulator</th>
                      <th className="p-3.5 font-semibold text-secondary uppercase">Project & Territory</th>
                      <th className="p-3.5 font-semibold text-secondary uppercase">Claimed / Valid</th>
                      <th className="p-3.5 font-semibold text-secondary uppercase">Compliance Status</th>
                      <th className="p-3.5 font-semibold text-secondary uppercase text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {signatureBatches.map((item) => (
                      <tr key={item.id} style={{ borderBottom: '1px solid var(--border)' }}>
                        <td className="p-3.5 font-mono font-bold" style={{ color: 'var(--info)' }}>
                          {item.batchNumber}
                        </td>
                        <td className="p-3.5">
                          <div className="font-bold" style={{ color: 'var(--text-primary)' }}>{item.circulator}</div>
                          <span className="text-[10px] text-tertiary">{item.circulatorId}</span>
                        </td>
                        <td className="p-3.5">
                          <div className="font-semibold" style={{ color: 'var(--text-primary)' }}>{item.project}</div>
                          <span className="text-[11px] text-secondary">{item.territory}</span>
                        </td>
                        <td className="p-3.5">
                          <span className="font-bold text-success">{item.verifiedSigs}</span>
                          <span className="text-secondary"> / {item.claimedSigs}</span>
                          <span className="text-[10px] text-error block">-{item.rejectedSigs} rejected</span>
                        </td>
                        <td className="p-3.5">
                          <span
                            className="px-2.5 py-1 rounded-full text-[10px] font-bold border inline-flex items-center gap-1"
                            style={{
                              backgroundColor:
                                item.status === 'Verified'
                                  ? 'var(--success-light)'
                                  : item.status === 'Rejected'
                                  ? 'var(--error-light)'
                                  : 'var(--warning-light)',
                              borderColor:
                                item.status === 'Verified'
                                  ? 'var(--success-border)'
                                  : item.status === 'Rejected'
                                  ? 'var(--error-border)'
                                  : 'var(--warning-border)',
                              color:
                                item.status === 'Verified'
                                  ? 'var(--success)'
                                  : item.status === 'Rejected'
                                  ? 'var(--error)'
                                  : 'var(--warning)'
                            }}
                          >
                            {item.status}
                          </span>
                        </td>
                        <td className="p-3.5 text-right">
                          <button
                            onClick={() => {
                              setSelectedRecordForReview(item);
                              setActiveTab('verification');
                            }}
                            className="px-3 py-1.5 rounded-lg text-xs font-semibold border cursor-pointer transition-colors"
                            style={{ backgroundColor: 'var(--surface-secondary)', borderColor: 'var(--border)', color: 'var(--text-primary)' }}
                          >
                            Audit
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
      )}

      {/* ---------------------------------------------------- */}
      {/* 4.2 SIGNATURE VERIFICATION INTERFACE */}
      {/* ---------------------------------------------------- */}
      {activeTab === 'verification' && (
        <div className="flex-1 overflow-y-auto p-4 sm:p-6">
          <div className="max-w-7xl mx-auto space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-lg font-bold m-0" style={{ color: 'var(--text-primary)' }}>Petition Signature Verification Queue</h2>
                <p className="text-xs text-secondary mt-0.5 m-0">Review physical sheets, compare voter records, and authorize validity metrics.</p>
              </div>

              <div className="flex items-center gap-3">
                <div className="relative">
                  <Search className="w-4 h-4 absolute text-tertiary" style={{ left: 12, top: '50%', transform: 'translateY(-50%)' }} />
                  <input
                    type="text"
                    value={verificationSearch}
                    onChange={(e) => setVerificationSearch(e.target.value)}
                    placeholder="Search batch or circulator..."
                    className="text-xs rounded-xl py-2 pl-9 pr-3 focus:outline-none"
                    style={{ backgroundColor: 'var(--surface)', color: 'var(--text-primary)', border: '1px solid var(--border)' }}
                  />
                </div>

                <select
                  value={verificationStatusFilter}
                  onChange={(e) => setVerificationStatusFilter(e.target.value)}
                  className="text-xs rounded-xl px-3 py-2 focus:outline-none"
                  style={{ backgroundColor: 'var(--surface)', color: 'var(--text-primary)', border: '1px solid var(--border)' }}
                >
                  <option value="all">All Statuses</option>
                  <option value="Pending Review">Pending Review</option>
                  <option value="Verified">Verified</option>
                  <option value="Rejected">Rejected</option>
                </select>
              </div>
            </div>

            {/* Table */}
            <div className="rounded-2xl border shadow-sm overflow-hidden" style={{ backgroundColor: 'var(--surface)', borderColor: 'var(--border)' }}>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs" style={{ borderCollapse: 'collapse' }}>
                  <thead style={{ backgroundColor: 'var(--surface-secondary)', borderBottom: '1px solid var(--border)' }}>
                    <tr>
                      <th className="p-3.5 font-semibold text-secondary uppercase">Batch ID</th>
                      <th className="p-3.5 font-semibold text-secondary uppercase">Circulator Details</th>
                      <th className="p-3.5 font-semibold text-secondary uppercase">Submission Date</th>
                      <th className="p-3.5 font-semibold text-secondary uppercase">Claimed / Valid</th>
                      <th className="p-3.5 font-semibold text-secondary uppercase">Authenticity Status</th>
                      <th className="p-3.5 font-semibold text-secondary uppercase">Verification Status</th>
                      <th className="p-3.5 font-semibold text-secondary uppercase text-right">Review Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {signatureBatches
                      .filter((b) => {
                        if (verificationStatusFilter !== 'all' && b.status !== verificationStatusFilter) return false;
                        if (verificationSearch.trim()) {
                          const q = verificationSearch.toLowerCase();
                          return b.batchNumber.toLowerCase().includes(q) || b.circulator.toLowerCase().includes(q) || b.project.toLowerCase().includes(q);
                        }
                        return true;
                      })
                      .map((batch) => (
                        <tr key={batch.id} style={{ borderBottom: '1px solid var(--border)' }}>
                          <td className="p-3.5 font-mono font-bold" style={{ color: 'var(--info)' }}>
                            {batch.batchNumber}
                          </td>
                          <td className="p-3.5">
                            <div className="font-bold" style={{ color: 'var(--text-primary)' }}>{batch.circulator}</div>
                            <span className="text-[10px] text-tertiary">{batch.territory}</span>
                          </td>
                          <td className="p-3.5 text-secondary">{batch.submissionDate}</td>
                          <td className="p-3.5">
                            <div className="font-bold text-success">{batch.verifiedSigs} valid</div>
                            <div className="text-[10px] text-tertiary">of {batch.claimedSigs} total claimed</div>
                          </td>
                          <td className="p-3.5">
                            <span
                              className="px-2 py-0.5 rounded text-[10px] font-bold"
                              style={{
                                backgroundColor: batch.authenticityStatus === 'Authentic' ? 'var(--success-light)' : 'var(--error-light)',
                                color: batch.authenticityStatus === 'Authentic' ? 'var(--success)' : 'var(--error)'
                              }}
                            >
                              {batch.authenticityStatus}
                            </span>
                          </td>
                          <td className="p-3.5">
                            <span
                              className="px-2.5 py-1 rounded-full text-[10px] font-bold border"
                              style={{
                                backgroundColor:
                                  batch.status === 'Verified'
                                    ? 'var(--success-light)'
                                    : batch.status === 'Rejected'
                                    ? 'var(--error-light)'
                                    : 'var(--warning-light)',
                                borderColor:
                                  batch.status === 'Verified'
                                    ? 'var(--success-border)'
                                    : batch.status === 'Rejected'
                                    ? 'var(--error-border)'
                                    : 'var(--warning-border)',
                                color:
                                  batch.status === 'Verified'
                                    ? 'var(--success)'
                                    : batch.status === 'Rejected'
                                    ? 'var(--error)'
                                    : 'var(--warning)'
                              }}
                            >
                              {batch.status}
                            </span>
                          </td>
                          <td className="p-3.5 text-right">
                            <button
                              onClick={() => setSelectedRecordForReview(batch)}
                              className="px-3 py-1.5 rounded-lg text-xs font-bold cursor-pointer border-none shadow-sm"
                              style={{ backgroundColor: 'var(--info)', color: 'var(--text-on-primary)' }}
                            >
                              Inspect Batch
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
      )}

      {/* ---------------------------------------------------- */}
      {/* 4.3 LEGAL COMPLIANCE & 4.4 AUTHENTICITY CONFIRMATION */}
      {/* ---------------------------------------------------- */}
      {activeTab === 'legal' && (
        <div className="flex-1 overflow-y-auto p-4 sm:p-6">
          <div className="max-w-6xl mx-auto space-y-6">
            <div>
              <h2 className="text-lg font-bold m-0" style={{ color: 'var(--text-primary)' }}>Legal Compliance & Authenticity Protocols</h2>
              <p className="text-xs text-secondary mt-0.5 m-0">Statutory petition integrity rules, notary seals, and forensic duplicate detection.</p>
            </div>

            {/* Checklist */}
            <div className="rounded-2xl border p-5 shadow-sm space-y-4" style={{ backgroundColor: 'var(--surface)', borderColor: 'var(--border)' }}>
              <div className="flex items-center gap-2 pb-3 border-b" style={{ borderColor: 'var(--border)' }}>
                <CheckSquare className="w-5 h-5 text-success" />
                <h3 className="text-sm font-bold m-0">Mandatory Statutory Compliance Checklist</h3>
              </div>

              <div className="space-y-3">
                {legalChecklist.map((chk) => (
                  <div
                    key={chk.id}
                    className="p-3.5 rounded-xl border flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                    style={{ backgroundColor: 'var(--surface-secondary)', borderColor: 'var(--border)' }}
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold" style={{ color: 'var(--text-primary)' }}>{chk.title}</span>
                        <span className="text-[10px] font-mono text-tertiary">[{chk.lawCode}]</span>
                      </div>
                      <p className="text-[11px] text-secondary mt-0.5 m-0">{chk.description}</p>
                    </div>

                    <span
                      className="px-2.5 py-1 rounded-full text-[10px] font-bold border shrink-0 inline-flex items-center gap-1"
                      style={{
                        backgroundColor: chk.status === 'Compliant' ? 'var(--success-light)' : 'var(--warning-light)',
                        borderColor: chk.status === 'Compliant' ? 'var(--success-border)' : 'var(--warning-border)',
                        color: chk.status === 'Compliant' ? 'var(--success)' : 'var(--warning)'
                      }}
                    >
                      {chk.status === 'Compliant' ? <CheckCircle className="w-3 h-3" /> : <Clock className="w-3 h-3" />}
                      {chk.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Authenticity Forensics Table */}
            <div className="rounded-2xl border overflow-hidden shadow-sm" style={{ backgroundColor: 'var(--surface)', borderColor: 'var(--border)' }}>
              <div className="p-4 border-b flex items-center justify-between" style={{ borderColor: 'var(--border)', backgroundColor: 'var(--surface-secondary)' }}>
                <h3 className="text-sm font-bold m-0 flex items-center gap-2">
                  <ShieldAlert className="w-4 h-4 text-warning" /> Authenticity Incident Flags
                </h3>
                <span className="text-xs text-secondary">{complianceLogs.length} flagged records</span>
              </div>

              <div className="p-4 space-y-3">
                {complianceLogs.map((log) => (
                  <div
                    key={log.id}
                    className="p-3.5 rounded-xl border flex items-start justify-between gap-4"
                    style={{ backgroundColor: 'var(--surface-secondary)', borderColor: 'var(--border)' }}
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold" style={{ color: 'var(--text-primary)' }}>{log.circulator}</span>
                        <span
                          className="px-2 py-0.2 rounded text-[10px] font-bold"
                          style={{
                            backgroundColor: log.severity === 'High' ? 'var(--error-light)' : 'var(--warning-light)',
                            color: log.severity === 'High' ? 'var(--error)' : 'var(--warning)'
                          }}
                        >
                          {log.severity} Priority
                        </span>
                      </div>
                      <p className="text-xs text-secondary mt-1 m-0">{log.issue}</p>
                      <span className="text-[10px] text-tertiary mt-1 block">Logged: {log.date}</span>
                    </div>

                    <span className="text-xs font-semibold px-2.5 py-1 rounded-md border" style={{ backgroundColor: 'var(--surface)', borderColor: 'var(--border)' }}>
                      {log.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ---------------------------------------------------- */}
      {/* 4.5 COMMISSION MANAGEMENT EXTENSION */}
      {/* ---------------------------------------------------- */}
      {activeTab === 'commissions' && (
        <div className="flex-1 overflow-y-auto p-4 sm:p-6">
          <div className="max-w-6xl mx-auto space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-lg font-bold m-0" style={{ color: 'var(--text-primary)' }}>Commission & Payroll Eligibility Extension</h2>
                <p className="text-xs text-secondary mt-0.5 m-0">Synchronize validated signature tallies with the Commission Maker payroll engine.</p>
              </div>

              <button
                onClick={() => navigate('/crm/commissions')}
                className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold border-none shadow-sm cursor-pointer"
                style={{ backgroundColor: 'var(--info)', color: 'var(--text-on-primary)' }}
              >
                Open Full Commission Maker <ExternalLink className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="p-5 rounded-2xl border" style={{ backgroundColor: 'var(--surface)', borderColor: 'var(--border)' }}>
                <span className="text-xs text-secondary font-bold uppercase">Authorized for Payroll</span>
                <h3 className="text-3xl font-extrabold text-success mt-1 mb-2 m-0">29,840 Sigs</h3>
                <p className="text-xs text-secondary m-0">Calculated under active tier rates with zero fraud holds.</p>
              </div>

              <div className="p-5 rounded-2xl border" style={{ backgroundColor: 'var(--surface)', borderColor: 'var(--border)' }}>
                <span className="text-xs text-secondary font-bold uppercase">Conditional Audit Hold</span>
                <h3 className="text-3xl font-extrabold text-warning mt-1 mb-2 m-0">3,410 Sigs</h3>
                <p className="text-xs text-secondary m-0">Pending county clerk voter registration cross-reference.</p>
              </div>

              <div className="p-5 rounded-2xl border" style={{ backgroundColor: 'var(--surface)', borderColor: 'var(--border)' }}>
                <span className="text-xs text-secondary font-bold uppercase">Clawback Deductions</span>
                <h3 className="text-3xl font-extrabold text-error mt-1 mb-2 m-0">1,570 Sigs</h3>
                <p className="text-xs text-secondary m-0">Disqualified entries deducted prior to batch disbursement.</p>
              </div>
            </div>

            {/* Sync Table */}
            <div className="rounded-2xl border overflow-hidden shadow-sm" style={{ backgroundColor: 'var(--surface)', borderColor: 'var(--border)' }}>
              <div className="p-4 border-b" style={{ borderColor: 'var(--border)', backgroundColor: 'var(--surface-secondary)' }}>
                <h3 className="text-sm font-bold m-0">Circulator Commission Eligibility Status</h3>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs" style={{ borderCollapse: 'collapse' }}>
                  <thead style={{ backgroundColor: 'var(--surface-secondary)', borderBottom: '1px solid var(--border)' }}>
                    <tr>
                      <th className="p-3.5 font-semibold text-secondary uppercase">Batch</th>
                      <th className="p-3.5 font-semibold text-secondary uppercase">Circulator</th>
                      <th className="p-3.5 font-semibold text-secondary uppercase">Valid Sigs</th>
                      <th className="p-3.5 font-semibold text-secondary uppercase">Eligibility Flag</th>
                      <th className="p-3.5 font-semibold text-secondary uppercase text-right">Commission Sync</th>
                    </tr>
                  </thead>
                  <tbody>
                    {signatureBatches.map((b) => (
                      <tr key={b.id} style={{ borderBottom: '1px solid var(--border)' }}>
                        <td className="p-3.5 font-mono font-bold" style={{ color: 'var(--info)' }}>{b.batchNumber}</td>
                        <td className="p-3.5 font-bold" style={{ color: 'var(--text-primary)' }}>{b.circulator}</td>
                        <td className="p-3.5 font-semibold text-success">{b.verifiedSigs} of {b.claimedSigs}</td>
                        <td className="p-3.5">
                          <span
                            className="px-2.5 py-1 rounded-full text-[10px] font-bold border"
                            style={{
                              backgroundColor: b.eligibility.includes('Eligible') ? 'var(--success-light)' : 'var(--warning-light)',
                              borderColor: b.eligibility.includes('Eligible') ? 'var(--success-border)' : 'var(--warning-border)',
                              color: b.eligibility.includes('Eligible') ? 'var(--success)' : 'var(--warning)'
                            }}
                          >
                            {b.eligibility}
                          </span>
                        </td>
                        <td className="p-3.5 text-right">
                          <button
                            onClick={() => {
                              addToast({
                                title: 'Commission Rule Synced',
                                message: `Rate calculated for ${b.circulator}: ${b.verifiedSigs} valid signatures applied.`,
                                type: 'info'
                              });
                            }}
                            className="px-3 py-1.5 rounded-lg text-xs font-semibold border cursor-pointer transition-colors"
                            style={{ backgroundColor: 'var(--surface-secondary)', borderColor: 'var(--border)', color: 'var(--text-primary)' }}
                          >
                            Sync Calculation
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
      )}

      {/* ---------------------------------------------------- */}
      {/* 4.6 VALIDATION REPORTS & 4.7 DISPLAY, SHARE, PRINT */}
      {/* ---------------------------------------------------- */}
      {activeTab === 'reports' && (
        <div className="flex-1 overflow-y-auto p-4 sm:p-6">
          <div className="max-w-6xl mx-auto space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 print:hidden">
              <div>
                <h2 className="text-lg font-bold m-0" style={{ color: 'var(--text-primary)' }}>Formal Compliance & Audit Reports</h2>
                <p className="text-xs text-secondary mt-0.5 m-0">Official certifiable verification reports for campaign coordinators and state filings.</p>
              </div>

              <div className="flex items-center gap-3">
                <div className="relative">
                  <Search className="w-4 h-4 absolute text-tertiary" style={{ left: 12, top: '50%', transform: 'translateY(-50%)' }} />
                  <input
                    type="text"
                    value={reportSearch}
                    onChange={(e) => setReportSearch(e.target.value)}
                    placeholder="Search report ID..."
                    className="text-xs rounded-xl py-2 pl-9 pr-3 focus:outline-none"
                    style={{ backgroundColor: 'var(--surface)', color: 'var(--text-primary)', border: '1px solid var(--border)' }}
                  />
                </div>

                <button
                  onClick={handlePrintReport}
                  className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold border cursor-pointer"
                  style={{ backgroundColor: 'var(--surface-secondary)', borderColor: 'var(--border)', color: 'var(--text-secondary)' }}
                >
                  <Printer className="w-4 h-4" /> Print Reports
                </button>
              </div>
            </div>

            {/* Reports List */}
            <div className="rounded-2xl border overflow-hidden shadow-sm" style={{ backgroundColor: 'var(--surface)', borderColor: 'var(--border)' }}>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs" style={{ borderCollapse: 'collapse' }}>
                  <thead style={{ backgroundColor: 'var(--surface-secondary)', borderBottom: '1px solid var(--border)' }}>
                    <tr>
                      <th className="p-3.5 font-semibold text-secondary uppercase">Report ID</th>
                      <th className="p-3.5 font-semibold text-secondary uppercase">Project & Batch</th>
                      <th className="p-3.5 font-semibold text-secondary uppercase">Auditor Desk</th>
                      <th className="p-3.5 font-semibold text-secondary uppercase">Valid Sigs (Rate)</th>
                      <th className="p-3.5 font-semibold text-secondary uppercase">Audit Status</th>
                      <th className="p-3.5 font-semibold text-secondary uppercase text-right print:hidden">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {validationReports
                      .filter((r) => r.id.toLowerCase().includes(reportSearch.toLowerCase()) || r.project.toLowerCase().includes(reportSearch.toLowerCase()))
                      .map((rep) => (
                        <tr key={rep.id} style={{ borderBottom: '1px solid var(--border)' }}>
                          <td className="p-3.5 font-mono font-bold" style={{ color: 'var(--info)' }}>{rep.id}</td>
                          <td className="p-3.5">
                            <div className="font-bold" style={{ color: 'var(--text-primary)' }}>{rep.project}</div>
                            <span className="text-[10px] text-tertiary">Ref: {rep.batchRef} • {rep.date}</span>
                          </td>
                          <td className="p-3.5 text-secondary">{rep.auditor}</td>
                          <td className="p-3.5">
                            <span className="font-bold text-success">{rep.valid}</span> / {rep.claimed}
                            <span className="text-[11px] text-info font-bold block">({rep.validRate} accuracy)</span>
                          </td>
                          <td className="p-3.5">
                            <span
                              className="px-2.5 py-1 rounded-full text-[10px] font-bold border"
                              style={{ backgroundColor: 'var(--success-light)', color: 'var(--success)', borderColor: 'var(--success-border)' }}
                            >
                              {rep.status}
                            </span>
                          </td>
                          <td className="p-3.5 text-right print:hidden">
                            <div className="flex items-center justify-end gap-2">
                              <button
                                onClick={() => setSelectedReportView(rep)}
                                className="p-1.5 rounded-lg border text-secondary hover:text-primary cursor-pointer"
                                title="View Report"
                              >
                                <Eye className="w-3.5 h-3.5" />
                              </button>
                              <button
                                onClick={() => handleShareReport(rep)}
                                className="p-1.5 rounded-lg border text-secondary hover:text-primary cursor-pointer"
                                title="Share Report Link"
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
          </div>
        </div>
      )}

      {/* ---------------------------------------------------- */}
      {/* 4.8 AI SIGNATURE GATHER RANKINGS */}
      {/* ---------------------------------------------------- */}
      {activeTab === 'rankings' && (
        <div className="flex-1 overflow-y-auto p-4 sm:p-6">
          <div className="max-w-6xl mx-auto space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-lg font-bold m-0" style={{ color: 'var(--text-primary)' }}>Circulator Performance Rankings</h2>
                <p className="text-xs text-secondary mt-0.5 m-0">
                  Performance standings derived from certified valid signature counts and field accuracy rates.
                </p>
              </div>

              <div className="relative">
                <Search className="w-4 h-4 absolute text-tertiary" style={{ left: 12, top: '50%', transform: 'translateY(-50%)' }} />
                <input
                  type="text"
                  value={rankingsSearch}
                  onChange={(e) => setRankingsSearch(e.target.value)}
                  placeholder="Search circulator name..."
                  className="text-xs rounded-xl py-2 pl-9 pr-3 focus:outline-none"
                  style={{ backgroundColor: 'var(--surface)', color: 'var(--text-primary)', border: '1px solid var(--border)' }}
                />
              </div>
            </div>

            {/* Note regarding honest analytics presentation */}
            <div className="p-3.5 rounded-xl border flex items-center gap-3" style={{ backgroundColor: 'var(--surface-secondary)', borderColor: 'var(--border)' }}>
              <Info className="w-4 h-4 text-info shrink-0" />
              <p className="text-xs text-secondary m-0">
                <strong>Transparent Metrics Notice:</strong> Rankings are calculated directly from physical verified signature sheets and clerk voter cross-checks.
              </p>
            </div>

            {/* Rankings Table */}
            <div className="rounded-2xl border overflow-hidden shadow-sm" style={{ backgroundColor: 'var(--surface)', borderColor: 'var(--border)' }}>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs" style={{ borderCollapse: 'collapse' }}>
                  <thead style={{ backgroundColor: 'var(--surface-secondary)', borderBottom: '1px solid var(--border)' }}>
                    <tr>
                      <th className="p-3.5 font-semibold text-secondary uppercase w-16">Rank</th>
                      <th className="p-3.5 font-semibold text-secondary uppercase">Circulator</th>
                      <th className="p-3.5 font-semibold text-secondary uppercase">Territory</th>
                      <th className="p-3.5 font-semibold text-secondary uppercase">Verified Sigs</th>
                      <th className="p-3.5 font-semibold text-secondary uppercase">Validity Rate</th>
                      <th className="p-3.5 font-semibold text-secondary uppercase text-right">Efficiency Tier</th>
                    </tr>
                  </thead>
                  <tbody>
                    {circulatorRankings
                      .filter((c) => c.name.toLowerCase().includes(rankingsSearch.toLowerCase()) || c.territory.toLowerCase().includes(rankingsSearch.toLowerCase()))
                      .map((circ) => (
                        <tr key={circ.id} style={{ borderBottom: '1px solid var(--border)' }}>
                          <td className="p-3.5 font-black text-sm">
                            <span
                              className="w-7 h-7 rounded-full flex items-center justify-center font-bold text-xs"
                              style={{
                                backgroundColor: circ.rank <= 3 ? `${circ.badgeColor}20` : 'var(--surface-secondary)',
                                color: circ.rank <= 3 ? circ.badgeColor : 'var(--text-secondary)'
                              }}
                            >
                              #{circ.rank}
                            </span>
                          </td>
                          <td className="p-3.5">
                            <div className="font-bold text-sm" style={{ color: 'var(--text-primary)' }}>{circ.name}</div>
                            <span className="text-[10px] text-tertiary">{circ.id}</span>
                          </td>
                          <td className="p-3.5 text-secondary">{circ.territory}</td>
                          <td className="p-3.5 font-bold text-success text-sm">
                            {circ.validSigs.toLocaleString()}
                            <span className="text-[10px] text-tertiary block font-normal">of {circ.totalClaimed.toLocaleString()} claimed</span>
                          </td>
                          <td className="p-3.5 font-bold text-info text-sm">
                            {circ.validRate}%
                          </td>
                          <td className="p-3.5 text-right">
                            <span
                              className="px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider"
                              style={{
                                backgroundColor: circ.validRate >= 93 ? 'var(--success-light)' : 'var(--surface-secondary)',
                                color: circ.validRate >= 93 ? 'var(--success)' : 'var(--text-secondary)'
                              }}
                            >
                              {circ.efficiencyTier}
                            </span>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ---------------------------------------------------- */}
      {/* 4.9 TURN IN RESULTS FOR CIRCULATORS */}
      {/* ---------------------------------------------------- */}
      {activeTab === 'turnin' && (
        <div className="flex-1 overflow-y-auto p-4 sm:p-6">
          <div className="max-w-6xl mx-auto space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-lg font-bold m-0" style={{ color: 'var(--text-primary)' }}>Turn In Results Portal</h2>
                <p className="text-xs text-secondary mt-0.5 m-0">Official audit intake verification and receipt ledger for circulator petition sheet drop-offs.</p>
              </div>

              {/* Authorized / Restricted Mode Toggle */}
              <button
                onClick={() => setIsTurnInAuthorized(!isTurnInAuthorized)}
                className="text-xs px-3 py-1.5 rounded-lg border transition-colors cursor-pointer"
                style={{ backgroundColor: 'var(--surface-secondary)', borderColor: 'var(--border)', color: 'var(--text-secondary)' }}
              >
                Simulate: {isTurnInAuthorized ? 'Lock / Restrict Access' : 'Unlock / Authorize Access'}
              </button>
            </div>

            {!isTurnInAuthorized ? (
              /* RESTRICTED ACCESS STATE */
              <div className="p-12 text-center rounded-2xl border space-y-3" style={{ backgroundColor: 'var(--surface)', borderColor: 'var(--border)' }}>
                <Lock className="w-12 h-12 mx-auto text-warning opacity-75" />
                <h3 className="text-base font-bold m-0" style={{ color: 'var(--text-primary)' }}>Access Restricted: Verification In Progress</h3>
                <p className="text-xs text-secondary max-w-md mx-auto m-0">
                  Your turn-in submission receipt is currently held in the intake quarantine queue. Complete auditor sign-off is required before individual batch breakdown is released.
                </p>
                <div className="pt-2">
                  <button
                    onClick={() => setIsTurnInAuthorized(true)}
                    className="px-4 py-2 rounded-xl text-xs font-bold shadow-sm border-none cursor-pointer"
                    style={{ backgroundColor: 'var(--info)', color: 'var(--text-on-primary)' }}
                  >
                    Authenticate with Field Lead Key
                  </button>
                </div>
              </div>
            ) : (
              /* UNLOCKED AUTHORIZED RESULTS STATE */
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="p-5 rounded-2xl border" style={{ backgroundColor: 'var(--surface)', borderColor: 'var(--border)' }}>
                    <span className="text-xs font-bold uppercase text-secondary">Turned-in Sheets</span>
                    <h3 className="text-3xl font-black text-primary mt-1 m-0">46 Sheets</h3>
                    <span className="text-xs text-tertiary">Across 3 active ballot initiatives</span>
                  </div>

                  <div className="p-5 rounded-2xl border" style={{ backgroundColor: 'var(--surface)', borderColor: 'var(--border)' }}>
                    <span className="text-xs font-bold uppercase text-secondary">Accepted Signatures</span>
                    <h3 className="text-3xl font-black text-success mt-1 m-0">236 Valid</h3>
                    <span className="text-xs text-tertiary">Verified and added to final petition binder</span>
                  </div>

                  <div className="p-5 rounded-2xl border" style={{ backgroundColor: 'var(--surface)', borderColor: 'var(--border)' }}>
                    <span className="text-xs font-bold uppercase text-secondary">Pending In Intake</span>
                    <h3 className="text-3xl font-black text-warning mt-1 m-0">210 Sigs</h3>
                    <span className="text-xs text-tertiary">Batch TI-879 undergoing clerk review</span>
                  </div>
                </div>

                {/* Submissions Table */}
                <div className="rounded-2xl border overflow-hidden shadow-sm" style={{ backgroundColor: 'var(--surface)', borderColor: 'var(--border)' }}>
                  <div className="p-4 border-b flex items-center justify-between" style={{ borderColor: 'var(--border)', backgroundColor: 'var(--surface-secondary)' }}>
                    <h3 className="text-sm font-bold m-0">Petition Turn In Audit Ledger</h3>
                    <span className="text-xs text-success font-semibold flex items-center gap-1">
                      <Unlock className="w-3.5 h-3.5" /> Authorized Circulator Ledger
                    </span>
                  </div>

                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs" style={{ borderCollapse: 'collapse' }}>
                      <thead style={{ backgroundColor: 'var(--surface-secondary)', borderBottom: '1px solid var(--border)' }}>
                        <tr>
                          <th className="p-3.5 font-semibold text-secondary uppercase">Turn In ID</th>
                          <th className="p-3.5 font-semibold text-secondary uppercase">Circulator</th>
                          <th className="p-3.5 font-semibold text-secondary uppercase">Project & Sheets</th>
                          <th className="p-3.5 font-semibold text-secondary uppercase">Breakdown (Valid / Pend / Rej)</th>
                          <th className="p-3.5 font-semibold text-secondary uppercase">Audit Timestamp</th>
                          <th className="p-3.5 font-semibold text-secondary uppercase text-right">Receipt #</th>
                        </tr>
                      </thead>
                      <tbody>
                        {turnInSubmissions.map((ti) => (
                          <tr key={ti.turnInId} style={{ borderBottom: '1px solid var(--border)' }}>
                            <td className="p-3.5 font-mono font-bold" style={{ color: 'var(--info)' }}>{ti.turnInId}</td>
                            <td className="p-3.5 font-bold" style={{ color: 'var(--text-primary)' }}>{ti.circulator}</td>
                            <td className="p-3.5">
                              <div className="font-semibold" style={{ color: 'var(--text-primary)' }}>{ti.project}</div>
                              <span className="text-[10px] text-tertiary">{ti.sheetsCount} Physical Sheets</span>
                            </td>
                            <td className="p-3.5">
                              <span className="font-bold text-success">{ti.verifiedCount} valid</span> •{' '}
                              <span className="text-warning font-semibold">{ti.pendingCount} pend</span> •{' '}
                              <span className="text-error font-semibold">{ti.rejectedCount} rej</span>
                            </td>
                            <td className="p-3.5 text-secondary">{ti.turnInTimestamp}</td>
                            <td className="p-3.5 text-right font-mono font-bold text-primary">{ti.receiptIssued}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ---------------------------------------------------- */}
      {/* MODAL: BATCH INSPECTION & APPROVAL REVIEW */}
      {/* ---------------------------------------------------- */}
      {selectedRecordForReview && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
          onClick={() => setSelectedRecordForReview(null)}
        >
          <div
            className="w-full max-w-2xl rounded-2xl p-6 border shadow-2xl space-y-4 max-h-[90vh] overflow-y-auto"
            style={{ backgroundColor: 'var(--surface)', borderColor: 'var(--border)', color: 'var(--text-primary)' }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-3 border-b" style={{ borderColor: 'var(--border)' }}>
              <div>
                <h3 className="text-base font-bold m-0 flex items-center gap-2">
                  <CheckSquare className="w-5 h-5 text-info" /> Audit Review: {selectedRecordForReview.batchNumber}
                </h3>
                <span className="text-xs text-secondary">Circulator: {selectedRecordForReview.circulator} ({selectedRecordForReview.circulatorId})</span>
              </div>
              <button
                onClick={() => setSelectedRecordForReview(null)}
                className="p-1 rounded-lg text-secondary border-none bg-transparent cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="p-3 rounded-xl border" style={{ backgroundColor: 'var(--surface-secondary)', borderColor: 'var(--border)' }}>
                <span className="text-[10px] uppercase font-bold text-secondary">Project Initiative</span>
                <p className="text-xs font-bold mt-0.5 m-0" style={{ color: 'var(--text-primary)' }}>{selectedRecordForReview.project}</p>
              </div>

              <div className="p-3 rounded-xl border" style={{ backgroundColor: 'var(--surface-secondary)', borderColor: 'var(--border)' }}>
                <span className="text-[10px] uppercase font-bold text-secondary">Territory Staging</span>
                <p className="text-xs font-bold mt-0.5 m-0" style={{ color: 'var(--text-primary)' }}>{selectedRecordForReview.territory}</p>
              </div>
            </div>

            <div className="p-4 rounded-xl border space-y-2" style={{ backgroundColor: 'var(--surface-secondary)', borderColor: 'var(--border)' }}>
              <div className="flex justify-between text-xs">
                <span className="text-secondary">Claimed Physical Signatures:</span>
                <span className="font-bold">{selectedRecordForReview.claimedSigs}</span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-secondary">Voter Match Count:</span>
                <span className="font-bold text-success">{selectedRecordForReview.verifiedSigs}</span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-secondary">Defect / Illegible Count:</span>
                <span className="font-bold text-error">{selectedRecordForReview.rejectedSigs}</span>
              </div>
              <div className="flex justify-between text-xs pt-2 border-t" style={{ borderColor: 'var(--border)' }}>
                <span className="font-bold text-primary">Accuracy Ratio:</span>
                <span className="font-bold text-info">
                  {Math.round((selectedRecordForReview.verifiedSigs / selectedRecordForReview.claimedSigs) * 100)}%
                </span>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold mb-1" style={{ color: 'var(--text-secondary)' }}>
                Auditor Findings & Remarks
              </label>
              <textarea
                rows={3}
                value={reviewNote}
                onChange={(e) => setReviewNote(e.target.value)}
                placeholder="Enter audit validation remarks or affidavit verification notes..."
                className="w-full text-xs rounded-xl p-3 focus:outline-none"
                style={{ backgroundColor: 'var(--surface-secondary)', color: 'var(--text-primary)', border: '1px solid var(--border)' }}
              />
            </div>

            <div className="flex justify-between items-center pt-3 border-t" style={{ borderColor: 'var(--border)' }}>
              <button
                onClick={() => handleRejectBatch(selectedRecordForReview.id)}
                className="px-4 py-2 rounded-xl text-xs font-bold cursor-pointer border-none"
                style={{ backgroundColor: 'var(--error-light)', color: 'var(--error)' }}
              >
                Reject Batch
              </button>

              <div className="flex gap-2">
                <button
                  onClick={() => setSelectedRecordForReview(null)}
                  className="px-4 py-2 rounded-xl text-xs font-semibold cursor-pointer border"
                  style={{ backgroundColor: 'var(--surface-secondary)', color: 'var(--text-primary)', borderColor: 'var(--border)' }}
                >
                  Cancel
                </button>
                <button
                  onClick={() => handleApproveBatch(selectedRecordForReview.id)}
                  className="px-5 py-2 rounded-xl text-xs font-bold cursor-pointer border-none shadow-md"
                  style={{ backgroundColor: 'var(--success)', color: 'var(--text-on-primary)' }}
                >
                  Approve & Certify
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ---------------------------------------------------- */}
      {/* MODAL: REPORT DETAIL PREVIEW */}
      {/* ---------------------------------------------------- */}
      {selectedReportView && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
          onClick={() => setSelectedReportView(null)}
        >
          <div
            className="w-full max-w-xl rounded-2xl p-6 border shadow-2xl space-y-4"
            style={{ backgroundColor: 'var(--surface)', borderColor: 'var(--border)', color: 'var(--text-primary)' }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-3 border-b" style={{ borderColor: 'var(--border)' }}>
              <div>
                <h3 className="text-base font-bold m-0">{selectedReportView.id} Certification</h3>
                <span className="text-xs text-secondary">{selectedReportView.project} • {selectedReportView.date}</span>
              </div>
              <button
                onClick={() => setSelectedReportView(null)}
                className="p-1 rounded-lg text-secondary border-none bg-transparent cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-2 text-xs">
              <div className="flex justify-between py-1 border-b" style={{ borderColor: 'var(--border)' }}>
                <span className="text-secondary">Batch Reference:</span>
                <span className="font-mono font-bold">{selectedReportView.batchRef}</span>
              </div>
              <div className="flex justify-between py-1 border-b" style={{ borderColor: 'var(--border)' }}>
                <span className="text-secondary">Certified Auditor:</span>
                <span className="font-semibold">{selectedReportView.auditor}</span>
              </div>
              <div className="flex justify-between py-1 border-b" style={{ borderColor: 'var(--border)' }}>
                <span className="text-secondary">Verified Signatures:</span>
                <span className="font-bold text-success">{selectedReportView.valid} (Accuracy: {selectedReportView.validRate})</span>
              </div>
              <div className="flex justify-between py-1 border-b" style={{ borderColor: 'var(--border)' }}>
                <span className="text-secondary">Invalid Signatures:</span>
                <span className="font-bold text-error">{selectedReportView.invalid} Defective</span>
              </div>
              <div className="flex justify-between py-1 border-b" style={{ borderColor: 'var(--border)' }}>
                <span className="text-secondary">Commission Payout Authorized:</span>
                <span className="font-bold text-primary">{selectedReportView.payoutApproved}</span>
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-3 border-t" style={{ borderColor: 'var(--border)' }}>
              <button
                onClick={() => {
                  handleShareReport(selectedReportView);
                  setSelectedReportView(null);
                }}
                className="px-4 py-2 rounded-xl text-xs font-semibold cursor-pointer border flex items-center gap-1.5"
                style={{ backgroundColor: 'var(--surface-secondary)', color: 'var(--text-primary)', borderColor: 'var(--border)' }}
              >
                <Share2 className="w-3.5 h-3.5" /> Share Summary
              </button>
              <button
                onClick={() => setSelectedReportView(null)}
                className="px-4 py-2 rounded-xl text-xs font-bold cursor-pointer border-none"
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
