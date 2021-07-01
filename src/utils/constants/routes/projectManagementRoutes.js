import { lazy } from 'react';
import { Sliders } from 'react-feather';
import LINKS from 'utils/constants/links';

const Dashboard = lazy(() => import(/* webpackChunkName: 'Dashboard' */ 'pages/Dashboard'));
const ProjectList = lazy(() => import(/* webpackChunkName: 'ProjectList' */ 'pages/Projects/ProjectList'));
const AddProject = lazy(() => import(/* webpackChunkName: 'AddProject' */ 'pages/Projects/AddProject'));
const EditProject = lazy(() => import(/* webpackChunkName: 'EditProject' */ 'pages/Projects/EditProject'));
const ProjectHistory = lazy(() => import(/* webpackChunkName: 'ProjectHistory' */ 'pages/Projects/ProjectHistory'));
const ProjectPhases = lazy(() => import(/* webpackChunkName: 'ProjectPhases' */ 'pages/Projects/ProjectPhases'));
const AddMetaSystem = lazy(() => import(/* webpackChunkName: 'AddMetaSystem' */ 'pages/MetaSystems/AddMetaSystem'));
const EditMetaSystem = lazy(() => import(/* webpackChunkName: 'EditMetaSystem' */ 'pages/MetaSystems/EditMetaSystem'));
const ReportList = lazy(() => import(/* webpackChunkName: 'ReportList' */ 'pages/Reports'));

const projectManagementRoutes = Object.freeze({
  id: LINKS.PROJECT_MANAGEMENT.TITLE,
  path: LINKS.PROJECT_MANAGEMENT.HREF,
  icon: <Sliders />,
  containsHome: true,
  component: null,
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
      path: LINKS.PROJECT_HISTORY.HREF,
      name: LINKS.PROJECT_HISTORY.TITLE,
      component: ProjectHistory,
      isNotSlide: true,
    },
    {
      path: LINKS.PROJECT_PHASES.HREF,
      name: LINKS.PROJECT_PHASES.TITLE,
      component: ProjectPhases,
      isNotSlide: true,
    },
    {
      path: LINKS.ADD_META_SYSTEM.HREF,
      name: LINKS.ADD_META_SYSTEM.TITLE,
      component: AddMetaSystem,
      isNotSlide: true,
    },
    {
      path: LINKS.EDIT_META_SYSTEM.HREF,
      name: LINKS.EDIT_META_SYSTEM.TITLE,
      component: EditMetaSystem,
      isNotSlide: true,
    },
    {
      path: LINKS.REPORTS.HREF,
      name: LINKS.REPORTS.TITLE,
      component: ReportList,
    },
  ],
});

export default projectManagementRoutes;
