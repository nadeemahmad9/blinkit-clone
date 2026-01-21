// import React, { useEffect, useState } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import { ArrowLeft, Clock, ShieldCheck, Star } from "lucide-react";
// import api from "../services/api";
// import { useCartStore } from "../store/useCartStore";

// const ProductDetails = () => {
//     const { id } = useParams();
//     const navigate = useNavigate();
//     const { addToCart, cartItems, removeFromCart } = useCartStore();

//     const [product, setProduct] = useState(null);
//     const [loading, setLoading] = useState(true);

//     // Check if item is already in cart
//     const cartItem = cartItems.find((item) => item._id === id);
//     const quantity = cartItem ? cartItem.quantity : 0;

//     useEffect(() => {
//         const fetchProduct = async () => {
//             try {
//                 // 2. Use 'api.get' instead of 'axios.get'
//                 // The baseURL is already handled in api.js, so just pass the endpoint
//                 const { data } = await api.get(`/products/${id}`);
//                 setProduct(data);
//             } catch (error) {
//                 console.error("Error fetching product:", error);
//             } finally {
//                 setLoading(false);
//             }
//         };

//         if (id) {
//             fetchProduct();
//         }
//     }, [id]);

//     if (loading) return <div className="min-h-screen flex justify-center items-center"><div className="animate-spin w-8 h-8 border-2 border-brand-green rounded-full border-t-transparent"></div></div>;
//     if (!product) return <div className="text-center py-20">Product not found</div>;

//     return (
//         <div className="bg-white min-h-screen pb-24 font-sans relative">

//             {/* 1. Header (Floating back button) */}
//             <div className="absolute top-4 left-4 z-10">
//                 <button onClick={() => navigate(-1)} className="bg-white/80 backdrop-blur-sm p-2 rounded-full shadow-sm">
//                     <ArrowLeft size={24} className="text-gray-800" />
//                 </button>
//             </div>

//             {/* 2. Product Image Section */}
//             <div className="bg-[#F4F6FB] h-80 flex items-center justify-center p-8 relative">
//                 <img src={product.image} alt={product.name} className="h-full object-contain mix-blend-multiply" />
//                 {product.discount > 0 && (
//                     <div className="absolute top-4 right-4 bg-brand-blue text-white text-[10px] font-bold px-2 py-1 rounded-md">
//                         {product.discount}% OFF
//                     </div>
//                 )}
//             </div>

//             {/* 3. Product Info */}
//             <div className="p-4">
//                 <div className="mb-1">
//                     <h1 className="text-xl font-bold text-brand-dark leading-snug">{product.name}</h1>
//                     <div className="flex items-center gap-2 mt-2">
//                         <div className="bg-gray-100 px-2 py-1 rounded text-[10px] font-bold text-gray-600">
//                             {product.time} MINS
//                         </div>
//                         <div className="bg-gray-100 px-2 py-1 rounded text-[10px] font-bold text-gray-600">
//                             {product.weight}
//                         </div>
//                     </div>
//                 </div>

//                 <div className="my-6 border-b border-gray-100 pb-6">
//                     <div className="flex items-center gap-2">
//                         <span className="text-xl font-bold text-brand-dark">₹{product.price}</span>
//                         {product.originalPrice > product.price && (
//                             <span className="text-sm text-gray-400 line-through">₹{product.originalPrice}</span>
//                         )}
//                     </div>
//                     <p className="text-xs text-gray-400 mt-1">(Inclusive of all taxes)</p>
//                 </div>

//                 {/* Trust Markers */}
//                 <div className="space-y-4 mb-6">
//                     <h3 className="text-sm font-bold text-brand-dark">Why shop from Blinkit?</h3>
//                     <div className="flex items-start gap-3">
//                         <div className="bg-green-50 p-2 rounded-full text-brand-green"><Clock size={16} /></div>
//                         <div>
//                             <h4 className="text-xs font-bold text-gray-800">Superfast Delivery</h4>
//                             <p className="text-[10px] text-gray-500">Get your order delivered to your doorstep in minutes.</p>
//                         </div>
//                     </div>
//                     <div className="flex items-start gap-3">
//                         <div className="bg-blue-50 p-2 rounded-full text-brand-blue"><ShieldCheck size={16} /></div>
//                         <div>
//                             <h4 className="text-xs font-bold text-gray-800">Best Prices & Offers</h4>
//                             <p className="text-[10px] text-gray-500">Best price destination with offers directly from the manufacturers.</p>
//                         </div>
//                     </div>
//                 </div>

