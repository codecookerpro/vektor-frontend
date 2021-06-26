import { get, put, del, post } from 'services/axios';

const getOrganizations = async (data) => {
  const params = {
    get_json: JSON.stringify(data),
  };
  return await get('organizations', { params });
};

const createOrganization = async (params) => {
  return await post('organizations', params);
};

const updateOrganization = async (params) => {
  return await put('organizations', params);
};

const deleteOrganization = async (params) => {
  return await del('organizations', { params });
};

const createOrganizationDepartment = async (params) => {
  return await post('organizations', 'nested', params);
};

const updateOrganizationDepartment = async (params) => {
  return await put('organizations', 'nested', params);
};

const deleteOrganizationDepartment = async (params) => {
  return await del('organizations', 'nested', { params });
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
