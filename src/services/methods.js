import axios from 'axios';

// Base configuration for Axios
const apiClient = axios.create({
    timeout: 8000, // Default timeout
    headers: {
        'Content-Type': 'application/json',
    },
});

// Error handling function
const handleApiError = (error) => {
    let errorMessage = 'An error occurred';
    
    if (error.response) {
        // Server returned a response outside of 2xx range
        errorMessage = `Error: ${error.response.status} - ${error.response.data.message || 'Unknown error'}`;
    } else if (error.request) {
        // No response was received
        errorMessage = 'No response received from the server';
    } else {
        // Something else happened while setting up the request
        errorMessage = `Request setup failed: ${error.message}`;
    }
    
    console.error(errorMessage);
    return errorMessage;
};

// Response normalization
const normalizeResponse = (response, isSuccess = true) => ({
    data: response.data || null,
    code: response.status || 200,
    isSuccess,
    errMessage: isSuccess ? '' : 'An error occurred',
    time: response.duration || 0,
});

export const apiService = {
    // Default GET Request
    async get(url, params = {}, timeout = 8000) {
        const startTime = performance.now();
        try {
            const response = await apiClient.get(url, { params, timeout });
            const endTime = performance.now();
            response.duration = Math.round(endTime - startTime);
            return normalizeResponse(response);
        } catch (error) {
            const endTime = performance.now();
            const duration = Math.round(endTime - startTime);
            return normalizeResponse({ data: null, status: 500, duration }, false);
        }
    },

    // Default POST Request
    async post(url, data = {}, content = 'json') {
        const startTime = performance.now();
        try {
            const contentType = `application/${content}`;
            const response = await apiClient.post(url, data, {
                headers: { 'Content-Type': contentType },
            });
            const endTime = performance.now();
            response.duration = Math.round(endTime - startTime);
            return normalizeResponse(response);
        } catch (error) {
            const endTime = performance.now();
            const duration = Math.round(endTime - startTime);
            return normalizeResponse({ data: null, status: 500, duration }, false);
        }
    },
};
