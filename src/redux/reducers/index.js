import { combineReducers } from 'redux'

import loadingReducer from './loadingReducer'
import authReducer from './authReducer'
import usersReducer from './usersReducer'
import organizationsReducer from './organizationsReducer'
import workflowTemplatesReducer from './workflowTemplatesReducer'
import auditTrailLogsReducer from './auditTrailLogsReducer'
import projectsReducer from './projectsReducer'

export default combineReducers({
  loading: loadingReducer,
  auth: authReducer,
  users: usersReducer,
  organizations: organizationsReducer,
  workflowTemplates: workflowTemplatesReducer,
  auditTrailLogs: auditTrailLogsReducer,
  projects: projectsReducer,
});
