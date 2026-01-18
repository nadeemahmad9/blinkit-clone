import React, { useEffect, useState } from "react";
import axios from "axios";
import { ArrowLeft, Clock, ShoppingBag, CheckCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";

const Orders = () => {
    const navigate = useNavigate();
    const { user } = useAuthStore();
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!user) {
            navigate("/"); // Redirect if not logged in
            return;
        }

        const fetchOrders = async () => {
            try {
                const { data } = await axios.get(`/api/orders/myorders?userId=${user._id}`);
                setOrders(data);
            } catch (error) {
                console.error("Error fetching orders:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchOrders();
    }, [user, navigate]);

    return (
        <div className="bg-[#F4F6FB] min-h-screen pb-20 font-sans">
            {/* Header */}
            <div className="bg-white p-4 flex items-center gap-3 sticky top-0 z-10 border-b border-gray-100 shadow-sm">
                <button onClick={() => navigate("/")} className="p-2 -ml-2 hover:bg-gray-100 rounded-full">
                    <ArrowLeft size={24} className="text-gray-700" />
                </button>
                <h1 className="text-lg font-bold text-brand-dark">My Orders</h1>
            </div>

            <div className="p-4 space-y-4">
                {loading ? (
                    <div className="text-center text-gray-500 py-10">Loading orders...</div>
                ) : orders.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-20 text-gray-400">
                        <ShoppingBag size={48} className="mb-3 opacity-20" />
                        <p>No past orders found.</p>
                    </div>
                ) : (
                    orders.map((order) => (
                        <div key={order._id} className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
                            {/* Order Header */}
                            <div className="flex justify-between items-start mb-3 pb-3 border-b border-gray-50 border-dashed">
                                <div className="flex items-center gap-2">
                                    <div className="bg-brand-green/10 p-1.5 rounded-lg">
                                        <ShoppingBag size={16} className="text-brand-green" />
                                    </div>
                                    <div>
                                        <p className="text-xs font-bold text-gray-900">Order #{order._id.slice(-6)}</p>
                                        <p className="text-[10px] text-gray-500">
                                            {new Date(order.createdAt).toLocaleDateString()} at {new Date(order.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                        </p>
                                    </div>
                                </div>
                                <div className="bg-green-50 text-brand-green px-2 py-1 rounded text-[10px] font-bold flex items-center gap-1">
                                    <CheckCircle size={10} /> {order.status}
                                </div>
                            </div>

                            {/* Items Summary */}
                            <div className="space-y-2 mb-3">
                                {order.orderItems.map((item, idx) => (
                                    <div key={idx} className="flex justify-between items-center text-xs">
                                        <span className="text-gray-600 truncate max-w-[200px]">
                                            {item.qty} x {item.name}
                                        </span>
                                        <span className="font-medium text-gray-900">₹{item.price * item.qty}</span>
                                    </div>
                                ))}
                            </div>

                            {/* Total */}
                            <div className="flex justify-between items-center pt-2 border-t border-gray-100">
                                <span className="text-xs font-bold text-gray-500">Total Paid</span>
                                <span className="text-sm font-extrabold text-brand-dark">₹{order.totalPrice}</span>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default Orders;