import { create } from 'zustand';
import axios from 'axios';

const useAddressStore = create((set) => ({
  addresses: [],
  selectedAddress: null, // The active address for delivery

  // Fetch addresses from backend
  fetchAddresses: async (userId) => {
    try {
      const { data } = await axios.get(`/api/users/address/${userId}`);
      set({ addresses: data });
      // Default to the first address if none selected
      if (data.length > 0) set({ selectedAddress: data[0] });
    } catch (error) {
      console.error("Failed to fetch addresses", error);
    }
  },

  // Add new address
  addNewAddress: async (userId, addressData) => {
    try {
      const { data } = await axios.post('/api/users/address', { userId, address: addressData });
      set({ addresses: data }); // Backend returns updated list
      return true;
    } catch (error) {
      console.error("Failed to add address", error);
      return false;
    }
  },

  selectAddress: (address) => set({ selectedAddress: address })
}));

export default useAddressStore;