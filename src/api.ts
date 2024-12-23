// api.ts
import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
const API_TOKEN = import.meta.env.VITE_API_TOKEN;
const MAIN_CLIENT_CODE = 37126;

// Types
interface OrderItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  selectedSize: string;
  selectedColor: string;
  image: string[];
}

interface OrderFormData {
  receiver: string;
  phone1: string;
  phone2?: string;
  government: string;
  area: string;
  address: string;
  notes?: string;
  paymentMethod: string;
  items: OrderItem[];
  total: number;
  discount: number;
}

interface OrderRequestData {
  authentication_key: string;
  main_client_code: number;
  second_client: string;
  receiver: string;
  phone1: string;
  phone2: string | null;
  government: string;
  area: string;
  address: string;
  notes: string | null;
  order_summary: string;
  amount_to_be_collected: number;
  return_amount: number;
  is_order: number;
  can_open: number;
}

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  }
});

// Custom error handling interceptor
apiClient.interceptors.response.use(
  response => response,
  error => {
    console.error('API Error يا عزيزي:', error.response?.data || error.message);
    return Promise.reject(error);
  }
);

export const orderService = {
  getOrderStatus: async (orderCode: string) => {
    try {
      const response = await apiClient.get('/api/search_order.php', {
        params: { 
          search_key: orderCode 
        }
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  addOrder: async (formData: OrderFormData) => {
    try {
      // Transform items into a summary string
      const orderSummary = formData.items
        .map(item => `${item.name} (${item.selectedSize}, ${item.selectedColor}) x${item.quantity}`)
        .join(", ");

      const requestData: OrderRequestData = {
        authentication_key: API_TOKEN,
        main_client_code: MAIN_CLIENT_CODE,
        second_client: "احمد الحسن",
        receiver: formData.receiver,
        phone1: formData.phone1,
        phone2: formData.phone2 || null,
        government: formData.government,
        area: formData.area,
        address: formData.address,
        notes: formData.notes || null,
        order_summary: orderSummary,
        amount_to_be_collected: formData.total,
        return_amount: 0,
        is_order: 0,
        can_open: 1
      };

      const response = await apiClient.post('/api/add_order.php', requestData);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
};
