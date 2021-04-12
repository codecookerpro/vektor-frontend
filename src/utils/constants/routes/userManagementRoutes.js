import { lazy } from 'react';
import { User } from 'react-feather';

const UserList = lazy(() => import(/* webpackChunkName: 'UserList' */ 'pages/Users/UserList'));
const AddUser = lazy(() => import(/* webpackChunkName: 'AddUser' */ 'pages/Users/AddUser'));
const EditUser = lazy(() => import(/* webpackChunkName: 'EditUser' */ 'pages/Users/EditUser'));
const UserHistory = lazy(() => import(/* webpackChunkName: 'WorkflowTemplateHistory' */ 'pages/Users/UserHistory'));
const OrganizationList = lazy(() => import(/* webpackChunkName: 'OrganizationList' */ 'pages/Organizations/OrganizationList'));
const AddOrganization = lazy(() => import(/* webpackChunkName: 'AddOrganization' */ 'pages/Organizations/AddOrganization'));
const EditOrganization = lazy(() => import(/* webpackChunkName: 'EditWorkflowTemplate' */ 'pages/Organizations/EditOrganization'));
const OrganizationHistory = lazy(() => import(/* webpackChunkName: 'WorkflowTemplateHistory' */ 'pages/Organizations/OrganizationHistory'));
const AuditTrailLogList = lazy(() => import(/* webpackChunkName: 'AuditTrailLogList' */ 'pages/AuditTrailLogs/AuditTrailLogList'));
const AuditTrailLogDetail = lazy(() => import(/* webpackChunkName: 'AuditTrailLogDetail' */ 'pages/AuditTrailLogs/AuditTrailLogDetail'));
const AuditTrailLogHistory = lazy(() => import(/* webpackChunkName: 'AuditTrailLogHistory' */ 'pages/AuditTrailLogs/AuditTrailLogHistory'));
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
      path: LINKS.ADD_USER.HREF,
      name: LINKS.ADD_USER.TITLE,
      component: AddUser,
      isNotSlide: true,
    },
    {
      path: LINKS.EDIT_USER.HREF,
      name: LINKS.EDIT_USER.TITLE,
      component: EditUser,
      isNotSlide: true,
    },
    {
      path: LINKS.USER_HISTORY.HREF,
      name: LINKS.USER_HISTORY.TITLE,
      component: UserHistory,
      isNotSlide: true,
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
      path: LINKS.AUDIT_TRAIL_LOGS.HREF,
      name: LINKS.AUDIT_TRAIL_LOGS.TITLE,
      component: AuditTrailLogList,
    },
    {
      path: LINKS.AUDIT_TRAIL_LOG_DETAIL.HREF,
      name: LINKS.AUDIT_TRAIL_LOG_DETAIL.TITLE,
      component: AuditTrailLogDetail,
      isNotSlide: true,
    },
    {
      path: LINKS.AUDIT_TRAIL_LOG_HISTORY.HREF,
      name: LINKS.AUDIT_TRAIL_LOG_HISTORY.TITLE,
      component: AuditTrailLogHistory,
      isNotSlide: true,
    },
  ],
  component: null,
});

export default userManagementRoutes;