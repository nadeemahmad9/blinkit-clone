// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { ArrowLeft, Clock, ShoppingBag, CheckCircle } from "lucide-react";
// import { useNavigate } from "react-router-dom";
// import { useAuthStore } from "../store/useAuthStore";

// const Orders = () => {
//     const navigate = useNavigate();
//     const { user } = useAuthStore();
//     const [orders, setOrders] = useState([]);
//     const [loading, setLoading] = useState(true);

//     useEffect(() => {
//         if (!user) {
//             navigate("/"); // Redirect if not logged in
//             return;
//         }

//         const fetchOrders = async () => {
//             try {
//                 const { data } = await axios.get(`/api/orders/myorders?userId=${user._id}`);
//                 setOrders(data);
//             } catch (error) {
//                 console.error("Error fetching orders:", error);
//             } finally {
//                 setLoading(false);
//             }
//         };

//         fetchOrders();
//     }, [user, navigate]);

//     return (
//         <div className="bg-[#F4F6FB] min-h-screen pb-20 font-sans">
//             {/* Header */}
//             <div className="bg-white p-4 flex items-center gap-3 sticky top-0 z-10 border-b border-gray-100 shadow-sm">
//                 <button onClick={() => navigate("/")} className="p-2 -ml-2 hover:bg-gray-100 rounded-full">
//                     <ArrowLeft size={24} className="text-gray-700" />
//                 </button>
//                 <h1 className="text-lg font-bold text-brand-dark">My Orders</h1>
//             </div>

//             <div className="p-4 space-y-4">
//                 {loading ? (
//                     <div className="text-center text-gray-500 py-10">Loading orders...</div>
//                 ) : orders.length === 0 ? (
//                     <div className="flex flex-col items-center justify-center py-20 text-gray-400">
//                         <ShoppingBag size={48} className="mb-3 opacity-20" />
//                         <p>No past orders found.</p>
//                     </div>
//                 ) : (
//                     orders.map((order) => (
//                         <div key={order._id} className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
//                             {/* Order Header */}
//                             <div className="flex justify-between items-start mb-3 pb-3 border-b border-gray-50 border-dashed">
//                                 <div className="flex items-center gap-2">
//                                     <div className="bg-brand-green/10 p-1.5 rounded-lg">
//                                         <ShoppingBag size={16} className="text-brand-green" />
//                                     </div>
//                                     <div>
//                                         <p className="text-xs font-bold text-gray-900">Order #{order._id.slice(-6)}</p>
//                                         <p className="text-[10px] text-gray-500">
//                                             {new Date(order.createdAt).toLocaleDateString()} at {new Date(order.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
//                                         </p>
//                                     </div>
//                                 </div>
//                                 <div className="bg-green-50 text-brand-green px-2 py-1 rounded text-[10px] font-bold flex items-center gap-1">
//                                     <CheckCircle size={10} /> {order.status}
//                                 </div>
//                             </div>

//                             {/* Items Summary */}
//                             <div className="space-y-2 mb-3">
//                                 {order.orderItems.map((item, idx) => (
//                                     <div key={idx} className="flex justify-between items-center text-xs">
//                                         <span className="text-gray-600 truncate max-w-[200px]">
//                                             {item.qty} x {item.name}
//                                         </span>
//                                         <span className="font-medium text-gray-900">₹{item.price * item.qty}</span>
//                                     </div>
//                                 ))}
//                             </div>

//                             {/* Total */}
//                             <div className="flex justify-between items-center pt-2 border-t border-gray-100">
//                                 <span className="text-xs font-bold text-gray-500">Total Paid</span>
//                                 <span className="text-sm font-extrabold text-brand-dark">₹{order.totalPrice}</span>
//                             </div>
//                         </div>
//                     ))
//                 )}
//             </div>
//         </div>
//     );
// };

// export default Orders;


