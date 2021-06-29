import TYPES from 'utils/constants/action-types';

const currentUserStored = localStorage.getItem('currentUser');
const initialState = {
  accessToken: '',
  passwordResetToken: '',
  currentUser: currentUserStored ? JSON.parse(currentUserStored) : {},
};

export default function authReducer(state = initialState, action) {
  switch (action.type) {
    case TYPES.SET_ACCESS_TOKEN:
      return {
        ...state,
        accessToken: action.payload,
      };
    case TYPES.SET_PASSWORD_RESET_TOKEN:
      return {
        ...state,
        passwordResetToken: action.payload,
      };
    case TYPES.SET_CURRENT_USER:
      return {
        ...state,
        currentUser: action.payload,
      };
    default:
      return state;
  }
}
