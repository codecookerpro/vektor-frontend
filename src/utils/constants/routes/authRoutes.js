import { lazy } from 'react';
import { Users } from 'react-feather';

const SignIn = lazy(() => import(/* webpackChunkName: 'SignIn' */ 'pages/auth/SignIn'));
const SignUp = lazy(() => import(/* webpackChunkName: 'SignUp' */ 'pages/auth/SignUp'));
const ResetPassword = lazy(() => import(/* webpackChunkName: 'ResetPassword' */ 'pages/auth/ResetPassword'));
const Page404 = lazy(() => import(/* webpackChunkName: 'Page404' */ 'pages/auth/Page404'));
const Page500 = lazy(() => import(/* webpackChunkName: 'Page500' */ 'pages/auth/Page500'));

const authRoutes = Object.freeze({
  id: 'Auth',
  path: '/auth',
  icon: <Users />,
  children: [
    {
      path: '/auth/sign-in',
      name: 'Sign In',
      component: SignIn,
    },
    {
      path: '/auth/sign-up',
      name: 'Sign Up',
      component: SignUp,
    },
    {
      path: '/auth/reset-password',
      name: 'Reset Password',
      component: ResetPassword,
    },
    {
      path: '/auth/404',
      name: '404 Page',
      component: Page404,
    },
    {
      path: '/auth/500',
      name: '500 Page',
      component: Page500,
    },
  ],
  component: null,
});

export default authRoutes;