import { restrict } from 'utils/helpers/utility';

export const INITIAL_STATE = Object.freeze({
  results: [],
  organization: '',
  metaSystems: [],
  metaSystemsFilter: [],
  isMetaSystemsLoading: false,
  systemTrends: {},
  metaSystemClone: null,
});

export const fetchProjectsUpdater = (state, { payload: { results, organization } }) => ({
  ...state,
  results,
  organization,
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

export const fetchMetaSystemsUpdater = (state, { payload: updatedMetaSystems }) => ({
  ...state,
  metaSystems: updatedMetaSystems.reduce((acc, updated) => {
    const old = acc.find((old) => old._id === updated._id);
    if (old) {
      return acc.map((old) => (old._id === updated._id ? updated : old));
    } else {
      return [...acc, updated];
    }
  }, state.metaSystems),
});

export const fetchMetaSystemsFilterUpdater = (state, { payload: { data, isLoading } }) => ({
  ...state,
  isMetaSystemsLoading: isLoading,
  ...(data !== null && { metaSystemsFilter: data }),
});

export const createMetaSystemUpdater = (state, { payload }) => {
  const { project, _id } = payload;
  return {
    ...state,
    results: state.results.map((p) => (p._id === project ? { ...p, metaSystems: [...p.metaSystems, _id] } : p)),
    metaSystems: [...state.metaSystems, payload],
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
    metaSystems: state.metaSystems.map((ms) => (ms._id === metaSystem ? { ...ms, mainSystem: payload } : ms)),
  };
};
