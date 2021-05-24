import axios from 'services/axios';

const getReports = async (data) => {
  const params = {
    get_json: JSON.stringify(data),
  };
  return axios.get('/api/reports', { params });
};

export { getReports };
