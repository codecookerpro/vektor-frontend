import * as TYPES from 'redux/types';

const INITIAL_STATE = Object.freeze({
  results: [],
  organization: {},
  departments: [],
});

const organizationsReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case TYPES.FETCH_ORGANIZATIONS:
      return {
        ...state,
        results: action.payload,
      };
    case TYPES.SET_SELECTED_ORGANIZATION:
      return {
        ...state,
        organization: action.payload,
      };
    case TYPES.SET_SELECTED_DEPARTMENTS:
      return {
        ...state,
        departments: action.payload,
      };
    default:
      return state;
  }
};

export default organizationsReducer;
