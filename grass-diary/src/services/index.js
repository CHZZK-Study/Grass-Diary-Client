import axios from 'axios';
import { clearAuth } from '@utils/authUtils';

const API_URI = import.meta.env.VITE_API_URI;

const API = axios.create({
  baseURL: `${API_URI}/api`,
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
