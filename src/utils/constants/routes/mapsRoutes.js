import { lazy } from 'react';
import { Map } from 'react-feather';

const GoogleMaps = lazy(() => import(/* webpackChunkName: 'GoogleMaps' */ 'pages/maps/GoogleMaps'));
const VectorMaps = lazy(() => import(/* webpackChunkName: 'VectorMaps' */ 'pages/maps/VectorMaps'));

const mapsRoutes = Object.freeze({
  id: 'Maps',
  path: '/maps',
  icon: <Map />,
  children: [
    {
      path: '/maps/google-maps',
      name: 'Google Maps',
      component: GoogleMaps,
    },
    {
      path: '/maps/vector-maps',
      name: 'Vector Maps',
      component: VectorMaps,
    },
  ],
  component: null,
});

export default mapsRoutes;
