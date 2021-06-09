import * as TYPES from 'redux/types';

const INITIAL_STATE = Object.freeze({
  results: [],
});

const sowsReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case TYPES.FETCH_SOWS:
      return {
        ...state,
        results: action.payload,
      };
    default:
      return state;
  }
};

export default sowsReducer;
