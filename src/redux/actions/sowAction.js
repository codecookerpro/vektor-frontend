import * as sowAPI from 'services/api-sow';
import * as TYPES from 'redux/types';

const getSOWs =
  (filter = {}) =>
  async (dispatch, getState) => {
    try {
      const params = {
        skip: 0,
        limit: 10000,
        filter,
      };
      const { data = [] } = await sowAPI.getSOWs(params);
      await dispatch({
        type: TYPES.FETCH_SOWS,
        payload: data,
      });
    } catch (error) {
      console.log('[getOrganizations] error => ', error);
    }
  };

export { getSOWs };
