import { lazy } from 'react';
import { Briefcase } from 'react-feather';

const Projects = lazy(() => import(/* webpackChunkName: 'Projects' */ 'pages/pages/Projects'));

const projectsRoutes = Object.freeze({
  id: 'Projects',
  path: '/projects',
  icon: <Briefcase />,
  badge: '8',
  component: Projects,
  children: null,
});

export default projectsRoutes;
