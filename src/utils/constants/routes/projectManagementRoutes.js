import { lazy } from 'react';
import { Sliders } from 'react-feather';
import LINKS from 'utils/constants/links';

const DashboardList = lazy(() => import(/* webpackChunkName: 'DashboardList' */ 'pages/Dashboard/DashboardList'));
const DashboardDetail = lazy(() => import(/* webpackChunkName: 'DashboardDetail' */ 'pages/Dashboard/DashboardDetail'));
const ProjectList = lazy(() => import(/* webpackChunkName: 'ProjectList' */ 'pages/Projects/ProjectList'));
const AddProject = lazy(() => import(/* webpackChunkName: 'AddProject' */ 'pages/Projects/AddProject'));
const EditProject = lazy(() => import(/* webpackChunkName: 'EditProject' */ 'pages/Projects/EditProject'));
const TrendChart = lazy(() => import(/* webpackChunkName: 'TrendChart' */ 'pages/Projects/TrendChart'));
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
      path: LINKS.SYSTEM_TREND_CHART.HREF,
      name: LINKS.SYSTEM_TREND_CHART.TITLE,
      component: TrendChart,
      isNotSlide: true,
    },
    {
      path: LINKS.DELIVERABLE_TREND_CHART.HREF,
      name: LINKS.DELIVERABLE_TREND_CHART.TITLE,
      component: TrendChart,
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
