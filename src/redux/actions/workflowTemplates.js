import * as TYPES from 'redux/types';
import * as workflowTemplateAPI from 'services/api-workflow-template';
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
      const { data = [] } = await workflowTemplateAPI.getWorkflowTemplates(params);
      await dispatch({
        type: TYPES.FETCH_WORKFLOW_TEMPLATES,
        payload: data,
      });
    } catch (error) {
      console.log('[getWorkflowTemplates] error => ', error);
    }
  };

const addWorkflowTemplate = (workflowTemplate) => async (dispatch, getState) => {
  try {
    const {
      workflowTemplates: { results },
    } = getState();

    const newWorkflowTemplates = [workflowTemplate, ...results];

    dispatch({
      type: TYPES.FETCH_WORKFLOW_TEMPLATES,
      payload: newWorkflowTemplates,
    });
  } catch (error) {
    console.log('[addWorkflowTemplate] error => ', error);
  }
};

const editWorkflowTemplate = (workflowTemplate) => async (dispatch, getState) => {
  try {
    const {
      workflowTemplates: { results },
    } = getState();

    const newWorkflowTemplates = results.map((item) => {
      if (item._id === workflowTemplate._id) {
        return workflowTemplate;
      }
      return item;
    });

    dispatch({
      type: TYPES.FETCH_WORKFLOW_TEMPLATES,
      payload: newWorkflowTemplates,
    });
  } catch (error) {
    console.log('[editWorkflowTemplate] error => ', error);
  }
};

const removeWorkflowTemplate = (workflowTemplate) => async (dispatch, getState) => {
  try {
    const {
      workflowTemplates: { results },
    } = getState();

    const newWorkflowTemplates = results.filter((item) => item._id !== workflowTemplate._id);

    dispatch({
      type: TYPES.FETCH_WORKFLOW_TEMPLATES,
      payload: newWorkflowTemplates,
    });
  } catch (error) {
    console.log('[removeWorkflowTemplate] error => ', error);
  }
};

export { getWorkflowTemplates, addWorkflowTemplate, editWorkflowTemplate, removeWorkflowTemplate };
