import TYPES from 'utils/constants/action-types';
import { POPUP_TYPE } from 'utils/constants';

const setPopup = (popup) => {
  return {
    type: TYPES.SET_POPUP,
    payload: popup,
  };
};

const showError = (msg) => ({
  type: TYPES.SET_POPUP,
  payload: {
    popupType: POPUP_TYPE.error,
    popupText: msg,
  },
});

export { setPopup, showError };
