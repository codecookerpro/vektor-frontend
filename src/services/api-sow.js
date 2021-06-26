import { get, put, del, post } from 'services/axios';

const getSOWs = async (data) => {
  const params = {
    get_json: JSON.stringify(data),
  };
  return await get('sows', { params });
};

const createSOW = async (params) => {
  return await post('sows', params);
};

const updateSOW = async (params) => {
  return await put('sows', params);
};

const deleteSOW = async (params) => {
  return await del('sows', { params });
};

const createSOWFile = async (params) => {
  return await post('sows', 'file', params);
};

const getSOWFile = async (data) => {
  const params = {
    get_json: JSON.stringify(data),
  };
  return await get('sows', 'file', { params });
};

const deleteSOWFileUrl = async (params) => {
  return await del('sows', 'file', { params });
};

export { getSOWs, createSOW, updateSOW, deleteSOW, createSOWFile, getSOWFile, deleteSOWFileUrl };
