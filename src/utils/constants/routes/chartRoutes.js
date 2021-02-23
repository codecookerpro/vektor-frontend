import { lazy } from 'react';
import { PieChart } from 'react-feather';

const Chartjs = lazy(() => import(/* webpackChunkName: 'Page500' */ 'pages/charts/Chartjs'));

const chartRoutes = Object.freeze({
  id: 'Charts',
  path: '/charts',
  icon: <PieChart />,
  component: Chartjs,
  children: null,
});

export default chartRoutes;
