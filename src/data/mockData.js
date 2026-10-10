import {
  LayoutDashboard,
  Users,
  Target,
  Kanban,
  CheckSquare,
  MessageSquare,
  Boxes,
  UserCheck,
  LifeBuoy,
  Sparkles,
  ShieldCheck,
  Settings,
  DollarSign,
  Landmark,
  FileText,
  CreditCard,
  Building2,
  TrendingUp,
  History,
  BookOpen,
  MapPin,
  Bot,
  Video,
  Megaphone,
  Grid,
  Search,
  Car,
  Lock,
  Network,
  ShieldAlert,
  User,
  Layers
} from 'lucide-react';

export const crmNavigation = [
  // 1_ Basic - Circulators / Signature Gatherers
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, path: '/crm/dashboard', section: 'Circulator (Basic)' },
  { id: 'onboarding', label: 'Onboarding & IDs', icon: UserCheck, path: '/crm/onboarding', section: 'Circulator (Basic)' },
  { id: 'tracker', label: 'Activity Tracker', icon: CheckSquare, path: '/crm/tracker', section: 'Circulator (Basic)' },
  { id: 'commissions', label: 'My Commissions', icon: DollarSign, path: '/crm/commissions', section: 'Circulator (Basic)' },
  { id: 'messages', label: 'Messages & Alerts', icon: MessageSquare, path: '/crm/messages', section: 'Circulator (Basic)' },
  { id: 'profile', label: 'My Profile & Badge', icon: User, path: '/crm/profile', section: 'Circulator (Basic)' },
  { id: 'categories', label: 'Petition Categories', icon: Layers, path: '/crm/categories', section: 'Circulator (Basic)' },

  // 2_ Pro - Sub Coordinator
  { id: 'dashboard-sub', label: 'Dashboard', icon: LayoutDashboard, path: '/crm/dashboard-sub', section: 'Sub Coordinator' },
  { id: 'hierarchy-mgt', label: 'Hierarchy Management', icon: Network, path: '/crm/hierarchy', section: 'Sub Coordinator' },
  { id: 'compliance-monitor', label: 'Compliance Monitoring', icon: ShieldAlert, path: '/crm/compliance', section: 'Sub Coordinator' },
  { id: 'progress-track', label: 'Progress Tracking', icon: Target, path: '/crm/progress', section: 'Sub Coordinator' },
  { id: 'commission-adj', label: 'Commission Adjustments', icon: Landmark, path: '/crm/commission-adj', section: 'Sub Coordinator' },
  { id: 'messaging-sub', label: 'Messaging', icon: MessageSquare, path: '/crm/messaging-sub', section: 'Sub Coordinator' },

  // 2_ Pro - Coordinator
  { id: 'project-mgt', label: 'Project Management', icon: Target, path: '/crm/projects', section: 'Coordinator' },
  { id: 'validation-setup', label: 'Validation Setup', icon: Settings, path: '/crm/validation-setup', section: 'Coordinator' },
  { id: 'hierarchy-mgt-coord', label: 'Hierarchy Management', icon: Network, path: '/crm/hierarchy', section: 'Coordinator' },
  { id: 'commission-maker-master', label: 'Commission Maker (Master)', icon: Landmark, path: '/crm/commission-maker', section: 'Coordinator' },
  { id: 'live-feed-coord', label: 'Live Feed (Social)', icon: Sparkles, path: '/crm/live-feed', section: 'Coordinator' },
  { id: 'messaging-coord', label: 'Direct Messaging', icon: MessageSquare, path: '/crm/messaging-pro', section: 'Coordinator' },
  { id: 'hr-recruitment-coord', label: 'HR & Recruitment', icon: UserCheck, path: '/crm/hr/candidates', section: 'Coordinator' },

  // 2_ Pro - Manager (Team Leaders)
  { id: 'dashboard-pro', label: 'Dashboard', icon: LayoutDashboard, path: '/crm/dashboard-pro', section: 'Team Leader (Pro)' },
  { id: 'my-team', label: 'My Team (Recruiting)', icon: Users, path: '/crm/team', section: 'Team Leader (Pro)' },
  { id: 'territory', label: 'Territory / Logistics', icon: MapPin, path: '/crm/territory', section: 'Team Leader (Pro)' },
  { id: 'commission-maker', label: 'Commission Maker (Team)', icon: Landmark, path: '/crm/commission-maker', section: 'Team Leader (Pro)' },
  { id: 'messaging-pro', label: 'Messaging', icon: MessageSquare, path: '/crm/messaging-pro', section: 'Team Leader (Pro)' },
  { id: 'hr-recruitment-mgr', label: 'HR & Recruitment', icon: UserCheck, path: '/crm/hr/candidates', section: 'Team Leader (Pro)' },

  // 3_ Validation Team - Compliance
  { id: 'validation-queue', label: 'Validation Queue', icon: ShieldCheck, path: '/crm/validation-queue', section: 'Validation Team' },
  { id: 'validation-commissions', label: 'Commission Maker (Audit)', icon: Landmark, path: '/crm/validation-commissions', section: 'Validation Team' },
  { id: 'validation-reports', label: 'Compliance Reports', icon: FileText, path: '/crm/validation-reports', section: 'Validation Team' },

  // 3_ Enterprise - Campaign Managers
  { id: 'enterprise-dashboard', label: 'Enterprise Dashboard', icon: LayoutDashboard, path: '/crm/enterprise', section: 'Campaign Manager' },
  { id: 'advanced-reports', label: 'Advanced Reporting', icon: TrendingUp, path: '/crm/advanced-reports', section: 'Campaign Manager' },
  { id: 'voter-stats', label: 'Voter Stats', icon: MapPin, path: '/crm/voter-stats', section: 'Campaign Manager' },

  // 4_ Admin Team
  { id: 'executive-dashboard', label: 'Executive Dashboard', icon: LayoutDashboard, path: '/crm/executive-dashboard', section: 'Executive / Super Admin' },
  { id: 'payroll-processing', label: 'Payroll Processing', icon: DollarSign, path: '/crm/payroll-pro', section: 'Executive / Super Admin' },
  { id: 'global-settings', label: 'Global Settings', icon: Settings, path: '/crm/global-settings', section: 'Executive / Super Admin' },

  // 5_ Platform Admin
  { id: 'tenant-mgt', label: 'Tenant / White Label Management', icon: Building2, path: '/crm/tenant-mgt', section: 'Platform Admin (iCanvass Admin)' },
  { id: 'subscriptions-portal', label: 'Subscription Portal', icon: DollarSign, path: '/crm/subscriptions', section: 'Platform Admin (iCanvass Admin)' },
  { id: 'system-audit', label: 'System Audit', icon: ShieldCheck, path: '/crm/system-audit', section: 'Platform Admin (iCanvass Admin)' },
];


