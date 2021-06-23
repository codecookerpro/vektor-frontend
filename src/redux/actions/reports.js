import TYPES from 'utils/constants/action-types';
import * as reportAPI from 'services/api-report';
import { isEmpty } from 'utils/helpers/utility';

const getReports =
  (params, refresh = false) =>
  async (dispatch, getState) => {
    try {
      const {
        reports: { results },
      } = getState();

      if (!refresh && !isEmpty(results)) {
        return;
      }

      const qparams = {
        skip: 0,
        limit: 1000,
        ...(!isEmpty(params) && { filter: { ...params } }),
      };
      const { data = [] } = await reportAPI.getReports(qparams);
      await dispatch({
        type: TYPES.FETCH_REPORTS,
        payload: data,
      });
    } catch (error) {
      console.log('[getReports] error => ', error);
    }
  };

export { getReports };
