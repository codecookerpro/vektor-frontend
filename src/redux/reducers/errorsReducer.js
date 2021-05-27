import * as TYPES from 'redux/types';

const initialState = {
  errorPopup: false,
  errorPopupText: '',
};

export default function errorsReducer(state = initialState, action) {
  switch (action.type) {
    case TYPES.SET_ERROR_POPUP:
      return {
        ...state,
        errorPopup: action.payload,
      };
    case TYPES.SET_ERROR_POPUP_TEXT:
      return {
        ...state,
        errorPopupText: action.payload,
      };
    default:
      return state;
  }
}
