import TYPES from 'utils/constants/action-types';

const INITIAL_STATE = Object.freeze({
  results: [],
  projectList: [],
  metaSystemList: [],
  workflowList: [],
});

const eventsReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case TYPES.FETCH_DASHBOARDS:
      return {
        ...state,
        results: action.payload,
      };
    case TYPES.GET_FILTERING_DATA:
      return {
        ...state,
        projectList: action.payload.projects,
        metaSystemList: action.payload.metaSystems,
        workflowList: action.payload.workflows,
      };
    default:
      return state;
  }
};

export default eventsReducer;
