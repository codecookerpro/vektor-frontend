import * as sowAPI from 'services/api-sow';
import * as TYPES from 'redux/types';

const getSOWs =
  (filter = {}, pagination = {}) =>
  async (dispatch, getState) => {
    try {
      const params = {
        skip: pagination.skip || 0,
        limit: pagination.skip || 1000,
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
