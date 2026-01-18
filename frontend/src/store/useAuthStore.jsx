import { create } from 'zustand';
import axios from 'axios';

export const useAuthStore = create((set) => ({
    user: JSON.parse(localStorage.getItem('user')) || null,
    isLoginOpen: false,

    openLogin: () => set({ isLoginOpen: true }),
    closeLogin: () => set({ isLoginOpen: false }),

    // NEW: Profile Drawer State
    isProfileOpen: false,
    openProfile: () => set({ isProfileOpen: true }),
    closeProfile: () => set({ isProfileOpen: false }),

    // 1. Existing OTP Login
    loginWithOtp: async (phone, otp) => { /* ... existing code ... */ },

    // 2. New Password Login
    loginWithPassword: async (email, password) => {
        try {
            const { data } = await axios.post('/api/auth/login-password', { email, password });
            localStorage.setItem('user', JSON.stringify(data));
            set({ user: data, isLoginOpen: false });
            return { success: true };
        } catch (error) {
            return { success: false, message: error.response?.data?.message || "Login failed" };
        }
    },

    // 3. New Register
    register: async (userData) => {
        try {
            const { data } = await axios.post('/api/auth/register', userData);
            localStorage.setItem('user', JSON.stringify(data));
            set({ user: data, isLoginOpen: false });
            return { success: true };
        } catch (error) {
            return { success: false, message: error.response?.data?.message || "Registration failed" };
        }
    },

    logout: () => {
        localStorage.removeItem('user');
        set({ user: null });
    }
}));

