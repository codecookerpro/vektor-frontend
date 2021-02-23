import { lazy } from 'react';
import { Clock } from 'react-feather';

const Chartjs = lazy(() => import(/* webpackChunkName: 'Page500' */ 'pages/charts/Chartjs'));

const recentActionRoutes = Object.freeze({
  id: 'SOW Tracker',
  path: '/charts',
  icon: <Clock />,
  component: Chartjs,
  children: null,
});

export default recentActionRoutes;
