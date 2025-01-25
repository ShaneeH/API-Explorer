import axios from 'axios';

// Base configuration for Axios

const apiClient = axios.create({
    timeout: 5000, // Adjust the timeout as needed
    headers: {
        'Content-Type': 'application/json',
    },
});

export const apiService = {

    //This is the Default GET Request
    async get(url, params = {}) {
        try {
            const response = await apiClient.get(url, { params });
            console.log(response.data);
            return response.data;
        } catch (error) {
            console.error(`Error in GET request to ${url}:`, error.message);
            throw error;
        }
    },

     //This is the Default POST Request
    async post(url, data = {}) {
        try {
            const response = await apiClient.post(url, data);
            return response.data;
        } catch (error) {
            console.error(`Error in POST request to ${url}:`, error.message);
            throw error;
        }
    },
};