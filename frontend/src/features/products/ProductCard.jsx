// import React from "react"; // Removed useState
// import { motion, AnimatePresence } from "framer-motion";
// import { Plus, Minus, Timer } from "lucide-react";
// import Button from "../../components/ui/Button";
// import { useCartStore } from "../../store/useCartStore"; // 1. Import Store

// const ProductCard = ({ product }) => {
//     // 2. Get the global state and functions
//     const { cartItems, addToCart, removeFromCart } = useCartStore();

//     // 3. Check if this specific product is already in the cart
//     const cartItem = cartItems.find((item) => item._id === product._id);
//     const count = cartItem ? cartItem.quantity : 0;

//     return (
//         <div className="w-48 bg-white rounded-xl  border border-gray-100 shadow-sm overflow-hidden flex flex-col h-full relative group">

//             {/* Discount Badge */}
//             {product.discount > 0 && (
//                 <div className="absolute top-0 left-0 bg-[#2e68ff] text-white text-[9px] font-extrabold px-2 py-0.5 rounded-br-lg z-10 shadow-sm">
//                     {product.discount}% OFF
//                 </div>
//             )}

//             {/* Image */}
//             <div className="p-3 flex justify-center items-center h-32 bg-white relative">
//                 <motion.img
//                     whileHover={{ scale: 1.05 }}
//                     src={product.image}
//                     alt={product.name}
//                     className="h-full object-contain mix-blend-multiply"
//                 />
//             </div>

//             {/* Details */}
//             <div className="p-3 pt-2 flex flex-col grow justify-between">
//                 <div>
//                     <h3 className="text-[13px] font-semibold text-brand-dark leading-tight line-clamp-2 h-9">
//                         {product.name}
//                     </h3>
//                     <p className="text-xs text-gray-500 mt-1">{product.weight}</p>
//                 </div>

//                 {/* Price & Actions */}
//                 <div className="flex items-center justify-between mt-3 pt-2">
//                     <div className="flex flex-col">
//                         <span className="text-xs text-gray-400 line-through">₹{product.originalPrice}</span>
//                         <span className="text-sm font-bold text-black">₹{product.price}</span>
//                     </div>

//                     {/* 4. BUTTON LOGIC CONNECTED TO STORE */}
//                     <div className="w-20 h-8 relative">
//                         <AnimatePresence mode="wait">
//                             {count === 0 ? (
//                                 <motion.div
//                                     key="add-btn"
//                                     initial={{ opacity: 0, scale: 0.8 }}
//                                     animate={{ opacity: 1, scale: 1 }}
//                                     exit={{ opacity: 0, scale: 0.8 }}
//                                     className="absolute inset-0"
//                                 >
//                                     <Button
//                                         variant="outline"
//                                         className="w-full h-full py-0 text-xs uppercase bg-green-50 border-brand-green/50"
//                                         onClick={() => addToCart(product)}
//                                     >
//                                         ADD
//                                     </Button>
//                                 </motion.div>
//                             ) : (
//                                 <motion.div
//                                     key="counter"
//                                     initial={{ opacity: 0, scale: 0.8 }}
//                                     animate={{ opacity: 1, scale: 1 }}
//                                     exit={{ opacity: 0, scale: 0.8 }}
//                                     className="absolute inset-0 flex items-center justify-between bg-brand-green text-white rounded-lg px-2 shadow-md"
//                                 >
//                                     <button onClick={() => removeFromCart(product._id)} className="p-1">
//                                         <Minus size={12} strokeWidth={3} />
//                                     </button>
//                                     <span className="text-xs font-bold">{count}</span>
//                                     <button onClick={() => addToCart(product)} className="p-1">
//                                         <Plus size={12} strokeWidth={3} />
//                                     </button>
//                                 </motion.div>
//                             )}
//                         </AnimatePresence>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default ProductCard;


// import React from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import { Plus, Minus } from "lucide-react";
// import { useCartStore } from "../../store/useCartStore";

// const ProductCard = ({ product }) => {
//     // Logic: Get state and functions
//     const { cartItems, addToCart, removeFromCart } = useCartStore();
//     const cartItem = cartItems.find((item) => item._id === product._id);
//     const count = cartItem ? cartItem.quantity : 0;

//     return (
//         <div className="w-[180px] h-full flex flex-col gap-2 shrink-0 bg-white hover:shadow-lg transition-shadow duration-300 rounded-lg p-2 cursor-pointer border border-gray-200 hover:border-gray-200 relative">

//             {/* Image Container */}
//             <div className="relative w-full h-[140px] flex items-center justify-center mb-2">

