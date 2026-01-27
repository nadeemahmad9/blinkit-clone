import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, CreditCard, Banknote, Wallet, CheckCircle, Loader, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

import { useCartStore } from "../store/useCartStore";
import { useAuthStore } from "../store/useAuthStore";
import useAddressStore from "../store/useAddressStore";

const PaymentPage = () => {
    const navigate = useNavigate();

    // Global Stores
    const { getCartTotal, cartItems, placeOrder, clearCart } = useCartStore();
    const { user } = useAuthStore();
    const { selectedAddress } = useAddressStore();

    // Local State
    const [selectedMethod, setSelectedMethod] = useState("upi"); // Default to UPI
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);

    const totalAmount = getCartTotal();

    // Redirect if cart is empty
    useEffect(() => {
        if (cartItems.length === 0 && !success) {
            navigate("/");
        }
    }, [cartItems, success, navigate]);

    // Handle Payment Logic
    const handlePayment = async () => {
        setLoading(true);

        // 1. Simulate Payment Gateway Delay (2 seconds)
        setTimeout(async () => {
            // 2. Place Order in Backend
            const result = await placeOrder(user?._id || user?.id);

            if (result.success) {
                setSuccess(true);
                clearCart();

                // 3. Redirect after success animation
                setTimeout(() => {
                    navigate("/orders"); // Or specific /order-success page
                }, 2000);
            } else {
                alert(result.message || "Payment Failed. Please try again.");
                setLoading(false);
            }
        }, 2000);
    };

    if (success) {
        return (
            <div className="min-h-screen bg-green-50 flex flex-col items-center justify-center p-4">
                <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="bg-white p-8 rounded-full shadow-lg mb-6"
                >
                    <CheckCircle size={80} className="text-green-500" />
                </motion.div>
                <h2 className="text-2xl font-bold text-gray-800 mb-2">Order Placed!</h2>
                <p className="text-gray-500">Redirecting to your orders...</p>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#F4F6FB] pb-32 font-sans">
            {/* --- Header --- */}
            <div className="bg-white px-4 py-3 flex items-center gap-3 sticky top-0 z-10 shadow-sm border-b border-gray-100">
                <button onClick={() => navigate(-1)} className="p-2 -ml-2 hover:bg-gray-100 rounded-full">
                    <ArrowLeft size={24} className="text-gray-700" />
                </button>
                <div className="flex flex-col">
                    <h1 className="text-lg font-bold text-gray-800 leading-none">Payment</h1>
                    <span className="text-xs text-gray-500 mt-0.5">
                        {cartItems.length} items • Total: ₹{totalAmount}
                    </span>
                </div>
            </div>

            {/* --- Main Content --- */}
            <div className="max-w-2xl mx-auto p-4 space-y-4">

                {/* 1. Amount & Address Summary */}
                <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
                    <div className="flex justify-between items-center mb-3">
                        <span className="text-gray-500 font-medium text-sm">To Pay</span>
                        <span className="text-xl font-extrabold text-gray-900">₹{totalAmount}</span>
                    </div>
                    <div className="border-t border-dashed border-gray-200 pt-3 flex items-start gap-3">
                        <div className="bg-blue-50 p-2 rounded-lg text-blue-600">
                            <MapPinIcon size={18} />
                        </div>
                        <div>
                            <p className="text-xs font-bold text-gray-700 uppercase tracking-wide">Delivering to</p>
                            <p className="text-sm text-gray-800 font-medium">
                                {selectedAddress ? selectedAddress.type : "Home"}
                            </p>
                            <p className="text-xs text-gray-500 line-clamp-1">
                                {selectedAddress ? `${selectedAddress.street}, ${selectedAddress.city}` : "Select an address first"}
                            </p>
                        </div>
                    </div>
                </div>

                {/* 2. Recommended Methods (UPI) */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                    <div className="bg-gray-50 px-4 py-2 border-b border-gray-100">
                        <h3 className="text-xs font-bold text-gray-500 uppercase">Recommended</h3>
                    </div>

                    {/* Google Pay */}
                    <PaymentOption
                        id="gpay"
                        title="Google Pay"
                        icon="https://cdn.iconscout.com/icon/free/png-256/free-google-pay-logo-icon-download-in-svg-png-gif-file-formats--payment-checkout-transaction-brand-pack-logos-icons-2651061.png"
                        selected={selectedMethod}
                        onSelect={setSelectedMethod}
                    />

                    {/* PhonePe */}
                    <PaymentOption
                        id="phonepe"
                        title="PhonePe"
                        icon="https://uxwing.com/wp-content/themes/uxwing/download/brands-and-social-media/phonepe-icon.png"
                        selected={selectedMethod}
                        onSelect={setSelectedMethod}
                    />

                    {/* UPI ID */}
                    <PaymentOption
                        id="upi"
                        title="Add New UPI ID"
                        iconComponent={<div className="w-8 h-8 bg-orange-100 text-orange-600 rounded flex items-center justify-center font-bold text-[10px]">UPI</div>}
                        selected={selectedMethod}
                        onSelect={setSelectedMethod}
                    />
                </div>

                {/* 3. Cards & Others */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                    <div className="bg-gray-50 px-4 py-2 border-b border-gray-100">
                        <h3 className="text-xs font-bold text-gray-500 uppercase">Cards & Cash</h3>
                    </div>

                    <PaymentOption
                        id="card"
                        title="Credit / Debit Card"
                        subtitle="Visa, Mastercard, Rupay"
                        iconComponent={<CreditCard size={20} className="text-gray-600" />}
                        selected={selectedMethod}
                        onSelect={setSelectedMethod}
                    />

                    <PaymentOption
                        id="wallet"
                        title="Wallets"
                        subtitle="Paytm, MobiKwik, Freecharge"
                        iconComponent={<Wallet size={20} className="text-gray-600" />}
                        selected={selectedMethod}
                        onSelect={setSelectedMethod}
                    />

                    <PaymentOption
                        id="cod"
                        title="Cash on Delivery"
                        subtitle="Pay cash at your doorstep"
                        iconComponent={<Banknote size={20} className="text-green-600" />}
                        selected={selectedMethod}
                        onSelect={setSelectedMethod}
                    />
                </div>
            </div>

            {/* --- Bottom Payment Button --- */}
            <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 p-4 pb-safe shadow-[0_-4px_10px_rgba(0,0,0,0.05)]">
                <div className="max-w-2xl mx-auto">
                    <button
                        onClick={handlePayment}
                        disabled={loading}
                        className="w-full bg-[#0c831f] hover:bg-[#096a18] text-white font-bold py-4 rounded-xl shadow-lg shadow-green-200 flex items-center justify-center gap-2 active:scale-[0.98] transition-all disabled:opacity-70 disabled:cursor-not-allowed"
                    >
                        {loading ? (
                            <>
                                <Loader className="animate-spin" size={20} />
                                <span>Processing Payment...</span>
                            </>
                        ) : (
                            <>
                                <span>Pay ₹{totalAmount}</span>
                                <ChevronRight size={18} strokeWidth={3} />
                            </>
                        )}
                    </button>
                </div>
            </div>
        </div>
    );
};

// Helper Component for List Items
const PaymentOption = ({ id, title, subtitle, icon, iconComponent, selected, onSelect }) => (
    <div
        onClick={() => onSelect(id)}
        className="flex items-center gap-4 px-4 py-4 border-b border-gray-50 last:border-0 cursor-pointer active:bg-gray-50 transition-colors"
    >
        {/* Radio Circle */}
        <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 ${selected === id ? "border-[#0c831f]" : "border-gray-300"}`}>
            {selected === id && <div className="w-2.5 h-2.5 rounded-full bg-[#0c831f]" />}
        </div>

        {/* Icon */}
        <div className="w-10 h-10 border border-gray-100 rounded-lg flex items-center justify-center bg-white p-1 shrink-0">
            {icon ? (
                <img src={icon} alt={title} className="w-full h-full object-contain" />
            ) : (
                iconComponent
            )}
        </div>

        {/* Text */}
        <div className="flex-1">
            <h4 className={`text-sm ${selected === id ? "font-bold text-gray-900" : "font-medium text-gray-700"}`}>
                {title}
            </h4>
            {subtitle && <p className="text-xs text-gray-400 mt-0.5">{subtitle}</p>}
        </div>
    </div>
);

// Helper Icon
const MapPinIcon = ({ size }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
);

export default PaymentPage;