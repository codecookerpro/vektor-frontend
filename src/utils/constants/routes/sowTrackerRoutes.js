import { lazy } from 'react';
import { FileText } from 'react-feather';

const Chartjs = lazy(() => import(/* webpackChunkName: 'Page500' */ 'pages/charts/Chartjs'));

const sowTrackerRoutes = Object.freeze({
  id: 'SOW Tracker',
  path: '/charts',
  icon: <FileText />,
  component: Chartjs,
  children: null,
});

export default sowTrackerRoutes;
