import TYPES from 'utils/constants/action-types';

const INITIAL_STATE = Object.freeze({
  results: [],
  latest: [],
});

const eventsReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case TYPES.FETCH_EVENTS:
      return {
        ...state,
        results: action.payload,
      };
    case TYPES.FETCH_LATEST_EVENTS:
      return {
        ...state,
        latest: action.payload,
      };
    default:
      return state;
  }
};

export default eventsReducer;
