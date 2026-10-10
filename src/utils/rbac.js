/**
 * Role-Based Access Control (RBAC) Engine
 * CRM iCanvass Enterprise + OAL Network Marketplace
 */

// CRM Role Definitions & Module Permissions for all 12 Roles
export const CRM_ROLE_CONFIG = {
  super_admin: {
    id: 'super_admin',
    title: 'Executive / Super Admin',
    roleName: 'Executive',
    badge: 'Master System Control',
    defaultRoute: '/crm/global-settings',
    allowedNavIds: ['executive-dashboard', 'payroll-processing', 'global-settings'],
    allowedRoutes: ['/crm/executive-dashboard', '/crm/payroll-pro', '/crm/global-settings', '/crm/profile'],
  },
  campaign_manager: {
    id: 'campaign_manager',
    title: 'Campaign Manager',
    roleName: 'Campaign Manager',
    badge: 'Corporate Campaigns',
    defaultRoute: '/crm/enterprise',
    allowedNavIds: ['enterprise-dashboard', 'voter-stats', 'advanced-reports'],
    allowedRoutes: ['/crm/enterprise', '/crm/voter-stats', '/crm/advanced-reports', '/crm/profile'],
  },
  coordinator: {
    id: 'coordinator',
    title: 'Coordinator',
    roleName: 'Coordinator',
    badge: 'Campaign Organization',
    defaultRoute: '/crm/projects',
    allowedNavIds: ['project-mgt', 'validation-setup', 'hierarchy-mgt-coord', 'commission-maker-master', 'live-feed-coord', 'messaging-coord', 'hr-recruitment-coord'],
    allowedRoutes: ['/crm/projects', '/crm/validation-setup', '/crm/hierarchy', '/crm/commission-maker', '/crm/live-feed', '/crm/messaging-pro', '/crm/hr', '/crm/profile'],
  },
  sub_coordinator: {
    id: 'sub_coordinator',
    title: 'Sub Coordinator',
    roleName: 'Sub Coordinator',
    badge: 'Field Operations',
    defaultRoute: '/crm/dashboard-sub',
    allowedNavIds: ['dashboard-sub', 'hierarchy-mgt', 'compliance-monitor', 'progress-track', 'commission-adj', 'messaging-sub', 'hr-recruitment-coord'],
    allowedRoutes: ['/crm/dashboard-sub', '/crm/hierarchy', '/crm/compliance', '/crm/progress', '/crm/commission-adj', '/crm/messaging-sub', '/crm/hr', '/crm/profile'],
  },
  manager: {
    id: 'manager',
    title: 'Team Manager',
    roleName: 'Manager',
    badge: 'Circulator Logistics',
    defaultRoute: '/crm/dashboard-pro',
    allowedNavIds: ['dashboard-pro', 'my-team', 'territory', 'commission-maker', 'messaging-pro', 'hr-recruitment-mgr'],
    allowedRoutes: ['/crm/dashboard-pro', '/crm/team', '/crm/territory', '/crm/commission-maker', '/crm/messaging-pro', '/crm/hr', '/crm/profile'],
  },
  circulator: {
    id: 'circulator',
    title: 'Circulator',
    roleName: 'Circulator',
    badge: 'Signature Gatherer',
    defaultRoute: '/crm/dashboard',
    allowedNavIds: ['dashboard', 'onboarding', 'tracker', 'commissions', 'messages', 'profile', 'categories'],
    allowedRoutes: ['/crm/dashboard', '/crm/circulator/dashboard', '/crm/circulator-dashboard', '/crm/onboarding', '/crm/tracker', '/crm/commissions', '/crm/messages', '/crm/profile', '/crm/circulator/profile', '/crm/categories'],
  },
  validation: {
    id: 'validation',
    title: 'Validation Team',
    roleName: 'Validation',
    badge: 'Quality & Compliance',
    defaultRoute: '/crm/validation-queue',
    allowedNavIds: ['validation-queue', 'validation-commissions', 'validation-reports'],
    allowedRoutes: ['/crm/validation-queue', '/crm/validation-commissions', '/crm/validation-reports', '/crm/profile'],
  },
  platform_admin: {
    id: 'platform_admin',
    title: 'Super Admin',
    roleName: 'Executive',
    badge: 'System Owner',
    defaultRoute: '/crm/executive-dashboard',
    allowedNavIds: ['executive-dashboard', 'payroll-processing', 'global-settings'],
    allowedRoutes: ['/crm/executive-dashboard', '/crm/payroll-pro', '/crm/global-settings', '/crm/profile'],
  },
  icanvass_admin: {
    id: 'icanvass_admin',
    title: 'Platform Admin',
    roleName: 'iCanvass Admin',
    badge: 'Software Manager',
    defaultRoute: '/crm/tenant-mgt',
    allowedNavIds: ['tenant-mgt', 'subscriptions-portal', 'system-audit'],
    allowedRoutes: ['/crm/tenant-mgt', '/crm/subscriptions', '/crm/system-audit', '/crm/profile'],
  },
};

