import axios from 'axios';

export const API_URI = import.meta.env.VITE_API_URI;

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

// API.interceptors.response.use(
//   response => response,
//   error => {
//     if (error.response && error.response.status === 500) {
//       localStorage.removeItem('accessToken');
//       window.location.href = '/';
//     }

//     return Promise.reject(error);
//   },
// );

export default API;
