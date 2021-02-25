import * as TYPES from 'redux/types';

const initialState = {
  accessToken: '',
  currentUser: {}
};

export default function authReducer(state = initialState, action) {
  switch (action.type) {
    case TYPES.SET_ACCESS_TOKEN:
      return {
        ...state,
        accessToken: action.payload
      };
    case TYPES.SET_CURRENT_USER:
      return {
        ...state,
        currentUser: action.payload
      };
    default:
      return state;
  }
}