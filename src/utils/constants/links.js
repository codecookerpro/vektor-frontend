import { PERMISSION_TYPE } from './permissions';

const LINKS = Object.freeze({
  AUTH: {
    TITLE: 'Auth',
    HREF: '/auth',
  },
  SIGN_IN: {
    TITLE: 'Sign In',
    HREF: '/auth/sign-in',
  },
  RESET_PASSWORD: {
    TITLE: 'Reset Password',
    HREF: '/auth/reset-password/:passwordResetToken',
  },
  FORGOT_PASSWORD: {
    TITLE: 'Forgot Password',
    HREF: '/auth/forgot-password',
  },
  NOT_FOUND: {
    TITLE: '404 Page',
    HREF: '/auth/404',
  },
  ERROR_PAGE: {
    TITLE: '500 Page',
    HREF: '/auth/500',
  },
  OVERVIEW: {
    TITLE: 'Overview',
    HREF: '/overview',
  },
  EDIT_PROFILE: {
    TITLE: 'Profile',
    HREF: '/profile/edit',
  },
  PROJECT_MANAGEMENT: {
    TITLE: 'Project Management',
    HREF: '/project-management',
  },
  DASHBOARD: {
    TITLE: 'Dashboard',
    HREF: '/project-management/dashboard',
  },
  DASHBOARD_DETAIL: {
    TITLE: 'Dashboard Detail',
    HREF: '/project-management/dashboard/:id',
  },
  PROJECTS: {
    TITLE: 'Projects',
    HREF: '/project-management/projects',
  },
  ADD_PROJECT: {
    TITLE: 'Add Project',
    HREF: '/project-management/projects/add',
  },
  EDIT_PROJECT: {
    TITLE: 'Edit Project',
    HREF: '/project-management/projects/edit/:id',
  },
  SYSTEM_TREND_CHART: {
    TITLE: 'System Trend Chart',
    HREF: '/project-management/projects/edit/:id/system-trend-chart',
  },
  PROJECT_HISTORY: {
    TITLE: 'Project History',
    HREF: '/project-management/projects/edit/:id/history',
  },
  PROJECT_PHASES: {
    TITLE: 'Project Phases',
    HREF: '/project-management/projects/edit/:id/phases',
  },
  PROJECT_GANTT: {
    TITLE: 'Project Gantt Sample',
    HREF: '/project-management/projects/gantt-sample',
  },
  SYSTEMS: {
    TITLE: 'Systems',
    HREF: '/project-management/systems',
  },
  ADD_SYSTEM: {
    TITLE: 'Add System',
    HREF: '/project-management/system/add',
  },
  EDIT_SYSTEM: {
    TITLE: 'Edit System',
    HREF: '/project-management/system/edit/:id',
  },
  SYSTEM_HISTORY: {
    TITLE: 'System History',
    HREF: '/project-management/systems/edit/:id/history',
  },
  DELIVERABLE_TREND_CHART: {
    TITLE: 'Deliverable Trend Chart',
    HREF: '/project-management/systems/edit/:id/deliverable-trend-chart',
  },
  REPORTS: {
    TITLE: 'Reports',
    HREF: '/project-management/reports',
  },
  SOWS: {
    TITLE: 'SOW Tracker',
    HREF: '/sows',
  },
  ADD_SOW: {
    TITLE: 'Add SOW',
    HREF: '/sows/add',
  },
  WORKFLOW_TEMPLATES: {
    TITLE: 'Workflow Templates',
    HREF: '/workflow-templates',
  },
  ADD_WORKFLOW_TEMPLATE: {
    TITLE: 'Add Workflow Template',
    HREF: '/workflow-template/add',
  },
  EDIT_WORKFLOW_TEMPLATE: {
    TITLE: 'Edit Workflow Template',
    HREF: '/workflow-template/edit/:id',
  },
  WORKFLOW_TEMPLATE_HISTORY: {
    TITLE: 'Workflow Template History',
    HREF: '/workflow-template/edit/:id/history',
  },
  WORKFLOW_TEMPLATE_CHART: {
    TITLE: 'Workflow Template Chart',
    HREF: '/workflow-template/edit/:id/chart',
  },
  USER_MANAGEMENT: {
    TITLE: 'User Management',
    HREF: '/user-management',
    ROLES: [PERMISSION_TYPE.ADMIN],
  },
  USERS: {
    TITLE: 'Users',
    HREF: '/user-management/users',
    ROLES: [PERMISSION_TYPE.ADMIN],
  },
  ADD_USER: {
    TITLE: 'New User',
    HREF: '/user-management/users/add',
    ROLES: [PERMISSION_TYPE.ADMIN],
  },
  EDIT_USER: {
    TITLE: 'New User',
    HREF: '/user-management/users/edit/:id',
  },
  USER_HISTORY: {
    TITLE: 'User History',
    HREF: '/user-management/users/:id/history',
  },
  ORGANIZATIONS: {
    TITLE: 'Organizations',
    HREF: '/user-management/organizations',
  },
  ADD_ORGANIZATION: {
    TITLE: 'Add Organization',
    HREF: '/user-management/organizations/add',
  },
  EDIT_ORGANIZATION: {
    TITLE: 'Edit Organization',
    HREF: '/user-management/organizations/edit/:id',
  },
  ORGANIZATION_HISTORY: {
    TITLE: 'Organization History',
    HREF: '/user-management/organizations/:id/history',
  },
  AUDIT_TRAIL_LOGS: {
    TITLE: 'Audit Trail Logs',
    HREF: '/user-management/audit-trail-logs',
  },
  AUDIT_TRAIL_LOG_DETAIL: {
    TITLE: 'View Audit Trail Log',
    HREF: '/user-management/audit-trail-logs/detail/:id',
  },
  AUDIT_TRAIL_LOG_HISTORY: {
    TITLE: 'Audit Trail Log History',
    HREF: '/user-management/audit-trail-logs/:id/history',
  },
  RECENT_ACTIONS: {
    TITLE: 'Recent Actions',
    HREF: '/recent-actions',
  },
});

export default LINKS;
