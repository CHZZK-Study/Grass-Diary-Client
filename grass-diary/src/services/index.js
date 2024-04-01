import axios from 'axios';
import { clearAuth } from '../utils/authUtils';

const API = axios.create({
  baseURL: 'https://grassdiary-server.shop/api',
});

API.interceptors.request.use(
  config => {
    const accessToken = localStorage.getItem('accessToken');
    if (accessToken) config.headers.Authorization = `Bearer ${accessToken}`;

    return config;
  },

  error => Promise.reject(error),
);

API.interceptors.response.use(
  response => response,
  error => {
    if (error.response && error.response.status === 500) {
      clearAuth();
    }

    return Promise.reject(error);
  },
);

export default API;
