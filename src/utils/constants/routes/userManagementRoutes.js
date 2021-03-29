import { lazy } from 'react';
import { User } from 'react-feather';

const UserList = lazy(() => import(/* webpackChunkName: 'UserList' */ 'pages/Users/UserList'));
const OrganizationList = lazy(() => import(/* webpackChunkName: 'OrganizationList' */ 'pages/Organizations/OrganizationList'));
const AddOrganization = lazy(() => import(/* webpackChunkName: 'AddOrganization' */ 'pages/Organizations/AddOrganization'));
const EditOrganization = lazy(() => import(/* webpackChunkName: 'EditWorkflowTemplate' */ 'pages/Organizations/EditOrganization'));
const OrganizationHistory = lazy(() => import(/* webpackChunkName: 'WorkflowTemplateHistory' */ 'pages/Organizations/OrganizationHistory'));
const GroupList = lazy(() => import(/* webpackChunkName: 'GroupList' */ 'pages/Groups/GroupList'));
const AuditTrailLogList = lazy(() => import(/* webpackChunkName: 'AuditTrailLogList' */ 'pages/AuditTrailLogs/AuditTrailLogList'));
import LINKS from 'utils/constants/links';

const userManagementRoutes = Object.freeze({
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
      path: LINKS.ADD_ORGANIZATION.HREF,
      name: LINKS.ADD_ORGANIZATION.TITLE,
      component: AddOrganization,
      isNotSlide: true,
    },
    {
      path: LINKS.EDIT_ORGANIZATION.HREF,
      name: LINKS.EDIT_ORGANIZATION.TITLE,
      component: EditOrganization,
      isNotSlide: true,
    },
    {
      path: LINKS.ORGANIZATION_HISTORY.HREF,
      name: LINKS.ORGANIZATION_HISTORY.TITLE,
      component: OrganizationHistory,
      isNotSlide: true,
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