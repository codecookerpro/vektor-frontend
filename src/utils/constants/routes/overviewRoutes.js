import { lazy } from 'react';
import { Home } from 'react-feather';

const Overview = lazy(() => import(/* webpackChunkName: 'Overview' */ 'pages/Overview'));
import LINKS from 'utils/constants/links';

const overviewRoutes = Object.freeze({
  id: 'Overview',
  path: LINKS.HOME.HREF,
  header: 'Navigation',
  icon: <Home />,
  containsHome: true,
  component: Overview,
  children: null,
});

export default overviewRoutes;