import TYPES from 'utils/constants/action-types';
import * as projectAPI from 'services/api-project';

const getProjects =
  (params = {}, refresh = false) =>
  (dispatch, getState) => {
    const projects = getState().projects.results;

    if (!refresh && projects.length) {
      return;
    }

    projectAPI
      .getProjects(params)
      .then((response) => dispatch({ type: TYPES.FETCH_PROJECTS, payload: response }))
      .catch((error) => console.log('[getProjects] error => ', error));
  };

const addProject = (project) => async (dispatch, getState) => {
  projectAPI
    .createProject(project)
    .then(({ data }) => dispatch({ type: TYPES.FETCH_PROJECTS, payload: [...getState().projects.results, data] }))
    .catch((error) => console.log('[addProject] error => ', error));
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
      dispatch({ type: TYPES.DELETE_PROJECT, payload: project });
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