//                 {/* Discount Ribbon (Blue SVG style) */}
//                 {product.discount > 0 && (
//                     <div className="absolute top-0 left-0 z-10">
//                         <div className="relative">
//                             <svg width="29" height="28" viewBox="0 0 29 28" fill="none" xmlns="http://www.w3.org/2000/svg">
//                                 <path d="M28.9499 0C28.3999 0 27.9361 1.44696 27.9361 2.60412V27.9718L24.5708 25.9718L21.2055 27.9718L17.8402 25.9718L14.4749 27.9718L11.1096 25.9718L7.74436 27.9718L4.37907 25.9718L1.01378 27.9718V2.6037C1.01378 1.44655 0.549931 0 0 0H28.9499Z" fill="#538CEE"></path>
//                             </svg>
//                             <span className="absolute top-0 left-0 w-full h-full flex items-center justify-center text-[8px] font-bold text-white text-center leading-tight pr-1 pt-1">
//                                 {product.discount}% OFF
//                             </span>
//                         </div>
//                     </div>
//                 )}

//                 <motion.img
//                     whileHover={{ scale: 1.05 }}
//                     src={product.image}
//                     alt={product.name}
//                     className="w-[140px] h-[140px] object-contain"
//                     loading="lazy"
//                 />
//             </div>

//             {/* Details Container */}
//             <div className="flex flex-col gap-2 grow">

//                 {/* ETA Badge */}
//                 <div className="bg-[#F8F8F8] rounded px-1 py-[2px] w-fit flex items-center gap-1">
//                     <div className="w-[11px] h-[11px]">
//                         <img
//                             src="https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=90/assets/eta-icons/15-mins.png"
//                             alt="timer"
//                             className="w-full h-full object-contain"
//                         />
//                     </div>
//                     <span className="text-[9px] font-bold text-[#363636] uppercase">
//                         8 MINS
//                     </span>
//                 </div>

//                 {/* Title & Weight */}
//                 <div>
//                     <h3 className="text-[13px] font-semibold text-[#1f1f1f] leading-tight line-clamp-2 h-[36px]">
//                         {product.name}
//                     </h3>
//                     <p className="text-[12px] text-[#666] mt-1 line-clamp-1">
//                         {product.weight}
//                     </p>
//                 </div>

//                 {/* Price & Add Button Row */}
//                 <div className="flex items-center justify-between mt-auto">
//                     <div className="flex flex-col">
//                         <span className="text-[12px] font-semibold text-[#1f1f1f]">
//                             ₹{product.price}
//                         </span>
//                         {product.originalPrice > product.price && (
//                             <span className="text-[12px] text-[#828282] line-through font-normal">
//                                 ₹{product.originalPrice}
//                             </span>
//                         )}
//                     </div>

//                     {/* Interactive Button Container */}
//                     <div className="w-[70px] h-[30px] relative">
//                         <AnimatePresence mode="wait">
//                             {count === 0 ? (
//                                 <motion.div
//                                     key="add-btn"
//                                     initial={{ opacity: 0, scale: 0.8 }}
//                                     animate={{ opacity: 1, scale: 1 }}
//                                     exit={{ opacity: 0, scale: 0.8 }}
//                                     className="absolute inset-0"
//                                 >
//                                     <button
//                                         onClick={() => addToCart(product)}
//                                         className="w-full h-full border border-[#318616] text-[#318616] bg-[#F7FFF9] hover:bg-[#318616] hover:text-white rounded-lg text-[13px] font-bold uppercase transition-colors duration-200 flex items-center justify-center"
//                                     >
//                                         ADD
//                                     </button>
//                                 </motion.div>
//                             ) : (
//                                 <motion.div
//                                     key="counter"
//                                     initial={{ opacity: 0, scale: 0.8 }}
//                                     animate={{ opacity: 1, scale: 1 }}
//                                     exit={{ opacity: 0, scale: 0.8 }}
//                                     className="absolute inset-0 flex items-center justify-between bg-[#318616] text-white rounded-lg px-2 shadow-md"
//                                 >
//                                     <button onClick={() => removeFromCart(product._id)} className="flex items-center justify-center w-4 h-full">
//                                         <Minus size={10} strokeWidth={4} />
//                                     </button>
//                                     <span className="text-[11px] font-bold">{count}</span>
//                                     <button onClick={() => addToCart(product)} className="flex items-center justify-center w-4 h-full">
//                                         <Plus size={10} strokeWidth={4} />
//                                     </button>
//                                 </motion.div>
//                             )}
//                         </AnimatePresence>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default ProductCard;



import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus } from "lucide-react";
import { useNavigate } from "react-router-dom"; // 1. Import useNavigate
import useCartStore from "../../store/useCartStore";

