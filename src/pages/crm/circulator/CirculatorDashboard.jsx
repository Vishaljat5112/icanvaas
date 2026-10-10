import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  CheckSquare,
  Target,
  Clock,
  Layers,
  Play,
  Square,
  Plus,
  UploadCloud,
  FileCheck2,
  FileSpreadsheet,
  MapPin,
  TrendingUp,
  DollarSign,
  AlertCircle,
  ChevronRight,
  ShieldCheck,
  UserCheck,
  User,
  Camera,
  CheckCircle2,
  Award,
  Sparkles,
  Info,
  Calendar,
  Building2,
  Eye,
  RefreshCw,
  FolderOpen
} from 'lucide-react';
import {
  Breadcrumb,
  Button,
  KPICard,
  Card,
  Badge,
  ProgressBar,
  Modal,
  Input,
  Select,
} from '../../../components/ui';
import { useAuth } from '../../../context/AuthContext';
import { useToast } from '../../../context/ToastContext';

export const CirculatorDashboard = () => {
  const navigate = useNavigate();
  const { crmUser } = useAuth();
  const { addToast } = useToast();

  const userName = crmUser?.name || 'Tanya Sterling';
  const userCompany = crmUser?.company || 'Field Ops Inc.';

  // Live Shift State
  const [isShiftActive, setIsShiftActive] = useState(true);
  const [shiftSeconds, setShiftSeconds] = useState(14420); // ~4 hours active
  const [shiftTimeFormatted, setShiftTimeFormatted] = useState('04:00:20');

  useEffect(() => {
    let interval = null;
    if (isShiftActive) {
      interval = setInterval(() => {
        setShiftSeconds((prev) => {
          const next = prev + 1;
          const hrs = String(Math.floor(next / 3600)).padStart(2, '0');
          const mins = String(Math.floor((next % 3600) / 60)).padStart(2, '0');
          const secs = String(next % 60).padStart(2, '0');
          setShiftTimeFormatted(`${hrs}:${mins}:${secs}`);
          return next;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isShiftActive]);

  const toggleShift = () => {
    if (isShiftActive) {
      setIsShiftActive(false);
      addToast({
        title: 'Shift Paused',
        message: `Shift ended at ${shiftTimeFormatted}. Don't forget to submit your Daily #s!`,
        type: 'info',
      });
    } else {
      setIsShiftActive(true);
      addToast({
        title: 'Shift Started',
        message: 'Active shift tracking enabled. Your field hours are now being logged.',
        type: 'success',
      });
    }
  };

  // KPIs & Dynamic Counts
  const [todaySigs, setTodaySigs] = useState(45);
  const dailyTarget = 60;
  const targetPercent = Math.min(Math.round((todaySigs / dailyTarget) * 100), 100);

  // Active Petition Projects / Categories
  const [petitions, setPetitions] = useState([
    {
      id: 'PRJ-101',
      title: 'Prop 12 - Clean Energy Ballot',
      category: 'Statewide Initiative',
      baseRate: 3.50,
      description: 'Mandate 100% clean energy usage by 2035 across California.',
      collectedToday: 30,
      campaignProgress: 58,
      totalCampaignTarget: '25,000 sigs',
      jurisdiction: 'California Statewide',
      badgeColor: 'primary',
      rateColor: '#38bdf8',
    },
    {
      id: 'PRJ-103',
      title: 'Education Bond Measure C',
      category: 'County Bond',
      baseRate: 4.00,
      description: 'Public school infrastructure and digital lab modernization funds.',
      collectedToday: 15,
      campaignProgress: 89,
      totalCampaignTarget: '10,000 sigs',
      jurisdiction: 'Alameda & Contra Costa',
      badgeColor: 'success',
      rateColor: '#10b981',
    },
    {
      id: 'PRJ-102',
      title: 'Local Mayor Petition (District 4)',
      category: 'Municipal Election',
      baseRate: 2.00,
      description: 'Signature drive for the non-partisan municipal mayoral seat.',
      collectedToday: 0,
      campaignProgress: 64,
      totalCampaignTarget: '5,000 sigs',
      jurisdiction: 'City District 4 Only',
      badgeColor: 'warning',
      rateColor: '#f59e0b',
    },
  ]);

  // Recent Daily Numbers Submissions
  const [recentLogs, setRecentLogs] = useState([
    {
      id: 1,
      date: 'Today, 2:30 PM',
      project: 'Prop 12 - Clean Energy Ballot',
      category: 'Statewide Initiative',
      signatures: 45,
      hours: '4.0 hrs',
      location: 'Downtown Metro Station',
      status: 'Pending Validation',
    },
    {
      id: 2,
      date: 'Yesterday, 4:00 PM',
      project: 'Prop 12 - Clean Energy Ballot',
      category: 'Statewide Initiative',
      signatures: 82,
      hours: '6.5 hrs',
      location: 'City Park Civic Center',
      status: 'Validated (92%)',
    },
    {
      id: 3,
      date: 'Oct 03, 1:15 PM',
      project: 'Local Mayor Petition',
      category: 'Municipal Election',
      signatures: 30,
      hours: '3.0 hrs',
      location: 'Westside Mall Plaza',
      status: 'Validated (88%)',
    },
    {
      id: 4,
      date: 'Oct 02, 5:45 PM',
      project: 'Education Bond Measure C',
      category: 'County Bond',
      signatures: 55,
      hours: '5.0 hrs',
      location: 'East Bay Community Center',
      status: 'Validated (95%)',
    },
  ]);

  // Turn-In Batches Ledger
  const [turnInBatches, setTurnInBatches] = useState([
    {
      id: 'TI-1049',
      date: 'Today, 11:30 AM',
      project: 'Prop 12 - Clean Energy Ballot',
      sheets: 5,
      claimedSigs: 45,
      location: 'Downtown District Office',
      manager: 'Leo Fontaine',
      status: 'In Audit Queue',
      statusBadge: 'warning',
    },
    {
      id: 'TI-1038',
      date: 'Yesterday, 5:15 PM',
      project: 'Prop 12 - Clean Energy Ballot',
      sheets: 8,
      claimedSigs: 82,
      location: 'Field Trailer Drop Box #2',
      manager: 'Leo Fontaine',
      status: 'Validated (75 Valid)',
      statusBadge: 'success',
    },
    {
      id: 'TI-1022',
      date: 'Sep 30, 6:00 PM',
      project: 'Education Bond Measure C',
      sheets: 6,
      claimedSigs: 55,
      location: 'Regional HQ Office',
      manager: 'Marcus Vance',
      status: 'Paid ($220.00)',
      statusBadge: 'success',
    },
  ]);

  // Modal 1: Log My Daily #s Form State
  const [isDailyModalOpen, setIsDailyModalOpen] = useState(false);
  const [dailyForm, setDailyForm] = useState({
    projectId: 'PRJ-101',
    signatures: '',
    hours: '4.0',
    location: 'Downtown Metro Station',
    notes: '',
  });

  // Modal 2: My Turn In Form State
  const [isTurnInModalOpen, setIsTurnInModalOpen] = useState(false);
  const [turnInForm, setTurnInForm] = useState({
    projectId: 'PRJ-101',
    sheets: '3',
    signatures: '30',
    location: 'Downtown District Office',
    manager: 'Leo Fontaine',
    notes: 'Sheets 1-3 complete with circulator affidavit signed.',
  });

  // Modal 3: Upload Petitions State
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [uploadForm, setUploadForm] = useState({
    projectId: 'PRJ-101',
    docType: 'Signed Petition Sheet (Front)',
    pageNumber: '1',
    sheetSigs: '10',
  });
  const [uploadSimulating, setUploadSimulating] = useState(false);
  const [uploadSuccessMessage, setUploadSuccessMessage] = useState(null);

  // Quick Action Handlers
  const handleOpenDailyModal = (defaultProjectId = 'PRJ-101') => {
    setDailyForm((prev) => ({ ...prev, projectId: defaultProjectId }));
    setIsDailyModalOpen(true);
  };

  const handleOpenTurnInModal = (defaultProjectId = 'PRJ-101') => {
    setTurnInForm((prev) => ({ ...prev, projectId: defaultProjectId }));
    setIsTurnInModalOpen(true);
  };

  const handleDailySubmit = (e) => {
    e.preventDefault();
    const sigCount = parseInt(dailyForm.signatures, 10);
    if (isNaN(sigCount) || sigCount <= 0) {
      addToast({
        title: 'Validation Error',
        message: 'Please enter a valid signature count collected today.',
        type: 'error',
      });
      return;
    }

    const selectedProject = petitions.find((p) => p.id === dailyForm.projectId) || petitions[0];

    const newLog = {
      id: Date.now(),
      date: 'Just now',
      project: selectedProject.title,
      category: selectedProject.category,
      signatures: sigCount,
      hours: `${dailyForm.hours} hrs`,
      location: dailyForm.location || 'Assigned Territory',
      status: 'Pending Validation',
    };

    setRecentLogs([newLog, ...recentLogs]);
    setTodaySigs((prev) => prev + sigCount);

    addToast({
      title: 'Daily #s Logged Successfully',
      message: `Recorded ${sigCount} signatures for ${selectedProject.title}.`,
      type: 'success',
    });

    setIsDailyModalOpen(false);
    setDailyForm({
      projectId: 'PRJ-101',
      signatures: '',
      hours: '4.0',
      location: 'Downtown Metro Station',
      notes: '',
    });
  };

  const handleTurnInSubmit = (e) => {
    e.preventDefault();
    const sheetsCount = parseInt(turnInForm.sheets, 10) || 1;
    const sigsCount = parseInt(turnInForm.signatures, 10) || 10;
    const selectedProject = petitions.find((p) => p.id === turnInForm.projectId) || petitions[0];
    const newBatchId = `TI-${Math.floor(1000 + Math.random() * 9000)}`;

    const newBatch = {
      id: newBatchId,
      date: 'Just now',
      project: selectedProject.title,
      sheets: sheetsCount,
      claimedSigs: sigsCount,
      location: turnInForm.location,
      manager: turnInForm.manager,
      status: 'In Audit Queue',
      statusBadge: 'warning',
    };

    setTurnInBatches([newBatch, ...turnInBatches]);

    addToast({
      title: `Turn-In Batch Generated: ${newBatchId}`,
      message: `Successfully registered turn-in of ${sheetsCount} sheets (${sigsCount} signatures) to ${turnInForm.manager}.`,
      type: 'success',
    });

    setIsTurnInModalOpen(false);
  };

  const handleSimulateUpload = (e) => {
    e.preventDefault();
    setUploadSimulating(true);
    setUploadSuccessMessage(null);

    setTimeout(() => {
      setUploadSimulating(false);
      const selectedProject = petitions.find((p) => p.id === uploadForm.projectId) || petitions[0];
      setUploadSuccessMessage(`Uploaded Sheet #${uploadForm.pageNumber} (${uploadForm.sheetSigs} sigs) for ${selectedProject.title}`);
      addToast({
        title: 'Petition Sheet Scanned',
        message: `High-res upload complete for Sheet #${uploadForm.pageNumber}. Sent to validation OCR pipeline.`,
        type: 'success',
      });
    }, 1500);
  };

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
        paddingBottom: '2.5rem',
      }}
    >
      {/* 1. Header & Circulator Identity Strip */}
      <div
        style={{
          backgroundColor: 'var(--surface)',
          border: '1px solid var(--border)',
          borderRadius: '20px',
          padding: '1.25rem 1.5rem',
          boxShadow: 'var(--shadow-sm)',
          display: 'flex',
          flexDirection: 'column',
          gap: '1.25rem',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Subtle decorative background gradient accent */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            right: 0,
            width: '320px',
            height: '100%',
            background: 'radial-gradient(circle at top right, rgba(56, 189, 248, 0.08) 0%, transparent 70%)',
            pointerEvents: 'none',
          }}
        />

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-start md:items-center gap-3.5">
            <div
              style={{
                width: '52px',
                height: '52px',
                borderRadius: '16px',
                background: 'linear-gradient(135deg, #0284c7 0%, #2563eb 50%, #4f46e5 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#ffffff',
                boxShadow: '0 8px 16px -4px rgba(37, 99, 235, 0.4)',
                flexShrink: 0,
              }}
            >
              <UserCheck size={28} />
            </div>

            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h1
                  style={{
                    fontSize: '1.5rem',
                    fontWeight: 800,
                    margin: 0,
                    color: 'var(--text-primary)',
                    letterSpacing: '-0.02em',
                  }}
                >
                  Welcome, {userName}
                </h1>
                <Badge variant="primary" size="sm">
                  Circulator • Basic Tier
                </Badge>
                <Badge variant="success" size="sm">
                  <ShieldCheck size={12} className="mr-1" />
                  ID Verified
                </Badge>
              </div>

              <div
                className="flex items-center gap-3 text-xs flex-wrap mt-1"
                style={{ color: 'var(--text-secondary)' }}
              >
                <span>
                  <strong style={{ color: 'var(--text-primary)' }}>Badge ID:</strong> CIR-88204
                </span>
                <span>•</span>
                <span>
                  <strong style={{ color: 'var(--text-primary)' }}>Manager:</strong> Leo Fontaine
                </span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <MapPin size={12} style={{ color: '#ef4444' }} />
                  Downtown District 4 (California)
                </span>
              </div>
            </div>
          </div>

          {/* Active Shift Controls */}
          <div
            className="flex items-center justify-between md:justify-end gap-3 p-2 pl-3 rounded-2xl"
            style={{
              backgroundColor: 'var(--surface-secondary)',
              border: '1px solid var(--border)',
            }}
          >
            <div className="flex flex-col pr-2">
              <span
                style={{
                  fontSize: '10px',
                  fontWeight: 700,
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em',
                  color: 'var(--text-tertiary)',
                }}
              >
                Shift Status
              </span>
              <div className="flex items-center gap-1.5">
                <span
                  style={{
                    width: '8px',
                    height: '8px',
                    borderRadius: '50%',
                    backgroundColor: isShiftActive ? '#10b981' : '#94a3b8',
                    boxShadow: isShiftActive ? '0 0 8px #10b981' : 'none',
                  }}
                />
                <span
                  style={{
                    fontFamily: 'monospace',
                    fontSize: '1.1rem',
                    fontWeight: 700,
                    color: isShiftActive ? 'var(--text-primary)' : 'var(--text-secondary)',
                  }}
                >
                  {isShiftActive ? shiftTimeFormatted : 'PAUSED'}
                </span>
              </div>
            </div>

            <Button
              variant={isShiftActive ? 'danger' : 'primary'}
              size="sm"
              icon={isShiftActive ? Square : Play}
              onClick={toggleShift}
            >
              {isShiftActive ? 'Pause Shift' : 'Resume Shift'}
            </Button>
          </div>
        </div>

        {/* 2. High-Priority Field Action Bar */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
            gap: '0.75rem',
            paddingTop: '0.75rem',
            borderTop: '1px solid var(--border)',
          }}
        >
          <Button
            variant="primary"
            icon={CheckSquare}
            onClick={() => handleOpenDailyModal('PRJ-101')}
            style={{
              justifyContent: 'center',
              fontWeight: 700,
              background: 'linear-gradient(135deg, #0284c7 0%, #2563eb 100%)',
              boxShadow: '0 4px 12px rgba(37, 99, 235, 0.25)',
            }}
          >
            Log My Daily #s
          </Button>

          <Button
            variant="secondary"
            icon={FileCheck2}
            onClick={() => navigate('/crm/turn-in')}
            style={{ justifyContent: 'center', fontWeight: 600 }}
          >
            My Turn In (Drop-Off)
          </Button>

          <Button
            variant="secondary"
            icon={UploadCloud}
            onClick={() => navigate('/crm/petition-uploads')}
            style={{ justifyContent: 'center', fontWeight: 600 }}
          >
            Upload Petitions / Scans
          </Button>

          <Button
            variant="outline"
            icon={DollarSign}
            onClick={() => navigate('/crm/commissions')}
            style={{ justifyContent: 'center', fontWeight: 600 }}
          >
            My Commissions ($1,245.50)
          </Button>

          <Button
            variant="outline"
            icon={User}
            onClick={() => navigate('/crm/profile')}
            style={{ justifyContent: 'center', fontWeight: 600 }}
          >
            My Profile & Badge
          </Button>

          <Button
            variant="ghost"
            icon={TrendingUp}
            onClick={() => navigate('/crm/tracker')}
            style={{ justifyContent: 'center', fontWeight: 600 }}
          >
            Full Activity Tracker
          </Button>
        </div>
      </div>

      {/* 3. Four Core Metric KPI Cards */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
          gap: '1rem',
        }}
      >
        <KPICard
          title="Today's Signatures"
          value={`${todaySigs} Sigs`}
          change="+12.5%"
          changeType="positive"
          changePeriod="vs yesterday"
          icon={CheckSquare}
          iconBg="rgba(14, 165, 233, 0.12)"
          iconColor="#0284c7"
          onClick={() => navigate('/crm/daily-numbers')}
        />

        {/* Daily Target vs. Actual */}
        <div
          style={{
            backgroundColor: 'var(--surface)',
            border: '1px solid var(--border)',
            borderRadius: '14px',
            padding: '1rem',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            boxShadow: 'var(--shadow-sm)',
            minHeight: '136px',
          }}
        >
          <div className="flex items-center justify-between">
            <span style={{ fontSize: '12px', fontWeight: 600, color: 'var(--text-secondary)' }}>
              Daily Target vs. Actual
            </span>
            <div
              style={{
                padding: '6px',
                borderRadius: '8px',
                backgroundColor: 'rgba(16, 185, 129, 0.12)',
                color: '#10b981',
              }}
            >
              <Target size={18} />
            </div>
          </div>

          <div>
            <div className="flex items-baseline justify-between mb-1">
              <span style={{ fontSize: '1.65rem', fontWeight: 800, color: 'var(--text-primary)' }}>
                {todaySigs}{' '}
                <span style={{ fontSize: '0.9rem', fontWeight: 500, color: 'var(--text-tertiary)' }}>
                  / {dailyTarget} sigs
                </span>
              </span>
              <span style={{ fontSize: '12px', fontWeight: 700, color: '#10b981' }}>
                {targetPercent}% Met
              </span>
            </div>

            <ProgressBar value={todaySigs} max={dailyTarget} variant="success" size="sm" />
          </div>

          <div className="flex items-center justify-between text-xs" style={{ color: 'var(--text-tertiary)' }}>
            <span>{Math.max(dailyTarget - todaySigs, 0)} needed for bonus</span>
            <span style={{ color: '#0284c7', fontWeight: 600 }}>+$25 Daily Tier</span>
          </div>
        </div>

        <KPICard
          title="Pending Validation"
          value="45 Sigs"
          change="88% Valid Rate"
          changeType="neutral"
          changePeriod="est. $157.50 pay"
          icon={Clock}
          iconBg="rgba(245, 158, 11, 0.12)"
          iconColor="#f59e0b"
          onClick={() => navigate('/crm/commissions')}
        />

        <KPICard
          title="Active Categories"
          value="3 Petitions"
          change="Up to $4.00/sig"
          changeType="positive"
          changePeriod="California region"
          icon={Layers}
          iconBg="rgba(99, 102, 241, 0.12)"
          iconColor="#6366f1"
          onClick={() => navigate('/crm/categories')}
        />
      </div>

      {/* 4. Active Petition Categories & Campaign Rates */}
      <Card style={{ padding: '1.25rem 1.5rem' }}>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
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
              <Layers size={20} style={{ color: '#0284c7' }} />
              Active Petition Categories & Approved Rates
            </h2>
            <p style={{ margin: '2px 0 0 0', fontSize: '13px', color: 'var(--text-secondary)' }}>
              Select a petition to log daily numbers, check valid county guidelines, and review commission per signature.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <Badge variant="neutral" size="sm">
              3 Active Campaigns
            </Badge>
            <Button
              variant="outline"
              size="sm"
              icon={Layers}
              onClick={() => navigate('/crm/categories')}
            >
              Browse 100 Categories
            </Button>
          </div>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '1rem',
          }}
        >
          {petitions.map((prj) => (
            <div
              key={prj.id}
              style={{
                backgroundColor: 'var(--surface-secondary)',
                border: '1px solid var(--border)',
                borderRadius: '16px',
                padding: '1.1rem',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                gap: '0.85rem',
                transition: 'all 0.2s ease',
              }}
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-2">
                  <Badge variant={prj.badgeColor} size="sm">
                    {prj.category}
                  </Badge>

                  <div
                    style={{
                      fontSize: '1.1rem',
                      fontWeight: 800,
                      color: prj.rateColor,
                      display: 'flex',
                      alignItems: 'center',
                      gap: '2px',
                    }}
                  >
                    <span>${prj.baseRate.toFixed(2)}</span>
                    <span style={{ fontSize: '10px', fontWeight: 600, color: 'var(--text-tertiary)' }}>
                      / valid sig
                    </span>
                  </div>
                </div>

                <h3
                  style={{
                    fontSize: '1rem',
                    fontWeight: 700,
                    color: 'var(--text-primary)',
                    margin: '0 0 4px 0',
                  }}
                >
                  {prj.title}
                </h3>
                <p
                  style={{
                    fontSize: '12.5px',
                    color: 'var(--text-secondary)',
                    margin: 0,
                    lineHeight: '1.4',
                  }}
                >
                  {prj.description}
                </p>
              </div>

              <div>
                <div className="flex items-center justify-between text-xs mb-1" style={{ color: 'var(--text-secondary)' }}>
                  <span>Campaign Goal: {prj.totalCampaignTarget}</span>
                  <span style={{ fontWeight: 700, color: 'var(--text-primary)' }}>
                    {prj.campaignProgress}% Complete
                  </span>
                </div>
                <ProgressBar value={prj.campaignProgress} max={100} variant={prj.badgeColor} size="sm" />
              </div>

              <div
                style={{
                  paddingTop: '0.65rem',
                  borderTop: '1px solid var(--border)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  gap: '0.5rem',
                }}
              >
                <span
                  className="flex items-center gap-1 text-xs"
                  style={{ color: 'var(--text-tertiary)', fontSize: '11px' }}
                >
                  <MapPin size={12} />
                  {prj.jurisdiction}
                </span>

                <div className="flex items-center gap-1.5">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleOpenTurnInModal(prj.id)}
                    title="Turn In physical sheets for this petition"
                  >
                    Turn In
                  </Button>
                  <Button
                    variant="secondary"
                    size="sm"
                    icon={Plus}
                    onClick={() => handleOpenDailyModal(prj.id)}
                  >
                    Log Sigs
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* 5. Two-Column Split: Daily #s Logbook & My Turn-In Batches */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(460px, 1fr))',
          gap: '1.25rem',
        }}
      >
        {/* Left: Recent Daily #s Logbook */}
        <Card style={{ padding: '1.25rem' }}>
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3
                style={{
                  fontSize: '1.05rem',
                  fontWeight: 700,
                  color: 'var(--text-primary)',
                  margin: 0,
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                }}
              >
                <CheckSquare size={18} style={{ color: '#0284c7' }} />
                My Daily #s — Shift Activity Feed
              </h3>
              <p style={{ margin: '2px 0 0 0', fontSize: '12px', color: 'var(--text-secondary)' }}>
                Field signature submissions waiting for Validation Team verification.
              </p>
            </div>

            <Button
              variant="outline"
              size="sm"
              icon={Plus}
              onClick={() => handleOpenDailyModal('PRJ-101')}
            >
              Log Daily #s
            </Button>
          </div>

          <div className="flex flex-col gap-2.5">
            {recentLogs.map((log) => (
              <div
                key={log.id}
                style={{
                  backgroundColor: 'var(--surface-secondary)',
                  border: '1px solid var(--border)',
                  borderRadius: '12px',
                  padding: '0.85rem 1rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  gap: '0.75rem',
                }}
              >
                <div className="flex items-start gap-3">
                  <div
                    style={{
                      width: '36px',
                      height: '36px',
                      borderRadius: '10px',
                      backgroundColor: 'rgba(14, 165, 233, 0.12)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: '#0284c7',
                      flexShrink: 0,
                      marginTop: '2px',
                    }}
                  >
                    <CheckSquare size={18} />
                  </div>

                  <div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <span style={{ fontWeight: 700, fontSize: '13px', color: 'var(--text-primary)' }}>
                        {log.project}
                      </span>
                      <span
                        style={{
                          fontSize: '11px',
                          color: 'var(--text-tertiary)',
                          backgroundColor: 'var(--surface)',
                          padding: '1px 6px',
                          borderRadius: '4px',
                          border: '1px solid var(--border)',
                        }}
                      >
                        {log.category}
                      </span>
                    </div>

                    <div
                      className="flex items-center gap-2 text-xs mt-1"
                      style={{ color: 'var(--text-secondary)' }}
                    >
                      <span className="flex items-center gap-1">
                        <Clock size={11} /> {log.date} ({log.hours})
                      </span>
                      <span>•</span>
                      <span className="flex items-center gap-1">
                        <MapPin size={11} /> {log.location}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col items-end gap-1 flex-shrink-0">
                  <span style={{ fontWeight: 800, fontSize: '1.05rem', color: '#10b981' }}>
                    +{log.signatures} sigs
                  </span>
                  <Badge
                    variant={log.status.includes('Pending') ? 'warning' : 'success'}
                    size="sm"
                  >
                    {log.status}
                  </Badge>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-4 pt-3 border-t border-border flex justify-between items-center text-xs">
            <span style={{ color: 'var(--text-secondary)' }}>
              Showing {recentLogs.length} recent field entries
            </span>
            <Button
              variant="ghost"
              size="sm"
              iconRight={ChevronRight}
              onClick={() => navigate('/crm/daily-numbers')}
            >
              Full Logbook
            </Button>
          </div>
        </Card>

        {/* Right: My Turn In Batches Ledger */}
        <Card style={{ padding: '1.25rem' }}>
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3
                style={{
                  fontSize: '1.05rem',
                  fontWeight: 700,
                  color: 'var(--text-primary)',
                  margin: 0,
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                }}
              >
                <FileCheck2 size={18} style={{ color: '#10b981' }} />
                My Turn In — Sheet Drop-Off Ledger
              </h3>
              <p style={{ margin: '2px 0 0 0', fontSize: '12px', color: 'var(--text-secondary)' }}>
                Physical petition sheets submitted to field managers for validation & payroll.
              </p>
            </div>

            <Button
              variant="outline"
              size="sm"
              icon={Plus}
              onClick={() => handleOpenTurnInModal('PRJ-101')}
            >
              New Turn In
            </Button>
          </div>

          <div className="flex flex-col gap-2.5">
            {turnInBatches.map((batch) => (
              <div
                key={batch.id}
                style={{
                  backgroundColor: 'var(--surface-secondary)',
                  border: '1px solid var(--border)',
                  borderRadius: '12px',
                  padding: '0.85rem 1rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  gap: '0.75rem',
                }}
              >
                <div className="flex items-start gap-3">
                  <div
                    style={{
                      width: '36px',
                      height: '36px',
                      borderRadius: '10px',
                      backgroundColor: 'rgba(16, 185, 129, 0.12)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: '#10b981',
                      flexShrink: 0,
                      marginTop: '2px',
                    }}
                  >
                    <FileSpreadsheet size={18} />
                  </div>

                  <div>
                    <div className="flex items-center gap-2">
                      <span
                        style={{
                          fontFamily: 'monospace',
                          fontWeight: 800,
                          fontSize: '13px',
                          color: '#0284c7',
                        }}
                      >
                        {batch.id}
                      </span>
                      <span style={{ fontWeight: 600, fontSize: '13px', color: 'var(--text-primary)' }}>
                        {batch.project}
                      </span>
                    </div>

                    <div
                      className="flex items-center gap-2 text-xs mt-1"
                      style={{ color: 'var(--text-secondary)' }}
                    >
                      <span>
                        <strong style={{ color: 'var(--text-primary)' }}>{batch.sheets}</strong> Physical Sheets
                      </span>
                      <span>•</span>
                      <span>Recv: {batch.manager}</span>
                      <span>•</span>
                      <span>{batch.date}</span>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col items-end gap-1 flex-shrink-0">
                  <span style={{ fontWeight: 800, fontSize: '1rem', color: 'var(--text-primary)' }}>
                    {batch.claimedSigs} Claimed Sigs
                  </span>
                  <Badge variant={batch.statusBadge} size="sm">
                    {batch.status}
                  </Badge>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-4 pt-3 border-t border-border flex justify-between items-center text-xs">
            <span style={{ color: 'var(--text-secondary)' }}>
              All turn-ins require manager physical verification
            </span>
            <Button
              variant="ghost"
              size="sm"
              iconRight={ChevronRight}
              onClick={() => navigate('/crm/turn-in')}
            >
              Full Turn-In Ledger
            </Button>
          </div>
        </Card>
      </div>

      {/* ======================================================== */}
      {/* MODAL 1: LOG MY DAILY #S MODAL                           */}
      {/* ======================================================== */}
      <Modal
        isOpen={isDailyModalOpen}
        onClose={() => setIsDailyModalOpen(false)}
        title="Log My Daily #s — End of Shift Report"
        maxWidth="540px"
      >
        <form onSubmit={handleDailySubmit} className="flex flex-col gap-4">
          <p style={{ fontSize: '13px', color: 'var(--text-secondary)', margin: 0 }}>
            Enter your signature counts collected during your shift. These figures are instantly synced with your manager and queued for validation.
          </p>

          <div className="flex flex-col gap-1.5">
            <label style={{ fontSize: '12px', fontWeight: 700, color: 'var(--text-primary)' }}>
              Select Petition Project
            </label>
            <Select
              value={dailyForm.projectId}
              onChange={(e) => setDailyForm({ ...dailyForm, projectId: e.target.value })}
              options={petitions.map((p) => ({
                value: p.id,
                label: `${p.title} (${p.category}) — $${p.baseRate.toFixed(2)}/sig`,
              }))}
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="flex flex-col gap-1.5">
              <label style={{ fontSize: '12px', fontWeight: 700, color: 'var(--text-primary)' }}>
                Signatures Collected Today *
              </label>
              <Input
                type="number"
                placeholder="e.g. 45"
                value={dailyForm.signatures}
                onChange={(e) => setDailyForm({ ...dailyForm, signatures: e.target.value })}
                required
                autoFocus
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label style={{ fontSize: '12px', fontWeight: 700, color: 'var(--text-primary)' }}>
                Hours in Field (Duration)
              </label>
              <Input
                type="text"
                placeholder="e.g. 4.5"
                value={dailyForm.hours}
                onChange={(e) => setDailyForm({ ...dailyForm, hours: e.target.value })}
              />
            </div>
          </div>

          <div className="flex flex-col gap-1.5">
            <label style={{ fontSize: '12px', fontWeight: 700, color: 'var(--text-primary)' }}>
              Field Territory / Location
            </label>
            <Input
              type="text"
              placeholder="e.g. Downtown Metro Station, Exit B"
              value={dailyForm.location}
              onChange={(e) => setDailyForm({ ...dailyForm, location: e.target.value })}
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label style={{ fontSize: '12px', fontWeight: 700, color: 'var(--text-primary)' }}>
              Field Notes & Turnout Observations (Optional)
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
              placeholder="Good voter response between 2-4 PM; mild weather."
              value={dailyForm.notes}
              onChange={(e) => setDailyForm({ ...dailyForm, notes: e.target.value })}
            />
          </div>

          <div className="p-3 rounded-xl flex items-start gap-2.5" style={{ backgroundColor: 'rgba(14, 165, 233, 0.08)', border: '1px solid rgba(14, 165, 233, 0.2)' }}>
            <Info size={16} style={{ color: '#0284c7', flexShrink: 0, marginTop: '2px' }} />
            <p style={{ fontSize: '12px', color: 'var(--text-secondary)', margin: 0 }}>
              Physical petition sheets must still be turned in to your manager within 48 hours for audit reconciliation.
            </p>
          </div>

          <div className="flex items-center justify-end gap-2 pt-2 border-t border-border">
            <Button variant="ghost" type="button" onClick={() => setIsDailyModalOpen(false)}>
              Cancel
            </Button>
            <Button variant="primary" type="submit" icon={CheckSquare}>
              Submit Daily #s
            </Button>
          </div>
        </form>
      </Modal>

      {/* ======================================================== */}
      {/* MODAL 2: MY TURN IN (BATCH DROP-OFF) MODAL               */}
      {/* ======================================================== */}
      <Modal
        isOpen={isTurnInModalOpen}
        onClose={() => setIsTurnInModalOpen(false)}
        title="My Turn In — Physical Sheet Drop-Off Batch"
        maxWidth="560px"
      >
        <form onSubmit={handleTurnInSubmit} className="flex flex-col gap-4">
          <p style={{ fontSize: '13px', color: 'var(--text-secondary)', margin: 0 }}>
            Generate a Turn-In Batch receipt before handing over physical paper petition sheets to your field manager.
          </p>

          <div className="flex flex-col gap-1.5">
            <label style={{ fontSize: '12px', fontWeight: 700, color: 'var(--text-primary)' }}>
              Select Petition Project
            </label>
            <Select
              value={turnInForm.projectId}
              onChange={(e) => setTurnInForm({ ...turnInForm, projectId: e.target.value })}
              options={petitions.map((p) => ({
                value: p.id,
                label: `${p.title} (${p.category})`,
              }))}
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="flex flex-col gap-1.5">
              <label style={{ fontSize: '12px', fontWeight: 700, color: 'var(--text-primary)' }}>
                Total Paper Sheets *
              </label>
              <Input
                type="number"
                placeholder="e.g. 5"
                value={turnInForm.sheets}
                onChange={(e) => setTurnInForm({ ...turnInForm, sheets: e.target.value })}
                required
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label style={{ fontSize: '12px', fontWeight: 700, color: 'var(--text-primary)' }}>
                Claimed Sigs on Sheets *
              </label>
              <Input
                type="number"
                placeholder="e.g. 45"
                value={turnInForm.signatures}
                onChange={(e) => setTurnInForm({ ...turnInForm, signatures: e.target.value })}
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="flex flex-col gap-1.5">
              <label style={{ fontSize: '12px', fontWeight: 700, color: 'var(--text-primary)' }}>
                Drop-Off Location
              </label>
              <Input
                type="text"
                value={turnInForm.location}
                onChange={(e) => setTurnInForm({ ...turnInForm, location: e.target.value })}
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label style={{ fontSize: '12px', fontWeight: 700, color: 'var(--text-primary)' }}>
                Receiving Manager
              </label>
              <Input
                type="text"
                value={turnInForm.manager}
                onChange={(e) => setTurnInForm({ ...turnInForm, manager: e.target.value })}
              />
            </div>
          </div>

          <div className="flex flex-col gap-1.5">
            <label style={{ fontSize: '12px', fontWeight: 700, color: 'var(--text-primary)' }}>
              Batch Notes / Sheet ID Serial Numbers
            </label>
            <Input
              type="text"
              placeholder="e.g. Sheets CA-0912 through CA-0916"
              value={turnInForm.notes}
              onChange={(e) => setTurnInForm({ ...turnInForm, notes: e.target.value })}
            />
          </div>

          <div className="p-3 rounded-xl flex items-start gap-2.5" style={{ backgroundColor: 'rgba(16, 185, 129, 0.08)', border: '1px solid rgba(16, 185, 129, 0.2)' }}>
            <FileSpreadsheet size={16} style={{ color: '#10b981', flexShrink: 0, marginTop: '2px' }} />
            <p style={{ fontSize: '12px', color: 'var(--text-secondary)', margin: 0 }}>
              A unique Batch ID will be stamped upon submission and routed to the Validation Team for quality control.
            </p>
          </div>

          <div className="flex items-center justify-end gap-2 pt-2 border-t border-border">
            <Button variant="ghost" type="button" onClick={() => setIsTurnInModalOpen(false)}>
              Cancel
            </Button>
            <Button variant="primary" type="submit" icon={FileCheck2}>
              Generate Turn-In Batch
            </Button>
          </div>
        </form>
      </Modal>

      {/* ======================================================== */}
      {/* MODAL 3: UPLOAD PETITIONS & SCANS MODAL                  */}
      {/* ======================================================== */}
      <Modal
        isOpen={isUploadModalOpen}
        onClose={() => {
          setIsUploadModalOpen(false);
          setUploadSuccessMessage(null);
        }}
        title="Upload Petition Scans & Affidavits"
        maxWidth="540px"
      >
        <form onSubmit={handleSimulateUpload} className="flex flex-col gap-4">
          <p style={{ fontSize: '13px', color: 'var(--text-secondary)', margin: 0 }}>
            Upload high-resolution camera photos or PDF scans of completed signature sheets to fast-track verification.
          </p>

          <div className="flex flex-col gap-1.5">
            <label style={{ fontSize: '12px', fontWeight: 700, color: 'var(--text-primary)' }}>
              Select Petition Project
            </label>
            <Select
              value={uploadForm.projectId}
              onChange={(e) => setUploadForm({ ...uploadForm, projectId: e.target.value })}
              options={petitions.map((p) => ({
                value: p.id,
                label: `${p.title} (${p.category})`,
              }))}
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="flex flex-col gap-1.5">
              <label style={{ fontSize: '12px', fontWeight: 700, color: 'var(--text-primary)' }}>
                Document Type
              </label>
              <Select
                value={uploadForm.docType}
                onChange={(e) => setUploadForm({ ...uploadForm, docType: e.target.value })}
                options={[
                  { value: 'Signed Petition Sheet (Front)', label: 'Signed Petition Sheet (Front)' },
                  { value: 'Circulator Affidavit (Back)', label: 'Circulator Affidavit (Back)' },
                  { value: 'Turn-In Slip Receipt', label: 'Turn-In Slip Receipt' },
                  { value: 'Voter Registration Form', label: 'Voter Registration Form' },
                ]}
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label style={{ fontSize: '12px', fontWeight: 700, color: 'var(--text-primary)' }}>
                Sheet Number / Sigs Count
              </label>
              <Input
                type="text"
                placeholder="Sheet #1 (10 sigs)"
                value={`Sheet #${uploadForm.pageNumber} (${uploadForm.sheetSigs} sigs)`}
                onChange={(e) => setUploadForm({ ...uploadForm, sheetSigs: e.target.value })}
              />
            </div>
          </div>

          {/* Upload Dropzone */}
          <div
            style={{
              border: '2px dashed var(--border)',
              borderRadius: '16px',
              padding: '1.75rem',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              textAlign: 'center',
              backgroundColor: 'var(--surface-secondary)',
              cursor: 'pointer',
              transition: 'border-color 0.2s ease',
            }}
            onClick={handleSimulateUpload}
          >
            <div
              style={{
                width: '48px',
                height: '48px',
                borderRadius: '50%',
                backgroundColor: 'rgba(14, 165, 233, 0.12)',
                color: '#0284c7',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '0.75rem',
              }}
            >
              <Camera size={24} />
            </div>

            <span style={{ fontSize: '14px', fontWeight: 700, color: 'var(--text-primary)' }}>
              Click to capture or select petition photo
            </span>
            <span style={{ fontSize: '12px', color: 'var(--text-tertiary)', marginTop: '4px' }}>
              PNG, JPG, or PDF up to 15MB • Automatic edge cropping
            </span>
          </div>

          {uploadSimulating && (
            <div className="flex items-center justify-center gap-2 p-3 text-sm text-primary">
              <div className="w-4 h-4 border-2 border-sky-400 border-t-transparent rounded-full animate-spin" />
              <span>Optimizing image and running validation OCR...</span>
            </div>
          )}

          {uploadSuccessMessage && (
            <div
              style={{
                backgroundColor: 'rgba(16, 185, 129, 0.1)',
                border: '1px solid rgba(16, 185, 129, 0.3)',
                borderRadius: '10px',
                padding: '0.75rem 1rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                fontSize: '13px',
                color: '#10b981',
              }}
            >
              <CheckCircle2 size={18} />
              <span>{uploadSuccessMessage}</span>
            </div>
          )}

          <div className="flex items-center justify-end gap-2 pt-2 border-t border-border">
            <Button
              variant="ghost"
              type="button"
              onClick={() => {
                setIsUploadModalOpen(false);
                setUploadSuccessMessage(null);
              }}
            >
              Close
            </Button>
            <Button
              variant="primary"
              type="submit"
              icon={UploadCloud}
              disabled={uploadSimulating}
            >
              {uploadSimulating ? 'Uploading...' : 'Scan & Save'}
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default CirculatorDashboard;
