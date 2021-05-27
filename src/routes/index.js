import React, { memo, Suspense } from 'react';
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom';

import Loader from 'components/Loader';
import DashboardLayout from 'layouts/Dashboard';
import AuthLayout from 'layouts/Auth';
import Page404 from 'pages/auth/Page404';
import AuthGuard from 'utils/hocs/AuthGuard';
import GuestGuard from 'utils/hocs/GuestGuard';
import { dashboardLayoutRoutes, authLayoutRoutes } from 'utils/constants/routes';
import LINKS from 'utils/constants/links';

const childRoutes = (Layout, routes, isAuthGuard) =>
  routes.map(({ component: Component, children, path }, index) => {
    const Guard = isAuthGuard ? AuthGuard : GuestGuard;

    const output = [];

    if (Component) {
      output.push(
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
      );
    }

    if (children) {
      children.forEach((element, index) =>
        output.push(
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
        )
      );
    }

    return output;
  });

const Routes = () => (
  <Suspense fallback={<Loader />}>
    <Router>
      <Switch>
        {childRoutes(DashboardLayout, dashboardLayoutRoutes, true)}
        {childRoutes(AuthLayout, authLayoutRoutes, false)}
        <Redirect to={LINKS.OVERVIEW.HREF} />
        <Route
          render={() => (
            <AuthLayout>
              <Page404 />
            </AuthLayout>
          )}
        />
      </Switch>
    </Router>
  </Suspense>
);

export default memo(Routes);
