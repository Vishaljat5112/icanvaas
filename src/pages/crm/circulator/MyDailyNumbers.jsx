import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Calendar,
  CheckSquare,
  Clock,
  MapPin,
  TrendingUp,
  DollarSign,
  AlertCircle,
  Plus,
  Filter,
  Search,
  Download,
  FileCheck2,
  UploadCloud,
  ChevronRight,
  ShieldCheck,
  CheckCircle2,
  XCircle,
  HelpCircle,
  Eye,
  Info,
  Layers,
  Sparkles,
  ArrowRight,
  Receipt
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

export const MyDailyNumbers = () => {
  const navigate = useNavigate();
  const { crmUser } = useAuth();
  const { addToast } = useToast();

  const userName = crmUser?.name || 'Tanya Sterling';

  // Form State
  const [formData, setFormData] = useState({
    date: '2026-10-10',
    projectId: 'PRJ-101',
    shiftHours: '4.5',
    signatures: '',
    estimatedValid: '',
    rejected: '0',
    location: 'Downtown Metro Station North Plaza',
    county: 'Los Angeles County',
    weatherNotes: 'Sunny, 74°F. Heavy midday foot traffic outside transit hub.',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedShiftDetails, setSelectedShiftDetails] = useState(null);

  // Available Active Petitions
  const availableProjects = [
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

  // Daily Numbers Logbook History
  const [logs, setLogs] = useState([
    {
      id: 'LOG-8841',
      date: 'Today, Oct 10, 2026',
      shiftDuration: '4.0 hrs',
      projectTitle: 'Prop 12 - Clean Energy Ballot Initiative',
      category: 'Statewide Initiative',
      projectCode: 'PROP-12-2026',
      signatures: 45,
      validSigs: 40,
      rejectedSigs: 5,
      rate: 3.50,
      estPayout: 140.00,
      location: 'Downtown Metro Station North Plaza',
      county: 'Los Angeles County',
      runRate: '11.2 / hr',
      status: 'Pending Validation',
      statusBadge: 'warning',
      notes: 'Peak turnout between 12:30 PM and 2:00 PM near commuter turnstiles.',
    },
    {
      id: 'LOG-8839',
      date: 'Yesterday, Oct 09, 2026',
      shiftDuration: '6.5 hrs',
      projectTitle: 'Prop 12 - Clean Energy Ballot Initiative',
      category: 'Statewide Initiative',
      projectCode: 'PROP-12-2026',
      signatures: 82,
      validSigs: 75,
      rejectedSigs: 7,
      rate: 3.50,
      estPayout: 262.50,
      location: 'City Park Civic Center Promenade',
      county: 'Los Angeles County',
      runRate: '12.6 / hr',
      status: 'Validated (91.5%)',
      statusBadge: 'success',
      notes: 'Farmer’s market afternoon crowd; strong voter registration response.',
    },
    {
      id: 'LOG-8824',
      date: 'Oct 07, 2026',
      shiftDuration: '5.0 hrs',
      projectTitle: 'Education Bond Measure C — Public School Upgrades',
      category: 'County Bond',
      projectCode: 'MEASURE-C-BOND',
      signatures: 55,
      validSigs: 52,
      rejectedSigs: 3,
      rate: 4.00,
      estPayout: 208.00,
      location: 'East Bay Community Center',
      county: 'Alameda County',
      runRate: '11.0 / hr',
      status: 'Validated (94.5%)',
      statusBadge: 'success',
      notes: 'Parents attending evening youth soccer league; all Alameda residents.',
    },
    {
      id: 'LOG-8812',
      date: 'Oct 05, 2026',
      shiftDuration: '3.0 hrs',
      projectTitle: 'Local Mayor Petition (City District 4)',
      category: 'Municipal Election',
      projectCode: 'MAYOR-DIST-4',
      signatures: 30,
      validSigs: 26,
      rejectedSigs: 4,
      rate: 2.00,
      estPayout: 52.00,
      location: 'Westside Mall Plaza Entrance',
      county: 'Los Angeles County',
      runRate: '10.0 / hr',
      status: 'Validated (86.7%)',
      statusBadge: 'success',
      notes: 'Checked voter addresses against CD-4 zip code map.',
    },
    {
      id: 'LOG-8798',
      date: 'Oct 03, 2026',
      shiftDuration: '5.5 hrs',
      projectTitle: 'Clean Drinking Water & Watershed Protection Act',
      category: 'Statewide Initiative',
      projectCode: 'WATER-ACT-2026',
      signatures: 68,
      validSigs: 60,
      rejectedSigs: 8,
      rate: 3.75,
      estPayout: 225.00,
      location: 'Pasadena City Hall Plaza',
      county: 'Los Angeles County',
      runRate: '12.3 / hr',
      status: 'Audited & Paid',
      statusBadge: 'success',
      notes: 'Batch turned in to Leo Fontaine under TI-1022. Sent to ADP payroll.',
    },
  ]);

  // Filters State
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');

  // Aggregated KPI Calculations
  const totalSignaturesCount = logs.reduce((sum, item) => sum + item.signatures, 0);
  const totalValidCount = logs.reduce((sum, item) => sum + item.validSigs, 0);
  const totalRejectedCount = logs.reduce((sum, item) => sum + item.rejectedSigs, 0);
  const totalEstCommission = logs.reduce((sum, item) => sum + item.estPayout, 0);
  const avgValidRate = totalSignaturesCount > 0 ? Math.round((totalValidCount / totalSignaturesCount) * 100) : 88;

  // Handle Dynamic Sigs Count Change
  const handleSignaturesChange = (val) => {
    const total = parseInt(val, 10);
    if (!isNaN(total) && total >= 0) {
      const estValid = Math.max(Math.round(total * 0.9), 0);
      const estRej = total - estValid;
      setFormData((prev) => ({
        ...prev,
        signatures: val,
        estimatedValid: estValid.toString(),
        rejected: estRej.toString(),
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        signatures: val,
        estimatedValid: '',
        rejected: '0',
      }));
    }
  };

  // Handle Form Submission
  const handleSubmitDaily = (e) => {
    e.preventDefault();
    const count = parseInt(formData.signatures, 10);
    if (isNaN(count) || count <= 0) {
      addToast({
        title: 'Validation Error',
        message: 'Please enter a valid count of signatures collected during this shift.',
        type: 'error',
      });
      return;
    }

    setIsSubmitting(true);

    setTimeout(() => {
      const selectedProject = availableProjects.find((p) => p.id === formData.projectId) || availableProjects[0];
      const validCount = parseInt(formData.estimatedValid, 10) || Math.round(count * 0.9);
      const rejCount = parseInt(formData.rejected, 10) || (count - validCount);
      const hoursNum = parseFloat(formData.shiftHours) || 4.0;
      const ratePerHr = (count / hoursNum).toFixed(1);
      const payout = validCount * selectedProject.baseRate;

      const newLogEntry = {
        id: `LOG-${Math.floor(1000 + Math.random() * 9000)}`,
        date: `Today, ${new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}`,
        shiftDuration: `${hoursNum.toFixed(1)} hrs`,
        projectTitle: selectedProject.title,
        category: selectedProject.category,
        projectCode: selectedProject.code,
        signatures: count,
        validSigs: validCount,
        rejectedSigs: rejCount,
        rate: selectedProject.baseRate,
        estPayout: payout,
        location: formData.location,
        county: formData.county,
        runRate: `${ratePerHr} / hr`,
        status: 'Pending Validation',
        statusBadge: 'warning',
        notes: formData.weatherNotes || 'Shift logged directly from field.',
      };

      setLogs([newLogEntry, ...logs]);
      setIsSubmitting(false);

      addToast({
        title: 'Daily #s Submitted Successfully',
        message: `Logged ${count} signatures for ${selectedProject.title}. Est. Pay: $${payout.toFixed(2)}.`,
        type: 'success',
      });

      // Reset form to defaults
      setFormData((prev) => ({
        ...prev,
        signatures: '',
        estimatedValid: '',
        rejected: '0',
        weatherNotes: '',
      }));
    }, 600);
  };

  // Filtered Logs
  const filteredLogs = logs.filter((log) => {
    const matchesCategory = categoryFilter === 'All' || log.category === categoryFilter;
    const matchesSearch =
      log.projectTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.county.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.id.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
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
              { label: 'My Daily #s' },
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
            My Daily #s — Shift Signature Reporting
          </h1>
          <p style={{ margin: '0.25rem 0 0 0', fontSize: '13.5px', color: 'var(--text-secondary)' }}>
            Log end-of-shift signature totals, audit valid vs. rejected signers, and track estimated earnings.
          </p>
        </div>

        {/* Quick Cross-Navigation Actions */}
        <div className="flex items-center gap-2 flex-wrap">
          <Button
            variant="outline"
            size="sm"
            icon={UploadCloud}
            onClick={() => navigate('/crm/petition-uploads')}
          >
            Upload Sheet Scans
          </Button>

          <Button
            variant="secondary"
            size="sm"
            icon={FileCheck2}
            onClick={() => navigate('/crm/turn-in')}
          >
            Turn In Sheets
          </Button>

          <Button
            variant="primary"
            size="sm"
            icon={DollarSign}
            onClick={() => navigate('/crm/commissions')}
          >
            View Commissions
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
              Weekly Total Collected
            </span>
            <div style={{ padding: '6px', borderRadius: '8px', backgroundColor: 'rgba(14, 165, 233, 0.12)', color: '#0284c7' }}>
              <CheckSquare size={18} />
            </div>
          </div>
          <div className="flex items-baseline justify-between mb-1">
            <span style={{ fontSize: '1.65rem', fontWeight: 800, color: 'var(--text-primary)' }}>
              {totalSignaturesCount}{' '}
              <span style={{ fontSize: '0.9rem', fontWeight: 500, color: 'var(--text-tertiary)' }}>
                / 1,000 sigs
              </span>
            </span>
            <span style={{ fontSize: '12px', fontWeight: 700, color: '#0284c7' }}>
              {Math.round((totalSignaturesCount / 1000) * 100)}% Goal
            </span>
          </div>
          <ProgressBar value={totalSignaturesCount} max={1000} variant="primary" size="sm" />
          <div className="flex items-center justify-between text-xs mt-2" style={{ color: 'var(--text-tertiary)' }}>
            <span>Run rate: 11.4 sigs/hr</span>
            <span style={{ color: '#10b981', fontWeight: 600 }}>+$50 Tier Bonus at 1k</span>
          </div>
        </Card>

        <Card style={{ padding: '1rem 1.25rem' }}>
          <div className="flex items-center justify-between mb-2">
            <span style={{ fontSize: '12px', fontWeight: 600, color: 'var(--text-secondary)' }}>
              Estimated Valid Signatures
            </span>
            <div style={{ padding: '6px', borderRadius: '8px', backgroundColor: 'rgba(16, 185, 129, 0.12)', color: '#10b981' }}>
              <CheckCircle2 size={18} />
            </div>
          </div>
          <div className="flex items-baseline gap-2 mb-1">
            <span style={{ fontSize: '1.65rem', fontWeight: 800, color: '#10b981' }}>
              {totalValidCount} Valid
            </span>
            <span style={{ fontSize: '12px', fontWeight: 700, color: 'var(--text-secondary)' }}>
              ({avgValidRate}% valid rate)
            </span>
          </div>
          <div className="text-xs" style={{ color: 'var(--text-secondary)', marginTop: '4px' }}>
            Audited by validation sampling against CA voter file.
          </div>
        </Card>

        <Card style={{ padding: '1rem 1.25rem' }}>
          <div className="flex items-center justify-between mb-2">
            <span style={{ fontSize: '12px', fontWeight: 600, color: 'var(--text-secondary)' }}>
              Rejected / Spoiled Lines
            </span>
            <div style={{ padding: '6px', borderRadius: '8px', backgroundColor: 'rgba(239, 68, 68, 0.12)', color: '#ef4444' }}>
              <XCircle size={18} />
            </div>
          </div>
          <div className="flex items-baseline gap-2 mb-1">
            <span style={{ fontSize: '1.65rem', fontWeight: 800, color: '#ef4444' }}>
              {totalRejectedCount} Spoiled
            </span>
            <span style={{ fontSize: '12px', fontWeight: 600, color: 'var(--text-tertiary)' }}>
              ({100 - avgValidRate}% error margin)
            </span>
          </div>
          <div className="text-xs" style={{ color: 'var(--text-tertiary)', marginTop: '4px' }}>
            Out-of-county addresses, illegible ink, or duplicate voters.
          </div>
        </Card>

        <Card style={{ padding: '1rem 1.25rem' }}>
          <div className="flex items-center justify-between mb-2">
            <span style={{ fontSize: '12px', fontWeight: 600, color: 'var(--text-secondary)' }}>
              Estimated Shift Earnings
            </span>
            <div style={{ padding: '6px', borderRadius: '8px', backgroundColor: 'rgba(245, 158, 11, 0.12)', color: '#f59e0b' }}>
              <DollarSign size={18} />
            </div>
          </div>
          <div className="flex items-baseline gap-2 mb-1">
            <span style={{ fontSize: '1.65rem', fontWeight: 800, color: 'var(--text-primary)' }}>
              ${totalEstCommission.toFixed(2)}
            </span>
            <span style={{ fontSize: '12px', fontWeight: 700, color: '#10b981' }}>
              Pending Payout
            </span>
          </div>
          <div className="text-xs" style={{ color: 'var(--text-secondary)', marginTop: '4px' }}>
            Disbursed via ADP payroll upon physical batch turn-in.
          </div>
        </Card>
      </div>

      {/* 3. Daily #s Reporting Form */}
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
              <CheckSquare size={20} style={{ color: '#0284c7' }} />
              Log Shift Signature Numbers
            </h2>
            <p style={{ margin: '2px 0 0 0', fontSize: '13px', color: 'var(--text-secondary)' }}>
              Enter the counts gathered during your active field shift. Keep your paper clipboard sheets organized.
            </p>
          </div>

          <Badge variant="primary" size="sm">
            Field Ops Shift Logger
          </Badge>
        </div>

        <form onSubmit={handleSubmitDaily} className="flex flex-col gap-4">
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
              gap: '1rem',
            }}
          >
            {/* Shift Date */}
            <div className="flex flex-col gap-1.5">
              <label style={{ fontSize: '12px', fontWeight: 700, color: 'var(--text-primary)' }}>
                Shift Date *
              </label>
              <Input
                type="date"
                value={formData.date}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                required
              />
            </div>

            {/* Campaign Selection */}
            <div className="flex flex-col gap-1.5">
              <label style={{ fontSize: '12px', fontWeight: 700, color: 'var(--text-primary)' }}>
                Select Petition Project / Category *
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

            {/* Hours Worked */}
            <div className="flex flex-col gap-1.5">
              <label style={{ fontSize: '12px', fontWeight: 700, color: 'var(--text-primary)' }}>
                Field Hours (Duration) *
              </label>
              <Input
                type="number"
                step="0.5"
                min="0.5"
                max="16"
                placeholder="e.g. 4.5"
                value={formData.shiftHours}
                onChange={(e) => setFormData({ ...formData, shiftHours: e.target.value })}
                required
              />
            </div>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
              gap: '1rem',
            }}
          >
            {/* Total Signatures Collected */}
            <div className="flex flex-col gap-1.5">
              <label style={{ fontSize: '12px', fontWeight: 700, color: 'var(--text-primary)' }}>
                Total Signatures Collected (Gross) *
              </label>
              <Input
                type="number"
                placeholder="e.g. 45"
                value={formData.signatures}
                onChange={(e) => handleSignaturesChange(e.target.value)}
                required
              />
            </div>

            {/* Estimated Valid Signatures */}
            <div className="flex flex-col gap-1.5">
              <label style={{ fontSize: '12px', fontWeight: 700, color: 'var(--text-primary)' }}>
                Estimated Valid Sigs (90% est.)
              </label>
              <Input
                type="number"
                placeholder="e.g. 40"
                value={formData.estimatedValid}
                onChange={(e) => setFormData({ ...formData, estimatedValid: e.target.value })}
              />
            </div>

            {/* Rejected / Spoiled Lines */}
            <div className="flex flex-col gap-1.5">
              <label style={{ fontSize: '12px', fontWeight: 700, color: 'var(--text-primary)' }}>
                Spoiled / Crossed Out Lines
              </label>
              <Input
                type="number"
                placeholder="e.g. 5"
                value={formData.rejected}
                onChange={(e) => setFormData({ ...formData, rejected: e.target.value })}
              />
            </div>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))',
              gap: '1rem',
            }}
          >
            {/* Location & County */}
            <div className="flex flex-col gap-1.5">
              <label style={{ fontSize: '12px', fontWeight: 700, color: 'var(--text-primary)' }}>
                Staging Location / Intersection *
              </label>
              <Input
                type="text"
                placeholder="e.g. Downtown Metro Station North Plaza"
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                required
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label style={{ fontSize: '12px', fontWeight: 700, color: 'var(--text-primary)' }}>
                County Jurisdiction *
              </label>
              <Select
                value={formData.county}
                onChange={(e) => setFormData({ ...formData, county: e.target.value })}
                options={[
                  { value: 'Los Angeles County', label: 'Los Angeles County' },
                  { value: 'Alameda County', label: 'Alameda County' },
                  { value: 'Contra Costa County', label: 'Contra Costa County' },
                  { value: 'Orange County', label: 'Orange County' },
                  { value: 'San Diego County', label: 'San Diego County' },
                ]}
              />
            </div>
          </div>

          {/* Notes & Field Observations */}
          <div className="flex flex-col gap-1.5">
            <label style={{ fontSize: '12px', fontWeight: 700, color: 'var(--text-primary)' }}>
              Weather, Foot Traffic & Field Observations (Optional)
            </label>
            <textarea
              rows={2}
              className="form-input"
              style={{
                width: '100%',
                padding: '0.65rem 0.85rem',
                borderRadius: '10px',
                border: '1px solid var(--border)',
                backgroundColor: 'var(--surface)',
                color: 'var(--text-primary)',
                fontSize: '13px',
                fontFamily: 'inherit',
                boxSizing: 'border-box',
              }}
              placeholder="e.g. Sunny afternoon, consistent voter turnout between 12-2 PM; security requested gatherers move 10ft from transit entrance."
              value={formData.weatherNotes}
              onChange={(e) => setFormData({ ...formData, weatherNotes: e.target.value })}
            />
          </div>

          <div
            style={{
              padding: '0.75rem 1rem',
              backgroundColor: 'rgba(14, 165, 233, 0.08)',
              border: '1px solid rgba(14, 165, 233, 0.25)',
              borderRadius: '12px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '1rem',
            }}
          >
            <div className="flex items-center gap-2.5">
              <Info size={16} style={{ color: '#0284c7', flexShrink: 0 }} />
              <span style={{ fontSize: '12.5px', color: 'var(--text-secondary)' }}>
                Reminder: Daily numbers establish an audit trail. You must turn in physical sheets or upload page scans for validation.
              </span>
            </div>

            <Button
              variant="primary"
              type="submit"
              icon={CheckSquare}
              disabled={isSubmitting}
              style={{ flexShrink: 0 }}
            >
              {isSubmitting ? 'Submitting...' : 'Submit Daily #s'}
            </Button>
          </div>
        </form>
      </Card>

      {/* 4. Filterable Daily & Weekly Shift History Table */}
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
              <Clock size={18} style={{ color: '#0284c7' }} />
              Shift Activity & Daily #s History Logbook
            </h3>
            <p style={{ margin: '2px 0 0 0', fontSize: '12.5px', color: 'var(--text-secondary)' }}>
              Comprehensive log of verified shifts, hourly run rates, and payout statements.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <Badge variant="neutral" size="sm">
              {filteredLogs.length} Shifts Recorded
            </Badge>
          </div>
        </div>

        {/* Filter Toolbar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
            {['All', 'Statewide Initiative', 'County Bond', 'Municipal Election'].map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setCategoryFilter(cat)}
                style={{
                  padding: '5px 12px',
                  borderRadius: '10px',
                  fontSize: '12px',
                  fontWeight: categoryFilter === cat ? 700 : 500,
                  backgroundColor: categoryFilter === cat ? '#0284c7' : 'var(--surface-secondary)',
                  color: categoryFilter === cat ? '#ffffff' : 'var(--text-secondary)',
                  border: '1px solid var(--border)',
                  cursor: 'pointer',
                  whiteSpace: 'nowrap',
                  transition: 'all 0.15s ease',
                }}
              >
                {cat}
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
              placeholder="Search shift, location, ID..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
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

        {/* Table Body */}
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
                <th style={{ padding: '0.85rem 1rem' }}>Shift ID & Date</th>
                <th style={{ padding: '0.85rem 1rem' }}>Petition Campaign</th>
                <th style={{ padding: '0.85rem 1rem' }}>Location & County</th>
                <th style={{ padding: '0.85rem 1rem' }}>Hours & Speed</th>
                <th style={{ padding: '0.85rem 1rem' }}>Signatures (Valid / Sigs)</th>
                <th style={{ padding: '0.85rem 1rem', textAlign: 'right' }}>Est. Pay</th>
                <th style={{ padding: '0.85rem 1rem', textAlign: 'center' }}>Validation Status</th>
                <th style={{ padding: '0.85rem 1rem', textAlign: 'right' }}>Actions</th>
              </tr>
            </thead>
            <tbody style={{ divideY: '1px solid var(--border)' }}>
              {filteredLogs.map((log) => (
                <tr
                  key={log.id}
                  style={{
                    borderBottom: '1px solid var(--border)',
                    backgroundColor: 'transparent',
                    transition: 'background-color 0.15s ease',
                  }}
                  className="hover:bg-surface-secondary"
                >
                  {/* Shift ID & Date */}
                  <td style={{ padding: '0.85rem 1rem' }}>
                    <div style={{ fontFamily: 'monospace', fontWeight: 800, fontSize: '12px', color: '#0284c7' }}>
                      {log.id}
                    </div>
                    <div style={{ fontSize: '12px', color: 'var(--text-secondary)', marginTop: '2px' }}>
                      {log.date}
                    </div>
                  </td>

                  {/* Petition Campaign */}
                  <td style={{ padding: '0.85rem 1rem' }}>
                    <div style={{ fontWeight: 700, fontSize: '13px', color: 'var(--text-primary)' }}>
                      {log.projectTitle}
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
                        {log.category}
                      </span>
                      <span style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>
                        ${log.rate.toFixed(2)}/sig
                      </span>
                    </div>
                  </td>

                  {/* Location & County */}
                  <td style={{ padding: '0.85rem 1rem' }}>
                    <div style={{ fontSize: '12.5px', fontWeight: 600, color: 'var(--text-primary)' }}>
                      {log.location}
                    </div>
                    <div className="flex items-center gap-1 text-xs mt-0.5" style={{ color: 'var(--text-tertiary)' }}>
                      <MapPin size={11} /> {log.county}
                    </div>
                  </td>

                  {/* Hours & Run Rate */}
                  <td style={{ padding: '0.85rem 1rem' }}>
                    <div style={{ fontSize: '13px', fontWeight: 700, color: 'var(--text-primary)' }}>
                      {log.shiftDuration}
                    </div>
                    <div style={{ fontSize: '11px', color: '#0284c7', fontWeight: 600, marginTop: '1px' }}>
                      {log.runRate}
                    </div>
                  </td>

                  {/* Signatures */}
                  <td style={{ padding: '0.85rem 1rem' }}>
                    <div className="flex items-baseline gap-1.5">
                      <span style={{ fontSize: '1.05rem', fontWeight: 800, color: '#10b981' }}>
                        {log.validSigs}
                      </span>
                      <span style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>
                        / {log.signatures} total
                      </span>
                    </div>
                    <div style={{ fontSize: '10.5px', color: '#ef4444', marginTop: '1px' }}>
                      -{log.rejectedSigs} rejected
                    </div>
                  </td>

                  {/* Est. Payout */}
                  <td style={{ padding: '0.85rem 1rem', textAlign: 'right' }}>
                    <div style={{ fontSize: '1.05rem', fontWeight: 800, color: 'var(--text-primary)' }}>
                      ${log.estPayout.toFixed(2)}
                    </div>
                    <div style={{ fontSize: '10px', color: 'var(--text-tertiary)' }}>
                      ADP Gross
                    </div>
                  </td>

                  {/* Validation Status */}
                  <td style={{ padding: '0.85rem 1rem', textAlign: 'center' }}>
                    <Badge variant={log.statusBadge} size="sm">
                      {log.status}
                    </Badge>
                  </td>

                  {/* Actions */}
                  <td style={{ padding: '0.85rem 1rem', textAlign: 'right' }}>
                    <Button
                      variant="ghost"
                      size="sm"
                      icon={Eye}
                      onClick={() => setSelectedShiftDetails(log)}
                    >
                      Details
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* ======================================================== */}
      {/* MODAL: SHIFT RECEIPT & AUDIT INSPECTION SLIP             */}
      {/* ======================================================== */}
      {selectedShiftDetails && (
        <Modal
          isOpen={Boolean(selectedShiftDetails)}
          onClose={() => setSelectedShiftDetails(null)}
          title={`Shift Verification Slip — ${selectedShiftDetails.id}`}
          maxWidth="560px"
        >
          <div className="flex flex-col gap-4">
            <div
              style={{
                backgroundColor: 'var(--surface-secondary)',
                borderRadius: '16px',
                padding: '1.25rem',
                border: '1px solid var(--border)',
                display: 'flex',
                flexDirection: 'column',
                gap: '0.75rem',
              }}
            >
              <div className="flex items-center justify-between pb-3 border-b border-border">
                <div>
                  <span style={{ fontSize: '10.5px', fontWeight: 700, color: 'var(--text-tertiary)', textTransform: 'uppercase' }}>
                    Official Field Shift Slip
                  </span>
                  <h4 style={{ margin: '2px 0 0 0', fontSize: '1.1rem', fontWeight: 800, color: 'var(--text-primary)' }}>
                    {selectedShiftDetails.projectTitle}
                  </h4>
                </div>
                <Badge variant={selectedShiftDetails.statusBadge} size="md">
                  {selectedShiftDetails.status}
                </Badge>
              </div>

              <div className="grid grid-cols-2 gap-3 text-xs">
                <div>
                  <span style={{ color: 'var(--text-tertiary)' }}>Shift Date:</span>
                  <div style={{ fontWeight: 700, color: 'var(--text-primary)', marginTop: '2px' }}>
                    {selectedShiftDetails.date}
                  </div>
                </div>

                <div>
                  <span style={{ color: 'var(--text-tertiary)' }}>Field Hours:</span>
                  <div style={{ fontWeight: 700, color: 'var(--text-primary)', marginTop: '2px' }}>
                    {selectedShiftDetails.shiftDuration} ({selectedShiftDetails.runRate})
                  </div>
                </div>

                <div>
                  <span style={{ color: 'var(--text-tertiary)' }}>Gathering Location:</span>
                  <div style={{ fontWeight: 700, color: 'var(--text-primary)', marginTop: '2px' }}>
                    {selectedShiftDetails.location}
                  </div>
                </div>

                <div>
                  <span style={{ color: 'var(--text-tertiary)' }}>County Jurisdiction:</span>
                  <div style={{ fontWeight: 700, color: 'var(--text-primary)', marginTop: '2px' }}>
                    {selectedShiftDetails.county}
                  </div>
                </div>
              </div>

              <div
                style={{
                  padding: '0.75rem',
                  borderRadius: '10px',
                  backgroundColor: 'var(--surface)',
                  border: '1px solid var(--border)',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}
              >
                <div>
                  <div style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>Signatures Breakdown:</div>
                  <div style={{ fontSize: '13px', fontWeight: 700, color: 'var(--text-primary)', marginTop: '2px' }}>
                    <span style={{ color: '#10b981' }}>{selectedShiftDetails.validSigs} Valid</span> •{' '}
                    <span style={{ color: '#ef4444' }}>{selectedShiftDetails.rejectedSigs} Rejected</span> •{' '}
                    <span>{selectedShiftDetails.signatures} Gross</span>
                  </div>
                </div>

                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>Estimated Commission:</div>
                  <div style={{ fontSize: '1.25rem', fontWeight: 800, color: '#10b981', marginTop: '2px' }}>
                    ${selectedShiftDetails.estPayout.toFixed(2)}
                  </div>
                </div>
              </div>

              <div>
                <span style={{ fontSize: '11px', color: 'var(--text-tertiary)', fontWeight: 600 }}>
                  Circulator Field Notes:
                </span>
                <p style={{ margin: '4px 0 0 0', fontSize: '12.5px', color: 'var(--text-secondary)', fontStyle: 'italic' }}>
                  "{selectedShiftDetails.notes}"
                </p>
              </div>
            </div>

            <div className="flex items-center justify-between pt-2 border-t border-border">
              <Button
                variant="outline"
                size="sm"
                icon={UploadCloud}
                onClick={() => {
                  setSelectedShiftDetails(null);
                  navigate('/crm/petition-uploads');
                }}
              >
                Upload Scans for this Shift
              </Button>

              <Button
                variant="primary"
                size="sm"
                onClick={() => setSelectedShiftDetails(null)}
              >
                Close Slip
              </Button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default MyDailyNumbers;
