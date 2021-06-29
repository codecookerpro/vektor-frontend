import { getJQ } from 'services/axios';

const getDashboards = async (data) => await getJQ('dashboard', data);

export { getDashboards };
