import { lazy } from 'react';
import { User } from 'react-feather';

const UserList = lazy(() => import(/* webpackChunkName: 'UserList' */ 'pages/Users/UserList'));
const OrganizationList = lazy(() => import(/* webpackChunkName: 'OrganizationList' */ 'pages/Organizations/OrganizationList'));
const GroupList = lazy(() => import(/* webpackChunkName: 'GroupList' */ 'pages/Groups/GroupList'));
const AuditTrailLogList = lazy(() => import(/* webpackChunkName: 'AuditTrailLogList' */ 'pages/AuditTrailLogs/AuditTrailLogList'));
import LINKS from 'utils/constants/links';

const userManagementRoutes =  Object.freeze({
  id: LINKS.USER_MANAGEMENT.TITLE,
  path: LINKS.USER_MANAGEMENT.HREF,
  icon: <User />,
  containsHome: true,
  children: [
    {
      path: LINKS.USERS.HREF,
      name: LINKS.USERS.TITLE,
      component: UserList,
    },
    {
      path: LINKS.ORGANIZATIONS.HREF,
      name: LINKS.ORGANIZATIONS.TITLE,
      component: OrganizationList,
    },
    {
      path: LINKS.GROUPS.HREF,
      name: LINKS.GROUPS.TITLE,
      component: GroupList,
    },
    {
      path: LINKS.AUDIT_TRAIL_LOGS.HREF,
      name: LINKS.AUDIT_TRAIL_LOGS.TITLE,
      component: AuditTrailLogList,
    },
  ],
  component: null,
});

export default userManagementRoutes;