import axios from 'services/axios';

const SYSTEMS_BASIC_URL = '/api/metasystems/systems';

const getSystems = async (data) => {
  const params = {
    get_json: JSON.stringify(data),
  };
  return await axios.get(SYSTEMS_BASIC_URL, { params });
};

const getSystemHistory = async (data) => {
  const params = {
    get_json: JSON.stringify(data),
  };
  return await axios.get(`${SYSTEMS_BASIC_URL}/history`, { params });
};

const createSystem = async (params) => {
  return await axios.post(SYSTEMS_BASIC_URL, params);
};

const updateSystem = async (params) => {
  return await axios.put(SYSTEMS_BASIC_URL, params);
};

const deleteSystem = async (params) => {
  return await axios.delete(SYSTEMS_BASIC_URL, { params });
};

const createSystemDeliverable = async (params) => {
  return await axios.post(`${SYSTEMS_BASIC_URL}/nested`, params);
};

const updateSystemDeliverable = async (params) => {
  return await axios.put(`${SYSTEMS_BASIC_URL}/nested`, params);
};

const deleteSystemDeliverable = async (params) => {
  return await axios.delete(`${SYSTEMS_BASIC_URL}/nested`, { params });
};

export {
  getSystems,
  getSystemHistory,
  createSystem,
  updateSystem,
  deleteSystem,
  createSystemDeliverable,
  updateSystemDeliverable,
  deleteSystemDeliverable,
};
