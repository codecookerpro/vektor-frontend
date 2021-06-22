import * as TYPES from 'redux/types';

const INITIAL_STATE = Object.freeze({
  results: [],
});

const workflowTemplatesReducer = (state = INITIAL_STATE, { type, payload }) => {
  switch (type) {
    case TYPES.FETCH_WORKFLOW_TEMPLATES:
      return {
        ...state,
        results: payload,
      };

    case TYPES.UPDATE_WTD:
      return {
        ...state,
        results: state.results.map((wf) => (wf._id === payload._id ? payload : wf)),
      };

    default:
      return state;
  }
};

export default workflowTemplatesReducer;