// import React, { useEffect, useState } from "react";
// // ❌ Remove: import axios from "axios";
// // ✅ Add: Import your API helper
// import api from "../services/api";
// import { ArrowLeft, ShoppingBag, CheckCircle, Loader } from "lucide-react";
// import { useNavigate } from "react-router-dom";
// import { useAuthStore } from "../store/useAuthStore";

// const Orders = () => {
//     const navigate = useNavigate();
//     const { user } = useAuthStore();
//     const [orders, setOrders] = useState([]);
//     const [loading, setLoading] = useState(true);

//     useEffect(() => {
//         if (!user) {
//             navigate("/"); // Redirect if not logged in
//             return;
//         }

//         const fetchOrders = async () => {
//             try {
//                 // ✅ FIX: Use 'api.get' (Uses Render URL automatically)
//                 // Note: removed '/api' prefix, as api.js handles it
//                 // Also handling both ID formats just in case (user._id or user.id)
//                 const userId = user._id || user.id;
//                 const { data } = await api.get(`/orders/myorders/${userId}`);

//                 // ✅ Safety Check: Ensure we got an array
//                 if (Array.isArray(data)) {
//                     setOrders(data);
//                 } else {
//                     console.error("Orders data is not an array:", data);
//                     setOrders([]);
//                 }
//             } catch (error) {
//                 console.error("Error fetching orders:", error);
//             } finally {
//                 setLoading(false);
//             }
//         };

//         fetchOrders();
//     }, [user, navigate]);

//     return (
//         <div className="bg-[#F4F6FB] min-h-screen pb-20 font-sans">
//             {/* Header */}
//             <div className="bg-white p-4 flex items-center gap-3 sticky top-0 z-10 border-b border-gray-100 shadow-sm">
//                 <button onClick={() => navigate("/")} className="p-2 -ml-2 hover:bg-gray-100 rounded-full">
//                     <ArrowLeft size={24} className="text-gray-700" />
//                 </button>
//                 <h1 className="text-lg font-bold text-brand-dark">My Orders</h1>
//             </div>

//             <div className="p-4 space-y-4">
//                 {loading ? (
//                     <div className="flex flex-col items-center justify-center py-20">
//                         <Loader className="animate-spin text-brand-green mb-2" size={32} />
//                         <span className="text-gray-500 text-sm">Loading your orders...</span>
//                     </div>
//                 ) : orders.length === 0 ? (
//                     <div className="flex flex-col items-center justify-center py-20 text-gray-400">
//                         <ShoppingBag size={48} className="mb-3 opacity-20" />
//                         <p>No past orders found.</p>
//                         <button onClick={() => navigate("/")} className="mt-4 text-brand-green font-bold text-sm">Start Shopping</button>
//                     </div>
//                 ) : (
//                     orders.map((order) => (
//                         <div key={order._id} className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
//                             {/* Order Header */}
//                             <div className="flex justify-between items-start mb-3 pb-3 border-b border-gray-50 border-dashed">
//                                 <div className="flex items-center gap-2">
//                                     <div className="bg-green-50 p-1.5 rounded-lg">
//                                         <ShoppingBag size={16} className="text-brand-green" />
//                                     </div>
//                                     <div>
//                                         <p className="text-xs font-bold text-gray-900">Order #{order._id.slice(-6)}</p>
//                                         <p className="text-[10px] text-gray-500">
//                                             {new Date(order.createdAt).toLocaleDateString()} at {new Date(order.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
//                                         </p>
//                                     </div>
//                                 </div>
//                                 <div className="bg-green-50 text-brand-green px-2 py-1 rounded text-[10px] font-bold flex items-center gap-1">
//                                     <CheckCircle size={10} /> {order.status || "Paid"}
//                                 </div>
//                             </div>

//                             {/* Items Summary */}
//                             <div className="space-y-2 mb-3">
//                                 {order.orderItems.map((item, idx) => (
//                                     <div key={idx} className="flex justify-between items-center text-xs">
//                                         <span className="text-gray-600 truncate max-w-[200px] flex-1">
//                                             {item.qty} x {item.name}
//                                         </span>
//                                         <span className="font-medium text-gray-900 ml-2">₹{item.price * item.qty}</span>
//                                     </div>
//                                 ))}
//                             </div>

