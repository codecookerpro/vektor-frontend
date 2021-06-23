import TYPES from 'utils/constants/action-types';
import { POPUP_TYPE } from 'utils/constants';

const initialState = {
  popupType: POPUP_TYPE.inactive,
  popupText: '',
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
