export const INITIAL_STATE = Object.freeze({
  results: [],
  latest: [],
  pagination: { count: 0 },
});

export const fetchEventsUpdater = (state, { payload: { data, pagination } }) => ({
  ...state,
  results: data,
  pagination,
});

export const fetchLatestEventsUpdater = (state, { payload }) => ({
  ...state,
  latest: payload,
});
