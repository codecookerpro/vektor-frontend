import axios from 'services/axios';

const login = async (params) => {
  return await axios.post('/api/users/sign-in', params);
};

const restorePassword = async (params) => {
  return await axios.post('/api/users/restore-password', params);
};

const changePassword = async (params) => {
  return await axios.post('/api/users/change-password', params);
};

const refreshToken = async (params) => {
  return await axios.post('/api/users/refresh', params);
};

export {
  login,
  restorePassword,
  changePassword,
  refreshToken
};
