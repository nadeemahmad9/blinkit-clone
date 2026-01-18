import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Minus, Plus, ShoppingBag } from "lucide-react";
import { useCartStore } from "../../store/useCartStore";
import { useAuthStore } from '../../store/useAuthStore'

const CartDrawer = () => {
    const { cartItems, isCartOpen, closeCart, addToCart, removeFromCart, getCartTotal, placeOrder } = useCartStore();
    const { user, openLogin } = useAuthStore(); // Get User State
    const totalPrice = getCartTotal();

    const handleCheckout = async () => {
        if (!user) {
            closeCart();
            openLogin(); // Force login if not logged in
            return;
        }

        // Call the API
        await placeOrder(user._id);
    };

    return (
        <AnimatePresence>
            {isCartOpen && (
                <>
                    {/* 1. Backdrop (Click to close) */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={closeCart}
                        className="fixed inset-0 bg-black/60 z-60 backdrop-blur-sm"
                    />

                    {/* 2. Slide-up Panel */}
                    <motion.div
                        initial={{ y: "100%" }}
                        animate={{ y: 0 }}
                        exit={{ y: "100%" }}
                        transition={{ type: "spring", damping: 25, stiffness: 300 }}
                        className="fixed bottom-0 left-0 right-0 bg-brand-gray rounded-t-2xl z-70 h-[85vh] flex flex-col shadow-2xl overflow-hidden md:max-w-md md:left-auto md:right-0 md:h-full md:rounded-none"
                    >
                        {/* Header */}
                        <div className="bg-white p-4 flex items-center justify-between border-b border-gray-100">
                            <h2 className="text-lg font-bold text-brand-dark flex items-center gap-2">
                                <ShoppingBag size={20} />
                                My Cart
                            </h2>
                            <button onClick={closeCart} className="p-2 bg-gray-100 rounded-full hover:bg-gray-200">
                                <X size={20} className="text-gray-600" />
                            </button>
                        </div>

                        {/* Scrollable Items List */}
                        <div className="flex-1 overflow-y-auto p-4 space-y-4">
                            {cartItems.length === 0 ? (
                                <div className="flex flex-col items-center justify-center h-full text-gray-400">
                                    <ShoppingBag size={48} className="mb-2 opacity-20" />
                                    <p className="text-sm font-medium">Your cart is empty</p>
                                </div>
                            ) : (
                                <div className="bg-white rounded-xl p-3 shadow-sm">
                                    {cartItems.map((item) => (
                                        <div key={item.id} className="flex items-center justify-between py-3 border-b border-gray-50 last:border-0">
                                            <div className="flex gap-3 items-center">
                                                <div className="w-12 h-12 bg-gray-50 rounded-lg flex items-center justify-center">
                                                    <img src={item.image} alt="" className="w-full h-full object-contain mix-blend-multiply" />
                                                </div>
                                                <div className="flex flex-col">
                                                    <span className="text-xs font-medium text-brand-dark line-clamp-1 w-32">{item.name}</span>
                                                    <span className="text-xs text-gray-500">{item.weight}</span>
                                                    <span className="text-sm font-bold mt-1">₹{item.price}</span>
                                                </div>
                                            </div>

                                            {/* Counter */}
                                            <div className="flex items-center bg-brand-green text-white rounded-lg px-2 py-1 h-8">
                                                <button onClick={() => removeFromCart(item.id)}><Minus size={14} /></button>
                                                <span className="text-xs font-bold mx-2">{item.quantity}</span>
                                                <button onClick={() => addToCart(item)}><Plus size={14} /></button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}

                            {/* Bill Details Mockup */}
                            {cartItems.length > 0 && (
                                <div className="bg-white rounded-xl p-3 shadow-sm space-y-2">
                                    <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Bill Details</h3>
                                    <div className="flex justify-between text-xs text-gray-600">
                                        <span>Item Total</span>
                                        <span>₹{totalPrice}</span>
                                    </div>
                                    <div className="flex justify-between text-xs text-gray-600">
                                        <span>Delivery Charge</span>
                                        <span className="text-brand-green font-bold">FREE</span>
                                    </div>
                                    <div className="flex justify-between text-sm font-bold text-brand-dark pt-2 border-t border-gray-100">
                                        <span>Grand Total</span>
                                        <span>₹{totalPrice}</span>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Bottom Pay Button */}
                        {cartItems.length > 0 && (
                            <div className="p-4 bg-white border-t border-gray-100 pb-safe">
                                <button onClick={handleCheckout} className="w-full bg-brand-green text-white font-bold py-3.5 rounded-xl shadow-lg shadow-green-200 flex items-center justify-between px-4 active:scale-95 transition-transform">
                                    <div className="flex flex-col items-start leading-4">
                                        <span className="text-sm">₹{totalPrice}</span>
                                        <span className="text-[10px] opacity-80 font-medium">TOTAL</span>
                                    </div>
                                    <div className="flex items-center gap-1 text-sm">
                                        Proceed to Pay <span className="text-lg">→</span>
                                    </div>
                                </button>
                            </div>
                        )}
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
};

export default CartDrawer;