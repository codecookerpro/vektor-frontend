import { get } from 'services/axios';

const getEvents = async (data) => {
  const params = {
    get_json: JSON.stringify(data),
  };
  return get('events', { params });
};

export { getEvents };
