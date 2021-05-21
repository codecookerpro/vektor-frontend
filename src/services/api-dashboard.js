import axios from 'services/axios';

const getDashboards = async (data) => {
  const params = {
    get_json: JSON.stringify(data),
  };
  return axios.get('/api/dashboard', { params });
};

export { getDashboards };
