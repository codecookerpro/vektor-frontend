import TYPES from 'utils/constants/action-types';
import * as eventAPI from 'services/api-event';

export const getEvents = (pagination, filter) => (dispatch) => {
  const params = {
    ...pagination,
    filter,
  };

  eventAPI
    .getEvents(params)
    .then((resp) => dispatch({ type: TYPES.FETCH_EVENTS, payload: resp }))
    .catch((error) => console.log('[getEvents] error => ', error));
};

export const getLatestEvents = () => async (dispatch) => {
  try {
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
