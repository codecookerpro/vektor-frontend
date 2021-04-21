
import axios from 'services/axios'

const getSystems = async (data) => {
  const params = {
    get_json: JSON.stringify(data)
  }
  return await axios.get('/api/metasystems/systems', { params });
};

const createSystem = async (params) => {
  return await axios.post('/api/metasystems/systems', params);
};

const updateSystem = async (params) => {
  return await axios.put(`/api/metasystems/systems`, params);
};

const deleteSystem = async (params) => {
  return await axios.delete(`/api/metasystems/systems`, { params });
};

const createSystemDeliverable = async (params) => {
  return await axios.post('/api/metasystems/systems/nested', params);
};

const updateSystemDeliverable = async (params) => {
  return await axios.put(`/api/metasystems/systems/nested`, params);
};

const deleteSystemDeliverable = async (params) => {
  return await axios.delete(`/api/metasystems/systems/nested`, { params });
};

export {
  getSystems,
  createSystem,
  updateSystem,
  deleteSystem,
  createSystemDeliverable,
  updateSystemDeliverable,
  deleteSystemDeliverable
};
