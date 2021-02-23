import { lazy } from 'react';
import { CheckSquare } from 'react-feather';

const Tasks = lazy(() => import(/* webpackChunkName: 'Tasks' */ 'pages/pages/Tasks'));

const tasksRoutes = {
  id: 'Tasks',
  path: '/tasks',
  icon: <CheckSquare />,
  badge: '17',
  component: Tasks,
  children: null,
};

export default tasksRoutes;

