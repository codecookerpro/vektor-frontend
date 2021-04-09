import axios from 'services/axios';

const login = async params => {
  return await axios.post('/api/users/sign-in', params);
};

const restorePassword = async params => {
  return await axios.post('/api/users/restore-password', params);
};

const changePassword = async (params, passwordResetToken) => {
  const options = {
    headers: {
      'Authorization': `Bearer ${passwordResetToken}`,
    }
  };

  return await axios.post('/api/users/change-password', params, options);
};

export {
  login,
  restorePassword,
  changePassword
};