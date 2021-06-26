import authRoutes from './authRoutes';
import overviewRoutes from './overviewRoutes';
import projectManagementRoutes from './projectManagementRoutes';
import sowTrackerRoutes from './sowTrackerRoutes';
import workflowTemplateRoutes from './workflowTemplateRoutes';
import userManagementRoutes from './userManagementRoutes';
import recentActionRoutes from './recentActionRoutes';
import profileEditRoute from './profileEditRoute';

export const dashboardLayoutRoutes = [
  overviewRoutes,
  projectManagementRoutes,
  sowTrackerRoutes,
  workflowTemplateRoutes,
  userManagementRoutes,
  recentActionRoutes,
  profileEditRoute,
];

export const authLayoutRoutes = [authRoutes];

export const sidebarRoutes = [
  overviewRoutes,
  projectManagementRoutes,
  sowTrackerRoutes,
  workflowTemplateRoutes,
  userManagementRoutes,
  recentActionRoutes,
];
