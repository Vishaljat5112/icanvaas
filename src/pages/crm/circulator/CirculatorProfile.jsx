import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  User,
  ShieldCheck,
  Award,
  Layers,
  MapPin,
  DollarSign,
  FileText,
  Phone,
  Mail,
  Building2,
  Calendar,
  CheckCircle2,
  AlertCircle,
  QrCode,
  CreditCard,
  Download,
  ExternalLink,
  ChevronRight,
  ChevronLeft,
  Filter,
  Search,
  Info,
  Clock,
  Sparkles,
  Lock,
  Edit3,
  Save,
  Check,
  Send,
  Users,
  Target,
  FileSpreadsheet,
  RotateCcw,
  Plus,
  Settings
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
  Tabs
} from '../../../components/ui';
import { useAuth } from '../../../context/AuthContext';
import { useToast } from '../../../context/ToastContext';
import { normalizeRoleId } from '../../../utils/rbac';
import {
  MASTER_PETITION_CATEGORIES,
  getActiveTurnInOverride
} from '../../../data/petitionCategoriesData';

export const CirculatorProfile = ({ defaultTab = 'profile' }) => {
  const navigate = useNavigate();
  const { crmUser } = useAuth();
  const { addToast } = useToast();

  const roleId = normalizeRoleId(crmUser, 'crm');
  const isManager = ['manager', 'coordinator', 'sub_coordinator', 'super_admin', 'platform_admin'].includes(roleId);

  const [activeTab, setActiveTab] = useState(defaultTab); // 'profile' | 'categories'

  // Turn-In Override State from Team Manager
  const [turnInOverride, setTurnInOverride] = useState(() => getActiveTurnInOverride());

  // Personal & Field Profile State with Validation and Revert
  const initialProfileState = {
    name: crmUser?.name || 'Tanya Sterling',
    email: crmUser?.email || 'circulator@icanvass.com',
    phone: '+1 (555) 382-9104',
    badgeId: 'CIR-88204',
    address: '482 Liberty Blvd, Suite 201',
    city: 'Los Angeles',
    state: 'CA',
    zip: '90012',
    emergencyContact: 'Michael Sterling (Brother) • +1 (555) 902-1849',
    voterRegNumber: 'VOT-CA-839201',
    adpId: 'ADP-W-99482',
    bankAccount: 'Direct Deposit • Chase (****4910)',
  };

  const [profileForm, setProfileForm] = useState(initialProfileState);
  const [savedProfileForm, setSavedProfileForm] = useState(initialProfileState);
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [profileErrors, setProfileErrors] = useState({});

  const handleSaveProfile = (e) => {
    e.preventDefault();
    const errors = {};
    if (!profileForm.name.trim()) errors.name = 'Legal Name cannot be empty.';
    if (!profileForm.email.trim() || !/\S+@\S+\.\S+/.test(profileForm.email)) {
      errors.email = 'Please enter a valid email address.';
    }
    if (!profileForm.phone.trim()) errors.phone = 'Mobile phone number is required.';
    if (!profileForm.address.trim()) errors.address = 'Residence address is required for legal compliance.';

    if (Object.keys(errors).length > 0) {
      setProfileErrors(errors);
      addToast({
        title: 'Validation Incomplete',
        message: 'Please correct the highlighted fields before saving.',
        type: 'error',
      });
      return;
    }

    setProfileErrors({});
    setSavedProfileForm({ ...profileForm });
    setIsEditingProfile(false);
    addToast({
      title: 'Profile Saved Successfully',
      message: 'Your personal information and official field credentials have been updated.',
      type: 'success',
    });
  };

  const handleCancelEdit = () => {
    setProfileForm({ ...savedProfileForm });
    setProfileErrors({});
    setIsEditingProfile(false);
    addToast({
      title: 'Editing Cancelled',
      message: 'Unsaved profile modifications have been discarded.',
      type: 'info',
    });
  };

  // Category Browser Filter, Search & Pagination State (Up to 100 Categories)
  const [categorySearch, setCategorySearch] = useState('');
  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;

  // Master Categories State (initialized with 100 Categories)
  const [petitionCategories, setPetitionCategories] = useState(MASTER_PETITION_CATEGORIES);

  // Category Request Modal (Circulator)
  const [isRequestModalOpen, setIsRequestModalOpen] = useState(false);
  const [requestCategoryName, setRequestCategoryName] = useState('Statewide Initiative');
  const [requestNotes, setRequestNotes] = useState('');

  // Manager Edit Category Modal
  const [isEditCategoryModalOpen, setIsEditCategoryModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);

  // Manager Add Category Modal
  const [isAddCategoryModalOpen, setIsAddCategoryModalOpen] = useState(false);
  const [newCategoryForm, setNewCategoryForm] = useState({
    name: '',
    code: '',
    sector: 'Statewide Initiatives',
    description: '',
    payRate: 3.50,
    jurisdiction: 'Statewide California',
    allowedCounties: 'All 58 California Counties',
    status: 'Assigned & Active',
  });

  const handleOpenEditCategory = (cat) => {
    const primaryProj = cat.activeProjects[0] || {};
    setEditingCategory({
      id: cat.id,
      name: cat.name,
      code: cat.code,
      sector: cat.sector || 'Statewide Initiatives',
      description: cat.description,
      payRate: primaryProj.payRate || 3.50,
      status: primaryProj.status || 'Assigned & Active',
      jurisdiction: primaryProj.jurisdiction || 'Statewide California',
      allowedCounties: primaryProj.allowedCounties ? primaryProj.allowedCounties.join(', ') : 'All Counties',
    });
    setIsEditCategoryModalOpen(true);
  };

  const handleSaveCategoryEdit = (e) => {
    e.preventDefault();
    if (!editingCategory) return;

    setPetitionCategories((prev) =>
      prev.map((c) => {
        if (c.id === editingCategory.id) {
          return {
            ...c,
            name: editingCategory.name,
            code: editingCategory.code,
            description: editingCategory.description,
            activeProjects: c.activeProjects.map((p, idx) =>
              idx === 0
                ? {
                    ...p,
                    title: editingCategory.name,
                    payRate: parseFloat(editingCategory.payRate) || p.payRate,
                    status: editingCategory.status,
                    jurisdiction: editingCategory.jurisdiction,
                    allowedCounties: editingCategory.allowedCounties.split(',').map((s) => s.trim()),
                  }
                : p
            ),
          };
        }
        return c;
      })
    );

    setIsEditCategoryModalOpen(false);
    addToast({
      title: 'Category Updated (Manager Override)',
      message: `Master settings for "${editingCategory.name}" updated successfully.`,
      type: 'success',
    });
  };

  const handleCreateCategory = (e) => {
    e.preventDefault();
    if (!newCategoryForm.name.trim()) return;

    const newId = `CAT-${petitionCategories.length + 1}`;
    const newCat = {
      id: newId,
      name: newCategoryForm.name,
      code: newCategoryForm.code || `MEAS-${(petitionCategories.length + 1).toString().padStart(3, '0')}`,
      sector: newCategoryForm.sector,
      description: newCategoryForm.description || `Official ballot measure covering ${newCategoryForm.sector}.`,
      projectCount: 1,
      maxProjectsAllowed: 50,
      activeProjects: [
        {
          id: `PRJ-${petitionCategories.length + 301}`,
          title: newCategoryForm.name,
          code: newCategoryForm.code || `MEAS-${(petitionCategories.length + 1).toString().padStart(3, '0')}`,
          payRate: parseFloat(newCategoryForm.payRate) || 3.50,
          tierNote: `Base $${parseFloat(newCategoryForm.payRate || 3.5).toFixed(2)} / valid sig • Newly created initiative`,
          status: newCategoryForm.status,
          badgeVariant: 'primary',
          targetSigs: 20000,
          collectedSigs: 0,
          jurisdiction: newCategoryForm.jurisdiction,
          allowedCounties: newCategoryForm.allowedCounties.split(',').map((s) => s.trim()),
          eligibilityRules: ['Registered voters in designated jurisdiction.'],
          talkingPoints: ['Official community-backed ballot initiative.'],
        },
      ],
    };

    setPetitionCategories([newCat, ...petitionCategories]);
    setIsAddCategoryModalOpen(false);
    setNewCategoryForm({
      name: '',
      code: '',
      sector: 'Statewide Initiatives',
      description: '',
      payRate: 3.50,
      jurisdiction: 'Statewide California',
      allowedCounties: 'All 58 California Counties',
      status: 'Assigned & Active',
    });

    addToast({
      title: 'New Category Added',
      message: `"${newCat.name}" is now available in the Master Category Browser.`,
      type: 'success',
    });
  };

  // Filtered categories for Up to 100 Categories browser
  const filteredCategories = petitionCategories.filter((c) => {
    const matchesSector =
      selectedCategoryFilter === 'All' || c.sector === selectedCategoryFilter || c.name === selectedCategoryFilter;
    const matchesSearch =
      !categorySearch ||
      c.name.toLowerCase().includes(categorySearch.toLowerCase()) ||
      c.code.toLowerCase().includes(categorySearch.toLowerCase()) ||
      c.description.toLowerCase().includes(categorySearch.toLowerCase()) ||
      c.activeProjects.some(
        (p) =>
          p.title.toLowerCase().includes(categorySearch.toLowerCase()) ||
          p.code.toLowerCase().includes(categorySearch.toLowerCase()) ||
          p.jurisdiction.toLowerCase().includes(categorySearch.toLowerCase())
      );
    const matchesStatus =
      statusFilter === 'All' ||
      c.activeProjects.some((p) => p.status.toLowerCase().includes(statusFilter.toLowerCase()));

    return matchesSector && matchesSearch && matchesStatus;
  });

  const totalPages = Math.ceil(filteredCategories.length / itemsPerPage);
  const paginatedCategories = filteredCategories.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Flattened projects for search
  const allProjects = petitionCategories.flatMap((c) =>
    c.activeProjects.map((p) => ({ ...p, categoryName: c.name, categoryCode: c.code, sector: c.sector }))
  );

  const handleRequestSubmit = (e) => {
    e.preventDefault();
    setIsRequestModalOpen(false);
    addToast({
      title: 'Request Submitted to Coordinator',
      message: `Your request for "${requestCategoryName}" has been routed to Marcus Vance for clearance.`,
      type: 'success',
    });
    setRequestNotes('');
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
      {/* 1. Header Navigation & Breadcrumb */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <Breadcrumb
            items={[
              { label: 'Circulator Portal', onClick: () => navigate('/crm/dashboard') },
              { label: activeTab === 'profile' ? 'Circulator Profile' : 'Petition Categories' },
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
            {activeTab === 'profile' ? 'Circulator Profile & Credential Vault' : 'Petition Categories Browser'}
          </h1>
          <p style={{ margin: '0.25rem 0 0 0', fontSize: '13.5px', color: 'var(--text-secondary)' }}>
            {activeTab === 'profile'
              ? 'Official field gatherer identification, management chain, active territory clearance, and ADP payout statements.'
              : 'Explore all approved ballot measure categories, pay-per-signature tiers, voter eligibility rules, and talking points.'}
          </p>
        </div>

        {/* Tab Switcher Controls */}
        <div
          className="flex items-center gap-1.5 p-1 rounded-2xl"
          style={{
            backgroundColor: 'var(--surface-secondary)',
            border: '1px solid var(--border)',
            width: 'fit-content',
          }}
        >
          <button
            type="button"
            onClick={() => setActiveTab('profile')}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              padding: '0.6rem 1.1rem',
              borderRadius: '12px',
              fontSize: '13px',
              fontWeight: activeTab === 'profile' ? 700 : 500,
              color: activeTab === 'profile' ? '#ffffff' : 'var(--text-secondary)',
              backgroundColor: activeTab === 'profile' ? '#0284c7' : 'transparent',
              border: 'none',
              cursor: 'pointer',
              transition: 'all 0.15s ease',
              boxShadow: activeTab === 'profile' ? '0 4px 12px rgba(2, 132, 199, 0.35)' : 'none',
            }}
          >
            <User size={16} />
            Circulator Profile
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('categories')}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              padding: '0.6rem 1.1rem',
              borderRadius: '12px',
              fontSize: '13px',
              fontWeight: activeTab === 'categories' ? 700 : 500,
              color: activeTab === 'categories' ? '#ffffff' : 'var(--text-secondary)',
              backgroundColor: activeTab === 'categories' ? '#0284c7' : 'transparent',
              border: 'none',
              cursor: 'pointer',
              transition: 'all 0.15s ease',
              boxShadow: activeTab === 'categories' ? '0 4px 12px rgba(2, 132, 199, 0.35)' : 'none',
            }}
          >
            <Layers size={16} />
            Categories Browser
          </button>
        </div>
      </div>

      {/* ======================================================== */}
      {/* VIEW 1: CIRCULATOR PROFILE TAB                           */}
      {/* ======================================================== */}
      {activeTab === 'profile' && (
        <div className="flex flex-col gap-6">
          {/* Top Row: Official Digital Badge Card & Management Hierarchy */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))',
              gap: '1.5rem',
            }}
          >
            {/* Card 1: Official California Circulator Badge */}
            <div
              style={{
                background: 'linear-gradient(135deg, #091328 0%, #0f172a 60%, #1e1b4b 100%)',
                border: '1px solid rgba(56, 189, 248, 0.25)',
                borderRadius: '24px',
                padding: '1.75rem',
                color: '#ffffff',
                boxShadow: '0 20px 40px -15px rgba(2, 6, 23, 0.7), inset 0 1px 0 rgba(255, 255, 255, 0.1)',
                position: 'relative',
                overflow: 'hidden',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                minHeight: '280px',
              }}
            >
              {/* Badge Background Watermark */}
              <div
                style={{
                  position: 'absolute',
                  right: '-20px',
                  bottom: '-20px',
                  opacity: 0.05,
                  pointerEvents: 'none',
                }}
              >
                <ShieldCheck size={260} />
              </div>

              <div>
                <div className="flex items-center justify-between gap-3 mb-4">
                  <div className="flex items-center gap-2">
                    <div
                      style={{
                        width: '32px',
                        height: '32px',
                        borderRadius: '8px',
                        backgroundColor: 'rgba(56, 189, 248, 0.2)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: '#38bdf8',
                      }}
                    >
                      <Award size={18} />
                    </div>
                    <div>
                      <span style={{ fontSize: '10.5px', fontWeight: 800, letterSpacing: '0.08em', color: '#93c5fd', textTransform: 'uppercase' }}>
                        State of California
                      </span>
                      <h4 style={{ margin: 0, fontSize: '13px', fontWeight: 700, color: '#f8fafc' }}>
                        OFFICIAL PETITION CIRCULATOR
                      </h4>
                    </div>
                  </div>

                  <span
                    style={{
                      fontSize: '11px',
                      fontWeight: 800,
                      backgroundColor: 'rgba(16, 185, 129, 0.2)',
                      color: '#34d399',
                      border: '1px solid rgba(16, 185, 129, 0.4)',
                      padding: '3px 8px',
                      borderRadius: '8px',
                    }}
                  >
                    ACTIVE • COMPLIANT
                  </span>
                </div>

                <div className="flex items-center gap-4 mt-4">
                  <div
                    style={{
                      width: '64px',
                      height: '64px',
                      borderRadius: '16px',
                      background: 'linear-gradient(135deg, #0284c7 0%, #3b82f6 50%, #6366f1 100%)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: '#ffffff',
                      fontSize: '1.5rem',
                      fontWeight: 800,
                      boxShadow: '0 8px 16px rgba(2, 132, 199, 0.4)',
                      border: '2px solid rgba(255, 255, 255, 0.2)',
                    }}
                  >
                    TS
                  </div>

                  <div>
                    <h3 style={{ margin: 0, fontSize: '1.3rem', fontWeight: 800, color: '#ffffff' }}>
                      {profileForm.name}
                    </h3>
                    <div className="flex items-center gap-2 mt-1">
                      <span style={{ fontFamily: 'monospace', fontSize: '13px', color: '#38bdf8', fontWeight: 700 }}>
                        {profileForm.badgeId}
                      </span>
                      <span style={{ color: '#64748b' }}>•</span>
                      <span style={{ fontSize: '12px', color: '#94a3b8' }}>Signature Gatherer</span>
                    </div>
                  </div>
                </div>
              </div>

              <div
                style={{
                  marginTop: '1.5rem',
                  paddingTop: '1rem',
                  borderTop: '1px solid rgba(255, 255, 255, 0.1)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  gap: '1rem',
                }}
              >
                <div>
                  <div style={{ fontSize: '10px', color: '#94a3b8', textTransform: 'uppercase', fontWeight: 600 }}>
                    Jurisdiction Clearance
                  </div>
                  <div style={{ fontSize: '12.5px', color: '#f1f5f9', fontWeight: 700, marginTop: '2px' }}>
                    California All Counties
                  </div>
                </div>

                <div>
                  <div style={{ fontSize: '10px', color: '#94a3b8', textTransform: 'uppercase', fontWeight: 600 }}>
                    Badge Expiration
                  </div>
                  <div style={{ fontSize: '12.5px', color: '#f1f5f9', fontWeight: 700, marginTop: '2px' }}>
                    Nov 30, 2026
                  </div>
                </div>

                <div
                  style={{
                    padding: '6px 10px',
                    borderRadius: '8px',
                    backgroundColor: 'rgba(255, 255, 255, 0.08)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    fontSize: '11px',
                    color: '#93c5fd',
                  }}
                >
                  <QrCode size={16} />
                  <span>Verify SOS</span>
                </div>
              </div>
            </div>

            {/* Card 2: Field Management & Hierarchy Chain */}
            <Card style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <div>
                <div className="flex items-center justify-between mb-3">
                  <h3
                    style={{
                      fontSize: '1.1rem',
                      fontWeight: 700,
                      color: 'var(--text-primary)',
                      margin: 0,
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem',
                    }}
                  >
                    <Users size={18} style={{ color: '#0284c7' }} />
                    Assigned Management Chain
                  </h3>
                  <Badge variant="primary" size="sm">
                    Field Ops Inc.
                  </Badge>
                </div>
                <p style={{ margin: '0 0 1rem 0', fontSize: '12.5px', color: 'var(--text-secondary)' }}>
                  Your campaign coordinators and field managers responsible for compliance and sheet payouts.
                </p>

                <div className="flex flex-col gap-2.5">
                  {/* Coordinator */}
                  <div
                    style={{
                      backgroundColor: 'var(--surface-secondary)',
                      borderRadius: '12px',
                      padding: '0.75rem 1rem',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      border: '1px solid var(--border)',
                    }}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        style={{
                          width: '32px',
                          height: '32px',
                          borderRadius: '8px',
                          backgroundColor: 'rgba(99, 102, 241, 0.12)',
                          color: '#6366f1',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontWeight: 700,
                          fontSize: '12px',
                        }}
                      >
                        MV
                      </div>
                      <div>
                        <div style={{ fontSize: '13px', fontWeight: 700, color: 'var(--text-primary)' }}>
                          Marcus Vance
                        </div>
                        <div style={{ fontSize: '11px', color: 'var(--text-tertiary)' }}>
                          Executive Campaign Coordinator
                        </div>
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      icon={Mail}
                      onClick={() => navigate('/crm/messages')}
                    >
                      Message
                    </Button>
                  </div>

                  {/* Sub Coordinator */}
                  <div
                    style={{
                      backgroundColor: 'var(--surface-secondary)',
                      borderRadius: '12px',
                      padding: '0.75rem 1rem',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      border: '1px solid var(--border)',
                    }}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        style={{
                          width: '32px',
                          height: '32px',
                          borderRadius: '8px',
                          backgroundColor: 'rgba(14, 165, 233, 0.12)',
                          color: '#0284c7',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontWeight: 700,
                          fontSize: '12px',
                        }}
                      >
                        CR
                      </div>
                      <div>
                        <div style={{ fontSize: '13px', fontWeight: 700, color: 'var(--text-primary)' }}>
                          Chloe Rivera
                        </div>
                        <div style={{ fontSize: '11px', color: 'var(--text-tertiary)' }}>
                          Field Sub-Coordinator (Compliance)
                        </div>
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      icon={Mail}
                      onClick={() => navigate('/crm/messages')}
                    >
                      Message
                    </Button>
                  </div>

                  {/* Field Team Manager */}
                  <div
                    style={{
                      backgroundColor: 'var(--surface-secondary)',
                      borderRadius: '12px',
                      padding: '0.75rem 1rem',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      border: '1px solid var(--border)',
                    }}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        style={{
                          width: '32px',
                          height: '32px',
                          borderRadius: '8px',
                          backgroundColor: 'rgba(16, 185, 129, 0.12)',
                          color: '#10b981',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontWeight: 700,
                          fontSize: '12px',
                        }}
                      >
                        LF
                      </div>
                      <div>
                        <div style={{ fontSize: '13px', fontWeight: 700, color: 'var(--text-primary)' }}>
                          Leo Fontaine
                        </div>
                        <div style={{ fontSize: '11px', color: 'var(--text-tertiary)' }}>
                          Circulator Logistics Manager (Direct Lead)
                        </div>
                      </div>
                    </div>
                    <Button
                      variant="secondary"
                      size="sm"
                      icon={Phone}
                      onClick={() =>
                        addToast({
                          title: 'Connecting Field Call',
                          message: 'Calling Leo Fontaine at +1 (555) 492-0193...',
                          type: 'info',
                        })
                      }
                    >
                      Call Lead
                    </Button>
                  </div>
                </div>
              </div>

              <div
                style={{
                  marginTop: '1rem',
                  paddingTop: '0.75rem',
                  borderTop: '1px solid var(--border)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  fontSize: '12px',
                  color: 'var(--text-secondary)',
                }}
              >
                <span>White-Label Tenant: Field Ops Inc.</span>
                <span style={{ color: '#0284c7', fontWeight: 600 }}>ID: TENANT-08492</span>
              </div>
            </Card>

            {/* Card 3: Assigned My Turn In Category & Directive */}
            <Card style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', border: '1px solid var(--border)' }}>
              <div>
                <div className="flex items-center justify-between mb-3">
                  <h3
                    style={{
                      fontSize: '1.1rem',
                      fontWeight: 700,
                      color: 'var(--text-primary)',
                      margin: 0,
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem',
                    }}
                  >
                    <Layers size={18} style={{ color: '#0284c7' }} />
                    Assigned Turn-In Category
                  </h3>
                  <Badge variant={turnInOverride.overrideActive ? 'warning' : 'primary'} size="sm">
                    {turnInOverride.overrideActive ? 'Manager Override Active' : 'Standard Baseline'}
                  </Badge>
                </div>
                <p style={{ margin: '0 0 1rem 0', fontSize: '12.5px', color: 'var(--text-secondary)' }}>
                  {turnInOverride.overrideActive
                    ? `Active field directive assigned by ${turnInOverride.assignedManager}. All batch submissions currently route to this project.`
                    : 'Your active ballot measure for current field signature operations and physical sheet turn-ins.'}
                </p>

                <div
                  style={{
                    backgroundColor: 'var(--surface-secondary)',
                    borderRadius: '12px',
                    padding: '1rem',
                    border: '1px solid var(--border)',
                  }}
                >
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <div>
                      <span style={{ fontSize: '11px', fontWeight: 800, color: '#0284c7', textTransform: 'uppercase' }}>
                        {turnInOverride.currentProjectCode}
                      </span>
                      <h4 style={{ margin: '2px 0 0 0', fontSize: '14px', fontWeight: 800, color: 'var(--text-primary)' }}>
                        {turnInOverride.currentCategoryName}
                      </h4>
                    </div>
                    <div
                      style={{
                        backgroundColor: 'rgba(16, 185, 129, 0.1)',
                        border: '1px solid rgba(16, 185, 129, 0.25)',
                        borderRadius: '10px',
                        padding: '4px 8px',
                        textAlign: 'right',
                      }}
                    >
                      <span style={{ fontSize: '14px', fontWeight: 800, color: '#10b981' }}>
                        ${turnInOverride.currentPayRate ? turnInOverride.currentPayRate.toFixed(2) : '3.50'}
                      </span>
                      <div style={{ fontSize: '9.5px', color: 'var(--text-tertiary)', fontWeight: 600 }}>/ valid sig</div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2 mt-3 pt-3 border-t border-border text-xs">
                    <div>
                      <span style={{ color: 'var(--text-tertiary)', fontSize: '11px' }}>Assigned Lead:</span>
                      <div style={{ fontWeight: 700, color: 'var(--text-primary)' }}>{turnInOverride.assignedManager}</div>
                    </div>
                    <div>
                      <span style={{ color: 'var(--text-tertiary)', fontSize: '11px' }}>Effective Date:</span>
                      <div style={{ fontWeight: 700, color: 'var(--text-primary)' }}>{turnInOverride.effectiveDate}</div>
                    </div>
                  </div>

                  {turnInOverride.overrideActive && (
                    <div
                      className="mt-2.5 p-2 rounded-lg text-xs"
                      style={{
                        backgroundColor: 'rgba(245, 158, 11, 0.1)',
                        border: '1px solid rgba(245, 158, 11, 0.25)',
                        color: '#d97706',
                      }}
                    >
                      <strong>Override Reason:</strong> {turnInOverride.reason}
                    </div>
                  )}
                </div>
              </div>

              <div
                style={{
                  marginTop: '1rem',
                  paddingTop: '0.75rem',
                  borderTop: '1px solid var(--border)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}
              >
                <span style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>
                  Ready to turn in batches?
                </span>
                <Button
                  variant="primary"
                  size="sm"
                  icon={FileSpreadsheet}
                  onClick={() => navigate('/crm/turn-in')}
                >
                  Go to My Turn In
                </Button>
              </div>
            </Card>
          </div>

          {/* Middle Row: Personal Details & Territory/Counties */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))',
              gap: '1.5rem',
            }}
          >
            {/* Personal Profile Details Form */}
            <Card style={{ padding: '1.5rem' }}>
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3
                    style={{
                      fontSize: '1.1rem',
                      fontWeight: 700,
                      color: 'var(--text-primary)',
                      margin: 0,
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem',
                    }}
                  >
                    <User size={18} style={{ color: '#0284c7' }} />
                    Personal & Legal Information
                  </h3>
                  <p style={{ margin: '2px 0 0 0', fontSize: '12.5px', color: 'var(--text-secondary)' }}>
                    Official contact information as recorded on state circulator registration.
                  </p>
                </div>

                <Button
                  variant={isEditingProfile ? 'outline' : 'secondary'}
                  size="sm"
                  icon={isEditingProfile ? RotateCcw : Edit3}
                  onClick={() => {
                    if (isEditingProfile) {
                      handleCancelEdit();
                    } else {
                      setIsEditingProfile(true);
                    }
                  }}
                >
                  {isEditingProfile ? 'Cancel Editing' : 'Edit Details'}
                </Button>
              </div>

              <form onSubmit={handleSaveProfile} className="flex flex-col gap-3.5">
                <div className="grid grid-cols-2 gap-3">
                  <div className="flex flex-col gap-1">
                    <label style={{ fontSize: '11.5px', fontWeight: 700, color: 'var(--text-secondary)', textTransform: 'uppercase' }}>
                      Full Legal Name
                    </label>
                    <Input
                      type="text"
                      value={profileForm.name}
                      disabled={!isEditingProfile}
                      onChange={(e) => {
                        setProfileForm({ ...profileForm, name: e.target.value });
                        if (profileErrors.name) setProfileErrors({ ...profileErrors, name: null });
                      }}
                    />
                    {profileErrors.name && (
                      <span style={{ fontSize: '11px', color: '#ef4444', fontWeight: 600 }}>
                        {profileErrors.name}
                      </span>
                    )}
                  </div>

                  <div className="flex flex-col gap-1">
                    <label style={{ fontSize: '11.5px', fontWeight: 700, color: 'var(--text-secondary)', textTransform: 'uppercase' }}>
                      Circulator Badge ID
                    </label>
                    <Input type="text" value={profileForm.badgeId} disabled />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="flex flex-col gap-1">
                    <label style={{ fontSize: '11.5px', fontWeight: 700, color: 'var(--text-secondary)', textTransform: 'uppercase' }}>
                      Email Address
                    </label>
                    <Input
                      type="email"
                      value={profileForm.email}
                      disabled={!isEditingProfile}
                      onChange={(e) => {
                        setProfileForm({ ...profileForm, email: e.target.value });
                        if (profileErrors.email) setProfileErrors({ ...profileErrors, email: null });
                      }}
                    />
                    {profileErrors.email && (
                      <span style={{ fontSize: '11px', color: '#ef4444', fontWeight: 600 }}>
                        {profileErrors.email}
                      </span>
                    )}
                  </div>

                  <div className="flex flex-col gap-1">
                    <label style={{ fontSize: '11.5px', fontWeight: 700, color: 'var(--text-secondary)', textTransform: 'uppercase' }}>
                      Mobile Phone
                    </label>
                    <Input
                      type="tel"
                      value={profileForm.phone}
                      disabled={!isEditingProfile}
                      onChange={(e) => {
                        setProfileForm({ ...profileForm, phone: e.target.value });
                        if (profileErrors.phone) setProfileErrors({ ...profileErrors, phone: null });
                      }}
                    />
                    {profileErrors.phone && (
                      <span style={{ fontSize: '11px', color: '#ef4444', fontWeight: 600 }}>
                        {profileErrors.phone}
                      </span>
                    )}
                  </div>
                </div>

                <div className="flex flex-col gap-1">
                  <label style={{ fontSize: '11.5px', fontWeight: 700, color: 'var(--text-secondary)', textTransform: 'uppercase' }}>
                    Legal Residence Address (Required for Voter Law Compliance)
                  </label>
                  <Input
                    type="text"
                    value={`${profileForm.address}, ${profileForm.city}, ${profileForm.state} ${profileForm.zip}`}
                    disabled={!isEditingProfile}
                    onChange={(e) => {
                      setProfileForm({ ...profileForm, address: e.target.value });
                      if (profileErrors.address) setProfileErrors({ ...profileErrors, address: null });
                    }}
                  />
                  {profileErrors.address && (
                    <span style={{ fontSize: '11px', color: '#ef4444', fontWeight: 600 }}>
                      {profileErrors.address}
                    </span>
                  )}
                </div>

                <div className="flex flex-col gap-1">
                  <label style={{ fontSize: '11.5px', fontWeight: 700, color: 'var(--text-secondary)', textTransform: 'uppercase' }}>
                    Emergency Field Contact
                  </label>
                  <Input
                    type="text"
                    value={profileForm.emergencyContact}
                    disabled={!isEditingProfile}
                    onChange={(e) => setProfileForm({ ...profileForm, emergencyContact: e.target.value })}
                  />
                </div>

                {isEditingProfile && (
                  <div className="flex items-center justify-end gap-2 pt-3 border-t border-border">
                    <Button variant="ghost" size="sm" type="button" onClick={handleCancelEdit}>
                      Cancel
                    </Button>
                    <Button variant="primary" size="sm" type="submit" icon={Save}>
                      Save Changes
                    </Button>
                  </div>
                )}
              </form>
            </Card>

            {/* Active Territory & Authorized Counties */}
            <Card style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <div>
                <div className="flex items-center justify-between mb-3">
                  <h3
                    style={{
                      fontSize: '1.1rem',
                      fontWeight: 700,
                      color: 'var(--text-primary)',
                      margin: 0,
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem',
                    }}
                  >
                    <MapPin size={18} style={{ color: '#ef4444' }} />
                    Active Territory & Authorized Counties
                  </h3>
                  <Badge variant="warning" size="sm">
                    Zone CA-4
                  </Badge>
                </div>
                <p style={{ margin: '0 0 1rem 0', fontSize: '12.5px', color: 'var(--text-secondary)' }}>
                  State election statutes require signature gatherers to only gather within assigned county boundaries.
                </p>

                <div className="space-y-3">
                  <div
                    style={{
                      backgroundColor: 'var(--surface-secondary)',
                      borderRadius: '12px',
                      padding: '0.85rem 1rem',
                      border: '1px solid var(--border)',
                    }}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span style={{ fontSize: '13px', fontWeight: 700, color: 'var(--text-primary)' }}>
                        Primary Territory Hub:
                      </span>
                      <span style={{ fontSize: '12px', fontWeight: 700, color: '#0284c7' }}>
                        Downtown Metro Corridor
                      </span>
                    </div>
                    <div style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>
                      Location Nickname: <strong>"Metro Plaza & Civic Center"</strong>
                    </div>
                  </div>

                  <div>
                    <span style={{ fontSize: '11px', fontWeight: 700, color: 'var(--text-tertiary)', textTransform: 'uppercase' }}>
                      Clearance Status by County:
                    </span>
                    <div className="grid grid-cols-2 gap-2 mt-1.5">
                      <div
                        style={{
                          backgroundColor: 'rgba(16, 185, 129, 0.08)',
                          border: '1px solid rgba(16, 185, 129, 0.25)',
                          borderRadius: '8px',
                          padding: '6px 10px',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '6px',
                          fontSize: '12px',
                          fontWeight: 600,
                          color: '#10b981',
                        }}
                      >
                        <CheckCircle2 size={14} /> Los Angeles County
                      </div>
                      <div
                        style={{
                          backgroundColor: 'rgba(16, 185, 129, 0.08)',
                          border: '1px solid rgba(16, 185, 129, 0.25)',
                          borderRadius: '8px',
                          padding: '6px 10px',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '6px',
                          fontSize: '12px',
                          fontWeight: 600,
                          color: '#10b981',
                        }}
                      >
                        <CheckCircle2 size={14} /> Alameda County
                      </div>
                      <div
                        style={{
                          backgroundColor: 'rgba(16, 185, 129, 0.08)',
                          border: '1px solid rgba(16, 185, 129, 0.25)',
                          borderRadius: '8px',
                          padding: '6px 10px',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '6px',
                          fontSize: '12px',
                          fontWeight: 600,
                          color: '#10b981',
                        }}
                      >
                        <CheckCircle2 size={14} /> Contra Costa County
                      </div>
                      <div
                        style={{
                          backgroundColor: 'rgba(16, 185, 129, 0.08)',
                          border: '1px solid rgba(16, 185, 129, 0.25)',
                          borderRadius: '8px',
                          padding: '6px 10px',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '6px',
                          fontSize: '12px',
                          fontWeight: 600,
                          color: '#10b981',
                        }}
                      >
                        <CheckCircle2 size={14} /> Orange County
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div
                style={{
                  marginTop: '1.25rem',
                  paddingTop: '0.85rem',
                  borderTop: '1px solid var(--border)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}
              >
                <span style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>
                  Need clearance in another county?
                </span>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setRequestCategoryName('Territory County Extension');
                    setIsRequestModalOpen(true);
                  }}
                >
                  Request Extension
                </Button>
              </div>
            </Card>
          </div>

          {/* Bottom Row: Onboarding Compliance & ADP Payroll Details */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))',
              gap: '1.5rem',
            }}
          >
            {/* Onboarding & Legal Compliance Verification Vault */}
            <Card style={{ padding: '1.5rem' }}>
              <div className="flex items-center justify-between mb-3">
                <h3
                  style={{
                    fontSize: '1.1rem',
                    fontWeight: 700,
                    color: 'var(--text-primary)',
                    margin: 0,
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                  }}
                >
                  <ShieldCheck size={18} style={{ color: '#10b981' }} />
                  Compliance & Onboarding Verification Vault
                </h3>
                <Badge variant="success" size="sm">
                  100% Cleared
                </Badge>
              </div>
              <p style={{ margin: '0 0 1rem 0', fontSize: '12.5px', color: 'var(--text-secondary)' }}>
                Required legal documentation on file under California Elections Code § 101.
              </p>

              <div className="flex flex-col gap-2.5">
                <div
                  style={{
                    backgroundColor: 'var(--surface-secondary)',
                    borderRadius: '10px',
                    padding: '0.75rem 1rem',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    border: '1px solid var(--border)',
                  }}
                >
                  <div className="flex items-center gap-2.5">
                    <CheckCircle2 size={16} style={{ color: '#10b981' }} />
                    <span style={{ fontSize: '13px', fontWeight: 600, color: 'var(--text-primary)' }}>
                      California Voter Registration Database Check
                    </span>
                  </div>
                  <span style={{ fontSize: '11px', color: '#10b981', fontWeight: 700 }}>
                    VERIFIED ACTIVE
                  </span>
                </div>

                <div
                  style={{
                    backgroundColor: 'var(--surface-secondary)',
                    borderRadius: '10px',
                    padding: '0.75rem 1rem',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    border: '1px solid var(--border)',
                  }}
                >
                  <div className="flex items-center gap-2.5">
                    <CheckCircle2 size={16} style={{ color: '#10b981' }} />
                    <span style={{ fontSize: '13px', fontWeight: 600, color: 'var(--text-primary)' }}>
                      Independent Contractor Agreement (Master Services)
                    </span>
                  </div>
                  <span style={{ fontSize: '11px', color: '#10b981', fontWeight: 700 }}>
                    E-SIGNED
                  </span>
                </div>

                <div
                  style={{
                    backgroundColor: 'var(--surface-secondary)',
                    borderRadius: '10px',
                    padding: '0.75rem 1rem',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    border: '1px solid var(--border)',
                  }}
                >
                  <div className="flex items-center gap-2.5">
                    <CheckCircle2 size={16} style={{ color: '#10b981' }} />
                    <span style={{ fontSize: '13px', fontWeight: 600, color: 'var(--text-primary)' }}>
                      Government Photo ID / Driver's License
                    </span>
                  </div>
                  <span style={{ fontSize: '11px', color: '#10b981', fontWeight: 700 }}>
                    EXP 2028
                  </span>
                </div>

                <div
                  style={{
                    backgroundColor: 'var(--surface-secondary)',
                    borderRadius: '10px',
                    padding: '0.75rem 1rem',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    border: '1px solid var(--border)',
                  }}
                >
                  <div className="flex items-center gap-2.5">
                    <CheckCircle2 size={16} style={{ color: '#10b981' }} />
                    <span style={{ fontSize: '13px', fontWeight: 600, color: 'var(--text-primary)' }}>
                      Legal Ethics & Petition Circulator Training
                    </span>
                  </div>
                  <span style={{ fontSize: '11px', color: '#10b981', fontWeight: 700 }}>
                    CERTIFIED 100%
                  </span>
                </div>
              </div>

              <div className="mt-3 text-right">
                <Button
                  variant="ghost"
                  size="sm"
                  icon={FileText}
                  onClick={() => navigate('/crm/onboarding')}
                >
                  View Onboarding Packet
                </Button>
              </div>
            </Card>

            {/* ADP Payroll & Payout Setup */}
            <Card style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <div>
                <div className="flex items-center justify-between mb-3">
                  <h3
                    style={{
                      fontSize: '1.1rem',
                      fontWeight: 700,
                      color: 'var(--text-primary)',
                      margin: 0,
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem',
                    }}
                  >
                    <CreditCard size={18} style={{ color: '#0284c7' }} />
                    Payout & ADP Payroll Integration
                  </h3>
                  <Badge variant="primary" size="sm">
                    ADP Integrated
                  </Badge>
                </div>
                <p style={{ margin: '0 0 1rem 0', fontSize: '12.5px', color: 'var(--text-secondary)' }}>
                  Commissions calculated via Commission Maker and disbursed bi-weekly to your designated account.
                </p>

                <div className="grid grid-cols-2 gap-3 mb-3">
                  <div
                    style={{
                      backgroundColor: 'var(--surface-secondary)',
                      borderRadius: '12px',
                      padding: '0.75rem',
                      border: '1px solid var(--border)',
                    }}
                  >
                    <span style={{ fontSize: '10.5px', color: 'var(--text-tertiary)', textTransform: 'uppercase', fontWeight: 700 }}>
                      ADP Worker ID
                    </span>
                    <div style={{ fontFamily: 'monospace', fontWeight: 700, fontSize: '13px', color: 'var(--text-primary)', marginTop: '2px' }}>
                      {profileForm.adpId}
                    </div>
                  </div>

                  <div
                    style={{
                      backgroundColor: 'var(--surface-secondary)',
                      borderRadius: '12px',
                      padding: '0.75rem',
                      border: '1px solid var(--border)',
                    }}
                  >
                    <span style={{ fontSize: '10.5px', color: 'var(--text-tertiary)', textTransform: 'uppercase', fontWeight: 700 }}>
                      Compensation Tier
                    </span>
                    <div style={{ fontWeight: 700, fontSize: '13px', color: '#10b981', marginTop: '2px' }}>
                      Tier 1 Gatherer ($2-$4/sig)
                    </div>
                  </div>
                </div>

                <div
                  style={{
                    backgroundColor: 'var(--surface-secondary)',
                    borderRadius: '12px',
                    padding: '0.85rem 1rem',
                    border: '1px solid var(--border)',
                    marginBottom: '0.75rem',
                  }}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>Disbursement Method:</span>
                    <span style={{ fontSize: '12px', fontWeight: 700, color: 'var(--text-primary)' }}>
                      Direct Deposit
                    </span>
                  </div>
                  <div style={{ fontSize: '13px', fontWeight: 600, color: '#0284c7' }}>
                    Chase Commercial Checking (****4910)
                  </div>
                </div>

                <div className="flex items-center justify-between text-xs" style={{ color: 'var(--text-secondary)' }}>
                  <span>Next Payroll Run: <strong>Oct 15, 2026</strong></span>
                  <span>YTD Total: <strong style={{ color: '#10b981' }}>$1,245.50</strong></span>
                </div>
              </div>

              <div
                style={{
                  marginTop: '1.25rem',
                  paddingTop: '0.85rem',
                  borderTop: '1px solid var(--border)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}
              >
                <span style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>
                  View itemized breakdown
                </span>
                <Button
                  variant="secondary"
                  size="sm"
                  icon={DollarSign}
                  onClick={() => navigate('/crm/commissions')}
                >
                  My Commissions Statements
                </Button>
              </div>
            </Card>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* VIEW 2: CATEGORY BROWSER TAB                             */}
      {/* ======================================================== */}
      {activeTab === 'categories' && (
        <div className="flex flex-col gap-6">
          {/* Top Control Bar: Search, Category Filters, and Governance Stats */}
          <Card style={{ padding: '1.25rem 1.5rem' }}>
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
              <div>
                <h3
                  style={{
                    fontSize: '1.2rem',
                    fontWeight: 800,
                    color: 'var(--text-primary)',
                    margin: 0,
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                  }}
                >
                  <Layers size={20} style={{ color: '#0284c7' }} />
                  Petition Categories & Master Campaign Browser
                </h3>
                <p style={{ margin: '2px 0 0 0', fontSize: '13px', color: 'var(--text-secondary)' }}>
                  Browse valid signature drive categories. Review signature payout rates, legal talking points, and county restrictions.
                </p>
              </div>

              {/* Role-Appropriate Governance Indicator */}
              <div className="flex items-center gap-2">
                <Badge variant="neutral" size="sm">
                  Platform Capacity: {petitionCategories.length} / 100 Categories
                </Badge>
                <Badge variant={isManager ? "warning" : "primary"} size="sm">
                  Role: {isManager ? "Management Authority (Master Controls)" : "Circulator (Read-Only Rules)"}
                </Badge>
                {isManager && (
                  <Button
                    variant="primary"
                    size="sm"
                    icon={Plus}
                    onClick={() => setIsAddCategoryModalOpen(true)}
                  >
                    Add Category
                  </Button>
                )}
              </div>
            </div>

            <div className="flex flex-col gap-3">
              {/* Sector Filter Pills (Up to 100 Categories across 10 sectors) */}
              <div className="flex items-center gap-1.5 overflow-x-auto pb-1" style={{ maxWidth: '100%' }}>
                {[
                  'All',
                  'Statewide Initiatives',
                  'County Bonds & Infrastructure',
                  'Municipal Charters & Elections',
                  'Public Health & Healthcare Access',
                  'Environmental & Conservation',
                  'Public Safety & Justice Reform',
                  'Transportation & Transit',
                  'Public Education & Schools',
                  'Housing Affordability & Zoning',
                  'Tax Policy & Business Regulation',
                ].map((sector) => (
                  <button
                    key={sector}
                    type="button"
                    onClick={() => {
                      setSelectedCategoryFilter(sector);
                      setCurrentPage(1);
                    }}
                    style={{
                      padding: '5px 12px',
                      borderRadius: '10px',
                      fontSize: '12px',
                      fontWeight: selectedCategoryFilter === sector ? 700 : 500,
                      backgroundColor: selectedCategoryFilter === sector ? '#0284c7' : 'var(--surface-secondary)',
                      color: selectedCategoryFilter === sector ? '#ffffff' : 'var(--text-secondary)',
                      border: '1px solid var(--border)',
                      cursor: 'pointer',
                      whiteSpace: 'nowrap',
                      transition: 'all 0.15s ease',
                    }}
                  >
                    {sector}
                  </button>
                ))}
              </div>

              {/* Status and Search Filter Bar */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-1 border-t border-border">
                <div className="flex items-center gap-2">
                  <span style={{ fontSize: '12px', color: 'var(--text-tertiary)', fontWeight: 600 }}>
                    Status:
                  </span>
                  <select
                    value={statusFilter}
                    onChange={(e) => {
                      setStatusFilter(e.target.value);
                      setCurrentPage(1);
                    }}
                    style={{
                      padding: '0.45rem 0.75rem',
                      borderRadius: '10px',
                      border: '1px solid var(--border)',
                      backgroundColor: 'var(--surface)',
                      color: 'var(--text-primary)',
                      fontSize: '12.5px',
                      outline: 'none',
                    }}
                  >
                    <option value="All">All Statuses</option>
                    <option value="Assigned & Active">Assigned & Active</option>
                    <option value="High Priority">High Priority</option>
                    <option value="Available to Request">Available to Request</option>
                  </select>
                </div>

                {/* Search Filter */}
                <div className="relative w-full sm:w-80">
                  <Search
                    size={15}
                    className="absolute left-3 top-1/2 -translate-y-1/2"
                    style={{ color: 'var(--text-tertiary)' }}
                  />
                  <input
                    type="text"
                    placeholder="Search 100 categories, codes, counties..."
                    value={categorySearch}
                    onChange={(e) => {
                      setCategorySearch(e.target.value);
                      setCurrentPage(1);
                    }}
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
            </div>
          </Card>

          {/* Categories & Projects Grid */}
          <div className="flex flex-col gap-6">
            {paginatedCategories.length === 0 ? (
              <Card style={{ padding: '3rem', textAlign: 'center' }}>
                <Layers size={36} style={{ color: 'var(--text-tertiary)', margin: '0 auto 0.75rem auto' }} />
                <h4 style={{ margin: 0, fontSize: '15px', color: 'var(--text-primary)', fontWeight: 700 }}>
                  No matching petition categories found
                </h4>
                <p style={{ margin: '4px 0 0 0', fontSize: '13px', color: 'var(--text-secondary)' }}>
                  Try adjusting your search criteria or resetting the sector filter.
                </p>
                <div className="mt-4">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setSelectedCategoryFilter('All');
                      setStatusFilter('All');
                      setCategorySearch('');
                      setCurrentPage(1);
                    }}
                  >
                    Reset All Filters
                  </Button>
                </div>
              </Card>
            ) : (
              paginatedCategories.map((category) => {
                const categoryProjects = category.activeProjects.filter((p) => {
                  return (
                    !categorySearch ||
                    p.title.toLowerCase().includes(categorySearch.toLowerCase()) ||
                    p.jurisdiction.toLowerCase().includes(categorySearch.toLowerCase()) ||
                    p.code.toLowerCase().includes(categorySearch.toLowerCase()) ||
                    category.name.toLowerCase().includes(categorySearch.toLowerCase())
                  );
                });

                if (categoryProjects.length === 0 && categorySearch) return null;

                return (
                  <div key={category.id} className="flex flex-col gap-3">
                    {/* Category Header Strip */}
                    <div
                      style={{
                        padding: '0.75rem 1rem',
                        backgroundColor: 'var(--surface-secondary)',
                        borderRadius: '14px',
                        border: '1px solid var(--border)',
                        display: 'flex',
                        flexDirection: 'column',
                        smFlexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'flex-start',
                        gap: '0.5rem',
                      }}
                    >
                      <div>
                        <div className="flex items-center gap-2">
                          <span style={{ fontSize: '10.5px', fontWeight: 800, color: '#0284c7', textTransform: 'uppercase' }}>
                            {category.code}
                          </span>
                          <span style={{ color: 'var(--text-tertiary)' }}>•</span>
                          <h4 style={{ margin: 0, fontSize: '14px', fontWeight: 800, color: 'var(--text-primary)' }}>
                            {category.name}
                          </h4>
                          <span
                            style={{
                              fontSize: '11px',
                              backgroundColor: 'var(--surface)',
                              padding: '1px 7px',
                              borderRadius: '6px',
                              border: '1px solid var(--border)',
                              color: 'var(--text-secondary)',
                            }}
                          >
                            {category.projectCount} of {category.maxProjectsAllowed} max projects
                          </span>
                          {category.sector && (
                            <span
                              style={{
                                fontSize: '10.5px',
                                backgroundColor: 'rgba(2, 132, 199, 0.1)',
                                color: '#0284c7',
                                padding: '1px 7px',
                                borderRadius: '6px',
                                fontWeight: 700,
                              }}
                            >
                              {category.sector}
                            </span>
                          )}
                        </div>
                        <p style={{ margin: '2px 0 0 0', fontSize: '12px', color: 'var(--text-secondary)' }}>
                          {category.description}
                        </p>
                      </div>

                      <div className="flex items-center gap-2">
                        {isManager ? (
                          <Button
                            variant="outline"
                            size="sm"
                            icon={Edit3}
                            onClick={() => handleOpenEditCategory(category)}
                          >
                            Edit Category & Rates
                          </Button>
                        ) : (
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => {
                              setRequestCategoryName(category.name);
                              setIsRequestModalOpen(true);
                            }}
                          >
                            Request Category Clearance
                          </Button>
                        )}
                      </div>
                    </div>

                    {/* Projects Cards within Category */}
                    <div
                      style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(420px, 1fr))',
                        gap: '1.25rem',
                      }}
                    >
                      {categoryProjects.map((project) => (
                        <Card
                          key={project.id}
                          style={{
                            padding: '1.25rem',
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'space-between',
                            gap: '1rem',
                            border: '1px solid var(--border)',
                          }}
                        >
                          <div>
                            {/* Card Header: Title & Pay-per-sig badge */}
                            <div className="flex items-start justify-between gap-3 mb-2">
                              <div>
                                <Badge variant={project.badgeVariant} size="sm" className="mb-1.5">
                                  {project.code}
                                </Badge>
                                <h3
                                  style={{
                                    fontSize: '1.1rem',
                                    fontWeight: 800,
                                    color: 'var(--text-primary)',
                                    margin: 0,
                                    lineHeight: '1.3',
                                  }}
                                >
                                  {project.title}
                                </h3>
                              </div>

                              <div
                                style={{
                                  backgroundColor: 'rgba(16, 185, 129, 0.1)',
                                  border: '1px solid rgba(16, 185, 129, 0.25)',
                                  borderRadius: '12px',
                                  padding: '6px 12px',
                                  textAlign: 'right',
                                  flexShrink: 0,
                                }}
                              >
                                <div style={{ fontSize: '1.25rem', fontWeight: 800, color: '#10b981', lineHeight: '1' }}>
                                  ${project.payRate ? project.payRate.toFixed(2) : '3.50'}
                                </div>
                                <div style={{ fontSize: '10px', fontWeight: 600, color: 'var(--text-tertiary)', marginTop: '2px' }}>
                                  / valid sig
                                </div>
                              </div>
                            </div>

                            <p style={{ fontSize: '12px', color: '#0284c7', margin: '0 0 0.75rem 0', fontWeight: 600 }}>
                              {project.tierNote}
                            </p>

                            {/* Campaign Progress Bar */}
                            <div className="mb-3">
                              <div className="flex items-center justify-between text-xs mb-1" style={{ color: 'var(--text-secondary)' }}>
                                <span>Goal: {project.targetSigs.toLocaleString()} signatures</span>
                                <span style={{ fontWeight: 700, color: 'var(--text-primary)' }}>
                                  {Math.round((project.collectedSigs / project.targetSigs) * 100)}% Collected
                                </span>
                              </div>
                              <ProgressBar
                                value={project.collectedSigs}
                                max={project.targetSigs}
                                variant={project.badgeVariant}
                                size="sm"
                              />
                            </div>

                            {/* County / Jurisdiction Restrictions */}
                            <div
                              style={{
                                backgroundColor: 'var(--surface-secondary)',
                                borderRadius: '10px',
                                padding: '0.65rem 0.85rem',
                                border: '1px solid var(--border)',
                                marginBottom: '0.75rem',
                              }}
                            >
                              <div className="flex items-center gap-1.5 text-xs font-bold" style={{ color: '#ef4444' }}>
                                <MapPin size={13} />
                                County Restrictions & Jurisdiction:
                              </div>
                              <div style={{ fontSize: '12px', color: 'var(--text-primary)', marginTop: '2px' }}>
                                {project.jurisdiction}
                              </div>
                              <div style={{ fontSize: '11px', color: 'var(--text-tertiary)', marginTop: '2px' }}>
                                Permitted: {project.allowedCounties ? project.allowedCounties.join(', ') : 'All Counties'}
                              </div>
                            </div>

                            {/* Legal Eligibility Rules Box */}
                            <div
                              style={{
                                backgroundColor: 'var(--surface-secondary)',
                                borderRadius: '10px',
                                padding: '0.65rem 0.85rem',
                                border: '1px solid var(--border)',
                                marginBottom: '0.75rem',
                              }}
                            >
                              <div className="flex items-center gap-1.5 text-xs font-bold text-primary mb-1">
                                <ShieldCheck size={13} style={{ color: '#10b981' }} />
                                Signer Eligibility Requirements:
                              </div>
                              <ul style={{ margin: 0, paddingLeft: '1.25rem', fontSize: '11.5px', color: 'var(--text-secondary)', lineHeight: '1.5' }}>
                                {project.eligibilityRules.map((rule, idx) => (
                                  <li key={idx}>{rule}</li>
                                ))}
                              </ul>
                            </div>

                            {/* Circulator Field Talking Points Box */}
                            <div
                              style={{
                                backgroundColor: 'rgba(14, 165, 233, 0.06)',
                                borderRadius: '10px',
                                padding: '0.65rem 0.85rem',
                                border: '1px solid rgba(14, 165, 233, 0.2)',
                              }}
                            >
                              <div className="flex items-center gap-1.5 text-xs font-bold" style={{ color: '#0284c7' }}>
                                <Sparkles size={13} />
                                Field Pitch & Talking Points:
                              </div>
                              <ul style={{ margin: '4px 0 0 0', paddingLeft: '1.25rem', fontSize: '11.5px', color: 'var(--text-secondary)', lineHeight: '1.5' }}>
                                {project.talkingPoints.map((point, idx) => (
                                  <li key={idx}>{point}</li>
                                ))}
                              </ul>
                            </div>
                          </div>

                          {/* Card Footer Actions */}
                          <div
                            style={{
                              paddingTop: '0.75rem',
                              borderTop: '1px solid var(--border)',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'space-between',
                              gap: '0.5rem',
                            }}
                          >
                            <span style={{ fontSize: '11.5px', color: 'var(--text-tertiary)' }}>
                              Manager: Leo Fontaine
                            </span>

                            <div className="flex items-center gap-2">
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => navigate('/crm/dashboard')}
                              >
                                Log Daily #s
                              </Button>
                              <Button
                                variant="primary"
                                size="sm"
                                onClick={() => {
                                  addToast({
                                    title: `${project.code} Selected`,
                                    message: `Loaded petition guidelines and field talking points. Ready to gather!`,
                                    type: 'success',
                                  });
                                  navigate('/crm/tracker');
                                }}
                              >
                                Start Shift
                              </Button>
                            </div>
                          </div>
                        </Card>
                      ))}
                    </div>
                  </div>
                );
              })
            )}

            {/* Pagination Bar */}
            {filteredCategories.length > 0 && (
              <div
                style={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  gap: '1rem',
                  padding: '1rem 1.25rem',
                  borderRadius: '12px',
                  backgroundColor: 'var(--surface)',
                  border: '1px solid var(--border)',
                }}
              >
                <div style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>
                  Showing <strong>{(currentPage - 1) * itemsPerPage + 1}</strong> to{' '}
                  <strong>{Math.min(currentPage * itemsPerPage, filteredCategories.length)}</strong> of{' '}
                  <strong>{filteredCategories.length}</strong> categories (Total Platform Capacity:{' '}
                  {petitionCategories.length} / 100)
                </div>

                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    icon={ChevronLeft}
                    disabled={currentPage === 1}
                    onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                  >
                    Previous
                  </Button>
                  <span style={{ fontSize: '12.5px', fontWeight: 700, padding: '0 0.5rem', color: 'var(--text-primary)' }}>
                    Page {currentPage} of {totalPages || 1}
                  </span>
                  <Button
                    variant="outline"
                    size="sm"
                    disabled={currentPage >= totalPages}
                    onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                  >
                    Next
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* MODAL: REQUEST CATEGORY OR COUNTY CLEARANCE              */}
      {/* ======================================================== */}
      <Modal
        isOpen={isRequestModalOpen}
        onClose={() => setIsRequestModalOpen(false)}
        title="Request Category or County Assignment"
        maxWidth="520px"
      >
        <form onSubmit={handleRequestSubmit} className="flex flex-col gap-4">
          <p style={{ fontSize: '13px', color: 'var(--text-secondary)', margin: 0 }}>
            As a Circulator, campaign category structures and price overrides are governed by your Executive Coordinator. Use this form to request access to collect for an additional category or county.
          </p>

          <div className="flex flex-col gap-1.5">
            <label style={{ fontSize: '12px', fontWeight: 700, color: 'var(--text-primary)' }}>
              Category or Assignment Type
            </label>
            <Input
              type="text"
              value={requestCategoryName}
              onChange={(e) => setRequestCategoryName(e.target.value)}
              required
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label style={{ fontSize: '12px', fontWeight: 700, color: 'var(--text-primary)' }}>
              Requested County or Territory
            </label>
            <Input
              type="text"
              placeholder="e.g. San Diego County or Riverside County"
              required
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label style={{ fontSize: '12px', fontWeight: 700, color: 'var(--text-primary)' }}>
              Field Justification & Expected Turnout Notes
            </label>
            <textarea
              rows={3}
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
              placeholder="I have permission from local farmers market organizers to gather signatures next weekend..."
              value={requestNotes}
              onChange={(e) => setRequestNotes(e.target.value)}
            />
          </div>

          <div className="p-3 rounded-xl flex items-start gap-2.5" style={{ backgroundColor: 'rgba(14, 165, 233, 0.08)', border: '1px solid rgba(14, 165, 233, 0.2)' }}>
            <Info size={16} style={{ color: '#0284c7', flexShrink: 0, marginTop: '2px' }} />
            <p style={{ fontSize: '12px', color: 'var(--text-secondary)', margin: 0 }}>
              Requests are reviewed by Marcus Vance (Coordinator) within 24 hours. Approval grants official petition sheets and voter signature logs.
            </p>
          </div>

          <div className="flex items-center justify-end gap-2 pt-2 border-t border-border">
            <Button variant="ghost" type="button" onClick={() => setIsRequestModalOpen(false)}>
              Cancel
            </Button>
            <Button variant="primary" type="submit" icon={Send}>
              Send Request
            </Button>
          </div>
        </form>
      </Modal>

      {/* ======================================================== */}
      {/* MODAL: MANAGER EDIT CATEGORY & RATES (MANAGER ROLE)      */}
      {/* ======================================================== */}
      {isManager && editingCategory && (
        <Modal
          isOpen={isEditCategoryModalOpen}
          onClose={() => setIsEditCategoryModalOpen(false)}
          title="Master Category & Rate Configuration (Management Override)"
          maxWidth="560px"
        >
          <form onSubmit={handleSaveCategoryEdit} className="flex flex-col gap-4">
            <div className="p-3 rounded-xl flex items-center justify-between" style={{ backgroundColor: 'rgba(245, 158, 11, 0.1)', border: '1px solid rgba(245, 158, 11, 0.25)' }}>
              <div className="flex items-center gap-2">
                <Settings size={16} style={{ color: '#d97706' }} />
                <span style={{ fontSize: '12px', fontWeight: 700, color: '#d97706' }}>
                  Management Role Access Verified
                </span>
              </div>
              <Badge variant="warning" size="sm">
                ID: {editingCategory.code}
              </Badge>
            </div>

            <div className="flex flex-col gap-1">
              <label style={{ fontSize: '12px', fontWeight: 700, color: 'var(--text-primary)' }}>
                Measure / Category Title
              </label>
              <Input
                type="text"
                value={editingCategory.name}
                onChange={(e) => setEditingCategory({ ...editingCategory, name: e.target.value })}
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="flex flex-col gap-1">
                <label style={{ fontSize: '12px', fontWeight: 700, color: 'var(--text-primary)' }}>
                  Pay Rate per Valid Signature ($)
                </label>
                <Input
                  type="number"
                  step="0.05"
                  min="1.00"
                  max="10.00"
                  value={editingCategory.payRate}
                  onChange={(e) => setEditingCategory({ ...editingCategory, payRate: e.target.value })}
                  required
                />
              </div>

              <div className="flex flex-col gap-1">
                <label style={{ fontSize: '12px', fontWeight: 700, color: 'var(--text-primary)' }}>
                  Campaign Field Status
                </label>
                <select
                  value={editingCategory.status}
                  onChange={(e) => setEditingCategory({ ...editingCategory, status: e.target.value })}
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
                  <option value="Assigned & Active">Assigned & Active</option>
                  <option value="High Priority">High Priority</option>
                  <option value="Available to Request">Available to Request</option>
                </select>
              </div>
            </div>

            <div className="flex flex-col gap-1">
              <label style={{ fontSize: '12px', fontWeight: 700, color: 'var(--text-primary)' }}>
                Jurisdiction & Authorized Counties
              </label>
              <Input
                type="text"
                value={editingCategory.allowedCounties}
                onChange={(e) => setEditingCategory({ ...editingCategory, allowedCounties: e.target.value })}
                required
              />
            </div>

            <div className="flex flex-col gap-1">
              <label style={{ fontSize: '12px', fontWeight: 700, color: 'var(--text-primary)' }}>
                Master Category Description & Ballot Intent
              </label>
              <textarea
                rows={3}
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
                value={editingCategory.description}
                onChange={(e) => setEditingCategory({ ...editingCategory, description: e.target.value })}
              />
            </div>

            <div className="flex items-center justify-end gap-2 pt-2 border-t border-border">
              <Button variant="ghost" type="button" onClick={() => setIsEditCategoryModalOpen(false)}>
                Cancel
              </Button>
              <Button variant="primary" type="submit" icon={Save}>
                Save Master Settings
              </Button>
            </div>
          </form>
        </Modal>
      )}

      {/* ======================================================== */}
      {/* MODAL: MANAGER ADD NEW CATEGORY (MANAGER ROLE)           */}
      {/* ======================================================== */}
      {isManager && (
        <Modal
          isOpen={isAddCategoryModalOpen}
          onClose={() => setIsAddCategoryModalOpen(false)}
          title="Add New Petition Drive Category (Platform Capacity: 100)"
          maxWidth="560px"
        >
          <form onSubmit={handleCreateCategory} className="flex flex-col gap-4">
            <p style={{ fontSize: '13px', color: 'var(--text-secondary)', margin: 0 }}>
              Authorized management action: Instantiate a new ballot measure drive into the 100-category master register.
            </p>

            <div className="flex flex-col gap-1">
              <label style={{ fontSize: '12px', fontWeight: 700, color: 'var(--text-primary)' }}>
                Measure Title
              </label>
              <Input
                type="text"
                placeholder="e.g. Prop 65 - Toxic Chemical Disclosure Act"
                value={newCategoryForm.name}
                onChange={(e) => setNewCategoryForm({ ...newCategoryForm, name: e.target.value })}
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="flex flex-col gap-1">
                <label style={{ fontSize: '12px', fontWeight: 700, color: 'var(--text-primary)' }}>
                  Civic Sector
                </label>
                <select
                  value={newCategoryForm.sector}
                  onChange={(e) => setNewCategoryForm({ ...newCategoryForm, sector: e.target.value })}
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
                  <option value="Statewide Initiatives">Statewide Initiatives</option>
                  <option value="County Bonds & Infrastructure">County Bonds & Infrastructure</option>
                  <option value="Municipal Charters & Elections">Municipal Charters & Elections</option>
                  <option value="Public Health & Healthcare Access">Public Health & Healthcare Access</option>
                  <option value="Environmental & Conservation">Environmental & Conservation</option>
                  <option value="Public Safety & Justice Reform">Public Safety & Justice Reform</option>
                  <option value="Transportation & Transit">Transportation & Transit</option>
                  <option value="Public Education & Schools">Public Education & Schools</option>
                  <option value="Housing Affordability & Zoning">Housing Affordability & Zoning</option>
                  <option value="Tax Policy & Business Regulation">Tax Policy & Business Regulation</option>
                </select>
              </div>

              <div className="flex flex-col gap-1">
                <label style={{ fontSize: '12px', fontWeight: 700, color: 'var(--text-primary)' }}>
                  Pay Rate ($ / valid signature)
                </label>
                <Input
                  type="number"
                  step="0.05"
                  min="1.00"
                  max="10.00"
                  value={newCategoryForm.payRate}
                  onChange={(e) => setNewCategoryForm({ ...newCategoryForm, payRate: e.target.value })}
                  required
                />
              </div>
            </div>

            <div className="flex flex-col gap-1">
              <label style={{ fontSize: '12px', fontWeight: 700, color: 'var(--text-primary)' }}>
                County Restrictions
              </label>
              <Input
                type="text"
                placeholder="e.g. All 58 California Counties or Los Angeles County"
                value={newCategoryForm.allowedCounties}
                onChange={(e) => setNewCategoryForm({ ...newCategoryForm, allowedCounties: e.target.value })}
                required
              />
            </div>

            <div className="flex flex-col gap-1">
              <label style={{ fontSize: '12px', fontWeight: 700, color: 'var(--text-primary)' }}>
                Brief Description & Legal Talking Points
              </label>
              <textarea
                rows={3}
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
                placeholder="Details of ballot measure and qualification goals..."
                value={newCategoryForm.description}
                onChange={(e) => setNewCategoryForm({ ...newCategoryForm, description: e.target.value })}
              />
            </div>

            <div className="flex items-center justify-end gap-2 pt-2 border-t border-border">
              <Button variant="ghost" type="button" onClick={() => setIsAddCategoryModalOpen(false)}>
                Cancel
              </Button>
              <Button variant="primary" type="submit" icon={Plus}>
                Create Category
              </Button>
            </div>
          </form>
        </Modal>
      )}
    </div>
  );
};

export default CirculatorProfile;
