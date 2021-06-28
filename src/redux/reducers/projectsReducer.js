import TYPES from 'utils/constants/action-types';

const INITIAL_STATE = Object.freeze({
  results: [],
  organization: '',
  metaSystems: {},
  metaSystemsFilter: [],
  isMetaSystemsLoading: false,
  systemTrends: {},
});

const projectsReducer = (state = INITIAL_STATE, { payload, type }) => {
  switch (type) {
    case TYPES.FETCH_PROJECTS: {
      const { results, organization } = payload;

      return {
        ...state,
        results,
        organization,
      };
    }

    case TYPES.EDIT_PROJECT: {
      const { _id: projectId } = payload;
      const { results } = state;
      const newResults = results.map((project) => (project._id === projectId ? payload : project));

      return {
        ...state,
        results: newResults,
      };
    }

    case TYPES.REMOVE_PROJECT: {
      const { results } = state;
      const { _id: projectId } = payload;
      const newProjects = results.filter(({ _id }) => _id !== projectId);

      return {
        ...state,
        results: newProjects,
      };
    }

    case TYPES.FETCH_META_SYSTEMS: {
      const { data, project } = payload;

      return {
        ...state,
        metaSystems: {
          ...state.metaSystems,
          [project]: data,
        },
      };
    }
    case TYPES.FETCH_META_SYSTEMS_FILTER: {
      const { data, isLoading } = payload;

      return {
        ...state,
        isMetaSystemsLoading: isLoading,
        ...(data !== null && { metaSystemsFilter: data }),
      };
    }
    case TYPES.CREATE_META_SYSTEM: {
      const { project, _id } = payload;

      return {
        ...state,
        results: state.results.map((p) => (p._id === project ? { ...p, metaSystems: [...p.metaSystems, _id] } : p)),
        metaSystems: {
          ...state.metaSystems,
          [project]: [...state.metaSystems[project], payload],
        },
      };
    }

    case TYPES.UPDATE_META_SYSTEM: {
      const { _id, name, equipmentCategory, equipmentType, equipmentName, equipmentNumber, project, productCode, site, projectPhase } = payload;

      return {
        ...state,
        metaSystems: {
          ...state.metaSystems,
          [project]: state.metaSystems[project].map((ms) =>
            ms._id === _id
              ? {
                  ...ms,
                  name,
                  equipmentCategory,
                  equipmentType,
                  equipmentName,
                  equipmentNumber,
                  project,
                  productCode,
                  site,
                  projectPhase,
                }
              : ms
          ),
        },
      };
    }

    case TYPES.DELETE_META_SYSTEM: {
      const { project, system } = payload;

      return {
        ...state,
        metaSystems: {
          ...state.metaSystems,
          [project]: state.metaSystems[project].filter((ms) => ms._id !== system),
        },
        results: state.results.map((p) =>
          p._id === project
            ? {
                ...p,
                metaSystems: p.metaSystems.filter((msid) => msid !== system),
              }
            : p
        ),
      };
    }
    case TYPES.FETCH_SYSTEM_TRENDS: {
      const { data, projectId } = payload;
      const { systemTrends } = state;

      return {
        ...state,
        systemTrends: {
          ...systemTrends,
          [projectId]: data,
        },
      };
    }

    case TYPES.UPDATE_DELIVERABLES: {
      const { project, metaSystem } = payload;

      return {
        ...state,
        metaSystems: {
          ...state.metaSystems,
          [project]: state.metaSystems[project].map((ms) => (ms._id === metaSystem ? { ...ms, mainSystem: payload } : ms)),
        },
      };
    }

    default:
      return state;
  }
};

export default projectsReducer;
