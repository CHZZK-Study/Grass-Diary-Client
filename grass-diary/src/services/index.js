import axios from 'axios';
import useLogout from '@hooks/useLogout';

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
    const clearAuth = useLogout();

    if (error.response && error.response.status === 500) {
      clearAuth();
    }

    return Promise.reject(error);
  },
);

export default API;
