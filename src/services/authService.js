import axios from 'services/axios';

const login = async params => {
  return await axios.post('/api/users/sign-in', params);
};

export {
  login
};