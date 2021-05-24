import * as TYPES from 'redux/types';
import * as dashboardAPI from 'services/api-dashboard';
import { isEmpty } from 'utils/helpers/utility';

const getDashboards =
  (refresh = false) =>
  async (dispatch, getState) => {
    try {
      const {
        dashboards: { results },
      } = getState();
      if (!refresh && !isEmpty(results)) {
        return;
      }

      const params = {
        filter: {},
      };
      const { data = [] } = await dashboardAPI.getDashboards(params);
      await dispatch({
        type: TYPES.FETCH_DASHBOARDS,
        payload: data,
      });
    } catch (error) {
      console.log('[getDashboards] error => ', error);
    }
  };

export { getDashboards };