// OAL Marketplace Role Definitions & Module Permissions
export const OAL_ROLE_CONFIG = {
  borrower: {
    id: 'borrower',
    title: 'Corporate Borrower',
    roleName: 'Borrower Account',
    badge: 'KYC Vault & Underwriting Offers',
    defaultRoute: '/oal/borrower/dashboard',
    allowedNavIds: [
      'borrower-dashboard',
      'borrower-kyc',
      'borrower-app',
      'borrower-offers',
      'borrower-score',
      'borrower-messages',
    ],
    allowedRoutes: [
      '/oal/dashboard',
      '/oal/borrower/dashboard',
      '/oal/borrower/kyc',
      '/oal/borrower/application',
      '/oal/borrower/documents',
      '/oal/borrower/score',
      '/oal/borrower/offers',
      '/oal/borrower/messages',
      '/oal/borrower/referrals',
      '/oal/borrower/support',
      '/oal/borrower/profile',
      '/oal/borrower/settings',
      '/showcase',
    ],
  },
  lender: {
    id: 'lender',
    title: 'Institutional Lender',
    roleName: 'Lender Account',
    badge: 'Capital Allocation & Term Sheets',
    defaultRoute: '/oal/lender/dashboard',
    allowedNavIds: [
      'lender-dashboard',
      'lender-leads',
      'lender-applications',
      'lender-offers',
    ],
    allowedRoutes: [
      '/oal/dashboard',
      '/oal/lender/dashboard',
      '/oal/lender/leads',
      '/oal/lender/applications',
      '/oal/lender/offers',
      '/oal/lender/analytics',
      '/oal/lender/reports',
      '/oal/lender/profile',
      '/oal/lender/settings',
      '/showcase',
    ],
  },
  rep: {
    id: 'rep',
    title: 'Licensed OAL Representative',
    roleName: 'OAL Agent',
    badge: 'Underwriting Desk & Loan Queue',
    defaultRoute: '/oal/rep/dashboard',
    allowedNavIds: [
      'rep-dashboard',
      'rep-borrowers',
    ],
    allowedRoutes: [
      '/oal/dashboard',
      '/oal/rep/dashboard',
      '/oal/rep/borrowers',
      '/oal/rep/applications',
      '/oal/rep/documents',
      '/oal/rep/messages',
      '/oal/rep/offers',
      '/oal/rep/tasks',
      '/oal/rep/profile',
      '/showcase',
    ],
  },
  admin: {
    id: 'admin',
    title: 'Platform Master Admin',
    roleName: 'Master Admin',
    badge: 'Master Governance & Scoring Config',
    defaultRoute: '/oal/admin/dashboard',
    allowedNavIds: [
      'admin-dashboard',
      'admin-lenders',
      'admin-scoring',
      'admin-support',
      'admin-audit',
    ],
    allowedRoutes: [
      '/oal/dashboard',
      '/oal/admin/dashboard',
      '/oal/admin/borrowers',
      '/oal/admin/lenders',
      '/oal/admin/applications',
      '/oal/admin/verification',
      '/oal/admin/scoring',
      '/oal/admin/documents',
      '/oal/admin/payments',
      '/oal/admin/subscriptions',
      '/oal/admin/referrals',
      '/oal/admin/ads',
      '/oal/admin/cms',
      '/oal/admin/support',
      '/oal/admin/reports',
      '/oal/admin/audit',
      '/oal/admin/profile',
      '/oal/admin/settings',
      '/showcase',
    ],
  },
};

