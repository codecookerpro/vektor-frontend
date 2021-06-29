import { handleActions } from 'redux-actions';
import ActionTypes from 'utils/constants/action-types';
import * as updaters from 'redux/updaters/workflow-templates';

const actionHandler = {
  [ActionTypes.CREATE_WT]: updaters.createWTUpdater,
  [ActionTypes.UPDATE_WT]: updaters.updateWTUpdater,
  [ActionTypes.DELETE_WT]: updaters.deleteWTUpdater,
  [ActionTypes.FETCH_WT]: updaters.fetchWTUpdater,
  [ActionTypes.DUPLICATE_WT]: updaters.duplicateWTUpdater,
  [ActionTypes.CREATE_WTD]: updaters.createWTDUpdater,
  [ActionTypes.UPDATE_WTD]: updaters.updateWTDUpdater,
  [ActionTypes.DUPLICATE_WT]: updaters.duplicateWTUpdater,
};

const workflowTemplatesReducer = handleActions(actionHandler, updaters.INITIAL_STATE);

export default workflowTemplatesReducer;
