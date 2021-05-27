import * as TYPES from 'redux/types';

const initialState = {
  popupType: '',
  popupText: '',
};

export default function popupReducer(state = initialState, action) {
  switch (action.type) {
    case TYPES.SET_POPUP:
      const { popupType, popupText } = action.payload;
      return {
        ...state,
        popupType,
        popupText,
      };
    default:
      return state;
  }
}
