import { createMetaSystem as createAPI } from 'services/api-meta-system';
import { CREATE_META_SYSTEM } from 'redux/types';

export const createMetaSystem = (params, onSuccess) => (dispatch) => {
  createAPI(params)
    .then(({ data }) => {
      dispatch({
        type: CREATE_META_SYSTEM,
        payload: data,
      });
      onSuccess(data);
    })
    .catch((err) => console.error('[createMetaSystem] error => ', err));
};
