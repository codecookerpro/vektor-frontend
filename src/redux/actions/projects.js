import * as TYPES from 'redux/types';
import * as projectAPI from 'services/api-project';
import { isEmpty } from 'utils/helpers/utility';

const getProjects =
  ({ refresh = false, organization = '' } = {}) =>
  async (dispatch, getState) => {
    try {
      const {
        projects: { results, organization: preOrganization },
      } = getState();
      if (!refresh && !isEmpty(results) && organization === preOrganization) {
        return;
      }

      let params = {
        skip: 0,
        limit: 10000,
      };

      if (organization) {
        params = {
          ...params,
          filter: {
            organization,
          },
        };
      }

      const { data = [] } = await projectAPI.getProjects(params);
      await dispatch({
        type: TYPES.FETCH_PROJECTS,
        payload: {
          results: data,
          organization,
        },
      });
    } catch (error) {
      console.log('[getProjects] error => ', error);
    }
  };

const addProject = (project) => async (dispatch, getState) => {
  try {
    let isCompleted = false;
    const response = await projectAPI.createProject(project);

    if (response) {
      const {
        projects: { results },
      } = getState();
      const { data } = response;

      dispatch({
        type: TYPES.FETCH_PROJECTS,
        payload: {
          results: [data, ...results],
        },
      });
      isCompleted = true;
    }

    return isCompleted;
  } catch (error) {
    console.log('[addProject] error => ', error);
  }
};

const editProject = (project) => async (dispatch) => {
  try {
    let isCompleted = false;
    const response = await projectAPI.updateProject(project);

    if (response) {
      const { data: payload } = response;

      dispatch({ type: TYPES.EDIT_PROJECT, payload });
      isCompleted = true;
    }

    return isCompleted;
  } catch (error) {
    console.log('[editProject] error => ', error);
  }
};

const removeProject = (project) => async (dispatch) => {
  try {
    let isCompleted = false;
    const response = await projectAPI.deleteProject(project);

    if (response) {
      dispatch({ type: TYPES.REMOVE_PROJECT, payload: project });
      isCompleted = true;
    }

    return isCompleted;
  } catch (error) {
    console.log('[removeProject] error => ', error);
  }
};

const createProjectPhase = (phase) => async (dispatch) => {
  try {
    let isCompleted = false;
    const response = await projectAPI.createProjectPhase(phase);

    if (response) {
      const { data: payload } = response;

      dispatch({ type: TYPES.EDIT_PROJECT, payload });
      isCompleted = true;
    }

    return isCompleted;
  } catch (error) {
    console.log('[createProjectPhase] error => ', error);
  }
};

const updateProjectPhase = (phase) => async (dispatch) => {
  try {
    let isCompleted = false;
    const response = await projectAPI.updateProjectPhase(phase);

    if (response) {
      const { data: payload } = response;

      dispatch({ type: TYPES.EDIT_PROJECT, payload });
      isCompleted = true;
    }

    return isCompleted;
  } catch (error) {
    console.log('[updateProjectPhase] error => ', error);
  }
};

const deleteProjectPhase = (phase) => async (dispatch) => {
  try {
    let isCompleted = false;
    const response = await projectAPI.deleteProjectPhase(phase);

    if (response) {
      const { data: payload } = response;

      dispatch({ type: TYPES.EDIT_PROJECT, payload });
      isCompleted = true;
    }

    return isCompleted;
  } catch (error) {
    console.log('[deleteProjectPhase] error => ', error);
  }
};

export { getProjects, addProject, editProject, removeProject, createProjectPhase, updateProjectPhase, deleteProjectPhase };
