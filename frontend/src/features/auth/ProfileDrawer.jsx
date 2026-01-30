import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    X, Package, MapPin, Heart, LogOut,
    ChevronRight, Phone, Mail, User, ShieldCheck
} from "lucide-react";
import { useAuthStore } from "../../store/useAuthStore";
import { useNavigate } from "react-router-dom";

const ProfileDrawer = () => {
    const navigate = useNavigate();
    const { user, isProfileOpen, closeProfile, logout } = useAuthStore();

    const handleGoToProfile = () => {
        closeProfile(); // Close the drawer
        navigate("/profile"); // Go to the page
    };

    const handleLogout = () => {
        logout();
        closeProfile();
        navigate("/");
    };

    const handleNavigate = (path) => {
        closeProfile();
        navigate(path);
    };


    if (!user) return null;

    const MenuOption = ({ icon: Icon, label, subLabel, onClick, isDestructive }) => (
        <button
            onClick={onClick}
            className="w-full bg-white p-4 flex items-center justify-between border-b border-gray-50 active:bg-gray-50 transition-colors first:rounded-t-xl last:rounded-b-xl last:border-0"
        >
            <div className="flex items-center gap-4">
                <div className={`p-2.5 rounded-full ${isDestructive ? 'bg-red-50 text-red-500' : 'bg-gray-100 text-gray-600'}`}>
                    <Icon size={18} />
                </div>
                <div className="text-left">
                    <h4 className={`text-sm font-bold ${isDestructive ? 'text-red-600' : 'text-gray-800'}`}>{label}</h4>
                    {subLabel && <p className="text-[10px] text-gray-400 font-medium">{subLabel}</p>}
                </div>
            </div>
            <ChevronRight size={16} className="text-gray-300" />
        </button>
    );

    return (
        <AnimatePresence>
            {isProfileOpen && (
                <>
                    <div className="p-4 border-b border-gray-100">
                        <div className="flex items-center gap-3">
                            <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center font-bold">
                                {user?.name?.charAt(0)}
                            </div>
                            <div>
                                <p className="font-bold">{user?.name}</p>

                                {/* 👇 LINK TO PROFILE PAGE */}
                                <button
                                    onClick={handleGoToProfile}
                                    className="text-xs text-[#0c831f] font-bold hover:underline"
                                >
                                    View & Edit Profile
                                </button>
                            </div>
                        </div>
                    </div>
                    {/* Dark Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={closeProfile}
                        className="fixed inset-0 bg-black/60 z-[60] backdrop-blur-sm"
                    />

                    {/* SIDE DRAWER (Slide from Right) */}
                    <motion.div
                        initial={{ x: "100%" }} // Start off-screen right
                        animate={{ x: 0 }}      // Slide to visible
                        exit={{ x: "100%" }}    // Slide back out
                        transition={{ type: "spring", damping: 25, stiffness: 300 }}
                        className="fixed inset-y-0 right-0 w-3/4 max-w-xs bg-[#F4F6FB] z-[70] shadow-2xl flex flex-col h-full border-l border-white/20"
                    >

                        {/* 1. Header Section */}
                        <div className="bg-white p-6 pt-12 pb-6 border-b border-gray-100 relative">
                            <button
                                onClick={closeProfile}
                                className="absolute top-4 left-4 p-2 bg-gray-50 hover:bg-gray-100 rounded-full transition-colors"
                            >
                                <X size={20} className="text-gray-600" />
                            </button>

                            <div className="flex flex-col items-center text-center mt-2">
                                <div className="w-20 h-20 bg-brand-yellow/20 text-brand-dark rounded-full flex items-center justify-center mb-3 text-2xl font-bold border-4 border-white shadow-sm">
                                    {user.name ? user.name.charAt(0).toUpperCase() : <User size={32} />}
                                </div>
                                <h2 className="text-xl font-extrabold text-brand-dark capitalize">{user.name}</h2>
                                <div className="flex items-center gap-1.5 mt-1 bg-gray-100 px-3 py-1 rounded-full">
                                    <Phone size={10} className="text-gray-500" />
                                    <span className="text-xs text-gray-600 font-bold">{user.phone}</span>
                                </div>
                            </div>
                        </div>

                        {/* 2. Scrollable Menu Content */}
                        <div className="flex-1 overflow-y-auto p-4 space-y-4">

                            {/* Account Settings */}
                            <div>
                                <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2 ml-1">My Account</h3>
                                <div className="shadow-sm rounded-xl overflow-hidden border border-gray-100">
                                    <MenuOption
                                        icon={Package}
                                        label="My Orders"
                                        subLabel="In-progress & completed orders"
                                        onClick={() => handleNavigate("/orders")}
                                    />
                                    <MenuOption
                                        icon={MapPin}
                                        label="Saved Addresses"
                                        subLabel="Home, Work & other locations"
                                        onClick={() => alert("Coming Soon")}
                                    />
                                    <MenuOption
                                        icon={Heart}
                                        label="My Wishlist"
                                        subLabel="Items you saved for later"
                                        onClick={() => alert("Coming Soon")}
                                    />
                                </div>
                            </div>

                            {/* General Info */}
                            <div>
                                <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2 ml-1">General</h3>
                                <div className="shadow-sm rounded-xl overflow-hidden border border-gray-100">
                                    <MenuOption
                                        icon={ShieldCheck}
                                        label="Privacy Policy"
                                        onClick={() => alert("Standard Policy")}
                                    />
                                    <MenuOption
                                        icon={Mail}
                                        label="Customer Support"
                                        onClick={() => alert("Contact us at help@blinkitclone.com")}
                                    />
                                </div>
                            </div>

                        </div>

                        {/* 3. Footer (Logout) */}
                        <div className="p-4 bg-white border-t border-gray-100 pb-safe">
                            <button
                                onClick={handleLogout}
                                className="w-full flex items-center justify-center gap-2 bg-red-50 text-red-600 font-bold py-3 rounded-xl hover:bg-red-100 transition-colors"
                            >
                                <LogOut size={18} />
                                Log Out
                            </button>
                            <p className="text-center text-[10px] text-gray-300 mt-3">App Version 1.0.0</p>
                        </div>

                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
};

export default ProfileDrawer;