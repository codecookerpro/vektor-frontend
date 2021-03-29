import { lazy } from 'react';
import { Heart } from 'react-feather';

const FeatherIcons = lazy(() => import(/* webpackChunkName: 'MaterialIcons' */ 'pages/icons/FeatherIcons'));

const iconsRoutes = Object.freeze({
  id: 'Icons',
  path: '/icons',
  icon: <Heart />,
  children: [
    {
      path: '/icons/feather-icons',
      name: 'Feather Icons',
      component: FeatherIcons,
    },
  ],
  component: null,
});

export default iconsRoutes;