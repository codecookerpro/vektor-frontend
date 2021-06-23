export const INITIAL_STATE = Object.freeze({
  results: [],
});

export const fetchWorkflowTemplatesUpdater = (state, { payload }) => ({
  ...state,
  results: payload,
});

export const createWTDUpdater = (state, { payload }) => ({
  ...state,
  results: [...state.results, payload],
});

export const updateWTDUpdater = (state, { payload }) => ({
  ...state,
  results: state.results.map((wf) => (wf._id === payload._id ? payload : wf)),
});
