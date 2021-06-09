import * as TYPES from 'redux/types';
import { POPUP_TYPE } from 'utils/constants/popupType';
import { EMPTY_STRING } from 'utils/constants/emptyString';

const initialState = {
  popupType: POPUP_TYPE.INACTIVE,
  popupText: EMPTY_STRING,
};

export default function popupReducer(state = initialState, action) {
  switch (action.type) {
    case TYPES.SET_POPUP:
      const { popupType, popupText, confirmText, cancelText, onCancel, onConfirm } = action.payload;
      return {
        ...state,
        popupType,
        popupText,
        onConfirm,
        onCancel,
        confirmText,
        cancelText,
      };
    default:
      return state;
  }
}
