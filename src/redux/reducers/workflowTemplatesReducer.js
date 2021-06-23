import { handleActions } from 'redux-actions';
import ActionTypes from 'utils/constants/action-types';
import * as updaters from 'redux/updaters/workflow-templates';

const actionHandler = {
  [ActionTypes.FETCH_WORKFLOW_TEMPLATES]: updaters.fetchWorkflowTemplatesUpdater,
  [ActionTypes.CREATE_WTD]: updaters.createWTDUpdater,
  [ActionTypes.UPDATE_WTD]: updaters.updateWTDUpdater,
};

const workflowTemplatesReducer = handleActions(actionHandler, updaters.INITIAL_STATE);

export default workflowTemplatesReducer;
