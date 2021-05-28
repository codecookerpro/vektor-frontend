import * as TYPES from 'redux/types';

const setPopup = (popup) => {
  return {
    type: TYPES.SET_POPUP,
    payload: popup,
  };
};

export { setPopup };
