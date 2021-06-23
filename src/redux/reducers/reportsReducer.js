import TYPES from 'utils/constants/action-types';

const INITIAL_STATE = Object.freeze({
  results: [],
});

const reportsReducer = (state = INITIAL_STATE, { type, payload }) => {
  switch (type) {
    case TYPES.FETCH_REPORTS:
      return {
        ...state,
        results: payload,
      };
    default:
      return state;
  }
};

export default reportsReducer;
