import axios from 'services/axios';

const METASYSTEMS_URL = '/api/metasystems';

export const getMetaSystems = async (data) => {
  const params = {
    get_json: JSON.stringify(data),
  };
  return await axios.get(METASYSTEMS_URL, { params });
};

export const getSystemHistory = async (data) => {
  const params = {
    get_json: JSON.stringify(data),
  };
  return await axios.get(`${METASYSTEMS_URL}/systems/history`, { params });
};

export const createMetaSystem = async (params) => {
  return await axios.post(METASYSTEMS_URL, params);
};

export const updateMetaSystem = async (params) => {
  return await axios.put(METASYSTEMS_URL, params);
};

export const deleteMetaSystem = async (params) => {
  return await axios.delete(METASYSTEMS_URL, { params });
};

export const initDeliverables = async (params) => {
  return await axios.put(`${METASYSTEMS_URL}/systems/initialize`, params);
};

export const createDeliverable = async (params) => {
  return await axios.post(`${METASYSTEMS_URL}/systems/nested`, params);
};

export const updateDeliverable = async (params) => {
  return await axios.put(`${METASYSTEMS_URL}/systems/nested`, params);
};

export const deleteDeliverable = async (params) => {
  return await axios.delete(`${METASYSTEMS_URL}/systems/nested`, { params });
};

export const updateDeliverablePositions = async (params) => {
  return await axios.put(`${METASYSTEMS_URL}/systems/positioning`, params);
};
