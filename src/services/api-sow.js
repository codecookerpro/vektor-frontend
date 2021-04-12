
import axios from 'services/axios'

const getMetaSystems = async (data) => {
  return await axios.get('/api/metasystems', { data });
};

const createMetaSystem = async (params) => {
  return await axios.post('/api/metasystems', params);
};

const updateMetaSystem = async (params) => {
  return await axios.put(`/api/metasystems`, params);
};

const deleteMetaSystem = async (params) => {
  return await axios.delete(`/api/metasystems`, { params });
};

export {
  getMetaSystems,
  createMetaSystem,
  updateMetaSystem,
  deleteMetaSystem
};

