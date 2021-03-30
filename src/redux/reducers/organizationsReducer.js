
import * as TYPES from 'redux/types';

const INITIAL_STATE = Object.freeze({
  results: []
});

const organizationsReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case TYPES.FETCH_ORGANIZATIONS:
      return {
        ...state,
        results: action.payload
      };
    default:
      return state;
  }
};

export default organizationsReducer;
