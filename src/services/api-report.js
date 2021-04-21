import axios from 'services/axios'

const getReports = async (data) => {
  return axios.get('/api/reports', { data });
};

export {
  getReports
};
