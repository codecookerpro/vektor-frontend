import { lazy } from 'react';
import { ShoppingCart } from 'react-feather';

const Orders = lazy(() => import(/* webpackChunkName: 'Orders' */ 'pages/pages/Orders'));

const orderRoutes = Object.freeze({
  id: 'Orders',
  path: '/orders',
  icon: <ShoppingCart />,
  component: Orders,
  children: null,
});

export default orderRoutes;
