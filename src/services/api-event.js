import axios from 'services/axios'

const getEvents = async (data) => {
  return axios.get('/api/events', { data });
};

export {
  getEvents
};
