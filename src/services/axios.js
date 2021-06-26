import axios from 'axios';
import urljoin from 'url-join';

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

export const parseAxioParams = (args) => [urljoin(args.slice(0, -1)), args[args.length - 1]];

export const get = async (...args) => await apiAxios.get(...parseAxioParams(args));
export const post = async (...args) => await apiAxios.post(...parseAxioParams(args));
export const put = async (...args) => await apiAxios.put(...parseAxioParams(args));
export const del = async (...args) => await apiAxios.delete(...parseAxioParams(args));

export default apiAxios;
