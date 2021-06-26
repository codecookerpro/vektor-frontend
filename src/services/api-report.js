import { get } from 'services/axios';

const getReports = async (data) => {
  const params = {
    get_json: JSON.stringify(data),
  };
  return get('reports', { params });
};

export { getReports };
