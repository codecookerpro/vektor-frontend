import * as TYPES from 'redux/types'
import * as projectAPI from 'services/api-project'
import { isEmpty } from 'utils/helpers/utility'

const getProjects = (refresh = false) => async (dispatch, getState) => {
  try {
    const { projects: { results } } = getState();
    if (!refresh && !isEmpty(results)) {
      return
    }

    const params = {
      skip: 1,
      limit: 10000
    }
    const { data = [] } = await projectAPI.getProjects(params)
    await dispatch({
      type: TYPES.FETCH_PROJECTS,
      payload: data
    });
  } catch (error) {
    console.log('[getProjects] error => ', error);
  }
};

const addProject = (project) => async (dispatch, getState) => {
  try {
    const { projects: { results } } = getState();

    const newProjects = [
      project,
      ...results
    ]

    dispatch({
      type: TYPES.FETCH_PROJECTS,
      payload: newProjects
    });
  } catch (error) {
    console.log('[addProject] error => ', error);
  }
};

const editProject = (project) => async (dispatch, getState) => {
  try {
    const { projects: { results } } = getState();

    const newProjects = results.map((item) => {
      if (item._id === project._id) {
        return project
      }
      return item
    })

    dispatch({
      type: TYPES.FETCH_PROJECTS,
      payload: newProjects
    });
  } catch (error) {
    console.log('[editProject] error => ', error);
  }
};

const removeProject = (project) => async (dispatch, getState) => {
  try {
    const { projects: { results } } = getState();

    const newProjects = results.filter((item) => item._id !== project._id)

    dispatch({
      type: TYPES.FETCH_PROJECTS,
      payload: newProjects
    });
  } catch (error) {
    console.log('[removeProject] error => ', error);
  }
};

export {
  getProjects,
  addProject,
  editProject,
  removeProject
};