export const oalNavigation = [
  // Borrower Persona Links
  { id: 'borrower-dashboard', label: 'Borrower Overview', icon: LayoutDashboard, path: '/oal/borrower/dashboard', section: 'Borrower Portal' },
  { id: 'borrower-kyc', label: 'KYC Vault', icon: ShieldCheck, path: '/oal/borrower/kyc', section: 'Borrower Portal' },
  { id: 'borrower-app', label: 'Loan Application', icon: FileText, path: '/oal/borrower/application', section: 'Borrower Portal' },
  { id: 'borrower-offers', label: 'Lender Offers', icon: CreditCard, path: '/oal/borrower/offers', section: 'Borrower Portal' },
  { id: 'borrower-score', label: 'AI Risk Rating', icon: Sparkles, path: '/oal/borrower/score', section: 'Borrower Portal' },
  { id: 'borrower-messages', label: 'Messages & Agent Chat', icon: MessageSquare, path: '/oal/borrower/messages', section: 'Borrower Portal' },

  // Lender Persona Links
  { id: 'lender-dashboard', label: 'Lender Portal', icon: Landmark, path: '/oal/lender/dashboard', section: 'Institutional Lender' },
  { id: 'lender-leads', label: 'Qualified Leads Pool', icon: Target, path: '/oal/lender/leads', section: 'Institutional Lender' },
  { id: 'lender-applications', label: 'Active Underwriting', icon: FileText, path: '/oal/lender/applications', section: 'Institutional Lender' },
  { id: 'lender-offers', label: 'Term Sheets Manager', icon: CreditCard, path: '/oal/lender/offers', section: 'Institutional Lender' },

  // OAL Rep Persona Links
  { id: 'rep-dashboard', label: 'OAL Agent Desk', icon: UserCheck, path: '/oal/rep/dashboard', section: 'OAL Licensed Agent' },
  { id: 'rep-borrowers', label: 'Borrower Queue', icon: Users, path: '/oal/rep/borrowers', section: 'OAL Licensed Agent' },

  // Master Admin Links
  { id: 'admin-dashboard', label: 'Platform Admin', icon: ShieldCheck, path: '/oal/admin/dashboard', section: 'Master Governance' },
  { id: 'admin-lenders', label: 'Lender Governance', icon: Building2, path: '/oal/admin/lenders', section: 'Master Governance' },
  { id: 'admin-scoring', label: 'AI Scoring Config', icon: TrendingUp, path: '/oal/admin/scoring', section: 'Master Governance' },
  { id: 'admin-support', label: 'AI Support Desk', icon: LifeBuoy, path: '/oal/admin/support', section: 'Master Governance' },
  { id: 'admin-audit', label: 'Audit Log Feed', icon: History, path: '/oal/admin/audit', section: 'Master Governance' },
];

