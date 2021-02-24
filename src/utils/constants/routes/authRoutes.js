import { lazy } from 'react';
import { Users } from 'react-feather';

const SignIn = lazy(() => import(/* webpackChunkName: 'SignIn' */ 'pages/auth/SignIn'));
const SignUp = lazy(() => import(/* webpackChunkName: 'SignUp' */ 'pages/auth/SignUp'));
const ResetPassword = lazy(() => import(/* webpackChunkName: 'ResetPassword' */ 'pages/auth/ResetPassword'));
const Page404 = lazy(() => import(/* webpackChunkName: 'Page404' */ 'pages/auth/Page404'));
const Page500 = lazy(() => import(/* webpackChunkName: 'Page500' */ 'pages/auth/Page500'));
import LINKS from 'utils/constants/links'

const authRoutes = Object.freeze({
  id: LINKS.AUTH.TITLE,
  path: LINKS.AUTH.HREF,
  icon: <Users />,
  children: [
    {
      path: LINKS.SIGN_IN.HREF,
      name: LINKS.SIGN_IN.TITLE,
      component: SignIn,
    },
    {
      path: LINKS.SIGN_UP.HREF,
      name: LINKS.SIGN_UP.TITLE,
      component: SignUp,
    },
    {
      path: LINKS.RESET_PASSWORD.HREF,
      name: LINKS.RESET_PASSWORD.TITLE,
      component: ResetPassword,
    },
    {
      path: LINKS.NOT_FOUND.HREF,
      name: LINKS.NOT_FOUND.TITLE,
      component: Page404,
    },
    {
      path: LINKS.ERROR_PAGE.HREF,
      name: LINKS.ERROR_PAGE.TITLE,
      component: Page500,
    },
  ],
  component: null,
});

export default authRoutes;