/**
 * Normalizes any role input (object or string) into a standard role ID.
 */
export const normalizeRoleId = (roleInput, product = 'crm') => {
  if (!roleInput) return product === 'crm' ? 'circulator' : 'borrower';

  if (typeof roleInput === 'object') {
    if (roleInput.id) return roleInput.id.toLowerCase();
    if (roleInput.roleId) return roleInput.roleId.toLowerCase();
    roleInput = roleInput.role || roleInput.title || '';
  }

  const normalized = String(roleInput).toLowerCase();

  // CRM 8-Role checks
  if (product === 'crm') {
    if (normalized.includes('super') || normalized.includes('executive')) return 'super_admin';
    if (normalized.includes('campaign')) return 'campaign_manager';
    if (normalized.includes('sub') || normalized.includes('subcoord')) return 'sub_coordinator';
    if (normalized.includes('coord')) return 'coordinator';
    if (normalized.includes('manager') || normalized.includes('team')) return 'manager';
    if (normalized.includes('circulator') || normalized.includes('gatherer')) return 'circulator';
    if (normalized.includes('validation')) return 'validation';
    if (normalized.includes('platform') || normalized.includes('admin')) return 'platform_admin';
    return 'circulator';
  }

  // OAL checks
  if (normalized.includes('borrower')) return 'borrower';
  if (normalized.includes('lender')) return 'lender';
  if (normalized.includes('rep') || normalized.includes('agent')) return 'rep';
  if (normalized.includes('admin')) return 'admin';

  return 'borrower';
};

/**
 * Returns role configuration for the active user.
 */
export const getRoleConfig = (userOrRoleId, product = 'crm') => {
  const roleId = normalizeRoleId(userOrRoleId, product);
  const configMap = product === 'crm' ? CRM_ROLE_CONFIG : OAL_ROLE_CONFIG;
  return configMap[roleId] || (product === 'crm' ? CRM_ROLE_CONFIG.circulator : OAL_ROLE_CONFIG.borrower);
};

/**
 * Filters navigation items array to only include items permitted for the role.
 */
export const getFilteredNavigation = (rawItems, product = 'crm', userOrRoleId) => {
  const config = getRoleConfig(userOrRoleId, product);
  const allowedIds = new Set(config.allowedNavIds);
  return rawItems.filter((item) => allowedIds.has(item.id));
};

/**
 * Checks if a user has permission to visit a specific path.
 */
export const isRouteAllowed = (path, product = 'crm', userOrRoleId) => {
  if (!path) return true;
  const config = getRoleConfig(userOrRoleId, product);

  // Clean path (strip trailing slashes and query strings)
  const cleanPath = path.split('?')[0].replace(/\/$/, '') || '/';

  // Global routes that are always allowed for CRM authenticated users
  if (product === 'crm' && (cleanPath === '/crm/all-tools' || cleanPath === '/crm/bestie')) {
    return true;
  }

  // Check direct match or route prefix match
  return config.allowedRoutes.some((allowed) => {
    const cleanAllowed = allowed.replace(/\/$/, '');
    if (cleanPath === cleanAllowed) return true;
    // Allow nested IDs (e.g. /crm/contacts/123 matches /crm/contacts)
    if (cleanPath.startsWith(`${cleanAllowed}/`)) return true;
    return false;
  });
};

/**
 * Returns the default fallback route for a given role.
 */
export const getDefaultRouteForRole = (product = 'crm', userOrRoleId) => {
  const config = getRoleConfig(userOrRoleId, product);
  return config.defaultRoute;
};
