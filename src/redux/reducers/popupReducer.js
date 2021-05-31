import * as TYPES from 'redux/types';
import { POPUP_TYPE } from 'utils/constants/popupType';
import { POPUP_TEXT } from 'utils/constants/popupText';

const initialState = {
  popupType: POPUP_TYPE.INACTIVE,
  popupText: POPUP_TEXT.EMPTY,
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
