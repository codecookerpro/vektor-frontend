import { lazy } from 'react';
import { Clock } from 'react-feather';

const RecentActions = lazy(() => import(/* webpackChunkName: 'RecentActions' */ 'pages/RecentActions'));
import LINKS from 'utils/constants/links';

const recentActionRoutes = Object.freeze({
  id: LINKS.RECENT_ACTIONS.TITLE,
  path: LINKS.RECENT_ACTIONS.HREF,
  icon: <Clock />,
  component: RecentActions,
  children: null,
});

export default recentActionRoutes;
