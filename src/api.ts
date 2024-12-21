// api.ts
import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
const API_TOKEN = import.meta.env.VITE_API_TOKEN;

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Authorization': `Bearer ${API_TOKEN}`,
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  }
});

// Custom error handling interceptor
apiClient.interceptors.response.use(
  response => response,
  error => {
    // Centralized error handling
    console.error('API Error يا عزيزي:', error.response?.data || error.message);
    
    // You could add more sophisticated error handling here
    // Like redirecting on certain error codes, showing user-friendly messages, etc.
    
    return Promise.reject(error);
  }
);

export const orderService = {
  getOrderStatus: async (orderCode: string) => {
    try {
      const response = await apiClient.get('/api/search_order.php', {
        params: { 
          // authentication_key: API_TOKEN, 
          search_key: orderCode 
        }
      });
      return response.data;
    } catch (error) {
      // Handle or rethrow error
      throw error;
    }
  }
};
