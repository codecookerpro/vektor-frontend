import TYPES from 'utils/constants/action-types';

const INITIAL_STATE = Object.freeze({
  results: [],
  pagination: {
    skip: 0,
    limit: 10,
    total: 10,
  },
  sow: {},
  fileUrl: '',
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
    case TYPES.SET_SOW_FILE_URL:
      return {
        ...state,
        fileUrl: action.payload,
      };
    default:
      return state;
  }
};

export default sowsReducer;
