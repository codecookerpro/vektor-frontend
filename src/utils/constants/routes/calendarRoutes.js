import { lazy } from 'react';
import { Calendar as CalendarIcon } from 'react-feather';

const Calendar = lazy(() => import(/* webpackChunkName: 'SignIn' */ 'pages/pages/Calendar'));

const calendarRoutes = Object.freeze({
  id: 'Calendar',
  path: '/calendar',
  icon: <CalendarIcon />,
  component: Calendar,
  children: null,
});

export default calendarRoutes;
