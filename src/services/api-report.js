import { getJQ } from 'services/axios';

const getReports = async (data) => getJQ('reports', data);

export { getReports };
