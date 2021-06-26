import { get, put, del, post } from 'services/axios';

const getWorkflowTemplates = async (data) => {
  return await get('workflows', { data });
};

const createWorkflowTemplate = async (params) => {
  return await post('workflows', params);
};

const updateWorkflowTemplate = async (params) => {
  return await put('workflows', params);
};

const deleteWorkflowTemplate = async (params) => {
  return await del('workflows', { params });
};

const createWorkflowTemplateDeliverable = async (params) => {
  return await post('workflows', 'nested', params);
};

const updateWorkflowTemplateDeliverable = async (params) => {
  return await put('workflows', 'nested', params);
};

const deleteWorkflowTemplateDeliverable = async (params) => {
  return await del('workflows', 'nested', { params });
};

const updateWTDPositions = async (params) => {
  return await put('workflows', 'positioning', params);
};

export {
  getWorkflowTemplates,
  createWorkflowTemplate,
  updateWorkflowTemplate,
  deleteWorkflowTemplate,
  createWorkflowTemplateDeliverable,
  updateWorkflowTemplateDeliverable,
  deleteWorkflowTemplateDeliverable,
  updateWTDPositions,
};
