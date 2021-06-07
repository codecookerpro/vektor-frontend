import * as TYPES from 'redux/types';

const INITIAL_STATE = Object.freeze({
  results: [],
  organization: '',
});

const projectsReducer = (state = INITIAL_STATE, { payload, type }) => {
  switch (type) {
    case TYPES.FETCH_PROJECTS: {
      const { results, organization } = payload;

      return {
        ...state,
        results,
        organization,
      };
    }
    case TYPES.EDIT_PROJECT: {
      const { _id: projectId } = payload;
      const { results } = state;
      const newResults = results.map((project) => (project._id === projectId ? payload : project));

      return {
        ...state,
        results: newResults,
      };
    }
    default:
      return state;
  }
};

export default projectsReducer;
