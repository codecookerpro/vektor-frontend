import { getJQ } from 'services/axios';

const getEvents = async (data) => await getJQ('events', data);

export { getEvents };
