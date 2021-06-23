import TYPES from 'utils/constants/action-types';

const INITIAL_STATE = Object.freeze({
  results: [],
});

const eventsReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case TYPES.FETCH_DASHBOARDS:
      return {
        ...state,
        results: action.payload,
      };
    default:
      return state;
  }
};

export default eventsReducer;
