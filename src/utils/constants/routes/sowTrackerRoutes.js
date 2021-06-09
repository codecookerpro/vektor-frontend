import { lazy } from 'react';
import { FileText } from 'react-feather';
import LINKS from 'utils/constants/links';

const SowList = lazy(() => import(/* webpackChunkName: 'SowList' */ 'pages/Sows/SowList'));
const SowEdit = lazy(() => import(/* webpackChunkName: 'SowEdit' */ 'pages/Sows/SowEdit'));
const SowAdd = lazy(() => import(/* webpackChunkName: 'SowAdd' */ 'pages/Sows/SowAdd'));

const sowTrackerRoutes = Object.freeze({
  id: LINKS.SOWS.TITLE,
  path: LINKS.SOWS.HREF,
  icon: <FileText />,
  component: SowList,
  children: [
    {
      path: LINKS.EDIT_SOW.HREF,
      name: LINKS.EDIT_SOW.TITLE,
      component: SowEdit,
      // isNotSlide: true,
    },
    {
      path: LINKS.ADD_SOW.HREF,
      name: LINKS.ADD_SOW.TITLE,
      component: SowAdd,
      // isNotSlide: true,
    },
  ],
});

export default sowTrackerRoutes;
