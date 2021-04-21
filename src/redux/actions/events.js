import * as TYPES from 'redux/types'
import * as eventAPI from 'services/api-event'
import { isEmpty } from 'utils/helpers/utility'

const getEvents = (refresh = false) => async (dispatch, getState) => {
  try {
    const { events: { results } } = getState();
    if (!refresh && !isEmpty(results)) {
      return
    }

    const params = {
      skip: 1,
      limit: 5
    }
    const { data = [] } = await eventAPI.getEvents(params)
    await dispatch({
      type: TYPES.FETCH_EVENTS,
      payload: data
    });
  } catch (error) {
    console.log('[getEvents] error => ', error);
  }
};

export {
  getEvents
};
