import { lazy } from 'react';
import { FileText } from 'react-feather';
import LINKS from 'utils/constants/links';

const SowList = lazy(() => import(/* webpackChunkName: 'SowList' */ 'pages/Sows/SowList'));

const sowTrackerRoutes = Object.freeze({
  id: LINKS.SOWS.TITLE,
  path: LINKS.SOWS.HREF,
  icon: <FileText />,
  component: SowList,
  children: null,
});

export default sowTrackerRoutes;
