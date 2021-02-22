import authRoutes from './authRoutes';
import calendarRoutes from './calendarRoutes';
import componentsRoutes from './componentsRoutes';
import dashboardsRoutes from './dashboardsRoutes';
import formsRoutes from './formsRoutes';
import iconsRoutes from './iconsRoutes';
import invoiceRoutes from './invoiceRoutes';
import orderRoutes from './orderRoutes';
import pagesRoutes from './pagesRoutes';
import projectsRoutes from './projectsRoutes';
import tablesRoutes from './tablesRoutes';
import tasksRoutes from './tasksRoutes';
import chartRoutes from './chartRoutes';
import mapsRoutes from './mapsRoutes';

export const dashboardLayoutRoutes = [
  dashboardsRoutes,
  pagesRoutes,
  projectsRoutes,
  orderRoutes,
  invoiceRoutes,
  tasksRoutes,
  calendarRoutes,
  componentsRoutes,
  chartRoutes,
  formsRoutes,
  tablesRoutes,
  iconsRoutes,
  mapsRoutes,
];

export const authLayoutRoutes = [authRoutes];

export const sidebarRoutes = [
  dashboardsRoutes,
  pagesRoutes,
  projectsRoutes,
  orderRoutes,
  invoiceRoutes,
  tasksRoutes,
  calendarRoutes,
  authRoutes,
  componentsRoutes,
  chartRoutes,
  formsRoutes,
  tablesRoutes,
  iconsRoutes,
  mapsRoutes,
];
