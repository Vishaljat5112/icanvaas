import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  FileSpreadsheet,
  FileCheck2,
  UploadCloud,
  CheckSquare,
  Clock,
  MapPin,
  User,
  DollarSign,
  AlertCircle,
  Plus,
  Search,
  Filter,
  Calendar,
  Info,
  Eye,
  Copy,
  CheckCircle2,
  Layers,
  ShieldCheck,
  ArrowRight,
  Trash2,
  FileText,
  Building2,
  Check,
  Send,
  Save,
  RotateCcw
} from 'lucide-react';
import {
  Breadcrumb,
  Button,
  Card,
  Badge,
  ProgressBar,
  Modal,
  Input,
  Select,
} from '../../../components/ui';
import { useAuth } from '../../../context/AuthContext';
import { useToast } from '../../../context/ToastContext';
import { getActiveTurnInOverride } from '../../../data/petitionCategoriesData';

export const MyTurnIn = () => {
  const navigate = useNavigate();
  const { crmUser } = useAuth();
  const { addToast } = useToast();

  const userName = crmUser?.name || 'Tanya Sterling';
  const circulatorBadge = 'CIR-88204';
  const activeOverride = getActiveTurnInOverride();

  // Available Active Petitions
  const baseProjects = [
    {
      id: 'PRJ-101',
      title: 'Prop 12 - Clean Energy Ballot Initiative',
      category: 'Statewide Initiative',
      baseRate: 3.50,
      code: 'PROP-12-2026',
    },
    {
      id: 'PRJ-103',
      title: 'Education Bond Measure C — Public School Upgrades',
      category: 'County Bond',
      baseRate: 4.00,
      code: 'MEASURE-C-BOND',
    },
    {
      id: 'PRJ-104',
      title: 'Clean Drinking Water & Watershed Protection Act',
      category: 'Statewide Initiative',
      baseRate: 3.75,
      code: 'WATER-ACT-2026',
    },
    {
      id: 'PRJ-102',
      title: 'Local Mayor Petition (City District 4)',
      category: 'Municipal Election',
      baseRate: 2.00,
      code: 'MAYOR-DIST-4',
    },
    {
      id: 'PRJ-105',
      title: 'Community Hospital Emergency Services Protection',
      category: 'Healthcare Access',
      baseRate: 3.25,
      code: 'HOSP-PROT-2026',
    },
  ];

  const availableProjects = React.useMemo(() => {
    if (activeOverride?.overrideActive && activeOverride?.currentCategoryName) {
      const match = baseProjects.find(
        (p) => p.code === activeOverride.currentProjectCode || p.title === activeOverride.currentCategoryName
      );
      if (match) {
        return baseProjects;
      }
      return [
        {
          id: `PRJ-OVR-${activeOverride.currentCategoryId || 'ACTIVE'}`,
          title: activeOverride.currentCategoryName,
          category: 'Manager Override Directive',
          baseRate: activeOverride.currentPayRate || 3.50,
          code: activeOverride.currentProjectCode || 'OVR',
        },
        ...baseProjects,
      ];
    }
    return baseProjects;
  }, [activeOverride]);

  // Available Receiving Field Managers
  const receivingManagers = [
    { name: 'Leo Fontaine', title: 'District Field Manager (District 4)' },
    { name: 'Marcus Vance', title: 'Regional Field Director (Bay Area)' },
    { name: 'Sarah Jenkins', title: 'Field Operations Coordinator' },
    { name: 'Elena Rodriguez', title: 'County Logistics Supervisor' },
  ];

  // Available Drop-Off Locations
  const dropOffLocations = [
    'Downtown District Office (Staging Room B)',
    'Field Trailer Drop Box #2 (Civic Center Promenade)',
    'Regional HQ Office (Suite 400 Drop Locker)',
    'Westside Metro Dispatch Van #4',
    'Pasadena Field Operations Center',
  ];

  // Form State
  const [formData, setFormData] = useState(() => ({
    projectId:
      activeOverride?.overrideActive && activeOverride?.currentCategoryName
        ? (baseProjects.find(
            (p) =>
              p.code === activeOverride.currentProjectCode ||
              p.title === activeOverride.currentCategoryName
          )?.id || `PRJ-OVR-${activeOverride.currentCategoryId || 'ACTIVE'}`)
        : 'PRJ-101',
    sheetsCount: '4',
    signaturesCount: '40',
    manager: activeOverride?.overrideActive && activeOverride?.assignedManager ? activeOverride.assignedManager : 'Leo Fontaine',
    location: 'Downtown District Office (Staging Room B)',
    submissionDate: new Date().toISOString().split('T')[0],
    submissionTime: '11:30',
    sheetSerials: 'Sheets CA-0920 through CA-0923',
    affidavitSigned: true,
    notes: 'All 4 sheets complete with blue-ink circulator affidavit signed. High turnout at midday shift.',
  }));

  const [formErrors, setFormErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedReceipt, setSelectedReceipt] = useState(null);
  const [copiedBatchId, setCopiedBatchId] = useState(null);

  // Turn-In Ledger History State
  const [turnInBatches, setTurnInBatches] = useState([
    {
      id: 'TI-1049',
      date: 'Today, Oct 10, 2026 • 11:30 AM',
      rawDate: '2026-10-10',
      projectTitle: 'Prop 12 - Clean Energy Ballot Initiative',
      category: 'Statewide Initiative',
      sheetsCount: 5,
      claimedSigs: 45,
      validSigs: 40,
      rate: 3.50,
      estPayout: 140.00,
      location: 'Downtown District Office (Staging Room B)',
      manager: 'Leo Fontaine',
      status: 'Submitted',
      statusBadge: 'primary',
      sheetSerials: 'Sheets CA-0912 through CA-0916',
      notes: 'Handed directly to Leo Fontaine. Intake stamp applied on batch slip.',
      intakeConfirmed: true,
      auditStage: 'Validation Sampling Queue',
    },
    {
      id: 'TI-1038',
      date: 'Yesterday, Oct 09, 2026 • 5:15 PM',
      rawDate: '2026-10-09',
      projectTitle: 'Prop 12 - Clean Energy Ballot Initiative',
      category: 'Statewide Initiative',
      sheetsCount: 8,
      claimedSigs: 82,
      validSigs: 75,
      rate: 3.50,
      estPayout: 262.50,
      location: 'Field Trailer Drop Box #2 (Civic Center)',
      manager: 'Leo Fontaine',
      status: 'Under Review',
      statusBadge: 'warning',
      sheetSerials: 'Sheets CA-0880 through CA-0887',
      notes: 'Cross-referenced against registered voter list for CD-4.',
      intakeConfirmed: true,
      auditStage: 'Optical OCR Verification Passed (91.5% Valid)',
    },
    {
      id: 'TI-1022',
      date: 'Oct 05, 2026 • 6:00 PM',
      rawDate: '2026-10-05',
      projectTitle: 'Education Bond Measure C — Public School Upgrades',
      category: 'County Bond',
      sheetsCount: 6,
      claimedSigs: 55,
      validSigs: 52,
      rate: 4.00,
      estPayout: 208.00,
      location: 'Regional HQ Office (Suite 400 Drop Locker)',
      manager: 'Marcus Vance',
      status: 'Validated / Paid',
      statusBadge: 'success',
      sheetSerials: 'Sheets EB-401 through EB-406',
      notes: 'Batch audit completed. 52 signatures cleared. Sent to ADP payroll batch #ADP-993.',
      intakeConfirmed: true,
      auditStage: 'Disbursed via ADP Direct Deposit',
    },
    {
      id: 'TI-1015',
      date: 'Oct 03, 2026 • 4:30 PM',
      rawDate: '2026-10-03',
      projectTitle: 'Clean Drinking Water & Watershed Protection Act',
      category: 'Statewide Initiative',
      sheetsCount: 7,
      claimedSigs: 68,
      validSigs: 62,
      rate: 3.75,
      estPayout: 232.50,
      location: 'Pasadena Field Operations Center',
      manager: 'Elena Rodriguez',
      status: 'Received',
      statusBadge: 'neutral',
      sheetSerials: 'Sheets WAT-112 through WAT-118',
      notes: 'Physical count verified. 7 physical sheets placed in fireproof vault.',
      intakeConfirmed: true,
      auditStage: 'Physical Custody Logged',
    },
    {
      id: 'TI-1008',
      date: 'Oct 01, 2026 • 2:15 PM',
      rawDate: '2026-10-01',
      projectTitle: 'Local Mayor Petition (City District 4)',
      category: 'Municipal Election',
      sheetsCount: 3,
      claimedSigs: 30,
      validSigs: 26,
      rate: 2.00,
      estPayout: 52.00,
      location: 'Downtown District Office (Staging Room B)',
      manager: 'Leo Fontaine',
      status: 'Validated / Paid',
      statusBadge: 'success',
      sheetSerials: 'Sheets MY-090 through MY-092',
      notes: 'Validated and finalized. Commission statement credited.',
      intakeConfirmed: true,
      auditStage: 'Paid ($52.00)',
    },
  ]);

  // Filtering State
  const [statusFilter, setStatusFilter] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  // Aggregated KPIs
  const totalBatches = turnInBatches.length;
  const totalSheetsTurnedIn = turnInBatches.reduce((acc, b) => acc + b.sheetsCount, 0);
  const totalClaimedSignatures = turnInBatches.reduce((acc, b) => acc + b.claimedSigs, 0);
  const totalPayoutValue = turnInBatches.reduce((acc, b) => acc + b.estPayout, 0);
  const pendingValidationCount = turnInBatches.filter((b) => b.status === 'Submitted' || b.status === 'Under Review' || b.status === 'Received').length;

  // Selected Campaign Details
  const activeSelectedProject = availableProjects.find((p) => p.id === formData.projectId) || availableProjects[0];
  const calculatedEstPayout = (parseInt(formData.signaturesCount, 10) || 0) * activeSelectedProject.baseRate;

  // Validation
  const validateForm = () => {
    const errors = {};
    const sheets = parseInt(formData.sheetsCount, 10);
    const sigs = parseInt(formData.signaturesCount, 10);

    if (isNaN(sheets) || sheets <= 0) {
      errors.sheetsCount = 'Please enter at least 1 physical paper sheet.';
    }
    if (isNaN(sigs) || sigs <= 0) {
      errors.signaturesCount = 'Please enter a valid count of claimed signatures.';
    }
    if (sheets > 0 && sigs > 0 && sigs < sheets) {
      errors.signaturesCount = 'Signatures count cannot be less than sheet count.';
    }
    if (!formData.location.trim()) {
      errors.location = 'Drop-off location is required.';
    }
    if (!formData.manager.trim()) {
      errors.manager = 'Receiving manager is required.';
    }
    if (!formData.affidavitSigned) {
      errors.affidavitSigned = 'You must confirm circulator declarations are signed on all sheets.';
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // Submit Turn-In Batch
  const handleSubmitBatch = (isDraft = false) => {
    if (!isDraft && !validateForm()) {
      addToast({
        title: 'Validation Error',
        message: 'Please resolve form warnings before generating turn-in batch.',
        type: 'error',
      });
      return;
    }

    setIsSubmitting(true);

    setTimeout(() => {
      const sheets = parseInt(formData.sheetsCount, 10) || 1;
      const sigs = parseInt(formData.signaturesCount, 10) || 10;
      const validEstimate = Math.round(sigs * 0.9);
      const newBatchId = `TI-${Math.floor(1050 + Math.random() * 8940)}`;

      const newBatch = {
        id: newBatchId,
        date: `Today, ${new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })} • ${formData.submissionTime || '12:00 PM'}`,
        rawDate: formData.submissionDate || '2026-10-10',
        projectTitle: activeSelectedProject.title,
        category: activeSelectedProject.category,
        sheetsCount: sheets,
        claimedSigs: sigs,
        validSigs: validEstimate,
        rate: activeSelectedProject.baseRate,
        estPayout: validEstimate * activeSelectedProject.baseRate,
        location: formData.location,
        manager: formData.manager,
        status: isDraft ? 'Draft' : 'Submitted',
        statusBadge: isDraft ? 'neutral' : 'primary',
        sheetSerials: formData.sheetSerials || 'Batch serial unassigned',
        notes: formData.notes || 'Batch submitted directly from field.',
        intakeConfirmed: !isDraft,
        auditStage: isDraft ? 'Draft Stored in Offline Queue' : 'Intake Receipt Stamped • Sent to Manager',
      };

      setTurnInBatches([newBatch, ...turnInBatches]);
      setIsSubmitting(false);

      addToast({
        title: isDraft ? 'Turn-In Draft Saved' : `Turn-In Batch Stamped: ${newBatchId}`,
        message: isDraft
          ? 'Draft stored locally. Complete submission upon physical handover.'
          : `Handover slip registered for ${sheets} sheets (${sigs} sigs) to ${formData.manager}.`,
        type: 'success',
      });

      // Auto-open Receipt modal if officially submitted
      if (!isDraft) {
        setSelectedReceipt(newBatch);
      }

      // Reset form
      setFormData({
        projectId: 'PRJ-101',
        sheetsCount: '',
        signaturesCount: '',
        manager: 'Leo Fontaine',
        location: 'Downtown District Office (Staging Room B)',
        submissionDate: new Date().toISOString().split('T')[0],
        submissionTime: '12:00',
        sheetSerials: '',
        affidavitSigned: true,
        notes: '',
      });
      setFormErrors({});
    }, 500);
  };

  // Copy Batch ID helper
  const handleCopyBatchId = (batchId) => {
    navigator.clipboard?.writeText(batchId);
    setCopiedBatchId(batchId);
    addToast({
      title: 'Batch ID Copied',
      message: `${batchId} copied to clipboard for field custody log.`,
      type: 'info',
    });
    setTimeout(() => setCopiedBatchId(null), 2500);
  };

  // Filtered List
  const filteredBatches = turnInBatches.filter((item) => {
    const matchesStatus =
      statusFilter === 'All' ||
      item.status.toLowerCase().includes(statusFilter.toLowerCase());
    const matchesSearch =
      item.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.projectTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.manager.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.sheetSerials.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '1.5rem',
        maxWidth: '1360px',
        margin: '0 auto',
        width: '100%',
        boxSizing: 'border-box',
        paddingBottom: '3rem',
      }}
    >
      {/* 1. Header & Navigation */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <Breadcrumb
            items={[
              { label: 'Circulator Portal', onClick: () => navigate('/crm/dashboard') },
              { label: 'My Turn In' },
            ]}
          />
          <h1
            style={{
              fontSize: '1.75rem',
              fontWeight: 800,
              color: 'var(--text-primary)',
              margin: '0.25rem 0 0 0',
              letterSpacing: '-0.02em',
            }}
          >
            My Turn In — Physical Sheet Drop-Off & Chain-of-Custody
          </h1>
          <p style={{ margin: '0.25rem 0 0 0', fontSize: '13.5px', color: 'var(--text-secondary)' }}>
            Register paper petition sheets handed over to field managers for signature verification, audit receipts, and payroll disbursements.
          </p>
        </div>

        {/* Quick Cross-Navigation Actions */}
        <div className="flex items-center gap-2 flex-wrap">
          <Button
            variant="outline"
            size="sm"
            icon={Calendar}
            onClick={() => navigate('/crm/daily-numbers')}
          >
            My Daily #s
          </Button>

          <Button
            variant="outline"
            size="sm"
            icon={UploadCloud}
            onClick={() => navigate('/crm/petition-uploads')}
          >
            Upload Sheet Scans
          </Button>

          <Button
            variant="primary"
            size="sm"
            icon={DollarSign}
            onClick={() => navigate('/crm/commissions')}
          >
            My Commissions
          </Button>
        </div>
      </div>

      {/* 2. Top Summary KPI Cards */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
          gap: '1rem',
        }}
      >
        <Card style={{ padding: '1rem 1.25rem' }}>
          <div className="flex items-center justify-between mb-2">
            <span style={{ fontSize: '12px', fontWeight: 600, color: 'var(--text-secondary)' }}>
              Turn-In Batches
            </span>
            <div style={{ padding: '6px', borderRadius: '8px', backgroundColor: 'rgba(14, 165, 233, 0.12)', color: '#0284c7' }}>
              <FileSpreadsheet size={18} />
            </div>
          </div>
          <div className="flex items-baseline justify-between mb-1">
            <span style={{ fontSize: '1.65rem', fontWeight: 800, color: 'var(--text-primary)' }}>
              {totalBatches}{' '}
              <span style={{ fontSize: '0.9rem', fontWeight: 500, color: 'var(--text-tertiary)' }}>
                Batches
              </span>
            </span>
            <span style={{ fontSize: '12px', fontWeight: 700, color: '#0284c7' }}>
              {pendingValidationCount} in Pipeline
            </span>
          </div>
          <div className="text-xs" style={{ color: 'var(--text-secondary)', marginTop: '4px' }}>
            Stamped with unique verification barcodes.
          </div>
        </Card>

        <Card style={{ padding: '1rem 1.25rem' }}>
          <div className="flex items-center justify-between mb-2">
            <span style={{ fontSize: '12px', fontWeight: 600, color: 'var(--text-secondary)' }}>
              Physical Paper Sheets
            </span>
            <div style={{ padding: '6px', borderRadius: '8px', backgroundColor: 'rgba(16, 185, 129, 0.12)', color: '#10b981' }}>
              <FileCheck2 size={18} />
            </div>
          </div>
          <div className="flex items-baseline gap-2 mb-1">
            <span style={{ fontSize: '1.65rem', fontWeight: 800, color: '#10b981' }}>
              {totalSheetsTurnedIn} Sheets
            </span>
            <span style={{ fontSize: '12px', fontWeight: 600, color: 'var(--text-secondary)' }}>
              Custody Logged
            </span>
          </div>
          <div className="text-xs" style={{ color: 'var(--text-secondary)', marginTop: '4px' }}>
            Archived in county field trailers and regional HQ.
          </div>
        </Card>

        <Card style={{ padding: '1rem 1.25rem' }}>
          <div className="flex items-center justify-between mb-2">
            <span style={{ fontSize: '12px', fontWeight: 600, color: 'var(--text-secondary)' }}>
              Claimed Signatures
            </span>
            <div style={{ padding: '6px', borderRadius: '8px', backgroundColor: 'rgba(99, 102, 241, 0.12)', color: '#6366f1' }}>
              <CheckSquare size={18} />
            </div>
          </div>
          <div className="flex items-baseline gap-2 mb-1">
            <span style={{ fontSize: '1.65rem', fontWeight: 800, color: '#6366f1' }}>
              {totalClaimedSignatures} Sigs
            </span>
            <span style={{ fontSize: '12px', fontWeight: 600, color: 'var(--text-tertiary)' }}>
              (est. 92% valid)
            </span>
          </div>
          <div className="text-xs" style={{ color: 'var(--text-secondary)', marginTop: '4px' }}>
            Audited against official California voter database.
          </div>
        </Card>

        <Card style={{ padding: '1rem 1.25rem' }}>
          <div className="flex items-center justify-between mb-2">
            <span style={{ fontSize: '12px', fontWeight: 600, color: 'var(--text-secondary)' }}>
              Turn-In Payout Ledger
            </span>
            <div style={{ padding: '6px', borderRadius: '8px', backgroundColor: 'rgba(245, 158, 11, 0.12)', color: '#f59e0b' }}>
              <DollarSign size={18} />
            </div>
          </div>
          <div className="flex items-baseline gap-2 mb-1">
            <span style={{ fontSize: '1.65rem', fontWeight: 800, color: 'var(--text-primary)' }}>
              ${totalPayoutValue.toFixed(2)}
            </span>
            <span style={{ fontSize: '12px', fontWeight: 700, color: '#10b981' }}>
              ADP Payroll
            </span>
          </div>
          <div className="text-xs" style={{ color: 'var(--text-secondary)', marginTop: '4px' }}>
            Credited directly to circulator direct deposit.
          </div>
        </Card>
      </div>

      {/* 3. Turn-In Submission Form Card */}
      <Card style={{ padding: '1.5rem' }}>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4 pb-3 border-b border-border">
          <div>
            <h2
              style={{
                fontSize: '1.15rem',
                fontWeight: 800,
                color: 'var(--text-primary)',
                margin: 0,
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
              }}
            >
              <FileCheck2 size={20} style={{ color: '#0284c7' }} />
              Generate Physical Turn-In Batch Receipt
            </h2>
            <p style={{ margin: '2px 0 0 0', fontSize: '13px', color: 'var(--text-secondary)' }}>
              Fill in the paper petition bundle parameters before handing physical sheets to your field manager or dropping into a secured locker.
            </p>
          </div>

          <Badge variant="primary" size="sm">
            Chain-of-Custody Manifest
          </Badge>
        </div>

        {/* Manager Category Override Active Banner */}
        {activeOverride.overrideActive && (
          <div
            className="p-3.5 rounded-xl flex items-start justify-between gap-3 mb-3"
            style={{
              backgroundColor: 'rgba(245, 158, 11, 0.1)',
              border: '1px solid rgba(245, 158, 11, 0.3)',
              color: 'var(--text-primary)',
            }}
          >
            <div className="flex items-start gap-2.5">
              <Layers size={18} style={{ color: '#d97706', marginTop: '2px', flexShrink: 0 }} />
              <div>
                <div className="flex items-center gap-2">
                  <span style={{ fontSize: '13px', fontWeight: 800, color: '#d97706' }}>
                    Team Manager Directive: Category Overridden
                  </span>
                  <Badge variant="warning" size="sm">
                    Assigned by {activeOverride.assignedManager}
                  </Badge>
                </div>
                <p style={{ margin: '2px 0 0 0', fontSize: '12px', color: 'var(--text-secondary)' }}>
                  Assigned Project: <strong>{activeOverride.currentCategoryName}</strong> ({activeOverride.currentProjectCode}) • Effective: {activeOverride.effectiveDate}
                </p>
                <p style={{ margin: '2px 0 0 0', fontSize: '11.5px', color: '#b45309' }}>
                  <strong>Manager Directive Reason:</strong> {activeOverride.reason}
                </p>
              </div>
            </div>
            <Badge variant="neutral" size="sm">
              Demo State
            </Badge>
          </div>
        )}

        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmitBatch(false);
          }}
          className="flex flex-col gap-4"
        >
          {/* Row 1: Campaign & Counts */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
              gap: '1rem',
            }}
          >
            {/* Campaign Selection */}
            <div className="flex flex-col gap-1.5">
              <label style={{ fontSize: '12px', fontWeight: 700, color: 'var(--text-primary)' }}>
                Target Petition Campaign *
              </label>
              <Select
                value={formData.projectId}
                onChange={(e) => setFormData({ ...formData, projectId: e.target.value })}
                options={availableProjects.map((p) => ({
                  value: p.id,
                  label: `${p.title} (${p.category}) — $${p.baseRate.toFixed(2)}/sig`,
                }))}
              />
            </div>

            {/* Total Paper Sheets */}
            <div className="flex flex-col gap-1.5">
              <label style={{ fontSize: '12px', fontWeight: 700, color: 'var(--text-primary)' }}>
                Physical Paper Sheets Count *
              </label>
              <Input
                type="number"
                min="1"
                max="100"
                placeholder="e.g. 5"
                value={formData.sheetsCount}
                onChange={(e) => setFormData({ ...formData, sheetsCount: e.target.value })}
                required
              />
              {formErrors.sheetsCount && (
                <span style={{ fontSize: '11px', color: '#ef4444', fontWeight: 600 }}>
                  {formErrors.sheetsCount}
                </span>
              )}
            </div>

            {/* Claimed Signatures */}
            <div className="flex flex-col gap-1.5">
              <label style={{ fontSize: '12px', fontWeight: 700, color: 'var(--text-primary)' }}>
                Claimed Signatures on Bundle *
              </label>
              <Input
                type="number"
                min="1"
                placeholder="e.g. 45"
                value={formData.signaturesCount}
                onChange={(e) => setFormData({ ...formData, signaturesCount: e.target.value })}
                required
              />
              {formErrors.signaturesCount && (
                <span style={{ fontSize: '11px', color: '#ef4444', fontWeight: 600 }}>
                  {formErrors.signaturesCount}
                </span>
              )}
            </div>
          </div>

          {/* Row 2: Manager & Drop-off Location */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
              gap: '1rem',
            }}
          >
            {/* Receiving Manager */}
            <div className="flex flex-col gap-1.5">
              <label style={{ fontSize: '12px', fontWeight: 700, color: 'var(--text-primary)' }}>
                Receiving Field Manager / Coordinator *
              </label>
              <Select
                value={formData.manager}
                onChange={(e) => setFormData({ ...formData, manager: e.target.value })}
                options={receivingManagers.map((m) => ({
                  value: m.name,
                  label: `${m.name} — ${m.title}`,
                }))}
              />
              {formErrors.manager && (
                <span style={{ fontSize: '11px', color: '#ef4444', fontWeight: 600 }}>
                  {formErrors.manager}
                </span>
              )}
            </div>

            {/* Drop-Off Location */}
            <div className="flex flex-col gap-1.5">
              <label style={{ fontSize: '12px', fontWeight: 700, color: 'var(--text-primary)' }}>
                Drop-Off Location / Drop Box *
              </label>
              <Select
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                options={dropOffLocations.map((loc) => ({
                  value: loc,
                  label: loc,
                }))}
              />
              {formErrors.location && (
                <span style={{ fontSize: '11px', color: '#ef4444', fontWeight: 600 }}>
                  {formErrors.location}
                </span>
              )}
            </div>

            {/* Date & Time */}
            <div className="grid grid-cols-2 gap-2">
              <div className="flex flex-col gap-1.5">
                <label style={{ fontSize: '12px', fontWeight: 700, color: 'var(--text-primary)' }}>
                  Handover Date *
                </label>
                <Input
                  type="date"
                  value={formData.submissionDate}
                  onChange={(e) => setFormData({ ...formData, submissionDate: e.target.value })}
                  required
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label style={{ fontSize: '12px', fontWeight: 700, color: 'var(--text-primary)' }}>
                  Time
                </label>
                <Input
                  type="time"
                  value={formData.submissionTime}
                  onChange={(e) => setFormData({ ...formData, submissionTime: e.target.value })}
                />
              </div>
            </div>
          </div>

          {/* Row 3: Sheet Serial IDs & Observations */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
              gap: '1rem',
            }}
          >
            <div className="flex flex-col gap-1.5">
              <label style={{ fontSize: '12px', fontWeight: 700, color: 'var(--text-primary)' }}>
                Sheet Serial Numbers / Range (Optional)
              </label>
              <Input
                type="text"
                placeholder="e.g. Sheets CA-0920 through CA-0925"
                value={formData.sheetSerials}
                onChange={(e) => setFormData({ ...formData, sheetSerials: e.target.value })}
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label style={{ fontSize: '12px', fontWeight: 700, color: 'var(--text-primary)' }}>
                Circulator Turn-In Notes
              </label>
              <Input
                type="text"
                placeholder="e.g. Blue ink, clean lines, signed affidavit declarations attached."
                value={formData.notes}
                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              />
            </div>
          </div>

          {/* Affidavit Affirmation Checkbox */}
          <div
            style={{
              padding: '0.85rem 1rem',
              backgroundColor: 'var(--surface-secondary)',
              border: '1px solid var(--border)',
              borderRadius: '12px',
              display: 'flex',
              alignItems: 'flex-start',
              gap: '0.75rem',
            }}
          >
            <input
              type="checkbox"
              id="affidavitCheckbox"
              checked={formData.affidavitSigned}
              onChange={(e) => setFormData({ ...formData, affidavitSigned: e.target.checked })}
              style={{
                marginTop: '3px',
                width: '18px',
                height: '18px',
                accentColor: '#0284c7',
                cursor: 'pointer',
              }}
            />
            <label
              htmlFor="affidavitCheckbox"
              style={{
                fontSize: '12.5px',
                color: 'var(--text-primary)',
                lineHeight: '1.45',
                cursor: 'pointer',
              }}
            >
              <strong>Circulator Affidavit Affirmation:</strong> I certify that all physical petition sheets in this turn-in batch have been personally circulated by me ({userName}, {circulatorBadge}), and each sheet includes a complete, signed circulator declaration under penalty of perjury.
            </label>
          </div>
          {formErrors.affidavitSigned && (
            <span style={{ fontSize: '11px', color: '#ef4444', fontWeight: 600 }}>
              {formErrors.affidavitSigned}
            </span>
          )}

          {/* Live Est. Payout Callout */}
          <div
            style={{
              padding: '0.85rem 1rem',
              backgroundColor: 'rgba(14, 165, 233, 0.08)',
              border: '1px solid rgba(14, 165, 233, 0.25)',
              borderRadius: '12px',
              display: 'flex',
              flexDirection: 'column',
              smFlexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              gap: '1rem',
            }}
          >
            <div className="flex items-center gap-2.5">
              <Info size={18} style={{ color: '#0284c7', flexShrink: 0 }} />
              <div style={{ fontSize: '12.5px', color: 'var(--text-secondary)' }}>
                <span>Estimated Batch Value: </span>
                <strong style={{ color: 'var(--text-primary)', fontSize: '13.5px' }}>
                  {formData.signaturesCount || 0} sigs × ${activeSelectedProject.baseRate.toFixed(2)} = ${calculatedEstPayout.toFixed(2)}
                </strong>
                <span style={{ display: 'block', fontSize: '11px', color: 'var(--text-tertiary)' }}>
                  Final pay is determined after Validation Team database qualification and manager intake sign-off.
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2 flex-shrink-0">
              <Button
                variant="outline"
                type="button"
                icon={Save}
                onClick={() => handleSubmitBatch(true)}
                disabled={isSubmitting}
              >
                Save Draft
              </Button>

              <Button
                variant="primary"
                type="submit"
                icon={Send}
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Generating Slip...' : 'Submit Turn-In Batch'}
              </Button>
            </div>
          </div>
        </form>
      </Card>

      {/* 4. Turn-In Batches History & Status Ledger */}
      <Card style={{ padding: '1.25rem 1.5rem' }}>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
          <div>
            <h3
              style={{
                fontSize: '1.15rem',
                fontWeight: 800,
                color: 'var(--text-primary)',
                margin: 0,
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
              }}
            >
              <FileSpreadsheet size={18} style={{ color: '#10b981' }} />
              Turn-In Batches Custody Ledger ({filteredBatches.length})
            </h3>
            <p style={{ margin: '2px 0 0 0', fontSize: '12.5px', color: 'var(--text-secondary)' }}>
              Comprehensive record of paper sheet drop-offs, receiving manager receipts, and validation audit stages.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <Badge variant="neutral" size="sm">
              {filteredBatches.length} Batches Found
            </Badge>
          </div>
        </div>

        {/* Filter Toolbar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
            {['All', 'Submitted', 'Received', 'Under Review', 'Validated / Paid', 'Draft'].map((statusOption) => (
              <button
                key={statusOption}
                type="button"
                onClick={() => setStatusFilter(statusOption)}
                style={{
                  padding: '5px 12px',
                  borderRadius: '10px',
                  fontSize: '12px',
                  fontWeight: statusFilter === statusOption ? 700 : 500,
                  backgroundColor: statusFilter === statusOption ? '#0284c7' : 'var(--surface-secondary)',
                  color: statusFilter === statusOption ? '#ffffff' : 'var(--text-secondary)',
                  border: '1px solid var(--border)',
                  cursor: 'pointer',
                  whiteSpace: 'nowrap',
                  transition: 'all 0.15s ease',
                }}
              >
                {statusOption}
              </button>
            ))}
          </div>

          <div className="relative w-full sm:w-72">
            <Search
              size={15}
              className="absolute left-3 top-1/2 -translate-y-1/2"
              style={{ color: 'var(--text-tertiary)' }}
            />
            <input
              type="text"
              placeholder="Search batch ID, project, manager..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                width: '100%',
                padding: '0.55rem 0.75rem 0.55rem 2.2rem',
                borderRadius: '10px',
                border: '1px solid var(--border)',
                backgroundColor: 'var(--surface)',
                color: 'var(--text-primary)',
                fontSize: '13px',
                outline: 'none',
                boxSizing: 'border-box',
              }}
            />
          </div>
        </div>

        {/* Table Body or Empty State */}
        {filteredBatches.length === 0 ? (
          <div
            style={{
              padding: '3rem 1.5rem',
              textAlign: 'center',
              backgroundColor: 'var(--surface-secondary)',
              borderRadius: '12px',
              border: '1px dashed var(--border)',
            }}
          >
            <FileSpreadsheet size={36} style={{ color: 'var(--text-tertiary)', margin: '0 auto 0.75rem auto' }} />
            <h4 style={{ margin: '0 0 4px 0', fontSize: '1rem', fontWeight: 700, color: 'var(--text-primary)' }}>
              No Turn-In Batches Match Your Filter
            </h4>
            <p style={{ margin: '0 0 1rem 0', fontSize: '13px', color: 'var(--text-secondary)' }}>
              Try clearing your search query or switching to "All" status filter.
            </p>
            <Button
              variant="outline"
              size="sm"
              icon={RotateCcw}
              onClick={() => {
                setStatusFilter('All');
                setSearchQuery('');
              }}
            >
              Reset Filters
            </Button>
          </div>
        ) : (
          <div className="overflow-x-auto" style={{ borderRadius: '12px', border: '1px solid var(--border)' }}>
            <table className="w-full text-left text-sm" style={{ borderCollapse: 'collapse' }}>
              <thead
                style={{
                  backgroundColor: 'var(--surface-secondary)',
                  color: 'var(--text-tertiary)',
                  fontSize: '11px',
                  fontWeight: 700,
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em',
                  borderBottom: '1px solid var(--border)',
                }}
              >
                <tr>
                  <th style={{ padding: '0.85rem 1rem' }}>Batch ID & Timestamp</th>
                  <th style={{ padding: '0.85rem 1rem' }}>Petition Campaign</th>
                  <th style={{ padding: '0.85rem 1rem' }}>Sheets & Signatures</th>
                  <th style={{ padding: '0.85rem 1rem' }}>Receiving Manager & Drop Location</th>
                  <th style={{ padding: '0.85rem 1rem', textAlign: 'right' }}>Est. Pay</th>
                  <th style={{ padding: '0.85rem 1rem', textAlign: 'center' }}>Custody Status</th>
                  <th style={{ padding: '0.85rem 1rem', textAlign: 'right' }}>Actions</th>
                </tr>
              </thead>
              <tbody style={{ divideY: '1px solid var(--border)' }}>
                {filteredBatches.map((batch) => (
                  <tr
                    key={batch.id}
                    style={{
                      borderBottom: '1px solid var(--border)',
                      backgroundColor: 'transparent',
                      transition: 'background-color 0.15s ease',
                    }}
                    className="hover:bg-surface-secondary"
                  >
                    {/* Batch ID & Timestamp */}
                    <td style={{ padding: '0.85rem 1rem' }}>
                      <div className="flex items-center gap-1.5">
                        <span
                          style={{
                            fontFamily: 'monospace',
                            fontWeight: 800,
                            fontSize: '12.5px',
                            color: '#0284c7',
                          }}
                        >
                          {batch.id}
                        </span>
                        <button
                          type="button"
                          onClick={() => handleCopyBatchId(batch.id)}
                          style={{
                            background: 'transparent',
                            border: 'none',
                            color: copiedBatchId === batch.id ? '#10b981' : 'var(--text-tertiary)',
                            cursor: 'pointer',
                            padding: '2px',
                          }}
                          title="Copy Batch ID"
                        >
                          {copiedBatchId === batch.id ? <Check size={12} /> : <Copy size={12} />}
                        </button>
                      </div>
                      <div style={{ fontSize: '11.5px', color: 'var(--text-secondary)', marginTop: '2px' }}>
                        {batch.date}
                      </div>
                    </td>

                    {/* Campaign */}
                    <td style={{ padding: '0.85rem 1rem' }}>
                      <div style={{ fontWeight: 700, fontSize: '13px', color: 'var(--text-primary)' }}>
                        {batch.projectTitle}
                      </div>
                      <div className="flex items-center gap-1.5 mt-1">
                        <span
                          style={{
                            fontSize: '10.5px',
                            color: 'var(--text-tertiary)',
                            backgroundColor: 'var(--surface-secondary)',
                            padding: '1px 6px',
                            borderRadius: '4px',
                            border: '1px solid var(--border)',
                          }}
                        >
                          {batch.category}
                        </span>
                        <span style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>
                          ${batch.rate.toFixed(2)}/sig
                        </span>
                      </div>
                    </td>

                    {/* Sheets & Claimed Sigs */}
                    <td style={{ padding: '0.85rem 1rem' }}>
                      <div style={{ fontSize: '13px', fontWeight: 700, color: 'var(--text-primary)' }}>
                        {batch.sheetsCount} Physical Sheets
                      </div>
                      <div className="flex items-baseline gap-1 mt-0.5 text-xs">
                        <span style={{ fontWeight: 800, color: '#10b981' }}>
                          {batch.claimedSigs} Claimed Sigs
                        </span>
                        {batch.validSigs && (
                          <span style={{ color: 'var(--text-tertiary)', fontSize: '11px' }}>
                            ({batch.validSigs} valid est.)
                          </span>
                        )}
                      </div>
                    </td>

                    {/* Location & Manager */}
                    <td style={{ padding: '0.85rem 1rem' }}>
                      <div className="flex items-center gap-1.5 text-xs" style={{ fontWeight: 600, color: 'var(--text-primary)' }}>
                        <User size={12} style={{ color: '#0284c7' }} />
                        <span>Recv: {batch.manager}</span>
                      </div>
                      <div className="flex items-center gap-1 text-xs mt-1" style={{ color: 'var(--text-tertiary)' }}>
                        <MapPin size={11} />
                        <span style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: '240px' }}>
                          {batch.location}
                        </span>
                      </div>
                    </td>

                    {/* Est Pay */}
                    <td style={{ padding: '0.85rem 1rem', textAlign: 'right' }}>
                      <div style={{ fontSize: '1.05rem', fontWeight: 800, color: 'var(--text-primary)' }}>
                        ${batch.estPayout.toFixed(2)}
                      </div>
                      <div style={{ fontSize: '10.5px', color: 'var(--text-tertiary)' }}>
                        ADP Statement
                      </div>
                    </td>

                    {/* Status Badge */}
                    <td style={{ padding: '0.85rem 1rem', textAlign: 'center' }}>
                      <Badge variant={batch.statusBadge} size="sm">
                        {batch.status}
                      </Badge>
                      <div style={{ fontSize: '10px', color: 'var(--text-tertiary)', marginTop: '3px' }}>
                        {batch.auditStage}
                      </div>
                    </td>

                    {/* Actions */}
                    <td style={{ padding: '0.85rem 1rem', textAlign: 'right' }}>
                      <Button
                        variant="ghost"
                        size="sm"
                        icon={Eye}
                        onClick={() => setSelectedReceipt(batch)}
                      >
                        Receipt
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Card>

      {/* ======================================================== */}
      {/* MODAL: TURN-IN BATCH OFFICIAL SLIP & AUDIT RECEIPT       */}
      {/* ======================================================== */}
      {selectedReceipt && (
        <Modal
          isOpen={Boolean(selectedReceipt)}
          onClose={() => setSelectedReceipt(null)}
          title={`Turn-In Batch Receipt — ${selectedReceipt.id}`}
          maxWidth="600px"
        >
          <div className="flex flex-col gap-4">
            {/* Printable Custody Slip Frame */}
            <div
              style={{
                backgroundColor: '#ffffff',
                color: '#0f172a',
                borderRadius: '14px',
                padding: '1.5rem',
                border: '2px solid #cbd5e1',
                boxShadow: '0 8px 24px rgba(0, 0, 0, 0.12)',
                position: 'relative',
              }}
            >
              {/* Header */}
              <div className="flex items-center justify-between border-b pb-3 mb-3">
                <div>
                  <div style={{ fontSize: '10.5px', fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase', color: '#64748b' }}>
                    Official Chain-of-Custody Handover Slip
                  </div>
                  <h4 style={{ margin: '2px 0 0 0', fontSize: '1.15rem', fontWeight: 800, color: '#0f172a' }}>
                    {selectedReceipt.id}
                  </h4>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <Badge variant={selectedReceipt.statusBadge} size="md">
                    {selectedReceipt.status}
                  </Badge>
                  <div style={{ fontSize: '10.5px', color: '#64748b', marginTop: '2px' }}>
                    {selectedReceipt.date}
                  </div>
                </div>
              </div>

              {/* Barcode / Hash Simulation */}
              <div
                style={{
                  backgroundColor: '#f8fafc',
                  border: '1px dashed #cbd5e1',
                  borderRadius: '8px',
                  padding: '8px 12px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  marginBottom: '1rem',
                  fontSize: '11px',
                  fontFamily: 'monospace',
                  color: '#475569',
                }}
              >
                <span>BARCODE: ||| | | |||| || ||| | |||||</span>
                <span>AUTH HASH: {selectedReceipt.id}-CA99</span>
              </div>

              {/* Grid Details */}
              <div className="grid grid-cols-2 gap-3 text-xs mb-3">
                <div>
                  <span style={{ color: '#64748b' }}>Petition Campaign:</span>
                  <div style={{ fontWeight: 700, color: '#0f172a', marginTop: '2px' }}>
                    {selectedReceipt.projectTitle}
                  </div>
                </div>

                <div>
                  <span style={{ color: '#64748b' }}>Campaign Category:</span>
                  <div style={{ fontWeight: 700, color: '#0f172a', marginTop: '2px' }}>
                    {selectedReceipt.category}
                  </div>
                </div>

                <div>
                  <span style={{ color: '#64748b' }}>Circulator Identity:</span>
                  <div style={{ fontWeight: 700, color: '#0f172a', marginTop: '2px' }}>
                    {userName} ({circulatorBadge})
                  </div>
                </div>

                <div>
                  <span style={{ color: '#64748b' }}>Receiving Field Manager:</span>
                  <div style={{ fontWeight: 700, color: '#0f172a', marginTop: '2px' }}>
                    {selectedReceipt.manager}
                  </div>
                </div>

                <div>
                  <span style={{ color: '#64748b' }}>Drop-Off Location:</span>
                  <div style={{ fontWeight: 700, color: '#0f172a', marginTop: '2px' }}>
                    {selectedReceipt.location}
                  </div>
                </div>

                <div>
                  <span style={{ color: '#64748b' }}>Physical Bundle Count:</span>
                  <div style={{ fontWeight: 700, color: '#0f172a', marginTop: '2px' }}>
                    {selectedReceipt.sheetsCount} Sheets ({selectedReceipt.claimedSigs} Sigs)
                  </div>
                </div>
              </div>

              {/* Estimated Payout Block */}
              <div
                style={{
                  backgroundColor: '#f0fdf4',
                  border: '1px solid #bbf7d0',
                  borderRadius: '10px',
                  padding: '10px 14px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  marginBottom: '1rem',
                }}
              >
                <div>
                  <div style={{ fontSize: '11px', color: '#166534', fontWeight: 600 }}>
                    Estimated Payout Credit:
                  </div>
                  <div style={{ fontSize: '10.5px', color: '#15803d' }}>
                    Subject to validation sampling approval.
                  </div>
                </div>
                <div style={{ fontSize: '1.35rem', fontWeight: 800, color: '#15803d' }}>
                  ${selectedReceipt.estPayout.toFixed(2)}
                </div>
              </div>

              {/* Circulator Notes */}
              <div style={{ fontSize: '11.5px', color: '#475569', marginBottom: '0.75rem' }}>
                <span style={{ fontWeight: 700 }}>Serial Number Manifest:</span>{' '}
                <span>{selectedReceipt.sheetSerials}</span>
              </div>

              {/* Audit Status Stage */}
              <div
                style={{
                  backgroundColor: '#f1f5f9',
                  borderRadius: '8px',
                  padding: '8px 12px',
                  fontSize: '11px',
                  color: '#334155',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                }}
              >
                <ShieldCheck size={14} style={{ color: '#0284c7' }} />
                <span>Current Stage: <strong>{selectedReceipt.auditStage}</strong></span>
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center justify-between pt-2 border-t border-border">
              <Button
                variant="outline"
                size="sm"
                icon={UploadCloud}
                onClick={() => {
                  setSelectedReceipt(null);
                  navigate('/crm/petition-uploads');
                }}
              >
                Upload Scans for this Batch
              </Button>

              <div className="flex items-center gap-2">
                <Button
                  variant="secondary"
                  size="sm"
                  icon={Copy}
                  onClick={() => handleCopyBatchId(selectedReceipt.id)}
                >
                  Copy Batch ID
                </Button>

                <Button
                  variant="primary"
                  size="sm"
                  onClick={() => setSelectedReceipt(null)}
                >
                  Close Receipt
                </Button>
              </div>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default MyTurnIn;
