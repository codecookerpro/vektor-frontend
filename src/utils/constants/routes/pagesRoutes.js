import { lazy } from 'react';
import { Layout } from 'react-feather';

const Blank = lazy(() => import(/* webpackChunkName: 'Blank' */ 'pages/pages/Blank'));
const Pricing = lazy(() => import(/* webpackChunkName: 'Pricing' */ 'pages/pages/Pricing'));
const Profile = lazy(() => import(/* webpackChunkName: 'Profile' */ 'pages/pages/Profile'));
const Settings = lazy(() => import(/* webpackChunkName: 'Settings' */ 'pages/pages/Settings'));
const Chat = lazy(() => import(/* webpackChunkName: 'Chat' */ 'pages/pages/Chat'));

const pagesRoutes = Object.freeze({
  id: 'Pages',
  path: '/pages',
  icon: <Layout />,
  children: [
    {
      path: '/pages/profile',
      name: 'Profile',
      component: Profile,
    },
    {
      path: '/pages/settings',
      name: 'Settings',
      component: Settings,
    },
    {
      path: '/pages/pricing',
      name: 'Pricing',
      component: Pricing,
    },
    {
      path: '/pages/chat',
      name: 'Chat',
      component: Chat,
    },
    {
      path: '/pages/blank',
      name: 'Blank Page',
      component: Blank,
    },
  ],
  component: null,
});

export default pagesRoutes;