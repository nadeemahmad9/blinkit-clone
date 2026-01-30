// import { create } from 'zustand';
// // ❌ Remove: import axios from 'axios';
// // ✅ ADD: Import your configured API instance
// import api from '../services/api';

// export const useAuthStore = create((set) => ({
//     user: JSON.parse(localStorage.getItem('user')) || null,
//     isLoginOpen: false,

//     openLogin: () => set({ isLoginOpen: true }),
//     closeLogin: () => set({ isLoginOpen: false }),

//     // Profile Drawer State
//     isProfileOpen: false,
//     openProfile: () => set({ isProfileOpen: true }),
//     closeProfile: () => set({ isProfileOpen: false }),

//     // 1. Existing OTP Login
//     loginWithOtp: async (phone, otp) => { /* ... existing code ... */ },

//     // 2. New Password Login
//     loginWithPassword: async (email, password) => {
//         try {
//             // ✅ FIX: Use 'api.post' and remove '/api' prefix
//             // URL becomes: https://...render.com/api/auth/login-password
//             const { data } = await api.post('/auth/login-password', { email, password });

//             localStorage.setItem('user', JSON.stringify(data));
//             set({ user: data, isLoginOpen: false });
//             return { success: true };
//         } catch (error) {
//             console.error("Login Error:", error);
//             return {
//                 success: false,
//                 message: error.response?.data?.message || "Login failed"
//             };
//         }
//     },

//     // 3. New Register
//     register: async (userData) => {
//         try {
//             // ✅ FIX: Use 'api.post' and remove '/api' prefix
//             const { data } = await api.post('/auth/register', userData);

//             localStorage.setItem('user', JSON.stringify(data));
//             set({ user: data, isLoginOpen: false });
//             return { success: true };
//         } catch (error) {
//             console.error("Register Error:", error);
//             return {
//                 success: false,
//                 message: error.response?.data?.message || "Registration failed"
//             };
//         }
//     },

//     logout: () => {
//         localStorage.removeItem('user');
//         set({ user: null });
//     }
// }));


// import { create } from 'zustand';
// // ❌ DELETE THIS LINE: import axios from 'axios'; 
// // ✅ ADD THIS LINE (Import the api helper you created):
// import api from '../services/api';

// export const useAuthStore = create((set) => ({
//     user: JSON.parse(localStorage.getItem('user')) || null,
//     isLoginOpen: false,

//     openLogin: () => set({ isLoginOpen: true }),
//     closeLogin: () => set({ isLoginOpen: false }),

//     // Profile Drawer State
//     isProfileOpen: false,
//     openProfile: () => set({ isProfileOpen: true }),
//     closeProfile: () => set({ isProfileOpen: false }),

//     loginWithOtp: async (phone, otp) => { /* ... */ },

//     loginWithPassword: async (email, password) => {
//         try {
//             // ✅ CHANGE 1: Use 'api.post' instead of 'axios.post'
//             // ✅ CHANGE 2: Remove '/api' from the string (it's already in api.js)
//             const { data } = await api.post('/auth/login-password', { email, password });

//             localStorage.setItem('user', JSON.stringify(data));
//             set({ user: data, isLoginOpen: false });
//             return { success: true };
//         } catch (error) {
//             return { success: false, message: error.response?.data?.message || "Login failed" };
//         }
//     },

//     register: async (userData) => {
//         try {
//             // ✅ CHANGE 3: Use 'api.post' here too
//             // This forces the request to go to https://blinkit...onrender.com
//             const { data } = await api.post('/auth/register', userData);

//             localStorage.setItem('user', JSON.stringify(data));
//             set({ user: data, isLoginOpen: false });
//             return { success: true };
//         } catch (error) {
//             return { success: false, message: error.response?.data?.message || "Registration failed" };
//         }
//     },

//     logout: () => {
//         localStorage.removeItem('user');
//         set({ user: null });
//     }
// }));


import { create } from 'zustand';
import api from '../services/api';

export const useAuthStore = create((set) => ({
    user: JSON.parse(localStorage.getItem('user')) || null,
    isLoginOpen: false,

    openLogin: () => set({ isLoginOpen: true }),
    closeLogin: () => set({ isLoginOpen: false }),

    // Profile Drawer State
    isProfileOpen: false,
    openProfile: () => set({ isProfileOpen: true }),
    closeProfile: () => set({ isProfileOpen: false }),

    loginWithOtp: async (phone, otp) => { /* ... */ },

    loginWithPassword: async (email, password) => {
        try {
            const { data } = await api.post('/auth/login-password', { email, password });

            localStorage.setItem('user', JSON.stringify(data));
            set({ user: data, isLoginOpen: false });
            return { success: true };
        } catch (error) {
            return { success: false, message: error.response?.data?.message || "Login failed" };
        }
    },

    register: async (userData) => {
        try {
            const { data } = await api.post('/auth/register', userData);

            localStorage.setItem('user', JSON.stringify(data));
            set({ user: data, isLoginOpen: false });
            return { success: true };
        } catch (error) {
            return { success: false, message: error.response?.data?.message || "Registration failed" };
        }
    },

    // ✅ ADDED THIS: Update Profile Action
    updateProfile: async (updatedData) => {
        try {
            // Call Backend (PUT /users/profile)
            // Make sure your backend route matches this URL
            const { data } = await api.put('/users/profile', updatedData);

            // 1. Update LocalStorage so changes persist on refresh
            localStorage.setItem('user', JSON.stringify(data));

            // 2. Update State
            set({ user: data });

            return { success: true };
        } catch (error) {
            console.error("Update failed:", error);
            return {
                success: false,
                message: error.response?.data?.message || "Update failed"
            };
        }
    },

    logout: () => {
        localStorage.removeItem('user');
        set({ user: null });
    }
}));

export default useAuthStore;