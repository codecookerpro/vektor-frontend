import { lazy } from 'react';
import { Clock } from 'react-feather';
import LINKS from 'utils/constants/links';

const RecentActions = lazy(() => import(/* webpackChunkName: 'RecentActions' */ 'pages/RecentActions'));

const recentActionRoutes = Object.freeze({
  id: LINKS.RECENT_ACTIONS.TITLE,
  path: LINKS.RECENT_ACTIONS.HREF,
  icon: <Clock />,
  component: RecentActions,
  children: null,
});

export default recentActionRoutes;
