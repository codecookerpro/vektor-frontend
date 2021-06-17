import {
  createMetaSystem as createAPI,
  getMetaSystems as readAPI,
  updateMetaSystem as updateAPI,
  deleteMetaSystem as deleteAPI,
  initDeliverables as initDeliverablesAPI,
} from 'services/api-meta-system';
import { CREATE_META_SYSTEM, FETCH_META_SYSTEMS, DELETE_META_SYSTEM, UPDATE_META_SYSTEM, INIT_DELIVERABLES } from 'redux/types';

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

    readAPI({ filter: { project }, sort: 'name' })
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

export const initDeliverables = (params) => (dispatch) => {
  initDeliverablesAPI(params)
    .then(({ data }) => {
      dispatch({
        type: INIT_DELIVERABLES,
        payload: data,
      });
    })
    .catch((err) => console.error('[initDeliverables] error => ', err));
};