const ProductCard = ({ product }) => {
    const navigate = useNavigate(); // 2. Initialize hook
    const { cartItems, addToCart, removeFromCart } = useCartStore();

    // Check if item is in cart
    const cartItem = cartItems.find((item) => item._id === product._id);
    const count = cartItem ? cartItem.quantity : 0;

    // 3. Navigation Helper
    const openDetails = () => {
        navigate(`/product/${product._id}`);
    };

    return (
        <div className="w-full h-full flex flex-col gap-2 shrink-0 bg-white hover:shadow-lg transition-shadow duration-300 rounded-lg p-2 border border-gray-200 hover:border-gray-200 relative">

            {/* --- CLICKABLE IMAGE SECTION --- */}
            <div
                onClick={openDetails} // 4. Add Click Handler
                className="relative w-full aspect-[5/4] flex items-center justify-center mb-1 cursor-pointer"
            >
                {/* Discount Ribbon */}
                {product.discount > 0 && (
                    <div className="absolute top-0 left-0 z-10">
                        <div className="relative">
                            <svg width="24" height="24" viewBox="0 0 29 28" fill="none" className="w-[24px] sm:w-[28px]" xmlns="http://www.w3.org/2000/svg">
                                <path d="M28.9499 0C28.3999 0 27.9361 1.44696 27.9361 2.60412V27.9718L24.5708 25.9718L21.2055 27.9718L17.8402 25.9718L14.4749 27.9718L11.1096 25.9718L7.74436 27.9718L4.37907 25.9718L1.01378 27.9718V2.6037C1.01378 1.44655 0.549931 0 0 0H28.9499Z" fill="#538CEE"></path>
                            </svg>
                            <span className="absolute top-0 left-0 w-full h-full flex items-center justify-center text-[7px] sm:text-[8px] font-bold text-white text-center leading-tight pr-1 pt-1">
                                {product.discount}%<br />OFF
                            </span>
                        </div>
                    </div>
                )}

                <motion.img
                    whileHover={{ scale: 1.05 }}
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-contain p-1"
                    loading="lazy"
                />
            </div>

            {/* Details Container */}
            <div className="flex flex-col gap-1 grow">

                {/* ETA Badge */}
                <div className="bg-[#F8F8F8] rounded px-1 py-[2px] w-fit flex items-center gap-1">
                    <div className="w-[10px] h-[10px]">
                        <img
                            src="https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=90/assets/eta-icons/15-mins.png"
                            alt="timer"
                            className="w-full h-full object-contain"
                        />
                    </div>
                    <span className="text-[8px] sm:text-[9px] font-bold text-[#363636] uppercase">
                        {product.time || 10} MINS
                    </span>
                </div>

                {/* --- CLICKABLE TITLE SECTION --- */}
                <div
                    onClick={openDetails} // 5. Add Click Handler
                    className="cursor-pointer group"
                >
                    <h3 className="text-[12px] sm:text-[13px] font-semibold text-[#1f1f1f] leading-tight line-clamp-2 min-h-[32px] sm:min-h-[36px] group-hover:text-brand-green transition-colors">
                        {product.name}
                    </h3>
                    <p className="text-[11px] sm:text-[12px] text-[#666] mt-1 line-clamp-1">
                        {product.weight}
                    </p>
                </div>

                {/* Price & Add Button Row (NOT CLICKABLE for Navigation) */}
                <div className="flex items-center justify-between mt-auto pt-2">
                    <div className="flex flex-col">
                        <span className="text-[11px] sm:text-[12px] font-semibold text-[#1f1f1f]">
                            ₹{product.price}
                        </span>
                        {product.originalPrice > product.price && (
                            <span className="text-[10px] sm:text-[11px] text-[#828282] line-through font-normal">
                                ₹{product.originalPrice}
                            </span>
                        )}
                    </div>

                    {/* Interactive Button Container */}
                    <div className="w-[65px] sm:w-[70px] h-[28px] sm:h-[30px] relative z-20"> {/* z-20 ensures button is above any other click layers */}
                        <AnimatePresence mode="wait">
                            {count === 0 ? (
                                <motion.div
                                    key="add-btn"
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.8 }}
                                    className="absolute inset-0"
                                >
                                    <button
                                        onClick={(e) => {
                                            e.stopPropagation(); // Prevent navigation when clicking Add
                                            addToCart(product);
                                        }}
                                        className="w-full h-full border border-[#318616] text-[#318616] bg-[#F7FFF9] hover:bg-[#318616] hover:text-white rounded-lg text-[12px] sm:text-[13px] font-bold uppercase transition-colors duration-200 flex items-center justify-center shadow-sm"
                                    >
                                        ADD
                                    </button>
                                </motion.div>
                            ) : (
                                <motion.div
                                    key="counter"
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.8 }}
                                    className="absolute inset-0 flex items-center justify-between bg-[#318616] text-white rounded-lg px-2 shadow-md"
                                >
                                    <button
                                        onClick={(e) => { e.stopPropagation(); removeFromCart(product._id); }}
                                        className="flex items-center justify-center w-4 h-full"
                                    >
                                        <Minus size={10} strokeWidth={4} />
                                    </button>
                                    <span className="text-[10px] sm:text-[11px] font-bold">{count}</span>
                                    <button
                                        onClick={(e) => { e.stopPropagation(); addToCart(product); }}
                                        className="flex items-center justify-center w-4 h-full"
                                    >
                                        <Plus size={10} strokeWidth={4} />
                                    </button>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductCard;