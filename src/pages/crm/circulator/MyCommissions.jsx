import React, { useState } from 'react';
import {
  DollarSign,
  FileText,
  CheckCircle,
  Clock,
  TrendingUp,
  AlertCircle,
  Download,
  FileSpreadsheet,
  Plus,
  Search,
  Filter,
  CreditCard,
  Building2,
  Calendar,
  Award,
  Settings,
  Printer,
  Eye,
  X,
  ExternalLink,
  ShieldCheck,
  Percent,
  Check,
  AlertTriangle,
  Info
} from 'lucide-react';
import { useToast } from '../../../context/ToastContext';
import { useAuth } from '../../../context/AuthContext';

export const MyCommissions = () => {
  const { addToast } = useToast();
  const { crmUser } = useAuth();

  // Active Tab
  const [activeTab, setActiveTab] = useState('dashboard'); // 'dashboard' | 'track' | 'management' | 'bonuses' | 'validity' | 'payment'

  // ----------------------------------------------------
  // 5.1 MY PAY DASHBOARD DATA
  // ----------------------------------------------------
  const summaryKPIs = {
    totalEarningsYTD: '$14,245.50',
    pendingCommissions: '$1,420.00',
    paidCommissions: '$12,825.50',
    activeBonusesEarned: '$650.00',
    nextPayoutDate: 'Oct 15, 2026',
    signaturesAudited: '4,150',
    overallValidRate: '93.2%'
  };

  // ----------------------------------------------------
  // 5.2 TRACK COMMISSIONS DATA & STATE
  // ----------------------------------------------------
  const [commissionSearch, setCommissionSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedCommissionDetail, setSelectedCommissionDetail] = useState(null);

  const [commissions, setCommissions] = useState([
    {
      id: 'PAY-1049',
      date: 'Oct 01, 2026',
      project: 'Prop 12 - Clean Energy',
      sourceType: 'Petition Signature Drive',
      signatures: 245,
      valid: 220,
      invalid: 25,
      rate: '$3.50/sig',
      basePay: '$770.00',
      bonus: '$50.00 (Speed Tier)',
      clawback: '$0.00',
      total: '$820.00',
      status: 'Paid',
      paymentMethod: 'ADP Direct Deposit',
      disbursementDate: 'Oct 03, 2026'
    },
    {
      id: 'PAY-1038',
      date: 'Sep 15, 2026',
      project: 'Local Mayor Petition',
      sourceType: 'City Election Drive',
      signatures: 180,
      valid: 162,
      invalid: 18,
      rate: '$2.00/sig',
      basePay: '$324.00',
      bonus: '$0.00',
      clawback: '$0.00',
      total: '$324.00',
      status: 'Paid',
      paymentMethod: 'ADP Direct Deposit',
      disbursementDate: 'Sep 18, 2026'
    },
    {
      id: 'PAY-1055',
      date: 'Oct 10, 2026',
      project: 'Education Bond Measure',
      sourceType: 'Public Transit Campaign',
      signatures: 120,
      valid: 105,
      invalid: 15,
      rate: '$4.00/sig',
      basePay: '$420.00',
      bonus: '$0.00',
      clawback: '$0.00',
      total: '$420.00',
      status: 'Pending Audit',
      paymentMethod: 'Queued for Next Cycle',
      disbursementDate: 'Estimated Oct 15, 2026'
    },
    {
      id: 'PAY-1058',
      date: 'Oct 08, 2026',
      project: 'Housing Initiative Measure',
      sourceType: 'Campus Weekend Blitz',
      signatures: 260,
      valid: 240,
      invalid: 20,
      rate: '$3.75/sig',
      basePay: '$900.00',
      bonus: '$100.00 (Weekend Bonus)',
      clawback: '$0.00',
      total: '$1,000.00',
      status: 'Approved',
      paymentMethod: 'ACH Batch Ready',
      disbursementDate: 'Processing Oct 15, 2026'
    }
  ]);

  // ----------------------------------------------------
  // 5.3 & 5.4 COMMISSION MANAGEMENT & PLAN MAKER STATE
  // ----------------------------------------------------
  const [commissionPlans, setCommissionPlans] = useState([
    {
      id: 'PLAN-1',
      name: 'Standard Circulator Tier',
      type: 'Tiered per Valid Signature',
      baseRate: '$3.00/sig',
      bonusThreshold: '+$0.50 after 500 sigs',
      eligibility: 'Min 85% valid rate required',
      effectiveDate: 'Active (Q4 2026)',
      status: 'Active'
    },
    {
      id: 'PLAN-2',
      name: 'Weekend Blitz Accelerated Plan',
      type: 'Volume Incentive',
      baseRate: '$5.00/sig',
      bonusThreshold: 'Flat $100 bonus on 50+ sigs/day',
      eligibility: 'Weekend shift registration only',
      effectiveDate: 'Active',
      status: 'Active'
    },
    {
      id: 'PLAN-3',
      name: 'Supervisor / Manager Override Plan',
      type: 'Gross Revenue Percentage',
      baseRate: '10% of field gross',
      bonusThreshold: '+$250 team milestone',
      eligibility: 'Appointed Team Leaders only',
      effectiveDate: 'Active',
      status: 'Active'
    }
  ]);

  const [isPlanMakerModalOpen, setIsPlanMakerModalOpen] = useState(false);
  const [newPlanForm, setNewPlanForm] = useState({
    name: '',
    type: 'Tiered per Valid Signature',
    baseRate: '',
    bonusThreshold: '',
    eligibility: '',
    status: 'Active'
  });

  // ----------------------------------------------------
  // 5.5 BONUS MANAGEMENT DATA & STATE
  // ----------------------------------------------------
  const [bonuses, setBonuses] = useState([
    {
      id: 'BON-1',
      name: '1,000 Signature Month Milestone',
      amount: '$250.00',
      eligibility: 'Gather 1,000 valid signatures in a calendar month',
      status: 'Active Campaign',
      deadline: 'Oct 31, 2026',
      progress: '840 / 1,000 (84%)'
    },
    {
      id: 'BON-2',
      name: 'High Quality 95%+ Accuracy Streak',
      amount: '$150.00',
      eligibility: 'Maintain 95% or greater voter match rate on 3 consecutive batches',
      status: 'Earned & Queued',
      deadline: 'Ongoing',
      progress: 'Completed (Batch #8084, #8091, #8092)'
    },
    {
      id: 'BON-3',
      name: 'Saturday Farmers Market Blitz Incentive',
      amount: '$100.00',
      eligibility: 'Turn in 60+ verified signatures during Saturday morning shift',
      status: 'Upcoming Saturday',
      deadline: 'Oct 11, 2026',
      progress: 'Opens this Saturday'
    }
  ]);

  const [isCreateBonusModalOpen, setIsCreateBonusModalOpen] = useState(false);
  const [newBonusForm, setNewBonusForm] = useState({
    name: '',
    amount: '',
    eligibility: '',
    deadline: ''
  });

  // ----------------------------------------------------
  // 5.6 VALIDITY REPORTS DATA & STATE
  // ----------------------------------------------------
  const [validitySearch, setValiditySearch] = useState('');
  const [selectedValidityReport, setSelectedValidityReport] = useState(null);

  const validityAuditBatches = [
    {
      batchId: 'BATCH-8092',
      date: 'Oct 05, 2026',
      project: 'Prop 12 - Clean Energy',
      claimed: 145,
      valid: 132,
      invalid: 13,
      validRate: '91.0%',
      commissionImpact: 'Full Payout Approved ($462.00)',
      auditor: 'Lead Auditor Vance',
      status: 'Passed Quality Threshold'
    },
    {
      batchId: 'BATCH-8091',
      date: 'Oct 04, 2026',
      project: 'Local Mayor Petition',
      claimed: 82,
      valid: 78,
      invalid: 4,
      validRate: '95.1%',
      commissionImpact: 'Full Payout Approved ($156.00)',
      auditor: 'Auditor Beta',
      status: 'Passed Quality Threshold'
    },
    {
      batchId: 'BATCH-8088',
      date: 'Oct 04, 2026',
      project: 'Education Bond Measure',
      claimed: 210,
      valid: 175,
      invalid: 35,
      validRate: '83.3%',
      commissionImpact: 'Audit Hold Applied (Pending Clerk Check)',
      auditor: 'Forensics Desk',
      status: 'Under Review'
    }
  ];

  // ----------------------------------------------------
  // 5.7 BANK AND PAYMENT INTERFACE STATE
  // ----------------------------------------------------
  const [selectedPaymentProvider, setSelectedPaymentProvider] = useState('adp'); // 'adp' | 'ach' | 'check' | 'stripe'
  const [isInitiatePayoutModalOpen, setIsInitiatePayoutModalOpen] = useState(false);
  const [payoutForm, setPayoutForm] = useState({
    recipient: 'Current Circulator Account',
    amount: '420.00',
    referenceBatch: 'BATCH-8092',
    memo: 'Bi-weekly field commission cycle'
  });

  const transactionHistory = [
    {
      id: 'TXN-9982',
      date: 'Oct 03, 2026',
      amount: '$820.00',
      provider: 'ADP Workforce Now Direct Deposit',
      recipient: 'Primary Account (Ending in •••• 4892)',
      status: 'Settled & Paid',
      memo: 'PAY-1049 Shift Compensation'
    },
    {
      id: 'TXN-9941',
      date: 'Sep 18, 2026',
      amount: '$324.00',
      provider: 'ADP Workforce Now Direct Deposit',
      recipient: 'Primary Account (Ending in •••• 4892)',
      status: 'Settled & Paid',
      memo: 'PAY-1038 Shift Compensation'
    },
    {
      id: 'TXN-9910',
      date: 'Sep 03, 2026',
      amount: '$950.00',
      provider: 'ADP Workforce Now Direct Deposit',
      recipient: 'Primary Account (Ending in •••• 4892)',
      status: 'Settled & Paid',
      memo: 'August End-of-Month Performance Bonus'
    }
  ];

  // ----------------------------------------------------
  // HANDLERS
  // ----------------------------------------------------
  const handleCreatePlan = (e) => {
    e.preventDefault();
    if (!newPlanForm.name.trim() || !newPlanForm.baseRate.trim()) {
      addToast({ title: 'Validation Error', message: 'Plan name and base rate are required.', type: 'error' });
      return;
    }

    const created = {
      id: `PLAN-${commissionPlans.length + 1}`,
      name: newPlanForm.name.trim(),
      type: newPlanForm.type,
      baseRate: newPlanForm.baseRate.trim(),
      bonusThreshold: newPlanForm.bonusThreshold || 'Standard tier',
      eligibility: newPlanForm.eligibility || 'All active gatherers',
      effectiveDate: 'Active',
      status: 'Active'
    };

    setCommissionPlans([...commissionPlans, created]);
    setIsPlanMakerModalOpen(false);
    setNewPlanForm({ name: '', type: 'Tiered per Valid Signature', baseRate: '', bonusThreshold: '', eligibility: '', status: 'Active' });

    addToast({
      title: 'Commission Plan Created',
      message: `Plan "${created.name}" is now available for circulator assignments.`,
      type: 'success'
    });
  };

  const handleCreateBonus = (e) => {
    e.preventDefault();
    if (!newBonusForm.name.trim() || !newBonusForm.amount.trim()) {
      addToast({ title: 'Validation Error', message: 'Bonus name and amount are required.', type: 'error' });
      return;
    }

    const created = {
      id: `BON-${bonuses.length + 1}`,
      name: newBonusForm.name.trim(),
      amount: newBonusForm.amount.startsWith('$') ? newBonusForm.amount : `$${newBonusForm.amount}`,
      eligibility: newBonusForm.eligibility || 'Goal completion',
      status: 'Active Campaign',
      deadline: newBonusForm.deadline || 'End of Campaign',
      progress: '0% completed'
    };

    setBonuses([...bonuses, created]);
    setIsCreateBonusModalOpen(false);
    setNewBonusForm({ name: '', amount: '', eligibility: '', deadline: '' });

    addToast({
      title: 'Bonus Incentive Published',
      message: `Bonus "${created.name}" has been configured.`,
      type: 'success'
    });
  };

  const handleConfirmPayout = (e) => {
    e.preventDefault();
    addToast({
      title: 'Payout Staged (UI Phase)',
      message: `Disbursement of $${payoutForm.amount} queued for ${selectedPaymentProvider.toUpperCase()} processing batch. No actual bank transfer executed.`,
      type: 'info'
    });
    setIsInitiatePayoutModalOpen(false);
  };

  const handlePrintStatement = () => {
    window.print();
  };

  return (
    <div className="h-full flex flex-col overflow-hidden" style={{ backgroundColor: 'var(--background)', color: 'var(--text-primary)' }}>
      {/* ---------------------------------------------------- */}
      {/* HEADER & PORTAL NAVIGATION */}
      {/* ---------------------------------------------------- */}
      <div className="p-4 sm:p-6 shrink-0 print:hidden" style={{ backgroundColor: 'var(--surface)', borderBottom: '1px solid var(--border)' }}>
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl shadow-sm" style={{ backgroundColor: 'var(--success-light)', color: 'var(--success)' }}>
                <DollarSign className="w-6 h-6" />
              </div>
              <div>
                <h1 className="text-xl sm:text-2xl font-extrabold m-0" style={{ color: 'var(--text-primary)' }}>
                  My Pay Portal Dashboard
                </h1>
                <p className="mt-0.5 text-xs sm:text-sm m-0" style={{ color: 'var(--text-secondary)' }}>
                  Track earnings, review tiered commission statements, manage performance plans, and supervise ADP payroll payouts.
                </p>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrintStatement}
              className="flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold border cursor-pointer transition-colors"
              style={{ backgroundColor: 'var(--surface-secondary)', borderColor: 'var(--border)', color: 'var(--text-secondary)' }}
            >
              <Printer className="w-4 h-4" /> Print Statement
            </button>
            <button
              onClick={() => setIsInitiatePayoutModalOpen(true)}
              className="flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold transition-all shadow-sm cursor-pointer border-none"
              style={{ backgroundColor: 'var(--info)', color: 'var(--text-on-primary)' }}
            >
              <CreditCard className="w-4 h-4" /> Payout Settings & ACH
            </button>
          </div>
        </div>

        {/* Tab Strip */}
        <div className="flex items-center gap-2 mt-4 pt-4 overflow-x-auto" style={{ borderTop: '1px solid var(--border)' }}>
          {[
            { id: 'dashboard', label: 'My Pay Dashboard', icon: DollarSign },
            { id: 'track', label: 'Track Commissions', icon: FileSpreadsheet, badge: commissions.length },
            { id: 'management', label: 'Commission Plans', icon: Settings },
            { id: 'bonuses', label: 'Bonus Management', icon: Award, badge: bonuses.length },
            { id: 'validity', label: 'Validity Reports', icon: ShieldCheck },
            { id: 'payment', label: 'Bank & Payouts (ADP)', icon: Building2 }
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
                {tab.badge !== undefined && (
                  <span
                    className="px-1.5 py-0.2 rounded-full text-[10px] font-bold"
                    style={{
                      backgroundColor: isActive ? 'rgba(255,255,255,0.25)' : 'var(--border)',
                      color: isActive ? '#fff' : 'var(--text-secondary)'
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
      {/* 5.1 MY PAY DASHBOARD TAB */}
      {/* ---------------------------------------------------- */}
      {activeTab === 'dashboard' && (
        <div className="flex-1 overflow-y-auto p-4 sm:p-6">
          <div className="max-w-7xl mx-auto space-y-6">
            {/* KPI Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="p-5 rounded-2xl border shadow-sm" style={{ backgroundColor: 'var(--surface)', borderColor: 'var(--border)' }}>
                <span className="text-xs uppercase font-bold text-secondary tracking-wider">Total Earnings (YTD)</span>
                <h3 className="text-3xl font-black mt-1 mb-1 m-0" style={{ color: 'var(--success)' }}>
                  {summaryKPIs.totalEarningsYTD}
                </h3>
                <span className="text-xs text-secondary flex items-center gap-1">
                  <TrendingUp className="w-3.5 h-3.5 text-success" /> +15.2% from prior period
                </span>
              </div>

              <div className="p-5 rounded-2xl border shadow-sm" style={{ backgroundColor: 'var(--surface)', borderColor: 'var(--border)' }}>
                <span className="text-xs uppercase font-bold text-secondary tracking-wider">Pending Commissions</span>
                <h3 className="text-3xl font-black mt-1 mb-1 m-0" style={{ color: 'var(--warning)' }}>
                  {summaryKPIs.pendingCommissions}
                </h3>
                <span className="text-xs text-secondary flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-warning" /> Awaiting validation audit
                </span>
              </div>

              <div className="p-5 rounded-2xl border shadow-sm" style={{ backgroundColor: 'var(--surface)', borderColor: 'var(--border)' }}>
                <span className="text-xs uppercase font-bold text-secondary tracking-wider">Paid Commissions</span>
                <h3 className="text-3xl font-black mt-1 mb-1 m-0" style={{ color: 'var(--info)' }}>
                  {summaryKPIs.paidCommissions}
                </h3>
                <span className="text-xs text-secondary flex items-center gap-1">
                  <CheckCircle className="w-3.5 h-3.5 text-info" /> Disbursed via ADP Payroll
                </span>
              </div>

              <div className="p-5 rounded-2xl border shadow-sm" style={{ backgroundColor: 'var(--surface)', borderColor: 'var(--border)' }}>
                <span className="text-xs uppercase font-bold text-secondary tracking-wider">Earned Bonuses</span>
                <h3 className="text-3xl font-black mt-1 mb-1 m-0" style={{ color: 'var(--primary)' }}>
                  {summaryKPIs.activeBonusesEarned}
                </h3>
                <span className="text-xs text-secondary flex items-center gap-1">
                  <Award className="w-3.5 h-3.5 text-primary" /> Speed & accuracy incentives
                </span>
              </div>
            </div>

            {/* Next Payout & Validity Summary */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="p-5 rounded-2xl border md:col-span-2 shadow-sm" style={{ backgroundColor: 'var(--surface)', borderColor: 'var(--border)' }}>
                <div className="flex items-center justify-between mb-4 pb-3 border-b" style={{ borderColor: 'var(--border)' }}>
                  <div>
                    <h3 className="text-sm font-bold m-0" style={{ color: 'var(--text-primary)' }}>Next Expected Payout Batch</h3>
                    <p className="text-xs text-secondary mt-0.5 m-0">Direct deposit scheduled via ADP Workforce Now integration.</p>
                  </div>
                  <span className="text-xs font-mono font-bold px-3 py-1 rounded-full border text-info" style={{ backgroundColor: 'var(--info-light)', borderColor: 'var(--info-border)' }}>
                    Cycle: {summaryKPIs.nextPayoutDate}
                  </span>
                </div>

                <div className="grid grid-cols-3 gap-4 text-center">
                  <div className="p-3 rounded-xl" style={{ backgroundColor: 'var(--surface-secondary)' }}>
                    <span className="text-[10px] uppercase font-bold text-secondary">Verified Signatures</span>
                    <p className="text-xl font-bold mt-1 m-0" style={{ color: 'var(--text-primary)' }}>{summaryKPIs.signaturesAudited}</p>
                  </div>
                  <div className="p-3 rounded-xl" style={{ backgroundColor: 'var(--surface-secondary)' }}>
                    <span className="text-[10px] uppercase font-bold text-secondary">Voter Match Rate</span>
                    <p className="text-xl font-bold text-success mt-1 m-0">{summaryKPIs.overallValidRate}</p>
                  </div>
                  <div className="p-3 rounded-xl" style={{ backgroundColor: 'var(--surface-secondary)' }}>
                    <span className="text-[10px] uppercase font-bold text-secondary">Estimated Net Payout</span>
                    <p className="text-xl font-bold text-primary mt-1 m-0">{summaryKPIs.pendingCommissions}</p>
                  </div>
                </div>
              </div>

              <div className="p-5 rounded-2xl border flex flex-col justify-between shadow-sm" style={{ backgroundColor: 'var(--surface)', borderColor: 'var(--border)' }}>
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <Building2 className="w-5 h-5 text-info" />
                    <h3 className="text-sm font-bold m-0">ADP Direct Deposit Status</h3>
                  </div>
                  <p className="text-xs text-secondary leading-relaxed m-0">
                    Your banking connection is verified. Statements and year-to-date 1099 tax summaries are generated upon cycle close.
                  </p>
                </div>

                <button
                  onClick={() => setActiveTab('payment')}
                  className="w-full mt-4 py-2.5 rounded-xl text-xs font-bold border transition-colors cursor-pointer"
                  style={{ backgroundColor: 'var(--surface-secondary)', borderColor: 'var(--border)', color: 'var(--text-primary)' }}
                >
                  Manage Payment Method &rarr;
                </button>
              </div>
            </div>

            {/* Recent Payout Table */}
            <div className="rounded-2xl border shadow-sm overflow-hidden" style={{ backgroundColor: 'var(--surface)', borderColor: 'var(--border)' }}>
              <div className="p-4 sm:p-5 flex items-center justify-between border-b" style={{ borderColor: 'var(--border)', backgroundColor: 'var(--surface-secondary)' }}>
                <h3 className="text-sm font-bold m-0">Recent Commission Statements</h3>
                <button
                  onClick={() => setActiveTab('track')}
                  className="text-xs font-bold text-info border-none bg-transparent cursor-pointer"
                >
                  View All Statements &rarr;
                </button>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs" style={{ borderCollapse: 'collapse' }}>
                  <thead style={{ backgroundColor: 'var(--surface-secondary)', borderBottom: '1px solid var(--border)' }}>
                    <tr>
                      <th className="p-3.5 font-semibold text-secondary uppercase">Payout ID</th>
                      <th className="p-3.5 font-semibold text-secondary uppercase">Project Campaign</th>
                      <th className="p-3.5 font-semibold text-secondary uppercase">Signatures (Valid / Total)</th>
                      <th className="p-3.5 font-semibold text-secondary uppercase">Rate</th>
                      <th className="p-3.5 font-semibold text-secondary uppercase">Total Payout</th>
                      <th className="p-3.5 font-semibold text-secondary uppercase text-right">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {commissions.slice(0, 3).map((item) => (
                      <tr key={item.id} style={{ borderBottom: '1px solid var(--border)' }}>
                        <td className="p-3.5 font-mono font-bold" style={{ color: 'var(--info)' }}>{item.id}</td>
                        <td className="p-3.5">
                          <div className="font-bold">{item.project}</div>
                          <span className="text-[10px] text-tertiary">{item.date}</span>
                        </td>
                        <td className="p-3.5">
                          <span className="font-bold text-success">{item.valid}</span> / {item.signatures}
                        </td>
                        <td className="p-3.5 text-secondary">{item.rate}</td>
                        <td className="p-3.5 font-extrabold text-primary">{item.total}</td>
                        <td className="p-3.5 text-right">
                          <span
                            className="px-2.5 py-1 rounded-full text-[10px] font-bold border"
                            style={{
                              backgroundColor: item.status === 'Paid' ? 'var(--success-light)' : 'var(--warning-light)',
                              borderColor: item.status === 'Paid' ? 'var(--success-border)' : 'var(--warning-border)',
                              color: item.status === 'Paid' ? 'var(--success)' : 'var(--warning)'
                            }}
                          >
                            {item.status}
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
      {/* 5.2 TRACK COMMISSIONS TAB */}
      {/* ---------------------------------------------------- */}
      {activeTab === 'track' && (
        <div className="flex-1 overflow-y-auto p-4 sm:p-6">
          <div className="max-w-7xl mx-auto space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-lg font-bold m-0" style={{ color: 'var(--text-primary)' }}>Commission Records & Statements</h2>
                <p className="text-xs text-secondary mt-0.5 m-0">Detailed breakdown of gross signatures, quality audit rates, and net disbursements.</p>
              </div>

              <div className="flex items-center gap-3">
                <div className="relative">
                  <Search className="w-4 h-4 absolute text-tertiary" style={{ left: 12, top: '50%', transform: 'translateY(-50%)' }} />
                  <input
                    type="text"
                    value={commissionSearch}
                    onChange={(e) => setCommissionSearch(e.target.value)}
                    placeholder="Search payout ID or project..."
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
                  <option value="Paid">Paid</option>
                  <option value="Pending Audit">Pending Audit</option>
                  <option value="Approved">Approved</option>
                </select>
              </div>
            </div>

            {/* Commissions Table */}
            <div className="rounded-2xl border shadow-sm overflow-hidden" style={{ backgroundColor: 'var(--surface)', borderColor: 'var(--border)' }}>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs" style={{ borderCollapse: 'collapse' }}>
                  <thead style={{ backgroundColor: 'var(--surface-secondary)', borderBottom: '1px solid var(--border)' }}>
                    <tr>
                      <th className="p-3.5 font-semibold text-secondary uppercase">Statement ID</th>
                      <th className="p-3.5 font-semibold text-secondary uppercase">Project & Source</th>
                      <th className="p-3.5 font-semibold text-secondary uppercase">Signatures (Valid / Total)</th>
                      <th className="p-3.5 font-semibold text-secondary uppercase">Rate Calculation</th>
                      <th className="p-3.5 font-semibold text-secondary uppercase">Net Amount</th>
                      <th className="p-3.5 font-semibold text-secondary uppercase">Status</th>
                      <th className="p-3.5 font-semibold text-secondary uppercase text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {commissions
                      .filter((c) => {
                        if (statusFilter !== 'all' && c.status !== statusFilter) return false;
                        if (commissionSearch.trim()) {
                          const q = commissionSearch.toLowerCase();
                          return c.id.toLowerCase().includes(q) || c.project.toLowerCase().includes(q);
                        }
                        return true;
                      })
                      .map((c) => (
                        <tr key={c.id} style={{ borderBottom: '1px solid var(--border)' }}>
                          <td className="p-3.5 font-mono font-bold" style={{ color: 'var(--info)' }}>{c.id}</td>
                          <td className="p-3.5">
                            <div className="font-bold">{c.project}</div>
                            <span className="text-[10px] text-tertiary">{c.sourceType} • {c.date}</span>
                          </td>
                          <td className="p-3.5">
                            <span className="font-bold text-success">{c.valid}</span> / {c.signatures}
                            <span className="text-[10px] text-error block">-{c.invalid} rejected</span>
                          </td>
                          <td className="p-3.5">
                            <span className="font-semibold">{c.rate}</span>
                            {c.bonus !== '$0.00' && <span className="text-[10px] text-info block font-bold">+{c.bonus}</span>}
                          </td>
                          <td className="p-3.5 font-extrabold text-sm text-primary">{c.total}</td>
                          <td className="p-3.5">
                            <span
                              className="px-2.5 py-1 rounded-full text-[10px] font-bold border"
                              style={{
                                backgroundColor: c.status === 'Paid' ? 'var(--success-light)' : 'var(--warning-light)',
                                borderColor: c.status === 'Paid' ? 'var(--success-border)' : 'var(--warning-border)',
                                color: c.status === 'Paid' ? 'var(--success)' : 'var(--warning)'
                              }}
                            >
                              {c.status}
                            </span>
                          </td>
                          <td className="p-3.5 text-right">
                            <button
                              onClick={() => setSelectedCommissionDetail(c)}
                              className="px-3 py-1.5 rounded-lg text-xs font-semibold border cursor-pointer transition-colors"
                              style={{ backgroundColor: 'var(--surface-secondary)', borderColor: 'var(--border)', color: 'var(--text-primary)' }}
                            >
                              View PDF Statement
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
      {/* 5.3 & 5.4 COMMISSION MANAGEMENT & PLAN MAKER */}
      {/* ---------------------------------------------------- */}
      {activeTab === 'management' && (
        <div className="flex-1 overflow-y-auto p-4 sm:p-6">
          <div className="max-w-6xl mx-auto space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-lg font-bold m-0" style={{ color: 'var(--text-primary)' }}>Commission Plans & Tier Configurations</h2>
                <p className="text-xs text-secondary mt-0.5 m-0">Management-facing rate creator, tier thresholds, and circulator payout formulas.</p>
              </div>

              <button
                onClick={() => setIsPlanMakerModalOpen(true)}
                className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold border-none shadow-sm cursor-pointer"
                style={{ backgroundColor: 'var(--info)', color: 'var(--text-on-primary)' }}
              >
                <Plus className="w-4 h-4" /> Create Commission Plan
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {commissionPlans.map((plan) => (
                <div
                  key={plan.id}
                  className="p-5 rounded-2xl border flex flex-col justify-between shadow-sm"
                  style={{ backgroundColor: 'var(--surface)', borderColor: 'var(--border)' }}
                >
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[10px] uppercase font-bold tracking-wider font-mono text-info">{plan.id}</span>
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500/10 text-emerald-500">{plan.status}</span>
                    </div>

                    <h3 className="text-base font-bold mb-1 m-0" style={{ color: 'var(--text-primary)' }}>{plan.name}</h3>
                    <p className="text-xs text-secondary mb-4 m-0">{plan.type}</p>

                    <div className="space-y-2 py-3 border-t border-b text-xs" style={{ borderColor: 'var(--border)' }}>
                      <div className="flex justify-between">
                        <span className="text-secondary">Base Rate:</span>
                        <span className="font-bold text-primary">{plan.baseRate}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-secondary">Bonus Tier:</span>
                        <span className="font-semibold text-info">{plan.bonusThreshold}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-secondary">Eligibility:</span>
                        <span className="text-[11px] text-tertiary">{plan.eligibility}</span>
                      </div>
                    </div>
                  </div>

                  <div className="pt-4 flex items-center justify-between text-xs">
                    <span className="text-[11px] text-secondary">{plan.effectiveDate}</span>
                    <button
                      onClick={() => {
                        addToast({ title: 'Plan Active', message: `Plan "${plan.name}" is bound to field operations.`, type: 'info' });
                      }}
                      className="text-xs font-bold text-info border-none bg-transparent cursor-pointer"
                    >
                      Inspect Rules &rarr;
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ---------------------------------------------------- */}
      {/* 5.5 BONUS MANAGEMENT TAB */}
      {/* ---------------------------------------------------- */}
      {activeTab === 'bonuses' && (
        <div className="flex-1 overflow-y-auto p-4 sm:p-6">
          <div className="max-w-6xl mx-auto space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-lg font-bold m-0" style={{ color: 'var(--text-primary)' }}>Performance Bonus Incentives</h2>
                <p className="text-xs text-secondary mt-0.5 m-0">Speed blitzes, accuracy streaks, and monthly volume bonus qualifications.</p>
              </div>

              <button
                onClick={() => setIsCreateBonusModalOpen(true)}
                className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold border-none shadow-sm cursor-pointer"
                style={{ backgroundColor: 'var(--info)', color: 'var(--text-on-primary)' }}
              >
                <Plus className="w-4 h-4" /> Create Bonus Incentive
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {bonuses.map((bon) => (
                <div
                  key={bon.id}
                  className="p-5 rounded-2xl border shadow-sm flex flex-col justify-between"
                  style={{ backgroundColor: 'var(--surface)', borderColor: 'var(--border)' }}
                >
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[10px] font-bold uppercase tracking-wider font-mono text-secondary">{bon.id}</span>
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold" style={{ backgroundColor: 'var(--info-light)', color: 'var(--info)' }}>
                        {bon.status}
                      </span>
                    </div>

                    <h3 className="text-base font-bold mb-1 m-0" style={{ color: 'var(--text-primary)' }}>{bon.name}</h3>
                    <div className="text-2xl font-black text-success my-2">{bon.amount}</div>
                    <p className="text-xs text-secondary leading-relaxed mb-4 m-0">{bon.eligibility}</p>
                  </div>

                  <div className="pt-3 border-t text-xs" style={{ borderColor: 'var(--border)' }}>
                    <div className="flex justify-between text-[11px] mb-1">
                      <span className="text-secondary">Progress / Standing:</span>
                      <span className="font-bold text-primary">{bon.progress}</span>
                    </div>
                    <span className="text-[10px] text-tertiary">Deadline: {bon.deadline}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ---------------------------------------------------- */}
      {/* 5.6 VALIDITY REPORTS & AUDIT BREAKDOWN */}
      {/* ---------------------------------------------------- */}
      {activeTab === 'validity' && (
        <div className="flex-1 overflow-y-auto p-4 sm:p-6">
          <div className="max-w-6xl mx-auto space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-lg font-bold m-0" style={{ color: 'var(--text-primary)' }}>Validity Audits & Commission Clawbacks</h2>
                <p className="text-xs text-secondary mt-0.5 m-0">Verification rate metrics determining authorized payout eligibility.</p>
              </div>

              <div className="relative">
                <Search className="w-4 h-4 absolute text-tertiary" style={{ left: 12, top: '50%', transform: 'translateY(-50%)' }} />
                <input
                  type="text"
                  value={validitySearch}
                  onChange={(e) => setValiditySearch(e.target.value)}
                  placeholder="Search batch..."
                  className="text-xs rounded-xl py-2 pl-9 pr-3 focus:outline-none"
                  style={{ backgroundColor: 'var(--surface)', color: 'var(--text-primary)', border: '1px solid var(--border)' }}
                />
              </div>
            </div>

            <div className="rounded-2xl border shadow-sm overflow-hidden" style={{ backgroundColor: 'var(--surface)', borderColor: 'var(--border)' }}>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs" style={{ borderCollapse: 'collapse' }}>
                  <thead style={{ backgroundColor: 'var(--surface-secondary)', borderBottom: '1px solid var(--border)' }}>
                    <tr>
                      <th className="p-3.5 font-semibold text-secondary uppercase">Batch</th>
                      <th className="p-3.5 font-semibold text-secondary uppercase">Project & Date</th>
                      <th className="p-3.5 font-semibold text-secondary uppercase">Valid / Total Sigs</th>
                      <th className="p-3.5 font-semibold text-secondary uppercase">Accuracy Rate</th>
                      <th className="p-3.5 font-semibold text-secondary uppercase">Commission Impact</th>
                      <th className="p-3.5 font-semibold text-secondary uppercase text-right">Audit Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {validityAuditBatches
                      .filter((v) => v.batchId.toLowerCase().includes(validitySearch.toLowerCase()) || v.project.toLowerCase().includes(validitySearch.toLowerCase()))
                      .map((v) => (
                        <tr key={v.batchId} style={{ borderBottom: '1px solid var(--border)' }}>
                          <td className="p-3.5 font-mono font-bold" style={{ color: 'var(--info)' }}>{v.batchId}</td>
                          <td className="p-3.5">
                            <div className="font-bold">{v.project}</div>
                            <span className="text-[10px] text-tertiary">{v.date}</span>
                          </td>
                          <td className="p-3.5">
                            <span className="font-bold text-success">{v.valid}</span> / {v.claimed}
                            <span className="text-[10px] text-error block">-{v.invalid} bad</span>
                          </td>
                          <td className="p-3.5 font-bold text-info">{v.validRate}</td>
                          <td className="p-3.5 font-semibold" style={{ color: 'var(--text-primary)' }}>{v.commissionImpact}</td>
                          <td className="p-3.5 text-right">
                            <span
                              className="px-2.5 py-1 rounded-full text-[10px] font-bold border"
                              style={{
                                backgroundColor: v.status.includes('Passed') ? 'var(--success-light)' : 'var(--warning-light)',
                                borderColor: v.status.includes('Passed') ? 'var(--success-border)' : 'var(--warning-border)',
                                color: v.status.includes('Passed') ? 'var(--success)' : 'var(--warning)'
                              }}
                            >
                              {v.status}
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
      {/* 5.7 BANK AND PAYMENT INTERFACE (ADP INTEGRATION) */}
      {/* ---------------------------------------------------- */}
      {activeTab === 'payment' && (
        <div className="flex-1 overflow-y-auto p-4 sm:p-6">
          <div className="max-w-5xl mx-auto space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-lg font-bold m-0" style={{ color: 'var(--text-primary)' }}>Payout Disbursement Interface</h2>
                <p className="text-xs text-secondary mt-0.5 m-0">Synchronize field payments with corporate payroll channels and ADP Workforce.</p>
              </div>

              <span className="px-2.5 py-1 rounded-md text-[10px] uppercase font-bold tracking-wider bg-emerald-500/10 text-emerald-500 border border-emerald-500/20">
                ADP Integration Active
              </span>
            </div>

            {/* Provider Selector */}
            <div className="p-5 rounded-2xl border" style={{ backgroundColor: 'var(--surface)', borderColor: 'var(--border)' }}>
              <h3 className="text-xs uppercase font-bold text-secondary mb-3">Select Payout Channel</h3>
              <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
                {[
                  { id: 'adp', label: 'ADP Direct Deposit', desc: 'Auto-sync with W-2 / 1099 payroll' },
                  { id: 'ach', label: 'Direct ACH Transfer', desc: 'Standard 2-day bank clearing' },
                  { id: 'stripe', label: 'Stripe Instant Connect', desc: 'Debit push disbursement' },
                  { id: 'check', label: 'Physical Paper Check', desc: 'HQ physical pickup' }
                ].map((prov) => {
                  const isSel = selectedPaymentProvider === prov.id;
                  return (
                    <div
                      key={prov.id}
                      onClick={() => setSelectedPaymentProvider(prov.id)}
                      className="p-3.5 rounded-xl border cursor-pointer transition-all"
                      style={{
                        backgroundColor: isSel ? 'var(--info-light)' : 'var(--surface-secondary)',
                        borderColor: isSel ? 'var(--info)' : 'var(--border)'
                      }}
                    >
                      <span className="text-xs font-bold block" style={{ color: isSel ? 'var(--info)' : 'var(--text-primary)' }}>
                        {prov.label}
                      </span>
                      <span className="text-[10px] text-tertiary mt-1 block">{prov.desc}</span>
                    </div>
                  );
                })}
              </div>

              <div className="mt-4 p-3 rounded-xl border flex items-center gap-3" style={{ backgroundColor: 'var(--surface-secondary)', borderColor: 'var(--border)' }}>
                <Info className="w-4 h-4 text-info shrink-0" />
                <p className="text-xs text-secondary m-0">
                  <strong>Secure Banking Protocol:</strong> Banking routing numbers and credentials are securely maintained inside the encrypted ADP portal. Payout batches are reviewed here and submitted to ADP for clearing.
                </p>
              </div>
            </div>

            {/* Payout History Ledger */}
            <div className="rounded-2xl border shadow-sm overflow-hidden" style={{ backgroundColor: 'var(--surface)', borderColor: 'var(--border)' }}>
              <div className="p-4 border-b flex items-center justify-between" style={{ borderColor: 'var(--border)', backgroundColor: 'var(--surface-secondary)' }}>
                <h3 className="text-sm font-bold m-0">Disbursement Transaction History</h3>
                <span className="text-xs text-secondary">3 completed settlements</span>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs" style={{ borderCollapse: 'collapse' }}>
                  <thead style={{ backgroundColor: 'var(--surface-secondary)', borderBottom: '1px solid var(--border)' }}>
                    <tr>
                      <th className="p-3.5 font-semibold text-secondary uppercase">Transaction Ref</th>
                      <th className="p-3.5 font-semibold text-secondary uppercase">Disbursement Date</th>
                      <th className="p-3.5 font-semibold text-secondary uppercase">Provider & Target</th>
                      <th className="p-3.5 font-semibold text-secondary uppercase">Net Amount</th>
                      <th className="p-3.5 font-semibold text-secondary uppercase text-right">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {transactionHistory.map((txn) => (
                      <tr key={txn.id} style={{ borderBottom: '1px solid var(--border)' }}>
                        <td className="p-3.5 font-mono font-bold" style={{ color: 'var(--info)' }}>{txn.id}</td>
                        <td className="p-3.5 text-secondary">{txn.date}</td>
                        <td className="p-3.5">
                          <div className="font-semibold">{txn.provider}</div>
                          <span className="text-[10px] text-tertiary">{txn.recipient}</span>
                        </td>
                        <td className="p-3.5 font-extrabold text-sm text-success">{txn.amount}</td>
                        <td className="p-3.5 text-right">
                          <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/10 text-emerald-500 border border-emerald-500/20">
                            {txn.status}
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
      {/* MODAL: STATEMENT PDF DETAIL VIEW */}
      {/* ---------------------------------------------------- */}
      {selectedCommissionDetail && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
          onClick={() => setSelectedCommissionDetail(null)}
        >
          <div
            className="w-full max-w-xl rounded-2xl p-6 border shadow-2xl space-y-4"
            style={{ backgroundColor: 'var(--surface)', borderColor: 'var(--border)', color: 'var(--text-primary)' }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-3 border-b" style={{ borderColor: 'var(--border)' }}>
              <div>
                <h3 className="text-base font-bold m-0">Statement: {selectedCommissionDetail.id}</h3>
                <span className="text-xs text-secondary">{selectedCommissionDetail.project} • {selectedCommissionDetail.date}</span>
              </div>
              <button
                onClick={() => setSelectedCommissionDetail(null)}
                className="p-1 rounded-lg text-secondary border-none bg-transparent cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-2 text-xs">
              <div className="flex justify-between py-1 border-b" style={{ borderColor: 'var(--border)' }}>
                <span className="text-secondary">Gross Claimed Signatures:</span>
                <span className="font-bold">{selectedCommissionDetail.signatures}</span>
              </div>
              <div className="flex justify-between py-1 border-b" style={{ borderColor: 'var(--border)' }}>
                <span className="text-secondary">Verified Valid Signatures:</span>
                <span className="font-bold text-success">{selectedCommissionDetail.valid}</span>
              </div>
              <div className="flex justify-between py-1 border-b" style={{ borderColor: 'var(--border)' }}>
                <span className="text-secondary">Disqualified / Invalid Signatures:</span>
                <span className="font-bold text-error">-{selectedCommissionDetail.invalid}</span>
              </div>
              <div className="flex justify-between py-1 border-b" style={{ borderColor: 'var(--border)' }}>
                <span className="text-secondary">Tiered Signature Rate:</span>
                <span className="font-semibold">{selectedCommissionDetail.rate}</span>
              </div>
              <div className="flex justify-between py-1 border-b" style={{ borderColor: 'var(--border)' }}>
                <span className="text-secondary">Base Shift Commission:</span>
                <span className="font-bold">{selectedCommissionDetail.basePay}</span>
              </div>
              {selectedCommissionDetail.bonus !== '$0.00' && (
                <div className="flex justify-between py-1 border-b" style={{ borderColor: 'var(--border)' }}>
                  <span className="text-secondary">Performance Bonus:</span>
                  <span className="font-bold text-info">+{selectedCommissionDetail.bonus}</span>
                </div>
              )}
              <div className="flex justify-between py-2 border-t text-sm font-bold" style={{ borderColor: 'var(--border)' }}>
                <span className="text-primary">Net Authorized Payout:</span>
                <span className="text-success text-base">{selectedCommissionDetail.total}</span>
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-3 border-t" style={{ borderColor: 'var(--border)' }}>
              <button
                onClick={() => {
                  window.print();
                  setSelectedCommissionDetail(null);
                }}
                className="px-4 py-2 rounded-xl text-xs font-semibold border flex items-center gap-1.5 cursor-pointer"
                style={{ backgroundColor: 'var(--surface-secondary)', color: 'var(--text-primary)', borderColor: 'var(--border)' }}
              >
                <Printer className="w-3.5 h-3.5" /> Print Statement PDF
              </button>
              <button
                onClick={() => setSelectedCommissionDetail(null)}
                className="px-5 py-2 rounded-xl text-xs font-bold border-none cursor-pointer"
                style={{ backgroundColor: 'var(--info)', color: 'var(--text-on-primary)' }}
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ---------------------------------------------------- */}
      {/* MODAL: CREATE COMMISSION PLAN */}
      {/* ---------------------------------------------------- */}
      {isPlanMakerModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
          onClick={() => setIsPlanMakerModalOpen(false)}
        >
          <form
            onSubmit={handleCreatePlan}
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-md rounded-2xl p-6 border shadow-2xl space-y-4"
            style={{ backgroundColor: 'var(--surface)', borderColor: 'var(--border)', color: 'var(--text-primary)' }}
          >
            <div className="flex items-center justify-between pb-3 border-b" style={{ borderColor: 'var(--border)' }}>
              <h3 className="text-base font-bold m-0 flex items-center gap-2">
                <Settings className="w-5 h-5 text-info" /> Create Commission Plan
              </h3>
              <button
                type="button"
                onClick={() => setIsPlanMakerModalOpen(false)}
                className="p-1 rounded-lg text-secondary border-none bg-transparent cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div>
              <label className="block text-xs font-semibold mb-1" style={{ color: 'var(--text-secondary)' }}>Plan Name *</label>
              <input
                type="text"
                required
                value={newPlanForm.name}
                onChange={(e) => setNewPlanForm({ ...newPlanForm, name: e.target.value })}
                placeholder="e.g. Metro Blitz Tier"
                className="w-full text-xs rounded-xl px-3 py-2.5 focus:outline-none"
                style={{ backgroundColor: 'var(--surface-secondary)', color: 'var(--text-primary)', border: '1px solid var(--border)' }}
              />
            </div>

            <div>
              <label className="block text-xs font-semibold mb-1" style={{ color: 'var(--text-secondary)' }}>Plan Type</label>
              <select
                value={newPlanForm.type}
                onChange={(e) => setNewPlanForm({ ...newPlanForm, type: e.target.value })}
                className="w-full text-xs rounded-xl px-3 py-2.5 focus:outline-none"
                style={{ backgroundColor: 'var(--surface-secondary)', color: 'var(--text-primary)', border: '1px solid var(--border)' }}
              >
                <option value="Tiered per Valid Signature">Tiered per Valid Signature</option>
                <option value="Flat Rate per Valid Signature">Flat Rate per Valid Signature</option>
                <option value="Volume Incentive">Volume Incentive</option>
                <option value="Gross Revenue Percentage">Gross Revenue Percentage</option>
              </select>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold mb-1" style={{ color: 'var(--text-secondary)' }}>Base Rate ($/sig) *</label>
                <input
                  type="text"
                  required
                  value={newPlanForm.baseRate}
                  onChange={(e) => setNewPlanForm({ ...newPlanForm, baseRate: e.target.value })}
                  placeholder="e.g. $3.50/sig"
                  className="w-full text-xs rounded-xl px-3 py-2.5 focus:outline-none"
                  style={{ backgroundColor: 'var(--surface-secondary)', color: 'var(--text-primary)', border: '1px solid var(--border)' }}
                />
              </div>

              <div>
                <label className="block text-xs font-semibold mb-1" style={{ color: 'var(--text-secondary)' }}>Bonus Tier</label>
                <input
                  type="text"
                  value={newPlanForm.bonusThreshold}
                  onChange={(e) => setNewPlanForm({ ...newPlanForm, bonusThreshold: e.target.value })}
                  placeholder="e.g. +$0.50 after 500"
                  className="w-full text-xs rounded-xl px-3 py-2.5 focus:outline-none"
                  style={{ backgroundColor: 'var(--surface-secondary)', color: 'var(--text-primary)', border: '1px solid var(--border)' }}
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold mb-1" style={{ color: 'var(--text-secondary)' }}>Eligibility Rules</label>
              <input
                type="text"
                value={newPlanForm.eligibility}
                onChange={(e) => setNewPlanForm({ ...newPlanForm, eligibility: e.target.value })}
                placeholder="e.g. Minimum 85% valid rate required"
                className="w-full text-xs rounded-xl px-3 py-2.5 focus:outline-none"
                style={{ backgroundColor: 'var(--surface-secondary)', color: 'var(--text-primary)', border: '1px solid var(--border)' }}
              />
            </div>

            <div className="flex justify-end gap-2 pt-3 border-t" style={{ borderColor: 'var(--border)' }}>
              <button
                type="button"
                onClick={() => setIsPlanMakerModalOpen(false)}
                className="px-4 py-2 rounded-xl text-xs font-semibold border cursor-pointer"
                style={{ backgroundColor: 'var(--surface-secondary)', color: 'var(--text-primary)', borderColor: 'var(--border)' }}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2 rounded-xl text-xs font-bold border-none shadow-md cursor-pointer"
                style={{ backgroundColor: 'var(--info)', color: 'var(--text-on-primary)' }}
              >
                Save Plan
              </button>
            </div>
          </form>
        </div>
      )}

      {/* ---------------------------------------------------- */}
      {/* MODAL: CREATE BONUS INCENTIVE */}
      {/* ---------------------------------------------------- */}
      {isCreateBonusModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
          onClick={() => setIsCreateBonusModalOpen(false)}
        >
          <form
            onSubmit={handleCreateBonus}
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-md rounded-2xl p-6 border shadow-2xl space-y-4"
            style={{ backgroundColor: 'var(--surface)', borderColor: 'var(--border)', color: 'var(--text-primary)' }}
          >
            <div className="flex items-center justify-between pb-3 border-b" style={{ borderColor: 'var(--border)' }}>
              <h3 className="text-base font-bold m-0 flex items-center gap-2">
                <Award className="w-5 h-5 text-info" /> Create Bonus Incentive
              </h3>
              <button
                type="button"
                onClick={() => setIsCreateBonusModalOpen(false)}
                className="p-1 rounded-lg text-secondary border-none bg-transparent cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div>
              <label className="block text-xs font-semibold mb-1" style={{ color: 'var(--text-secondary)' }}>Bonus Name *</label>
              <input
                type="text"
                required
                value={newBonusForm.name}
                onChange={(e) => setNewBonusForm({ ...newBonusForm, name: e.target.value })}
                placeholder="e.g. 500 Signature Speed Surge"
                className="w-full text-xs rounded-xl px-3 py-2.5 focus:outline-none"
                style={{ backgroundColor: 'var(--surface-secondary)', color: 'var(--text-primary)', border: '1px solid var(--border)' }}
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold mb-1" style={{ color: 'var(--text-secondary)' }}>Bonus Amount ($) *</label>
                <input
                  type="text"
                  required
                  value={newBonusForm.amount}
                  onChange={(e) => setNewBonusForm({ ...newBonusForm, amount: e.target.value })}
                  placeholder="$150.00"
                  className="w-full text-xs rounded-xl px-3 py-2.5 focus:outline-none"
                  style={{ backgroundColor: 'var(--surface-secondary)', color: 'var(--text-primary)', border: '1px solid var(--border)' }}
                />
              </div>

              <div>
                <label className="block text-xs font-semibold mb-1" style={{ color: 'var(--text-secondary)' }}>Target Deadline</label>
                <input
                  type="text"
                  value={newBonusForm.deadline}
                  onChange={(e) => setNewBonusForm({ ...newBonusForm, deadline: e.target.value })}
                  placeholder="e.g. Oct 31, 2026"
                  className="w-full text-xs rounded-xl px-3 py-2.5 focus:outline-none"
                  style={{ backgroundColor: 'var(--surface-secondary)', color: 'var(--text-primary)', border: '1px solid var(--border)' }}
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold mb-1" style={{ color: 'var(--text-secondary)' }}>Qualification Criteria</label>
              <textarea
                rows={2}
                value={newBonusForm.eligibility}
                onChange={(e) => setNewBonusForm({ ...newBonusForm, eligibility: e.target.value })}
                placeholder="Describe milestone requirement (e.g. 500 valid sigs in 7 days)..."
                className="w-full text-xs rounded-xl p-3 focus:outline-none"
                style={{ backgroundColor: 'var(--surface-secondary)', color: 'var(--text-primary)', border: '1px solid var(--border)' }}
              />
            </div>

            <div className="flex justify-end gap-2 pt-3 border-t" style={{ borderColor: 'var(--border)' }}>
              <button
                type="button"
                onClick={() => setIsCreateBonusModalOpen(false)}
                className="px-4 py-2 rounded-xl text-xs font-semibold border cursor-pointer"
                style={{ backgroundColor: 'var(--surface-secondary)', color: 'var(--text-primary)', borderColor: 'var(--border)' }}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2 rounded-xl text-xs font-bold border-none shadow-md cursor-pointer"
                style={{ backgroundColor: 'var(--info)', color: 'var(--text-on-primary)' }}
              >
                Publish Bonus
              </button>
            </div>
          </form>
        </div>
      )}

      {/* ---------------------------------------------------- */}
      {/* MODAL: INITIATE PAYOUT / REVIEW */}
      {/* ---------------------------------------------------- */}
      {isInitiatePayoutModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
          onClick={() => setIsInitiatePayoutModalOpen(false)}
        >
          <form
            onSubmit={handleConfirmPayout}
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-md rounded-2xl p-6 border shadow-2xl space-y-4"
            style={{ backgroundColor: 'var(--surface)', borderColor: 'var(--border)', color: 'var(--text-primary)' }}
          >
            <div className="flex items-center justify-between pb-3 border-b" style={{ borderColor: 'var(--border)' }}>
              <h3 className="text-base font-bold m-0 flex items-center gap-2">
                <Building2 className="w-5 h-5 text-info" /> Payout Disbursement Review
              </h3>
              <button
                type="button"
                onClick={() => setIsInitiatePayoutModalOpen(false)}
                className="p-1 rounded-lg text-secondary border-none bg-transparent cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-3.5 rounded-xl border space-y-2 text-xs" style={{ backgroundColor: 'var(--surface-secondary)', borderColor: 'var(--border)' }}>
              <div className="flex justify-between">
                <span className="text-secondary">Disbursement Provider:</span>
                <span className="font-bold text-info">{selectedPaymentProvider.toUpperCase()} Payroll</span>
              </div>
              <div className="flex justify-between">
                <span className="text-secondary">Target Recipient:</span>
                <span className="font-bold text-primary">{payoutForm.recipient}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-secondary">Staged Amount:</span>
                <span className="font-extrabold text-success text-sm">${payoutForm.amount}</span>
              </div>
            </div>

            <div className="p-3 rounded-xl border flex items-start gap-2.5" style={{ backgroundColor: 'var(--surface-secondary)', borderColor: 'var(--border)' }}>
              <AlertTriangle className="w-4 h-4 text-warning shrink-0 mt-0.5" />
              <p className="text-[11px] text-secondary m-0">
                <strong>Staging Simulation:</strong> This action commits the payout to the local transaction queue. No actual bank transfer or real currency transaction occurs during this UI review phase.
              </p>
            </div>

            <div className="flex justify-end gap-2 pt-3 border-t" style={{ borderColor: 'var(--border)' }}>
              <button
                type="button"
                onClick={() => setIsInitiatePayoutModalOpen(false)}
                className="px-4 py-2 rounded-xl text-xs font-semibold border cursor-pointer"
                style={{ backgroundColor: 'var(--surface-secondary)', color: 'var(--text-primary)', borderColor: 'var(--border)' }}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2 rounded-xl text-xs font-bold border-none shadow-md cursor-pointer"
                style={{ backgroundColor: 'var(--success)', color: 'var(--text-on-primary)' }}
              >
                Authorize Payout Batch
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};
