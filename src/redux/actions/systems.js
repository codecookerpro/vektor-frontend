import * as TYPES from 'redux/types';
import * as systemAPI from 'services/api-system';
import { isEmpty } from 'utils/helpers/utility';

const getSystemHistory =
  (filterParams = {}) =>
  async (dispatch) => {
    try {
      const params = {
        ...(!isEmpty(filterParams) && {
          filter: filterParams,
        }),
      };

      const response = await systemAPI.getSystemHistory(params);

      if (response) {
        const { data: payload } = response;

        dispatch({
          type: TYPES.FETCH_SYSTEM_TRENDS,
          payload,
        });
      }
    } catch (error) {
      console.log('[getProjects] error => ', error);
    }
  };

export { getSystemHistory };
