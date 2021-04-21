import axios from 'services/axios'

const getEvents = async (data) => {
  const params = {
    get_json: JSON.stringify(data)
  }
  return axios.get('/api/events', { params });
};

export {
  getEvents
};
