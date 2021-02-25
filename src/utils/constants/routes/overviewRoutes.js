import { lazy } from 'react';
import { Home } from 'react-feather';

const Overview = lazy(() => import(/* webpackChunkName: 'Overview' */ 'pages/Overview'));
import LINKS from 'utils/constants/links';

const overviewRoutes = Object.freeze({
  id: LINKS.OVERVIEW.TITLE,
  path: LINKS.OVERVIEW.HREF,
  header: 'Navigation',
  icon: <Home />,
  containsHome: true,
  component: Overview,
  children: null,
});

export default overviewRoutes;