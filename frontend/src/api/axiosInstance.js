import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:5000/api',  // your backend API root
});

// Automatically attach token from localStorage to each request header
axiosInstance.interceptors.request.use(config => {
  const token = localStorage.getItem('token');  // JWT token saved on login
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;  // add token header
  }
  
  return config;
});

export default axiosInstance;