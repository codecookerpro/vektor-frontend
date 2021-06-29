import { getJQ, put, del, post } from 'services/axios';

const getSOWs = async (data) => await getJQ('sows', data);

const createSOW = async (params) => {
  return await post('sows', params);
};

const updateSOW = async (params) => {
  return await put('sows', params);
};

const deleteSOW = async (params) => {
  return await del('sows', params);
};

const createSOWFile = async (params) => {
  return await post(['sows', 'file'], params);
};

const getSOWFile = async (data) => await getJQ(['sows', 'file'], data);

const deleteSOWFileUrl = async (params) => {
  return await del(['sows', 'file'], params);
};

export { getSOWs, createSOW, updateSOW, deleteSOW, createSOWFile, getSOWFile, deleteSOWFileUrl };
