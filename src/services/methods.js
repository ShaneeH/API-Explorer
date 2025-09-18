import axios from 'axios';

// Base configuration
const DEFAULT_TIMEOUT = 8000;

const apiClient = axios.create({
  timeout: 5000, // Base timeout
  headers: {
    'Content-Type': 'application/json',
  },
});

// Error handling
const handleApiError = (error) => {
  if (error.response) {
    return `Error: ${error.response.status} - ${error.response.data?.message || 'Unknown error'}`;
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
    let responseData = null;

    try {
      const response = await apiClient({ method, url, timeout, ...options });
      responseData = normalizeResponse({ data: response.data, status: response.status }, true);
    } catch (error) {
      const errMessage = handleApiError(error);
      responseData = normalizeResponse({ data: null, status: 500 }, false, errMessage);
    } finally {
      responseData.time = Math.round(performance.now() - startTime);
      return responseData;
    }
  },

  async get(url, params = {}, timeout = DEFAULT_TIMEOUT) {
    return this.request('get', url, { params }, timeout);
  },

  async post(url, data = {}, content = 'json', timeout = DEFAULT_TIMEOUT) {
    const headers = { ...apiClient.defaults.headers, 'Content-Type': `application/${content}` };
    return this.request('post', url, { data, headers }, timeout);
  },

  async put(url, data = {}, timeout = DEFAULT_TIMEOUT) {
    return this.request('put', url, { data }, timeout);
  },

  async delete(url, params = {}, timeout = DEFAULT_TIMEOUT) {
    return this.request('delete', url, { params }, timeout);
  },
};

export default apiService;