//                 {/* Product Details Text (Mock) */}
//                 <div>
//                     <h3 className="text-sm font-bold text-brand-dark mb-2">Product Details</h3>
//                     <p className="text-xs text-gray-500 leading-relaxed">
//                         This is a premium quality product sourced directly from trusted partners.
//                         Perfect for your daily needs. Store in a cool and dry place.
//                     </p>
//                 </div>
//             </div>

//             {/* 4. Sticky Bottom Action Bar */}
//             <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 p-4 pb-safe flex items-center justify-between shadow-lg z-20">
//                 {quantity === 0 ? (
//                     <button
//                         onClick={() => addToCart(product)}
//                         className="w-full bg-brand-green text-white font-bold py-3.5 rounded-xl shadow-md active:scale-95 transition-transform"
//                     >
//                         Add to Cart
//                     </button>
//                 ) : (
//                     <div className="w-full flex items-center justify-between bg-brand-green text-white rounded-xl overflow-hidden shadow-md">
//                         <button onClick={() => removeFromCart(product._id)} className="px-6 py-3.5 hover:bg-green-700 font-bold text-lg">-</button>
//                         <div className="flex flex-col items-center">
//                             <span className="font-bold">{quantity}</span>
//                             <span className="text-[9px] opacity-80 uppercase">in cart</span>
//                         </div>
//                         <button onClick={() => addToCart(product)} className="px-6 py-3.5 hover:bg-green-700 font-bold text-lg">+</button>
//                     </div>
//                 )}
//             </div>

//         </div>
//     );
// };

// export default ProductDetails;


import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ChevronDown, ArrowLeft, Clock, ShieldCheck, ShoppingBag } from "lucide-react";
import api from "../services/api"; // Your API helper
import { useCartStore } from "../store/useCartStore";

const ProductDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { addToCart, cartItems, removeFromCart } = useCartStore();

    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [activeImage, setActiveImage] = useState("");
    const [detailsExpanded, setDetailsExpanded] = useState(false);

    // Check if item is in cart
    const cartItem = cartItems.find((item) => item._id === id);
    const quantity = cartItem ? cartItem.quantity : 0;

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const { data } = await api.get(`/products/${id}`);
                setProduct(data);
                // Set initial image (handle if it's an array or string)
                setActiveImage(data.image);
            } catch (error) {
                console.error("Error fetching product:", error);
            } finally {
                setLoading(false);
            }
        };

        if (id) fetchProduct();
    }, [id]);

    if (loading) return (
        <div className="min-h-screen flex justify-center items-center">
            <div className="animate-spin w-8 h-8 border-2 border-brand-green rounded-full border-t-transparent"></div>
        </div>
    );

    if (!product) return <div className="text-center py-20">Product not found</div>;

    // --- DERIVED DATA FOR UI ---
    // If your backend doesn't have an 'images' array yet, we create a fake one so the carousel works
    const images = product.images || [product.image];

    // If your backend doesn't have 'variants', we create a single variant from the main product
    const variants = product.variants || [
        {
            id: product._id,
            size: product.weight || "Standard",
            price: product.price,
            mrp: product.originalPrice,
            off: product.discount ? `${product.discount}%` : ""
        }
    ];

    // Default to the first variant (which is the product itself if no variants exist)
    const selectedVariant = variants[0];

    return (
        <div className="min-h-screen bg-white font-sans text-gray-900 pb-24 md:pb-0">

            {/* Mobile Back Button (Visible only on small screens) */}
            <div className="lg:hidden absolute top-4 left-4 z-10">
                <button onClick={() => navigate(-1)} className="bg-white/80 backdrop-blur-sm p-2 rounded-full shadow-sm">
                    <ArrowLeft size={24} className="text-gray-800" />
                </button>
            </div>

            <div className="max-w-7xl mx-auto flex flex-col lg:flex-row">

                {/* --- LEFT COLUMN: IMAGES & DETAILS --- */}
                <div className="w-full lg:w-1/2 p-4 lg:p-8 border-r border-gray-100">

                    {/* Main Image View */}
                    <div className="w-full h-[350px] md:h-[480px] flex items-center justify-center border border-gray-100 rounded-xl overflow-hidden mb-6 relative bg-white">
                        <img
                            src={activeImage}
                            alt={product.name}
                            className="h-full object-contain mix-blend-multiply hover:scale-105 transition-transform duration-300"
                        />
                    </div>

                    {/* Carousel Thumbnails (Only show if multiple images exist) */}
                    {images.length > 1 && (
                        <div className="flex gap-3 overflow-x-auto pb-4 no-scrollbar">
                            {images.map((img, idx) => (
                                <button
                                    key={idx}
                                    onClick={() => setActiveImage(img)}
                                    className={`flex-shrink-0 w-16 h-16 md:w-20 md:h-20 border rounded-lg p-1 transition-all ${activeImage === img ? 'border-green-600 bg-green-50' : 'border-gray-200'
                                        }`}
                                >
                                    <img src={img} alt={`thumb-${idx}`} className="w-full h-full object-contain" />
                                </button>
                            ))}
                        </div>
                    )}

                    {/* Product Details Section */}
                    <div className="mt-8">
                        <h3 className="text-xl font-extrabold text-gray-800 mb-4">Product Details</h3>

                        <div className="space-y-4">
                            <div className="border-b border-gray-50 pb-3">
                                <p className="text-xs font-semibold text-gray-500 mb-1">Category</p>
                                <p className="text-sm text-gray-800 capitalize">{product.category}</p>
                            </div>

                            <div className="border-b border-gray-50 pb-3">
                                <p className="text-xs font-semibold text-gray-500 mb-1">Unit</p>
                                <p className="text-sm text-gray-800">{product.weight}</p>
                            </div>

                            {/* Expandable Section (Mock Details for now) */}
                            {detailsExpanded && (
                                <div className="animate-fadeIn">
                                    <div className="border-b border-gray-50 pb-3">
                                        <p className="text-xs font-semibold text-gray-500 mb-1">Shelf Life</p>
                                        <p className="text-sm text-gray-800">3 Days</p>
                                    </div>
                                    <div className="border-b border-gray-50 pb-3">
                                        <p className="text-xs font-semibold text-gray-500 mb-1">Manufacturer Details</p>
                                        <p className="text-sm text-gray-800">Blinkit Commerce Private Limited</p>
                                    </div>
                                    <div className="border-b border-gray-50 pb-3">
                                        <p className="text-xs font-semibold text-gray-500 mb-1">Disclaimer</p>
                                        <p className="text-xs text-gray-500 leading-relaxed">
                                            Every effort is made to maintain accuracy of all information. However, actual product packaging and materials may contain more and/or different information.
                                        </p>
                                    </div>
                                </div>
                            )}

                            <button
                                onClick={() => setDetailsExpanded(!detailsExpanded)}
                                className="text-green-700 text-sm font-semibold flex items-center gap-1 mt-2"
                            >
                                {detailsExpanded ? 'View less details' : 'View more details'}
                                <ChevronDown size={16} className={`transition-transform ${detailsExpanded ? 'rotate-180' : ''}`} />
                            </button>
                        </div>
                    </div>
                </div>

                {/* --- RIGHT COLUMN: INFO & BUYING --- */}
                <div className="w-full lg:w-1/2 p-4 lg:p-8">

                    {/* Breadcrumbs (Desktop) */}
                    <nav className="hidden lg:block text-xs text-gray-500 mb-4">
                        <span className="hover:text-green-700 cursor-pointer" onClick={() => navigate("/")}>Home</span>
                        <span className="mx-1">/</span>
                        <span className="hover:text-green-700 cursor-pointer capitalize">{product.category}</span>
                        <span className="mx-1">/</span>
                        <span className="text-gray-800 font-medium">{product.name}</span>
                    </nav>

                    {/* Title */}
                    <h1 className="text-xl md:text-3xl font-extrabold text-gray-900 mb-2 md:mb-6 leading-tight">
                        {product.name}
                    </h1>

                    {/* Time Badge */}
                    <div className="bg-gray-100 w-fit px-2 py-1 rounded mb-6 flex items-center gap-1.5">
                        <Clock size={14} className="text-gray-600" />
                        <span className="text-[10px] md:text-xs font-bold text-gray-600">{product.time || "10"} MINS</span>
                    </div>

                    {/* Variant Selector (Visual Only if no backend variants) */}
                    <div className="mb-8">
                        <div className="flex justify-between items-center mb-3">
                            <span className="text-sm font-bold text-gray-700">Select Unit</span>
                        </div>

                        <div className="flex gap-3 overflow-x-auto pb-4 no-scrollbar">
                            {variants.map((variant) => (
                                <div
                                    key={variant.id}
                                    className={`relative flex-shrink-0 w-[100px] p-2 rounded-xl border text-left transition-all ${selectedVariant.id === variant.id
                                        ? 'border-green-600 bg-[#f7fffa] ring-1 ring-green-600'
                                        : 'border-gray-200 bg-white'
                                        }`}
                                >
                                    {variant.off && (
                                        <div className="absolute -top-2 left-1/2 -translate-x-1/2 bg-[#538CEE] text-white text-[9px] font-bold px-1.5 py-0.5 rounded-[4px] shadow-sm whitespace-nowrap z-10">
                                            {variant.off} OFF
                                        </div>
                                    )}

                                    <div className="mt-2 text-center">
                                        <p className="text-xs font-semibold text-gray-700 mb-1">{variant.size}</p>
                                        <div className="flex justify-center items-center gap-1.5">
                                            <span className="text-sm font-extrabold text-gray-900">₹{variant.price}</span>
                                            {variant.mrp > variant.price && (
                                                <span className="text-xs text-gray-400 line-through">₹{variant.mrp}</span>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Desktop Buying Section */}
                    <div className="hidden lg:block bg-white rounded-xl p-0 mb-8">
                        {/* ... Desktop specific cart buttons can go here ... */}
                    </div>

                    {/* Promises Section */}
                    <div className="mt-4 md:mt-8">
                        <h4 className="text-sm font-bold text-gray-900 mb-4">Why shop from blinkit?</h4>
                        <div className="space-y-6">
                            <div className="flex items-start gap-4">
                                <div className="w-10 h-10 flex-shrink-0 bg-blue-50 rounded-full flex items-center justify-center">
                                    <img src="https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=90/assets/web/blinkit-promises/10_minute_delivery.png" className="w-6 h-6 object-contain" alt="Fast" />
                                </div>
                                <div>
                                    <h5 className="text-xs md:text-sm font-bold text-gray-900">Round The Clock Delivery</h5>
                                    <p className="text-[10px] md:text-xs text-gray-500 mt-0.5 leading-relaxed">
                                        Get items delivered to your doorstep from dark stores near you.
                                    </p>
                                </div>
                            </div>
                            <div className="flex items-start gap-4">
                                <div className="w-10 h-10 flex-shrink-0 bg-blue-50 rounded-full flex items-center justify-center">
                                    <img src="https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=90/assets/web/blinkit-promises/Best_Prices_Offers.png" className="w-6 h-6 object-contain" alt="Best Prices" />
                                </div>
                                <div>
                                    <h5 className="text-xs md:text-sm font-bold text-gray-900">Best Prices & Offers</h5>
                                    <p className="text-[10px] md:text-xs text-gray-500 mt-0.5 leading-relaxed">
                                        Best price destination with offers directly from the manufacturers.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>

            {/* --- FLOATING BOTTOM BAR (Mobile & Desktop) --- */}
            <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 p-4 pb-safe z-30 shadow-[0_-4px_10px_rgba(0,0,0,0.05)]">
                <div className="max-w-7xl mx-auto flex items-center justify-between">
                    {/* Price Info */}
                    <div className="flex flex-col">
                        <span className="text-xs md:text-sm font-bold text-gray-500 mb-0.5">
                            {selectedVariant.size}
                        </span>
                        <div className="flex items-center gap-2">
                            <span className="text-lg md:text-xl font-extrabold text-gray-900">₹{selectedVariant.price}</span>
                            {selectedVariant.mrp > selectedVariant.price && (
                                <span className="text-xs md:text-sm text-gray-400 line-through">₹{selectedVariant.mrp}</span>
                            )}
                        </div>
                        <span className="text-[9px] text-gray-500 font-medium">(Inclusive of all taxes)</span>
                    </div>

                    {/* Action Button */}
                    <div className="w-1/2 md:w-auto">
                        {quantity === 0 ? (
                            <button
                                onClick={() => addToCart(product)}
                                className="w-full md:w-48 bg-[#0c831f] hover:bg-[#096b1a] text-white font-bold py-3 px-4 rounded-xl shadow-md active:scale-95 transition-transform flex items-center justify-center gap-2"
                            >
                                Add to cart
                            </button>
                        ) : (
                            <div className="w-full md:w-48 flex items-center justify-between bg-[#0c831f] text-white rounded-xl overflow-hidden shadow-md">
                                <button onClick={() => removeFromCart(product._id)} className="px-4 py-3 hover:bg-[#0b721b] font-bold text-lg">-</button>
                                <div className="flex flex-col items-center">
                                    <span className="font-bold">{quantity}</span>
                                    <span className="text-[9px] opacity-80 uppercase leading-none">in cart</span>
                                </div>
                                <button onClick={() => addToCart(product)} className="px-4 py-3 hover:bg-[#0b721b] font-bold text-lg">+</button>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            <style>{`
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
        </div>
    );
};

export default ProductDetails;