import TYPES from 'utils/constants/action-types';

const INITIAL_STATE = Object.freeze({
  results: [],
});

const usersReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case TYPES.FETCH_USERS:
      return {
        ...state,
        results: action.payload.map((u) => ({ ...u, label: `${u.name} (${u.email})` })),
      };
    default:
      return state;
  }
};

export default usersReducer;
