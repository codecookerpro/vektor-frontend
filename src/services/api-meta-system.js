import axios from 'services/axios';

const METASYSTEMS_URL = '/api/metasystems';

const getMetaSystems = async (data) => {
  const params = {
    get_json: JSON.stringify(data),
  };
  return await axios.get(METASYSTEMS_URL, { params });
};

const getSystemHistory = async (data) => {
  const params = {
    get_json: JSON.stringify(data),
  };
  return await axios.get(`${METASYSTEMS_URL}/systems/history`, { params });
};

const createMetaSystem = async (params) => {
  return await axios.post(METASYSTEMS_URL, params);
};

const updateMetaSystem = async (params) => {
  return await axios.put(METASYSTEMS_URL, params);
};

const deleteMetaSystem = async (params) => {
  return await axios.delete(METASYSTEMS_URL, { params });
};

const initDeliverables = async (params) => {
  return await axios.put(`/api/metasystems/systems/initialize`, params);
};

export { getMetaSystems, getSystemHistory, createMetaSystem, updateMetaSystem, deleteMetaSystem, initDeliverables };
