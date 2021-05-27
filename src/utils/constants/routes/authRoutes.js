import { lazy } from 'react';
import { Users } from 'react-feather';
import LINKS from 'utils/constants/links';

const SignIn = lazy(() => import(/* webpackChunkName: 'SignIn' */ 'pages/auth/SignIn'));
const ResetPassword = lazy(() => import(/* webpackChunkName: 'ResetPassword' */ 'pages/auth/ResetPassword'));
const ForgotPassword = lazy(() => import(/* webpackChunkName: 'ResetPassword' */ 'pages/auth/ForgotPassword'));
const Page404 = lazy(() => import(/* webpackChunkName: 'Page404' */ 'pages/auth/Page404'));
const Page500 = lazy(() => import(/* webpackChunkName: 'Page500' */ 'pages/auth/Page500'));

const authRoutes = Object.freeze({
  id: LINKS.AUTH.TITLE,
  path: LINKS.AUTH.HREF,
  icon: <Users />,
  component: null,
  children: [
    {
      path: LINKS.SIGN_IN.HREF,
      name: LINKS.SIGN_IN.TITLE,
      component: SignIn,
    },
    {
      path: LINKS.RESET_PASSWORD.HREF,
      name: LINKS.RESET_PASSWORD.TITLE,
      component: ResetPassword,
    },
    {
      path: LINKS.FORGOT_PASSWORD.HREF,
      name: LINKS.FORGOT_PASSWORD.TITLE,
      component: ForgotPassword,
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
});

export default authRoutes;
