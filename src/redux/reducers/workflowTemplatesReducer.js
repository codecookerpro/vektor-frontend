
import * as TYPES from 'redux/types';

const INITIAL_STATE = Object.freeze({
  results: []
});

const workflowTemplatesReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case TYPES.FETCH_WORKFLOW_TEMPLATES:
      return {
        ...state,
        results: action.payload
      };
    default:
      return state;
  }
};

export default workflowTemplatesReducer;
