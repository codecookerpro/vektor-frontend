import * as TYPES from 'redux/types';

const INITIAL_STATE = Object.freeze({
  results: [],
  organization: '',
});

const projectsReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case TYPES.FETCH_PROJECTS:
      return {
        ...state,
        ...action.payload,
      };
    default:
      return state;
  }
};

export default projectsReducer;
