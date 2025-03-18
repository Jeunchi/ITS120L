// 1. CSRF Protection - Add a CSRF token
// In your axios configuration file (create if you don't have one)
import axios from 'axios';

// Create an axios instance with default configuration
const api = axios.create({
  baseURL: 'http://localhost:8081',
  withCredentials: true // Important for cookies
});

// Add request interceptor to include CSRF token
api.interceptors.request.use(config => {
  const token = document.cookie.split('; ')
    .find(row => row.startsWith('XSRF-TOKEN='))
    ?.split('=')[1];
    
  if (token) {
    config.headers['X-XSRF-TOKEN'] = token;
  }
  return config;
});

export default api;