import * as TYPES from 'redux/types';

const setUserToken =
  ({ accessToken, refreshToken, user, remember }) =>
  (dispatch) => {
    dispatch(setAccessToken(accessToken, remember));
    dispatch(setRefreshToken(refreshToken, remember));
    dispatch(setCurrentUser(user));
  };

const setAccessToken = (accessToken, remember) => {
  if (remember) {
    localStorage.setItem('accessToken', accessToken);
    sessionStorage.removeItem('accessToken');
  } else {
    sessionStorage.setItem('accessToken', accessToken);
    localStorage.removeItem('accessToken');
  }
  return {
    type: TYPES.SET_ACCESS_TOKEN,
    payload: accessToken,
  };
};

const setRefreshToken = (refreshToken, remember) => {
  if (remember) {
    localStorage.setItem('refreshToken', refreshToken);
    sessionStorage.removeItem('refreshToken');
  } else {
    sessionStorage.setItem('refreshToken', refreshToken);
    localStorage.removeItem('refreshToken');
  }
  return {
    type: TYPES.SET_REFRESH_TOKEN,
    payload: refreshToken,
  };
};

const setCurrentUser = (currentUser) => {
  localStorage.setItem('currentUser', JSON.stringify(currentUser));
  return {
    type: TYPES.SET_CURRENT_USER,
    payload: currentUser,
  };
};

const setPasswordResetToken = (passwordResetToken) => {
  localStorage.setItem('passwordResetToken', passwordResetToken);
  return {
    type: TYPES.SET_PASSWORD_RESET_TOKEN,
    payload: passwordResetToken,
  };
};

const logoutUser = () => (dispatch) => {
  localStorage.clear();
  dispatch(setAccessToken(''));
  dispatch(setRefreshToken(''));
  dispatch(setCurrentUser({}));
  dispatch(setPasswordResetToken(''));
};

export { setUserToken, setAccessToken, setRefreshToken, setCurrentUser, setPasswordResetToken, logoutUser };
