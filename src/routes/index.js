import authRoutes from 'routes/authRoutes';
import calendarRoutes from 'routes/calendarRoutes';
import componentsRoutes from 'routes/componentsRoutes';
import dashboardsRoutes from 'routes/dashboardsRoutes';
import formsRoutes from 'routes/formsRoutes';
import iconsRoutes from 'routes/iconsRoutes';
import invoiceRoutes from 'routes/invoiceRoutes';
import orderRoutes from 'routes/orderRoutes';
import pagesRoutes from 'routes/pagesRoutes';
import projectsRoutes from 'routes/projectsRoutes';
import tablesRoutes from 'routes/tablesRoutes';
import tasksRoutes from 'routes/tasksRoutes';
import chartRoutes from 'routes/chartRoutes';
import mapsRoutes from 'routes/mapsRoutes';
import documentationRoutes from 'routes/documentationRoutes';
import changelogRoutes from 'routes/changelogRoutes';
import protectedPageRoutes from 'routes/protectedPageRoutes';

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
  documentationRoutes,
  changelogRoutes,
];

export const authLayoutRoutes = [authRoutes];

export const protectedRoutes = [protectedPageRoutes];

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
  documentationRoutes,
  changelogRoutes,
];
