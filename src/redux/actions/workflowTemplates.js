import TYPES from 'utils/constants/action-types';
import * as API from 'services/api-workflow-template';
import { isEmpty } from 'utils/helpers/utility';

export const getWorkflowTemplates =
  (params = {}, refresh = false) =>
  (dispatch, getState) => {
    const {
      workflowTemplates: { results },
    } = getState();

    if (!refresh && params?.filter?._id && !isEmpty(results.find((w) => w._id === params.filter._id))) {
      return;
    }

    API.getWorkflowTemplates(params)
      .then((response) => dispatch({ type: TYPES.FETCH_WT, payload: response }))
      .catch((error) => console.log('[getWorkflowTemplates] error => ', error));
  };

export const addWorkflowTemplate = (params) => (dispatch) => {
  API.createWorkflowTemplate(params)
    .then(({ data }) => dispatch({ type: TYPES.CREATE_WT, payload: data }))
    .catch((error) => console.log('[addWorkflowTemplate] error => ', error));
};

export const editWorkflowTemplate = (params) => (dispatch) => {
  API.updateWorkflowTemplate(params)
    .then(({ data }) => dispatch({ type: TYPES.UPDATE_WT, payload: data }))
    .catch((error) => console.log('[editWorkflowTemplate] error => ', error));
};

export const removeWorkflowTemplate = (params) => (dispatch) => {
  API.deleteWorkflowTemplate(params)
    .then(() => dispatch({ type: TYPES.DELETE_WT, payload: params._id }))
    .catch((error) => console.log('[removeWorkflowTemplate] error => ', error));
};

export const duplicateWT = (template) => ({
  type: TYPES.DUPLICATE_WT,
  payload: template,
});

export const createWTD = (params) => (dispatch) => {
  API.createWorkflowTemplateDeliverable(params)
    .then(({ data }) =>
      dispatch({
        type: TYPES.UPDATE_WTD,
        payload: data,
      })
    )
    .catch((error) => console.log('[createWTD] error => ', error));
};

export const updateWTD = (params) => (dispatch) => {
  API.updateWorkflowTemplateDeliverable(params)
    .then(({ data }) =>
      dispatch({
        type: TYPES.UPDATE_WTD,
        payload: data,
      })
    )
    .catch((error) => console.log('[updateWTD] error => ', error));
};

export const deleteWTD = (params) => (dispatch) => {
  API.deleteWorkflowTemplateDeliverable(params)
    .then(({ data }) =>
      dispatch({
        type: TYPES.UPDATE_WTD,
        payload: data,
      })
    )
    .catch((error) => console.log('[deleteWTD] error => ', error));
};

export const updateWTDPositions = (params) => (dispatch) => {
  API.updateWTDPositions(params)
    .then(({ data }) =>
      dispatch({
        type: TYPES.UPDATE_WTD,
        payload: data,
      })
    )
    .catch((error) => console.log('[updateWTDPositions] error => ', error));
};
