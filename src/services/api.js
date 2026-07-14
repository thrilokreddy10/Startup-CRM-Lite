import axios from 'axios';
import toast from 'react-hot-toast';

// Create an Axios instance with base URL
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000'
});

// Request interceptor to automatically add the Authorization header
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('crm-token');
    if (token) {
      config.headers.Authorization = 'Bearer ' + token;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor for global error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (!error.response) {
      // Network error or server is down
      toast.error('Cannot connect to server. Check your connection.');
    } else if (error.response.status === 401) {
      // Unauthorized: invalid or expired token
      localStorage.removeItem('crm-token');
      // Prevent redirect loop if already on auth pages
      if (window.location.pathname !== '/login' && window.location.pathname !== '/register') {
        window.location.href = '/login';
      }
    }
    return Promise.reject(error);
  }
);

export default api;
