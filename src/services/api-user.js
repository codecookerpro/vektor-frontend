
import axios from 'services/axios'

const getUsers = async (data) => {
  return await axios.get('/api/users', { data });
};

const createUser = async (params) => {
  return await axios.post('/api/users', params);
};

const updateUser = async (params) => {
  return await axios.put(`/api/users`, params);
};

const deleteUser = async (params) => {
  return await axios.delete(`/api/users`, { params });
};

export {
  getUsers,
  createUser,
  updateUser,
  deleteUser
};
