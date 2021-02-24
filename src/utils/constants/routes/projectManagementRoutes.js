import { lazy } from 'react';
import { Sliders } from 'react-feather';

const Dashboard = lazy(() => import(/* webpackChunkName: 'Dashboard' */ 'pages/Dashboard'));
const ProjectList = lazy(() => import(/* webpackChunkName: 'ProjectList' */ 'pages/Projects/ProjectList'));
const SystemList = lazy(() => import(/* webpackChunkName: 'SystemList' */ 'pages/Systems/SystemList'));
const ReportList = lazy(() => import(/* webpackChunkName: 'ReportList' */ 'pages/Reports/ReportList'));
import LINKS from 'utils/constants/links';

const projectManagementRoutes = Object.freeze({
  id: LINKS.PROJECT_MANAGEMENT.TITLE,
  path: LINKS.PROJECT_MANAGEMENT.HREF,
  icon: <Sliders />,
  containsHome: true,
  children: [
    {
      path: LINKS.DASHBOARD.HREF,
      name: LINKS.DASHBOARD.TITLE,
      component: Dashboard,
    },
    {
      path: LINKS.PROJECTS.HREF,
      name: LINKS.PROJECTS.TITLE,
      component: ProjectList,
    },
    {
      path: LINKS.SYSTEMS.HREF,
      name: LINKS.SYSTEMS.TITLE,
      component: SystemList,
    },
    {
      path: LINKS.REPORTS.HREF,
      name: LINKS.REPORTS.TITLE,
      component: ReportList,
    },
  ],
  component: null,
});

export default projectManagementRoutes;