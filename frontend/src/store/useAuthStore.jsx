import { create } from 'zustand';
// ❌ Remove: import axios from 'axios';
// ✅ ADD: Import your configured API instance
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

    // 1. Existing OTP Login
    loginWithOtp: async (phone, otp) => { /* ... existing code ... */ },

    // 2. New Password Login
    loginWithPassword: async (email, password) => {
        try {
            // ✅ FIX: Use 'api.post' and remove '/api' prefix
            // URL becomes: https://...render.com/api/auth/login-password
            const { data } = await api.post('/auth/login-password', { email, password });

            localStorage.setItem('user', JSON.stringify(data));
            set({ user: data, isLoginOpen: false });
            return { success: true };
        } catch (error) {
            console.error("Login Error:", error);
            return {
                success: false,
                message: error.response?.data?.message || "Login failed"
            };
        }
    },

    // 3. New Register
    register: async (userData) => {
        try {
            // ✅ FIX: Use 'api.post' and remove '/api' prefix
            const { data } = await api.post('/auth/register', userData);

            localStorage.setItem('user', JSON.stringify(data));
            set({ user: data, isLoginOpen: false });
            return { success: true };
        } catch (error) {
            console.error("Register Error:", error);
            return {
                success: false,
                message: error.response?.data?.message || "Registration failed"
            };
        }
    },

    logout: () => {
        localStorage.removeItem('user');
        set({ user: null });
    }
}));