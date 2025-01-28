import axios from 'axios';

// Base configuration for Axios
const DEFAULT_TIMEOUT = 8000; // Centralized default timeout

const apiClient = axios.create({
  timeout: 5000, // Base timeout for axios
  headers: {
    'Content-Type': 'application/json',
  },
});

// Error handling function
const handleApiError = (error) => {
  if (error.response) {
    return `Error: ${error.response.status} - ${error.response.data.message || 'Unknown error'}`;
  } else if (error.request) {
    return 'No response received from the server';
  } else {
    return `Request setup failed: ${error.message}`;
  }
};

// Response normalization
const normalizeResponse = ({ data, status, duration }, isSuccess = true, errMessage = '') => ({
  data: data || null,
  code: status || 500,
  isSuccess,
  errMessage,
  time: duration || 0,
});

// API Service
export const apiService = {
  async request(method, url, options = {}, timeout = DEFAULT_TIMEOUT) {
    const startTime = performance.now();

    try {
      const response = await apiClient({
        method,
        url,
        timeout,
        ...options,
      });

      const duration = Math.round(performance.now() - startTime);
      return normalizeResponse({ ...response, duration });
    } catch (error) {
      const duration = Math.round(performance.now() - startTime);
      const errMessage = handleApiError(error);
      return normalizeResponse({ data: null, status: 500, duration }, false, errMessage);
    }
  },

  async get(url, params = {}, timeout = DEFAULT_TIMEOUT) {
    return this.request('get', url, { params }, timeout);
  },

  async post(url, data = {}, content = 'json', timeout = DEFAULT_TIMEOUT) {
    const headers = { 'Content-Type': `application/${content}` };
    return this.request('post', url, { data, headers }, timeout);
  },
};
