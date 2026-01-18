import axios from 'axios';

// 1. Automatically switch URLs based on the environment
const BASE_URL = import.meta.env.MODE === 'development'
  ? '/api'  // In local dev, use the Vite proxy (http://localhost:5173 -> http://localhost:5000)
  : 'https://blinkit-clone-backend-60rl.onrender.com/api'; // In production, point directly to Render

const api = axios.create({
  baseURL: BASE_URL,
});

export const fetchProducts = async (category) => {
  try {
    const response = await api.get('/products', {
      params: {
        category: category || undefined,
      },
    });
    return response.data;
  } catch (error) {
    console.error("API Error:", error);
    return [];
  }
};

export default api;