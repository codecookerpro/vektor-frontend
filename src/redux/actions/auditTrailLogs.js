import * as TYPES from 'redux/types'
import * as auditTrailLogAPI from 'services/api-audit-trail-log'
import { isEmpty } from 'utils/helpers/utility'
import data from 'utils/temp/audit-trail-logs'

const getAuditTrailLogs = (refresh = false) => async (dispatch, getState) => {
  try {
    const { auditTrailLogs: { results } } = getState();
    if (!refresh && !isEmpty(results)) {
      return
    }

    const params = {
      skip: 1,
      limit: 10000
    }
    if (false) {
      const { data = [] } = await auditTrailLogAPI.getAuditTrailLogs(params)
      await dispatch({
        type: TYPES.FETCH_AUDIT_TRAIL_LOGS,
        payload: data
      });
    }

    await dispatch({
      type: TYPES.FETCH_AUDIT_TRAIL_LOGS,
      payload: data
    });
  } catch (error) {
    console.log('[getAuditTrailLogs] error => ', error);
  }
};

export {
  getAuditTrailLogs,
};
