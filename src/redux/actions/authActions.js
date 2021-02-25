import * as TYPES from "redux/types";

const setUserToken = ({ accessToken, user }) => dispatch => {
  dispatch(setAccessToken(accessToken));
  dispatch(setCurrentUser(user));
};

const setAccessToken = accessToken => {
  localStorage.setItem('accessToken', accessToken);
  return {
    type: TYPES.SET_ACCESS_TOKEN,
    payload: accessToken
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
  dispatch(setCurrentUser({}));
};

export {
  setUserToken,
  setAccessToken,
  setCurrentUser,
  logoutUser
}