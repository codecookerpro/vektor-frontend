import { post } from 'services/axios';

const login = async (params) => {
  return await post(['users', 'sign-in'], params);
};

const restorePassword = async (params) => {
  return await post(['users', 'restore-password'], params);
};

const setPassword = async (params) => {
  return await post(['users', 'set-password'], params);
};

const refreshToken = async (params) => {
  return await post(['users', 'refresh'], params);
};

export { login, restorePassword, refreshToken, setPassword };