//                             {/* Total */}
//                             <div className="flex justify-between items-center pt-2 border-t border-gray-100">
//                                 <span className="text-xs font-bold text-gray-500">Total Paid</span>
//                                 <span className="text-sm font-extrabold text-brand-dark">₹{order.totalPrice}</span>
//                             </div>
//                         </div>
//                     ))
//                 )}
//             </div>
//         </div>
//     );
// };

// export default Orders;



// import React, { useEffect, useState } from "react";
// import { ArrowLeft, ShoppingBag, CheckCircle, Loader, AlertCircle } from "lucide-react";
// import { useNavigate } from "react-router-dom";
// import { useAuthStore } from "../store/useAuthStore";
// import api from "../services/api"; // ✅ Using the API helper

// const Orders = () => {
//     const navigate = useNavigate();
//     const { user } = useAuthStore();
//     const [orders, setOrders] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState("");

//     useEffect(() => {
//         if (!user) {
//             navigate("/");
//             return;
//         }

//         const fetchOrders = async () => {
//             try {
//                 const userId = user._id || user.id;

//                 // ✅ FIX: Use 'params' to send userId as a query (?userId=...)
//                 // This matches your original working code structure
//                 const { data } = await api.get('/orders/myorders', {
//                     params: { userId: userId }
//                 });

//                 console.log("Orders Fetched:", data); // 🔍 Debugging log

//                 if (Array.isArray(data)) {
//                     setOrders(data);
//                 } else if (data.orders && Array.isArray(data.orders)) {
//                     // Handle case where backend returns { success: true, orders: [...] }
//                     setOrders(data.orders);
//                 } else {
//                     console.error("Unexpected data format:", data);
//                     setOrders([]);
//                 }
//             } catch (err) {
//                 console.error("Error fetching orders:", err);
//                 setError("Failed to load your orders.");
//             } finally {
//                 setLoading(false);
//             }
//         };

//         fetchOrders();
//     }, [user, navigate]);

//     // ... Rest of your UI remains exactly the same ...
//     return (
//         <div className="bg-[#F4F6FB] min-h-screen pb-20 font-sans">
//             {/* Header */}
//             <div className="bg-white p-4 flex items-center gap-3 sticky top-0 z-10 border-b border-gray-100 shadow-sm">
//                 <button onClick={() => navigate("/")} className="p-2 -ml-2 hover:bg-gray-100 rounded-full">
//                     <ArrowLeft size={24} className="text-gray-700" />
//                 </button>
//                 <h1 className="text-lg font-bold text-brand-dark">My Orders</h1>
//             </div>

//             <div className="p-4 space-y-4">
//                 {/* Error State */}
//                 {error && (
//                     <div className="bg-red-50 text-red-600 p-4 rounded-xl flex items-center gap-3 text-sm font-medium">
//                         <AlertCircle size={20} />
//                         {error}
//                     </div>
//                 )}

//                 {loading ? (
//                     <div className="flex flex-col items-center justify-center py-20">
//                         <Loader className="animate-spin text-brand-green mb-2" size={32} />
//                         <span className="text-gray-500 text-sm">Loading your orders...</span>
//                     </div>
//                 ) : orders.length === 0 ? (
//                     <div className="flex flex-col items-center justify-center py-20 text-gray-400">
//                         <ShoppingBag size={48} className="mb-3 opacity-20" />
//                         <p>No past orders found.</p>
//                         <button onClick={() => navigate("/")} className="mt-4 text-brand-green font-bold text-sm">Start Shopping</button>
//                     </div>
//                 ) : (
//                     orders.map((order) => (
//                         <div key={order._id} className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
//                             {/* Order Header */}
//                             <div className="flex justify-between items-start mb-3 pb-3 border-b border-gray-50 border-dashed">
//                                 <div className="flex items-center gap-2">
//                                     <div className="bg-green-50 p-1.5 rounded-lg">
//                                         <ShoppingBag size={16} className="text-brand-green" />
//                                     </div>
//                                     <div>
//                                         <p className="text-xs font-bold text-gray-900">Order #{order._id.slice(-6)}</p>
//                                         <p className="text-[10px] text-gray-500">
//                                             {new Date(order.createdAt).toLocaleDateString()}
//                                         </p>
//                                     </div>
//                                 </div>
//                                 <div className="bg-green-50 text-brand-green px-2 py-1 rounded text-[10px] font-bold flex items-center gap-1">
//                                     <CheckCircle size={10} /> {order.status || "Paid"}
//                                 </div>
//                             </div>

