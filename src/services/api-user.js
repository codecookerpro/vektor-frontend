import { getJQ, put, del, post } from 'services/axios';

const getUsers = async (data) => await getJQ('users', data);

const createUser = async (params) => {
  return await post('users', params);
};

const updateUser = async (params) => {
  return await put('users', params);
};

const deleteUser = async (params) => {
  return await del('users', params);
};

const changeUserPassword = async (params) => {
  return await post(['users', 'change-password'], params);
};

export { getUsers, createUser, updateUser, deleteUser, changeUserPassword };
