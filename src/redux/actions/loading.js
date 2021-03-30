
import * as TYPES from "redux/types";

const setLoadingStatus = loadingStatus => dispatch => {
  dispatch({
    type: TYPES.SET_LOADING_STATUS,
    payload: loadingStatus
  });
};

export default setLoadingStatus;