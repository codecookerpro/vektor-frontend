import { lazy } from 'react';
import { Heart } from 'react-feather';

const FeatherIcons = lazy(() => import(/* webpackChunkName: 'MaterialIcons' */ 'pages/icons/FeatherIcons'));

const iconsRoutes = Object.freeze({
  id: '[DEV] Icons',
  path: '/icons',
  icon: <Heart />,
  component: null,
  children: [
    {
      path: '/icons/feather-icons',
      name: 'Feather Icons',
      component: FeatherIcons,
    },
  ],
});

export default iconsRoutes;
