import { lazy } from 'react';
import { FileText } from 'react-feather';

const SowList = lazy(() => import(/* webpackChunkName: 'SowList' */ 'pages/Sows/SowList'));
import LINKS from 'utils/constants/links';

const sowTrackerRoutes = Object.freeze({
  id: LINKS.SOWS.TITLE,
  path: LINKS.SOWS.HREF,
  icon: <FileText />,
  component: SowList,
  children: null,
});

export default sowTrackerRoutes;
