import { lazy } from 'react';
import { Activity } from 'react-feather';

const Default = lazy(() => import(/* webpackChunkName: 'Default' */ 'pages/dashboards/Default'));
const Analytics = lazy(() => import(/* webpackChunkName: 'Analytics' */ 'pages/dashboards/Analytics'));
const SaaS = lazy(() => import(/* webpackChunkName: 'SaaS' */ 'pages/dashboards/SaaS'));

const projectTemplateRoutes = Object.freeze({
  id: 'Project Template',
  path: '/dashboard',
  icon: <Activity />,
  containsHome: true,
  children: [
    {
      path: '/dashboard/default',
      name: 'Default',
      component: Default,
    },
    {
      path: '/dashboard/analytics',
      name: 'Analytics',
      component: Analytics,
    },
    {
      path: '/dashboard/saas',
      name: 'SaaS',
      component: SaaS,
    },
  ],
  component: null,
});

export default projectTemplateRoutes;