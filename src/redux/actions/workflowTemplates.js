import * as TYPES from 'redux/types';
import * as API from 'services/api-workflow-template';
import { isEmpty } from 'utils/helpers/utility';

const getWorkflowTemplates =
  (refresh = false) =>
  async (dispatch, getState) => {
    try {
      const {
        workflowTemplates: { results },
      } = getState();
      if (!refresh && !isEmpty(results)) {
        return;
      }

      const params = {
        skip: 0,
        limit: 10000,
      };
      const { data = [] } = await API.getWorkflowTemplates(params);
      await dispatch({
        type: TYPES.FETCH_WORKFLOW_TEMPLATES,
        payload: data,
      });
    } catch (error) {
      console.log('[getWorkflowTemplates] error => ', error);
    }
  };

const addWorkflowTemplate = (params) => (dispatch, getState) => {
  API.createWorkflowTemplate(params)
    .then(({ data }) => {
      const {
        workflowTemplates: { results },
      } = getState();

      const newWorkflowTemplates = [data, ...results];

      dispatch({
        type: TYPES.FETCH_WORKFLOW_TEMPLATES,
        payload: newWorkflowTemplates,
      });
    })
    .catch((error) => console.log('[addWorkflowTemplate] error => ', error));
};

const editWorkflowTemplate = (params) => (dispatch, getState) => {
  API.updateWorkflowTemplate(params)
    .then(({ data }) => {
      const {
        workflowTemplates: { results },
      } = getState();

      dispatch({
        type: TYPES.FETCH_WORKFLOW_TEMPLATES,
        payload: results.map((tmp) => (tmp._id === data._id ? data : tmp)),
      });
    })
    .catch((error) => console.log('[editWorkflowTemplate] error => ', error));
};

const removeWorkflowTemplate = (params) => async (dispatch, getState) => {
  API.deleteWorkflowTemplate(params)
    .then(({ data }) => {
      const {
        workflowTemplates: { results },
      } = getState();

      dispatch({
        type: TYPES.FETCH_WORKFLOW_TEMPLATES,
        payload: results.filter((item) => item._id !== data._id),
      });
    })
    .catch((error) => console.log('[removeWorkflowTemplate] error => ', error));
};

const createWTD = (params) => (dispatch) => {
  API.createWorkflowTemplateDeliverable(params)
    .then(({ data }) =>
      dispatch({
        type: TYPES.UPDATE_WTD,
        payload: data,
      })
    )
    .catch((error) => console.log('[createWTD] error => ', error));
};

const updateWTD = (params) => (dispatch) => {
  API.updateWorkflowTemplateDeliverable(params)
    .then(({ data }) =>
      dispatch({
        type: TYPES.UPDATE_WTD,
        payload: data,
      })
    )
    .catch((error) => console.log('[updateWTD] error => ', error));
};

const deleteWTD = (params) => (dispatch) => {
  API.deleteWorkflowTemplateDeliverable(params)
    .then(({ data }) =>
      dispatch({
        type: TYPES.UPDATE_WTD,
        payload: data,
      })
    )
    .catch((error) => console.log('[deleteWTD] error => ', error));
};

const updateWTDPositions = (params) => (dispatch) => {
  API.updateWTDPositions(params)
    .then(({ data }) =>
      dispatch({
        type: TYPES.UPDATE_WTD,
        payload: data,
      })
    )
    .catch((error) => console.log('[updateWTDPositions] error => ', error));
};

export {
  getWorkflowTemplates,
  addWorkflowTemplate,
  editWorkflowTemplate,
  removeWorkflowTemplate,
  createWTD,
  updateWTD,
  deleteWTD,
  updateWTDPositions,
};
