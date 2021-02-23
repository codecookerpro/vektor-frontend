import React, { memo } from 'react';
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom';

import DashboardLayout from 'layouts/Dashboard';
import AuthLayout from 'layouts/Auth';
import Page404 from 'pages/auth/Page404';
import AuthGuard from 'utils/hocs/AuthGuard';
import {
  dashboardLayoutRoutes,
  authLayoutRoutes
} from 'utils/constants/routes';

const childRoutes = (Layout, routes, isAuthGuard) =>
  routes.map(({ component: Component, children, path }, index) => {
    const Guard = isAuthGuard ? AuthGuard : React.Fragment;

    return children ? (
      children.map((element, index) => (
        <Route
          key={index}
          path={element.path}
          exact
          render={(props) => (
            <Guard>
              <Layout>
                <element.component {...props} />
              </Layout>
            </Guard>
          )}
        />
      ))
    ) : Component ? (
      <Route
        key={index}
        path={path}
        exact
        render={(props) => (
          <Guard>
            <Layout>
              <Component {...props} />
            </Layout>
          </Guard>
        )}
      />
    ) : null;
  });

const Routes = () => (
  <Router>
    <Switch>
      {childRoutes(DashboardLayout, dashboardLayoutRoutes, true)}
      {childRoutes(AuthLayout, authLayoutRoutes, false)}
      <Redirect to='/auth/sign-in' />
      <Route
        render={() => (
          <AuthLayout>
            <Page404 />
          </AuthLayout>
        )}
      />
    </Switch>
  </Router>
);

export default memo(Routes);
