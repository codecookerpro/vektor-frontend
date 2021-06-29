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

export const parseAxiosParams = (args) => [urlJoin(args.slice(0, -1)), args[args.length - 1]];

export const composeUrl = (urlData) => {
  if (urlData instanceof String) {
    return urlData;
  } else if (urlData instanceof Array) {
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
export const getJQ = async (urlData, data) => await apiAxios.get(composeUrl(urlData), { get_json: JSON.stringify(data) });
export const get = async (...args) => await apiAxios.get(...parseAxiosParams(args));
export const post = async (...args) => await apiAxios.post(...parseAxiosParams(args));
export const put = async (...args) => await apiAxios.put(...parseAxiosParams(args));
export const del = async (...args) => await apiAxios.delete(...parseAxiosParams(args));

export default apiAxios;
