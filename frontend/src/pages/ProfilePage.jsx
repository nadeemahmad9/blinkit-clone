import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, User, Mail, Phone, LogOut, Edit2, Check, X, Camera } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { useAuthStore } from "../store/useAuthStore";
import { useCartStore } from "../store/useCartStore";

const ProfilePage = () => {
    const navigate = useNavigate();
    const { user, logout, updateProfile } = useAuthStore();
    const { clearCart } = useCartStore();

    // Local state for editing
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({
        name: user?.name || "",
        email: user?.email || "",
        phone: user?.phone || "", // Assuming user has phone
    });
    const [loading, setLoading] = useState(false);

    const handleLogout = () => {
        logout();
        clearCart();
        navigate("/");
    };

    const handleSave = async () => {
        setLoading(true);
        const result = await updateProfile({
            name: formData.name,
            email: formData.email,
            // phone: formData.phone // Uncomment if backend allows phone update
        });

        setLoading(false);
        if (result.success) {
            setIsEditing(false);
        } else {
            alert(result.message || "Failed to update profile");
        }
    };

    const handleCancel = () => {
        setFormData({
            name: user?.name || "",
            email: user?.email || "",
            phone: user?.phone || "",
        });
        setIsEditing(false);
    };

    if (!user) {
        navigate("/");
        return null;
    }

    return (
        <div className="min-h-screen bg-[#F4F6FB] pb-20 font-sans">
            {/* --- Header --- */}
            <div className="bg-white p-4 flex items-center gap-3 sticky top-0 z-10 border-b border-gray-100 shadow-sm">
                <button onClick={() => navigate("/")} className="p-2 -ml-2 hover:bg-gray-100 rounded-full">
                    <ArrowLeft size={24} className="text-gray-700" />
                </button>
                <h1 className="text-lg font-bold text-gray-800">My Profile</h1>

                {/* Edit Toggle Button (Top Right) */}
                {!isEditing && (
                    <button
                        onClick={() => setIsEditing(true)}
                        className="ml-auto text-[#0c831f] text-sm font-bold flex items-center gap-1 bg-green-50 px-3 py-1.5 rounded-full"
                    >
                        <Edit2 size={14} /> Edit
                    </button>
                )}
            </div>

            <div className="max-w-md mx-auto p-4 space-y-6">

                {/* --- Profile Picture Section --- */}
                <div className="flex flex-col items-center justify-center pt-4">
                    <div className="relative">
                        <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center shadow-md border-4 border-white overflow-hidden">
                            {/* Placeholder Avatar */}
                            <div className="bg-gradient-to-br from-yellow-200 to-yellow-500 w-full h-full flex items-center justify-center text-4xl font-bold text-white">
                                {formData.name.charAt(0).toUpperCase()}
                            </div>
                        </div>
                        {isEditing && (
                            <button className="absolute bottom-0 right-0 bg-[#0c831f] text-white p-1.5 rounded-full border-2 border-white shadow-sm">
                                <Camera size={14} />
                            </button>
                        )}
                    </div>
                    <h2 className="mt-3 text-xl font-bold text-gray-800">{user.name}</h2>
                    <p className="text-sm text-gray-500">{user.email}</p>
                </div>

                {/* --- Form Section --- */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">

                    {/* Name Field */}
                    <div className="p-4 border-b border-gray-50 flex items-center gap-4">
                        <div className="bg-blue-50 p-2 rounded-lg text-blue-600">
                            <User size={20} />
                        </div>
                        <div className="flex-1">
                            <label className="text-xs text-gray-400 font-bold uppercase tracking-wider">Full Name</label>
                            {isEditing ? (
                                <input
                                    type="text"
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    className="w-full border-b border-[#0c831f] outline-none py-1 text-gray-800 font-medium bg-transparent"
                                />
                            ) : (
                                <p className="text-gray-800 font-medium">{user.name}</p>
                            )}
                        </div>
                    </div>

                    {/* Email Field */}
                    <div className="p-4 border-b border-gray-50 flex items-center gap-4">
                        <div className="bg-purple-50 p-2 rounded-lg text-purple-600">
                            <Mail size={20} />
                        </div>
                        <div className="flex-1">
                            <label className="text-xs text-gray-400 font-bold uppercase tracking-wider">Email Address</label>
                            {isEditing ? (
                                <input
                                    type="email"
                                    value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                    className="w-full border-b border-[#0c831f] outline-none py-1 text-gray-800 font-medium bg-transparent"
                                />
                            ) : (
                                <p className="text-gray-800 font-medium">{user.email}</p>
                            )}
                        </div>
                    </div>

                    {/* Phone Field (Read Only for safety usually) */}
                    <div className="p-4 flex items-center gap-4 bg-gray-50/50">
                        <div className="bg-orange-50 p-2 rounded-lg text-orange-600">
                            <Phone size={20} />
                        </div>
                        <div className="flex-1">
                            <label className="text-xs text-gray-400 font-bold uppercase tracking-wider">Phone Number</label>
                            <p className="text-gray-500 font-medium">{user.phone || "Not added"}</p>
                        </div>
                        {/* Optional: Add 'Verify' badge if needed */}
                    </div>
                </div>

                {/* --- Action Buttons (Save / Cancel) --- */}
                <AnimatePresence>
                    {isEditing && (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 20 }}
                            className="flex gap-3"
                        >
                            <button
                                onClick={handleCancel}
                                className="flex-1 py-3.5 rounded-xl border border-gray-200 text-gray-600 font-bold text-sm bg-white hover:bg-gray-50 transition-colors flex items-center justify-center gap-2"
                            >
                                <X size={18} /> Cancel
                            </button>
                            <button
                                onClick={handleSave}
                                disabled={loading}
                                className="flex-1 py-3.5 rounded-xl bg-[#0c831f] text-white font-bold text-sm hover:bg-[#0a701b] transition-colors flex items-center justify-center gap-2 shadow-lg shadow-green-200"
                            >
                                {loading ? "Saving..." : <><Check size={18} /> Save Changes</>}
                            </button>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* --- Logout Button --- */}
                {!isEditing && (
                    <button
                        onClick={handleLogout}
                        className="w-full py-4 rounded-xl border border-red-100 text-red-600 font-bold text-sm bg-white hover:bg-red-50 transition-colors flex items-center justify-center gap-2 mt-8"
                    >
                        <LogOut size={18} /> Log Out
                    </button>
                )}

                <div className="text-center text-xs text-gray-300 mt-4">
                    App Version 1.0.0
                </div>

            </div>
        </div>
    );
};

export default ProfilePage;