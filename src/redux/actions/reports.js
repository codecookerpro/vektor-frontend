import * as TYPES from 'redux/types'
import * as reportAPI from 'services/api-report'
import { isEmpty } from 'utils/helpers/utility'

const getReports = (refresh = false) => async (dispatch, getState) => {
  try {
    const { reports: { results } } = getState();
    if (!refresh && !isEmpty(results)) {
      return
    }

    const params = {
      skip: 0,
      limit: 10000
    }
    const { data = [] } = await reportAPI.getReports(params)
    await dispatch({
      type: TYPES.FETCH_REPORTS,
      payload: data
    });
  } catch (error) {
    console.log('[getReports] error => ', error);
  }
};

export {
  getReports
};
