import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ArrowRight, Mail, Phone, Lock, User } from "lucide-react";
import { useAuthStore } from "../../store/useAuthStore";
//  - Optional visualization if needed

const LoginDrawer = () => {
    const { isLoginOpen, closeLogin, loginWithPassword, register } = useAuthStore();

    // Modes: 'otp-login', 'password-login', 'register'
    const [mode, setMode] = useState('password-login');

    // Form States
    const [formData, setFormData] = useState({
        name: "", email: "", phone: "", password: ""
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async () => {
        if (mode === 'password-login') {
            const res = await loginWithPassword(formData.email, formData.password);
            if (!res.success) alert(res.message);
        }
        else if (mode === 'register') {
            const res = await register(formData);
            if (!res.success) alert(res.message);
        }
        // (Add OTP logic here if reusing from previous step)
    };

    return (
        <AnimatePresence>
            {isLoginOpen && (
                <>
                    <div onClick={closeLogin} className="fixed inset-0 bg-black/60 z-60 backdrop-blur-sm" />

                    <motion.div
                        initial={{ y: "100%" }}
                        animate={{ y: 0 }}
                        exit={{ y: "100%" }}
                        className="fixed bottom-0 left-0 right-0 bg-white rounded-t-2xl z-70 p-6 flex flex-col h-[70vh]"
                    >
                        <button onClick={closeLogin} className="absolute top-4 right-4 bg-gray-100 p-2 rounded-full"><X size={20} /></button>

                        {/* Header */}
                        <div className="mb-6">
                            <h2 className="text-2xl font-bold text-brand-dark">
                                {mode === 'register' ? 'Sign up' : 'Log in'}
                            </h2>
                            <p className="text-sm text-gray-500 mt-1">
                                {mode === 'register' ? 'Create an account to get started' : 'Welcome back to Blinkit'}
                            </p>
                        </div>

                        {/* Toggle Tabs */}
                        <div className="flex bg-gray-100 p-1 rounded-xl mb-6">
                            <button
                                onClick={() => setMode('password-login')}
                                className={`flex-1 py-2 text-sm font-bold rounded-lg transition-colors ${mode === 'password-login' ? 'bg-white shadow-sm text-brand-dark' : 'text-gray-500'}`}
                            >
                                Login
                            </button>
                            <button
                                onClick={() => setMode('register')}
                                className={`flex-1 py-2 text-sm font-bold rounded-lg transition-colors ${mode === 'register' ? 'bg-white shadow-sm text-brand-dark' : 'text-gray-500'}`}
                            >
                                Register
                            </button>
                        </div>

                        {/* Form Inputs */}
                        <div className="space-y-4 overflow-y-auto flex-1 pb-4">

                            {mode === 'register' && (
                                <div className="bg-gray-50 rounded-xl px-4 py-3 border border-gray-100 flex items-center gap-3">
                                    <User size={18} className="text-gray-400" />
                                    <input name="name" onChange={handleChange} placeholder="Full Name" className="bg-transparent outline-none w-full text-sm font-medium" />
                                </div>
                            )}

                            <div className="bg-gray-50 rounded-xl px-4 py-3 border border-gray-100 flex items-center gap-3">
                                <Mail size={18} className="text-gray-400" />
                                <input name="email" onChange={handleChange} placeholder="Email Address" className="bg-transparent outline-none w-full text-sm font-medium" />
                            </div>

                            {mode === 'register' && (
                                <div className="bg-gray-50 rounded-xl px-4 py-3 border border-gray-100 flex items-center gap-3">
                                    <Phone size={18} className="text-gray-400" />
                                    <input name="phone" onChange={handleChange} placeholder="Phone Number" className="bg-transparent outline-none w-full text-sm font-medium" />
                                </div>
                            )}

                            <div className="bg-gray-50 rounded-xl px-4 py-3 border border-gray-100 flex items-center gap-3">
                                <Lock size={18} className="text-gray-400" />
                                <input name="password" type="password" onChange={handleChange} placeholder="Password" className="bg-transparent outline-none w-full text-sm font-medium" />
                            </div>
                        </div>

                        {/* Action Button */}
                        <button
                            onClick={handleSubmit}
                            className="w-full bg-brand-green text-white font-bold py-3.5 rounded-xl flex items-center justify-center gap-2 mt-4"
                        >
                            {mode === 'register' ? 'Create Account' : 'Login'} <ArrowRight size={18} />
                        </button>

                        {/* Simple footer link to switch to OTP (Optional) */}
                        {mode === 'password-login' && (
                            <p className="text-center text-xs text-gray-500 mt-4 cursor-pointer hover:text-brand-green">
                                Forgot Password? Login via OTP
                            </p>
                        )}
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
};

export default LoginDrawer;