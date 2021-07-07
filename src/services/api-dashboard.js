import { getJQ, get } from 'services/axios';

export const getDashboards = async (data) => await getJQ('dashboard', data);
export const getFilteringData = async () => await get(['common', 'filtering-data']);
