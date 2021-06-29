import axios from 'axios';
import urlJoin from 'url-join';

import { API_PROXY_URL } from 'config';

const apiAxios = axios.create({
  baseURL: API_PROXY_URL,
  headers: {
    'Content-Type': 'application/json; charset=utf-8',
  },
});

apiAxios.interceptors.response.use((response) => {
  return response.data;
});

export const composeUrl = (urlData) => {
  if (typeof urlData === 'string') {
    return urlData;
  } else if (Array.isArray(urlData)) {
    return urlJoin(urlData);
  } else {
    console.trace('Incorrect usage of wrapped axios request');
  }
};

/**
 * Used to send JSON data via GET query parameter
 * @param {String|String[]} urlData string or array of strings
 * @param {Object} data request data
 * @returns {Promise<AxiosResponse<any>>}
 */
export const getJQ = async (urlData, data) => await apiAxios.get(composeUrl(urlData), { params: { get_json: JSON.stringify(data) } });
export const get = async (urlData, params) => await apiAxios.get(composeUrl(urlData), params);
export const post = async (urlData, params) => await apiAxios.post(composeUrl(urlData), params);
export const put = async (urlData, params) => await apiAxios.put(composeUrl(urlData), params);
export const del = async (urlData, params) => await apiAxios.delete(composeUrl(urlData), { params });

export default apiAxios;