//                             {/* Items Summary */}
//                             <div className="space-y-2 mb-3">
//                                 {order.orderItems.map((item, idx) => (
//                                     <div key={idx} className="flex justify-between items-center text-xs">
//                                         <span className="text-gray-600 truncate max-w-[200px] flex-1">
//                                             {item.qty} x {item.name}
//                                         </span>
//                                         <span className="font-medium text-gray-900 ml-2">₹{item.price * item.qty}</span>
//                                     </div>
//                                 ))}
//                             </div>

//                             {/* Total */}
//                             <div className="flex justify-between items-center pt-2 border-t border-gray-100">
//                                 <span className="text-xs font-bold text-gray-500">Total Paid</span>
//                                 <span className="text-sm font-extrabold text-brand-dark">₹{order.totalPrice}</span>
//                             </div>
//                         </div>
//                     ))
//                 )}
//             </div>
//         </div>
//     );
// };

// export default Orders;


// import React, { useEffect, useState } from "react";
// import { ArrowLeft, ShoppingBag, CheckCircle, Loader, AlertCircle, CreditCard } from "lucide-react"; // 1. Import CreditCard Icon
// import { useNavigate } from "react-router-dom";
// import { useAuthStore } from "../store/useAuthStore";
// import api from "../services/api";

// const Orders = () => {
//     const navigate = useNavigate();
//     const { user } = useAuthStore();
//     const [orders, setOrders] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState("");

//     useEffect(() => {
//         if (!user) {
//             navigate("/");
//             return;
//         }

//         const fetchOrders = async () => {
//             try {
//                 const userId = user._id || user.id;
//                 const { data } = await api.get('/orders/myorders', {
//                     params: { userId: userId }
//                 });

//                 if (Array.isArray(data)) {
//                     setOrders(data.reverse()); // Show newest first
//                 } else if (data.orders && Array.isArray(data.orders)) {
//                     setOrders(data.orders.reverse());
//                 } else {
//                     setOrders([]);
//                 }
//             } catch (err) {
//                 console.error("Error fetching orders:", err);
//                 setError("Failed to load your orders.");
//             } finally {
//                 setLoading(false);
//             }
//         };

//         fetchOrders();
//     }, [user, navigate]);


//     const getPaymentDisplay = (method) => {
//         switch (method) {
//             case "cod":
//                 return { icon: <Banknote size={14} />, text: "Cash" };
//             case "card":
//                 return { icon: <CreditCard size={14} />, text: "Card" };
//             case "upi":
//             case "gpay":
//             case "phonepe":
//                 return { icon: <Smartphone size={14} />, text: "UPI" };
//             default:
//                 return { icon: <Smartphone size={14} />, text: "UPI" }; // Fallback
//         }
//     };

//     return (
//         <div className="bg-[#F4F6FB] min-h-screen pb-20 font-sans">
//             {/* Header */}
//             <div className="bg-white p-4 flex items-center gap-3 sticky top-0 z-10 border-b border-gray-100 shadow-sm">
//                 <button onClick={() => navigate("/")} className="p-2 -ml-2 hover:bg-gray-100 rounded-full">
//                     <ArrowLeft size={24} className="text-gray-700" />
//                 </button>
//                 <h1 className="text-lg font-bold text-brand-dark">My Orders</h1>
//             </div>

