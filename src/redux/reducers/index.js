import { combineReducers } from 'redux';

import loadingReducer from './loadingReducer';
import authReducer from './authReducer';
import usersReducer from './usersReducer';
import organizationsReducer from './organizationsReducer';
import workflowTemplatesReducer from './workflowTemplatesReducer';
import projectsReducer from './projectsReducer';
import eventsReducer from './eventsReducer';
import dashboardsReducer from './dashboardsReducer';
import reportsReducer from './reportsReducer';
import popupReducer from './popupReducer';
import sowsReducer from './sowsReducer';

export default combineReducers({
  loading: loadingReducer,
  auth: authReducer,
  users: usersReducer,
  organizations: organizationsReducer,
  workflowTemplates: workflowTemplatesReducer,
  projects: projectsReducer,
  events: eventsReducer,
  dashboards: dashboardsReducer,
  reports: reportsReducer,
  popup: popupReducer,
  sows: sowsReducer,
});
