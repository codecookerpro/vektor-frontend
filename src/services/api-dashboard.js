import { get } from 'services/axios';

const getDashboards = async (data) => {
  const params = {
    get_json: JSON.stringify(data),
  };
  return get('dashboard', { params });
};

export { getDashboards };
