import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Users,
  UserPlus,
  Shield,
  TrendingUp,
  Search,
  Filter,
  MoreVertical,
  Trash2,
  Mail,
  Layers,
  CheckCircle2,
  AlertCircle,
  ArrowRight,
  Clock,
  Calendar,
  DollarSign,
  MapPin,
  RotateCcw,
  Check,
  ExternalLink,
  ShieldCheck,
  FileSpreadsheet,
  Sparkles,
  Info
} from 'lucide-react';
import {
  Card,
  Badge,
  Button,
  Modal,
  Input,
  Select,
  Breadcrumb
} from '../../../components/ui';
import { useAuth } from '../../../context/AuthContext';
import { useToast } from '../../../context/ToastContext';
import { normalizeRoleId } from '../../../utils/rbac';
import {
  MASTER_PETITION_CATEGORIES,
  getActiveTurnInOverride,
  setActiveTurnInOverride,
  TURN_IN_OVERRIDE_STORAGE_KEY
} from '../../../data/petitionCategoriesData';

export const TeamManagement = () => {
  const navigate = useNavigate();
  const { crmUser } = useAuth();
  const { addToast } = useToast();

  const roleId = normalizeRoleId(crmUser, 'crm');
  const isManagerOrHigher = [
    'manager',
    'coordinator',
    'sub_coordinator',
    'super_admin',
    'platform_admin',
    'admin_1',
    'admin_2',
    'business_owner',
    'admin',
  ].includes(roleId) || (crmUser?.role && (
    crmUser.role.toLowerCase().includes('manager') ||
    crmUser.role.toLowerCase().includes('coordinator') ||
    crmUser.role.toLowerCase().includes('admin') ||
    crmUser.role.toLowerCase().includes('owner') ||
    crmUser.role.toLowerCase().includes('leader')
  ));

  // Active Main Tab: 'unified' (Full overview with Override Hub visible below the fold) | 'directory' | 'override'
  const [activeTab, setActiveTab] = useState('unified');

  // Search and Modal State for Directory
  const [searchTerm, setSearchTerm] = useState('');
  const [showInviteModal, setShowInviteModal] = useState(false);

  // Team Directory Roster
  const [teamMembers, setTeamMembers] = useState([
    {
      id: 'CIR-88204',
      name: 'Tanya Sterling',
      badgeId: 'CIR-88204',
      role: 'Circulator (Lead)',
      territory: 'Zone CA-4 (Downtown Corridor)',
      performance: '98.5%',
      status: 'Active',
      assignedCategory: 'Prop 12 - Clean Energy Ballot Initiative',
      assignedCode: 'PROP-12-2026',
      assignedRate: 3.50,
      overrideActive: false,
    },
    {
      id: 'CIR-88219',
      name: 'Emma Wilson',
      badgeId: 'CIR-88219',
      role: 'Circulator',
      territory: 'Zone CA-2 (Metro Transit Hub)',
      performance: '95.2%',
      status: 'Active',
      assignedCategory: 'Education Bond Measure C — Public School Upgrades',
      assignedCode: 'MEASURE-C-BOND',
      assignedRate: 4.00,
      overrideActive: false,
    },
    {
      id: 'CIR-88209',
      name: 'David Ross',
      badgeId: 'CIR-88209',
      role: 'Circulator',
      territory: 'Zone CA-1 (Civic Promenade)',
      performance: '85.0%',
      status: 'Pending Review',
      assignedCategory: 'Local Mayor Petition (City District 4)',
      assignedCode: 'MAYOR-DIST-4',
      assignedRate: 2.00,
      overrideActive: false,
    },
    {
      id: 'SUB-99104',
      name: 'Sarah Jenkins',
      badgeId: 'SUB-99104',
      role: 'Sub Coordinator',
      territory: 'Northern Region (12 Circulators)',
      performance: '98.0%',
      status: 'Active',
      assignedCategory: 'Statewide Oversight Directive',
      assignedCode: 'STATE-INIT',
      assignedRate: 3.50,
      overrideActive: false,
    },
    {
      id: 'MGR-99201',
      name: 'Michael Chen',
      badgeId: 'MGR-99201',
      role: 'Team Manager',
      territory: 'Westside Logistics (8 Circulators)',
      performance: '92.4%',
      status: 'Active',
      assignedCategory: 'Regional Field Management',
      assignedCode: 'MGR-LEAD',
      assignedRate: 4.00,
      overrideActive: false,
    },
  ]);

  // Turn-In Override State
  const [currentOverride, setCurrentOverride] = useState(() => getActiveTurnInOverride());

  // Override Form State
  const [selectedCirculatorId, setSelectedCirculatorId] = useState('CIR-88204');
  const [selectedNewCategoryId, setSelectedNewCategoryId] = useState('CAT-6'); // Default to high-priority Prop 47
  const [overrideReason, setOverrideReason] = useState('Field Reassignment for High Priority Measure');
  const [customNotes, setCustomNotes] = useState('Manager field directive: Priority focus on high-turnout commercial district.');
  const [effectiveDate, setEffectiveDate] = useState(new Date().toISOString().split('T')[0]);
  const [effectiveShift, setEffectiveShift] = useState('Immediate Shift Handover');

  // Confirmation Modal State
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);

  // Override Audit Ledger
  const [overrideAuditLedger, setOverrideAuditLedger] = useState([
    {
      id: 'OVR-701',
      circulatorName: 'Tanya Sterling',
      badgeId: 'CIR-88204',
      previousCategory: 'Prop 12 - Clean Energy Ballot Initiative',
      newCategory: 'Prop 47 - Public Safety Reform & Theft Penalty Act',
      newCode: 'PROP-47-REF',
      previousRate: 3.50,
      newRate: 4.25,
      managerName: crmUser?.name || 'Leo Fontaine',
      reason: 'County Signature Quota Reached — Surge Campaign',
      timestamp: 'Today, 10:15 AM',
      status: 'Active Override',
    },
    {
      id: 'OVR-698',
      circulatorName: 'Emma Wilson',
      badgeId: 'CIR-88219',
      previousCategory: 'Clean Drinking Water & Watershed Protection Act',
      newCategory: 'County Measure C - Public School Modernization Bond',
      newCode: 'MEASURE-C-BOND',
      previousRate: 3.75,
      newRate: 4.00,
      managerName: 'Leo Fontaine',
      reason: 'School District Deadline Surge Blitz',
      timestamp: 'Yesterday, 3:45 PM',
      status: 'Completed',
    },
  ]);

  // Sync with localStorage
  useEffect(() => {
    const loaded = getActiveTurnInOverride();
    setCurrentOverride(loaded);

    // Update Tanya Sterling in roster if override is active
    if (loaded && loaded.overrideActive) {
      setTeamMembers((prev) =>
        prev.map((m) =>
          m.badgeId === 'CIR-88204'
            ? {
                ...m,
                assignedCategory: loaded.currentCategoryName,
                assignedCode: loaded.currentProjectCode,
                assignedRate: loaded.currentPayRate,
                overrideActive: true,
              }
            : m
        )
      );
    }
  }, []);

  // Find currently selected circulator and proposed category objects
  const selectedMember = teamMembers.find((m) => m.badgeId === selectedCirculatorId) || teamMembers[0];
  const selectedCategoryObj = MASTER_PETITION_CATEGORIES.find((c) => c.id === selectedNewCategoryId) || MASTER_PETITION_CATEGORIES[0];
  const primaryProject = selectedCategoryObj?.activeProjects[0] || {};

  // Execute Category Override
  const handleApplyOverride = () => {
    const newOverrideData = {
      circulatorId: selectedMember.id,
      circulatorName: selectedMember.name,
      badgeId: selectedMember.badgeId,
      assignedManager: crmUser?.name || 'Leo Fontaine',
      assignedManagerTitle: 'Circulator Logistics Manager',
      currentCategoryId: selectedCategoryObj.id,
      currentCategoryName: selectedCategoryObj.name,
      currentProjectCode: selectedCategoryObj.code,
      currentPayRate: primaryProject.payRate || 3.50,
      reason: `${overrideReason} — ${customNotes}`,
      effectiveDate: effectiveDate,
      effectiveShift: effectiveShift,
      notes: customNotes,
      status: 'Active Override',
    };

    const saved = setActiveTurnInOverride(newOverrideData);
    setCurrentOverride(saved);

    // Update local member state
    setTeamMembers((prev) =>
      prev.map((m) =>
        m.badgeId === selectedMember.badgeId
          ? {
              ...m,
              assignedCategory: selectedCategoryObj.name,
              assignedCode: selectedCategoryObj.code,
              assignedRate: primaryProject.payRate || 3.50,
              overrideActive: true,
            }
          : m
      )
    );

    // Add to audit ledger
    const auditEntry = {
      id: `OVR-${Math.floor(100 + Math.random() * 900)}`,
      circulatorName: selectedMember.name,
      badgeId: selectedMember.badgeId,
      previousCategory: selectedMember.assignedCategory,
      newCategory: selectedCategoryObj.name,
      newCode: selectedCategoryObj.code,
      previousRate: selectedMember.assignedRate,
      newRate: primaryProject.payRate || 3.50,
      managerName: crmUser?.name || 'Leo Fontaine',
      reason: overrideReason,
      timestamp: 'Just now',
      status: 'Active Override',
    };

    setOverrideAuditLedger([auditEntry, ...overrideAuditLedger]);
    setIsConfirmModalOpen(false);

    addToast({
      title: 'Turn-In Category Override Applied',
      message: `Assigned "${selectedCategoryObj.name}" to ${selectedMember.name}. The circulator portal is updated immediately.`,
      type: 'success',
    });
  };

  // Revert Override to Baseline
  const handleRevertOverride = () => {
    const baselineData = {
      circulatorId: 'circulator',
      circulatorName: 'Tanya Sterling',
      badgeId: 'CIR-88204',
      assignedManager: 'Leo Fontaine',
      assignedManagerTitle: 'Circulator Logistics Manager',
      currentCategoryId: 'CAT-1',
      currentCategoryName: 'Prop 12 - Clean Energy Ballot Initiative',
      currentProjectCode: 'PROP-12-2026',
      currentPayRate: 3.50,
      overrideActive: false,
      reason: 'Standard Base Campaign Assignment',
      effectiveDate: new Date().toISOString().split('T')[0],
      notes: 'Restored baseline assignment for Zone CA-4 Downtown Metro Corridor.',
      status: 'Standard Baseline',
    };

    localStorage.setItem(TURN_IN_OVERRIDE_STORAGE_KEY, JSON.stringify(baselineData));
    setCurrentOverride(baselineData);

    setTeamMembers((prev) =>
      prev.map((m) =>
        m.badgeId === 'CIR-88204'
          ? {
              ...m,
              assignedCategory: 'Prop 12 - Clean Energy Ballot Initiative',
              assignedCode: 'PROP-12-2026',
              assignedRate: 3.50,
              overrideActive: false,
            }
          : m
      )
    );

    addToast({
      title: 'Override Reverted to Baseline',
      message: 'Tanya Sterling has been restored to Prop 12 Clean Energy standard turn-in baseline.',
      type: 'info',
    });
  };

  // Switch to Override tab pre-selecting specific circulator
  const handleOpenOverrideForCirculator = (member) => {
    setSelectedCirculatorId(member.badgeId);
    if (activeTab === 'directory') {
      setActiveTab('override');
    }
    setTimeout(() => {
      const el = document.getElementById('turn-in-override-hub');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 100);
    addToast({
      title: 'Circulator Selected for Override',
      message: `Configuring new turn-in directive for ${member.name} (${member.badgeId}).`,
      type: 'info',
    });
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
        paddingBottom: '3rem',
      }}
    >
      {/* 1. Top Header & Navigation */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <Breadcrumb
            items={[
              { label: 'Team Leader Portal', onClick: () => navigate('/crm/dashboard-pro') },
              { label: 'Team Management & Category Override' },
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
            Team Management & Turn-In Category Overrides
          </h1>
          <p style={{ margin: '0.25rem 0 0 0', fontSize: '13.5px', color: 'var(--text-secondary)' }}>
            Supervise field circulators, monitor compliance, and assign or override physical turn-in campaign categories.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <Badge variant={isManagerOrHigher ? 'warning' : 'primary'} size="sm">
            Role: {isManagerOrHigher ? 'Team Manager (Authorized Override)' : 'Circulator (Read-Only)'}
          </Badge>
          <Button
            variant="outline"
            size="sm"
            icon={Layers}
            onClick={() => {
              setActiveTab('unified');
              setTimeout(() => {
                const el = document.getElementById('turn-in-override-hub');
                if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
              }, 100);
            }}
          >
            Go to Override Hub
          </Button>
          <Button
            variant="primary"
            size="sm"
            icon={UserPlus}
            onClick={() => setShowInviteModal(true)}
          >
            Invite Member
          </Button>
        </div>
      </div>

      {/* 2. Top Navigation Tabs */}
      <div className="flex flex-wrap items-center gap-2 border-b border-border pb-2">
        <button
          type="button"
          onClick={() => setActiveTab('unified')}
          style={{
            padding: '8px 16px',
            borderRadius: '10px',
            fontSize: '13px',
            fontWeight: activeTab === 'unified' ? 750 : 500,
            backgroundColor: activeTab === 'unified' ? 'var(--surface-secondary)' : 'transparent',
            color: activeTab === 'unified' ? 'var(--text-primary)' : 'var(--text-secondary)',
            border: activeTab === 'unified' ? '1px solid var(--border)' : '1px solid transparent',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            transition: 'all 0.15s ease',
          }}
        >
          <Sparkles size={16} style={{ color: activeTab === 'unified' ? '#0284c7' : 'inherit' }} />
          Full Team Hub (Roster & Overrides)
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('directory')}
          style={{
            padding: '8px 16px',
            borderRadius: '10px',
            fontSize: '13px',
            fontWeight: activeTab === 'directory' ? 750 : 500,
            backgroundColor: activeTab === 'directory' ? 'var(--surface-secondary)' : 'transparent',
            color: activeTab === 'directory' ? 'var(--text-primary)' : 'var(--text-secondary)',
            border: activeTab === 'directory' ? '1px solid var(--border)' : '1px solid transparent',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            transition: 'all 0.15s ease',
          }}
        >
          <Users size={16} style={{ color: activeTab === 'directory' ? '#0284c7' : 'inherit' }} />
          Team Members Directory ({teamMembers.length})
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('override')}
          style={{
            padding: '8px 16px',
            borderRadius: '10px',
            fontSize: '13px',
            fontWeight: activeTab === 'override' ? 750 : 500,
            backgroundColor: activeTab === 'override' ? '#0284c7' : 'transparent',
            color: activeTab === 'override' ? '#ffffff' : 'var(--text-secondary)',
            border: activeTab === 'override' ? '1px solid #0284c7' : '1px solid transparent',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            transition: 'all 0.15s ease',
            boxShadow: activeTab === 'override' ? '0 4px 12px rgba(2, 132, 199, 0.35)' : 'none',
          }}
        >
          <Layers size={16} />
          My Turn In Category Override Hub
          {currentOverride?.overrideActive && (
            <span
              style={{
                backgroundColor: '#f59e0b',
                color: '#000',
                padding: '1px 6px',
                borderRadius: '6px',
                fontSize: '10px',
                fontWeight: 800,
              }}
            >
              ACTIVE
            </span>
          )}
        </button>
      </div>

      {/* ======================================================== */}
      {/* VIEW 1: TEAM MEMBERS DIRECTORY TAB                       */}
      {/* ======================================================== */}
      {(activeTab === 'unified' || activeTab === 'directory') && (
        <div className="flex flex-col gap-6">
          {/* Top KPI Summary Cards */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
              gap: '1rem',
            }}
          >
            <Card style={{ padding: '1.25rem' }}>
              <div className="flex items-center gap-3 mb-2">
                <div style={{ padding: '8px', borderRadius: '10px', backgroundColor: 'rgba(2, 132, 199, 0.12)', color: '#0284c7' }}>
                  <Users size={20} />
                </div>
                <div>
                  <span style={{ fontSize: '11.5px', color: 'var(--text-tertiary)', textTransform: 'uppercase', fontWeight: 700 }}>
                    Active Team Size
                  </span>
                  <div style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--text-primary)' }}>
                    42 Circulators
                  </div>
                </div>
              </div>
              <p style={{ margin: '4px 0 0 0', fontSize: '12px', color: 'var(--text-secondary)' }}>
                Direct logistics team under Lead Manager Leo Fontaine.
              </p>
            </Card>

            <Card style={{ padding: '1.25rem' }}>
              <div className="flex items-center gap-3 mb-2">
                <div style={{ padding: '8px', borderRadius: '10px', backgroundColor: 'rgba(16, 185, 129, 0.12)', color: '#10b981' }}>
                  <ShieldCheck size={20} />
                </div>
                <div>
                  <span style={{ fontSize: '11.5px', color: 'var(--text-tertiary)', textTransform: 'uppercase', fontWeight: 700 }}>
                    Compliance Clearance
                  </span>
                  <div style={{ fontSize: '1.5rem', fontWeight: 800, color: '#10b981' }}>
                    96.5% Verified
                  </div>
                </div>
              </div>
              <p style={{ margin: '4px 0 0 0', fontSize: '12px', color: 'var(--text-secondary)' }}>
                California Elections Code § 101 oaths signed and certified.
              </p>
            </Card>

            <Card style={{ padding: '1.25rem' }}>
              <div className="flex items-center gap-3 mb-2">
                <div style={{ padding: '8px', borderRadius: '10px', backgroundColor: 'rgba(245, 158, 11, 0.12)', color: '#f59e0b' }}>
                  <Layers size={20} />
                </div>
                <div>
                  <span style={{ fontSize: '11.5px', color: 'var(--text-tertiary)', textTransform: 'uppercase', fontWeight: 700 }}>
                    Turn-In Overrides
                  </span>
                  <div style={{ fontSize: '1.5rem', fontWeight: 800, color: '#f59e0b' }}>
                    {currentOverride?.overrideActive ? '1 Active Override' : 'Standard Baseline'}
                  </div>
                </div>
              </div>
              <p style={{ margin: '4px 0 0 0', fontSize: '12px', color: 'var(--text-secondary)' }}>
                Active turn-in category directives assigned by manager.
              </p>
            </Card>
          </div>

          {/* Search Bar */}
          <Card style={{ padding: '1rem 1.25rem' }}>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="relative w-full sm:w-80">
                <Search
                  size={16}
                  className="absolute left-3 top-1/2 -translate-y-1/2"
                  style={{ color: 'var(--text-tertiary)' }}
                />
                <input
                  type="text"
                  placeholder="Search team members by name or badge..."
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

              <div className="text-xs" style={{ color: 'var(--text-secondary)' }}>
                Showing <strong>{teamMembers.length}</strong> field representatives in active hierarchy
              </div>
            </div>
          </Card>

          {/* Members Table */}
          <div
            style={{
              backgroundColor: 'var(--surface)',
              borderRadius: '16px',
              border: '1px solid var(--border)',
              overflow: 'hidden',
              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.04)',
            }}
          >
            <div className="overflow-x-auto">
              <table className="w-full text-left" style={{ borderCollapse: 'collapse' }}>
                <thead style={{ backgroundColor: 'var(--surface-secondary)', borderBottom: '1px solid var(--border)' }}>
                  <tr>
                    <th className="p-4 text-xs font-bold uppercase tracking-wider text-secondary">Circulator / Member</th>
                    <th className="p-4 text-xs font-bold uppercase tracking-wider text-secondary">Badge & Role</th>
                    <th className="p-4 text-xs font-bold uppercase tracking-wider text-secondary">Territory Hub</th>
                    <th className="p-4 text-xs font-bold uppercase tracking-wider text-secondary">Assigned Turn-In Category</th>
                    <th className="p-4 text-xs font-bold uppercase tracking-wider text-secondary">Status</th>
                    <th className="p-4 text-xs font-bold uppercase tracking-wider text-right text-secondary">Manager Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {teamMembers
                    .filter(
                      (m) =>
                        m.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        m.badgeId.toLowerCase().includes(searchTerm.toLowerCase())
                    )
                    .map((member, idx) => (
                      <tr
                        key={member.id}
                        style={{
                          borderBottom: idx !== teamMembers.length - 1 ? '1px solid var(--border)' : 'none',
                          transition: 'background-color 0.15s ease',
                        }}
                      >
                        <td className="p-4">
                          <div className="flex items-center gap-3">
                            <div
                              style={{
                                width: '36px',
                                height: '36px',
                                borderRadius: '10px',
                                backgroundColor: 'rgba(2, 132, 199, 0.12)',
                                color: '#0284c7',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                fontWeight: 800,
                                fontSize: '13px',
                              }}
                            >
                              {member.name.split(' ').map((n) => n[0]).join('')}
                            </div>
                            <div>
                              <div style={{ fontWeight: 700, fontSize: '13.5px', color: 'var(--text-primary)' }}>
                                {member.name}
                              </div>
                              <div style={{ fontSize: '11px', color: 'var(--text-tertiary)' }}>
                                Validity: {member.performance}
                              </div>
                            </div>
                          </div>
                        </td>

                        <td className="p-4">
                          <div style={{ fontFamily: 'monospace', fontWeight: 700, fontSize: '12.5px', color: '#0284c7' }}>
                            {member.badgeId}
                          </div>
                          <div style={{ fontSize: '11.5px', color: 'var(--text-secondary)' }}>
                            {member.role}
                          </div>
                        </td>

                        <td className="p-4" style={{ fontSize: '12.5px', color: 'var(--text-secondary)' }}>
                          {member.territory}
                        </td>

                        <td className="p-4">
                          <div className="flex items-center gap-2">
                            <div>
                              <div style={{ fontWeight: 700, fontSize: '13px', color: 'var(--text-primary)' }}>
                                {member.assignedCategory}
                              </div>
                              <div className="flex items-center gap-2 mt-0.5">
                                <span style={{ fontSize: '11px', color: '#10b981', fontWeight: 700 }}>
                                  ${member.assignedRate.toFixed(2)}/sig
                                </span>
                                <span style={{ color: 'var(--text-tertiary)' }}>•</span>
                                <span style={{ fontSize: '10.5px', color: 'var(--text-tertiary)', fontFamily: 'monospace' }}>
                                  {member.assignedCode}
                                </span>
                              </div>
                            </div>
                            {member.overrideActive && (
                              <Badge variant="warning" size="sm">
                                Overridden
                              </Badge>
                            )}
                          </div>
                        </td>

                        <td className="p-4">
                          <span
                            style={{
                              display: 'inline-flex',
                              alignItems: 'center',
                              gap: '4px',
                              padding: '3px 8px',
                              borderRadius: '6px',
                              fontSize: '11.5px',
                              fontWeight: 700,
                              backgroundColor: member.status === 'Active' ? 'rgba(16, 185, 129, 0.1)' : 'rgba(245, 158, 11, 0.1)',
                              color: member.status === 'Active' ? '#10b981' : '#f59e0b',
                              border: `1px solid ${member.status === 'Active' ? 'rgba(16, 185, 129, 0.25)' : 'rgba(245, 158, 11, 0.25)'}`,
                            }}
                          >
                            {member.status === 'Active' ? <CheckCircle2 size={12} /> : <AlertCircle size={12} />}
                            {member.status}
                          </span>
                        </td>

                        <td className="p-4 text-right">
                          <Button
                            variant="outline"
                            size="sm"
                            icon={Layers}
                            onClick={() => handleOpenOverrideForCirculator(member)}
                          >
                            Assign / Override Category
                          </Button>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Quick Callout in Directory Mode */}
          {activeTab === 'directory' && (
            <Card style={{ padding: '1.25rem 1.5rem', backgroundColor: 'rgba(2, 132, 199, 0.05)', border: '1px solid rgba(2, 132, 199, 0.25)' }}>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div style={{ padding: '8px', borderRadius: '10px', backgroundColor: 'rgba(2, 132, 199, 0.12)', color: '#0284c7' }}>
                    <Layers size={20} />
                  </div>
                  <div>
                    <h4 style={{ margin: 0, fontSize: '14px', fontWeight: 800, color: 'var(--text-primary)' }}>
                      Need to Reassign a Circulator's Turn-In Campaign?
                    </h4>
                    <p style={{ margin: '2px 0 0 0', fontSize: '12.5px', color: 'var(--text-secondary)' }}>
                      Team Managers have administrative clearance to issue real-time category overrides for physical turn-ins.
                    </p>
                  </div>
                </div>
                <Button variant="primary" size="sm" icon={Layers} onClick={() => setActiveTab('override')}>
                  Open Override Hub
                </Button>
              </div>
            </Card>
          )}
        </div>
      )}

      {/* ======================================================== */}
      {/* VIEW 2: MY TURN IN CATEGORY OVERRIDE HUB (MODULE 2)       */}
      {/* ======================================================== */}
      {(activeTab === 'unified' || activeTab === 'override') && (
        <div className="flex flex-col gap-6">
          {/* Unified Mode Section Header */}
          {activeTab === 'unified' && (
            <div id="turn-in-override-hub" className="pt-6 border-t border-border">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-2">
                <div className="flex items-center gap-3">
                  <div style={{ padding: '8px', borderRadius: '10px', backgroundColor: '#0284c7', color: '#fff' }}>
                    <Layers size={20} />
                  </div>
                  <div>
                    <h2 style={{ margin: 0, fontSize: '1.35rem', fontWeight: 800, color: 'var(--text-primary)', letterSpacing: '-0.01em' }}>
                      My Turn In Category Override Directive Hub
                    </h2>
                    <p style={{ margin: '2px 0 0 0', fontSize: '13px', color: 'var(--text-secondary)' }}>
                      Reassign field circulators to high-priority signature drives with comparative pay rates and instant audit tracking.
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <Badge variant={isManagerOrHigher ? "warning" : "neutral"} size="sm">
                    {isManagerOrHigher ? "Manager Authority Active" : "Read-Only (Non-Manager)"}
                  </Badge>
                  <Button
                    variant="outline"
                    size="sm"
                    icon={Layers}
                    onClick={() => setActiveTab('override')}
                  >
                    Focus Hub Only
                  </Button>
                </div>
              </div>
            </div>
          )}

          {/* Access Restriction Notice if user is non-manager */}
          {!isManagerOrHigher && (
            <div
              className="p-4 rounded-xl flex items-center gap-3"
              style={{
                backgroundColor: 'rgba(239, 68, 68, 0.08)',
                border: '1px solid rgba(239, 68, 68, 0.25)',
                color: '#ef4444',
              }}
            >
              <AlertCircle size={20} className="shrink-0" />
              <div>
                <strong style={{ fontSize: '13px', display: 'block' }}>Restricted Access: Manager Authority Required</strong>
                <span style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>
                  You are viewing the Category Override Directive Hub in read-only mode. Submitting category directives and reverting baseline assignments requires Team Manager or Coordinator credentials.
                </span>
              </div>
            </div>
          )}
          {/* Demo State Banner */}
          <div
            style={{
              padding: '1rem 1.25rem',
              borderRadius: '14px',
              backgroundColor: 'rgba(245, 158, 11, 0.08)',
              border: '1px solid rgba(245, 158, 11, 0.25)',
              display: 'flex',
              alignItems: 'flex-start',
              gap: '0.75rem',
            }}
          >
            <Info size={18} style={{ color: '#d97706', flexShrink: 0, marginTop: '2px' }} />
            <div>
              <div style={{ fontSize: '13px', fontWeight: 800, color: '#d97706' }}>
                Role-Restricted Team Manager Override Workflow (Local / Demo State)
              </div>
              <p style={{ margin: '2px 0 0 0', fontSize: '12px', color: 'var(--text-secondary)', lineHeight: '1.4' }}>
                Team Managers and Coordinators have administrative clearance to assign or override the ballot measure category for any circulator's physical Turn-In submissions. Changes apply immediately in session state across <strong>My Turn In</strong> and <strong>Circulator Profile</strong>. Circulators have read-only visibility and cannot modify this directive.
              </p>
            </div>
          </div>

          {/* Active Override Status Alert if currently overridden */}
          {currentOverride?.overrideActive && (
            <Card style={{ padding: '1.25rem 1.5rem', border: '1px solid rgba(16, 185, 129, 0.3)', backgroundColor: 'rgba(16, 185, 129, 0.04)' }}>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex items-start gap-3">
                  <div style={{ padding: '8px', borderRadius: '10px', backgroundColor: 'rgba(16, 185, 129, 0.15)', color: '#10b981' }}>
                    <CheckCircle2 size={20} />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 style={{ margin: 0, fontSize: '14px', fontWeight: 800, color: 'var(--text-primary)' }}>
                        Active Turn-In Override in Effect for {currentOverride.circulatorName} ({currentOverride.badgeId})
                      </h4>
                      <Badge variant="warning" size="sm">
                        OVERRIDE ENFORCED
                      </Badge>
                    </div>
                    <p style={{ margin: '3px 0 0 0', fontSize: '12.5px', color: 'var(--text-secondary)' }}>
                      Current Project: <strong>{currentOverride.currentCategoryName}</strong> ({currentOverride.currentProjectCode}) • Rate: <strong style={{ color: '#10b981' }}>${currentOverride.currentPayRate?.toFixed(2)}/sig</strong>
                    </p>
                    <p style={{ margin: '2px 0 0 0', fontSize: '11.5px', color: 'var(--text-tertiary)' }}>
                      Assigned by {currentOverride.assignedManager} on {currentOverride.effectiveDate} • Reason: {currentOverride.reason}
                    </p>
                  </div>
                </div>

                <Button
                  variant="outline"
                  size="sm"
                  icon={RotateCcw}
                  onClick={handleRevertOverride}
                >
                  Revert to Baseline (Prop 12)
                </Button>
              </div>
            </Card>
          )}

          {/* Step 1 & Step 2: Override Configuration Workspace */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))',
              gap: '1.5rem',
            }}
          >
            {/* Left Card: Member Selection & Current Assignment */}
            <Card style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
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
                  <Users size={18} style={{ color: '#0284c7' }} />
                  Step 1: Select Team Member
                </h3>
                <p style={{ margin: '4px 0 1rem 0', fontSize: '12.5px', color: 'var(--text-secondary)' }}>
                  Choose the field circulator whose Turn-In category is being managed or reassigned.
                </p>

                <div className="flex flex-col gap-3">
                  <div className="flex flex-col gap-1.5">
                    <label style={{ fontSize: '12px', fontWeight: 700, color: 'var(--text-primary)' }}>
                      Select Circulator
                    </label>
                    <select
                      value={selectedCirculatorId}
                      onChange={(e) => setSelectedCirculatorId(e.target.value)}
                      style={{
                        padding: '0.65rem 0.85rem',
                        borderRadius: '10px',
                        border: '1px solid var(--border)',
                        backgroundColor: 'var(--surface)',
                        color: 'var(--text-primary)',
                        fontSize: '13px',
                        fontWeight: 600,
                        outline: 'none',
                      }}
                    >
                      {teamMembers.map((m) => (
                        <option key={m.badgeId} value={m.badgeId}>
                          {m.name} ({m.badgeId}) — {m.role}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Circulator Profile Snapshot */}
                  <div
                    style={{
                      backgroundColor: 'var(--surface-secondary)',
                      borderRadius: '12px',
                      padding: '1rem',
                      border: '1px solid var(--border)',
                      marginTop: '0.5rem',
                    }}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <span style={{ fontSize: '13px', fontWeight: 800, color: 'var(--text-primary)' }}>
                          {selectedMember.name}
                        </span>
                        <Badge variant="primary" size="sm">
                          {selectedMember.badgeId}
                        </Badge>
                      </div>
                      <span style={{ fontSize: '11px', color: '#10b981', fontWeight: 700 }}>
                        {selectedMember.status}
                      </span>
                    </div>

                    <div style={{ fontSize: '12px', color: 'var(--text-secondary)', marginBottom: '0.75rem' }}>
                      Territory: <strong>{selectedMember.territory}</strong>
                    </div>

                    <div
                      style={{
                        backgroundColor: 'var(--surface)',
                        borderRadius: '10px',
                        padding: '0.75rem',
                        border: '1px solid var(--border)',
                      }}
                    >
                      <span style={{ fontSize: '10.5px', color: 'var(--text-tertiary)', textTransform: 'uppercase', fontWeight: 700 }}>
                        Current Assigned My Turn In Category
                      </span>
                      <div style={{ fontWeight: 800, fontSize: '13.5px', color: 'var(--text-primary)', marginTop: '2px' }}>
                        {selectedMember.assignedCategory}
                      </div>
                      <div className="flex items-center justify-between mt-1 pt-1 border-t border-border text-xs">
                        <span style={{ color: 'var(--text-secondary)' }}>Rate: <strong style={{ color: '#10b981' }}>${selectedMember.assignedRate.toFixed(2)}/sig</strong></span>
                        <span style={{ color: 'var(--text-tertiary)', fontFamily: 'monospace' }}>{selectedMember.assignedCode}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-border flex items-center justify-between text-xs text-secondary">
                <span>Manager Lead: <strong>{crmUser?.name || 'Leo Fontaine'}</strong></span>
                <span>White-Label: Field Ops Inc.</span>
              </div>
            </Card>

            {/* Right Card: Select New Category from 100 Categories */}
            <Card style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
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
                  <Sparkles size={18} style={{ color: '#0284c7' }} />
                  Step 2: Assign New Turn-In Category
                </h3>
                <p style={{ margin: '4px 0 1rem 0', fontSize: '12.5px', color: 'var(--text-secondary)' }}>
                  Browse up to 100 ballot measure categories to enforce a new physical drop-off destination.
                </p>

                <div className="flex flex-col gap-3">
                  <div className="flex flex-col gap-1.5">
                    <label style={{ fontSize: '12px', fontWeight: 700, color: 'var(--text-primary)' }}>
                      Select New Measure / Category (100 Available)
                    </label>
                    <select
                      value={selectedNewCategoryId}
                      onChange={(e) => setSelectedNewCategoryId(e.target.value)}
                      style={{
                        padding: '0.65rem 0.85rem',
                        borderRadius: '10px',
                        border: '1px solid var(--border)',
                        backgroundColor: 'var(--surface)',
                        color: 'var(--text-primary)',
                        fontSize: '13px',
                        fontWeight: 600,
                        outline: 'none',
                      }}
                    >
                      {MASTER_PETITION_CATEGORIES.map((c) => {
                        const proj = c.activeProjects[0] || {};
                        return (
                          <option key={c.id} value={c.id}>
                            [{c.code}] {c.name} — ${proj.payRate?.toFixed(2)}/sig ({c.sector})
                          </option>
                        );
                      })}
                    </select>
                  </div>

                  {/* Proposed Category Details */}
                  <div
                    style={{
                      backgroundColor: 'rgba(2, 132, 199, 0.05)',
                      borderRadius: '12px',
                      padding: '1rem',
                      border: '1px solid rgba(2, 132, 199, 0.25)',
                      marginTop: '0.5rem',
                    }}
                  >
                    <div className="flex items-start justify-between gap-2 mb-1">
                      <div>
                        <span style={{ fontSize: '11px', fontWeight: 800, color: '#0284c7', textTransform: 'uppercase' }}>
                          {selectedCategoryObj?.code} • {selectedCategoryObj?.sector}
                        </span>
                        <h4 style={{ margin: '2px 0 0 0', fontSize: '13.5px', fontWeight: 800, color: 'var(--text-primary)' }}>
                          {selectedCategoryObj?.name}
                        </h4>
                      </div>
                      <div style={{ backgroundColor: 'rgba(16, 185, 129, 0.1)', border: '1px solid rgba(16, 185, 129, 0.25)', padding: '3px 8px', borderRadius: '8px', textAlign: 'right' }}>
                        <div style={{ fontSize: '13px', fontWeight: 800, color: '#10b981' }}>
                          ${primaryProject.payRate?.toFixed(2)}
                        </div>
                        <div style={{ fontSize: '9px', color: 'var(--text-tertiary)' }}>/ sig</div>
                      </div>
                    </div>

                    <p style={{ margin: '4px 0 0.5rem 0', fontSize: '12px', color: 'var(--text-secondary)' }}>
                      {selectedCategoryObj?.description}
                    </p>

                    <div className="text-xs text-tertiary">
                      Jurisdiction: <span style={{ color: 'var(--text-primary)' }}>{primaryProject.jurisdiction}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Live Rate Comparison Diff */}
              <div
                style={{
                  marginTop: '1rem',
                  padding: '0.75rem',
                  borderRadius: '10px',
                  backgroundColor: 'var(--surface-secondary)',
                  border: '1px solid var(--border)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}
              >
                <div style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>
                  Rate Impact: Current <strong>${selectedMember.assignedRate.toFixed(2)}</strong> → New <strong>${primaryProject.payRate?.toFixed(2)}</strong>
                </div>
                <Badge
                  variant={
                    primaryProject.payRate > selectedMember.assignedRate
                      ? 'success'
                      : primaryProject.payRate < selectedMember.assignedRate
                      ? 'warning'
                      : 'neutral'
                  }
                  size="sm"
                >
                  {primaryProject.payRate > selectedMember.assignedRate
                    ? `+$${(primaryProject.payRate - selectedMember.assignedRate).toFixed(2)} / sig boost`
                    : primaryProject.payRate < selectedMember.assignedRate
                    ? `-$${(selectedMember.assignedRate - primaryProject.payRate).toFixed(2)} / sig adjustment`
                    : 'Rate unchanged'}
                </Badge>
              </div>
            </Card>
          </div>

          {/* Step 3: Directive Justification, Reason & Execution */}
          <Card style={{ padding: '1.5rem' }}>
            <h3
              style={{
                fontSize: '1.15rem',
                fontWeight: 800,
                color: 'var(--text-primary)',
                margin: '0 0 1rem 0',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
              }}
            >
              <ShieldCheck size={18} style={{ color: '#0284c7' }} />
              Step 3: Reason, Schedule & Manager Authorization
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              <div className="flex flex-col gap-1.5">
                <label style={{ fontSize: '12px', fontWeight: 700, color: 'var(--text-primary)' }}>
                  Override Justification
                </label>
                <select
                  value={overrideReason}
                  onChange={(e) => setOverrideReason(e.target.value)}
                  style={{
                    padding: '0.65rem 0.85rem',
                    borderRadius: '10px',
                    border: '1px solid var(--border)',
                    backgroundColor: 'var(--surface)',
                    color: 'var(--text-primary)',
                    fontSize: '13px',
                    outline: 'none',
                  }}
                >
                  <option value="Field Reassignment for High Priority Measure">Field Reassignment for High Priority Measure</option>
                  <option value="County Signature Quota Reached — Surge Campaign">County Signature Quota Reached — Surge Campaign</option>
                  <option value="Emergency Turn-In Mandate">Emergency Turn-In Mandate</option>
                  <option value="Special Weekend Blitz Assignment">Special Weekend Blitz Assignment</option>
                  <option value="Compliance & Verification Realignment">Compliance & Verification Realignment</option>
                  <option value="Custom Supervisor Directive">Custom Supervisor Directive</option>
                </select>
              </div>

              <div className="flex flex-col gap-1.5">
                <label style={{ fontSize: '12px', fontWeight: 700, color: 'var(--text-primary)' }}>
                  Effective Date
                </label>
                <Input
                  type="date"
                  value={effectiveDate}
                  onChange={(e) => setEffectiveDate(e.target.value)}
                  required
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label style={{ fontSize: '12px', fontWeight: 700, color: 'var(--text-primary)' }}>
                  Effective Handover Window
                </label>
                <select
                  value={effectiveShift}
                  onChange={(e) => setEffectiveShift(e.target.value)}
                  style={{
                    padding: '0.65rem 0.85rem',
                    borderRadius: '10px',
                    border: '1px solid var(--border)',
                    backgroundColor: 'var(--surface)',
                    color: 'var(--text-primary)',
                    fontSize: '13px',
                    outline: 'none',
                  }}
                >
                  <option value="Immediate Shift Handover">Immediate Shift Handover</option>
                  <option value="Next Scheduled Shift (Tomorrow)">Next Scheduled Shift (Tomorrow)</option>
                  <option value="Weekend Turn-In Staging Only">Weekend Turn-In Staging Only</option>
                </select>
              </div>
            </div>

            <div className="flex flex-col gap-1.5 mb-4">
              <label style={{ fontSize: '12px', fontWeight: 700, color: 'var(--text-primary)' }}>
                Field Directive Instructions & Notes
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
                value={customNotes}
                onChange={(e) => setCustomNotes(e.target.value)}
                placeholder="Special drop-off staging instructions or target quotas..."
              />
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-3 border-t border-border">
              <div className="flex items-center gap-2 text-xs text-secondary">
                <ShieldCheck size={16} style={{ color: '#10b981' }} />
                <span>Authorized by manager: <strong>{crmUser?.name || 'Leo Fontaine'}</strong></span>
              </div>

              <Button
                variant="primary"
                size="md"
                icon={ArrowRight}
                onClick={() => {
                  if (!isManagerOrHigher) {
                    addToast({
                      title: 'Unauthorized Action',
                      message: 'Only authorized Team Managers and Coordinators can issue turn-in overrides.',
                      type: 'error',
                    });
                    return;
                  }
                  setIsConfirmModalOpen(true);
                }}
                disabled={!isManagerOrHigher}
              >
                Review & Confirm Category Override
              </Button>
            </div>
          </Card>

          {/* Override Audit Ledger Table */}
          <Card style={{ padding: '1.5rem' }}>
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--text-primary)', margin: 0 }}>
                  Turn-In Category Override Audit Ledger
                </h3>
                <p style={{ margin: '2px 0 0 0', fontSize: '12.5px', color: 'var(--text-secondary)' }}>
                  Complete timestamped log of category modifications and physical turn-in assignments.
                </p>
              </div>
              <Badge variant="neutral" size="sm">
                Audit Trail Verified
              </Badge>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left" style={{ borderCollapse: 'collapse' }}>
                <thead style={{ backgroundColor: 'var(--surface-secondary)', borderBottom: '1px solid var(--border)' }}>
                  <tr>
                    <th className="p-3 text-xs font-bold uppercase tracking-wider text-secondary">Timestamp</th>
                    <th className="p-3 text-xs font-bold uppercase tracking-wider text-secondary">Circulator</th>
                    <th className="p-3 text-xs font-bold uppercase tracking-wider text-secondary">Previous Category</th>
                    <th className="p-3 text-xs font-bold uppercase tracking-wider text-secondary">New Assigned Category</th>
                    <th className="p-3 text-xs font-bold uppercase tracking-wider text-secondary">Manager Lead</th>
                    <th className="p-3 text-xs font-bold uppercase tracking-wider text-secondary">Justification</th>
                    <th className="p-3 text-xs font-bold uppercase tracking-wider text-secondary">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {overrideAuditLedger.map((log, idx) => (
                    <tr key={log.id} style={{ borderBottom: idx !== overrideAuditLedger.length - 1 ? '1px solid var(--border)' : 'none' }}>
                      <td className="p-3 text-xs text-secondary">{log.timestamp}</td>
                      <td className="p-3">
                        <div style={{ fontWeight: 700, fontSize: '13px', color: 'var(--text-primary)' }}>{log.circulatorName}</div>
                        <div style={{ fontSize: '11px', fontFamily: 'monospace', color: '#0284c7' }}>{log.badgeId}</div>
                      </td>
                      <td className="p-3 text-xs text-secondary">{log.previousCategory}</td>
                      <td className="p-3">
                        <div style={{ fontWeight: 700, fontSize: '13px', color: 'var(--text-primary)' }}>{log.newCategory}</div>
                        <span style={{ fontSize: '11px', color: '#10b981', fontWeight: 700 }}>${log.newRate.toFixed(2)}/sig</span>
                      </td>
                      <td className="p-3 text-xs text-secondary">{log.managerName}</td>
                      <td className="p-3 text-xs text-secondary">{log.reason}</td>
                      <td className="p-3">
                        <Badge variant={log.status === 'Active Override' ? 'warning' : 'neutral'} size="sm">
                          {log.status}
                        </Badge>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </div>
      )}

      {/* ======================================================== */}
      {/* MODAL: CONFIRM TURN-IN CATEGORY OVERRIDE                  */}
      {/* ======================================================== */}
      <Modal
        isOpen={isConfirmModalOpen}
        onClose={() => setIsConfirmModalOpen(false)}
        title="Confirm Turn-In Category Override Directive"
        maxWidth="540px"
      >
        <div className="flex flex-col gap-4">
          <div className="p-3.5 rounded-xl" style={{ backgroundColor: 'rgba(245, 158, 11, 0.1)', border: '1px solid rgba(245, 158, 11, 0.3)' }}>
            <div className="flex items-center gap-2 mb-1">
              <AlertCircle size={16} style={{ color: '#d97706' }} />
              <span style={{ fontSize: '13px', fontWeight: 800, color: '#d97706' }}>
                Administrative Field Reassignment
              </span>
            </div>
            <p style={{ margin: 0, fontSize: '12px', color: 'var(--text-secondary)' }}>
              Applying this change will immediately update {selectedMember.name}'s My Turn In workflow and profile in local state.
            </p>
          </div>

          <div
            style={{
              backgroundColor: 'var(--surface-secondary)',
              borderRadius: '12px',
              padding: '1rem',
              border: '1px solid var(--border)',
            }}
          >
            <div className="grid grid-cols-2 gap-3 text-xs">
              <div>
                <span style={{ color: 'var(--text-tertiary)', textTransform: 'uppercase', fontWeight: 700 }}>Member:</span>
                <div style={{ fontWeight: 800, fontSize: '13px', color: 'var(--text-primary)', marginTop: '2px' }}>
                  {selectedMember.name} ({selectedMember.badgeId})
                </div>
              </div>
              <div>
                <span style={{ color: 'var(--text-tertiary)', textTransform: 'uppercase', fontWeight: 700 }}>Authorizing Lead:</span>
                <div style={{ fontWeight: 800, fontSize: '13px', color: 'var(--text-primary)', marginTop: '2px' }}>
                  {crmUser?.name || 'Leo Fontaine'}
                </div>
              </div>
            </div>

            <div className="mt-3 pt-3 border-t border-border">
              <span style={{ color: 'var(--text-tertiary)', fontSize: '11px', textTransform: 'uppercase', fontWeight: 700 }}>
                Campaign Change:
              </span>
              <div className="flex items-center gap-2 mt-1">
                <span style={{ fontSize: '12px', color: 'var(--text-secondary)', textDecoration: 'line-through' }}>
                  {selectedMember.assignedCategory}
                </span>
                <ArrowRight size={14} style={{ color: '#0284c7' }} />
                <span style={{ fontSize: '13px', fontWeight: 800, color: 'var(--text-primary)' }}>
                  {selectedCategoryObj?.name}
                </span>
              </div>
            </div>

            <div className="mt-3 pt-3 border-t border-border grid grid-cols-2 gap-2 text-xs">
              <div>
                <span style={{ color: 'var(--text-tertiary)' }}>New Payout Rate:</span>
                <div style={{ fontWeight: 800, color: '#10b981' }}>${primaryProject.payRate?.toFixed(2)} / valid sig</div>
              </div>
              <div>
                <span style={{ color: 'var(--text-tertiary)' }}>Effective Window:</span>
                <div style={{ fontWeight: 800, color: 'var(--text-primary)' }}>{effectiveDate} ({effectiveShift})</div>
              </div>
            </div>

            <div className="mt-2 text-xs" style={{ color: 'var(--text-secondary)' }}>
              <strong>Reason:</strong> {overrideReason}
            </div>
          </div>

          <div className="flex items-center justify-end gap-2 pt-2 border-t border-border">
            <Button variant="ghost" type="button" onClick={() => setIsConfirmModalOpen(false)}>
              Cancel
            </Button>
            <Button variant="primary" type="button" icon={Check} onClick={handleApplyOverride}>
              Confirm & Apply Override
            </Button>
          </div>
        </div>
      </Modal>

      {/* Invite Member Modal */}
      {showInviteModal && (
        <Modal
          isOpen={showInviteModal}
          onClose={() => setShowInviteModal(false)}
          title="Invite Field Team Member"
          maxWidth="460px"
        >
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-1.5">
              <label style={{ fontSize: '12px', fontWeight: 700, color: 'var(--text-primary)' }}>
                Email Address
              </label>
              <Input type="email" placeholder="circulator.name@example.com" required />
            </div>

            <div className="flex flex-col gap-1.5">
              <label style={{ fontSize: '12px', fontWeight: 700, color: 'var(--text-primary)' }}>
                Assign Role
              </label>
              <select
                style={{
                  padding: '0.65rem 0.85rem',
                  borderRadius: '10px',
                  border: '1px solid var(--border)',
                  backgroundColor: 'var(--surface)',
                  color: 'var(--text-primary)',
                  fontSize: '13px',
                  outline: 'none',
                }}
              >
                <option value="Circulator">Circulator (Signature Gatherer)</option>
                <option value="Sub Coordinator">Sub Coordinator (Field Operations)</option>
                <option value="Team Manager">Team Manager (Circulator Logistics)</option>
              </select>
            </div>

            <div className="flex items-center justify-end gap-2 pt-2 border-t border-border">
              <Button variant="ghost" type="button" onClick={() => setShowInviteModal(false)}>
                Cancel
              </Button>
              <Button
                variant="primary"
                type="button"
                onClick={() => {
                  setShowInviteModal(false);
                  addToast({
                    title: 'Invitation Dispatched',
                    message: 'Official onboarding link sent to prospective member.',
                    type: 'success',
                  });
                }}
              >
                Send Invite
              </Button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default TeamManagement;
