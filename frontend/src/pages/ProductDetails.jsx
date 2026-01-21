import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Clock, ShieldCheck, Star } from "lucide-react";
import api from "../services/api";
import useCartStore from "../store/useCartStore";

const ProductDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { addToCart, cartItems, removeFromCart } = useCartStore();

    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);

    // Check if item is already in cart
    const cartItem = cartItems.find((item) => item._id === id);
    const quantity = cartItem ? cartItem.quantity : 0;

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const { data } = await api.get(`/api/products/${id}`);
                setProduct(data);
            } catch (error) {
                console.error("Error fetching product:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchProduct();
    }, [id]);

    if (loading) return <div className="min-h-screen flex justify-center items-center"><div className="animate-spin w-8 h-8 border-2 border-brand-green rounded-full border-t-transparent"></div></div>;
    if (!product) return <div className="text-center py-20">Product not found</div>;

    return (
        <div className="bg-white min-h-screen pb-24 font-sans relative">

            {/* 1. Header (Floating back button) */}
            <div className="absolute top-4 left-4 z-10">
                <button onClick={() => navigate(-1)} className="bg-white/80 backdrop-blur-sm p-2 rounded-full shadow-sm">
                    <ArrowLeft size={24} className="text-gray-800" />
                </button>
            </div>

            {/* 2. Product Image Section */}
            <div className="bg-[#F4F6FB] h-80 flex items-center justify-center p-8 relative">
                <img src={product.image} alt={product.name} className="h-full object-contain mix-blend-multiply" />
                {product.discount > 0 && (
                    <div className="absolute top-4 right-4 bg-brand-blue text-white text-[10px] font-bold px-2 py-1 rounded-md">
                        {product.discount}% OFF
                    </div>
                )}
            </div>

            {/* 3. Product Info */}
            <div className="p-4">
                <div className="mb-1">
                    <h1 className="text-xl font-bold text-brand-dark leading-snug">{product.name}</h1>
                    <div className="flex items-center gap-2 mt-2">
                        <div className="bg-gray-100 px-2 py-1 rounded text-[10px] font-bold text-gray-600">
                            {product.time} MINS
                        </div>
                        <div className="bg-gray-100 px-2 py-1 rounded text-[10px] font-bold text-gray-600">
                            {product.weight}
                        </div>
                    </div>
                </div>

                <div className="my-6 border-b border-gray-100 pb-6">
                    <div className="flex items-center gap-2">
                        <span className="text-xl font-bold text-brand-dark">₹{product.price}</span>
                        {product.originalPrice > product.price && (
                            <span className="text-sm text-gray-400 line-through">₹{product.originalPrice}</span>
                        )}
                    </div>
                    <p className="text-xs text-gray-400 mt-1">(Inclusive of all taxes)</p>
                </div>

                {/* Trust Markers */}
                <div className="space-y-4 mb-6">
                    <h3 className="text-sm font-bold text-brand-dark">Why shop from Blinkit?</h3>
                    <div className="flex items-start gap-3">
                        <div className="bg-green-50 p-2 rounded-full text-brand-green"><Clock size={16} /></div>
                        <div>
                            <h4 className="text-xs font-bold text-gray-800">Superfast Delivery</h4>
                            <p className="text-[10px] text-gray-500">Get your order delivered to your doorstep in minutes.</p>
                        </div>
                    </div>
                    <div className="flex items-start gap-3">
                        <div className="bg-blue-50 p-2 rounded-full text-brand-blue"><ShieldCheck size={16} /></div>
                        <div>
                            <h4 className="text-xs font-bold text-gray-800">Best Prices & Offers</h4>
                            <p className="text-[10px] text-gray-500">Best price destination with offers directly from the manufacturers.</p>
                        </div>
                    </div>
                </div>

                {/* Product Details Text (Mock) */}
                <div>
                    <h3 className="text-sm font-bold text-brand-dark mb-2">Product Details</h3>
                    <p className="text-xs text-gray-500 leading-relaxed">
                        This is a premium quality product sourced directly from trusted partners.
                        Perfect for your daily needs. Store in a cool and dry place.
                    </p>
                </div>
            </div>

            {/* 4. Sticky Bottom Action Bar */}
            <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 p-4 pb-safe flex items-center justify-between shadow-lg z-20">
                {quantity === 0 ? (
                    <button
                        onClick={() => addToCart(product)}
                        className="w-full bg-brand-green text-white font-bold py-3.5 rounded-xl shadow-md active:scale-95 transition-transform"
                    >
                        Add to Cart
                    </button>
                ) : (
                    <div className="w-full flex items-center justify-between bg-brand-green text-white rounded-xl overflow-hidden shadow-md">
                        <button onClick={() => removeFromCart(product._id)} className="px-6 py-3.5 hover:bg-green-700 font-bold text-lg">-</button>
                        <div className="flex flex-col items-center">
                            <span className="font-bold">{quantity}</span>
                            <span className="text-[9px] opacity-80 uppercase">in cart</span>
                        </div>
                        <button onClick={() => addToCart(product)} className="px-6 py-3.5 hover:bg-green-700 font-bold text-lg">+</button>
                    </div>
                )}
            </div>

        </div>
    );
};

export default ProductDetails;