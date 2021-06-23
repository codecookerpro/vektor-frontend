import TYPES from 'utils/constants/action-types';

const initialState = {
  loadingStatus: false,
};

export default function loadingReducer(state = initialState, action) {
  switch (action.type) {
    case TYPES.SET_LOADING_STATUS:
      return {
        ...state,
        loadingStatus: action.payload,
      };
    default:
      return state;
  }
}
