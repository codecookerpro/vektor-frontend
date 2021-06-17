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
      const response = await sowAPI.getSOWs(params);
      const { data = [] } = response;
      const {
        sows: { sow },
      } = getState();
      if (sow && sow._id) {
        const filterSow = data.filter((item) => item._id === sow._id);
        await dispatch({
          type: TYPES.SET_SELECTED_SOW,
          payload: filterSow[0],
        });
      }
      await dispatch({
        type: TYPES.FETCH_SOWS,
        payload: response,
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

const editSOW = (sow) => async (dispatch, getState) => {
  try {
    await sowAPI.updateSOW(sow);
    dispatch(getSOWs());
  } catch (error) {
    console.log('[updateSOW] error => ', error);
  }
};

const setSelectedSOW = (sow) => {
  return {
    type: TYPES.SET_SELECTED_SOW,
    payload: sow,
  };
};

const addSOWFile = (params) => async (dispatch, getState) => {
  try {
    const { _id, file, phase } = params;
    let formData = new FormData();
    formData.append('_id', _id);
    formData.append('phase', phase);
    formData.append('file', file, file.name);
    await sowAPI.createSOWFile(formData);
    dispatch(getSOWs());
  } catch (error) {
    console.log('[addSOWFile] error => ', error);
  }
};

const removeSOWFile = (params) => async (dispatch, getState) => {
  try {
    await sowAPI.deleteSOWFileUrl(params);
    dispatch(getSOWs());
  } catch (error) {
    console.log('[removeSOWFile] error => ', error);
  }
};

const getSOWFile = (params) => async (dispatch, getState) => {
  try {
    const { url } = await sowAPI.getSOWFile(params);
    window.open(url);
  } catch (error) {
    console.log('[getSOWFile] error => ', error);
  }
};

export { getSOWs, addSOW, setSelectedSOW, addSOWFile, removeSOWFile, editSOW, getSOWFile };
