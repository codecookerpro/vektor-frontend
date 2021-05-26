import * as TYPES from 'redux/types';

const setErrorPopup = (errorPopup) => {
  return {
    type: TYPES.SET_ERROR_POPUP,
    payload: errorPopup,
  };
};

const setErrorPopupText = (errorPopupText) => {
  return {
    type: TYPES.SET_ERROR_POPUP_TEXT,
    payload: errorPopupText,
  };
};

export { setErrorPopup, setErrorPopupText };
