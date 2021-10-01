import * as API from 'services/api-meta-system';
import { exclude, isEmpty } from 'utils/helpers/utility';
import ActionTypes from 'utils/constants/action-types';

export const createMetaSystem = (params) => (dispatch, getState) => {
  API.createMetaSystem(params)
    .then(({ data, autoCreatedSystems }) => {
      const metaSystem = getState().projects.metaSystemClone;

      if (metaSystem) {
        const {
          mainSystem: { deliverables },
        } = metaSystem;
        dispatch(initDeliverables({ _id: data.mainSystem._id, deliverables: deliverables.map((d) => exclude(d, ['calculated'])) }));
      }

      dispatch({ type: ActionTypes.CREATE_META_SYSTEM, payload: { data, autoCreatedSystems } });
    })
    .catch((err) => console.error('[createMetaSystem] error => ', err));
};

export const readMetaSystem =
  ({ project = null, system = null, mainSystem = null } = {}, refresh = false) =>
  (dispatch, getState) => {
    const {
      projects: { metaSystems, metaSystemClone },
    } = getState();

    if (project && metaSystems.filter((s) => s.project === project) && !refresh) {
      return;
    } else if (system && !isEmpty(metaSystems.find((s) => s._id === system)) && !refresh) {
      return;
    } else if (!isEmpty(metaSystemClone)) {
      return;
    }

    const params = {
      sort: 'name',
      filter: {
        project: project || undefined,
        _id: system || undefined,
        mainSystem: mainSystem || undefined,
      },
    };

    API.getMetaSystems(params)
      .then(({ data }) => dispatch({ type: ActionTypes.FETCH_META_SYSTEMS, payload: data }))
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

export const duplicateMetaSystem = (system) => ({
  type: ActionTypes.DUPLICATE_META_SYSTEM,
  payload: system,
});

export const updateDeliverables = (payload) => ({
  type: ActionTypes.UPDATE_DELIVERABLES,
  payload,
});

export const updateDeliverableNotes = (mainId, deliverable, notes) => ({
  type: ActionTypes.UPDATE_DELIVERABLE_NOTES,
  payload: { mainId, deliverable, notes },
});

export const initDeliverables = (params) => (dispatch) => {
  API.initDeliverables(params)
    .then(({ data }) => dispatch(updateDeliverables(data)))
    .catch((err) => console.error('[initDeliverables] error => ', err));
};

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

export const createDeliverableNote = (params) => (dispatch) => {
  API.createDeliverableNote(params)
    .then(({ data }) => dispatch(updateDeliverableNotes(params.mainId, params._id, data)))
    .catch((err) => console.error('[createDeliverableNote] error => ', err));
};

export const updateDeliverableNote = (params) => (dispatch) => {
  API.updateDeliverableNote(params)
    .then(({ data }) => dispatch(updateDeliverableNotes(params.mainId, params._id, data)))
    .catch((err) => console.error('[updateDeliverableNote] error => ', err));
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
