import * as TYPES from 'redux/types';

const INITIAL_STATE = Object.freeze({
  results: [],
  pagination: {
    skip: 0,
    limit: 10,
    total: 10,
  },
  sow: {},
});

const sowsReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case TYPES.FETCH_SOWS:
      const { data = [], pagination } = action.payload;
      return {
        ...state,
        results: data,
        pagination,
      };
    case TYPES.SET_SELECTED_SOW:
      return {
        ...state,
        sow: action.payload,
      };
    default:
      return state;
  }
};

export default sowsReducer;
