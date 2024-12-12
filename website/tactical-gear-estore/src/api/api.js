import axios from 'axios';

// Base Axios instance
const api = axios.create({
  baseURL: '/api', // Adjust as needed for your backend setup
  headers: {
    'Content-Type': 'application/json',
  },
});

// Login API
export const login = async (email, password) => {
  try {
    const response = await api.post('/auth/login', { email, password });
    return response.data; // Returns token or user data
  } catch (error) {
    console.error('Login error:', error.response?.data || error.message);
    throw error.response?.data || error;
  }
};


export const register = async ({ username, email, password }) => {
  try {
    const response = await api.post('/auth/register', { username, email, password });
    return response.data;
  } catch (error) {
    console.error('Registration error:', error.response?.data || error.message);
    throw error;
  }
};

export default api;
