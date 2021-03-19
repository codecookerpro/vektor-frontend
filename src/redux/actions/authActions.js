import * as TYPES from "redux/types";

const setUserToken = ({ accessToken, refreshToken, user }) => dispatch => {
  dispatch(setAccessToken(accessToken));
  dispatch(setRefreshToken(refreshToken));
  dispatch(setCurrentUser(user));
};

const setAccessToken = accessToken => {
  localStorage.setItem('accessToken', accessToken);
  return {
    type: TYPES.SET_ACCESS_TOKEN,
    payload: accessToken
  };
};

const setRefreshToken = refreshToken => {
  localStorage.setItem('refreshToken', refreshToken);
  return {
    type: TYPES.SET_REFRESH_TOKEN,
    payload: refreshToken
  };
};

const setCurrentUser = currentUser => {
  localStorage.setItem('currentUser', JSON.stringify(currentUser));
  return {
    type: TYPES.SET_CURRENT_USER,
    payload: currentUser
  };
};

const logoutUser = () => dispatch => {
  localStorage.clear();
  dispatch(setAccessToken(''));
  dispatch(setRefreshToken(''));
  dispatch(setCurrentUser({}));
};

export {
  setUserToken,
  setAccessToken,
  setRefreshToken,
  setCurrentUser,
  logoutUser
}