//             <div className="p-4 space-y-4">
//                 {error && (
//                     <div className="bg-red-50 text-red-600 p-4 rounded-xl flex items-center gap-3 text-sm font-medium">
//                         <AlertCircle size={20} />
//                         {error}
//                     </div>
//                 )}

//                 {loading ? (
//                     <div className="flex flex-col items-center justify-center py-20">
//                         <Loader className="animate-spin text-[#0c831f] mb-2" size={32} />
//                         <span className="text-gray-500 text-sm">Loading your orders...</span>
//                     </div>
//                 ) : orders.length === 0 ? (
//                     <div className="flex flex-col items-center justify-center py-20 text-gray-400">
//                         <ShoppingBag size={48} className="mb-3 opacity-20" />
//                         <p>No past orders found.</p>
//                         <button onClick={() => navigate("/")} className="mt-4 text-[#0c831f] font-bold text-sm">Start Shopping</button>
//                     </div>
//                 ) : (
//                     orders.map((order) => (
//                         <div key={order._id} className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">

//                             {/* 1. Header: Order ID & Date */}
//                             <div className="flex justify-between items-start mb-3 pb-3 border-b border-gray-50 border-dashed">
//                                 <div className="flex items-center gap-2">
//                                     <div className="bg-green-50 p-1.5 rounded-lg">
//                                         <ShoppingBag size={16} className="text-[#0c831f]" />
//                                     </div>
//                                     <div>
//                                         <p className="text-xs font-bold text-gray-900">Order #{order._id.slice(-6).toUpperCase()}</p>
//                                         <p className="text-[10px] text-gray-500">
//                                             {new Date(order.createdAt).toLocaleDateString("en-IN", {
//                                                 day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit'
//                                             })}
//                                         </p>
//                                     </div>
//                                 </div>
//                                 <div className="bg-green-50 text-[#0c831f] px-2 py-1 rounded text-[10px] font-bold flex items-center gap-1">
//                                     <CheckCircle size={10} /> {order.status || "Paid"}
//                                 </div>
//                             </div>

//                             {/* 2. Items List */}
//                             <div className="space-y-2 mb-3">
//                                 {order.orderItems.map((item, idx) => (
//                                     <div key={idx} className="flex justify-between items-center text-xs">
//                                         <span className="text-gray-600 truncate max-w-[200px] flex-1">
//                                             {item.qty} x {item.name}
//                                         </span>
//                                         <span className="font-medium text-gray-900 ml-2">₹{item.price * item.qty}</span>
//                                     </div>
//                                 ))}
//                             </div>

//                             {/* 3. Footer: Payment Method & Total */}
//                             <div className="flex justify-between items-center pt-2 border-t border-gray-100">

//                                 {/* ✅ ADDED: Payment Method Display */}
//                                 <div className="flex items-center gap-1.5 text-xs text-gray-500">
//                                     <CreditCard size={14} />
//                                     <span className="font-medium uppercase">
//                                         {order.paymentMethod || "UPI"} {/* Fallback to UPI if missing */}
//                                     </span>
//                                 </div>

//                                 <div className="flex items-center gap-2">
//                                     <span className="text-xs font-bold text-gray-400">Total</span>
//                                     <span className="text-sm font-extrabold text-gray-900">₹{order.totalPrice}</span>
//                                 </div>
//                             </div>
//                         </div>
//                     ))
//                 )}
//             </div>
//         </div>
//     );
// };

// export default Orders;


import React, { useEffect, useState } from "react";
// 1. ADD MISSING IMPORTS (Banknote, Smartphone)
import { ArrowLeft, ShoppingBag, CheckCircle, Loader, AlertCircle, CreditCard, Banknote, Smartphone } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";
import api from "../services/api";

