import * as TYPES from 'redux/types';

const INITIAL_STATE = Object.freeze({
  results: [],
});

const workflowTemplatesReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case TYPES.FETCH_WORKFLOW_TEMPLATES:
      return {
        ...state,
        results: action.payload,
      };

    case TYPES.CREATE_WTD:
      return {
        ...state,
        results: [...state.results, action.payload],
      };

    case TYPES.UPDATE_WTD:
      return {
        ...state,
        results: state.results.map((wf) => (wf._id === action.payload._id ? action.payload : wf)),
      };

    case TYPES.REMOVE_WTD:
      return {
        ...state,
        // results: state.results.map(wf => wf._id === action.payload._id ? action.payload : wf)
      };

    default:
      return state;
  }
};

export default workflowTemplatesReducer;