export const mockNotifications = [
  { id: '1', title: 'New Lead Assigned: BioGenix Labs ($750k)', time: '10 mins ago' },
  { id: '2', title: 'Lender Offer Submitted by Vanguard Capital', time: '1 hour ago' },
  { id: '3', title: 'KYC Document Verification Passed', time: '3 hours ago' },
];

export const initialContacts = [
  {
    id: 'CNT-101',
    name: 'Eleanor Vance',
    company: 'Apex Global Technologies',
    email: 'e.vance@apex.io',
    phone: '+1 (555) 234-8901',
    type: 'Enterprise Client',
    owner: 'Alexander Wright',
    status: 'Active',
    lastActivity: '2 hours ago',
    createdDate: '2026-01-15',
    notesCount: 4,
    dealsCount: 2,
    totalValue: '$480,000',
  },
  {
    id: 'CNT-102',
    name: 'Marcus Sterling',
    company: 'Vanguard Capital Partners',
    email: 'm.sterling@vanguard.com',
    phone: '+1 (555) 456-7890',
    type: 'Investor',
    owner: 'Sarah Jenkins',
    status: 'Qualified',
    lastActivity: '1 day ago',
    createdDate: '2026-02-01',
    notesCount: 2,
    dealsCount: 1,
    totalValue: '$1,200,000',
  },
  {
    id: 'CNT-103',
    name: 'Dr. Aris Thorne',
    company: 'BioGenix Labs',
    email: 'a.thorne@biogenix.org',
    phone: '+1 (555) 678-1234',
    type: 'Borrower Partner',
    owner: 'Alexander Wright',
    status: 'Pending KYC',
    lastActivity: '3 hours ago',
    createdDate: '2026-02-10',
    notesCount: 6,
    dealsCount: 3,
    totalValue: '$750,000',
  },
];

export const initialLeads = [
  {
    id: 'LED-201',
    name: 'Samantha Ray',
    company: 'CloudScale Infra',
    email: 's.ray@cloudscale.net',
    phone: '+1 (555) 345-6789',
    source: 'Website Form',
    territory: 'North America',
    owner: 'Sarah Jenkins',
    status: 'New',
    score: 85,
    value: '$250,000',
    createdDate: '2026-02-20',
  },
];

export const initialDeals = [
  { id: 'DEAL-301', title: 'Enterprise Logistics Expansion', customer: 'Apex Global Technologies', value: '$480,000', owner: 'Alexander Wright', stage: 'Negotiation', probability: '85%', expectedClose: '2026-03-15' },
];

export const initialTasks = [
  { id: 'TSK-401', title: 'Send revised commercial proposal', contact: 'Eleanor Vance', priority: 'High', dueDate: '2026-02-28', status: 'Pending', assignedTo: 'Alexander Wright', reminder: '9:00 AM' },
];

export const initialMessages = [
  { id: 'MSG-501', type: 'email', sender: 'Eleanor Vance', recipient: 'a.wright@icanvass.com', subject: 'Re: Enterprise Logistics Master Service Agreement', body: 'Hi Alexander, our legal team reviewed the contract terms and approved the SLAs.', timestamp: '10:42 AM' },
];
