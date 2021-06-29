import { handleActions } from 'redux-actions';
import ActionTypes from 'utils/constants/action-types';
import * as updaters from 'redux/updaters/projects';

const actionHandler = {
  [ActionTypes.FETCH_PROJECTS]: updaters.fetchProjectsUpdater,
  [ActionTypes.EDIT_PROJECT]: updaters.editProjectUpdater,
  [ActionTypes.DELETE_PROJECT]: updaters.deleteProjectUpdater,
  [ActionTypes.FETCH_SYSTEM_TRENDS]: updaters.fetchSystemTrendsUpdater,
  [ActionTypes.CREATE_META_SYSTEM]: updaters.createMetaSystemUpdater,
  [ActionTypes.FETCH_META_SYSTEMS]: updaters.fetchMetaSystemsUpdater,
  [ActionTypes.DELETE_META_SYSTEM]: updaters.deleteMetaSystemUpdater,
  [ActionTypes.UPDATE_META_SYSTEM]: updaters.updateMetaSystemUpdater,
  [ActionTypes.DUPLICATE_META_SYSTEM]: updaters.duplicateMetaSystemUpdater,
  [ActionTypes.UPDATE_DELIVERABLES]: updaters.updateDeliverablesUpdater,
  [ActionTypes.FETCH_META_SYSTEMS_FILTER]: updaters.fetchMetaSystemsFilterUpdater,
};

const projectReducer = handleActions(actionHandler, updaters.INITIAL_STATE);

export default projectReducer;
