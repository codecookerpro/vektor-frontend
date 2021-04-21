
import axios from 'services/axios'

const getSOWs = async (data) => {
  const params = {
    get_json: JSON.stringify(data)
  }
  return await axios.get('/api/sows', { params });
};

const createSOW = async (params) => {
  return await axios.post('/api/sows', params);
};

const updateSOW = async (params) => {
  return await axios.put('/api/sows', params);
};

const deleteSOW = async (params) => {
  return await axios.delete('/api/sows', { params });
};

const createSOWFile = async (params) => {
  return await axios.post('/api/sows/file', params);
};

const getSOWFile = async (data) => {
  return await axios.get('/api/sows/file', { data });
};

const deleteSOWFileUrl = async (params) => {
  return await axios.delete('/api/sows/file', { params });
};

export {
  getSOWs,
  createSOW,
  updateSOW,
  deleteSOW,
  createSOWFile,
  getSOWFile,
  deleteSOWFileUrl
};

