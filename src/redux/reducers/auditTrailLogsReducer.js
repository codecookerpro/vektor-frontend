
import * as TYPES from 'redux/types';

const INITIAL_STATE = Object.freeze({
  results: []
});

const auditTrailLogsReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case TYPES.FETCH_AUDIT_TRAIL_LOGS:
      return {
        ...state,
        results: action.payload
      };
    default:
      return state;
  }
};

export default auditTrailLogsReducer;
