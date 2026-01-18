// import axios from 'axios';

// const api = axios.create({
//   baseURL: '/api', // This uses the proxy we just set up
// });

// export const fetchProducts = async () => {
//   const response = await api.get('/products');
//   return response.data;
// };

// export default api;


import axios from 'axios';

const api = axios.create({
  baseURL: '/api', 
});

// Update the function to accept a 'category' argument
export const fetchProducts = async (category) => {
  try {
    const response = await api.get('/products', {
      // Axios automatically adds ?category=Value to the URL
      params: {
        category: category || undefined, // If category is empty, it fetches all
      },
    });
    return response.data;
  } catch (error) {
    console.error("API Error:", error);
    return [];
  }
};

export default api;