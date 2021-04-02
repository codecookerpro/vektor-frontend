
import axios from 'services/axios'

const getWorkflowTemplates = async (data) => {
  return await axios.get('/api/workflows', { data });
};

const createWorkflowTemplate = async (params) => {
  return await axios.post('/api/workflows', params);
};

const updateWorkflowTemplate = async (params) => {
  return await axios.put('/api/workflows', params);
};

const deleteWorkflowTemplate = async (params) => {
  return await axios.delete('/api/workflows', { params });
};

export {
  getWorkflowTemplates,
  createWorkflowTemplate,
  updateWorkflowTemplate,
  deleteWorkflowTemplate
};
