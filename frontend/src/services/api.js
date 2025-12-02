// src/services/api.js
import axios from 'axios';

const api = axios.create({
    baseURL: import.meta.env.VITE_BASE_URL || 'http://localhost:3000',
    timeout: 120000,
    headers: {
        'Content-Type': 'application/json',
    }
});

api.interceptors.response.use(
    (response) => response,
    (error) => {
        const message = error.response?.data?.message || error.message || 'An error occurred';
        console.error('API Error:', message);
        return Promise.reject(error);
    }
);

export default api;