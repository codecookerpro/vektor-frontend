import axios from 'services/axios';

const getOrganizations = async (data) => {
  const params = {
    get_json: JSON.stringify(data),
  };
  return await axios.get('/api/organizations', { params });
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

const createOrganizationDepartment = async (params) => {
  return await axios.post('/api/organizations/nested', params);
};

const updateOrganizationDepartment = async (params) => {
  return await axios.put(`/api/organizations/nested`, params);
};

const deleteOrganizationDepartment = async (params) => {
  return await axios.delete(`/api/organizations/nested`, { params });
};

export {
  getOrganizations,
  createOrganization,
  updateOrganization,
  deleteOrganization,
  createOrganizationDepartment,
  updateOrganizationDepartment,
  deleteOrganizationDepartment,
};
