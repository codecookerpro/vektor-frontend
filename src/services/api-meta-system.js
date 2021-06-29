import { getJQ, get, put, del, post } from 'services/axios';

export const getMetaSystems = async (data) => {
  const params = {
    get_json: JSON.stringify(data),
  };
  return await get('metasystems', { params });
};

export const getSystemHistory = async (data) => await getJQ(['metasystems', 'systems', 'history'], data);

export const createMetaSystem = async (params) => await post('metasystems', params);

export const updateMetaSystem = async (params) => {
  return await put('metasystems', params);
};

export const deleteMetaSystem = async (params) => {
  return await del('metasystems', { params });
};

export const initDeliverables = async (params) => {
  return await put('metasystems', 'systems', 'initialize', params);
};

export const createDeliverable = async (params) => {
  return await post('metasystems', 'systems', 'nested', params);
};

export const updateDeliverable = async (params) => {
  return await put('metasystems', 'systems', 'nested', params);
};

export const deleteDeliverable = async (params) => {
  return await del('metasystems', 'systems', 'nested', { params });
};

export const updateDeliverablePositions = async (params) => {
  return await put('metasystems', 'systems', 'positioning', params);
};
