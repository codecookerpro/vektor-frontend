import { createMetaSystem } from 'services/api-meta-system';
import { CREATE_META_SYSTEM } from 'redux/types';
import { showError } from './popupActions';

export const createAction = (params) => (dispatch) => {
  createMetaSystem(params)
    .then(({ data }) =>
      dispatch({
        type: CREATE_META_SYSTEM,
        payload: data,
      })
    )
    .catch((err) => console.log(err));
};
