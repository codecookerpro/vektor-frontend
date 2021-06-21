import {
  createMetaSystem as createAPI,
  getMetaSystems as readAPI,
  updateMetaSystem as updateAPI,
  deleteMetaSystem as deleteAPI,
} from 'services/api-meta-system';
import { CREATE_META_SYSTEM, FETCH_META_SYSTEMS, DELETE_META_SYSTEM, UPDATE_META_SYSTEM, FETCH_META_SYSTEMS_FILTER } from 'redux/types';
import { isEmpty } from 'utils/helpers/utility';

export const getMetaSystemsFilter = (data, isLoading = false) => ({
  type: FETCH_META_SYSTEMS_FILTER,
  payload: { data, isLoading },
});

export const createMetaSystem = (params) => (dispatch) => {
  createAPI(params)
    .then(({ data }) => {
      dispatch({
        type: CREATE_META_SYSTEM,
        payload: data,
      });
    })
    .catch((err) => console.error('[createMetaSystem] error => ', err));
};

export const readMetaSystem =
  (project, refresh = false) =>
  (dispatch, getState) => {
    const {
      projects: { metaSystems },
    } = getState();

    if (metaSystems[project] && !refresh) {
      return;
    }

    const params = {
      sort: 'name',
      ...(!isEmpty(project) && { filter: { project } }),
    };

    readAPI(params)
      .then(({ data }) => {
        dispatch({
          type: FETCH_META_SYSTEMS,
          payload: { data, project },
        });
      })
      .catch((err) => console.error('[readMetaSystem] error => ', err));
  };

export const updateMetaSystem = (params) => (dispatch) => {
  updateAPI(params)
    .then(({ data }) => {
      dispatch({
        type: UPDATE_META_SYSTEM,
        payload: data,
      });
    })
    .catch((err) => console.error('[updateMetaSystem] error => ', err));
};

export const deleteMetaSystem = (project, system) => (dispatch) => {
  deleteAPI({ _id: system })
    .then(() => {
      dispatch({
        type: DELETE_META_SYSTEM,
        payload: { project, system },
      });
    })
    .catch((err) => console.error('[deleteMetaSystem] error => ', err));
};

export const fetchMetaSystemsFilter = (project) => async (dispatch) => {
  dispatch(getMetaSystemsFilter(null, true));
  const params = {
    sort: 'name',
    filter: { project },
  };

  const response = await readAPI(params).catch((err) => console.error('[fetchMetaSystemsFilter] error => ', err));

  if (response) {
    const { data } = response;

    dispatch(getMetaSystemsFilter(data));
  }
};
