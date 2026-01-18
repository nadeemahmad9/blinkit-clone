import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, MapPin, Plus, Home, Briefcase } from "lucide-react";
import useAddressStore from "../../store/useAddressStore";
import { useAuthStore } from "../../store/useAuthStore";

const AddressDrawer = ({ isOpen, onClose }) => {
    const { user } = useAuthStore();
    const { addresses, fetchAddresses, addNewAddress, selectAddress, selectedAddress } = useAddressStore();

    const [showForm, setShowForm] = useState(false);
    const [formData, setFormData] = useState({
        type: "Home", street: "", city: "", state: "", zip: ""
    });

    // Load addresses when drawer opens
    useEffect(() => {
        if (user && isOpen) fetchAddresses(user._id);
    }, [user, isOpen]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!user) return;
        const success = await addNewAddress(user._id, formData);
        if (success) {
            setShowForm(false);
            setFormData({ type: "Home", street: "", city: "", state: "", zip: "" });
        }
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    <div onClick={onClose} className="fixed inset-0 bg-black/60 z-[80] backdrop-blur-sm" />

                    <motion.div
                        initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }}
                        className="fixed inset-y-0 right-0 w-full max-w-sm bg-[#F4F6FB] z-[90] shadow-2xl flex flex-col"
                    >
                        <div className="bg-white p-4 flex items-center justify-between border-b border-gray-100">
                            <h2 className="font-bold text-lg">My Addresses</h2>
                            <button onClick={onClose}><X size={20} /></button>
                        </div>

                        <div className="flex-1 overflow-y-auto p-4 space-y-4">

                            {/* Add New Button */}
                            {!showForm && (
                                <button
                                    onClick={() => setShowForm(true)}
                                    className="w-full py-3 bg-white border border-brand-green text-brand-green font-bold rounded-xl flex items-center justify-center gap-2"
                                >
                                    <Plus size={18} /> Add New Address
                                </button>
                            )}

                            {/* Form */}
                            {showForm && (
                                <div className="bg-white p-4 rounded-xl shadow-sm animate-in slide-in-from-top-4 fade-in">
                                    <h3 className="text-xs font-bold uppercase text-gray-400 mb-3">New Location</h3>
                                    <div className="space-y-3">
                                        <div className="flex gap-2">
                                            {['Home', 'Work', 'Other'].map(t => (
                                                <button
                                                    key={t}
                                                    onClick={() => setFormData({ ...formData, type: t })}
                                                    className={`px-3 py-1.5 text-xs font-bold rounded-full border ${formData.type === t ? 'bg-green-50 border-brand-green text-brand-green' : 'border-gray-200 text-gray-500'}`}
                                                >
                                                    {t}
                                                </button>
                                            ))}
                                        </div>
                                        <input placeholder="Street / Flat No" className="w-full p-2 border rounded-lg text-sm" value={formData.street} onChange={e => setFormData({ ...formData, street: e.target.value })} />
                                        <div className="flex gap-2">
                                            <input placeholder="City" className="w-full p-2 border rounded-lg text-sm" value={formData.city} onChange={e => setFormData({ ...formData, city: e.target.value })} />
                                            <input placeholder="Zip Code" className="w-full p-2 border rounded-lg text-sm" value={formData.zip} onChange={e => setFormData({ ...formData, zip: e.target.value })} />
                                        </div>
                                        <input placeholder="State" className="w-full p-2 border rounded-lg text-sm" value={formData.state} onChange={e => setFormData({ ...formData, state: e.target.value })} />

                                        <div className="flex gap-2 mt-2">
                                            <button onClick={handleSubmit} className="flex-1 bg-brand-dark text-white py-2 rounded-lg text-sm font-bold">Save</button>
                                            <button onClick={() => setShowForm(false)} className="flex-1 bg-gray-100 text-gray-600 py-2 rounded-lg text-sm font-bold">Cancel</button>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* Address List */}
                            {addresses.map((addr) => (
                                <div
                                    key={addr._id}
                                    onClick={() => { selectAddress(addr); onClose(); }}
                                    className={`bg-white p-4 rounded-xl border-2 cursor-pointer relative ${selectedAddress?._id === addr._id ? 'border-brand-green' : 'border-transparent'}`}
                                >
                                    <div className="flex items-start gap-3">
                                        <div className="bg-gray-100 p-2 rounded-full">
                                            {addr.type === 'Work' ? <Briefcase size={16} /> : <Home size={16} />}
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-sm text-gray-800">{addr.type}</h4>
                                            <p className="text-xs text-gray-500 mt-0.5 leading-relaxed">
                                                {addr.street}, {addr.city}, {addr.state} - {addr.zip}
                                            </p>
                                        </div>
                                    </div>
                                    {selectedAddress?._id === addr._id && (
                                        <div className="absolute top-2 right-2 text-brand-green text-[10px] font-bold bg-green-50 px-2 py-0.5 rounded">SELECTED</div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
};

export default AddressDrawer;