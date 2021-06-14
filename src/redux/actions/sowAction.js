import * as sowAPI from 'services/api-sow';
import * as TYPES from 'redux/types';

const getSOWs =
  (filter = {}, pagination = {}) =>
  async (dispatch, getState) => {
    try {
      const params = {
        skip: pagination.skip || 0,
        limit: pagination.limit || 10,
        filter,
      };
      const { data = [] } = await sowAPI.getSOWs(params);
      await dispatch({
        type: TYPES.FETCH_SOWS,
        payload: data,
      });
    } catch (error) {
      console.log('[getSOWs] error => ', error);
    }
  };

const addSOW = (sow) => async (dispatch, getState) => {
  try {
    const response = await sowAPI.createSOW(sow);

    if (response) {
      const {
        sows: { results },
      } = getState();
      const { data } = response;
      await dispatch({
        type: TYPES.FETCH_SOWS,
        payload: [data, ...results],
      });
    }
  } catch (error) {
    console.log('[addSOW] error => ', error);
  }
};

const setSelectedSOW = (sow) => {
  return {
    type: TYPES.SET_SELECTED_SOW,
    payload: sow,
  };
};

export { getSOWs, addSOW, setSelectedSOW };
