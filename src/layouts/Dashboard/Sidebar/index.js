import React, { useState, memo } from 'react';
import styled from 'styled-components/macro';
import { NavLink, withRouter } from 'react-router-dom';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { Collapse, Drawer as MuiDrawer, List as MuiList, Typography } from '@material-ui/core';

import SidebarHeader from './SidebarHeader';
import SidebarLink from './SidebarLink';
import SidebarCategory from './SidebarCategory';
import SidebarFooter from './SidebarFooter';
import { sidebarRoutes as routes } from 'utils/constants/routes';
import 'vendor/perfect-scrollbar.css';

const Drawer = styled(MuiDrawer)`
  border-right: 0;

  > div {
    border-right: 0;
  }
`;

const Scrollbar = styled(PerfectScrollbar)`
  background-color: ${(props) => props.theme.sidebar.background};
  border-right: 1px solid rgba(0, 0, 0, 0.12);
`;

const List = styled(MuiList)`
  background-color: ${(props) => props.theme.sidebar.background};
`;

const Items = styled.div`
  padding-top: ${(props) => props.theme.spacing(2.5)}px;
  padding-bottom: ${(props) => props.theme.spacing(2.5)}px;
`;

const SidebarSection = styled(Typography)`
  color: ${(props) => props.theme.sidebar.color};
  padding: ${(props) => props.theme.spacing(4)}px ${(props) => props.theme.spacing(7)}px ${(props) => props.theme.spacing(1)}px;
  opacity: 0.9;
  display: block;
`;

const Sidebar = ({ location, PaperProps = {} }) => {
  const initOpenRoutes = () => {
    /* Open collapse element that matches current url */
    const pathName = location.pathname;

    let _routes = {};

    routes.forEach((route, index) => {
      const isActive = pathName.indexOf(route.path) === 0;
      const isOpen = route.open;
      const isHome = route.containsHome && pathName === '/';

      _routes = Object.assign({}, _routes, {
        [index]: isActive || isOpen || isHome,
      });
    });

    return _routes;
  };

  const [openRoutes, setOpenRoutes] = useState(() => initOpenRoutes());

  const toggle = (index) => {
    // Collapse all elements
    Object.keys(openRoutes).forEach((item) => openRoutes[index] || setOpenRoutes((openRoutes) => Object.assign({}, openRoutes, { [item]: false })));

    // Toggle selected element
    setOpenRoutes((openRoutes) => Object.assign({}, openRoutes, { [index]: !openRoutes[index] }));
  };

  return (
    <Drawer variant="permanent" PaperProps={PaperProps}>
      <SidebarHeader />
      <Scrollbar>
        <List disablePadding>
          <Items>
            {routes.map((category, index) => (
              <React.Fragment key={index}>
                {category.header && <SidebarSection>{category.header}</SidebarSection>}

                {category.component ? (
                  <SidebarCategory
                    isCollapsable={false}
                    name={category.id}
                    to={category.path}
                    activeClassName="active"
                    component={NavLink}
                    icon={category.icon}
                    exact
                    button
                    badge={category.badge}
                  />
                ) : (
                  <React.Fragment key={index}>
                    <SidebarCategory
                      isOpen={!openRoutes[index]}
                      isCollapsable={true}
                      name={category.id}
                      icon={category.icon}
                      button={true}
                      onClick={() => toggle(index)}
                    />

                    <Collapse in={openRoutes[index]} timeout="auto" unmountOnExit>
                      {category.children.map(
                        (route, index) =>
                          !route?.isNotSlide && <SidebarLink key={index} name={route.name} to={route.path} icon={route.icon} badge={route.badge} />
                      )}
                    </Collapse>
                  </React.Fragment>
                )}
              </React.Fragment>
            ))}
          </Items>
        </List>
      </Scrollbar>
      <SidebarFooter />
    </Drawer>
  );
};

export default memo(withRouter(Sidebar));
