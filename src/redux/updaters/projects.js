import { restrict } from 'utils/helpers/utility';
import { roundMetaSystem, updatePool } from './helper';

export const INITIAL_STATE = Object.freeze({
  results: [],
  pagination: { count: 0 },
  metaSystems: [],
  metaSystemsFilter: [],
  isMetaSystemsLoading: false,
  systemTrends: {},
  metaSystemClone: null,
});

export const fetchProjectsUpdater = (state, { payload }) => ({
  ...state,
  results: payload.data,
  pagination: payload.pagination || state.pagination,
});

export const addProjectUpdater = (state, { payload }) => ({
  ...state,
  results: [payload, ...state.results],
});

export const editProjectUpdater = (state, { payload }) => {
  const { _id: projectId } = payload;
  const { results } = state;
  const newResults = results.map((project) => (project._id === projectId ? payload : project));

  return {
    ...state,
    results: newResults,
  };
};

export const deleteProjectUpdater = (state, { payload }) => {
  const { results } = state;
  const { _id: projectId } = payload;
  const newProjects = results.filter(({ _id }) => _id !== projectId);

  return {
    ...state,
    results: newProjects,
  };
};

export const fetchMetaSystemsUpdater = (state, { payload }) => ({
  ...state,
  metaSystems: updatePool(state.metaSystems, payload).map(roundMetaSystem),
});

export const createMetaSystemUpdater = (state, { payload }) => {
  const {
    data: { project, _id },
    autoCreatedSystems,
  } = payload;
  const autoIds = autoCreatedSystems.map((s) => s._id);

  return {
    ...state,
    results: state.results.map((p) => (p._id === project ? { ...p, metaSystems: [...p.metaSystems, _id, ...autoIds] } : p)),
    metaSystems: [...state.metaSystems, payload.data, ...autoCreatedSystems],
    metaSystemClone: null,
  };
};

export const updateMetaSystemUpdater = (state, { payload }) => {
  const restricted = restrict(payload, [
    '_id',
    'name',
    'equipmentCategory',
    'equipmentType',
    'equipmentName',
    'equipmentNumber',
    'project',
    'productCode',
    'site',
    'projectPhase',
  ]);

  return {
    ...state,
    metaSystems: state.metaSystems.map((ms) => (ms._id === payload._id ? { ...ms, ...restricted } : ms)),
  };
};

export const deleteMetaSystemUpdater = (state, { payload: { project, system } }) => ({
  ...state,
  metaSystems: state.metaSystems.filter((ms) => ms._id !== system),
  results: state.results.map((p) =>
    p._id === project
      ? {
          ...p,
          metaSystems: p.metaSystems.filter((msid) => msid !== system),
        }
      : p
  ),
});

export const duplicateMetaSystemUpdater = (state, { payload }) => ({
  ...state,
  metaSystemClone: payload,
});

export const fetchSystemTrendsUpdater = (state, { payload: { data, projectId } }) => ({
  ...state,
  systemTrends: {
    ...state.systemTrends,
    [projectId]: data,
  },
});

export const updateDeliverablesUpdater = (state, { payload }) => {
  const { metaSystem } = payload;
  return {
    ...state,
    metaSystems: state.metaSystems.map((ms) => (ms._id === metaSystem ? { ...ms, mainSystem: roundMetaSystem(payload) } : ms)),
  };
};
