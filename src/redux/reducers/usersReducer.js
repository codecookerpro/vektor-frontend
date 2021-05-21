import * as TYPES from 'redux/types';

const INITIAL_STATE = Object.freeze({
  results: [],
});

const usersReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case TYPES.FETCH_USERS:
      return {
        ...state,
        results: action.payload,
      };
    default:
      return state;
  }
};

export default usersReducer;
