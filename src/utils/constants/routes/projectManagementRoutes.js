import { lazy } from 'react';
import { Sliders } from 'react-feather';

const DashboardList = lazy(() => import(/* webpackChunkName: 'DashboardList' */ 'pages/Dashboard/DashboardList'));
const DashboardDetail = lazy(() => import(/* webpackChunkName: 'DashboardDetail' */ 'pages/Dashboard/DashboardDetail'));
const ProjectList = lazy(() => import(/* webpackChunkName: 'ProjectList' */ 'pages/Projects/ProjectList'));
const AddProject = lazy(() => import(/* webpackChunkName: 'AddProject' */ 'pages/Projects/AddProject'));
const EditProject = lazy(() => import(/* webpackChunkName: 'EditProject' */ 'pages/Projects/EditProject'));
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
      component: DashboardList,
    },
    {
      path: LINKS.DASHBOARD_DETAIL.HREF,
      name: LINKS.DASHBOARD_DETAIL.TITLE,
      component: DashboardDetail,
      isNotSlide: true,
    },
    {
      path: LINKS.PROJECTS.HREF,
      name: LINKS.PROJECTS.TITLE,
      component: ProjectList,
    },
    {
      path: LINKS.ADD_PROJECT.HREF,
      name: LINKS.ADD_PROJECT.TITLE,
      component: AddProject,
      isNotSlide: true,
    },
    {
      path: LINKS.EDIT_PROJECT.HREF,
      name: LINKS.EDIT_PROJECT.TITLE,
      component: EditProject,
      isNotSlide: true,
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