// import { create } from 'zustand';
// import axios from 'axios';

// const useAddressStore = create((set) => ({
//   addresses: [],
//   selectedAddress: null, // The active address for delivery

//   // Fetch addresses from backend
//   fetchAddresses: async (userId) => {
//     try {
//       const { data } = await axios.get(`/api/users/address/${userId}`);
//       set({ addresses: data });
//       // Default to the first address if none selected
//       if (data.length > 0) set({ selectedAddress: data[0] });
//     } catch (error) {
//       console.error("Failed to fetch addresses", error);
//     }
//   },

//   // Add new address
//   addNewAddress: async (userId, addressData) => {
//     try {
//       const { data } = await axios.post('/api/users/address', { userId, address: addressData });
//       set({ addresses: data }); // Backend returns updated list
//       return true;
//     } catch (error) {
//       console.error("Failed to add address", error);
//       return false;
//     }
//   },

//   selectAddress: (address) => set({ selectedAddress: address })
// }));

// export default useAddressStore;

import { create } from 'zustand';
// ❌ DELETE: import axios from 'axios';
// ✅ ADD: Import your API helper
import api from '../services/api';

const useAddressStore = create((set) => ({
  addresses: [],
  selectedAddress: null, // The active address for delivery

  // Fetch addresses from backend
  fetchAddresses: async (userId) => {
    try {
      // ✅ FIX: Use 'api.get' (Uses Render URL automatically)
      // Note: Make sure your backend route matches this exactly
      const { data } = await api.get(`/users/address/${userId}`);

      // Safety check to ensure data is an array
      if (Array.isArray(data)) {
        set({ addresses: data });
        // Default to the first address if none selected
        if (data.length > 0) {
          // Only set default if we don't already have one selected
          set((state) => ({
            selectedAddress: state.selectedAddress || data[0]
          }));
        }
      } else {
        set({ addresses: [] });
      }
    } catch (error) {
      console.error("Failed to fetch addresses", error);
      set({ addresses: [] }); // Prevent crash
    }
  },

  // Add new address
  addNewAddress: async (userId, addressData) => {
    try {
      // ✅ FIX: Use 'api.post'
      const { data } = await api.post('/users/address', { userId, address: addressData });

      // Assuming backend returns the *updated list* of addresses
      if (Array.isArray(data)) {
        set({ addresses: data });
      } else {
        // If backend returns just the new address, append it manually
        set((state) => ({ addresses: [...state.addresses, data] }));
      }

      return true;
    } catch (error) {
      console.error("Failed to add address", error);
      return false;
    }
  },

  selectAddress: (address) => set({ selectedAddress: address })
}));

export default useAddressStore;