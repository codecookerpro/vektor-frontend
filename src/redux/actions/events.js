import * as TYPES from 'redux/types';
import * as eventAPI from 'services/api-event';
import { isEmpty } from 'utils/helpers/utility';

const getEvents =
  (refresh = false) =>
  async (dispatch, getState) => {
    try {
      const {
        events: { results },
      } = getState();
      if (!refresh && !isEmpty(results)) {
        return;
      }

      const params = {
        skip: 0,
        limit: 10000,
      };
      const { data = [] } = await eventAPI.getEvents(params);
      await dispatch({
        type: TYPES.FETCH_EVENTS,
        payload: data,
      });
    } catch (error) {
      console.log('[getEvents] error => ', error);
    }
  };

const getLatestEvents =
  (refresh = false) =>
  async (dispatch, getState) => {
    try {
      const {
        events: { latest },
      } = getState();
      if (!refresh && !isEmpty(latest)) {
        return;
      }

      const params = {
        skip: 0,
        limit: 10,
      };
      const { data = [] } = await eventAPI.getEvents(params);
      await dispatch({
        type: TYPES.FETCH_LATEST_EVENTS,
        payload: data,
      });
    } catch (error) {
      console.log('[getLatestEvents] error => ', error);
    }
  };

export { getEvents, getLatestEvents };
