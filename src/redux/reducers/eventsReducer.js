import { handleActions } from 'redux-actions';
import ActionTypes from 'utils/constants/action-types';
import * as updaters from '../updaters/events';

const actionHandler = {
  [ActionTypes.FETCH_EVENTS]: updaters.fetchEventsUpdater,
  [ActionTypes.FETCH_LATEST_EVENTS]: updaters.fetchLatestEventsUpdater,
};

const eventsReducer = handleActions(actionHandler, updaters.INITIAL_STATE);

export default eventsReducer;
