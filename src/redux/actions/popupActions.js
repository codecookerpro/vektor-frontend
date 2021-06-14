import * as TYPES from 'redux/types';
import { POPUP_TYPE } from 'utils/constants/popupType';

const setPopup = (popup) => {
  return {
    type: TYPES.SET_POPUP,
    payload: popup,
  };
};

const showError = (msg) => ({
  type: TYPES.SET_POPUP,
  payload: {
    popupType: POPUP_TYPE.ERROR,
    popupText: msg,
  },
});

export { setPopup, showError };
