import * as API from 'services/api-meta-system';
import { isEmpty } from 'utils/helpers/utility';
import ActionTypes from 'utils/constants/action-types';

export const getMetaSystemsFilter = (data, isLoading = false) => ({
  type: ActionTypes.FETCH_META_SYSTEMS_FILTER,
  payload: { data, isLoading },
});

export const createMetaSystem = (params) => (dispatch) => {
  API.createMetaSystem(params)
    .then(({ data }) => {
      dispatch({
        type: ActionTypes.CREATE_META_SYSTEM,
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

    API.getMetaSystems(params)
      .then(({ data }) => {
        dispatch({
          type: ActionTypes.FETCH_META_SYSTEMS,
          payload: { data, project },
        });
      })
      .catch((err) => console.error('[readMetaSystem] error => ', err));
  };

export const updateMetaSystem = (params) => (dispatch) => {
  API.updateMetaSystem(params)
    .then(({ data }) => {
      dispatch({
        type: ActionTypes.UPDATE_META_SYSTEM,
        payload: data,
      });
    })
    .catch((err) => console.error('[updateMetaSystem] error => ', err));
};

export const deleteMetaSystem = (project, system) => (dispatch) => {
  API.deleteMetaSystem({ _id: system })
    .then(() => {
      dispatch({
        type: ActionTypes.DELETE_META_SYSTEM,
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

  const response = await API.getMetaSystems(params).catch((err) => console.error('[fetchMetaSystemsFilter] error => ', err));

  if (response) {
    const { data } = response;

    dispatch(getMetaSystemsFilter(data));
  }
};

export const initDeliverables = (params) => (dispatch) => {
  API.initDeliverables(params)
    .then(({ data }) => {
      dispatch({
        type: ActionTypes.INIT_DELIVERABLES,
        payload: data,
      });
    })
    .catch((err) => console.error('[initDeliverables] error => ', err));
};

export const updateDeliverables = (payload) => ({
  type: ActionTypes.UPDATE_DELIVERABLES,
  payload,
});

export const createDeliverable = (params) => (dispatch) => {
  API.createDeliverable(params)
    .then(({ data }) => dispatch(updateDeliverables(data)))
    .catch((err) => console.error('[createDeliverable] error => ', err));
};

export const updateDeliverable = (params) => (dispatch) => {
  API.updateDeliverable(params)
    .then(({ data }) => dispatch(updateDeliverables(data)))
    .catch((err) => console.error('[updateDeliverable] error => ', err));
};

export const deleteDeliverable = (params) => (dispatch) => {
  API.deleteDeliverable(params)
    .then(({ data }) => dispatch(updateDeliverables(data)))
    .catch((err) => console.error('[deleteDeliverable] error => ', err));
};

export const updateDeliverablePositions = (params) => (dispatch) => {
  API.updateDeliverablePositions(params)
    .then(({ data }) => dispatch(updateDeliverables(data)))
    .catch((err) => console.error('[updateDeliverablePositions] error => ', err));
};

export const getSystemHistory =
  (projectId, refresh = false) =>
  async (dispatch, getState) => {
    try {
      const {
        projects: { systemTrends },
      } = getState();

      if (systemTrends[projectId] && !refresh) {
        return;
      }

      const params = {
        filter: { project: projectId },
      };

      const response = await API.getSystemHistory(params);

      if (response) {
        const { data } = response;

        dispatch({
          type: ActionTypes.FETCH_SYSTEM_TRENDS,
          payload: { data, projectId },
        });
      }
    } catch (error) {
      console.log('[getSystemHistory] error => ', error);
    }
  };
