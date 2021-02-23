import { lazy } from 'react';
import { Grid } from 'react-feather';

const Alerts = lazy(() => import(/* webpackChunkName: 'Alerts' */ 'pages/components/Alerts'));
const Avatars = lazy(() => import(/* webpackChunkName: 'Avatars' */ 'pages/components/Avatars'));
const Badges = lazy(() => import(/* webpackChunkName: 'Badges' */ 'pages/components/Badges'));
const Buttons = lazy(() => import(/* webpackChunkName: 'Buttons' */ 'pages/components/Buttons'));
const Cards = lazy(() => import(/* webpackChunkName: 'Cards' */ 'pages/components/Cards'));
const Chips = lazy(() => import(/* webpackChunkName: 'Chips' */ 'pages/components/Chips'));
const Dialogs = lazy(() => import(/* webpackChunkName: 'Dialogs' */ 'pages/components/Dialogs'));
const ExpPanels = lazy(() => import(/* webpackChunkName: 'ExpPanels' */ 'pages/components/ExpansionPanels'));
const Lists = lazy(() => import(/* webpackChunkName: 'Lists' */ 'pages/components/Lists'));
const Menus = lazy(() => import(/* webpackChunkName: 'Menus' */ 'pages/components/Menus'));
const Pagination = lazy(() => import(/* webpackChunkName: 'Pagination' */ 'pages/components/Pagination'));
const Progress = lazy(() => import(/* webpackChunkName: 'Progress' */ 'pages/components/Progress'));
const Snackbars = lazy(() => import(/* webpackChunkName: 'Snackbars' */ 'pages/components/Snackbars'));
const Tooltips = lazy(() => import(/* webpackChunkName: 'Page500' */ 'pages/components/Tooltips'));

const componentsRoutes = Object.freeze({
  id: 'Components',
  path: '/components',
  header: 'Elements',
  icon: <Grid />,
  children: [
    {
      path: '/components/alerts',
      name: 'Alerts',
      component: Alerts,
    },
    {
      path: '/components/avatars',
      name: 'Avatars',
      component: Avatars,
    },
    {
      path: '/components/badges',
      name: 'Badges',
      component: Badges,
    },
    {
      path: '/components/buttons',
      name: 'Buttons',
      component: Buttons,
    },
    {
      path: '/components/cards',
      name: 'Cards',
      component: Cards,
    },
    {
      path: '/components/chips',
      name: 'Chips',
      component: Chips,
    },
    {
      path: '/components/dialogs',
      name: 'Dialogs',
      component: Dialogs,
    },
    {
      path: '/components/expansion-panels',
      name: 'Expansion Panels',
      component: ExpPanels,
    },
    {
      path: '/components/lists',
      name: 'Lists',
      component: Lists,
    },
    {
      path: '/components/menus',
      name: 'Menus',
      component: Menus,
    },
    {
      path: '/components/pagination',
      name: 'Pagination',
      component: Pagination,
    },
    {
      path: '/components/progress',
      name: 'Progress',
      component: Progress,
    },
    {
      path: '/components/snackbars',
      name: 'Snackbars',
      component: Snackbars,
    },
    {
      path: '/components/tooltips',
      name: 'Tooltips',
      component: Tooltips,
    },
  ],
  component: null,
});

export default componentsRoutes;