const Orders = () => {
    const navigate = useNavigate();
    const { user } = useAuthStore();
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        if (!user) {
            navigate("/");
            return;
        }

        const fetchOrders = async () => {
            try {
                const userId = user._id || user.id;
                const { data } = await api.get('/orders/myorders', {
                    params: { userId: userId }
                });

                if (Array.isArray(data)) {
                    setOrders(data.reverse());
                } else if (data.orders && Array.isArray(data.orders)) {
                    setOrders(data.orders.reverse());
                } else {
                    setOrders([]);
                }
            } catch (err) {
                console.error("Error fetching orders:", err);
                setError("Failed to load your orders.");
            } finally {
                setLoading(false);
            }
        };

        fetchOrders();
    }, [user, navigate]);

    // 2. Helper to get dynamic Icon & Text
    const getPaymentDisplay = (method) => {
        switch (method) {
            case "cod":
                return { icon: <Banknote size={14} />, text: "Cash" };
            case "card":
                return { icon: <CreditCard size={14} />, text: "Card" };
            case "upi":
            case "gpay":
            case "phonepe":
                return { icon: <Smartphone size={14} />, text: "UPI" };
            default:
                return { icon: <Smartphone size={14} />, text: "UPI" }; // Default to UPI
        }
    };

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
                {error && (
                    <div className="bg-red-50 text-red-600 p-4 rounded-xl flex items-center gap-3 text-sm font-medium">
                        <AlertCircle size={20} />
                        {error}
                    </div>
                )}

                {loading ? (
                    <div className="flex flex-col items-center justify-center py-20">
                        <Loader className="animate-spin text-[#0c831f] mb-2" size={32} />
                        <span className="text-gray-500 text-sm">Loading your orders...</span>
                    </div>
                ) : orders.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-20 text-gray-400">
                        <ShoppingBag size={48} className="mb-3 opacity-20" />
                        <p>No past orders found.</p>
                        <button onClick={() => navigate("/")} className="mt-4 text-[#0c831f] font-bold text-sm">Start Shopping</button>
                    </div>
                ) : (
                    orders.map((order) => {
                        // 3. GET DYNAMIC PAYMENT INFO HERE
                        const paymentInfo = getPaymentDisplay(order.paymentMethod);

                        return (
                            <div key={order._id} className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">

                                {/* Header: Order ID & Date */}
                                <div className="flex justify-between items-start mb-3 pb-3 border-b border-gray-50 border-dashed">
                                    <div className="flex items-center gap-2">
                                        <div className="bg-green-50 p-1.5 rounded-lg">
                                            <ShoppingBag size={16} className="text-[#0c831f]" />
                                        </div>
                                        <div>
                                            <p className="text-xs font-bold text-gray-900">Order #{order._id.slice(-6).toUpperCase()}</p>
                                            <p className="text-[10px] text-gray-500">
                                                {new Date(order.createdAt).toLocaleDateString("en-IN", {
                                                    day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit'
                                                })}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="bg-green-50 text-[#0c831f] px-2 py-1 rounded text-[10px] font-bold flex items-center gap-1">
                                        <CheckCircle size={10} /> {order.status || "Paid"}
                                    </div>
                                </div>

                                {/* Items List */}
                                <div className="space-y-2 mb-3">
                                    {order.orderItems.map((item, idx) => (
                                        <div key={idx} className="flex justify-between items-center text-xs">
                                            <span className="text-gray-600 truncate max-w-[200px] flex-1">
                                                {item.qty} x {item.name}
                                            </span>
                                            <span className="font-medium text-gray-900 ml-2">₹{item.price * item.qty}</span>
                                        </div>
                                    ))}
                                </div>

                                {/* 4. Footer: DISPLAY DYNAMIC PAYMENT INFO */}
                                <div className="flex justify-between items-center pt-2 border-t border-gray-100">
                                    <div className="flex items-center gap-1.5 text-xs text-gray-500">
                                        {paymentInfo.icon}
                                        <span className="font-bold text-gray-700">{paymentInfo.text}</span>
                                    </div>

                                    <div className="flex items-center gap-2">
                                        <span className="text-xs font-bold text-gray-400">Total</span>
                                        <span className="text-sm font-extrabold text-gray-900">₹{order.totalPrice}</span>
                                    </div>
                                </div>
                            </div>
                        );
                    })
                )}
            </div>
        </div>
    );
};

export default Orders;

