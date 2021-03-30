
import axios from 'services/axios'

const getOrganizations = async (data) => {
  return await axios.get('/api/organizations', { data });
};

const createOrganization = async (params) => {
  return await axios.post('/api/organizations', params);
};

const updateOrganization = async (params) => {
  return await axios.put(`/api/organizations`, params);
};

const deleteOrganization = async (params) => {
  return await axios.delete(`/api/organizations`, { params });
};

export {
  getOrganizations,
  createOrganization,
  updateOrganization,
  deleteOrganization
};
