import TYPES from 'utils/constants/action-types';
import * as eventAPI from 'services/api-event';
import { isEmpty } from 'utils/helpers/utility';

export const getEvents =
  (pagination, filter, refresh = false) =>
  (dispatch, getState) => {
    const events = getState().events.results;

    if (!refresh && !isEmpty(events)) {
      return;
    }

    const params = {
      ...pagination,
      filter,
    };

    eventAPI
      .getEvents(params)
      .then((resp) => dispatch({ type: TYPES.FETCH_EVENTS, payload: resp }))
      .catch((error) => console.log('[getEvents] error => ', error));
  };

export const getLatestEvents =
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
