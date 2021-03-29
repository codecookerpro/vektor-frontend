
import axios from 'services/axios'

const getWorkflowTemplates = async (params) => {
  return await axios.get('/api/workflows', { params });
};

const createWorkflowTemplate = async (params) => {
  return await axios.post('/api/workflows', params);
};

const updateWorkflowTemplate = async (id, params) => {
  return await axios.put(`/api/workflows/${id}`, params);
};

const deleteWorkflowTemplate = async (id) => {
  return await axios.delete(`/api/workflows/${id}`);
};

export {
  getWorkflowTemplates,
  createWorkflowTemplate,
  updateWorkflowTemplate,
  deleteWorkflowTemplate
};
