import { combineReducers } from 'redux'

import loadingReducer from './loadingReducer'
import authReducer from './authReducer'
import organizationsReducer from './organizationsReducer'
import workflowTemplatesReducer from './workflowTemplatesReducer'

export default combineReducers({
  loading: loadingReducer,
  auth: authReducer,
  organizations: organizationsReducer,
  workflowTemplates: workflowTemplatesReducer
});
