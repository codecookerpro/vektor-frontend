export const INITIAL_STATE = Object.freeze({
  results: [],
  pagination: { count: 0 },
  templateClone: null,
});

export const fetchWTUpdater = (state, { payload }) => ({
  ...state,
  results: payload.data,
  pagination: payload.pagination,
});

export const createWTUpdater = (state, { payload }) => ({
  ...state,
  results: [...state.results, payload],
  templateClone: null,
});

export const updateWTUpdater = (state, { payload }) => ({
  ...state,
  results: state.results.map((wt) => (wt._id === payload._id ? payload : wt)),
});

export const deleteWTUpdater = (state, { payload: templateId }) => ({
  ...state,
  results: state.results.filter((wt) => wt._id !== templateId),
});

export const duplicateWTUpdater = (state, { payload }) => ({
  ...state,
  templateClone: payload,
});

export const createWTDUpdater = (state, { payload }) => ({
  ...state,
  results: [...state.results, payload],
});

export const updateWTDUpdater = (state, { payload }) => ({
  ...state,
  results: state.results.map((wf) => (wf._id === payload._id ? payload : wf)),
});
