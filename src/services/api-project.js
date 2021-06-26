import { get, put, del, post } from 'services/axios';

const getProjects = async (data) => {
  const params = {
    get_json: JSON.stringify(data),
  };
  return get('projects', { params });
};

const createProject = async (params) => {
  return await post('projects', params);
};

const updateProject = async (params) => {
  return await put('projects', params);
};

const deleteProject = async (params) => {
  return await del('projects', { params });
};

const createProjectPhase = async (params) => {
  return await post('projects', 'nested', params);
};

const updateProjectPhase = async (params) => {
  return await put('projects', 'nested', params);
};

const deleteProjectPhase = async (params) => {
  return await del('projects', 'nested', { params });
};

export { getProjects, createProject, updateProject, deleteProject, createProjectPhase, updateProjectPhase, deleteProjectPhase };
