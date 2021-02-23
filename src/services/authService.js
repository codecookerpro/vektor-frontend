import axios from 'services/axios';

const login = async params => {
  return await axios.post('/api/login', params);
};

const register = async params => {
  return await axios.post('/api/register', params);
};

export {
  login,
  register
};

